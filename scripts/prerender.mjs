// Prerenders static HTML for each recipe and the top-level pages, AFTER vite build.
//
// The app is a client-rendered SPA, so crawlers otherwise receive an empty
// <div id="root"> with a single generic <title> for every URL. This script
// writes dist/recipe/<id>/index.html (and dist/<page>/index.html) whose served
// HTML already contains the real <title>, meta description, canonical, Open
// Graph tags, schema.org Recipe JSON-LD and the recipe content. The SPA still
// boots and replaces #root for interactive users; Vercel serves these static
// files directly (static files take precedence over the SPA rewrite).
import { build } from "esbuild";
import fs from "node:fs";
import path from "node:path";
import { fileURLToPath } from "node:url";

const root = path.dirname(path.dirname(fileURLToPath(import.meta.url)));
const SITE = "https://plattermap.app";
const dist = path.join(root, "dist");
const templatePath = path.join(dist, "index.html");

if (!fs.existsSync(templatePath)) {
  console.error("prerender: dist/index.html not found — run after `vite build`.");
  process.exit(1);
}
const template = fs.readFileSync(templatePath, "utf8");

// --- Load bundled recipes, resolving image imports to their file basenames ---
const imageBasenamePlugin = {
  name: "image-basename",
  setup(b) {
    const filter = /\.(jpg|jpeg|png|webp|avif)$/;
    b.onResolve({ filter }, (args) => ({ path: path.basename(args.path), namespace: "img" }));
    b.onLoad({ filter: /.*/, namespace: "img" }, (args) => ({
      contents: `export default ${JSON.stringify(args.path)};`,
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
  plugins: [imageBasenamePlugin],
  alias: { "@": path.join(root, "src") },
});
await import(`data:text/javascript;base64,${Buffer.from(result.outputFiles[0].text).toString("base64")}`);
const recipes = globalThis.__RECIPES__;

// --- Copy recipe source images to a stable public path for og:image / JSON-LD ---
const srcImgDir = path.join(root, "src", "assets", "recipes");
const outImgDir = path.join(dist, "recipe-images");
fs.mkdirSync(outImgDir, { recursive: true });
if (fs.existsSync(srcImgDir)) {
  for (const f of fs.readdirSync(srcImgDir)) {
    fs.copyFileSync(path.join(srcImgDir, f), path.join(outImgDir, f));
  }
}
const imageUrl = (recipe) =>
  typeof recipe.image === "string" && /\.(jpg|jpeg|png|webp|avif)$/.test(recipe.image)
    ? `${SITE}/recipe-images/${recipe.image}`
    : `${SITE}/pwa-512x512.png`;

// --- helpers ---
const escHtml = (s) =>
  String(s).replace(/&/g, "&amp;").replace(/</g, "&lt;").replace(/>/g, "&gt;");
const escAttr = (s) =>
  String(s).replace(/&/g, "&amp;").replace(/"/g, "&quot;").replace(/</g, "&lt;").replace(/>/g, "&gt;");

const toIsoDuration = (cookTime) => {
  const m = String(cookTime || "").match(/(\d+)\s*min/);
  if (!m) return undefined;
  const mins = parseInt(m[1], 10);
  return mins >= 60 ? `PT${Math.floor(mins / 60)}H${mins % 60}M` : `PT${mins}M`;
};

// Replace an existing <meta name|property="key" content="..."> or append before </head>.
const setMeta = (html, attr, key, value) => {
  const re = new RegExp(`(<meta ${attr}="${key}" content=")[^"]*(")`);
  if (re.test(html)) return html.replace(re, `$1${escAttr(value)}$2`);
  return html.replace("</head>", `    <meta ${attr}="${key}" content="${escAttr(value)}" />\n  </head>`);
};

const setTitle = (html, title) =>
  html.replace(/<title>[\s\S]*?<\/title>/, `<title>${escHtml(title)}</title>`);

const setDescription = (html, desc) => {
  const re = /(<meta name="description" content=")[^"]*(")/;
  if (re.test(html)) return html.replace(re, `$1${escAttr(desc)}$2`);
  return html.replace("</head>", `    <meta name="description" content="${escAttr(desc)}" />\n  </head>`);
};

const addHead = (html, snippet) => html.replace("</head>", `${snippet}\n  </head>`);

const writePage = (routePath, html) => {
  const dir = routePath === "/" ? dist : path.join(dist, routePath.replace(/^\//, ""));
  fs.mkdirSync(dir, { recursive: true });
  fs.writeFileSync(path.join(dir, "index.html"), html);
};

// --- Recipe pages ---
const recipeJsonLd = (recipe) => ({
  "@context": "https://schema.org",
  "@type": "Recipe",
  name: recipe.title,
  description: recipe.description,
  image: imageUrl(recipe),
  url: `${SITE}/recipe/${recipe.id}`,
  recipeCategory: recipe.category,
  recipeCuisine: recipe.cuisine,
  recipeYield: `${recipe.servings} servings`,
  totalTime: toIsoDuration(recipe.cookTime),
  recipeIngredient: recipe.ingredients,
  recipeInstructions: recipe.instructions.map((step, i) => ({
    "@type": "HowToStep",
    position: i + 1,
    text: step,
  })),
  nutrition: {
    "@type": "NutritionInformation",
    calories: `${recipe.nutrition.calories} calories`,
    proteinContent: recipe.nutrition.protein,
    carbohydrateContent: recipe.nutrition.carbs,
    fatContent: recipe.nutrition.fat,
    fiberContent: recipe.nutrition.fiber,
  },
  keywords: (recipe.dietaryTags || []).join(", "),
  author: { "@type": "Organization", name: "PlatterMap" },
});

const recipeContent = (recipe) => `
      <main>
        <h1>${escHtml(recipe.title)}</h1>
        <p>${escHtml(recipe.description)}</p>
        <img src="${escAttr(imageUrl(recipe))}" alt="${escAttr(recipe.title)}" width="800" height="600" />
        <p>${escHtml(recipe.category)}${recipe.cuisine ? ` · ${escHtml(recipe.cuisine)}` : ""} · ${escHtml(recipe.difficulty)} · ${escHtml(recipe.cookTime)} · ${escHtml(recipe.servings)} servings</p>
        <h2>Ingredients</h2>
        <ul>${recipe.ingredients.map((i) => `<li>${escHtml(i)}</li>`).join("")}</ul>
        <h2>Instructions</h2>
        <ol>${recipe.instructions.map((s) => `<li>${escHtml(s)}</li>`).join("")}</ol>
        <h2>Nutrition</h2>
        <p>${recipe.nutrition.calories} calories · Protein ${escHtml(recipe.nutrition.protein)} · Carbs ${escHtml(recipe.nutrition.carbs)} · Fat ${escHtml(recipe.nutrition.fat)} · Fiber ${escHtml(recipe.nutrition.fiber)}</p>
      </main>`;

let recipeCount = 0;
for (const recipe of recipes) {
  const url = `${SITE}/recipe/${recipe.id}`;
  const img = imageUrl(recipe);
  let html = template;
  html = setTitle(html, `${recipe.title} | PlatterMap`);
  html = setDescription(html, recipe.description);
  html = setMeta(html, "property", "og:title", `${recipe.title} | PlatterMap`);
  html = setMeta(html, "property", "og:description", recipe.description);
  html = setMeta(html, "property", "og:image", img);
  html = setMeta(html, "property", "og:url", url);
  html = setMeta(html, "property", "og:type", "article");
  html = setMeta(html, "name", "twitter:image", img);
  html = addHead(
    html,
    `    <link rel="canonical" href="${url}" />\n` +
      `    <script type="application/ld+json">${JSON.stringify(recipeJsonLd(recipe))}</script>`
  );
  html = html.replace('<div id="root"></div>', `<div id="root">${recipeContent(recipe)}</div>`);
  writePage(`/recipe/${recipe.id}`, html);
  recipeCount++;
}

// --- Static pages: unique title + description + canonical ---
const staticPages = [
  {
    path: "/recipes",
    title: "Browse Recipes | PlatterMap",
    desc: "Browse PlatterMap's full collection of recipes — meals, desserts, drinks, soups, salads and breakfast — with ingredients, step-by-step instructions and nutrition facts.",
  },
  {
    path: "/pricing",
    title: "Pricing | PlatterMap",
    desc: "PlatterMap is free to use. See what's included and the optional PlatterMap Plus plan.",
  },
  {
    path: "/blog",
    title: "Blog | PlatterMap",
    desc: "Recipes, cooking tips and food stories from PlatterMap.",
  },
  {
    path: "/privacy",
    title: "Privacy Policy | PlatterMap",
    desc: "How PlatterMap handles your data.",
  },
  {
    path: "/terms",
    title: "Terms of Service | PlatterMap",
    desc: "The terms for using PlatterMap.",
  },
];

for (const page of staticPages) {
  const url = `${SITE}${page.path}`;
  let html = template;
  html = setTitle(html, page.title);
  html = setDescription(html, page.desc);
  html = setMeta(html, "property", "og:title", page.title);
  html = setMeta(html, "property", "og:description", page.desc);
  html = setMeta(html, "property", "og:url", url);
  html = addHead(html, `    <link rel="canonical" href="${url}" />`);
  writePage(page.path, html);
}

// --- Homepage: add a canonical to the built index.html ---
if (!/rel="canonical"/.test(template)) {
  const home = addHead(template, `    <link rel="canonical" href="${SITE}/" />`);
  fs.writeFileSync(templatePath, home);
}

console.log(`prerender: ${recipeCount} recipes + ${staticPages.length} static pages + homepage canonical`);
