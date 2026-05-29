"use client";

import { useState } from "react";
import { type PostMeta, type Category, CATEGORIES } from "@/lib/categories";
import PostCard from "@/components/PostCard";

const ALL = "all" as const;
type Filter = typeof ALL | Category;

interface HomeClientProps {
  posts: PostMeta[];
}

export default function HomeClient({ posts }: HomeClientProps) {
  const [activeFilter, setActiveFilter] = useState<Filter>(ALL);

  const filtered =
    activeFilter === ALL ? posts : posts.filter((p) => p.category === activeFilter);

  return (
    <div className="max-w-3xl mx-auto px-4 py-10">
      {/* Filter bar */}
      <div className="flex flex-wrap gap-2 mb-8">
        <button
          onClick={() => setActiveFilter(ALL)}
          className={`rounded-full px-4 py-1.5 text-sm font-medium transition-colors ${
            activeFilter === ALL
              ? "bg-zinc-900 text-white"
              : "bg-white border border-zinc-200 text-zinc-600 hover:border-zinc-400"
          }`}
        >
          All
        </button>
        {CATEGORIES.map((cat) => (
          <button
            key={cat.value}
            onClick={() => setActiveFilter(cat.value)}
            className={`rounded-full px-4 py-1.5 text-sm font-medium transition-colors ${
              activeFilter === cat.value
                ? "bg-zinc-900 text-white"
                : "bg-white border border-zinc-200 text-zinc-600 hover:border-zinc-400"
            }`}
          >
            {cat.label}
          </button>
        ))}
      </div>

      {/* Post list */}
      {filtered.length === 0 ? (
        <div className="text-center py-20 text-zinc-400">
          <p className="text-4xl mb-3">📭</p>
          <p className="text-sm">No entries yet in this category.</p>
        </div>
      ) : (
        <div className="flex flex-col gap-3">
          {filtered.map((post) => (
            <PostCard key={post.slug} post={post} />
          ))}
        </div>
      )}
    </div>
  );
}
