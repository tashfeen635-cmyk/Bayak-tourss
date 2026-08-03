import type { Metadata } from "next";
import { BlogsContent } from "@/components/blogs-content";

export const metadata: Metadata = {
  title: "Blogs",
  description:
    "Travel news, stories and guides from Pakistan's north — Gilgit-Baltistan in the global spotlight, Karakoram Highway road trips, and hiking guides to K2 Base Camp.",
  alternates: {
    canonical: "/blogs",
  },
};

export default function BlogsPage() {
  return <BlogsContent />;
}
