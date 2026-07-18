import { useEffect } from "react";
import { Recipe } from "@/data/recipes";

const SITE = "https://plattermap.app";

// "25 min" -> "PT25M", "90 min" -> "PT1H30M"; unparseable strings are omitted.
const toIsoDuration = (cookTime: string): string | undefined => {
  const m = cookTime.match(/(\d+)\s*min/);
  if (!m) return undefined;
  const mins = parseInt(m[1], 10);
  return mins >= 60 ? `PT${Math.floor(mins / 60)}H${mins % 60}M` : `PT${mins}M`;
};

// Injects schema.org Recipe JSON-LD so Google can show rich recipe results.
export const useRecipeJsonLd = (recipe: Recipe | undefined) => {
  useEffect(() => {
    if (!recipe) return;
    const data = {
      "@context": "https://schema.org",
      "@type": "Recipe",
      name: recipe.title,
      description: recipe.description,
      image: recipe.image.startsWith("http") ? recipe.image : `${SITE}${recipe.image}`,
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
      keywords: recipe.dietaryTags.join(", "),
      author: { "@type": "Organization", name: "PlatterMap" },
    };
    const script = document.createElement("script");
    script.type = "application/ld+json";
    script.text = JSON.stringify(data);
    document.head.appendChild(script);
    return () => {
      document.head.removeChild(script);
    };
  }, [recipe]);
};
