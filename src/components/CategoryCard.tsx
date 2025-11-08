import { Card, CardContent } from "@/components/ui/card";
import { LucideIcon } from "lucide-react";

interface CategoryCardProps {
  name: string;
  count: number;
  icon: LucideIcon;
  image?: string;
  onClick: () => void;
}

export const CategoryCard = ({ name, count, icon: Icon, image, onClick }: CategoryCardProps) => {
  return (
    <Card 
      className="overflow-hidden transition-all duration-300 hover:shadow-lg hover:-translate-y-1 cursor-pointer border-border/50 bg-gradient-to-br from-card to-accent/20 group"
      onClick={onClick}
    >
      {image && (
        <div className="aspect-video overflow-hidden bg-muted">
          <img
            src={image}
            alt={name}
            className="w-full h-full object-cover transition-transform duration-300 group-hover:scale-110"
          />
        </div>
      )}
      <CardContent className="p-6 flex flex-col items-center text-center">
        <div className="w-16 h-16 rounded-full bg-primary/10 flex items-center justify-center mb-4">
          <Icon className="w-8 h-8 text-primary" />
        </div>
        <h3 className="font-semibold text-lg mb-1 text-foreground">{name}</h3>
        <p className="text-sm text-muted-foreground">{count} recipes</p>
      </CardContent>
    </Card>
  );
};
