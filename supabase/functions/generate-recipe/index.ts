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

const UPSTREAM_TIMEOUT_MS = 20000;

// Transient upstream failures that are worth retrying.
const RETRYABLE = new Set([408, 429, 500, 502, 503, 504]);

Deno.serve(async (req) => {
  if (req.method === "OPTIONS") return new Response(null, { headers: corsHeaders });

  try {
    const { prompt } = await req.json();
    if (!prompt || typeof prompt !== "string") return json({ error: "Missing prompt" }, 400);

    const GEMINI_API_KEY = Deno.env.get("GEMINI_API_KEY");
    if (!GEMINI_API_KEY) throw new Error("GEMINI_API_KEY not configured");

    const payload = {
      model: "gemini-flash-latest",
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

    // Retry the upstream call on transient errors / network blips with backoff.
    const MAX_ATTEMPTS = 3;
    let response: Response | null = null;
    let lastStatus = 0;

    for (let attempt = 1; attempt <= MAX_ATTEMPTS; attempt++) {
      try {
        response = await fetchWithTimeout(
          "https://generativelanguage.googleapis.com/v1beta/openai/chat/completions",
          {
            method: "POST",
            headers: {
              Authorization: `Bearer ${GEMINI_API_KEY}`,
              "Content-Type": "application/json",
            },
            body: JSON.stringify(payload),
          },
          UPSTREAM_TIMEOUT_MS
        );
      } catch (netErr) {
        // Network-level failure or timeout abort — treat as retryable.
        const msg = netErr instanceof Error ? netErr.message : String(netErr);
        console.error(`generate-recipe fetch failed (attempt ${attempt}):`, msg);
        if (attempt < MAX_ATTEMPTS) {
          await sleep(400 * attempt);
          continue;
        }
        return json({ error: "Couldn't reach the AI service. Please try again." }, 503);
      }

      if (response.ok) break;

      lastStatus = response.status;
      const body = await response.text();
      console.error(`AI gateway error (attempt ${attempt}):`, lastStatus, body);

      // Payment / quota is not transient — fail fast with a clear message.
      if (lastStatus === 402) {
        return json({ error: "AI quota exhausted. Try again later." }, 402);
      }

      if (RETRYABLE.has(lastStatus) && attempt < MAX_ATTEMPTS) {
        await sleep(400 * attempt); // 400ms, 800ms backoff
        continue;
      }

      if (lastStatus === 429) {
        return json({ error: "The AI is busy right now. Please try again in a moment." }, 429);
      }
      return json({ error: "The AI service is temporarily unavailable. Please try again." }, 502);
    }

    if (!response || !response.ok) {
      return json({ error: "The AI service is temporarily unavailable. Please try again." }, 502);
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
