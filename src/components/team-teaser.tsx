"use client";

import Image from "next/image";
import { Globe, Share2, MessageCircle } from "lucide-react";
import { teamMembers } from "@/data";
import { FadeIn, StaggerContainer, StaggerItem } from "./animations";
import Link from "next/link";
import { Button } from "@/components/ui/button";

const socialIcons: Record<string, typeof Globe> = {
  instagram: Globe,
  facebook: Share2,
  twitter: MessageCircle,
};

export function TeamTeaser() {
  return (
    <section className="py-24 sm:py-32">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <FadeIn className="text-center">
          <span className="text-sm font-semibold uppercase tracking-wider text-gold">
            Our Team
          </span>
          <h2 className="mt-3 font-heading text-4xl font-bold tracking-tight sm:text-5xl">
            Meet the Experts
          </h2>
          <p className="mx-auto mt-4 max-w-2xl text-muted-foreground">
            Passionate travelers and local experts who make every journey extraordinary.
          </p>
        </FadeIn>

        <StaggerContainer className="mt-16 grid gap-8 sm:grid-cols-2 lg:grid-cols-4">
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

        <FadeIn className="mt-12 text-center">
          <Link href="/team">
            <Button
              size="lg"
              variant="outline"
              className="rounded-full border-gold/30 px-8 text-gold hover:bg-gold hover:text-white"
            >
              Meet Our Team
            </Button>
          </Link>
        </FadeIn>
      </div>
    </section>
  );
}
