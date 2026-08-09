import { TeamContent } from "@/components/team-content";
import { getCollection } from "@/lib/db";
import { buildMetadata } from "@/lib/seo";

export const dynamic = "force-dynamic";

export const metadata = buildMetadata({
  title: "Our Team",
  description:
    "Meet the passionate team behind Terra Pakistan. Travel experts dedicated to crafting your perfect journey.",
  path: "/team",
});

export default async function TeamPage() {
  const team = await getCollection("team");
  return <TeamContent team={team} />;
}
