import Link from "next/link";
import { type PostMeta } from "@/lib/categories";
import CategoryBadge from "./CategoryBadge";

interface PostCardProps {
  post: PostMeta;
}

export default function PostCard({ post }: PostCardProps) {
  const formattedDate = new Date(post.date + "T00:00:00").toLocaleDateString(
    "en-AU",
    { year: "numeric", month: "long", day: "numeric" }
  );

  return (
    <Link href={`/posts/${post.slug}`} className="block group">
      <article className="rounded-xl border border-zinc-200 bg-white p-5 hover:border-zinc-400 hover:shadow-sm transition-all">
        <div className="flex items-start justify-between gap-3 mb-2">
          <h2 className="text-base font-semibold text-zinc-900 group-hover:text-zinc-600 transition-colors leading-snug">
            {post.title}
          </h2>
          <CategoryBadge category={post.category} />
        </div>
        {post.excerpt && (
          <p className="text-sm text-zinc-500 leading-relaxed line-clamp-2 mb-3">
            {post.excerpt}
          </p>
        )}
        <time className="text-xs text-zinc-400">{formattedDate}</time>
      </article>
    </Link>
  );
}
