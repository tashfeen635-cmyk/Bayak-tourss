import type { Metadata } from "next";
import Link from "next/link";
import { FadeIn, StaggerContainer, StaggerItem } from "@/components/animations";
import { TradeDetailsModal } from "@/components/trade-details-modal";
import { buildMetadata } from "@/lib/seo";
import {
  Clapperboard,
  Camera,
  Video,
  Aperture,
  Plane,
  PenLine,
  Users,
  Megaphone,
  BadgePercent,
  MapPin,
  LifeBuoy,
  ShieldCheck,
  Share2,
  HeartHandshake,
  Image,
  Heart,
  AtSign,
  Send,
  MessageCircle,
  CalendarCheck,
  Bus,
  Trophy,
  Compass,
  MessageSquareText,
  ClipboardList,
  Globe,
  DollarSign,
} from "lucide-react";

export const metadata: Metadata = buildMetadata({
  title: "Partner With Terra Pakistan",
  description:
    "Create with Terra Pakistan. Filmmakers, photographers, YouTubers and travel creators get PR collaborations, hidden destinations, local support and long-term partnerships.",
  path: "/creators-and-group-leaders",
});

const creatorRoles = [
  { icon: Clapperboard, title: "Filmmakers" },
  { icon: Camera, title: "Travel Content Creators" },
  { icon: Video, title: "YouTubers" },
  { icon: Share2, title: "Instagram & Facebook Creators" },
  { icon: Aperture, title: "Photographers" },
  { icon: Plane, title: "Drone Pilots" },
  { icon: PenLine, title: "Travel Bloggers" },
  { icon: Users, title: "Group Tour Hosts" },
];

const offers = [
  {
    icon: Megaphone,
    title: "PR & Collaboration Opportunities",
    description:
      "Get invited to campaigns, launches and press trips that grow your profile.",
  },
  {
    icon: BadgePercent,
    title: "Exclusive Travel Discounts",
    description:
      "Case-by-case discounts on Terra Pakistan packages, decided together.",
  },
  {
    icon: MapPin,
    title: "Access to Hidden Destinations",
    description:
      "Beyond the tourist trail — spots that only locals and our guides know.",
  },
  {
    icon: LifeBuoy,
    title: "Local Travel Support",
    description:
      "On-ground help, recommendations and a team that has your back.",
  },
  {
    icon: ShieldCheck,
    title: "Professional Guide & Logistics",
    description:
      "Experienced guides, transport, permits and planning handled for you.",
  },
  {
    icon: Share2,
    title: "Feature on Our Social Media",
    description:
      "We showcase your content to our audience on Instagram and Facebook.",
  },
  {
    icon: HeartHandshake,
    title: "Long-term Partnership Opportunities",
    description:
      "Repeat collaborations and an ongoing relationship with Terra Pakistan.",
  },
];

const expectations = [
  {
    icon: Camera,
    title: "Instagram & Facebook Posts & Stories",
    description:
      "Share your experience through posts and stories on your channels.",
  },
  {
    icon: Image,
    title: "10 High-Quality Photos",
    description:
      "Deliver at least 10 sharp, edit-ready photos from your trip.",
  },
  {
    icon: Video,
    title: "Drone Footage (if available)",
    description:
      "Aerial shots that capture Pakistan from above whenever you can.",
  },
  {
    icon: Heart,
    title: "Honest Travel Experience",
    description:
      "Authentic, real coverage — your honest take, your true voice.",
  },
  {
    icon: AtSign,
    title: "Tag @Terra Pakistan",
    description:
      "Tag and mention us so your audience can find and follow along.",
  },
];

const groupLeaderOffers = [
  {
    icon: CalendarCheck,
    title: "Custom Itineraries",
    description: "Professionally planned and fully customized group itineraries.",
  },
  {
    icon: LifeBuoy,
    title: "Dedicated Local Support",
    description: "Dedicated local support before and throughout your journey.",
  },
  {
    icon: Bus,
    title: "Full Logistics",
    description: "Reliable transportation, accommodation, and on-ground logistics.",
  },
  {
    icon: BadgePercent,
    title: "Exclusive Group Leader Benefits",
    description: "Exclusive benefits based on the group size and collaboration.",
  },
  {
    icon: Trophy,
    title: "Performance-Based Rewards",
    description: "Performance-based rewards for every successful tour you lead.",
  },
  {
    icon: HeartHandshake,
    title: "Long-Term Partnership",
    description: "Long-term partnership opportunities for recurring group leaders.",
  },
];

