import { ArrowUpDown } from "lucide-react";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { SORT_OPTIONS, SortKey } from "@/lib/recipeFilters";

interface SortSelectProps {
  value: SortKey;
  onChange: (value: SortKey) => void;
}

export const SortSelect = ({ value, onChange }: SortSelectProps) => (
  <Select value={value} onValueChange={(v) => onChange(v as SortKey)}>
    <SelectTrigger className="w-[200px]" aria-label="Sort recipes">
      <ArrowUpDown className="w-4 h-4 mr-2 text-muted-foreground" />
      <SelectValue placeholder="Sort by" />
    </SelectTrigger>
    <SelectContent>
      {SORT_OPTIONS.map((opt) => (
        <SelectItem key={opt.value} value={opt.value}>
          {opt.label}
        </SelectItem>
      ))}
    </SelectContent>
  </Select>
);
