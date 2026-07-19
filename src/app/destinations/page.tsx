import type { Metadata } from "next";
import { DestinationsContent } from "@/components/destinations-content";

export const metadata: Metadata = {
  title: "Destinations | Bayak Tours",
  description:
    "Explore our handpicked destinations around the world. From tropical beaches to mountain adventures.",
};

export default function DestinationsPage() {
  return <DestinationsContent />;
}
