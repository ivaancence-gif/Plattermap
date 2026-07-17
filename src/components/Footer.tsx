import { Link } from "react-router-dom";
import logoImage from "@/assets/plattermap-logo.png";

export const Footer = () => {
  return (
    <footer className="bg-card border-t border-border mt-16">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          <div>
            <div className="flex items-center gap-2 mb-3">
              <img src={logoImage} alt="PlatterMap" className="w-8 h-8 rounded" />
              <span className="font-bold text-lg text-foreground">PlatterMap</span>
            </div>
            <p className="text-sm text-muted-foreground">
              Discover delicious recipes from around the world. From hearty meals
              to sweet desserts, find your next favorite dish.
            </p>
          </div>
          <div>
            <h3 className="font-semibold text-foreground mb-3">Explore</h3>
            <ul className="space-y-2 text-sm">
              <li><Link to="/recipes" className="text-muted-foreground hover:text-primary">Browse Recipes</Link></li>
              <li><Link to="/pricing" className="text-muted-foreground hover:text-primary">Pricing</Link></li>
              <li><Link to="/favorites" className="text-muted-foreground hover:text-primary">Favorites</Link></li>
              <li><Link to="/meal-planner" className="text-muted-foreground hover:text-primary">Meal Planner</Link></li>
            </ul>
          </div>
          <div>
            <h3 className="font-semibold text-foreground mb-3">Legal & Contact</h3>
            <ul className="space-y-2 text-sm">
              <li><Link to="/privacy" className="text-muted-foreground hover:text-primary">Privacy Policy</Link></li>
              <li><Link to="/terms" className="text-muted-foreground hover:text-primary">Terms of Service</Link></li>
              <li>
                <a href="mailto:support@plattermap.app" className="text-muted-foreground hover:text-primary">
                  support@plattermap.app
                </a>
              </li>
            </ul>
          </div>
        </div>
        <div className="border-t border-border mt-8 pt-6 text-center text-sm text-muted-foreground">
          © {new Date().getFullYear()} PlatterMap. All rights reserved.
        </div>
      </div>
    </footer>
  );
};