const groupLeaderExpectations = [
  {
    icon: Compass,
    title: "Lead a Group",
    description: "Organize and lead a group of travelers to Northern Pakistan.",
  },
  {
    icon: Megaphone,
    title: "Promote Your Tour",
    description: "Promote your tour through your community or social platforms.",
  },
  {
    icon: MessageSquareText,
    title: "Keep Communication Open",
    description: "Maintain professional communication with participants before and during the trip.",
  },
  {
    icon: ShieldCheck,
    title: "Represent Us Well",
    description: "Represent Terra Pakistan with integrity and professionalism.",
  },
  {
    icon: ClipboardList,
    title: "Share Feedback",
    description: "Share valuable feedback to help us continuously improve our experiences.",
  },
];

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
              "url('https://images.unsplash.com/photo-1506905925346-21bda4d32df4?w=1920&q=80')",
          }}
        />
        <div className="relative z-10 px-4 text-center">
          <FadeIn>
            <span className="text-sm font-semibold uppercase tracking-wider text-gold">
              Partner With Us
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
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <FadeIn className="text-center">
            <span className="text-sm font-semibold uppercase tracking-wider text-gold">
              Who Can Work With Us?
            </span>
            <h2 className="mt-3 font-heading text-3xl font-bold tracking-tight sm:text-4xl">
              Made for every kind of creator
            </h2>
          </FadeIn>

          <StaggerContainer className="mt-12 grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
            {creatorRoles.map((role) => (
              <StaggerItem key={role.title}>
                <div className="group flex h-full flex-col items-center gap-4 rounded-2xl border border-border bg-card p-8 text-center transition-all duration-500 hover:border-gold/30 hover:shadow-xl">
                  <div className="flex h-14 w-14 items-center justify-center rounded-2xl bg-gold/10 text-gold transition-colors group-hover:bg-gold group-hover:text-white">
                    <role.icon className="h-7 w-7" />
                  </div>
                  <h3 className="font-heading text-lg font-semibold">
                    {role.title}
                  </h3>
                </div>
              </StaggerItem>
            ))}
          </StaggerContainer>
        </div>
      </section>

      <section className="bg-muted/50 py-20">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <FadeIn className="text-center">
            <span className="text-sm font-semibold uppercase tracking-wider text-gold">
              What We Offer
            </span>
            <h2 className="mt-3 font-heading text-3xl font-bold tracking-tight sm:text-4xl">
              Everything we bring to the table
            </h2>
          </FadeIn>

          <StaggerContainer className="mt-12 grid gap-8 sm:grid-cols-2 lg:grid-cols-3">
            {offers.map((offer) => (
              <StaggerItem key={offer.title}>
                <div className="group h-full rounded-2xl border border-border bg-card p-8 transition-all duration-500 hover:border-gold/30 hover:shadow-xl">
                  <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-gold/10 text-gold transition-colors group-hover:bg-gold group-hover:text-white">
                    <offer.icon className="h-6 w-6" />
                  </div>
                  <h3 className="mt-6 font-heading text-lg font-semibold">
                    {offer.title}
                  </h3>
                  <p className="mt-3 text-sm leading-loose text-muted-foreground">
                    {offer.description}
                  </p>
                </div>
              </StaggerItem>
            ))}
          </StaggerContainer>
        </div>
      </section>

      <section className="py-20">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <FadeIn className="text-center">
            <span className="text-sm font-semibold uppercase tracking-wider text-gold">
              What We Expect
            </span>
            <h2 className="mt-3 font-heading text-3xl font-bold tracking-tight sm:text-4xl">
              Our side of the deal
            </h2>
            <p className="mx-auto mt-4 max-w-2xl text-muted-foreground">
              Simple deliverables from every creator who travels with us.
            </p>
          </FadeIn>

          <StaggerContainer className="mt-12 space-y-4">
            {expectations.map((expectation) => (
              <StaggerItem key={expectation.title}>
                <div className="flex items-start gap-4 rounded-xl border border-border bg-card p-6 transition-all duration-300 hover:border-gold/30">
                  <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-xl bg-gold/10 text-gold">
                    <expectation.icon className="h-5 w-5" />
                  </div>
                  <div>
                    <h3 className="font-heading text-lg font-semibold">
                      {expectation.title}
                    </h3>
                    <p className="mt-1 text-sm leading-relaxed text-muted-foreground">
                      {expectation.description}
                    </p>
                  </div>
                </div>
              </StaggerItem>
            ))}
          </StaggerContainer>
        </div>
      </section>

      <section className="py-20">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <FadeIn className="text-center">
            <span className="text-sm font-semibold uppercase tracking-wider text-gold">
              Why Partner With Us
            </span>
            <h2 className="mt-3 font-heading text-3xl font-bold tracking-tight sm:text-4xl">
              Two ways to grow with us
            </h2>
          </FadeIn>

          <StaggerContainer className="mt-12 grid gap-8 sm:grid-cols-2">
            <StaggerItem>
              <div className="group flex h-full flex-col rounded-3xl border-2 border-gold/30 bg-card p-10 transition-all duration-500 hover:border-gold hover:shadow-xl">
                <div className="flex h-14 w-14 items-center justify-center rounded-2xl bg-gold/10 text-gold transition-colors group-hover:bg-gold group-hover:text-white">
                  <Globe className="h-7 w-7" />
                </div>
                <h3 className="mt-6 font-heading text-2xl font-bold">
                  Worldwide Reach
                </h3>
                <p className="mt-3 text-base leading-relaxed text-muted-foreground">
                  Your content will reach curious Pakistanis and across the
                  globe.
                </p>
              </div>
            </StaggerItem>

            <StaggerItem>
              <div className="group flex h-full flex-col rounded-3xl border-2 border-gold/30 bg-card p-10 transition-all duration-500 hover:border-gold hover:shadow-xl">
                <div className="flex h-14 w-14 items-center justify-center rounded-2xl bg-gold/10 text-gold transition-colors group-hover:bg-gold group-hover:text-white">
                  <DollarSign className="h-7 w-7" />
                </div>
                <h3 className="mt-6 font-heading text-2xl font-bold">
                  Lead Group Trips to Pakistan
                </h3>
                <p className="mt-3 text-base leading-relaxed text-muted-foreground">
                  Earn $ by leading group trips to Pakistan. Contact us for
                  more details.
                </p>
                <a
                  href={WHATSAPP_URL}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="mt-8 inline-flex items-center justify-center gap-2 self-start rounded-full bg-gold px-6 py-2.5 text-sm font-semibold text-white hover:bg-gold/90"
                >
                  <MessageCircle className="h-4 w-4" />
                  WhatsApp Us
                </a>
              </div>
            </StaggerItem>
          </StaggerContainer>
        </div>
      </section>

      <section className="bg-muted/50 py-20">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <FadeIn className="text-center">
            <span className="text-sm font-semibold uppercase tracking-wider text-gold">
              Group Leaders
            </span>
            <h2 className="mt-3 font-heading text-3xl font-bold tracking-tight sm:text-4xl">
              Become a Group Leader
            </h2>
            <p className="mx-auto mt-4 max-w-2xl font-heading text-lg font-semibold text-foreground sm:text-xl">
              Lead Inspiring Journeys Across Northern Pakistan
            </p>
            <p className="mx-auto mt-4 max-w-2xl text-muted-foreground">
              Do you have a travel community, social media audience,
              university network, photography club, or adventure group?
              Partner with Terra Pakistan and create unforgettable travel
              experiences while growing your own community.
            </p>
          </FadeIn>

          <FadeIn className="mt-16 text-center">
            <h3 className="font-heading text-2xl font-bold tracking-tight">
              What We Offer
            </h3>
          </FadeIn>

          <StaggerContainer className="mt-10 grid gap-8 sm:grid-cols-2 lg:grid-cols-3">
            {groupLeaderOffers.map((offer) => (
              <StaggerItem key={offer.title}>
                <div className="group h-full rounded-2xl border border-border bg-card p-8 transition-all duration-500 hover:border-gold/30 hover:shadow-xl">
                  <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-gold/10 text-gold transition-colors group-hover:bg-gold group-hover:text-white">
                    <offer.icon className="h-6 w-6" />
                  </div>
                  <h4 className="mt-6 font-heading text-lg font-semibold">
                    {offer.title}
                  </h4>
                  <p className="mt-3 text-sm leading-loose text-muted-foreground">
                    {offer.description}
                  </p>
                </div>
              </StaggerItem>
            ))}
          </StaggerContainer>

          <FadeIn className="mt-16 text-center">
            <h3 className="font-heading text-2xl font-bold tracking-tight">
              What We Expect
            </h3>
            <p className="mx-auto mt-4 max-w-2xl text-muted-foreground">
              We&apos;re looking for passionate leaders who can inspire others
              to explore Pakistan responsibly.
            </p>
          </FadeIn>

          <StaggerContainer className="mt-10 space-y-4">
            {groupLeaderExpectations.map((expectation) => (
              <StaggerItem key={expectation.title}>
                <div className="flex items-start gap-4 rounded-xl border border-border bg-card p-6 transition-all duration-300 hover:border-gold/30">
                  <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-xl bg-gold/10 text-gold">
                    <expectation.icon className="h-5 w-5" />
                  </div>
                  <div>
                    <h4 className="font-heading text-lg font-semibold">
                      {expectation.title}
                    </h4>
                    <p className="mt-1 text-sm leading-relaxed text-muted-foreground">
                      {expectation.description}
                    </p>
                  </div>
                </div>
              </StaggerItem>
            ))}
          </StaggerContainer>
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
