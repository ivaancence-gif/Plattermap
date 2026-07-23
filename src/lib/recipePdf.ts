import { jsPDF } from "jspdf";
import logoImage from "@/assets/plattermap-logo.png";

export interface PdfRecipe {
  title: string;
  description: string;
  cookTime: string;
  servings: number;
  difficulty: string;
  cuisine?: string;
  dietaryTags?: string[];
  ingredients: string[];
  instructions: string[];
  nutrition: { calories: number; protein: string; carbs: string; fat: string; fiber: string };
}

// Brand palette (matches the site's terracotta/cream theme)
const TERRACOTTA: [number, number, number] = [215, 103, 66];
const INK: [number, number, number] = [40, 32, 28];
const MUTED: [number, number, number] = [120, 110, 105];
const CREAM: [number, number, number] = [250, 246, 240];

const loadLogo = (): Promise<string | null> =>
  new Promise((resolve) => {
    const img = new Image();
    img.onload = () => {
      // Downscale and flatten onto the cream header color: keeps the PDF small.
      const SIZE = 192;
      const c = document.createElement("canvas");
      c.width = SIZE;
      c.height = SIZE;
      const ctx = c.getContext("2d")!;
      ctx.fillStyle = `rgb(${CREAM.join(",")})`;
      ctx.fillRect(0, 0, SIZE, SIZE);
      ctx.drawImage(img, 0, 0, SIZE, SIZE);
      resolve(c.toDataURL("image/jpeg", 0.85));
    };
    img.onerror = () => resolve(null);
    img.src = logoImage;
  });

