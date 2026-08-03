import type { Metadata } from "next";
import { TeamContent } from "@/components/team-content";
import { getCollection } from "@/lib/db";

export const metadata: Metadata = {
  title: "Our Team",
  description:
    "Meet the passionate team behind Bayak Tours. Travel experts dedicated to crafting your perfect journey.",
  alternates: {
    canonical: "/team",
  },
};

export default async function TeamPage() {
  const team = await getCollection("team");
  return <TeamContent team={team} />;
}
