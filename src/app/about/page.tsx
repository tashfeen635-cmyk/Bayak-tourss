import { AboutContent } from "@/components/about-content";
import { buildMetadata } from "@/lib/seo";

export const metadata = buildMetadata({
  title: "About Us",
  description:
    "Learn about Terra Pakistan — Pakistan's premier travel company. Our story, mission, and the passionate team behind unforgettable journeys.",
  path: "/about",
});

export default function AboutPage() {
  return <AboutContent />;
}
