import { Link, useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent } from "@/components/ui/card";
import { ArrowLeft, CalendarDays } from "lucide-react";
import { Footer } from "@/components/Footer";
import { usePageTitle } from "@/hooks/usePageTitle";
import { blogPosts } from "@/lib/blog";

const Blog = () => {
  const navigate = useNavigate();
  usePageTitle("Blog");

  return (
    <div className="min-h-screen bg-background flex flex-col">
      <header className="bg-card border-b border-border sticky top-0 z-10">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
          <Button variant="ghost" onClick={() => navigate("/")} className="gap-2">
            <ArrowLeft className="w-4 h-4" />
            Back
          </Button>
        </div>
      </header>
      <main className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 py-12 flex-1 w-full">
        <h1 className="text-4xl font-bold text-foreground mb-2">The PlatterMap Blog</h1>
        <p className="text-lg text-muted-foreground mb-10">
          Family cooking ideas, meal-planning tips, and stories from our kitchen.
        </p>
        <div className="space-y-6">
          {blogPosts.map((post) => (
            <Link key={post.slug} to={`/blog/${post.slug}`} className="block">
              <Card className="transition-all duration-300 hover:shadow-lg hover:-translate-y-0.5">
                <CardContent className="pt-6">
                  <div className="flex items-center gap-3 text-sm text-muted-foreground mb-2">
                    <span className="flex items-center gap-1">
                      <CalendarDays className="w-4 h-4" />
                      {new Date(post.date).toLocaleDateString("en-US", {
                        year: "numeric",
                        month: "long",
                        day: "numeric",
                      })}
                    </span>
                    {post.tags.map((t) => (
                      <Badge key={t} variant="outline" className="text-xs">
                        {t}
                      </Badge>
                    ))}
                  </div>
                  <h2 className="text-2xl font-semibold text-foreground mb-2">{post.title}</h2>
                  <p className="text-muted-foreground">{post.description}</p>
                </CardContent>
              </Card>
            </Link>
          ))}
        </div>
      </main>
      <Footer />
    </div>
  );
};

export default Blog;
