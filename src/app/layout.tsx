import type { Metadata } from "next";
import "./globals.css";
import Header from "@/components/Header";

export const metadata: Metadata = {
  title: "Adith's Learnings",
  description: "A log of everything I learn — startups, code snippets, AI, and more.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className="h-full antialiased">
      <body className="min-h-full flex flex-col bg-zinc-50 font-sans">
        <Header />
        <main className="flex-1">{children}</main>
        <footer className="border-t border-zinc-200 bg-white py-6 text-center text-xs text-zinc-400">
          Adith&apos;s Learnings — a personal knowledge log
        </footer>
      </body>
    </html>
  );
}
