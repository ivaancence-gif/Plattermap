import { useParams, useNavigate } from "react-router-dom";
import { useRecipes } from "@/hooks/useRecipes";
import { Footer } from "@/components/Footer";
import { usePageTitle } from "@/hooks/usePageTitle";
import { useRecipeJsonLd } from "@/hooks/useRecipeJsonLd";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Separator } from "@/components/ui/separator";
import { ArrowLeft, Clock, Users, ChefHat } from "lucide-react";
import { FavoriteButton } from "@/components/FavoriteButton";
import { RecipeNotes } from "@/components/RecipeNotes";
import { AddToMealPlan } from "@/components/AddToMealPlan";
import { AddToShoppingList } from "@/components/AddToShoppingList";
import { RecipePdfButtons } from "@/components/RecipePdfButtons";
import { HealthFactsCard } from "@/components/HealthFactsCard";

const RecipeDetail = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const { recipes: allRecipes } = useRecipes();
  const recipe = allRecipes.find((r) => r.id === id);
  usePageTitle(recipe?.title);
  useRecipeJsonLd(recipe);

  if (!recipe) {
    return (
      <div className="min-h-screen bg-background flex items-center justify-center">
        <div className="text-center">
          <h1 className="text-2xl font-bold text-foreground mb-4">Recipe not found</h1>
          <Button onClick={() => navigate("/")}>Back to Home</Button>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-background">
      {/* Header Image */}
      <div className="relative h-[400px] overflow-hidden">
        <img
          src={recipe.image}
          alt={recipe.title}
          className="w-full h-full object-cover"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-background via-background/50 to-transparent" />
        <Button
          variant="secondary"
          className="absolute top-4 left-4"
          onClick={() => navigate(-1)}
        >
          <ArrowLeft className="w-4 h-4 mr-2" />
          Back
        </Button>
      </div>

      <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 -mt-20 relative z-10 pb-12">
        {/* Recipe Header */}
        <Card className="mb-8">
          <CardContent className="pt-6">
            <div className="flex flex-wrap items-start justify-between gap-3 mb-4">
              <div className="flex flex-wrap gap-2">
                <Badge variant="secondary">{recipe.category}</Badge>
                <Badge variant="outline">{recipe.difficulty}</Badge>
                {recipe.cuisine && (
                  <Badge variant="outline">{recipe.cuisine} Cuisine</Badge>
                )}
              </div>
              <div className="flex flex-wrap gap-2">
                <AddToShoppingList
                  ingredients={recipe.ingredients}
                  recipeId={recipe.id}
                  recipeName={recipe.title}
                />
                <AddToMealPlan recipeId={recipe.id} recipeName={recipe.title} />
                <FavoriteButton recipeId={recipe.id} />
              </div>
            </div>
            <h1 className="text-4xl font-bold text-foreground mb-4">{recipe.title}</h1>
            <p className="text-lg text-muted-foreground mb-6">{recipe.description}</p>
            <div className="flex flex-wrap gap-6 text-sm">
              <div className="flex items-center gap-2">
                <Clock className="w-5 h-5 text-primary" />
                <span className="text-foreground">{recipe.cookTime}</span>
              </div>
              <div className="flex items-center gap-2">
                <Users className="w-5 h-5 text-primary" />
                <span className="text-foreground">{recipe.servings} servings</span>
              </div>
              <div className="flex items-center gap-2">
                <ChefHat className="w-5 h-5 text-primary" />
                <span className="text-foreground">{recipe.difficulty} difficulty</span>
              </div>
            </div>
            <div className="mt-6">
              <RecipePdfButtons recipe={recipe} />
            </div>
          </CardContent>
        </Card>

        <div className="grid md:grid-cols-3 gap-8">
          {/* Ingredients */}
          <Card className="md:col-span-1">
            <CardHeader>
              <CardTitle>Ingredients</CardTitle>
            </CardHeader>
            <CardContent>
              <ul className="space-y-2">
                {recipe.ingredients.map((ingredient, index) => (
                  <li key={index} className="flex items-start gap-2">
                    <span className="text-primary mt-1">•</span>
                    <span className="text-foreground">{ingredient}</span>
                  </li>
                ))}
              </ul>
            </CardContent>
          </Card>

          {/* Instructions & Nutrition */}
          <div className="md:col-span-2 space-y-8">
            {/* Instructions */}
            <Card>
              <CardHeader>
                <CardTitle>Instructions</CardTitle>
              </CardHeader>
              <CardContent>
                <ol className="space-y-4">
                  {recipe.instructions.map((instruction, index) => (
                    <li key={index} className="flex gap-4">
                      <span className="flex-shrink-0 w-8 h-8 rounded-full bg-primary text-primary-foreground flex items-center justify-center font-semibold">
                        {index + 1}
                      </span>
                      <p className="text-foreground pt-1">{instruction}</p>
                    </li>
                  ))}
                </ol>
              </CardContent>
            </Card>

            {/* Nutrition Facts */}
            <Card>
              <CardHeader>
                <CardTitle>Nutrition Facts</CardTitle>
                <p className="text-sm text-muted-foreground">Per serving</p>
              </CardHeader>
              <CardContent>
                <div className="space-y-3">
                  <div className="flex justify-between items-center">
                    <span className="font-semibold text-foreground">Calories</span>
                    <span className="text-2xl font-bold text-primary">
                      {recipe.nutrition.calories}
                    </span>
                  </div>
                  <Separator />
                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <p className="text-sm text-muted-foreground">Protein</p>
                      <p className="text-lg font-semibold text-foreground">
                        {recipe.nutrition.protein}
                      </p>
                    </div>
                    <div>
                      <p className="text-sm text-muted-foreground">Carbs</p>
                      <p className="text-lg font-semibold text-foreground">
                        {recipe.nutrition.carbs}
                      </p>
                    </div>
                    <div>
                      <p className="text-sm text-muted-foreground">Fat</p>
                      <p className="text-lg font-semibold text-foreground">
                        {recipe.nutrition.fat}
                      </p>
                    </div>
                    <div>
                      <p className="text-sm text-muted-foreground">Fiber</p>
                      <p className="text-lg font-semibold text-foreground">
                        {recipe.nutrition.fiber}
                      </p>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Recipe Notes */}
            <HealthFactsCard recipeTitle={recipe.title} ingredients={recipe.ingredients} />

            {/* Recipe Notes */}
            <RecipeNotes recipeId={recipe.id} />
          </div>
        </div>
      </div>
      <Footer />
    </div>
  );
};

export default RecipeDetail;
