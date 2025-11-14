import { useEffect, useState } from "react";
import { supabase } from "@/integrations/supabase/client";
import { useAuth } from "./useAuth";
import { toast } from "@/hooks/use-toast";

interface RecipeNote {
  id: string;
  recipe_id: string;
  notes: string | null;
  modifications: string | null;
  created_at: string;
  updated_at: string;
}

export const useRecipeNotes = (recipeId: string) => {
  const { user } = useAuth();
  const [note, setNote] = useState<RecipeNote | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (user && recipeId) {
      loadNote();
    } else {
      setNote(null);
      setLoading(false);
    }
  }, [user, recipeId]);

  const loadNote = async () => {
    if (!user) return;

    try {
      setLoading(true);
      const { data, error } = await supabase
        .from("recipe_notes")
        .select("*")
        .eq("user_id", user.id)
        .eq("recipe_id", recipeId)
        .maybeSingle();

      if (error) throw error;
      setNote(data);
    } catch (error) {
      console.error("Error loading note:", error);
    } finally {
      setLoading(false);
    }
  };

  const saveNote = async (notes: string, modifications: string) => {
    if (!user) {
      toast({
        title: "Sign in required",
        description: "Please sign in to save notes",
        variant: "destructive",
      });
      return;
    }

    try {
      if (note) {
        const { error } = await supabase
          .from("recipe_notes")
          .update({ notes, modifications, updated_at: new Date().toISOString() })
          .eq("id", note.id);

        if (error) throw error;
      } else {
        const { data, error } = await supabase
          .from("recipe_notes")
          .insert({
            user_id: user.id,
            recipe_id: recipeId,
            notes,
            modifications,
          })
          .select()
          .single();

        if (error) throw error;
        setNote(data);
      }

      toast({
        title: "Notes saved",
        description: "Your recipe notes have been saved successfully",
      });
      
      await loadNote();
    } catch (error: any) {
      toast({
        title: "Error",
        description: error.message,
        variant: "destructive",
      });
    }
  };

  const deleteNote = async () => {
    if (!user || !note) return;

    try {
      const { error } = await supabase
        .from("recipe_notes")
        .delete()
        .eq("id", note.id);

      if (error) throw error;

      setNote(null);
      toast({
        title: "Notes deleted",
        description: "Your recipe notes have been deleted",
      });
    } catch (error: any) {
      toast({
        title: "Error",
        description: error.message,
        variant: "destructive",
      });
    }
  };

  return { note, saveNote, deleteNote, loading };
};
