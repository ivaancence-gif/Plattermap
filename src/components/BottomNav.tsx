import { useLocation, useNavigate } from "react-router-dom";
import { Home, UtensilsCrossed, Heart, CalendarDays, User } from "lucide-react";
import { cn } from "@/lib/utils";

const tabs = [
  { label: "Home", path: "/", icon: Home },
  { label: "Recipes", path: "/recipes", icon: UtensilsCrossed },
  { label: "Favorites", path: "/favorites", icon: Heart },
  { label: "Meal Plan", path: "/meal-planner", icon: CalendarDays },
  { label: "Profile", path: "/profile", icon: User },
];

export const BottomNav = () => {
  const location = useLocation();
  const navigate = useNavigate();

  return (
    <nav className="fixed bottom-0 inset-x-0 z-50 md:hidden bg-card border-t border-border pb-[env(safe-area-inset-bottom)]">
      <div className="grid grid-cols-5">
        {tabs.map(({ label, path, icon: Icon }) => {
          const active =
            path === "/" ? location.pathname === "/" : location.pathname.startsWith(path);
          return (
            <button
              key={path}
              onClick={() => navigate(path)}
              className={cn(
                "flex flex-col items-center gap-1 py-2 min-h-[56px] text-xs transition-colors",
                active ? "text-primary" : "text-muted-foreground"
              )}
              aria-label={label}
            >
              <Icon className={cn("w-5 h-5", active && "fill-current/10")} />
              <span>{label}</span>
            </button>
          );
        })}
      </div>
    </nav>
  );
};
