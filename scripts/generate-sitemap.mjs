// Writes public/sitemap.xml from the bundled recipe data. Runs before vite build.
import { build } from "esbuild";
import fs from "node:fs";
import path from "node:path";
import { fileURLToPath } from "node:url";

const root = path.dirname(path.dirname(fileURLToPath(import.meta.url)));
const SITE = "https://plattermap.app";

const stubImages = {
  name: "stub-images",
  setup(b) {
    b.onResolve({ filter: /recipeImageMap$/ }, () => ({ path: "stub", namespace: "stub" }));
    b.onLoad({ filter: /.*/, namespace: "stub" }, () => ({
      contents: `export const recipeImageMap = new Proxy({}, { get: (_, k) => String(k) });`,
    }));
  },
};

const result = await build({
  stdin: {
    contents: `import { recipes } from "./src/data/recipes"; globalThis.__RECIPES__ = recipes;`,
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
const recipes = globalThis.__RECIPES__;

const staticPaths = ["/", "/recipes", "/pricing", "/privacy", "/terms", "/blog"];

// Blog posts: read slugs from markdown files (skip published: false drafts)
const blogDir = path.join(root, "src", "content", "blog");
const blogSlugs = fs.existsSync(blogDir)
  ? fs
      .readdirSync(blogDir)
      .filter((f) => f.endsWith(".md"))
      .filter((f) => !fs.readFileSync(path.join(blogDir, f), "utf8").includes("published: false"))
      .map((f) => f.replace(/\.md$/, ""))
  : [];

const urls = [
  ...staticPaths.map((p) => ({ loc: `${SITE}${p}`, priority: p === "/" ? "1.0" : "0.8" })),
  ...recipes.map((r) => ({ loc: `${SITE}/recipe/${r.id}`, priority: "0.6" })),
  ...blogSlugs.map((s) => ({ loc: `${SITE}/blog/${s}`, priority: "0.7" })),
];

const xml = `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
${urls.map((u) => `  <url><loc>${u.loc}</loc><priority>${u.priority}</priority></url>`).join("\n")}
</urlset>
`;

fs.writeFileSync(path.join(root, "public", "sitemap.xml"), xml);
console.log(`sitemap.xml written: ${urls.length} URLs`);
