import type { Metadata } from "next";
import Link from "next/link";
import { FadeIn, StaggerContainer, StaggerItem } from "@/components/animations";
import {
  CheckCircle2,
  BadgePercent,
  Camera,
  Users,
  Heart,
  Compass,
  Send,
  MessageCircle,
  Sparkles,
} from "lucide-react";

export const metadata: Metadata = {
  title: "Work With Us",
  description:
    "Partner with Bayak Tours. Influencers get paid collaborations and exclusive discounts, and tour leaders travel free and earn on every group.",
  alternates: {
    canonical: "/work-with-us",
  },
};

const partnerGroups = [
  {
    id: "influencers",
    icon: Camera,
    title: "Influencers",
    tagline:
      "Get paid to create, travel on sponsored experiences and grow a long-term partnership with Bayak Tours.",
    requirements: [
      {
        title: "Authentic travel content",
        description:
          "Genuine, real-world experiences — your audience trusts honesty over polish.",
      },
      {
        title: "Social media collaboration",
        description:
          "Cross-promote with us across your channels — posts, stories and reels.",
      },
      {
        title: "Professional collaboration",
        description:
          "Clear communication, reliable timelines and a professional working attitude.",
      },
      {
        title: "Passion for travel",
        description:
          "A genuine love for exploring Pakistan and sharing it with your audience.",
      },
      {
        title: "Consistent content creation",
        description:
          "Regular posting and steady engagement so our partnership keeps momentum.",
      },
      {
        title: "High-quality videos & photos",
        description:
          "Sharp, well-composed visuals that reflect the quality of Bayak Tours.",
      },
      {
        title: "Brand alignment",
        description:
          "Values and content style that match our brand image and standards.",
      },
      {
        title: "Performance & insights sharing",
        description:
          "Share reach, engagement and results so we can grow together.",
      },
    ],
    offers: [
      {
        title: "Paid collaborations",
        description:
          "Get paid for your work — every sponsored trip and campaign comes with fair compensation.",
      },
      {
        title: "Exclusive travel discounts",
        description:
          "Case-by-case discounts on Bayak tour packages beyond our standard offers.",
      },
      {
        title: "Long-term partnerships",
        description:
          "Grow with us beyond one trip — repeat collaborations, bigger campaigns and ongoing support.",
      },
      {
        title: "Sponsored travel experiences",
        description:
          "Fully or partially sponsored trips so you can explore Pakistan's best destinations.",
      },
      {
        title: "Content support & brand exposure",
        description:
          "Our team amplifies your content and introduces you to a wider audience.",
      },
      {
        title: "Creative freedom",
        description:
          "Full control over your content — we trust your style, voice and storytelling.",
      },
      {
        title: "Early access to new experiences",
        description:
          "Be the first to try new tours, destinations and launches before anyone else.",
      },
      {
        title: "Networking opportunities",
        description:
          "Connect with fellow creators, brands and travel industry partners.",
      },
    ],
  },
  {
    id: "tour-leaders",
    icon: Compass,
    title: "Tour Leaders",
    tagline:
      "Bring your group, lead it free, and earn on every seat you fill.",
    requirements: [
      {
        title: "Group experience",
        description:
          "A track record of organizing and safely leading group trips.",
      },
      {
        title: "5+ travelers",
        description:
          "A group of 5 or more travelers you can bring along on a Bayak tour.",
      },
      {
        title: "Clear communication",
        description:
          "Reliable coordination with our team before and during every trip.",
      },
      {
        title: "Leadership skills",
        description:
          "Confidence to manage group dynamics, keep energy high and lead the way.",
      },
      {
        title: "Safety awareness",
        description:
          "A safety-first approach and sensible decisions for your whole group.",
      },
      {
        title: "Punctuality & organization",
        description:
          "On-time, well-planned trips that stick to the itinerary.",
      },
      {
        title: "Brand representation",
        description:
          "Positive, professional representation of Bayak Tours throughout the trip.",
      },
      {
        title: "Feedback & collaboration",
        description:
          "Share honest feedback and work with our team to keep improving.",
      },
    ],
    offers: [
      {
        title: "Free leader seat",
        description:
          "Travel free whenever your group reaches the minimum size.",
      },
      {
        title: "Discounted group rates",
        description:
          "Preferential pricing for everyone in your group or crew.",
      },
      {
        title: "Leader commission",
        description:
          "Earn on every group booking you bring to Bayak Tours.",
      },
      {
        title: "Booking support",
        description:
          "Marketing and booking help from our team so you can focus on your group.",
      },
      {
        title: "Exclusive leader training",
        description:
          "Guides and tips to help you plan, pitch and run unforgettable trips.",
      },
      {
        title: "Recognition & perks",
        description:
          "A leader badge, priority access and appreciation rewards from Bayak Tours.",
      },
      {
        title: "Networking opportunities",
        description:
          "Connect with fellow leaders, creators and partners in the Bayak community.",
      },
      {
        title: "Repeat trip incentives",
        description:
          "Bigger discounts and higher commissions on every group you bring back.",
      },
    ],
  },
];

