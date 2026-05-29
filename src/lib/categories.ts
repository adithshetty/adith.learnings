export type Category = "startup" | "snippets" | "ai" | "general";

export const CATEGORIES: { value: Category; label: string }[] = [
  { value: "startup", label: "🚀 Startup" },
  { value: "snippets", label: "💻 Snippets" },
  { value: "ai", label: "🤖 AI" },
  { value: "general", label: "📝 General" },
];

export interface PostMeta {
  slug: string;
  title: string;
  date: string;
  category: Category;
  excerpt: string;
}
