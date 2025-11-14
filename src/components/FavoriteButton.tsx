import { Heart } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useFavorites } from "@/hooks/useFavorites";
import { useSubscription, TIERS } from "@/hooks/useSubscription";
import { useNavigate } from "react-router-dom";
import { cn } from "@/lib/utils";

interface FavoriteButtonProps {
  recipeId: string;
  size?: "sm" | "default" | "lg";
  className?: string;
}

export const FavoriteButton = ({ recipeId, size = "default", className }: FavoriteButtonProps) => {
  const { isFavorite, toggleFavorite } = useFavorites();
  const { subscribed, productId } = useSubscription();
  const navigate = useNavigate();
  const favorite = isFavorite(recipeId);

  const isPremiumUser = subscribed && (
    productId === TIERS.premium.product_id || 
    productId === TIERS.pro.product_id
  );

  const handleClick = (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    
    if (!isPremiumUser) {
      navigate("/pricing");
      return;
    }
    
    toggleFavorite(recipeId);
  };

  return (
    <Button
      variant="outline"
      size={size === "sm" ? "icon" : "default"}
      onClick={handleClick}
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
      {size !== "sm" && (isPremiumUser ? (favorite ? "Saved" : "Save") : "Save (Premium)")}
    </Button>
  );
};
