import { useState, useEffect } from "react";
import { supabase } from "@/integrations/supabase/client";
import { useAuth } from "./useAuth";
import { useToast } from "@/hooks/use-toast";

export type ThemePreference = "light" | "dark" | "system";
export type ViewPreference = "grid" | "list";
export type MeasurementUnit = "metric" | "imperial";

export interface UserPreferences {
  id?: string;
  user_id?: string;
  theme: ThemePreference;
  default_view: ViewPreference;
  measurement_unit: MeasurementUnit;
  default_servings: number;
}

export const useUserPreferences = () => {
  const { user } = useAuth();
  const { toast } = useToast();
  const [preferences, setPreferences] = useState<UserPreferences>({
    theme: "system",
    default_view: "grid",
    measurement_unit: "metric",
    default_servings: 4,
  });
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (user) {
      fetchPreferences();
    } else {
      setLoading(false);
    }
  }, [user]);

  const fetchPreferences = async () => {
    if (!user) return;

    try {
      const { data, error } = await supabase
        .from("user_preferences")
        .select("*")
        .eq("user_id", user.id)
        .single();

      if (error && error.code !== "PGRST116") {
        throw error;
      }

      if (data) {
        setPreferences({
          theme: data.theme as ThemePreference,
          default_view: data.default_view as ViewPreference,
          measurement_unit: data.measurement_unit as MeasurementUnit,
          default_servings: data.default_servings,
        });
      }
    } catch (error: any) {
      console.error("Error fetching preferences:", error);
      toast({
        title: "Error",
        description: "Failed to load preferences",
        variant: "destructive",
      });
    } finally {
      setLoading(false);
    }
  };

  const updatePreferences = async (updates: Partial<UserPreferences>) => {
    if (!user) return;

    try {
      const { error } = await supabase
        .from("user_preferences")
        .upsert({
          user_id: user.id,
          ...preferences,
          ...updates,
        });

      if (error) throw error;

      setPreferences((prev) => ({ ...prev, ...updates }));

      toast({
        title: "Success",
        description: "Preferences updated successfully",
      });
    } catch (error: any) {
      console.error("Error updating preferences:", error);
      toast({
        title: "Error",
        description: "Failed to update preferences",
        variant: "destructive",
      });
    }
  };

  return {
    preferences,
    updatePreferences,
    loading,
  };
};
