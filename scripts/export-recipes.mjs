// Extracts the bundled recipe data to JSON (no images — those stay client-side).
// Usage: node scripts/export-recipes.mjs > /tmp/recipes.json
import { build } from "esbuild";
import path from "node:path";
import { fileURLToPath } from "node:url";

const root = path.dirname(path.dirname(fileURLToPath(import.meta.url)));

const stubImages = {
  name: "stub-images",
  setup(b) {
    // recipeImageMap resolves images per id; stub it so image === its key
    b.onResolve({ filter: /recipeImageMap$/ }, () => ({ path: "stub", namespace: "stub" }));
    b.onLoad({ filter: /.*/, namespace: "stub" }, () => ({
      contents: `export const recipeImageMap = new Proxy({}, { get: (_, k) => String(k) });`,
    }));
  },
};

const result = await build({
  stdin: {
    contents: `import { recipes } from "./src/data/recipes"; console.log(JSON.stringify(recipes, null, 2));`,
    resolveDir: root,
    loader: "ts",
  },
  bundle: true,
  format: "esm",
  write: false,
  plugins: [stubImages],
  alias: { "@": path.join(root, "src") },
});

await import(`data:text/javascript;base64,${Buffer.from(result.outputFiles[0].text).toString("base64")}`);
