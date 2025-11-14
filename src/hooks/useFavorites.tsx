import { useEffect, useState } from "react";
import { supabase } from "@/integrations/supabase/client";
import { useAuth } from "./useAuth";
import { toast } from "@/hooks/use-toast";

export const useFavorites = () => {
  const { user } = useAuth();
  const [favorites, setFavorites] = useState<string[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (user) {
      loadFavorites();
    } else {
      setFavorites([]);
      setLoading(false);
    }
  }, [user]);

  const loadFavorites = async () => {
    if (!user) return;
    
    try {
      const { data, error } = await supabase
        .from("favorites")
        .select("recipe_id")
        .eq("user_id", user.id);

      if (error) throw error;

      setFavorites(data?.map((f) => f.recipe_id) || []);
    } catch (error) {
      console.error("Error loading favorites:", error);
    } finally {
      setLoading(false);
    }
  };

  const toggleFavorite = async (recipeId: string) => {
    if (!user) {
      toast({
        title: "Sign in required",
        description: "Please sign in to save favorites",
        variant: "destructive",
      });
      return;
    }

    const isFavorite = favorites.includes(recipeId);

    try {
      if (isFavorite) {
        const { error } = await supabase
          .from("favorites")
          .delete()
          .eq("user_id", user.id)
          .eq("recipe_id", recipeId);

        if (error) throw error;

        setFavorites(favorites.filter((id) => id !== recipeId));
        toast({
          title: "Removed from favorites",
        });
      } else {
        const { error } = await supabase
          .from("favorites")
          .insert({
            user_id: user.id,
            recipe_id: recipeId,
          });

        if (error) throw error;

        setFavorites([...favorites, recipeId]);
        toast({
          title: "Added to favorites",
        });
      }
    } catch (error: any) {
      toast({
        title: "Error",
        description: error.message,
        variant: "destructive",
      });
    }
  };

  const isFavorite = (recipeId: string) => favorites.includes(recipeId);

  return { favorites, toggleFavorite, isFavorite, loading };
};
