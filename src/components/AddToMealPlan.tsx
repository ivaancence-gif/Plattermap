import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "@/hooks/useAuth";
import { useSubscription, TIERS } from "@/hooks/useSubscription";
import { supabase } from "@/integrations/supabase/client";
import { Button } from "@/components/ui/button";
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { Calendar } from "@/components/ui/calendar";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Calendar as CalendarIcon, Sparkles, Lock } from "lucide-react";
import { toast } from "@/hooks/use-toast";

interface AddToMealPlanProps {
  recipeId: string;
  recipeName: string;
}

export const AddToMealPlan = ({ recipeId, recipeName }: AddToMealPlanProps) => {
  const { user } = useAuth();
  const { subscribed, productId } = useSubscription();
  const navigate = useNavigate();
  const [open, setOpen] = useState(false);
  const [date, setDate] = useState<Date | undefined>(new Date());
  const [mealType, setMealType] = useState<string>("lunch");
  const [saving, setSaving] = useState(false);

  const isProUser = subscribed && productId === TIERS.pro.product_id;

  const handleAddToMealPlan = async () => {
    if (!user || !date) return;

    setSaving(true);
    try {
      const { error } = await supabase
        .from("meal_plans")
        .insert({
          user_id: user.id,
          recipe_id: recipeId,
          planned_date: date.toISOString().split('T')[0],
          meal_type: mealType,
        });

      if (error) throw error;

      toast({
        title: "Added to meal plan",
        description: `${recipeName} has been added to your meal plan`,
      });
      
      setOpen(false);
    } catch (error: any) {
      toast({
        title: "Error",
        description: error.message,
        variant: "destructive",
      });
    } finally {
      setSaving(false);
    }
  };

  if (!isProUser) {
    return (
      <Button 
        variant="outline" 
        onClick={() => navigate("/pricing")}
        className="gap-2"
      >
        <Lock className="w-4 h-4" />
        Add to Meal Plan (Pro)
      </Button>
    );
  }

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <Button variant="outline" className="gap-2">
          <CalendarIcon className="w-4 h-4" />
          Add to Meal Plan
        </Button>
      </DialogTrigger>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Add to Meal Plan</DialogTitle>
          <DialogDescription>
            Schedule {recipeName} for a specific date
          </DialogDescription>
        </DialogHeader>
        <div className="space-y-4">
          <div>
            <label className="text-sm font-medium mb-2 block">Select Date</label>
            <Calendar
              mode="single"
              selected={date}
              onSelect={setDate}
              className="rounded-md border"
              disabled={(date) => date < new Date(new Date().setHours(0, 0, 0, 0))}
            />
          </div>
          <div>
            <label className="text-sm font-medium mb-2 block">Meal Type</label>
            <Select value={mealType} onValueChange={setMealType}>
              <SelectTrigger>
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="breakfast">Breakfast</SelectItem>
                <SelectItem value="lunch">Lunch</SelectItem>
                <SelectItem value="dinner">Dinner</SelectItem>
                <SelectItem value="snack">Snack</SelectItem>
              </SelectContent>
            </Select>
          </div>
          <Button 
            onClick={handleAddToMealPlan} 
            disabled={!date || saving}
            className="w-full"
          >
            {saving ? "Adding..." : "Add to Meal Plan"}
          </Button>
        </div>
      </DialogContent>
    </Dialog>
  );
};
