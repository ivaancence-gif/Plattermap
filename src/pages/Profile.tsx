import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "@/hooks/useAuth";
import { useSubscription } from "@/hooks/useSubscription";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Separator } from "@/components/ui/separator";
import { ArrowLeft, User, Mail, Crown, Sparkles, Calendar, CreditCard } from "lucide-react";

const Profile = () => {
  const navigate = useNavigate();
  const { user, signOut, loading: authLoading } = useAuth();
  const { subscribed, productId, subscriptionEnd, getTierName, manageSubscription, loading: subLoading } = useSubscription();

  useEffect(() => {
    if (!authLoading && !user) {
      navigate("/auth");
    }
  }, [user, authLoading, navigate]);

  if (authLoading || subLoading) {
    return (
      <div className="min-h-screen bg-background flex items-center justify-center">
        <p className="text-muted-foreground">Loading...</p>
      </div>
    );
  }

  const formatDate = (dateString: string | null) => {
    if (!dateString) return "N/A";
    return new Date(dateString).toLocaleDateString("en-US", {
      year: "numeric",
      month: "long",
      day: "numeric",
    });
  };

  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <header className="bg-card border-b border-border sticky top-0 z-10">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
          <div className="flex items-center justify-between">
            <Button
              variant="ghost"
              onClick={() => navigate("/")}
              className="gap-2"
            >
              <ArrowLeft className="w-4 h-4" />
              Back
            </Button>
            <h1 className="text-2xl font-bold text-foreground">My Profile</h1>
            <div className="w-20" /> {/* Spacer */}
          </div>
        </div>
      </header>

      {/* Content */}
      <main className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="space-y-6">
          {/* Account Information */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <User className="w-5 h-5" />
                Account Information
              </CardTitle>
              <CardDescription>Your personal details and account status</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="flex items-center gap-3">
                <Mail className="w-4 h-4 text-muted-foreground" />
                <div>
                  <p className="text-sm text-muted-foreground">Email</p>
                  <p className="font-medium">{user?.email}</p>
                </div>
              </div>
              
              {user?.user_metadata?.full_name && (
                <div className="flex items-center gap-3">
                  <User className="w-4 h-4 text-muted-foreground" />
                  <div>
                    <p className="text-sm text-muted-foreground">Name</p>
                    <p className="font-medium">{user.user_metadata.full_name}</p>
                  </div>
                </div>
              )}

              <Separator />

              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-muted-foreground">Account created</p>
                  <p className="font-medium">{formatDate(user?.created_at || null)}</p>
                </div>
                <Button variant="outline" onClick={signOut}>
                  Sign Out
                </Button>
              </div>
            </CardContent>
          </Card>

          {/* Subscription Details */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <CreditCard className="w-5 h-5" />
                Subscription Details
              </CardTitle>
              <CardDescription>Manage your subscription plan</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              {subscribed ? (
                <>
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-3">
                      {getTierName() === "Premium" ? (
                        <Crown className="w-5 h-5 text-primary" />
                      ) : (
                        <Sparkles className="w-5 h-5 text-primary" />
                      )}
                      <div>
                        <p className="text-sm text-muted-foreground">Current Plan</p>
                        <div className="flex items-center gap-2">
                          <p className="font-bold text-lg">{getTierName()}</p>
                          <Badge variant="secondary" className="bg-primary/10 text-primary">
                            Active
                          </Badge>
                        </div>
                      </div>
                    </div>
                  </div>

                  <Separator />

                  <div className="flex items-center gap-3">
                    <Calendar className="w-4 h-4 text-muted-foreground" />
                    <div>
                      <p className="text-sm text-muted-foreground">Next billing date</p>
                      <p className="font-medium">{formatDate(subscriptionEnd)}</p>
                    </div>
                  </div>

                  <div className="pt-4 space-y-2">
                    <Button 
                      className="w-full" 
                      onClick={manageSubscription}
                    >
                      Manage Subscription
                    </Button>
                    <p className="text-xs text-center text-muted-foreground">
                      Update payment method, change plan, or cancel subscription
                    </p>
                  </div>
                </>
              ) : (
                <div className="text-center py-6">
                  <div className="mb-4">
                    <div className="w-16 h-16 bg-muted rounded-full flex items-center justify-center mx-auto mb-3">
                      <CreditCard className="w-8 h-8 text-muted-foreground" />
                    </div>
                    <h3 className="text-lg font-semibold mb-2">No Active Subscription</h3>
                    <p className="text-muted-foreground mb-4">
                      Unlock premium features and unlimited access
                    </p>
                  </div>
                  <Button onClick={() => navigate("/pricing")}>
                    View Plans
                  </Button>
                </div>
              )}
            </CardContent>
          </Card>

          {/* Features */}
          <Card>
            <CardHeader>
              <CardTitle>Your Features</CardTitle>
              <CardDescription>
                {subscribed ? "Premium features you have access to" : "Free plan features"}
              </CardDescription>
            </CardHeader>
            <CardContent>
              <ul className="space-y-2">
                <li className="flex items-start gap-2">
                  <div className="w-1.5 h-1.5 rounded-full bg-primary mt-2" />
                  <span>Browse all recipes</span>
                </li>
                <li className="flex items-start gap-2">
                  <div className="w-1.5 h-1.5 rounded-full bg-primary mt-2" />
                  <span>Search and filter recipes</span>
                </li>
                {subscribed && (
                  <>
                    <li className="flex items-start gap-2">
                      <div className="w-1.5 h-1.5 rounded-full bg-primary mt-2" />
                      <span>Save unlimited favorites</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <div className="w-1.5 h-1.5 rounded-full bg-primary mt-2" />
                      <span>Access to international recipes</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <div className="w-1.5 h-1.5 rounded-full bg-primary mt-2" />
                      <span>Advanced dietary filters</span>
                    </li>
                    {getTierName() === "Pro" && (
                      <>
                        <li className="flex items-start gap-2">
                          <div className="w-1.5 h-1.5 rounded-full bg-primary mt-2" />
                          <span>Meal planning calendar</span>
                        </li>
                        <li className="flex items-start gap-2">
                          <div className="w-1.5 h-1.5 rounded-full bg-primary mt-2" />
                          <span>Shopping list generator</span>
                        </li>
                        <li className="flex items-start gap-2">
                          <div className="w-1.5 h-1.5 rounded-full bg-primary mt-2" />
                          <span>Priority support</span>
                        </li>
                      </>
                    )}
                  </>
                )}
              </ul>
            </CardContent>
          </Card>
        </div>
      </main>
    </div>
  );
};

export default Profile;
