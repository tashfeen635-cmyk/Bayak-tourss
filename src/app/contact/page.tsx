import type { Metadata } from "next";
import { ContactContent } from "@/components/contact-content";

export const metadata: Metadata = {
  title: "Contact",
  description:
    "Get in touch with Terra Pakistan. Let us help you plan your next adventure.",
  alternates: {
    canonical: "/contact",
  },
};

export default function ContactPage() {
  return <ContactContent />;
}
