"use client";

import Image from "next/image";
import { Check } from "lucide-react";
import { FadeIn, StaggerContainer, StaggerItem } from "./animations";
import { whyChooseUs } from "@/data";

export function WhyChooseUs() {
  return (
    <section className="bg-sand py-24 dark:bg-charcoal/50 sm:py-32">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="grid items-center gap-12 lg:grid-cols-2 lg:gap-20">
          <FadeIn direction="left">
            <div className="relative">
              <div className="relative overflow-hidden rounded-2xl shadow-2xl">
                <Image
                  src="/images/hunza.jpg"
                  alt="Pakistan mountain landscape"
                  width={800}
                  height={600}
                  className="h-auto w-full object-cover"
                />
              </div>
              <div className="absolute -bottom-6 -right-6 rounded-2xl bg-gold p-6 text-white shadow-xl sm:-bottom-8 sm:-right-8">
                <div className="font-heading text-3xl font-bold">5+</div>
                <div className="text-sm text-white/80">Years of Excellence</div>
              </div>
            </div>
          </FadeIn>

          <div>
            <FadeIn direction="right">
              <span className="text-sm font-semibold uppercase tracking-wider text-gold">
                Why Choose Us
              </span>
              <h2 className="mt-3 font-heading text-3xl font-bold tracking-tight sm:text-4xl">
                Travel With Confidence &amp; Comfort
              </h2>
              <p className="mt-4 text-muted-foreground">
                We combine local expertise with world-class service to deliver
                trips that exceed expectations every single time.
              </p>
            </FadeIn>

            <StaggerContainer className="mt-8 grid gap-4 sm:grid-cols-2">
              {whyChooseUs.map((item) => (
                <StaggerItem key={item.label}>
                  <div className="group flex gap-3 rounded-xl p-3 transition-colors hover:bg-gold/5">
                    <div className="flex h-8 w-8 shrink-0 items-center justify-center rounded-full bg-gold/10 text-gold transition-colors group-hover:bg-gold group-hover:text-white">
                      <Check className="h-4 w-4" />
                    </div>
                    <div>
                      <div className="text-sm font-semibold">{item.label}</div>
                      <div className="mt-0.5 text-xs leading-relaxed text-muted-foreground">
                        {item.description}
                      </div>
                    </div>
                  </div>
                </StaggerItem>
              ))}
            </StaggerContainer>
          </div>
        </div>
      </div>
    </section>
  );
}
