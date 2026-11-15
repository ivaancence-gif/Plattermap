import { Recipe, DietaryTag } from "@/data/recipes";

/**
 * Parse a human cook-time string ("25 min", "1 hr", "1 hr 30 min",
 * "1 hour 10 minutes", "90 mins") into a total number of minutes.
 * Returns Infinity when nothing parseable is found so such recipes
 * sort last and never match an upper-bound time filter.
 */
export const parseCookTime = (value: string | undefined | null): number => {
  if (!value) return Infinity;
  const text = value.toLowerCase();
  let minutes = 0;
  let matched = false;

  const hourMatch = text.match(/(\d+(?:\.\d+)?)\s*(h|hr|hrs|hour|hours)\b/);
  if (hourMatch) {
    minutes += parseFloat(hourMatch[1]) * 60;
    matched = true;
  }

  const minMatch = text.match(/(\d+(?:\.\d+)?)\s*(m|min|mins|minute|minutes)\b/);
  if (minMatch) {
    minutes += parseFloat(minMatch[1]);
    matched = true;
  }

  // Fallback: a bare number with no unit is treated as minutes.
  if (!matched) {
    const bare = text.match(/(\d+(?:\.\d+)?)/);
    if (bare) {
      minutes = parseFloat(bare[1]);
      matched = true;
    }
  }

  return matched ? minutes : Infinity;
};

/** Parse "15g" / "15 g" / "15" into a number of grams for sorting. */
const parseGrams = (value: string | undefined): number => {
  if (!value) return Infinity;
  const m = value.match(/(\d+(?:\.\d+)?)/);
  return m ? parseFloat(m[1]) : Infinity;
};

export type SortKey =
  | "default"
  | "time-asc"
  | "time-desc"
  | "calories-asc"
  | "protein-desc"
  | "ingredients-asc"
  | "title-asc";

export const SORT_OPTIONS: { value: SortKey; label: string }[] = [
  { value: "default", label: "Recommended" },
  { value: "time-asc", label: "Quickest first" },
  { value: "time-desc", label: "Longest first" },
  { value: "calories-asc", label: "Fewest calories" },
  { value: "protein-desc", label: "Highest protein" },
  { value: "ingredients-asc", label: "Fewest ingredients" },
  { value: "title-asc", label: "Alphabetical (A–Z)" },
];

/** Quick cook-time buckets shown as filter chips. */
export const TIME_FILTERS: { value: number; label: string }[] = [
  { value: 15, label: "≤ 15 min" },
  { value: 30, label: "≤ 30 min" },
  { value: 60, label: "≤ 60 min" },
];

export const DIFFICULTIES: Recipe["difficulty"][] = ["Easy", "Medium", "Hard"];

/** Unique cuisines present in the dataset, with counts, sorted by name. */
export const getCuisines = (recipes: Recipe[]): { name: string; count: number }[] => {
  const counts = new Map<string, number>();
  for (const r of recipes) {
    if (r.cuisine) counts.set(r.cuisine, (counts.get(r.cuisine) ?? 0) + 1);
  }
  return [...counts.entries()]
    .map(([name, count]) => ({ name, count }))
    .sort((a, b) => a.name.localeCompare(b.name));
};

/**
 * True when the recipe matches a free-text query. Searches title,
 * description, category, cuisine, dietary tags and ingredients so a
 * query like "chicken" or "garlic" finds recipes by what's in them.
 */
export const matchesSearch = (recipe: Recipe, query: string): boolean => {
  const q = query.trim().toLowerCase();
  if (!q) return true;
  const haystack = [
    recipe.title,
    recipe.description,
    recipe.category,
    recipe.cuisine ?? "",
    ...(recipe.dietaryTags ?? []),
    ...(recipe.ingredients ?? []),
  ]
    .join(" ")
    .toLowerCase();
  // Every whitespace-separated token must appear somewhere.
  return q.split(/\s+/).every((token) => haystack.includes(token));
};

export interface RecipeFilters {
  query: string;
  category: string | null;
  cuisine: string | null;
  difficulty: Recipe["difficulty"] | null;
  maxTime: number | null;
  dietaryTags: DietaryTag[];
  sort: SortKey;
}

export const EMPTY_FILTERS: RecipeFilters = {
  query: "",
  category: null,
  cuisine: null,
  difficulty: null,
  maxTime: null,
  dietaryTags: [],
  sort: "default",
};

const sortRecipes = (recipes: Recipe[], sort: SortKey): Recipe[] => {
  if (sort === "default") return recipes;
  const copy = [...recipes];
  switch (sort) {
    case "time-asc":
      return copy.sort((a, b) => parseCookTime(a.cookTime) - parseCookTime(b.cookTime));
    case "time-desc":
      return copy.sort((a, b) => parseCookTime(b.cookTime) - parseCookTime(a.cookTime));
    case "calories-asc":
      return copy.sort((a, b) => (a.nutrition?.calories ?? Infinity) - (b.nutrition?.calories ?? Infinity));
    case "protein-desc":
      return copy.sort((a, b) => parseGrams(b.nutrition?.protein) - parseGrams(a.nutrition?.protein));
    case "ingredients-asc":
      return copy.sort((a, b) => (a.ingredients?.length ?? 0) - (b.ingredients?.length ?? 0));
    case "title-asc":
      return copy.sort((a, b) => a.title.localeCompare(b.title));
    default:
      return copy;
  }
};

/** Apply all active filters, then sort. Pure — never mutates input. */
export const applyRecipeFilters = (recipes: Recipe[], f: RecipeFilters): Recipe[] => {
  const filtered = recipes.filter((recipe) => {
    if (!matchesSearch(recipe, f.query)) return false;
    if (f.category && recipe.category !== f.category) return false;
    if (f.cuisine && recipe.cuisine !== f.cuisine) return false;
    if (f.difficulty && recipe.difficulty !== f.difficulty) return false;
    if (f.maxTime != null && parseCookTime(recipe.cookTime) > f.maxTime) return false;
    if (f.dietaryTags.length > 0 && !f.dietaryTags.every((t) => recipe.dietaryTags?.includes(t)))
      return false;
    return true;
  });
  return sortRecipes(filtered, f.sort);
};

export const countActiveFilters = (f: RecipeFilters): number =>
  (f.category ? 1 : 0) +
  (f.cuisine ? 1 : 0) +
  (f.difficulty ? 1 : 0) +
  (f.maxTime != null ? 1 : 0) +
  f.dietaryTags.length +
  (f.query.trim() ? 1 : 0);
