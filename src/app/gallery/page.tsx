import type { Metadata } from "next";
import { GalleryContent } from "@/components/gallery-content";
import { getCollection } from "@/lib/db";

export const metadata: Metadata = {
  title: "Gallery | Bayak Tours",
  description:
    "Browse stunning travel photography from our destinations around the world.",
};

export default async function GalleryPage() {
  const images = await getCollection("gallery");
  return <GalleryContent images={images} />;
}
