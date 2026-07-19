import type { Metadata } from "next";
import { TeamContent } from "@/components/team-content";

export const metadata: Metadata = {
  title: "Our Team | Bayak Tours",
  description:
    "Meet the passionate team behind Bayak Tours. Travel experts dedicated to crafting your perfect journey.",
};

export default function TeamPage() {
  return <TeamContent />;
}
