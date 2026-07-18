import { Recipe } from "@/data/recipes";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Clock, Users } from "lucide-react";
import { Link } from "react-router-dom";
import { FavoriteButton } from "@/components/FavoriteButton";

interface RecipeCardProps {
  recipe: Recipe;
}

export const RecipeCard = ({ recipe }: RecipeCardProps) => {
  return (
    <Link to={`/recipe/${recipe.id}`} className="block h-full">
      <Card className="h-full flex flex-col overflow-hidden transition-all duration-300 hover:shadow-lg hover:-translate-y-1 cursor-pointer border-border/50">
        <div className="aspect-square overflow-hidden bg-muted">
          <img
            src={recipe.image}
            alt={recipe.title}
            className="w-full h-full object-cover transition-transform duration-300 hover:scale-110"
          />
        </div>
        <CardContent className="p-4 flex flex-col flex-1">
          <div className="flex items-center justify-between mb-2">
            <div className="flex gap-2">
              <Badge variant="secondary" className="bg-secondary/50">
                {recipe.category}
              </Badge>
              <Badge 
                variant="outline" 
                className={
                  recipe.difficulty === "Easy" 
                    ? "border-secondary text-secondary" 
                    : recipe.difficulty === "Medium"
                    ? "border-primary text-primary"
                    : "border-destructive text-destructive"
                }
              >
                {recipe.difficulty}
              </Badge>
            </div>
            <FavoriteButton recipeId={recipe.id} size="sm" />
          </div>
          {recipe.cuisine && (
            <p className="text-xs text-muted-foreground mb-2">
              {recipe.cuisine} Cuisine
            </p>
          )}
          <h3 className="font-semibold text-lg mb-2 text-foreground line-clamp-1">
            {recipe.title}
          </h3>
          <p className="text-sm text-muted-foreground mb-3 line-clamp-2">
            {recipe.description}
          </p>
          {recipe.dietaryTags && recipe.dietaryTags.length > 0 && (
            <div className="flex flex-wrap gap-1 mb-3">
              {recipe.dietaryTags.slice(0, 3).map((tag) => (
                <Badge key={tag} variant="outline" className="text-xs border-sage text-sage">
                  {tag}
                </Badge>
              ))}
            </div>
          )}
          <div className="mt-auto flex items-center gap-4 text-sm text-muted-foreground">
            <div className="flex items-center gap-1">
              <Clock className="w-4 h-4" />
              <span>{recipe.cookTime}</span>
            </div>
            <div className="flex items-center gap-1">
              <Users className="w-4 h-4" />
              <span>{recipe.servings} servings</span>
            </div>
          </div>
        </CardContent>
      </Card>
    </Link>
  );
};
