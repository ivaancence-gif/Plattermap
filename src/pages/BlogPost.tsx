import { useEffect } from "react";
import { Link, useNavigate, useParams } from "react-router-dom";
import ReactMarkdown from "react-markdown";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { ArrowLeft, CalendarDays } from "lucide-react";
import { Footer } from "@/components/Footer";
import { usePageTitle } from "@/hooks/usePageTitle";
import { getPost } from "@/lib/blog";

const SITE = "https://plattermap.app";

const BlogPost = () => {
  const { slug } = useParams();
  const navigate = useNavigate();
  const post = slug ? getPost(slug) : undefined;
  usePageTitle(post?.title);

  // Article structured data for search engines
  useEffect(() => {
    if (!post) return;
    const script = document.createElement("script");
    script.type = "application/ld+json";
    script.text = JSON.stringify({
      "@context": "https://schema.org",
      "@type": "Article",
      headline: post.title,
      description: post.description,
      datePublished: post.date,
      url: `${SITE}/blog/${post.slug}`,
      author: { "@type": "Organization", name: "PlatterMap" },
      publisher: { "@type": "Organization", name: "PlatterMap", url: SITE },
    });
    document.head.appendChild(script);
    return () => {
      document.head.removeChild(script);
    };
  }, [post]);

  if (!post) {
    return (
      <div className="min-h-screen bg-background flex items-center justify-center">
        <div className="text-center">
          <h1 className="text-2xl font-bold text-foreground mb-4">Post not found</h1>
          <Button onClick={() => navigate("/blog")}>Back to Blog</Button>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-background flex flex-col">
      <header className="bg-card border-b border-border sticky top-0 z-10">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
          <Button variant="ghost" onClick={() => navigate("/blog")} className="gap-2">
            <ArrowLeft className="w-4 h-4" />
            All Posts
          </Button>
        </div>
      </header>
      <main className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 py-12 flex-1 w-full">
        <div className="flex items-center gap-3 text-sm text-muted-foreground mb-3">
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
        <article
          className="prose-plattermap text-foreground
            [&_h1]:text-4xl [&_h1]:font-bold [&_h1]:mb-6
            [&_h2]:text-2xl [&_h2]:font-semibold [&_h2]:mt-10 [&_h2]:mb-3 [&_h2]:text-foreground
            [&_h3]:text-xl [&_h3]:font-semibold [&_h3]:mt-6 [&_h3]:mb-2
            [&_p]:text-muted-foreground [&_p]:leading-relaxed [&_p]:mb-4
            [&_li]:text-muted-foreground [&_li]:mb-1 [&_ul]:list-disc [&_ul]:pl-6 [&_ul]:mb-4
            [&_ol]:list-decimal [&_ol]:pl-6 [&_ol]:mb-4
            [&_a]:text-primary [&_a]:underline-offset-2 hover:[&_a]:underline
            [&_strong]:text-foreground"
        >
          <ReactMarkdown>{`# ${post.title}\n\n${post.body}`}</ReactMarkdown>
        </article>
        <div className="mt-12 p-6 bg-accent/30 rounded-lg text-center">
          <p className="text-foreground font-medium mb-3">
            Hungry for more? Browse our full collection of recipes.
          </p>
          <Button asChild>
            <Link to="/recipes">Explore Recipes</Link>
          </Button>
        </div>
      </main>
      <Footer />
    </div>
  );
};

export default BlogPost;
