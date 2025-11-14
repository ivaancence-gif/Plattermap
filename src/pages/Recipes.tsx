import { useState, useEffect } from "react";
import { useSearchParams, useNavigate } from "react-router-dom";
import { SearchBar } from "@/components/SearchBar";
import { RecipeCard } from "@/components/RecipeCard";
import { DietaryFilter } from "@/components/DietaryFilter";
import { recipes, categories, DietaryTag } from "@/data/recipes";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Heart, User, LogOut, Crown, Sparkles } from "lucide-react";
import { useAuth } from "@/hooks/useAuth";
import { useSubscription } from "@/hooks/useSubscription";

const Recipes = () => {
  const [searchParams, setSearchParams] = useSearchParams();
  const navigate = useNavigate();
  const { user, signOut } = useAuth();
  const { subscribed, getTierName } = useSubscription();
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedCategory, setSelectedCategory] = useState<string | null>(
    searchParams.get("category")
  );
  const [selectedDietaryTags, setSelectedDietaryTags] = useState<DietaryTag[]>([]);

  useEffect(() => {
    const category = searchParams.get("category");
    setSelectedCategory(category);
  }, [searchParams]);

  const filteredRecipes = recipes.filter((recipe) => {
    const matchesSearch =
      recipe.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      recipe.description.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesCategory = selectedCategory
      ? recipe.category === selectedCategory
      : true;
    const matchesDietary = selectedDietaryTags.length === 0 ||
      selectedDietaryTags.every(tag => recipe.dietaryTags.includes(tag));
    return matchesSearch && matchesCategory && matchesDietary;
  });

  const handleCategoryClick = (categoryName: string) => {
    if (selectedCategory === categoryName) {
      setSelectedCategory(null);
      setSearchParams({});
    } else {
      setSelectedCategory(categoryName);
      setSearchParams({ category: categoryName });
    }
  };

  const handleToggleDietaryTag = (tag: DietaryTag) => {
    setSelectedDietaryTags(prev =>
      prev.includes(tag) ? prev.filter(t => t !== tag) : [...prev, tag]
    );
  };

  return (
    <div className="min-h-screen bg-background">
      {/* Navigation Header */}
      <header className="bg-card border-b border-border sticky top-0 z-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              <h2 
                className="text-xl font-bold text-foreground cursor-pointer" 
                onClick={() => navigate("/")}
              >
                Recipe Haven
              </h2>
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

      {/* Header */}
      <section className="bg-gradient-to-r from-primary/10 to-secondary/10 py-12 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto">
          <h1 className="text-4xl font-bold text-foreground mb-4">All Recipes</h1>
          <p className="text-lg text-muted-foreground mb-6">
            Explore our complete collection of recipes
          </p>
          <SearchBar
            value={searchQuery}
            onChange={setSearchQuery}
            placeholder="Search all recipes..."
          />
        </div>
      </section>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Dietary Filter */}
        <div className="mb-8">
          <DietaryFilter 
            selectedTags={selectedDietaryTags}
            onToggleTag={handleToggleDietaryTag}
          />
        </div>

        {/* Category Filter */}
        <div className="mb-8">
          <h3 className="text-sm font-semibold text-muted-foreground mb-3">
            Filter by Category
          </h3>
          <div className="flex flex-wrap gap-2">
            {categories.map((category) => (
              <Button
                key={category.name}
                variant={selectedCategory === category.name ? "default" : "outline"}
                onClick={() => handleCategoryClick(category.name)}
                className="transition-all"
              >
                {category.name}
                <Badge variant="secondary" className="ml-2">
                  {category.count}
                </Badge>
              </Button>
            ))}
          </div>
        </div>

        {/* Results */}
        <div className="mb-4">
          <p className="text-sm text-muted-foreground">
            Showing {filteredRecipes.length} recipe{filteredRecipes.length !== 1 ? "s" : ""}
            {selectedCategory && ` in ${selectedCategory}`}
          </p>
        </div>

        {filteredRecipes.length > 0 ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
            {filteredRecipes.map((recipe) => (
              <RecipeCard key={recipe.id} recipe={recipe} />
            ))}
          </div>
        ) : (
          <div className="text-center py-12">
            <p className="text-muted-foreground">
              No recipes found. Try adjusting your filters.
            </p>
          </div>
        )}
      </div>
    </div>
  );
};

export default Recipes;
