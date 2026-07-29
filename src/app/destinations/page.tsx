import type { Metadata } from "next";
import { DestinationsContent } from "@/components/destinations-content";
import { getCollection } from "@/lib/db";

export const metadata: Metadata = {
  title: "Destinations | Bayak Tours",
  description:
    "Explore our handpicked destinations around the world. From tropical beaches to mountain adventures.",
};

export default async function DestinationsPage() {
  const destinations = await getCollection("destinations");
  return <DestinationsContent destinations={destinations} />;
}
