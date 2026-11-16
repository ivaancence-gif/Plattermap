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
    const { recipeTitle, ingredients } = await req.json();
    if (!recipeTitle) return json({ error: "Missing recipeTitle" }, 400);

    const GEMINI_API_KEY = Deno.env.get("GEMINI_API_KEY");
    if (!GEMINI_API_KEY) throw new Error("GEMINI_API_KEY not configured");

    const payload = {
      model: "gemini-flash-latest",
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

    // Retry the upstream call on transient errors / network blips with backoff.
    const MAX_ATTEMPTS = 3;
    let response: Response | null = null;
    let lastStatus = 0;
    let lastBody = "";

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
        // Network-level failure — treat as retryable.
        lastStatus = 0;
        lastBody = netErr instanceof Error ? netErr.message : String(netErr);
        console.error(`health-facts fetch failed (attempt ${attempt}):`, lastBody);
        if (attempt < MAX_ATTEMPTS) {
          await sleep(400 * attempt);
          continue;
        }
        return json({ error: "Couldn't reach the AI service. Please try again." }, 503);
      }

      if (response.ok) break;

      lastStatus = response.status;
      lastBody = await response.text();
      console.error(`AI gateway error (attempt ${attempt}):`, lastStatus, lastBody);

      // Payment / quota is not transient — fail fast with a clear message.
      if (lastStatus === 402) {
        return json({ error: "AI quota exhausted. Try again later." }, 402);
      }

      if (RETRYABLE.has(lastStatus) && attempt < MAX_ATTEMPTS) {
        await sleep(400 * attempt); // 400ms, 800ms backoff
        continue;
      }

      // Out of retries (or a non-retryable 4xx).
      if (lastStatus === 429) {
        return json({ error: "The AI is busy right now. Please try again in a moment." }, 429);
      }
      return json({ error: "The AI service is temporarily unavailable. Please try again." }, 502);
    }

    if (!response || !response.ok) {
      return json({ error: "The AI service is temporarily unavailable. Please try again." }, 502);
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
