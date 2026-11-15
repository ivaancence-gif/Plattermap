import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { Badge } from "@/components/ui/badge";
import { Sparkles, Loader2, Clock, Users, ChefHat, LogIn } from "lucide-react";
import { supabase } from "@/integrations/supabase/client";
import { toast } from "sonner";
import { useAuth } from "@/hooks/useAuth";
import { RecipePdfButtons } from "@/components/RecipePdfButtons";

interface GeneratedRecipe {
  title: string;
  description: string;
  cookTime: string;
  servings: number;
  difficulty: string;
  ingredients: string[];
  instructions: string[];
  nutrition: { calories: number; protein: string; carbs: string; fat: string; fiber: string };
}

export const GenerateRecipeDialog = () => {
  const [open, setOpen] = useState(false);
  const [prompt, setPrompt] = useState("");
  const [loading, setLoading] = useState(false);
  const [recipe, setRecipe] = useState<GeneratedRecipe | null>(null);
  const { user } = useAuth();
  const navigate = useNavigate();

  const handleGenerate = async () => {
    if (!prompt.trim()) {
      toast.error("Tell us what kind of recipe you want!");
      return;
    }
    setLoading(true);
    setRecipe(null);
    try {
      const { data, error } = await supabase.functions.invoke("generate-recipe", {
        body: { prompt },
      });
      if (error) throw error;
      if (data?.error) throw new Error(data.error);
      setRecipe(data.recipe);
    } catch (e) {
      const msg = e instanceof Error ? e.message : "Failed to generate recipe";
      toast.error(msg);
    } finally {
      setLoading(false);
    }
  };

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <Button className="gap-2">
          <Sparkles className="w-4 h-4" />
          Generate Recipe
        </Button>
      </DialogTrigger>
      <DialogContent className="max-w-2xl max-h-[85vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle className="flex items-center gap-2">
            <Sparkles className="w-5 h-5 text-primary" />
            AI Recipe Generator
          </DialogTitle>
        </DialogHeader>

        <div className="space-y-4">
          {!user ? (
            <div className="rounded-lg border border-border bg-muted/40 p-6 text-center space-y-3">
              <p className="text-sm text-muted-foreground">
                Sign in to generate custom recipes with AI — it's free.
              </p>
              <Button onClick={() => { setOpen(false); navigate("/auth"); }} className="gap-2">
                <LogIn className="w-4 h-4" /> Sign in to generate
              </Button>
            </div>
          ) : (
            <>
              <Textarea
                placeholder="e.g. A high-protein vegetarian dinner with chickpeas and spinach"
                value={prompt}
                onChange={(e) => setPrompt(e.target.value)}
                rows={3}
                disabled={loading}
              />
              <Button onClick={handleGenerate} disabled={loading} className="w-full gap-2">
                {loading ? (
                  <>
                    <Loader2 className="w-4 h-4 animate-spin" /> Generating...
                  </>
                ) : (
                  <>
                    <Sparkles className="w-4 h-4" /> Generate
                  </>
                )}
              </Button>
            </>
          )}

          {recipe && (
            <div className="space-y-4 pt-4 border-t">
              <div className="flex flex-wrap items-start justify-between gap-3">
                <div>
                  <h3 className="text-2xl font-bold text-foreground">{recipe.title}</h3>
                  <p className="text-muted-foreground mt-1">{recipe.description}</p>
                </div>
                <RecipePdfButtons recipe={recipe} size="sm" />
              </div>
              <div className="flex flex-wrap gap-4 text-sm">
                <span className="flex items-center gap-1"><Clock className="w-4 h-4 text-primary" />{recipe.cookTime}</span>
                <span className="flex items-center gap-1"><Users className="w-4 h-4 text-primary" />{recipe.servings} servings</span>
                <span className="flex items-center gap-1"><ChefHat className="w-4 h-4 text-primary" />{recipe.difficulty}</span>
              </div>
              <div>
                <h4 className="font-semibold mb-2 text-foreground">Ingredients</h4>
                <ul className="space-y-1">
                  {recipe.ingredients.map((ing, i) => (
                    <li key={i} className="flex gap-2 text-foreground"><span className="text-primary">•</span>{ing}</li>
                  ))}
                </ul>
              </div>
              <div>
                <h4 className="font-semibold mb-2 text-foreground">Instructions</h4>
                <ol className="space-y-2">
                  {recipe.instructions.map((step, i) => (
                    <li key={i} className="flex gap-3 text-foreground">
                      <span className="flex-shrink-0 w-6 h-6 rounded-full bg-primary text-primary-foreground flex items-center justify-center text-sm font-semibold">{i + 1}</span>
                      <span>{step}</span>
                    </li>
                  ))}
                </ol>
              </div>
              <div>
                <h4 className="font-semibold mb-2 text-foreground">Nutrition (per serving)</h4>
                <div className="flex flex-wrap gap-2">
                  <Badge variant="secondary">{recipe.nutrition.calories} cal</Badge>
                  <Badge variant="secondary">Protein: {recipe.nutrition.protein}</Badge>
                  <Badge variant="secondary">Carbs: {recipe.nutrition.carbs}</Badge>
                  <Badge variant="secondary">Fat: {recipe.nutrition.fat}</Badge>
                  <Badge variant="secondary">Fiber: {recipe.nutrition.fiber}</Badge>
                </div>
              </div>
            </div>
          )}
        </div>
      </DialogContent>
    </Dialog>
  );
};
