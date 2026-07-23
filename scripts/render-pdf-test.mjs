import { build } from "esbuild";
const root = "/Users/swarnaliroychowdhury/Desktop/Plattermap";
const stub = {
  name: "stubs",
  setup(b) {
    b.onResolve({ filter: /\.(png|jpg)$/ }, () => ({ path: "img", namespace: "stub" }));
    b.onLoad({ filter: /.*/, namespace: "stub" }, () => ({ contents: "export default 'stub.png';" }));
  },
};
const r = await build({
  entryPoints: [root + "/src/lib/recipePdf.ts"],
  bundle: true, format: "esm", write: false, plugins: [stub],
  alias: { "@": root + "/src" },
  external: ["@capacitor/core", "@capacitor/filesystem", "@capacitor/share"],
});
globalThis.Image = class { set src(_) { setTimeout(() => this.onerror?.(), 0); } };
const mod = await import(`data:text/javascript;base64,${Buffer.from(r.outputFiles[0].text).toString("base64")}`);
const doc = await mod.buildRecipePdf({
  title: "Birthday Muffin-Tin 'Cupcake' Lasagnas",
  description: "An incredibly fun, hands-on birthday dinner that young chefs can safely help build! Wonton wrappers turn classic lasagna into bite-sized cupcakes.",
  cookTime: "20 min", servings: 4, difficulty: "Easy", cuisine: "Italian", dietaryTags: ["Vegetarian"],
  ingredients: ["24 square wonton wrappers","1 cup ricotta cheese","1 large egg","1/2 tsp dried oregano","1/2 cup grated Parmesan, divided","1 cup shredded mozzarella, divided","1.5 cups marinara sauce","1 cup finely grated zucchini","Fresh basil for garnish","Mini bell pepper strips"],
  instructions: ["Preheat oven to 190°C and grease a 12-cup muffin tin.","Mix ricotta, egg, oregano and half the Parmesan in a bowl.","Press one wonton wrapper into each muffin cup.","Layer a spoonful of ricotta mix, marinara and zucchini in each cup.","Add a second wrapper and repeat the layers.","Top with mozzarella and remaining Parmesan.","Bake 12-15 minutes until golden and bubbly; garnish with basil and pepper 'candles'."],
  nutrition: { calories: 390, protein: "21g", carbs: "38g", fat: "17g", fiber: "3g" },
});
const fs = await import("node:fs");
fs.writeFileSync(process.argv[2], Buffer.from(doc.output("arraybuffer")));
console.log("pdf written");
