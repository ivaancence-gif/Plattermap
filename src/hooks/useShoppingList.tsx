import { useState, useEffect } from "react";
import { supabase } from "@/integrations/supabase/client";
import { useAuth } from "./useAuth";
import { toast } from "@/hooks/use-toast";

export interface ShoppingListItem {
  id: string;
  ingredient: string;
  checked: boolean;
  recipeId?: string;
  recipeName?: string;
}

export interface ShoppingList {
  id: string;
  name: string;
  items: ShoppingListItem[];
  created_at: string;
  updated_at: string;
}

export const useShoppingList = () => {
  const { user } = useAuth();
  const [lists, setLists] = useState<ShoppingList[]>([]);
  const [loading, setLoading] = useState(true);

  const fetchLists = async () => {
    if (!user) {
      setLists([]);
      setLoading(false);
      return;
    }

    try {
      const { data, error } = await supabase
        .from("shopping_lists")
        .select("*")
        .order("created_at", { ascending: false });

      if (error) throw error;
      setLists(data || []);
    } catch (error: any) {
      console.error("Error fetching shopping lists:", error);
      toast({
        title: "Error",
        description: "Failed to load shopping lists",
        variant: "destructive",
      });
    } finally {
      setLoading(false);
    }
  };

  const createList = async (name: string) => {
    if (!user) return null;

    try {
      const { data, error } = await supabase
        .from("shopping_lists")
        .insert({ name, items: [] })
        .select()
        .single();

      if (error) throw error;

      setLists([data, ...lists]);
      toast({
        title: "Success",
        description: "Shopping list created",
      });
      return data;
    } catch (error: any) {
      console.error("Error creating shopping list:", error);
      toast({
        title: "Error",
        description: "Failed to create shopping list",
        variant: "destructive",
      });
      return null;
    }
  };

  const addIngredientsToList = async (
    listId: string,
    ingredients: string[],
    recipeId: string,
    recipeName: string
  ) => {
    if (!user) return;

    try {
      const list = lists.find((l) => l.id === listId);
      if (!list) throw new Error("List not found");

      const newItems: ShoppingListItem[] = ingredients.map((ing) => ({
        id: crypto.randomUUID(),
        ingredient: ing,
        checked: false,
        recipeId,
        recipeName,
      }));

      const updatedItems = [...list.items, ...newItems];

      const { error } = await supabase
        .from("shopping_lists")
        .update({ items: updatedItems })
        .eq("id", listId);

      if (error) throw error;

      setLists(
        lists.map((l) => (l.id === listId ? { ...l, items: updatedItems } : l))
      );

      toast({
        title: "Success",
        description: `Added ${ingredients.length} ingredients to list`,
      });
    } catch (error: any) {
      console.error("Error adding ingredients:", error);
      toast({
        title: "Error",
        description: "Failed to add ingredients",
        variant: "destructive",
      });
    }
  };

  const toggleItem = async (listId: string, itemId: string) => {
    try {
      const list = lists.find((l) => l.id === listId);
      if (!list) throw new Error("List not found");

      const updatedItems = list.items.map((item) =>
        item.id === itemId ? { ...item, checked: !item.checked } : item
      );

      const { error } = await supabase
        .from("shopping_lists")
        .update({ items: updatedItems })
        .eq("id", listId);

      if (error) throw error;

      setLists(
        lists.map((l) => (l.id === listId ? { ...l, items: updatedItems } : l))
      );
    } catch (error: any) {
      console.error("Error toggling item:", error);
      toast({
        title: "Error",
        description: "Failed to update item",
        variant: "destructive",
      });
    }
  };

  const removeItem = async (listId: string, itemId: string) => {
    try {
      const list = lists.find((l) => l.id === listId);
      if (!list) throw new Error("List not found");

      const updatedItems = list.items.filter((item) => item.id !== itemId);

      const { error } = await supabase
        .from("shopping_lists")
        .update({ items: updatedItems })
        .eq("id", listId);

      if (error) throw error;

      setLists(
        lists.map((l) => (l.id === listId ? { ...l, items: updatedItems } : l))
      );
    } catch (error: any) {
      console.error("Error removing item:", error);
      toast({
        title: "Error",
        description: "Failed to remove item",
        variant: "destructive",
      });
    }
  };

  const deleteList = async (listId: string) => {
    try {
      const { error } = await supabase
        .from("shopping_lists")
        .delete()
        .eq("id", listId);

      if (error) throw error;

      setLists(lists.filter((l) => l.id !== listId));
      toast({
        title: "Success",
        description: "Shopping list deleted",
      });
    } catch (error: any) {
      console.error("Error deleting list:", error);
      toast({
        title: "Error",
        description: "Failed to delete list",
        variant: "destructive",
      });
    }
  };

  const clearCheckedItems = async (listId: string) => {
    try {
      const list = lists.find((l) => l.id === listId);
      if (!list) throw new Error("List not found");

      const updatedItems = list.items.filter((item) => !item.checked);

      const { error } = await supabase
        .from("shopping_lists")
        .update({ items: updatedItems })
        .eq("id", listId);

      if (error) throw error;

      setLists(
        lists.map((l) => (l.id === listId ? { ...l, items: updatedItems } : l))
      );

      toast({
        title: "Success",
        description: "Cleared checked items",
      });
    } catch (error: any) {
      console.error("Error clearing items:", error);
      toast({
        title: "Error",
        description: "Failed to clear items",
        variant: "destructive",
      });
    }
  };

  useEffect(() => {
    fetchLists();
  }, [user]);

  return {
    lists,
    loading,
    createList,
    addIngredientsToList,
    toggleItem,
    removeItem,
    deleteList,
    clearCheckedItems,
    refetch: fetchLists,
  };
};
