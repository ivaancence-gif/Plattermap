import { useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { ArrowLeft, DollarSign, Users, TrendingUp, Gift, CheckCircle2, Sparkles, Mail, Globe } from "lucide-react";
import { useToast } from "@/hooks/use-toast";
import { supabase } from "@/integrations/supabase/client";
import { useState } from "react";
import { z } from "zod";

// Validation schema
const affiliateSchema = z.object({
  name: z.string()
    .trim()
    .min(1, "Name is required")
    .max(100, "Name must be less than 100 characters"),
  email: z.string()
    .trim()
    .email("Invalid email address")
    .max(255, "Email must be less than 255 characters"),
  website: z.string()
    .trim()
    .url("Invalid URL format")
    .regex(/^https?:\/\/.+/, "URL must start with http:// or https://")
    .max(500, "Website URL must be less than 500 characters"),
  audience: z.string()
    .trim()
    .max(200, "Audience description must be less than 200 characters")
    .optional(),
  message: z.string()
    .trim()
    .max(2000, "Message must be less than 2000 characters")
    .optional(),
});

const Affiliate = () => {
  const navigate = useNavigate();
  const { toast } = useToast();
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [errors, setErrors] = useState<Record<string, string>>({});
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    website: "",
    audience: "",
    message: "",
  });

  const scrollToSection = (sectionId: string) => {
    const element = document.getElementById(sectionId);
    if (element) {
      element.scrollIntoView({ behavior: "smooth", block: "start" });
    }
  };

  const handleInputChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
    // Clear error for this field when user starts typing
    if (errors[name]) {
      setErrors((prev) => {
        const newErrors = { ...prev };
        delete newErrors[name];
        return newErrors;
      });
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setErrors({});
    setIsSubmitting(true);

    try {
      // Validate form data
      const validatedData = affiliateSchema.parse(formData);

      // Submit to edge function
      const { data, error } = await supabase.functions.invoke(
        "submit-affiliate-application",
        {
          body: validatedData,
        }
      );

      if (error) {
        console.error("Submission error:", error);
        throw new Error(error.message || "Failed to submit application");
      }

      if (data.error) {
        if (data.details && Array.isArray(data.details)) {
          toast({
            title: "Validation Error",
            description: data.details.join(", "),
            variant: "destructive",
          });
        } else {
          toast({
            title: "Error",
            description: data.error,
            variant: "destructive",
          });
        }
        return;
      }

      toast({
        title: "Application Submitted!",
        description: "We'll review your application and get back to you within 2-3 business days.",
      });

      // Reset form
      setFormData({
        name: "",
        email: "",
        website: "",
        audience: "",
        message: "",
      });
    } catch (error) {
      if (error instanceof z.ZodError) {
        // Handle validation errors
        const fieldErrors: Record<string, string> = {};
        error.issues.forEach((issue) => {
          if (issue.path[0]) {
            fieldErrors[issue.path[0].toString()] = issue.message;
          }
        });
        setErrors(fieldErrors);
        toast({
          title: "Validation Error",
          description: "Please check the form for errors",
          variant: "destructive",
        });
      } else {
        console.error("Unexpected error:", error);
        toast({
          title: "Error",
          description: "Failed to submit application. Please try again.",
          variant: "destructive",
        });
      }
    } finally {
      setIsSubmitting(false);
    }
  };

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
            <Button size="lg" className="gap-2" onClick={() => scrollToSection("application-form")}>
              <Users className="w-5 h-5" />
              Join Affiliate Program
            </Button>
            <Button size="lg" variant="outline" onClick={() => scrollToSection("benefits")}>
              Learn More
            </Button>
          </div>
        </div>

        {/* Benefits Section */}
        <section id="benefits" className="mb-16 scroll-mt-20">
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

        {/* Application Form Section */}
        <section id="application-form" className="mb-16 scroll-mt-20">
          <h3 className="text-3xl font-bold text-center text-foreground mb-8">
            Apply to Join Our Program
          </h3>
          <Card className="max-w-2xl mx-auto border-border">
            <CardHeader>
              <CardTitle>Affiliate Application</CardTitle>
              <CardDescription>
                Tell us about yourself and how you plan to promote Recipe Book
              </CardDescription>
            </CardHeader>
            <CardContent>
              <form onSubmit={handleSubmit} className="space-y-6">
                <div className="space-y-2">
                  <Label htmlFor="name">Full Name *</Label>
                  <Input
                    id="name"
                    name="name"
                    value={formData.name}
                    onChange={handleInputChange}
                    placeholder="John Doe"
                    required
                    className={`bg-background ${errors.name ? 'border-destructive' : ''}`}
                  />
                  {errors.name && (
                    <p className="text-sm text-destructive">{errors.name}</p>
                  )}
                </div>

                <div className="space-y-2">
                  <Label htmlFor="email">Email Address *</Label>
                  <div className="relative">
                    <Mail className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
                    <Input
                      id="email"
                      name="email"
                      type="email"
                      value={formData.email}
                      onChange={handleInputChange}
                      placeholder="john@example.com"
                      required
                      className={`pl-10 bg-background ${errors.email ? 'border-destructive' : ''}`}
                    />
                  </div>
                  {errors.email && (
                    <p className="text-sm text-destructive">{errors.email}</p>
                  )}
                </div>

                <div className="space-y-2">
                  <Label htmlFor="website">Website/Social Media URL *</Label>
                  <div className="relative">
                    <Globe className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
                    <Input
                      id="website"
                      name="website"
                      type="url"
                      value={formData.website}
                      onChange={handleInputChange}
                      placeholder="https://yourwebsite.com"
                      required
                      className={`pl-10 bg-background ${errors.website ? 'border-destructive' : ''}`}
                    />
                  </div>
                  {errors.website && (
                    <p className="text-sm text-destructive">{errors.website}</p>
                  )}
                </div>

                <div className="space-y-2">
                  <Label htmlFor="audience">Audience Size</Label>
                  <Input
                    id="audience"
                    name="audience"
                    value={formData.audience}
                    onChange={handleInputChange}
                    placeholder="e.g., 10,000 monthly visitors"
                    className={`bg-background ${errors.audience ? 'border-destructive' : ''}`}
                  />
                  {errors.audience && (
                    <p className="text-sm text-destructive">{errors.audience}</p>
                  )}
                </div>

                <div className="space-y-2">
                  <Label htmlFor="message">
                    Why do you want to join our affiliate program?
                  </Label>
                  <Textarea
                    id="message"
                    name="message"
                    value={formData.message}
                    onChange={handleInputChange}
                    placeholder="Tell us about your promotional strategy..."
                    rows={4}
                    className={`bg-background ${errors.message ? 'border-destructive' : ''}`}
                  />
                  {errors.message && (
                    <p className="text-sm text-destructive">{errors.message}</p>
                  )}
                </div>

                <Button
                  type="submit"
                  size="lg"
                  className="w-full gap-2"
                  disabled={isSubmitting}
                >
                  {isSubmitting ? (
                    "Submitting..."
                  ) : (
                    <>
                      <Users className="w-5 h-5" />
                      Submit Application
                    </>
                  )}
                </Button>
              </form>
            </CardContent>
          </Card>
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
