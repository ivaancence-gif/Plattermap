import { useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { ArrowLeft, DollarSign, Users, TrendingUp, Gift, CheckCircle2, Sparkles } from "lucide-react";

const Affiliate = () => {
  const navigate = useNavigate();

  const benefits = [
    {
      icon: DollarSign,
      title: "Generous Commissions",
      description: "Earn up to 30% recurring commission on every referral that subscribes",
    },
    {
      icon: Users,
      title: "Cookie Duration",
      description: "90-day cookie window ensures you get credited for your referrals",
    },
    {
      icon: TrendingUp,
      title: "Performance Bonuses",
      description: "Unlock higher commission tiers as you refer more users",
    },
    {
      icon: Gift,
      title: "Exclusive Resources",
      description: "Access to marketing materials, banners, and promotional content",
    },
  ];

  const steps = [
    "Sign up for our affiliate program",
    "Get your unique referral link",
    "Share with your audience",
    "Earn commissions on every subscription",
  ];

  const commissionTiers = [
    {
      tier: "Starter",
      referrals: "1-10",
      commission: "20%",
      badge: false,
    },
    {
      tier: "Growth",
      referrals: "11-50",
      commission: "25%",
      badge: false,
    },
    {
      tier: "Elite",
      referrals: "51+",
      commission: "30%",
      badge: true,
    },
  ];

  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <header className="bg-card border-b border-border sticky top-0 z-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
          <div className="flex items-center gap-4">
            <Button variant="ghost" size="icon" onClick={() => navigate(-1)}>
              <ArrowLeft className="h-5 w-5" />
            </Button>
            <div>
              <h1 className="text-2xl font-bold text-foreground">Affiliate Program</h1>
              <p className="text-sm text-muted-foreground">Partner with us and earn recurring income</p>
            </div>
          </div>
        </div>
      </header>

      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        {/* Hero Section */}
        <div className="text-center mb-16">
          <Badge className="mb-4 bg-primary/10 text-primary border-primary/20 hover:bg-primary/20">
            <Sparkles className="w-3 h-3 mr-1" />
            Join Our Partner Network
          </Badge>
          <h2 className="text-4xl md:text-5xl font-bold text-foreground mb-4">
            Turn Your Influence Into Income
          </h2>
          <p className="text-xl text-muted-foreground max-w-2xl mx-auto mb-8">
            Partner with Recipe Book and earn generous commissions by sharing our premium recipe platform with your audience.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Button size="lg" className="gap-2">
              <Users className="w-5 h-5" />
              Join Affiliate Program
            </Button>
            <Button size="lg" variant="outline">
              Learn More
            </Button>
          </div>
        </div>

        {/* Benefits Section */}
        <section className="mb-16">
          <h3 className="text-3xl font-bold text-center text-foreground mb-8">
            Why Join Our Affiliate Program?
          </h3>
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
            {benefits.map((benefit, index) => {
              const Icon = benefit.icon;
              return (
                <Card key={index} className="border-border">
                  <CardHeader>
                    <div className="w-12 h-12 bg-primary/10 rounded-lg flex items-center justify-center mb-4">
                      <Icon className="w-6 h-6 text-primary" />
                    </div>
                    <CardTitle className="text-lg">{benefit.title}</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <p className="text-muted-foreground">{benefit.description}</p>
                  </CardContent>
                </Card>
              );
            })}
          </div>
        </section>

        {/* Commission Tiers */}
        <section className="mb-16">
          <h3 className="text-3xl font-bold text-center text-foreground mb-8">
            Commission Structure
          </h3>
          <div className="grid md:grid-cols-3 gap-6 max-w-5xl mx-auto">
            {commissionTiers.map((tier, index) => (
              <Card 
                key={index} 
                className={`border-2 ${tier.badge ? 'border-primary bg-primary/5' : 'border-border'} relative`}
              >
                {tier.badge && (
                  <div className="absolute -top-3 left-1/2 -translate-x-1/2">
                    <Badge className="bg-primary text-primary-foreground">
                      Most Popular
                    </Badge>
                  </div>
                )}
                <CardHeader className="text-center">
                  <CardTitle className="text-2xl">{tier.tier}</CardTitle>
                  <CardDescription>{tier.referrals} referrals</CardDescription>
                </CardHeader>
                <CardContent className="text-center">
                  <div className="text-5xl font-bold text-primary mb-2">
                    {tier.commission}
                  </div>
                  <p className="text-muted-foreground">recurring commission</p>
                </CardContent>
              </Card>
            ))}
          </div>
        </section>

        {/* How It Works */}
        <section className="mb-16">
          <h3 className="text-3xl font-bold text-center text-foreground mb-8">
            How It Works
          </h3>
          <Card className="max-w-3xl mx-auto border-border">
            <CardContent className="pt-6">
              <div className="space-y-6">
                {steps.map((step, index) => (
                  <div key={index} className="flex items-start gap-4">
                    <div className="flex-shrink-0 w-8 h-8 bg-primary text-primary-foreground rounded-full flex items-center justify-center font-bold">
                      {index + 1}
                    </div>
                    <div className="flex-1">
                      <p className="text-lg text-foreground">{step}</p>
                    </div>
                    <CheckCircle2 className="w-5 h-5 text-primary flex-shrink-0" />
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </section>

        {/* CTA Section */}
        <section className="text-center bg-gradient-to-r from-primary/10 via-primary/5 to-primary/10 rounded-2xl p-12">
          <h3 className="text-3xl font-bold text-foreground mb-4">
            Ready to Get Started?
          </h3>
          <p className="text-lg text-muted-foreground mb-8 max-w-2xl mx-auto">
            Join thousands of content creators, food bloggers, and influencers who are earning with Recipe Book.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Button size="lg" className="gap-2">
              <Users className="w-5 h-5" />
              Apply Now
            </Button>
            <Button size="lg" variant="outline">
              Contact Support
            </Button>
          </div>
        </section>
      </main>

      {/* Footer */}
      <footer className="bg-card border-t border-border mt-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
          <div className="text-center text-muted-foreground">
            <p>Have questions about our affiliate program? Contact us at affiliate@recipebook.com</p>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default Affiliate;
