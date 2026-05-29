import Link from "next/link";

export default function Header() {
  return (
    <header className="border-b border-zinc-200 bg-white sticky top-0 z-10">
      <div className="max-w-3xl mx-auto px-4 py-4 flex items-center justify-between">
        <Link href="/" className="flex items-center gap-2 group">
          <span className="text-2xl">📖</span>
          <span className="font-semibold text-zinc-900 text-lg group-hover:text-zinc-600 transition-colors">
            Adith&apos;s Learnings
          </span>
        </Link>
        <Link
          href="/posts/new"
          className="inline-flex items-center gap-1.5 rounded-full bg-zinc-900 px-4 py-2 text-sm font-medium text-white hover:bg-zinc-700 transition-colors"
        >
          <span>+</span>
          New Entry
        </Link>
      </div>
    </header>
  );
}
