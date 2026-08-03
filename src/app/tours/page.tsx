import type { Metadata } from "next";
import { DestinationsContent } from "@/components/destinations-content";
import { getCollection } from "@/lib/db";

export const metadata: Metadata = {
  title: "Tours",
  description:
    "Explore our handpicked tours around Pakistan. From tropical beaches to mountain adventures.",
  alternates: {
    canonical: "/tours",
  },
};

export default async function DestinationsPage() {
  const destinations = await getCollection("destinations");
  return <DestinationsContent destinations={destinations} />;
}
