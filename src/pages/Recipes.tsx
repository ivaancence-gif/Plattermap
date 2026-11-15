import { useState, useEffect, useMemo } from "react";
import { useSearchParams, useNavigate } from "react-router-dom";
import { SearchBar } from "@/components/SearchBar";
import { RecipeCard } from "@/components/RecipeCard";
import { DietaryFilter } from "@/components/DietaryFilter";
import { ChipGroup } from "@/components/ChipGroup";
import { SortSelect } from "@/components/SortSelect";
import { DietaryTag } from "@/data/recipes";
import { useRecipes, getCategories } from "@/hooks/useRecipes";
import { useDebounce } from "@/hooks/useDebounce";
import {
  applyRecipeFilters,
  countActiveFilters,
  getCuisines,
  DIFFICULTIES,
  TIME_FILTERS,
  SortKey,
  RecipeFilters,
} from "@/lib/recipeFilters";
import { Footer } from "@/components/Footer";
import { usePageTitle } from "@/hooks/usePageTitle";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Heart, User, LogOut, Crown, Sparkles, CalendarDays, Settings as SettingsIcon, ShoppingCart } from "lucide-react";
import { useAuth } from "@/hooks/useAuth";
import { useSubscription, TIERS } from "@/hooks/useSubscription";
import logoImage from "@/assets/plattermap-logo.png";
import { ThemeToggle } from "@/components/ThemeToggle";
import { GenerateRecipeDialog } from "@/components/GenerateRecipeDialog";

