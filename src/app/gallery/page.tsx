import type { Metadata } from "next";
import { GalleryContent } from "@/components/gallery-content";
import { getCollection } from "@/lib/db";

export const metadata: Metadata = {
  title: "Gallery",
  description:
    "Browse stunning travel photography from our destinations around the world.",
  alternates: {
    canonical: "/gallery",
  },
};

export default async function GalleryPage() {
  const images = await getCollection("gallery");
  return <GalleryContent images={images} />;
}
