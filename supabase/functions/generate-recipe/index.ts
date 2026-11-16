const corsHeaders = {
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Headers": "authorization, x-client-info, apikey, content-type",
};

const json = (body: unknown, status = 200) =>
  new Response(JSON.stringify(body), {
    status,
    headers: { ...corsHeaders, "Content-Type": "application/json" },
  });

const sleep = (ms: number) => new Promise((r) => setTimeout(r, ms));

// fetch that aborts if the upstream stalls, so a hung connection becomes a
// retryable error instead of hanging the whole function.
const fetchWithTimeout = async (url: string, opts: RequestInit, ms: number) => {
  const controller = new AbortController();
  const id = setTimeout(() => controller.abort(), ms);
  try {
    return await fetch(url, { ...opts, signal: controller.signal });
  } finally {
    clearTimeout(id);
  }
};

const UPSTREAM_TIMEOUT_MS = 18000;

// Models tried in order. If one is overloaded, quota-limited, or stalls,
// fall back to the next — so a single busy/retired model doesn't take the
// feature down. Different models have separate quota buckets.
const MODELS = ["gemini-3.8-flash", "gemini-flash-latest"];

Deno.serve(async (req) => {
  if (req.method === "OPTIONS") return new Response(null, { headers: corsHeaders });

  try {
    const { prompt } = await req.json();
    if (!prompt || typeof prompt !== "string") return json({ error: "Missing prompt" }, 400);

    const GEMINI_API_KEY = Deno.env.get("GEMINI_API_KEY");
    if (!GEMINI_API_KEY) throw new Error("GEMINI_API_KEY not configured");

    const payload = {
      messages: [
        {
          role: "system",
          content:
            "You are a creative chef. Generate a single recipe based on the user's request. Always respond by calling the create_recipe tool.",
        },
        { role: "user", content: prompt },
      ],
      tools: [
        {
          type: "function",
          function: {
            name: "create_recipe",
            description: "Return a complete recipe.",
            parameters: {
              type: "object",
              properties: {
                title: { type: "string" },
                description: { type: "string" },
                cookTime: { type: "string", description: "e.g. '25 min'" },
                servings: { type: "number" },
                difficulty: { type: "string", enum: ["Easy", "Medium", "Hard"] },
                ingredients: { type: "array", items: { type: "string" } },
                instructions: { type: "array", items: { type: "string" } },
                nutrition: {
                  type: "object",
                  properties: {
                    calories: { type: "number" },
                    protein: { type: "string" },
                    carbs: { type: "string" },
                    fat: { type: "string" },
                    fiber: { type: "string" },
                  },
                  required: ["calories", "protein", "carbs", "fat", "fiber"],
                },
              },
              required: [
                "title",
                "description",
                "cookTime",
                "servings",
                "difficulty",
                "ingredients",
                "instructions",
                "nutrition",
              ],
            },
          },
        },
      ],
      tool_choice: { type: "function", function: { name: "create_recipe" } },
    };

    // Try each model in turn. A stall (timeout abort), network blip, or a
    // transient/overload status on one model falls back to the next.
    let response: Response | null = null;
    let lastStatus = 0;

    for (const model of MODELS) {
      try {
        response = await fetchWithTimeout(
          "https://generativelanguage.googleapis.com/v1beta/openai/chat/completions",
          {
            method: "POST",
            headers: {
              Authorization: `Bearer ${GEMINI_API_KEY}`,
              "Content-Type": "application/json",
            },
            body: JSON.stringify({ model, ...payload }),
          },
          UPSTREAM_TIMEOUT_MS
        );
      } catch (netErr) {
        // Stall/timeout abort or network failure — fall back to the next model.
        lastStatus = 0;
        console.error(
          `generate-recipe fetch failed (${model}):`,
          netErr instanceof Error ? netErr.message : String(netErr)
        );
        await sleep(300);
        continue;
      }

      if (response.ok) break;

      lastStatus = response.status;
      const body = await response.text();
      console.error(`AI gateway error (${model}):`, lastStatus, body);

      // Payment / quota is key-wide and not transient — fail fast.
      if (lastStatus === 402) {
        return json({ error: "AI quota exhausted. Try again later." }, 402);
      }

      // Overloaded (503), rate-limited (429), other 5xx, or a bad model id —
      // fall back to the next model.
      await sleep(300);
    }

    if (!response || !response.ok) {
      if (lastStatus === 429) {
        return json({ error: "The AI is busy right now. Please try again in a moment." }, 429);
      }
      return json({ error: "The AI service is temporarily unavailable. Please try again." }, 503);
    }

    const data = await response.json();
    const toolCall = data.choices?.[0]?.message?.tool_calls?.[0];
    if (!toolCall?.function?.arguments) {
      console.error("generate-recipe: no tool call in response", JSON.stringify(data).slice(0, 500));
      return json({ error: "The AI didn't return a recipe. Please try again." }, 502);
    }

    let recipe: unknown;
    try {
      recipe = JSON.parse(toolCall.function.arguments);
    } catch (_) {
      console.error("generate-recipe: bad JSON in tool call", toolCall.function.arguments?.slice(0, 500));
      return json({ error: "The AI returned an invalid recipe. Please try again." }, 502);
    }

    return json({ recipe });
  } catch (e) {
    console.error("generate-recipe error:", e);
    return json({ error: e instanceof Error ? e.message : "Unknown error" }, 500);
  }
});
