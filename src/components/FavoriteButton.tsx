import { Heart } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useFavorites } from "@/hooks/useFavorites";
import { cn } from "@/lib/utils";

interface FavoriteButtonProps {
  recipeId: string;
  size?: "sm" | "default" | "lg";
  className?: string;
}

export const FavoriteButton = ({ recipeId, size = "default", className }: FavoriteButtonProps) => {
  const { isFavorite, toggleFavorite } = useFavorites();
  const favorite = isFavorite(recipeId);

  return (
    <Button
      variant="outline"
      size={size === "sm" ? "icon" : "default"}
      onClick={(e) => {
        e.preventDefault();
        e.stopPropagation();
        toggleFavorite(recipeId);
      }}
      className={cn(
        "gap-2",
        favorite && "text-primary",
        className
      )}
    >
      <Heart
        className={cn(
          "w-4 h-4",
          favorite && "fill-primary"
        )}
      />
      {size !== "sm" && (favorite ? "Saved" : "Save")}
    </Button>
  );
};