export const buildRecipePdf = async (recipe: PdfRecipe): Promise<jsPDF> => {
  const doc = new jsPDF({ unit: "mm", format: "a4" });
  const W = 210;
  const M = 18; // page margin
  let y = 16;

  // Header band
  doc.setFillColor(...CREAM);
  doc.rect(0, 0, W, 34, "F");
  const logo = await loadLogo();
  if (logo) doc.addImage(logo, "JPEG", M - 4, 5, 24, 24);
  doc.setTextColor(...TERRACOTTA);
  doc.setFont("helvetica", "bold");
  doc.setFontSize(20);
  doc.text("PlatterMap", M + 22, 18);
  doc.setFont("helvetica", "normal");
  doc.setFontSize(9);
  doc.setTextColor(...MUTED);
  doc.text("plattermap.app — discover delicious recipes from around the world", M + 22, 24);

  y = 46;

  // Title + description
  doc.setTextColor(...INK);
  doc.setFont("helvetica", "bold");
  doc.setFontSize(22);
  const titleLines = doc.splitTextToSize(recipe.title, W - 2 * M);
  doc.text(titleLines, M, y);
  y += titleLines.length * 8 + 2;

  doc.setFont("helvetica", "normal");
  doc.setFontSize(10.5);
  doc.setTextColor(...MUTED);
  const descLines = doc.splitTextToSize(recipe.description, W - 2 * M);
  doc.text(descLines, M, y);
  y += descLines.length * 5 + 4;

  // Meta badges line
  const badges = [
    recipe.cookTime,
    `${recipe.servings} servings`,
    recipe.difficulty,
    ...(recipe.cuisine ? [`${recipe.cuisine} Cuisine`] : []),
    ...(recipe.dietaryTags ?? []),
  ];
  doc.setFontSize(9);
  let bx = M;
  badges.forEach((b) => {
    const w = doc.getTextWidth(b) + 8;
    if (bx + w > W - M) return;
    doc.setDrawColor(...TERRACOTTA);
    doc.setFillColor(255, 255, 255);
    doc.roundedRect(bx, y - 4.2, w, 6.5, 3, 3, "S");
    doc.setTextColor(...TERRACOTTA);
    doc.text(b, bx + 4, y);
    bx += w + 3;
  });
  y += 10;

  // Two columns: ingredients (left) / instructions (right)
  const colGap = 8;
  const leftW = 62;
  const rightX = M + leftW + colGap;
  const rightW = W - M - rightX;

  doc.setFont("helvetica", "bold");
  doc.setFontSize(13);
  doc.setTextColor(...TERRACOTTA);
  doc.text("Ingredients", M, y);
  doc.text("Instructions", rightX, y);
  y += 6;

  // Ingredients with checkboxes
  doc.setFont("helvetica", "normal");
  doc.setFontSize(9.5);
  doc.setTextColor(...INK);
  let ly = y;
  recipe.ingredients.forEach((ing) => {
    const lines = doc.splitTextToSize(ing, leftW - 8);
    doc.setDrawColor(...MUTED);
    doc.rect(M, ly - 3, 3.2, 3.2, "S");
    doc.text(lines, M + 5.5, ly);
    ly += lines.length * 4.4 + 2;
  });

  // Numbered instructions
  let ry = y;
  doc.setFontSize(9.5);
  recipe.instructions.forEach((step, i) => {
    const lines = doc.splitTextToSize(step, rightW - 9);
    doc.setFillColor(...TERRACOTTA);
    doc.circle(rightX + 2.4, ry - 1.2, 2.6, "F");
    doc.setTextColor(255, 255, 255);
    doc.setFontSize(8);
    doc.text(String(i + 1), rightX + 2.4, ry, { align: "center" });
    doc.setTextColor(...INK);
    doc.setFontSize(9.5);
    doc.text(lines, rightX + 7.5, ry);
    ry += lines.length * 4.4 + 3;
  });

  y = Math.max(ly, ry) + 6;

  // Nutrition box
  if (y > 250) y = 250; // keep on one page; box is compact
  doc.setFillColor(...CREAM);
  doc.roundedRect(M, y, W - 2 * M, 20, 2, 2, "F");
  doc.setFont("helvetica", "bold");
  doc.setFontSize(11);
  doc.setTextColor(...TERRACOTTA);
  doc.text("Nutrition (per serving)", M + 5, y + 7);
  doc.setFont("helvetica", "normal");
  doc.setFontSize(10);
  doc.setTextColor(...INK);
  const n = recipe.nutrition;
  const nut = `${n.calories} calories   •   Protein ${n.protein}   •   Carbs ${n.carbs}   •   Fat ${n.fat}   •   Fiber ${n.fiber}`;
  doc.text(nut, M + 5, y + 14);

  // Footer
  doc.setFontSize(8);
  doc.setTextColor(...MUTED);
  doc.text("Made with PlatterMap — https://plattermap.app", W / 2, 290, { align: "center" });

  return doc;
};

const safeFilename = (title: string) =>
  title.replace(/[^\w\s-]/g, "").trim().replace(/\s+/g, "-").toLowerCase() || "recipe";

/** Download (web) or share (native Android/iOS) the recipe PDF. */
export const downloadRecipePdf = async (recipe: PdfRecipe) => {
  const doc = await buildRecipePdf(recipe);
  const filename = `${safeFilename(recipe.title)}-plattermap.pdf`;

  const { Capacitor } = await import("@capacitor/core");
  if (Capacitor.isNativePlatform()) {
    const { Filesystem, Directory } = await import("@capacitor/filesystem");
    const { Share } = await import("@capacitor/share");
    const base64 = doc.output("datauristring").split(",")[1];
    const written = await Filesystem.writeFile({
      path: filename,
      data: base64,
      directory: Directory.Cache,
    });
    await Share.share({
      title: recipe.title,
      text: `${recipe.title} — recipe from PlatterMap`,
      url: written.uri,
      dialogTitle: "Save or share recipe",
    });
  } else {
    doc.save(filename);
  }
};

/** Open the PDF in a new tab for printing (web only). */
export const printRecipePdf = async (recipe: PdfRecipe) => {
  const doc = await buildRecipePdf(recipe);
  const url = doc.output("bloburl");
  window.open(url, "_blank");
};
