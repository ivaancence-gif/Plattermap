import { Badge } from "@/components/ui/badge";
import { X } from "lucide-react";

export interface ChipOption {
  value: string;
  label: string;
  count?: number;
}

interface ChipGroupProps {
  title: string;
  options: ChipOption[];
  /** Currently selected value, or null when nothing is selected. */
  selected: string | null;
  /** Called with the clicked value, or null when the active chip is cleared. */
  onSelect: (value: string | null) => void;
}

/**
 * A single-select row of filter chips, styled to match DietaryFilter.
 * Clicking the active chip clears the selection.
 */
export const ChipGroup = ({ title, options, selected, onSelect }: ChipGroupProps) => {
  if (options.length === 0) return null;
  return (
    <div className="space-y-3">
      <div className="flex items-center justify-between">
        <h3 className="text-sm font-semibold text-muted-foreground">{title}</h3>
        {selected && (
          <button
            onClick={() => onSelect(null)}
            className="h-auto p-1 text-xs text-muted-foreground hover:text-foreground"
          >
            Clear
          </button>
        )}
      </div>
      <div className="flex flex-wrap gap-2">
        {options.map((opt) => {
          const isSelected = selected === opt.value;
          return (
            <Badge
              key={opt.value}
              variant={isSelected ? "default" : "outline"}
              className="cursor-pointer transition-all hover:scale-105"
              onClick={() => onSelect(isSelected ? null : opt.value)}
            >
              {opt.label}
              {typeof opt.count === "number" && (
                <span className="ml-1 opacity-70">{opt.count}</span>
              )}
              {isSelected && <X className="ml-1 h-3 w-3" />}
            </Badge>
          );
        })}
      </div>
    </div>
  );
};
