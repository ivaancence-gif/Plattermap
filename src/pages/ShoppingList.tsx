import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "@/hooks/useAuth";
import { useSubscription, TIERS } from "@/hooks/useSubscription";
import { useShoppingList } from "@/hooks/useShoppingList";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Checkbox } from "@/components/ui/checkbox";
import { Input } from "@/components/ui/input";
import { Separator } from "@/components/ui/separator";
import { Badge } from "@/components/ui/badge";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@/components/ui/alert-dialog";
import { ShoppingCart, Plus, Trash2, CheckCheck, X } from "lucide-react";

const ShoppingList = () => {
  const navigate = useNavigate();
  const { user } = useAuth();
  const { productId, loading: subLoading } = useSubscription();
  const {
    lists,
    loading,
    createList,
    toggleItem,
    removeItem,
    deleteList,
    clearCheckedItems,
  } = useShoppingList();
  const [newListName, setNewListName] = useState("");

  const isPro = productId === TIERS.pro.product_id;

  if (!user) {
    return (
      <div className="min-h-screen bg-background flex items-center justify-center p-4">
        <Card className="max-w-md w-full">
          <CardHeader>
            <CardTitle>Sign In Required</CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-muted-foreground mb-4">
              Please sign in to access your shopping lists.
            </p>
            <Button onClick={() => navigate("/auth")} className="w-full">
              Sign In
            </Button>
          </CardContent>
        </Card>
      </div>
    );
  }

  if (!subLoading && !isPro) {
    return (
      <div className="min-h-screen bg-background flex items-center justify-center p-4">
        <Card className="max-w-md w-full">
          <CardHeader>
            <CardTitle>Pro Feature</CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-muted-foreground mb-4">
              Shopping lists are available for Pro subscribers. Upgrade to access this
              feature and combine ingredients from multiple recipes.
            </p>
            <Button onClick={() => navigate("/pricing")} className="w-full">
              View Plans
            </Button>
          </CardContent>
        </Card>
      </div>
    );
  }

  const handleCreateList = async () => {
    if (!newListName.trim()) return;
    await createList(newListName);
    setNewListName("");
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-background flex items-center justify-center">
        <p className="text-muted-foreground">Loading...</p>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-background">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="flex items-center justify-between mb-8">
          <div>
            <h1 className="text-4xl font-bold text-foreground mb-2">Shopping Lists</h1>
            <p className="text-muted-foreground">
              Manage your grocery lists from multiple recipes
            </p>
          </div>
          <ShoppingCart className="w-12 h-12 text-primary" />
        </div>

        {/* Create New List */}
        <Card className="mb-8">
          <CardHeader>
            <CardTitle>Create New List</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="flex gap-2">
              <Input
                placeholder="List name (e.g., Weekly Groceries)"
                value={newListName}
                onChange={(e) => setNewListName(e.target.value)}
                onKeyDown={(e) => e.key === "Enter" && handleCreateList()}
              />
              <Button onClick={handleCreateList} disabled={!newListName.trim()}>
                <Plus className="w-4 h-4 mr-2" />
                Create
              </Button>
            </div>
          </CardContent>
        </Card>

        {/* Shopping Lists */}
        {lists.length === 0 ? (
          <Card>
            <CardContent className="py-12 text-center">
              <ShoppingCart className="w-16 h-16 text-muted-foreground mx-auto mb-4" />
              <h3 className="text-xl font-semibold text-foreground mb-2">
                No shopping lists yet
              </h3>
              <p className="text-muted-foreground">
                Create a list above or add ingredients from recipe pages
              </p>
            </CardContent>
          </Card>
        ) : (
          <div className="grid gap-6">
            {lists.map((list) => {
              const checkedCount = list.items.filter((item) => item.checked).length;
              const uncheckedCount = list.items.length - checkedCount;

              return (
                <Card key={list.id}>
                  <CardHeader>
                    <div className="flex items-start justify-between">
                      <div>
                        <CardTitle>{list.name}</CardTitle>
                        <p className="text-sm text-muted-foreground mt-1">
                          {uncheckedCount} remaining • {checkedCount} checked
                        </p>
                      </div>
                      <div className="flex gap-2">
                        {checkedCount > 0 && (
                          <Button
                            variant="outline"
                            size="sm"
                            onClick={() => clearCheckedItems(list.id)}
                          >
                            <CheckCheck className="w-4 h-4 mr-2" />
                            Clear Checked
                          </Button>
                        )}
                        <AlertDialog>
                          <AlertDialogTrigger asChild>
                            <Button variant="destructive" size="sm">
                              <Trash2 className="w-4 h-4" />
                            </Button>
                          </AlertDialogTrigger>
                          <AlertDialogContent>
                            <AlertDialogHeader>
                              <AlertDialogTitle>Delete List</AlertDialogTitle>
                              <AlertDialogDescription>
                                Are you sure you want to delete "{list.name}"? This action
                                cannot be undone.
                              </AlertDialogDescription>
                            </AlertDialogHeader>
                            <AlertDialogFooter>
                              <AlertDialogCancel>Cancel</AlertDialogCancel>
                              <AlertDialogAction onClick={() => deleteList(list.id)}>
                                Delete
                              </AlertDialogAction>
                            </AlertDialogFooter>
                          </AlertDialogContent>
                        </AlertDialog>
                      </div>
                    </div>
                  </CardHeader>
                  <CardContent>
                    {list.items.length === 0 ? (
                      <p className="text-muted-foreground text-center py-4">
                        No items yet. Add ingredients from recipe pages.
                      </p>
                    ) : (
                      <div className="space-y-3">
                        {list.items.map((item) => (
                          <div key={item.id}>
                            <div className="flex items-start gap-3 group">
                              <Checkbox
                                checked={item.checked}
                                onCheckedChange={() => toggleItem(list.id, item.id)}
                                className="mt-1"
                              />
                              <div className="flex-1">
                                <p
                                  className={`text-foreground ${
                                    item.checked ? "line-through text-muted-foreground" : ""
                                  }`}
                                >
                                  {item.ingredient}
                                </p>
                                {item.recipeName && (
                                  <Badge variant="secondary" className="mt-1">
                                    {item.recipeName}
                                  </Badge>
                                )}
                              </div>
                              <Button
                                variant="ghost"
                                size="sm"
                                onClick={() => removeItem(list.id, item.id)}
                                className="opacity-0 group-hover:opacity-100 transition-opacity"
                              >
                                <X className="w-4 h-4" />
                              </Button>
                            </div>
                            <Separator className="mt-3" />
                          </div>
                        ))}
                      </div>
                    )}
                  </CardContent>
                </Card>
              );
            })}
          </div>
        )}
      </div>
    </div>
  );
};

export default ShoppingList;
