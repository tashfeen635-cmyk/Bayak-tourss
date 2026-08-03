import type { Metadata } from "next";
import { AboutContent } from "@/components/about-content";

export const metadata: Metadata = {
  title: "About Us",
  description:
    "Learn about Bayak Tours — Pakistan's premier travel company. Our story, mission, and the passionate team behind unforgettable journeys.",
  alternates: {
    canonical: "/about",
  },
};

export default function AboutPage() {
  return <AboutContent />;
}
