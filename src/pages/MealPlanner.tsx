import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "@/hooks/useAuth";
import { useSubscription, TIERS } from "@/hooks/useSubscription";
import { supabase } from "@/integrations/supabase/client";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Calendar } from "@/components/ui/calendar";
import { ArrowLeft, Calendar as CalendarIcon, Lock, Sparkles } from "lucide-react";
import { recipes } from "@/data/recipes";
import { internationalRecipes } from "@/data/internationalRecipes";
import { toast } from "@/hooks/use-toast";

interface MealPlan {
  id: string;
  recipe_id: string;
  planned_date: string;
  meal_type: string | null;
}

const MealPlanner = () => {
  const navigate = useNavigate();
  const { user, loading: authLoading } = useAuth();
  const { subscribed, productId } = useSubscription();
  const [mealPlans, setMealPlans] = useState<MealPlan[]>([]);
  const [selectedDate, setSelectedDate] = useState<Date | undefined>(new Date());
  const [loading, setLoading] = useState(true);

  const isProUser = subscribed && productId === TIERS.pro.product_id;

  useEffect(() => {
    if (!authLoading && !user) {
      navigate("/auth");
    }
  }, [user, authLoading, navigate]);

  useEffect(() => {
    if (user && isProUser) {
      loadMealPlans();
    } else {
      setLoading(false);
    }
  }, [user, isProUser]);

  const loadMealPlans = async () => {
    if (!user) return;

    try {
      setLoading(true);
      const { data, error } = await supabase
        .from("meal_plans")
        .select("*")
        .eq("user_id", user.id)
        .order("planned_date", { ascending: true });

      if (error) throw error;
      setMealPlans(data || []);
    } catch (error) {
      console.error("Error loading meal plans:", error);
      toast({
        title: "Error",
        description: "Failed to load meal plans",
        variant: "destructive",
      });
    } finally {
      setLoading(false);
    }
  };

  const getRecipeById = (recipeId: string) => {
    const allRecipes = [...recipes, ...internationalRecipes];
    return allRecipes.find(r => r.id === recipeId);
  };

  const getPlansForDate = (date: Date) => {
    const dateStr = date.toISOString().split('T')[0];
    return mealPlans.filter(plan => plan.planned_date === dateStr);
  };

  const selectedDatePlans = selectedDate ? getPlansForDate(selectedDate) : [];

  if (authLoading || loading) {
    return (
      <div className="min-h-screen bg-background flex items-center justify-center">
        <p className="text-muted-foreground">Loading...</p>
      </div>
    );
  }

  if (!isProUser) {
    return (
      <div className="min-h-screen bg-background">
        <header className="bg-card border-b border-border sticky top-0 z-10">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
            <Button
              variant="ghost"
              onClick={() => navigate("/")}
              className="gap-2"
            >
              <ArrowLeft className="w-4 h-4" />
              Back
            </Button>
          </div>
        </header>

        <main className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
          <Card className="border-primary/20">
            <CardHeader>
              <div className="flex items-center justify-between">
                <CardTitle className="flex items-center gap-2">
                  <CalendarIcon className="w-5 h-5" />
                  Meal Planning Calendar
                </CardTitle>
                <Badge variant="secondary" className="gap-1 bg-primary/10 text-primary">
                  <Sparkles className="w-3 h-3" />
                  Pro
                </Badge>
              </div>
              <CardDescription>Plan your meals for the week</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="text-center py-12 space-y-4">
                <div className="w-16 h-16 bg-muted rounded-full flex items-center justify-center mx-auto">
                  <Lock className="w-8 h-8 text-muted-foreground" />
                </div>
                <div>
                  <h3 className="font-semibold text-lg mb-2">Pro Feature</h3>
                  <p className="text-muted-foreground mb-6">
                    Upgrade to Pro to access the meal planning calendar and schedule recipes for specific dates
                  </p>
                </div>
                <Button onClick={() => navigate("/pricing")} size="lg">
                  <Sparkles className="w-4 h-4 mr-2" />
                  Upgrade to Pro
                </Button>
              </div>
            </CardContent>
          </Card>
        </main>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-background">
      <header className="bg-card border-b border-border sticky top-0 z-10">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
          <div className="flex items-center justify-between">
            <Button
              variant="ghost"
              onClick={() => navigate("/")}
              className="gap-2"
            >
              <ArrowLeft className="w-4 h-4" />
              Back
            </Button>
            <h1 className="text-2xl font-bold text-foreground flex items-center gap-2">
              <CalendarIcon className="w-6 h-6" />
              Meal Planner
            </h1>
            <div className="w-20" />
          </div>
        </div>
      </header>

      <main className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid md:grid-cols-2 gap-8">
          <Card>
            <CardHeader>
              <CardTitle>Calendar</CardTitle>
              <CardDescription>Select a date to view or add meals</CardDescription>
            </CardHeader>
            <CardContent>
              <Calendar
                mode="single"
                selected={selectedDate}
                onSelect={setSelectedDate}
                className="rounded-md border"
              />
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>
                {selectedDate ? selectedDate.toLocaleDateString("en-US", { 
                  weekday: 'long', 
                  year: 'numeric', 
                  month: 'long', 
                  day: 'numeric' 
                }) : "Select a date"}
              </CardTitle>
              <CardDescription>Planned meals for this day</CardDescription>
            </CardHeader>
            <CardContent>
              {selectedDatePlans.length === 0 ? (
                <div className="text-center py-12">
                  <CalendarIcon className="w-12 h-12 text-muted-foreground mx-auto mb-4" />
                  <p className="text-muted-foreground">No meals planned for this date</p>
                  <Button variant="outline" className="mt-4" onClick={() => navigate("/recipes")}>
                    Browse Recipes
                  </Button>
                </div>
              ) : (
                <div className="space-y-4">
                  {selectedDatePlans.map((plan) => {
                    const recipe = getRecipeById(plan.recipe_id);
                    if (!recipe) return null;
                    
                    return (
                      <Card key={plan.id} className="cursor-pointer hover:shadow-md transition-shadow"
                        onClick={() => navigate(`/recipe/${recipe.id}`)}>
                        <CardContent className="p-4 flex gap-4">
                          <img 
                            src={recipe.image} 
                            alt={recipe.title}
                            className="w-20 h-20 object-cover rounded"
                          />
                          <div className="flex-1">
                            <h3 className="font-semibold">{recipe.title}</h3>
                            <p className="text-sm text-muted-foreground">{recipe.category}</p>
                            {plan.meal_type && (
                              <Badge variant="secondary" className="mt-2">
                                {plan.meal_type}
                              </Badge>
                            )}
                          </div>
                        </CardContent>
                      </Card>
                    );
                  })}
                </div>
              )}
            </CardContent>
          </Card>
        </div>
      </main>
    </div>
  );
};

export default MealPlanner;
