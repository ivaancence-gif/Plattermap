import { useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { ArrowLeft } from "lucide-react";
import { Footer } from "@/components/Footer";
import { usePageTitle } from "@/hooks/usePageTitle";

const Privacy = () => {
  const navigate = useNavigate();
  usePageTitle("Privacy Policy");

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
      <main className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 py-12 flex-1 prose-sm">
        <h1 className="text-3xl font-bold text-foreground mb-2">Privacy Policy</h1>
        <p className="text-sm text-muted-foreground mb-8">Last updated: July 17, 2026</p>

        <div className="space-y-6 text-foreground">
          <section>
            <h2 className="text-xl font-semibold mb-2">What we collect</h2>
            <p className="text-muted-foreground">
              When you create a PlatterMap account we store your email address and, if you sign in
              with Google, your basic profile information (name and avatar). As you use the app we
              store the content you create: saved favorites, recipe notes, meal plans, shopping
              lists, and dietary preferences.
            </p>
          </section>
          <section>
            <h2 className="text-xl font-semibold mb-2">How we use it</h2>
            <p className="text-muted-foreground">
              Your data is used only to provide PlatterMap's features — syncing your favorites,
              plans, and lists across devices. We do not sell your data, show third-party ads, or
              share your information with advertisers.
            </p>
          </section>
          <section>
            <h2 className="text-xl font-semibold mb-2">Where it lives</h2>
            <p className="text-muted-foreground">
              Data is stored securely with Supabase (our database provider) in the United States.
              Each account's data is protected so that only you can access your own content.
            </p>
          </section>
          <section>
            <h2 className="text-xl font-semibold mb-2">Browsing without an account</h2>
            <p className="text-muted-foreground">
              You can browse all recipes without creating an account. No personal information is
              collected from signed-out visitors.
            </p>
          </section>
          <section>
            <h2 className="text-xl font-semibold mb-2">Children's privacy</h2>
            <p className="text-muted-foreground">
              PlatterMap is a general-audience service and does not knowingly collect personal
              information from children under 13. If you believe a child has created an account,
              contact us and we will remove it.
            </p>
          </section>
          <section>
            <h2 className="text-xl font-semibold mb-2">Deleting your data</h2>
            <p className="text-muted-foreground">
              You can request deletion of your account and all associated data at any time by
              emailing <a className="text-primary" href="mailto:support@plattermap.app">support@plattermap.app</a>.
            </p>
          </section>
          <section>
            <h2 className="text-xl font-semibold mb-2">Contact</h2>
            <p className="text-muted-foreground">
              Questions about this policy: <a className="text-primary" href="mailto:support@plattermap.app">support@plattermap.app</a>
            </p>
          </section>
        </div>
      </main>
      <Footer />
    </div>
  );
};

export default Privacy;
