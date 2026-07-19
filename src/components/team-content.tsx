"use client";

import Image from "next/image";
import { Globe, Share2, MessageCircle } from "lucide-react";
import { teamMembers } from "@/data";
import { FadeIn, StaggerContainer, StaggerItem } from "./animations";

const socialIcons: Record<string, typeof Globe> = {
  instagram: Globe,
  facebook: Share2,
  twitter: MessageCircle,
};

export function TeamContent() {
  return (
    <>
      <section className="relative flex min-h-[50vh] items-center justify-center overflow-hidden bg-charcoal">
        <div
          className="absolute inset-0 bg-cover bg-center opacity-30"
          style={{
            backgroundImage:
              "url('https://images.unsplash.com/photo-1522202176988-66273c2fd55f?w=1920&q=80')",
          }}
        />
        <div className="relative z-10 px-4 text-center">
          <FadeIn>
            <h1 className="font-heading text-5xl font-bold text-white sm:text-6xl">
              Meet Our Team
            </h1>
            <p className="mx-auto mt-4 max-w-2xl text-white/60">
              The passionate experts behind every unforgettable journey.
            </p>
          </FadeIn>
        </div>
      </section>

      <section className="py-20 sm:py-28">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <StaggerContainer className="grid gap-8 sm:grid-cols-2 lg:grid-cols-4">
            {teamMembers.map((member) => (
              <StaggerItem key={member.name}>
                <div className="group overflow-hidden rounded-2xl border border-border bg-card transition-all duration-300 hover:shadow-xl">
                  <div className="relative aspect-square overflow-hidden">
                    <Image
                      src={member.image}
                      alt={member.name}
                      fill
                      className="object-cover transition-transform duration-500 group-hover:scale-105"
                      sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 25vw"
                    />
                    <div className="absolute inset-0 flex items-center justify-center gap-3 bg-black/60 opacity-0 transition-opacity duration-300 group-hover:opacity-100">
                      {Object.entries(member.social).map(([platform, url]) => {
                        const Icon = socialIcons[platform] || Globe;
                        return (
                          <a
                            key={platform}
                            href={url}
                            className="flex h-10 w-10 items-center justify-center rounded-full bg-white/20 text-white backdrop-blur-sm transition-all hover:bg-gold hover:text-white"
                          >
                            <Icon className="h-4 w-4" />
                          </a>
                        );
                      })}
                    </div>
                  </div>
                  <div className="p-6">
                    <h3 className="font-heading text-lg font-semibold">
                      {member.name}
                    </h3>
                    <p className="mt-1 text-sm font-medium text-gold">
                      {member.role}
                    </p>
                    <p className="mt-3 text-sm leading-relaxed text-muted-foreground">
                      {member.bio}
                    </p>
                  </div>
                </div>
              </StaggerItem>
            ))}
          </StaggerContainer>
        </div>
      </section>
    </>
  );
}
