import { useQuery } from "@tanstack/react-query";
import { supabase } from "@/integrations/supabase/client";
import { Recipe, DietaryTag, recipes as bundledRecipes } from "@/data/recipes";
import { recipeImageMap } from "@/data/recipeImageMap";

interface RecipeRow {
  id: string;
  title: string;
  category: string;
  cuisine: string | null;
  description: string;
  cook_time: string;
  servings: number;
  difficulty: string;
  dietary_tags: string[];
  ingredients: string[];
  instructions: string[];
  nutrition: Recipe["nutrition"];
  image_key: string | null;
  image_url: string | null;
}

const rowToRecipe = (row: RecipeRow): Recipe => ({
  id: row.id,
  title: row.title,
  category: row.category,
  cuisine: row.cuisine ?? undefined,
  description: row.description,
  cookTime: row.cook_time,
  servings: row.servings,
  difficulty: row.difficulty as Recipe["difficulty"],
  dietaryTags: (row.dietary_tags ?? []) as DietaryTag[],
  ingredients: row.ingredients ?? [],
  instructions: row.instructions ?? [],
  nutrition: row.nutrition,
  image: (row.image_key && recipeImageMap[row.image_key]) || row.image_url || "/placeholder.svg",
});

export const useRecipes = () => {
  const query = useQuery({
    queryKey: ["recipes"],
    queryFn: async (): Promise<Recipe[]> => {
      const { data, error } = await supabase
        .from("recipes")
        .select("*")
        .order("created_at", { ascending: true })
        .order("id", { ascending: true });
      if (error) throw error;
      return (data as RecipeRow[]).map(rowToRecipe);
    },
    // Bundled recipes render instantly and keep the app usable offline;
    // the network result replaces them when it arrives.
    placeholderData: bundledRecipes,
    staleTime: 5 * 60 * 1000,
    retry: 1,
  });

  return { ...query, recipes: query.data ?? bundledRecipes };
};

export const getCategories = (recipes: Recipe[]) =>
  ["Meals", "Salads", "Desserts", "Drinks", "Soups", "Breakfast"].map((name) => ({
    name,
    count: recipes.filter((r) => r.category === name).length,
  }));
