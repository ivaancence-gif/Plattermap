import { useNavigate } from "react-router-dom";
import { useAuth } from "@/hooks/useAuth";
import { useSubscription, TIERS } from "@/hooks/useSubscription";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { ArrowLeft, Check, Crown, Sparkles, UtensilsCrossed } from "lucide-react";
import { Footer } from "@/components/Footer";
import { usePageTitle } from "@/hooks/usePageTitle";

const Pricing = () => {
  const navigate = useNavigate();
  const { user } = useAuth();
  const { subscribed, productId, createCheckout, manageSubscription, loading } = useSubscription();

  const handleSubscribe = (priceId: string) => {
    if (!user) {
      navigate("/auth");
      return;
    }
    createCheckout(priceId);
  };

  usePageTitle("Pricing");

  const isCurrentPlan = (tierProductId: string) => {
    return subscribed && productId === tierProductId;
  };

  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <header className="bg-card border-b border-border sticky top-0 z-10">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
          <Button
            variant="ghost"
            onClick={() => navigate("/")}
            className="gap-2"
          >
            <ArrowLeft className="w-4 h-4" />
            Back
          </Button>
        </div>
      </header>

      {/* Content */}
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="text-center mb-12">
          <h1 className="text-4xl font-bold text-foreground mb-4">
            Choose Your Plan
          </h1>
          <p className="text-xl text-muted-foreground">
            Unlock premium features and save unlimited recipes
          </p>
        </div>

        <div className="grid md:grid-cols-3 gap-8 max-w-6xl mx-auto">
          {/* Free Plan */}
          <Card>
            <CardHeader>
              <div className="flex items-center justify-between mb-2">
                <UtensilsCrossed className="w-8 h-8 text-primary" />
              </div>
              <CardTitle className="text-2xl">Free</CardTitle>
              <CardDescription>Start cooking today</CardDescription>
              <div className="mt-4">
                <span className="text-4xl font-bold text-foreground">$0</span>
                <span className="text-muted-foreground">/month</span>
              </div>
            </CardHeader>
            <CardContent>
              <ul className="space-y-3">
                <li className="flex items-start gap-2">
                  <Check className="w-5 h-5 text-primary mt-0.5 flex-shrink-0" />
                  <span>Browse all recipes</span>
                </li>
                <li className="flex items-start gap-2">
                  <Check className="w-5 h-5 text-primary mt-0.5 flex-shrink-0" />
                  <span>Search & category filters</span>
                </li>
                <li className="flex items-start gap-2">
                  <Check className="w-5 h-5 text-primary mt-0.5 flex-shrink-0" />
                  <span>Full nutrition facts</span>
                </li>
                <li className="flex items-start gap-2">
                  <Check className="w-5 h-5 text-primary mt-0.5 flex-shrink-0" />
                  <span>No account required</span>
                </li>
              </ul>
            </CardContent>
            <CardFooter>
              <Button className="w-full" variant="outline" onClick={() => navigate("/recipes")}>
                Start Browsing
              </Button>
            </CardFooter>
          </Card>

          {/* Premium Plan */}
          <Card className={isCurrentPlan(TIERS.premium.product_id) ? "border-primary border-2" : ""}>
            <CardHeader>
              <div className="flex items-center justify-between mb-2">
                <Crown className="w-8 h-8 text-primary" />
                {isCurrentPlan(TIERS.premium.product_id) && (
                  <span className="text-xs font-semibold bg-primary text-primary-foreground px-2 py-1 rounded">
                    Current Plan
                  </span>
                )}
              </div>
              <CardTitle className="text-2xl">{TIERS.premium.name}</CardTitle>
              <CardDescription>Perfect for home cooks</CardDescription>
              <div className="mt-4">
                <span className="text-4xl font-bold text-foreground">{TIERS.premium.price}</span>
                <span className="text-muted-foreground">/month</span>
              </div>
            </CardHeader>
            <CardContent>
              <ul className="space-y-3">
                <li className="flex items-start gap-2">
                  <Check className="w-5 h-5 text-primary mt-0.5 flex-shrink-0" />
                  <span>Save unlimited recipes</span>
                </li>
                <li className="flex items-start gap-2">
                  <Check className="w-5 h-5 text-primary mt-0.5 flex-shrink-0" />
                  <span>Access to all international recipes</span>
                </li>
                <li className="flex items-start gap-2">
                  <Check className="w-5 h-5 text-primary mt-0.5 flex-shrink-0" />
                  <span>Advanced dietary filters</span>
                </li>
                <li className="flex items-start gap-2">
                  <Check className="w-5 h-5 text-primary mt-0.5 flex-shrink-0" />
                  <span>Recipe notes and modifications</span>
                </li>
              </ul>
            </CardContent>
            <CardFooter>
              {isCurrentPlan(TIERS.premium.product_id) ? (
                <Button 
                  className="w-full" 
                  variant="outline"
                  onClick={manageSubscription}
                  disabled={loading}
                >
                  Manage Subscription
                </Button>
              ) : (
                <Button 
                  className="w-full"
                  onClick={() => handleSubscribe(TIERS.premium.price_id)}
                  disabled={loading}
                >
                  Subscribe to Premium
                </Button>
              )}
            </CardFooter>
          </Card>

          {/* Pro Plan */}
          <Card className={`relative ${isCurrentPlan(TIERS.pro.product_id) ? "border-primary border-2" : "border-primary/40 border-2"}`}>
            <div className="absolute -top-3 left-1/2 -translate-x-1/2">
              <span className="text-xs font-semibold bg-primary text-primary-foreground px-3 py-1 rounded-full whitespace-nowrap">
                Most Popular
              </span>
            </div>
            <CardHeader>
              <div className="flex items-center justify-between mb-2">
                <Sparkles className="w-8 h-8 text-primary" />
                {isCurrentPlan(TIERS.pro.product_id) && (
                  <span className="text-xs font-semibold bg-primary text-primary-foreground px-2 py-1 rounded">
                    Current Plan
                  </span>
                )}
              </div>
              <CardTitle className="text-2xl">{TIERS.pro.name}</CardTitle>
              <CardDescription>For culinary enthusiasts</CardDescription>
              <div className="mt-4">
                <span className="text-4xl font-bold text-foreground">{TIERS.pro.price}</span>
                <span className="text-muted-foreground">/month</span>
              </div>
            </CardHeader>
            <CardContent>
              <ul className="space-y-3">
                <li className="flex items-start gap-2">
                  <Check className="w-5 h-5 text-primary mt-0.5 flex-shrink-0" />
                  <span>Everything in Premium</span>
                </li>
                <li className="flex items-start gap-2">
                  <Check className="w-5 h-5 text-primary mt-0.5 flex-shrink-0" />
                  <span>Meal planning calendar</span>
                </li>
                <li className="flex items-start gap-2">
                  <Check className="w-5 h-5 text-primary mt-0.5 flex-shrink-0" />
                  <span>Shopping list generator</span>
                </li>
                <li className="flex items-start gap-2">
                  <Check className="w-5 h-5 text-primary mt-0.5 flex-shrink-0" />
                  <span>Nutritional insights & tracking</span>
                </li>
                <li className="flex items-start gap-2">
                  <Check className="w-5 h-5 text-primary mt-0.5 flex-shrink-0" />
                  <span>Priority support</span>
                </li>
              </ul>
            </CardContent>
            <CardFooter>
              {isCurrentPlan(TIERS.pro.product_id) ? (
                <Button 
                  className="w-full" 
                  variant="outline"
                  onClick={manageSubscription}
                  disabled={loading}
                >
                  Manage Subscription
                </Button>
              ) : (
                <Button 
                  className="w-full"
                  onClick={() => handleSubscribe(TIERS.pro.price_id)}
                  disabled={loading}
                >
                  Subscribe to Pro
                </Button>
              )}
            </CardFooter>
          </Card>
        </div>

        {subscribed && (
          <div className="text-center mt-8">
            <Button 
              variant="outline" 
              onClick={manageSubscription}
              disabled={loading}
            >
              Manage Your Subscription
            </Button>
          </div>
        )}
      </main>
      <Footer />
    </div>
  );
};

export default Pricing;
