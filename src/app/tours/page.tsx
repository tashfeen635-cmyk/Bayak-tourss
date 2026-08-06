import { DestinationsContent } from "@/components/destinations-content";
import { getCollection } from "@/lib/db";
import { buildMetadata } from "@/lib/seo";

export const metadata = buildMetadata({
  title: "Tours",
  description:
    "Explore our handpicked tours around Pakistan. From tropical beaches to mountain adventures.",
  path: "/tours",
});

export default async function DestinationsPage() {
  const destinations = await getCollection("destinations");
  return <DestinationsContent destinations={destinations} />;
}
