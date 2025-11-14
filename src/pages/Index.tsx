import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { SearchBar } from "@/components/SearchBar";
import { CategoryCard } from "@/components/CategoryCard";
import { RecipeCard } from "@/components/RecipeCard";
import { recipes, categories } from "@/data/recipes";
import { Button } from "@/components/ui/button";
import { UtensilsCrossed, Cake, Coffee, Soup, Salad, Sun, Heart, User, LogOut } from "lucide-react";
import { useAuth } from "@/hooks/useAuth";
import heroImage from "@/assets/hero-food.jpg";
import categoryMeals from "@/assets/category-meals.jpg";
import categorySalads from "@/assets/category-salads.jpg";
import categoryDesserts from "@/assets/category-desserts.jpg";
import categoryDrinks from "@/assets/category-drinks.jpg";
import categorySoups from "@/assets/category-soups.jpg";
import categoryBreakfast from "@/assets/category-breakfast.jpg";

const categoryIcons = {
  "Meals": UtensilsCrossed,
  "Desserts": Cake,
  "Drinks": Coffee,
  "Soups": Soup,
  "Salads": Salad,
  "Breakfast": Sun
};

const categoryImages = {
  "Meals": categoryMeals,
  "Salads": categorySalads,
  "Desserts": categoryDesserts,
  "Drinks": categoryDrinks,
  "Soups": categorySoups,
  "Breakfast": categoryBreakfast
};

const Index = () => {
  const [searchQuery, setSearchQuery] = useState("");
  const navigate = useNavigate();
  const { user, signOut } = useAuth();

  const filteredRecipes = recipes.filter(recipe =>
    recipe.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
    recipe.category.toLowerCase().includes(searchQuery.toLowerCase()) ||
    recipe.description.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const handleCategoryClick = (categoryName: string) => {
    navigate(`/recipes?category=${categoryName}`);
  };

  return (
    <div className="min-h-screen bg-background">
      {/* Navigation Header */}
      <header className="bg-card border-b border-border sticky top-0 z-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
          <div className="flex items-center justify-between">
            <h2 className="text-xl font-bold text-foreground">Recipe Haven</h2>
            <div className="flex items-center gap-2">
              {user ? (
                <>
                  <Button
                    variant="ghost"
                    onClick={() => navigate("/favorites")}
                    className="gap-2"
                  >
                    <Heart className="w-4 h-4" />
                    Favorites
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
              ) : (
                <Button
                  variant="default"
                  onClick={() => navigate("/auth")}
                  className="gap-2"
                >
                  <User className="w-4 h-4" />
                  Sign In
                </Button>
              )}
            </div>
          </div>
        </div>
      </header>
      
      {/* Hero Section */}
      <section className="relative h-[500px] overflow-hidden">
        <div className="absolute inset-0">
          <img
            src={heroImage}
            alt="Delicious food"
            className="w-full h-full object-cover"
          />
          <div className="absolute inset-0 bg-gradient-to-r from-warm-brown/90 to-warm-brown/40" />
        </div>
        <div className="relative h-full max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex flex-col justify-center">
          <h1 className="text-5xl md:text-6xl font-bold text-white mb-4">
            Recipe Book
          </h1>
          <p className="text-xl md:text-2xl text-white/90 mb-8 max-w-2xl">
            Discover delicious recipes from around the world. From hearty meals to sweet desserts, find your next favorite dish.
          </p>
          <div className="flex flex-col sm:flex-row gap-4">
            <SearchBar
              value={searchQuery}
              onChange={setSearchQuery}
              placeholder="Search for any recipe..."
            />
            <Button
              size="lg"
              onClick={() => navigate('/recipes')}
              className="bg-primary hover:bg-primary/90"
            >
              Browse All Recipes
            </Button>
          </div>
        </div>
      </section>

      {/* Categories Section */}
      <section className="py-16 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto">
        <h2 className="text-3xl font-bold text-foreground mb-8">Browse by Category</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {categories.map((category) => (
            <CategoryCard
              key={category.name}
              name={category.name}
              count={category.count}
              icon={categoryIcons[category.name as keyof typeof categoryIcons]}
              image={categoryImages[category.name as keyof typeof categoryImages]}
              onClick={() => handleCategoryClick(category.name)}
            />
          ))}
        </div>
      </section>

      {/* Featured Recipes */}
      <section className="py-16 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto bg-accent/30">
        <h2 className="text-3xl font-bold text-foreground mb-8">
          {searchQuery ? "Search Results" : "Featured Recipes"}
        </h2>
        {filteredRecipes.length > 0 ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {filteredRecipes.slice(0, 6).map((recipe) => (
              <RecipeCard key={recipe.id} recipe={recipe} />
            ))}
          </div>
        ) : (
          <p className="text-center text-muted-foreground py-12">
            No recipes found. Try a different search term.
          </p>
        )}
        {!searchQuery && (
          <div className="text-center mt-8">
            <Button
              variant="outline"
              size="lg"
              onClick={() => navigate('/recipes')}
            >
              View All Recipes
            </Button>
          </div>
        )}
      </section>
    </div>
  );
};

export default Index;
