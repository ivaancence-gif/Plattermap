import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Sparkles, Loader2, Heart } from "lucide-react";
import { supabase } from "@/integrations/supabase/client";
import { toast } from "sonner";

interface Props {
  recipeTitle: string;
  ingredients: string[];
}

export const HealthFactsCard = ({ recipeTitle, ingredients }: Props) => {
  const [facts, setFacts] = useState<string[] | null>(null);
  const [loading, setLoading] = useState(false);

  const handleLoad = async () => {
    setLoading(true);
    try {
      const { data, error } = await supabase.functions.invoke("health-facts", {
        body: { recipeTitle, ingredients },
      });
      if (error) throw error;
      if (data?.error) throw new Error(data.error);
      setFacts(data.facts);
    } catch (e) {
      const msg = e instanceof Error ? e.message : "Failed to load health facts";
      toast.error(msg);
    } finally {
      setLoading(false);
    }
  };

  return (
    <Card>
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <Heart className="w-5 h-5 text-primary" />
          Health Facts
        </CardTitle>
      </CardHeader>
      <CardContent>
        {!facts && (
          <Button onClick={handleLoad} disabled={loading} variant="outline" className="gap-2">
            {loading ? (
              <>
                <Loader2 className="w-4 h-4 animate-spin" /> Analyzing...
              </>
            ) : (
              <>
                <Sparkles className="w-4 h-4" /> Show AI health facts
              </>
            )}
          </Button>
        )}
        {facts && (
          <ul className="space-y-3">
            {facts.map((fact, i) => (
              <li key={i} className="flex gap-2 text-foreground">
                <span className="text-primary mt-1">•</span>
                <span>{fact}</span>
              </li>
            ))}
          </ul>
        )}
      </CardContent>
    </Card>
  );
};
