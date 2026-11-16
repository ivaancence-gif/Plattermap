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

// Models tried in order. If one is overloaded (503 UNAVAILABLE) or stalls,
// fall back to the next — so a single overloaded model doesn't take the
// feature down. Primary is a stable GA model with broad capacity.
const MODELS = ["gemini-2.0-flash", "gemini-flash-latest", "gemini-2.5-flash"];

Deno.serve(async (req) => {
  if (req.method === "OPTIONS") return new Response(null, { headers: corsHeaders });

  try {
    const { recipeTitle, ingredients } = await req.json();
    if (!recipeTitle) return json({ error: "Missing recipeTitle" }, 400);

    const GEMINI_API_KEY = Deno.env.get("GEMINI_API_KEY");
    if (!GEMINI_API_KEY) throw new Error("GEMINI_API_KEY not configured");

    const payload = {
      messages: [
        {
          role: "system",
          content:
            "You are a nutritionist. Provide 4-6 concise, accurate health facts about a dish. Focus on nutritional benefits, key nutrients, and practical wellness tips. Keep each fact to 1-2 sentences.",
        },
        {
          role: "user",
          content: `Dish: ${recipeTitle}\nIngredients: ${(ingredients || []).join(", ")}`,
        },
      ],
      tools: [
        {
          type: "function",
          function: {
            name: "return_health_facts",
            description: "Return health facts about the dish.",
            parameters: {
              type: "object",
              properties: {
                facts: {
                  type: "array",
                  items: { type: "string" },
                  description: "4-6 concise health facts.",
                },
              },
              required: ["facts"],
            },
          },
        },
      ],
      tool_choice: { type: "function", function: { name: "return_health_facts" } },
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
          `health-facts fetch failed (${model}):`,
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
    const message = data.choices?.[0]?.message;

    // Preferred path: structured tool call.
    let facts: string[] | undefined;
    const toolCall = message?.tool_calls?.[0];
    if (toolCall?.function?.arguments) {
      try {
        facts = JSON.parse(toolCall.function.arguments).facts;
      } catch (_) {
        // fall through to content fallback
      }
    }

    // Fallback: model answered in plain content instead of a tool call.
    if (!Array.isArray(facts) && typeof message?.content === "string" && message.content.trim()) {
      facts = message.content
        .split("\n")
        .map((l: string) => l.replace(/^[\s•\-*\d.)]+/, "").trim())
        .filter((l: string) => l.length > 0)
        .slice(0, 6);
    }

    if (!Array.isArray(facts) || facts.length === 0) {
      console.error("health-facts: no usable facts in response", JSON.stringify(data).slice(0, 500));
      return json({ error: "The AI didn't return any facts. Please try again." }, 502);
    }

    return json({ facts });
  } catch (e) {
    console.error("health-facts error:", e);
    return json({ error: e instanceof Error ? e.message : "Unknown error" }, 500);
  }
});
