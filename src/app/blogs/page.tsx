import { BlogsContent } from "@/components/blogs-content";
import { buildMetadata } from "@/lib/seo";

export const metadata = buildMetadata({
  title: "Blogs",
  description:
    "Travel news, stories and guides from Pakistan's north — Gilgit-Baltistan in the global spotlight, Karakoram Highway road trips, and hiking guides to K2 Base Camp.",
  path: "/blogs",
});

export default function BlogsPage() {
  return <BlogsContent />;
}
