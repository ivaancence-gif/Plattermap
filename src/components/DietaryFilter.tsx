import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { DietaryTag } from "@/data/recipes";
import { X } from "lucide-react";

interface DietaryFilterProps {
  selectedTags: DietaryTag[];
  onToggleTag: (tag: DietaryTag) => void;
}

const allDietaryTags: DietaryTag[] = [
  "Vegetarian",
  "Vegan", 
  "Gluten-Free",
  "Dairy-Free",
  "Keto",
  "Paleo"
];

export const DietaryFilter = ({ selectedTags, onToggleTag }: DietaryFilterProps) => {
  return (
    <div className="space-y-3">
      <div className="flex items-center justify-between">
        <h3 className="text-sm font-semibold text-muted-foreground">
          Dietary Preferences
        </h3>
        {selectedTags.length > 0 && (
          <Button
            variant="ghost"
            size="sm"
            onClick={() => selectedTags.forEach(tag => onToggleTag(tag))}
            className="h-auto p-1 text-xs"
          >
            Clear all
          </Button>
        )}
      </div>
      <div className="flex flex-wrap gap-2">
        {allDietaryTags.map((tag) => {
          const isSelected = selectedTags.includes(tag);
          return (
            <Badge
              key={tag}
              variant={isSelected ? "default" : "outline"}
              className="cursor-pointer transition-all hover:scale-105"
              onClick={() => onToggleTag(tag)}
            >
              {tag}
              {isSelected && <X className="ml-1 h-3 w-3" />}
            </Badge>
          );
        })}
      </div>
    </div>
  );
};