const applySteps = [
  {
    title: "Message us on WhatsApp",
    description: "Tap the button below and introduce yourself with your name and role.",
  },
  {
    title: "Share your profile",
    description: "Send your socials, experience or group size — whichever fits your program.",
  },
  {
    title: "Get your deal",
    description: "We confirm your collaboration, discount and itinerary details within 48 hours.",
  },
];

const WHATSAPP_URL = "https://wa.me/923146605966?text=" +
  encodeURIComponent(
    "Hi Bayak Tours! I'd like to partner with you. Here are my details:"
  );

export default function WorkWithUsPage() {
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
              Work With Us
            </h1>
            <p className="mx-auto mt-4 max-w-2xl text-white/70">
              Get paid for your collaborations, lead your group for free, or
              earn on every referral. Pick your partnership and let&apos;s grow
              Bayak Tours together.
            </p>
          </FadeIn>
        </div>
      </section>

      <section className="py-20">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <FadeIn className="text-center">
            <span className="text-sm font-semibold uppercase tracking-wider text-gold">
              Partner Programs
            </span>
            <h2 className="mt-3 font-heading text-3xl font-bold tracking-tight sm:text-4xl">
              Pick your partnership
            </h2>
            <p className="mx-auto mt-4 max-w-2xl text-muted-foreground">
              Two ways to grow with Bayak Tours. Each program spells out what
              we ask of you and exactly what you get in return.
            </p>
          </FadeIn>
        </div>
      </section>

      {partnerGroups.map((group, i) => (
        <section
          key={group.id}
          className={i % 2 === 1 ? "bg-muted/50 py-20" : "py-20"}
        >
          <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
            <FadeIn className="flex flex-col items-center gap-3 text-center">
              <div className="flex h-14 w-14 items-center justify-center rounded-2xl bg-gold/10 text-gold">
                <group.icon className="h-7 w-7" />
              </div>
              <h2 className="font-heading text-3xl font-bold tracking-tight sm:text-4xl">
                {group.title}
              </h2>
              <p className="max-w-2xl text-muted-foreground">{group.tagline}</p>
            </FadeIn>

            <div className="mt-12 grid gap-6 lg:grid-cols-2">
              <FadeIn direction={i % 2 === 0 ? "left" : "right"}>
                <div className="h-full rounded-2xl border border-border bg-card p-8">
                  <div className="flex items-center gap-2">
                    <Heart className="h-5 w-5 text-gold" />
                    <h3 className="font-heading text-xl font-semibold">
                      What we want from you
                    </h3>
                  </div>
                  <StaggerContainer className="mt-6 space-y-4" staggerDelay={0.12}>
                    {group.requirements.map((req) => (
                      <StaggerItem key={req.title}>
                        <div className="flex items-start gap-3 rounded-xl border border-border bg-muted/40 p-5">
                          <CheckCircle2 className="mt-0.5 h-5 w-5 shrink-0 text-gold" />
                          <div>
                            <h4 className="font-heading text-lg font-semibold">
                              {req.title}
                            </h4>
                            <p className="mt-1 text-sm leading-relaxed text-muted-foreground">
                              {req.description}
                            </p>
                          </div>
                        </div>
                      </StaggerItem>
                    ))}
                  </StaggerContainer>
                </div>
              </FadeIn>

              <FadeIn direction={i % 2 === 0 ? "right" : "left"} delay={0.1}>
                <div className="h-full rounded-2xl border border-gold/40 bg-gold/5 p-8">
                  <div className="flex items-center gap-2">
                    <BadgePercent className="h-5 w-5 text-gold" />
                    <h3 className="font-heading text-xl font-semibold">
                      What we offer
                    </h3>
                  </div>
                  <StaggerContainer className="mt-6 space-y-4" staggerDelay={0.12}>
                    {group.offers.map((offer) => (
                      <StaggerItem key={offer.title}>
                        <div className="flex items-start gap-3 rounded-xl border border-border bg-card p-5">
                          <Sparkles className="mt-0.5 h-5 w-5 shrink-0 text-gold" />
                          <div>
                            <h4 className="font-heading text-lg font-semibold">
                              {offer.title}
                            </h4>
                            <p className="mt-1 text-sm leading-relaxed text-muted-foreground">
                              {offer.description}
                            </p>
                          </div>
                        </div>
                      </StaggerItem>
                    ))}
                  </StaggerContainer>
                </div>
              </FadeIn>
            </div>
          </div>
        </section>
      ))}

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
                  Ready to collaborate?
                </h2>
                <p className="mx-auto mt-4 max-w-xl text-white/80">
                  Message us on WhatsApp and we&apos;ll confirm your discount,
                  partnership or commission within 48 hours.
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
