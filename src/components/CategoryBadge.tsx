import { type Category, CATEGORIES } from "@/lib/categories";

const categoryStyles: Record<Category, string> = {
  startup: "bg-orange-100 text-orange-700",
  snippets: "bg-blue-100 text-blue-700",
  ai: "bg-purple-100 text-purple-700",
  general: "bg-zinc-100 text-zinc-600",
};

interface CategoryBadgeProps {
  category: Category;
}

export default function CategoryBadge({ category }: CategoryBadgeProps) {
  const label = CATEGORIES.find((c) => c.value === category)?.label ?? category;
  return (
    <span
      className={`inline-flex items-center rounded-full px-2.5 py-0.5 text-xs font-medium ${categoryStyles[category] ?? categoryStyles.general}`}
    >
      {label}
    </span>
  );
}
