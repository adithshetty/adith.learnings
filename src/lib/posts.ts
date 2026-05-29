import fs from "fs";
import path from "path";
import matter from "gray-matter";
import { type Category, type PostMeta, CATEGORIES } from "./categories";

export type { Category, PostMeta };
export { CATEGORIES };

const postsDirectory = path.join(process.cwd(), "posts");

export interface Post extends PostMeta {
  content: string;
}

function ensurePostsDir() {
  if (!fs.existsSync(postsDirectory)) {
    fs.mkdirSync(postsDirectory, { recursive: true });
  }
}

export function getAllPosts(): PostMeta[] {
  ensurePostsDir();
  const files = fs.readdirSync(postsDirectory).filter((f) => f.endsWith(".md"));

  const posts = files.map((filename) => {
    const slug = filename.replace(/\.md$/, "");
    const fullPath = path.join(postsDirectory, filename);
    const fileContents = fs.readFileSync(fullPath, "utf8");
    const { data } = matter(fileContents);

    return {
      slug,
      title: data.title ?? "Untitled",
      date: data.date ?? new Date().toISOString().split("T")[0],
      category: (data.category ?? "general") as Category,
      excerpt: data.excerpt ?? "",
    };
  });

  return posts.sort((a, b) => (a.date < b.date ? 1 : -1));
}

export function getPostBySlug(slug: string): Post | null {
  ensurePostsDir();
  const fullPath = path.join(postsDirectory, `${slug}.md`);
  if (!fs.existsSync(fullPath)) return null;

  const fileContents = fs.readFileSync(fullPath, "utf8");
  const { data, content } = matter(fileContents);

  return {
    slug,
    title: data.title ?? "Untitled",
    date: data.date ?? new Date().toISOString().split("T")[0],
    category: (data.category ?? "general") as Category,
    excerpt: data.excerpt ?? "",
    content,
  };
}

export function createPost(post: {
  title: string;
  category: Category;
  excerpt: string;
  content: string;
}): string {
  ensurePostsDir();
  const date = new Date().toISOString().split("T")[0];
  const slug = post.title
    .toLowerCase()
    .replace(/[^a-z0-9\s-]/g, "")
    .trim()
    .replace(/\s+/g, "-")
    .replace(/-+/g, "-")
    .slice(0, 80);

  const uniqueSlug = `${slug}-${Date.now()}`;
  const frontmatter = matter.stringify(post.content, {
    title: post.title,
    date,
    category: post.category,
    excerpt: post.excerpt,
  });

  const fullPath = path.join(postsDirectory, `${uniqueSlug}.md`);
  fs.writeFileSync(fullPath, frontmatter, "utf8");
  return uniqueSlug;
}
