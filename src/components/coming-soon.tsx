import { Clock, MessageCircle } from "lucide-react";
import { FadeIn } from "./animations";

const WHATSAPP_NUMBER = "923146605966";

export function ComingSoon({ category = "All" }: { category?: string }) {
  const isAll = category === "All";
  const message = encodeURIComponent(
    isAll
      ? "Hi Terra Pakistan! I'm interested in your upcoming tours. Do you have any new experiences planned?"
      : `Hi Terra Pakistan! I'm interested in the ${category} tours. Do you have any upcoming ${category} experiences planned?`
  );
  const whatsappUrl = `https://wa.me/${WHATSAPP_NUMBER}?text=${message}`;

  return (
    <FadeIn className="mt-12">
      <div className="flex flex-col items-center justify-center gap-4 rounded-3xl border border-border bg-card px-8 py-20 text-center">
        <div className="flex h-16 w-16 items-center justify-center rounded-2xl bg-gold/10 text-gold">
          <Clock className="h-8 w-8" />
        </div>
        <h3 className="font-heading text-2xl font-bold tracking-tight sm:text-3xl">
          Coming Soon
        </h3>
        <p className="max-w-md text-sm leading-relaxed text-muted-foreground">
          {isAll ? (
            <>
              New experiences are being prepared for you. Reach out to us and
              we&apos;ll help you plan your upcoming trip.
            </>
          ) : (
            <>
              We&apos;re crafting an amazing{" "}
              <span className="font-semibold text-gold">{category}</span>{" "}
              experience for you. New tours for this category are on the way —
              reach out to us and we&apos;ll help you plan your trip.
            </>
          )}
        </p>
        <a
          href={whatsappUrl}
          target="_blank"
          rel="noopener noreferrer"
          className="mt-2 inline-flex items-center justify-center gap-2 rounded-full bg-gold px-6 py-2.5 text-sm font-semibold text-white transition-colors hover:bg-gold/90"
        >
          <MessageCircle className="h-4 w-4" />
          WhatsApp Us
        </a>
      </div>
    </FadeIn>
  );
}
