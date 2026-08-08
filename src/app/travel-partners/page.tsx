import type { Metadata } from "next";
import Link from "next/link";
import { FadeIn } from "@/components/animations";
import { TradeDetailsModal } from "@/components/trade-details-modal";
import { buildMetadata } from "@/lib/seo";
import {
  Users,
  Send,
  MessageCircle,
} from "lucide-react";

export const metadata: Metadata = buildMetadata({
  title: "Partner With Terra Pakistan",
  description:
    "Create with Terra Pakistan. Filmmakers, photographers, YouTubers and travel creators get PR collaborations, hidden destinations, local support and long-term partnerships.",
  path: "/travel-partners",
});

const tradeFaqs = [
  {
    q: "How do I become a travel trade partner?",
    a: "Message us on WhatsApp with your agency or operator details, and we'll set up your partnership within 48 hours.",
  },
  {
    q: "Do you offer B2B rates for agencies and tour operators?",
    a: "Yes. We offer exclusive rates for trade partners, tailored to your volume, group size and collaboration.",
  },
  {
    q: "Can you customize itineraries for my clients?",
    a: "Absolutely. We design itineraries around your clients' preferences, group size and budget.",
  },
  {
    q: "What support do trade partners receive?",
    a: "Dedicated local support, reliable transport, accommodation, permits and on-ground logistics for every tour.",
  },
  {
    q: "Do you work with international tour operators?",
    a: "Yes, we welcome travel trade partners from around the world.",
  },
  {
    q: "Can solo female travelers join?",
    a: "Yes, absolutely. We welcome solo female travelers and make sure every trip is safe, comfortable and well-planned with trusted guides and on-ground support.",
  },
];

const applySteps = [
  {
    title: "Message us on WhatsApp",
    description: "Tap the button below and introduce yourself with your name and role.",
  },
  {
    title: "Share your profile",
    description: "Send your socials, portfolio or group size — whichever fits your work.",
  },
  {
    title: "Get your deal",
    description: "We confirm your collaboration, discount and itinerary details within 48 hours.",
  },
];

const WHATSAPP_URL = "https://wa.me/923146605966?text=" +
  encodeURIComponent(
    "Hi Terra Pakistan! I'd like to create with you. Here are my details:"
  );