const Recipes = () => {
  const [searchParams, setSearchParams] = useSearchParams();
  const navigate = useNavigate();
  const { user, signOut } = useAuth();
  const { subscribed, getTierName, productId } = useSubscription();

  const isProUser = subscribed && productId === TIERS.pro.product_id;

  usePageTitle("Browse Recipes");

  const { recipes } = useRecipes();
  const categories = getCategories(recipes);
  const cuisines = useMemo(() => getCuisines(recipes), [recipes]);

  // Immediate text in the input; debounced before it drives filtering.
  const [searchInput, setSearchInput] = useState(searchParams.get("q") ?? "");
  const debouncedQuery = useDebounce(searchInput, 250);

  const [selectedCategory, setSelectedCategory] = useState<string | null>(searchParams.get("category"));
  const [selectedCuisine, setSelectedCuisine] = useState<string | null>(searchParams.get("cuisine"));
  const [selectedDifficulty, setSelectedDifficulty] = useState<string | null>(searchParams.get("difficulty"));
  const [maxTime, setMaxTime] = useState<number | null>(
    searchParams.get("maxTime") ? Number(searchParams.get("maxTime")) : null
  );
  const [selectedDietaryTags, setSelectedDietaryTags] = useState<DietaryTag[]>(
    (searchParams.get("diet")?.split(",").filter(Boolean) as DietaryTag[]) ?? []
  );
  const [sort, setSort] = useState<SortKey>((searchParams.get("sort") as SortKey) ?? "default");

  // Keep category in sync when navigated to with a ?category= link.
  useEffect(() => {
    setSelectedCategory(searchParams.get("category"));
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [searchParams.get("category")]);

  const filters: RecipeFilters = useMemo(
    () => ({
      query: debouncedQuery,
      category: selectedCategory,
      cuisine: selectedCuisine,
      difficulty: selectedDifficulty as RecipeFilters["difficulty"],
      maxTime,
      dietaryTags: selectedDietaryTags,
      sort,
    }),
    [debouncedQuery, selectedCategory, selectedCuisine, selectedDifficulty, maxTime, selectedDietaryTags, sort]
  );

  // Reflect active filters into the URL so a filtered view is shareable.
  useEffect(() => {
    const next: Record<string, string> = {};
    if (debouncedQuery.trim()) next.q = debouncedQuery.trim();
    if (selectedCategory) next.category = selectedCategory;
    if (selectedCuisine) next.cuisine = selectedCuisine;
    if (selectedDifficulty) next.difficulty = selectedDifficulty;
    if (maxTime != null) next.maxTime = String(maxTime);
    if (selectedDietaryTags.length) next.diet = selectedDietaryTags.join(",");
    if (sort !== "default") next.sort = sort;
    setSearchParams(next, { replace: true });
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [debouncedQuery, selectedCategory, selectedCuisine, selectedDifficulty, maxTime, selectedDietaryTags, sort]);

  const filteredRecipes = useMemo(() => applyRecipeFilters(recipes, filters), [recipes, filters]);
  const activeCount = countActiveFilters(filters);

  const handleToggleDietaryTag = (tag: DietaryTag) => {
    setSelectedDietaryTags((prev) => (prev.includes(tag) ? prev.filter((t) => t !== tag) : [...prev, tag]));
  };

  const clearAll = () => {
    setSearchInput("");
    setSelectedCategory(null);
    setSelectedCuisine(null);
    setSelectedDifficulty(null);
    setMaxTime(null);
    setSelectedDietaryTags([]);
    setSort("default");
  };

  return (
    <div className="min-h-screen bg-background">
      {/* Navigation Header */}
      <header className="bg-card border-b border-border sticky top-0 z-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              <img
                src={logoImage}
                alt="PlatterMap"
                className="h-10 cursor-pointer"
                onClick={() => navigate("/")}
              />
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
              <ThemeToggle />
              <Button variant="ghost" onClick={() => navigate("/pricing")} className="gap-2">
                <Crown className="w-4 h-4" />
                Pricing
              </Button>
              {user ? (
                <>
                  {isProUser && (
                    <>
                      <Button variant="ghost" onClick={() => navigate("/meal-planner")} className="gap-2">
                        <CalendarDays className="w-4 h-4" />
                        Meal Planner
                      </Button>
                      <Button variant="ghost" onClick={() => navigate("/shopping-list")} className="gap-2">
                        <ShoppingCart className="w-4 h-4" />
                        Shopping List
                      </Button>
                    </>
                  )}
                  <Button variant="ghost" onClick={() => navigate("/profile")} className="gap-2">
                    <User className="w-4 h-4" />
                    Profile
                  </Button>
                  <Button variant="ghost" onClick={() => navigate("/settings")} className="gap-2">
                    <SettingsIcon className="w-4 h-4" />
                    Settings
                  </Button>
                  <Button variant="ghost" onClick={() => navigate("/favorites")} className="gap-2">
                    <Heart className="w-4 h-4" />
                    Favorites
                  </Button>
                  <Button variant="ghost" onClick={signOut} className="gap-2">
                    <LogOut className="w-4 h-4" />
                    Sign Out
                  </Button>
                </>
              ) : (
                <Button variant="default" onClick={() => navigate("/auth")} className="gap-2">
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
          <div className="flex flex-wrap items-start justify-between gap-4 mb-4">
            <h1 className="text-4xl font-bold text-foreground">All Recipes</h1>
            <GenerateRecipeDialog />
          </div>
          <p className="text-lg text-muted-foreground mb-6">Explore our complete collection of recipes</p>
          <div className="flex flex-col sm:flex-row sm:items-center gap-3">
            <SearchBar
              value={searchInput}
              onChange={setSearchInput}
              placeholder="Search by name, ingredient, or cuisine…"
            />
            <SortSelect value={sort} onChange={setSort} />
          </div>
        </div>
      </section>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Filters */}
        <div className="space-y-6 mb-8">
          <DietaryFilter selectedTags={selectedDietaryTags} onToggleTag={handleToggleDietaryTag} />

          <div>
            <h3 className="text-sm font-semibold text-muted-foreground mb-3">Filter by Category</h3>
            <div className="flex flex-wrap gap-2">
              {categories.map((category) => (
                <Badge
                  key={category.name}
                  variant={selectedCategory === category.name ? "default" : "outline"}
                  className="cursor-pointer transition-all hover:scale-105"
                  onClick={() =>
                    setSelectedCategory(selectedCategory === category.name ? null : category.name)
                  }
                >
                  {category.name}
                  <span className="ml-1 opacity-70">{category.count}</span>
                </Badge>
              ))}
            </div>
          </div>

          <ChipGroup
            title="Cuisine"
            options={cuisines.map((c) => ({ value: c.name, label: c.name, count: c.count }))}
            selected={selectedCuisine}
            onSelect={setSelectedCuisine}
          />

          <ChipGroup
            title="Difficulty"
            options={DIFFICULTIES.map((d) => ({ value: d, label: d }))}
            selected={selectedDifficulty}
            onSelect={setSelectedDifficulty}
          />

          <ChipGroup
            title="Cook time"
            options={TIME_FILTERS.map((t) => ({ value: String(t.value), label: t.label }))}
            selected={maxTime != null ? String(maxTime) : null}
            onSelect={(v) => setMaxTime(v != null ? Number(v) : null)}
          />
        </div>

        {/* Results summary */}
        <div className="mb-4 flex items-center justify-between gap-4">
          <p className="text-sm text-muted-foreground">
            Showing {filteredRecipes.length} recipe{filteredRecipes.length !== 1 ? "s" : ""}
            {selectedCategory && ` in ${selectedCategory}`}
          </p>
          {activeCount > 0 && (
            <Button variant="ghost" size="sm" onClick={clearAll} className="text-xs">
              Clear all filters ({activeCount})
            </Button>
          )}
        </div>

        {filteredRecipes.length > 0 ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
            {filteredRecipes.map((recipe) => (
              <RecipeCard key={recipe.id} recipe={recipe} />
            ))}
          </div>
        ) : (
          <div className="text-center py-16">
            <p className="text-muted-foreground mb-4">No recipes match your filters.</p>
            <Button variant="outline" onClick={clearAll}>
              Clear all filters
            </Button>
          </div>
        )}
      </div>
      <Footer />
    </div>
  );
};

export default Recipes;
