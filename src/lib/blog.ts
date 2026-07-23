// Loads markdown posts from src/content/blog at build time via Vite glob.
// Frontmatter is a simple key: value block delimited by --- lines.

export interface BlogPost {
  slug: string;
  title: string;
  description: string;
  date: string; // ISO yyyy-mm-dd
  tags: string[];
  body: string; // markdown without frontmatter
}

const raw = import.meta.glob("../content/blog/*.md", {
  eager: true,
  query: "?raw",
  import: "default",
}) as Record<string, string>;

const parse = (path: string, text: string): BlogPost | null => {
  const slug = path.split("/").pop()!.replace(/\.md$/, "");
  const m = text.match(/^---\n([\s\S]*?)\n---\n?/);
  const fm: Record<string, string> = {};
  if (m) {
    for (const line of m[1].split("\n")) {
      const i = line.indexOf(":");
      if (i > 0) fm[line.slice(0, i).trim()] = line.slice(i + 1).trim().replace(/^["'](.*)["']$/, "$1");
    }
  }
  if (fm.published === "false") return null;
  return {
    slug,
    title: fm.title ?? slug,
    description: fm.description ?? "",
    date: fm.date ?? "",
    tags: fm.tags ? fm.tags.split(",").map((t) => t.trim()) : [],
    body: m ? text.slice(m[0].length) : text,
  };
};

export const blogPosts: BlogPost[] = Object.entries(raw)
  .map(([path, text]) => parse(path, text))
  .filter((p): p is BlogPost => p !== null)
  .sort((a, b) => (a.date < b.date ? 1 : -1));

export const getPost = (slug: string) => blogPosts.find((p) => p.slug === slug);
