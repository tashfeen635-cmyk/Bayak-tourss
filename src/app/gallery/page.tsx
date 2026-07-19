import type { Metadata } from "next";
import { GalleryContent } from "@/components/gallery-content";

export const metadata: Metadata = {
  title: "Gallery | Bayak Tours",
  description:
    "Browse stunning travel photography from our destinations around the world.",
};

export default function GalleryPage() {
  return <GalleryContent />;
}
