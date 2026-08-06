import { GalleryContent } from "@/components/gallery-content";
import { getCollection } from "@/lib/db";
import { buildMetadata } from "@/lib/seo";

export const metadata = buildMetadata({
  title: "Gallery",
  description:
    "Browse stunning travel photography from our destinations around the world.",
  path: "/gallery",
});

export default async function GalleryPage() {
  const images = await getCollection("gallery");
  return <GalleryContent images={images} />;
}
