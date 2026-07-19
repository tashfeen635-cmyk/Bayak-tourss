import type { Metadata } from "next";
import { AboutContent } from "@/components/about-content";

export const metadata: Metadata = {
  title: "About Us | Bayak Tours",
  description:
    "Learn about Bayak Tours — Pakistan's premier travel company. Our story, mission, and the passionate team behind unforgettable journeys.",
};

export default function AboutPage() {
  return <AboutContent />;
}
