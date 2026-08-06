import { ContactContent } from "@/components/contact-content";
import { buildMetadata } from "@/lib/seo";

export const metadata = buildMetadata({
  title: "Contact",
  description:
    "Get in touch with Terra Pakistan. Let us help you plan your next adventure.",
  path: "/contact",
});

export default function ContactPage() {
  return <ContactContent />;
}
