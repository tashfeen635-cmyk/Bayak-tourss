"use client";

import { MapPin, Users, ShieldCheck } from "lucide-react";
import { FadeIn, StaggerContainer, StaggerItem } from "./animations";

const features = [
  {
    icon: MapPin,
    title: "Local Experts",
    description:
      "Born and raised in Pakistan, our guides know every hidden gem, secret viewpoint, and authentic local experience.",
  },
  {
    icon: Users,
    title: "Personalized Trips",
    description:
      "No cookie-cutter itineraries. Every tour is crafted to match your interests, budget, and travel style.",
  },
  {
    icon: ShieldCheck,
    title: "Safe & Comfortable",
    description:
      "Verified accommodations, experienced drivers, and 24/7 support for complete peace of mind.",
  },
];

export function Intro() {
  return (
    <section className="relative pb-32 pt-32 sm:pb-40">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <FadeIn className="mx-auto max-w-3xl text-center">
          <span className="text-sm font-semibold uppercase tracking-wider text-gold">
            Who We Are
          </span>
          <h2 className="mt-3 font-heading text-4xl font-bold tracking-tight sm:text-5xl">
            Your Gateway to Pakistan&apos;s Beauty
          </h2>
          <p className="mt-5 text-lg leading-relaxed text-muted-foreground">
            Bayak Tours is Pakistan&apos;s premier travel company, dedicated to
            showcasing the breathtaking landscapes, rich cultures, and warm
            hospitality that make Pakistan one of the world&apos;s most
            underrated destinations.
          </p>
        </FadeIn>

        <StaggerContainer className="mt-16 grid gap-8 sm:grid-cols-2 lg:grid-cols-3">
          {features.map((f) => (
            <StaggerItem key={f.title}>
              <div className="group relative flex h-full flex-col overflow-hidden rounded-2xl border border-border bg-card p-8 transition-all duration-500 hover:border-gold/30 hover:shadow-xl">
                <div className="absolute -right-10 -top-10 h-32 w-32 rounded-full bg-gold/5 transition-all duration-500 group-hover:scale-150 group-hover:bg-gold/10" />
                <div className="relative z-10">
                  <div className="flex h-14 w-14 items-center justify-center rounded-xl bg-gold/10 text-gold transition-colors group-hover:bg-gold group-hover:text-white">
                    <f.icon className="h-7 w-7" />
                  </div>
                  <h3 className="mt-6 font-heading text-xl font-semibold">
                    {f.title}
                  </h3>
                  <p className="mt-3 text-sm leading-relaxed text-muted-foreground">
                    {f.description}
                  </p>
                </div>
              </div>
            </StaggerItem>
          ))}
        </StaggerContainer>
      </div>
    </section>
  );
}
