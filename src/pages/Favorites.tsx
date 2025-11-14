import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "@/hooks/useAuth";
import { useFavorites } from "@/hooks/useFavorites";
import { useSubscription } from "@/hooks/useSubscription";
import { recipes } from "@/data/recipes";
import { internationalRecipes } from "@/data/internationalRecipes";
import { RecipeCard } from "@/components/RecipeCard";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Heart, ArrowLeft, Crown, Sparkles, User, LogOut } from "lucide-react";

const Favorites = () => {
  const { user, loading: authLoading, signOut } = useAuth();
  const { favorites, loading: favLoading } = useFavorites();
  const { subscribed, getTierName } = useSubscription();
  const navigate = useNavigate();
  const [favoriteRecipes, setFavoriteRecipes] = useState<typeof recipes>([]);

  useEffect(() => {
    if (!authLoading && !user) {
      navigate("/auth");
    }
  }, [user, authLoading, navigate]);

  useEffect(() => {
    const allRecipes = [...recipes, ...internationalRecipes];
    const favRecipes = allRecipes.filter((recipe) =>
      favorites.includes(recipe.id)
    );
    setFavoriteRecipes(favRecipes);
  }, [favorites]);

  if (authLoading || favLoading) {
    return (
      <div className="min-h-screen bg-background flex items-center justify-center">
        <p className="text-muted-foreground">Loading...</p>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <header className="bg-card border-b border-border sticky top-0 z-10">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2">
              <Button
                variant="ghost"
                onClick={() => navigate("/")}
                className="gap-2"
              >
                <ArrowLeft className="w-4 h-4" />
                Back
              </Button>
              <Button
                variant="ghost"
                onClick={() => navigate("/pricing")}
                className="gap-2"
              >
                <Crown className="w-4 h-4" />
                Pricing
              </Button>
              {user && (
                <>
                  <Button
                    variant="ghost"
                    onClick={() => navigate("/profile")}
                    className="gap-2"
                  >
                    <User className="w-4 h-4" />
                    Profile
                  </Button>
                  <Button
                    variant="ghost"
                    onClick={signOut}
                    className="gap-2"
                  >
                    <LogOut className="w-4 h-4" />
                    Sign Out
                  </Button>
                </>
              )}
            </div>
            <div className="flex items-center gap-3">
              <Heart className="w-6 h-6 text-primary fill-primary" />
              <h1 className="text-2xl font-bold text-foreground">My Favorites</h1>
              {subscribed && getTierName() && (
                <Badge 
                  variant="secondary" 
                  className="gap-1 bg-primary/10 text-primary border-primary/20 hover:bg-primary/20"
                  onClick={() => navigate("/pricing")}
                  style={{ cursor: "pointer" }}
                >
                  {getTierName() === "Premium" ? (
                    <Crown className="w-3 h-3" />
                  ) : (
                    <Sparkles className="w-3 h-3" />
                  )}
                  {getTierName()}
                </Badge>
              )}
            </div>
            <div className="w-32" /> {/* Spacer for centering */}
          </div>
        </div>
      </header>

      {/* Content */}
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        {favoriteRecipes.length === 0 ? (
          <div className="text-center py-20">
            <Heart className="w-16 h-16 text-muted-foreground mx-auto mb-4" />
            <h2 className="text-2xl font-semibold text-foreground mb-2">
              No favorites yet
            </h2>
            <p className="text-muted-foreground mb-6">
              Start exploring recipes and save your favorites!
            </p>
            <Button onClick={() => navigate("/recipes")}>
              Browse Recipes
            </Button>
          </div>
        ) : (
          <>
            <p className="text-muted-foreground mb-8">
              {favoriteRecipes.length} {favoriteRecipes.length === 1 ? "recipe" : "recipes"} saved
            </p>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
              {favoriteRecipes.map((recipe) => (
                <RecipeCard key={recipe.id} recipe={recipe} />
              ))}
            </div>
          </>
        )}
      </main>
    </div>
  );
};

export default Favorites;
