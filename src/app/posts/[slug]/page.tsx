import { getPostBySlug, getAllPosts } from "@/lib/posts";
import { notFound } from "next/navigation";
import Link from "next/link";
import ReactMarkdown from "react-markdown";
import CategoryBadge from "@/components/CategoryBadge";
import type { Metadata } from "next";

interface Props {
  params: Promise<{ slug: string }>;
}

export async function generateStaticParams() {
  const posts = getAllPosts();
  return posts.map((p) => ({ slug: p.slug }));
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params;
  const post = getPostBySlug(slug);
  if (!post) return {};
  return { title: `${post.title} — Adith's Learnings`, description: post.excerpt };
}

export default async function PostPage({ params }: Props) {
  const { slug } = await params;
  const post = getPostBySlug(slug);
  if (!post) notFound();

  const formattedDate = new Date(post.date + "T00:00:00").toLocaleDateString(
    "en-AU",
    { year: "numeric", month: "long", day: "numeric" }
  );

  return (
    <div className="max-w-3xl mx-auto px-4 py-10">
      {/* Back link */}
      <Link
        href="/"
        className="inline-flex items-center gap-1 text-sm text-zinc-500 hover:text-zinc-900 transition-colors mb-8"
      >
        ← Back to all entries
      </Link>

      <article>
        {/* Header */}
        <header className="mb-8">
          <div className="flex items-center gap-3 mb-3">
            <CategoryBadge category={post.category} />
            <time className="text-sm text-zinc-400">{formattedDate}</time>
          </div>
          <h1 className="text-2xl font-bold text-zinc-900 leading-snug">
            {post.title}
          </h1>
          {post.excerpt && (
            <p className="mt-3 text-zinc-500 leading-relaxed">{post.excerpt}</p>
          )}
        </header>

        {/* Divider */}
        <hr className="border-zinc-200 mb-8" />

        {/* Content */}
        <div className="prose-content">
          <ReactMarkdown
            components={{
              h1: ({ children }) => (
                <h1 className="text-2xl font-bold text-zinc-900 mt-8 mb-4">{children}</h1>
              ),
              h2: ({ children }) => (
                <h2 className="text-xl font-semibold text-zinc-900 mt-7 mb-3">{children}</h2>
              ),
              h3: ({ children }) => (
                <h3 className="text-base font-semibold text-zinc-800 mt-6 mb-2">{children}</h3>
              ),
              p: ({ children }) => (
                <p className="text-zinc-700 leading-relaxed mb-4">{children}</p>
              ),
              ul: ({ children }) => (
                <ul className="list-disc list-inside text-zinc-700 mb-4 space-y-1">{children}</ul>
              ),
              ol: ({ children }) => (
                <ol className="list-decimal list-inside text-zinc-700 mb-4 space-y-1">{children}</ol>
              ),
              li: ({ children }) => <li className="leading-relaxed">{children}</li>,
              code: ({ children, className }) => {
                const isBlock = className?.startsWith("language-");
                if (isBlock) {
                  return (
                    <code className="block bg-zinc-900 text-zinc-100 rounded-lg p-4 text-sm font-mono overflow-x-auto mb-4 whitespace-pre">
                      {children}
                    </code>
                  );
                }
                return (
                  <code className="bg-zinc-100 text-zinc-800 rounded px-1.5 py-0.5 text-sm font-mono">
                    {children}
                  </code>
                );
              },
              pre: ({ children }) => <pre className="mb-4">{children}</pre>,
              blockquote: ({ children }) => (
                <blockquote className="border-l-4 border-zinc-300 pl-4 text-zinc-500 italic mb-4">
                  {children}
                </blockquote>
              ),
              strong: ({ children }) => (
                <strong className="font-semibold text-zinc-900">{children}</strong>
              ),
              a: ({ href, children }) => (
                <a
                  href={href}
                  className="text-blue-600 hover:underline"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  {children}
                </a>
              ),
              hr: () => <hr className="border-zinc-200 my-6" />,
            }}
          >
            {post.content}
          </ReactMarkdown>
        </div>
      </article>
    </div>
  );
}
