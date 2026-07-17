import { useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { ArrowLeft } from "lucide-react";
import { Footer } from "@/components/Footer";
import { usePageTitle } from "@/hooks/usePageTitle";

const Terms = () => {
  const navigate = useNavigate();
  usePageTitle("Terms of Service");

  return (
    <div className="min-h-screen bg-background flex flex-col">
      <header className="bg-card border-b border-border sticky top-0 z-10">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
          <Button variant="ghost" onClick={() => navigate(-1)} className="gap-2">
            <ArrowLeft className="w-4 h-4" />
            Back
          </Button>
        </div>
      </header>
      <main className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 py-12 flex-1">
        <h1 className="text-3xl font-bold text-foreground mb-2">Terms of Service</h1>
        <p className="text-sm text-muted-foreground mb-8">Last updated: July 17, 2026</p>

        <div className="space-y-6 text-foreground">
          <section>
            <h2 className="text-xl font-semibold mb-2">1. The service</h2>
            <p className="text-muted-foreground">
              PlatterMap is a recipe discovery and meal-planning service available on the web and
              as a mobile app. By using PlatterMap you agree to these terms.
            </p>
          </section>
          <section>
            <h2 className="text-xl font-semibold mb-2">2. Your account</h2>
            <p className="text-muted-foreground">
              You are responsible for keeping your account credentials secure. You must provide a
              valid email address to create an account.
            </p>
          </section>
          <section>
            <h2 className="text-xl font-semibold mb-2">3. Acceptable use</h2>
            <p className="text-muted-foreground">
              Don't misuse the service — no attempts to access other users' data, disrupt the
              service, or use it for unlawful purposes.
            </p>
          </section>
          <section>
            <h2 className="text-xl font-semibold mb-2">4. Recipes and nutrition information</h2>
            <p className="text-muted-foreground">
              Recipes and nutrition facts are provided for general information only and may contain
              errors. Always verify ingredients if you have allergies or dietary restrictions.
              Nutrition values are estimates, not medical advice.
            </p>
          </section>
          <section>
            <h2 className="text-xl font-semibold mb-2">5. Subscriptions</h2>
            <p className="text-muted-foreground">
              Some features may require a paid subscription. Prices and included features are shown
              on the pricing page before purchase. Subscriptions renew automatically until
              cancelled.
            </p>
          </section>
          <section>
            <h2 className="text-xl font-semibold mb-2">6. Changes and termination</h2>
            <p className="text-muted-foreground">
              We may update the service and these terms over time. We may suspend accounts that
              violate these terms. You can stop using the service and request account deletion at
              any time.
            </p>
          </section>
          <section>
            <h2 className="text-xl font-semibold mb-2">7. Contact</h2>
            <p className="text-muted-foreground">
              Questions: <a className="text-primary" href="mailto:support@plattermap.app">support@plattermap.app</a>
            </p>
          </section>
        </div>
      </main>
      <Footer />
    </div>
  );
};

export default Terms;