export default function CreatorsPage() {
  return (
    <>
      <section className="relative flex min-h-[50vh] items-center justify-center overflow-hidden bg-charcoal pt-32 pb-20">
        <div
          className="absolute inset-0 bg-cover bg-center opacity-40"
          style={{
            backgroundImage:
              "url('/images/hunza.jpg')",
          }}
        />
        <div className="relative z-10 px-4 text-center">
          <FadeIn>
            <span className="text-sm font-semibold uppercase tracking-wider text-gold">
              Let&apos;s Work Together
            </span>
            <h1 className="mt-3 font-heading text-5xl font-bold text-white sm:text-6xl">
              Partner With Terra Pakistan
            </h1>
            <p className="mx-auto mt-4 max-w-2xl text-white/70">
              Filmmakers, photographers, storytellers, travel influencers,
              YouTubers, bloggers, Travel Agencies and Tour Operators and
              group tour hosts are welcome to collaborate with Terra Pakistan.
            </p>
          </FadeIn>
        </div>
      </section>

      <section className="py-20">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <FadeIn className="text-center">
            <span className="text-sm font-semibold uppercase tracking-wider text-gold">
              Trade Partners
            </span>
            <h2 className="mt-3 font-heading text-3xl font-bold tracking-tight sm:text-4xl">
              Travel Trade Partnerships
            </h2>
            <p className="mx-auto mt-4 max-w-2xl text-muted-foreground">
              Let&apos;s work together to deliver unforgettable journeys to
              your clients across Pakistan.
            </p>
          </FadeIn>

          <TradeDetailsModal />

          <div className="mx-auto mt-20 max-w-3xl">
            <FadeIn className="text-center">
              <h3 className="font-heading text-2xl font-bold tracking-tight">
                Frequently Asked Questions
              </h3>
            </FadeIn>

            <div className="mt-10 space-y-4">
              {tradeFaqs.map((faq, i) => (
                <FadeIn key={faq.q} delay={Math.min(i * 0.05, 0.3)}>
                  <div className="rounded-xl border border-border bg-card p-6">
                    <h4 className="font-heading text-lg font-semibold">
                      {faq.q}
                    </h4>
                    <p className="mt-2 text-sm leading-relaxed text-muted-foreground">
                      {faq.a}
                    </p>
                  </div>
                </FadeIn>
              ))}
            </div>
          </div>
        </div>
      </section>

      <section className="py-20">
        <div className="mx-auto max-w-4xl px-4 sm:px-6 lg:px-8">
          <FadeIn className="text-center">
            <span className="text-sm font-semibold uppercase tracking-wider text-gold">
              How To Apply
            </span>
            <h2 className="mt-3 font-heading text-3xl font-bold tracking-tight sm:text-4xl">
              It only takes 3 steps
            </h2>
          </FadeIn>

          <div className="mt-14 space-y-0">
            {applySteps.map((step, i) => (
              <FadeIn key={step.title} delay={Math.min(i * 0.05, 0.3)}>
                <div className="relative flex gap-5 pb-10 last:pb-0">
                  <div className="flex flex-col items-center">
                    <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-full bg-gold text-lg font-bold text-white">
                      {i + 1}
                    </div>
                    {i < applySteps.length - 1 && (
                      <div className="mt-2 w-px flex-1 bg-gold/30" />
                    )}
                  </div>
                  <div className="pt-1">
                    <h3 className="font-heading text-xl font-semibold">
                      {step.title}
                    </h3>
                    <p className="mt-2 text-sm leading-relaxed text-muted-foreground">
                      {step.description}
                    </p>
                  </div>
                </div>
              </FadeIn>
            ))}
          </div>
        </div>
      </section>

      <section className="py-24">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <FadeIn>
            <div className="relative overflow-hidden rounded-3xl bg-gold px-8 py-16 text-center sm:px-16">
              <div className="absolute -left-20 -top-20 h-64 w-64 rounded-full bg-white/10" />
              <div className="absolute -bottom-20 -right-20 h-64 w-64 rounded-full bg-white/10" />
              <div className="relative z-10">
                <div className="flex flex-wrap items-center justify-center gap-4 text-white">
                  <Users className="h-8 w-8" />
                  <Send className="h-8 w-8" />
                  <MessageCircle className="h-8 w-8" />
                </div>
                <h2 className="mt-6 font-heading text-3xl font-bold text-white sm:text-4xl">
                  Ready to create with us?
                </h2>
                <p className="mx-auto mt-4 max-w-xl text-white/80">
                  Message us on WhatsApp and we&apos;ll confirm your
                  collaboration, discount or partnership within 48 hours.
                </p>
                <div className="mt-8 flex flex-col items-center justify-center gap-4 sm:flex-row">
                  <a
                    href={WHATSAPP_URL}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center justify-center gap-2 rounded-full bg-white px-8 py-3 text-base font-semibold text-gold hover:bg-white/90"
                  >
                    <svg viewBox="0 0 24 24" fill="currentColor" className="h-5 w-5">
                      <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.297-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 0 1-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 0 1-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 0 1 2.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0 0 12.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 0 0 5.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 0 0-3.48-8.413Z" />
                    </svg>
                    WhatsApp Us
                  </a>
                  <Link
                    href="/contact"
                    className="inline-flex items-center justify-center rounded-full bg-charcoal px-8 py-3 text-base font-semibold text-white hover:bg-charcoal/90"
                  >
                    Contact Us
                  </Link>
                </div>
              </div>
            </div>
          </FadeIn>
        </div>
      </section>
    </>
  );
}
