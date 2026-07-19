import type { Metadata } from "next";
import { ContactContent } from "@/components/contact-content";

export const metadata: Metadata = {
  title: "Contact | Bayak Tours",
  description:
    "Get in touch with Bayak Tours. Let us help you plan your next adventure.",
};

export default function ContactPage() {
  return <ContactContent />;
}
