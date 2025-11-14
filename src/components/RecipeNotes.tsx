import { useState, useEffect } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Textarea } from "@/components/ui/textarea";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { useRecipeNotes } from "@/hooks/useRecipeNotes";
import { useSubscription, TIERS } from "@/hooks/useSubscription";
import { useNavigate } from "react-router-dom";
import { FileText, Crown, Lock } from "lucide-react";

interface RecipeNotesProps {
  recipeId: string;
}

export const RecipeNotes = ({ recipeId }: RecipeNotesProps) => {
  const { note, saveNote, loading } = useRecipeNotes(recipeId);
  const { subscribed, productId } = useSubscription();
  const navigate = useNavigate();
  const [notes, setNotes] = useState("");
  const [modifications, setModifications] = useState("");
  const [saving, setSaving] = useState(false);

  const isPremiumUser = subscribed && (
    productId === TIERS.premium.product_id || 
    productId === TIERS.pro.product_id
  );

  useEffect(() => {
    if (note) {
      setNotes(note.notes || "");
      setModifications(note.modifications || "");
    }
  }, [note]);

  const handleSave = async () => {
    setSaving(true);
    await saveNote(notes, modifications);
    setSaving(false);
  };

  if (!isPremiumUser) {
    return (
      <Card className="border-primary/20">
        <CardHeader>
          <div className="flex items-center justify-between">
            <CardTitle className="flex items-center gap-2">
              <FileText className="w-5 h-5" />
              Recipe Notes & Modifications
            </CardTitle>
            <Badge variant="secondary" className="gap-1 bg-primary/10 text-primary">
              <Crown className="w-3 h-3" />
              Premium
            </Badge>
          </div>
          <CardDescription>Add personal notes and modifications to recipes</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="text-center py-8 space-y-4">
            <div className="w-16 h-16 bg-muted rounded-full flex items-center justify-center mx-auto">
              <Lock className="w-8 h-8 text-muted-foreground" />
            </div>
            <div>
              <h3 className="font-semibold mb-2">Premium Feature</h3>
              <p className="text-muted-foreground text-sm mb-4">
                Upgrade to Premium to add personal notes and modifications to your favorite recipes
              </p>
            </div>
            <Button onClick={() => navigate("/pricing")}>
              <Crown className="w-4 h-4 mr-2" />
              Upgrade to Premium
            </Button>
          </div>
        </CardContent>
      </Card>
    );
  }

  return (
    <Card>
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <FileText className="w-5 h-5" />
          Recipe Notes & Modifications
        </CardTitle>
        <CardDescription>Add your personal notes and recipe modifications</CardDescription>
      </CardHeader>
      <CardContent className="space-y-4">
        <div>
          <label className="text-sm font-medium mb-2 block">Personal Notes</label>
          <Textarea
            placeholder="Add your thoughts about this recipe..."
            value={notes}
            onChange={(e) => setNotes(e.target.value)}
            rows={4}
            disabled={loading}
          />
        </div>
        <div>
          <label className="text-sm font-medium mb-2 block">Modifications</label>
          <Textarea
            placeholder="How did you modify this recipe?"
            value={modifications}
            onChange={(e) => setModifications(e.target.value)}
            rows={4}
            disabled={loading}
          />
        </div>
        <Button 
          onClick={handleSave} 
          disabled={saving || loading}
          className="w-full"
        >
          {saving ? "Saving..." : "Save Notes"}
        </Button>
      </CardContent>
    </Card>
  );
};
