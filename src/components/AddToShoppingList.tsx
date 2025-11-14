import { useState } from "react";
import { ShoppingCart, Plus } from "lucide-react";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { useShoppingList } from "@/hooks/useShoppingList";
import { useAuth } from "@/hooks/useAuth";
import { useSubscription, TIERS } from "@/hooks/useSubscription";
import { useNavigate } from "react-router-dom";

interface AddToShoppingListProps {
  ingredients: string[];
  recipeId: string;
  recipeName: string;
}

export const AddToShoppingList = ({
  ingredients,
  recipeId,
  recipeName,
}: AddToShoppingListProps) => {
  const { user } = useAuth();
  const { productId } = useSubscription();
  const { lists, createList, addIngredientsToList } = useShoppingList();
  const [open, setOpen] = useState(false);
  const [selectedList, setSelectedList] = useState<string>("");
  const [newListName, setNewListName] = useState("");
  const [isCreatingNew, setIsCreatingNew] = useState(false);
  const navigate = useNavigate();

  const isPro = productId === TIERS.pro.product_id;

  const handleAddToList = async () => {
    if (!user) {
      navigate("/auth");
      return;
    }

    if (!isPro) {
      navigate("/pricing");
      return;
    }

    if (isCreatingNew) {
      if (!newListName.trim()) return;
      const newList = await createList(newListName);
      if (newList) {
        await addIngredientsToList(newList.id, ingredients, recipeId, recipeName);
        setNewListName("");
        setIsCreatingNew(false);
        setOpen(false);
      }
    } else {
      if (!selectedList) return;
      await addIngredientsToList(selectedList, ingredients, recipeId, recipeName);
      setOpen(false);
    }
  };

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <Button variant="outline" size="icon">
          <ShoppingCart className="w-4 h-4" />
        </Button>
      </DialogTrigger>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Add to Shopping List</DialogTitle>
          <DialogDescription>
            Add {ingredients.length} ingredients from {recipeName} to your shopping list
          </DialogDescription>
        </DialogHeader>

        <div className="space-y-4">
          {lists.length > 0 && (
            <div>
              <Label>Select existing list</Label>
              <RadioGroup
                value={isCreatingNew ? "" : selectedList}
                onValueChange={(value) => {
                  setSelectedList(value);
                  setIsCreatingNew(false);
                }}
              >
                {lists.map((list) => (
                  <div key={list.id} className="flex items-center space-x-2">
                    <RadioGroupItem value={list.id} id={list.id} />
                    <Label htmlFor={list.id} className="cursor-pointer">
                      {list.name} ({list.items.length} items)
                    </Label>
                  </div>
                ))}
              </RadioGroup>
            </div>
          )}

          <div className="space-y-2">
            <div className="flex items-center gap-2">
              <Button
                type="button"
                variant="outline"
                size="sm"
                onClick={() => setIsCreatingNew(!isCreatingNew)}
              >
                <Plus className="w-4 h-4 mr-2" />
                {lists.length > 0 ? "Create new list" : "Create list"}
              </Button>
            </div>

            {isCreatingNew && (
              <div className="space-y-2">
                <Label htmlFor="newList">New list name</Label>
                <Input
                  id="newList"
                  value={newListName}
                  onChange={(e) => setNewListName(e.target.value)}
                  placeholder="Weekly Groceries"
                />
              </div>
            )}
          </div>

          <Button
            onClick={handleAddToList}
            disabled={!isCreatingNew && !selectedList}
            className="w-full"
          >
            Add Ingredients
          </Button>
        </div>
      </DialogContent>
    </Dialog>
  );
};
