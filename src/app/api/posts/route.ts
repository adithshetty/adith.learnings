import { NextResponse } from "next/server";
import { getAllPosts, createPost, CATEGORIES, type Category } from "@/lib/posts";

export async function GET() {
  const posts = getAllPosts();
  return NextResponse.json(posts);
}

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const { title, category, excerpt, content } = body;

    if (!title || typeof title !== "string" || title.trim() === "") {
      return NextResponse.json({ error: "Title is required" }, { status: 400 });
    }

    const validCategories = CATEGORIES.map((c) => c.value);
    if (!category || !validCategories.includes(category as Category)) {
      return NextResponse.json({ error: "Invalid category" }, { status: 400 });
    }

    if (!content || typeof content !== "string" || content.trim() === "") {
      return NextResponse.json({ error: "Content is required" }, { status: 400 });
    }

    const slug = createPost({
      title: title.trim(),
      category: category as Category,
      excerpt: typeof excerpt === "string" ? excerpt.trim() : "",
      content: content.trim(),
    });

    return NextResponse.json({ slug }, { status: 201 });
  } catch {
    return NextResponse.json({ error: "Failed to create post" }, { status: 500 });
  }
}
