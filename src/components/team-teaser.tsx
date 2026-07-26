"use client";

import Image from "next/image";
import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { X, Globe, Briefcase, Languages } from "lucide-react";
import { FadeIn, StaggerContainer, StaggerItem } from "./animations";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { TeamMember } from "@/types";

function toArr(v: unknown): string[] {
  if (Array.isArray(v)) return v;
  if (typeof v === "string" && v) return v.split(",").map((s) => s.trim()).filter(Boolean);
  return [];
}

function normalizeMember(m: TeamMember): TeamMember {
  return { ...m, languages: toArr(m.languages) };
}

export function TeamTeaser() {
  const [teamMembers, setTeamMembers] = useState<TeamMember[]>([]);
  const [selected, setSelected] = useState<number | null>(null);

  useEffect(() => {
    fetch("/api/team")
      .then((r) => r.json())
      .then((data) => {
        if (Array.isArray(data)) setTeamMembers(data.map(normalizeMember));
        else if (data && Array.isArray(data.team)) setTeamMembers(data.team.map(normalizeMember));
        else setTeamMembers([]);
      })
      .catch(() => setTeamMembers([]));
  }, []);

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
          {teamMembers.map((member, i) => (
            <StaggerItem key={member.name}>
              <div
                onClick={() => setSelected(i)}
                className="group cursor-pointer overflow-hidden rounded-2xl border border-border bg-card transition-all duration-300 hover:shadow-xl"
              >
                <div className="relative aspect-square overflow-hidden">
                  <Image
                    src={member.image}
                    alt={member.name}
                    fill
                    className="object-cover transition-transform duration-500 group-hover:scale-105"
                    sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 25vw"
                  />
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

      <AnimatePresence>
        {selected !== null && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-50 flex items-center justify-center bg-black/90 p-4"
            onClick={() => setSelected(null)}
          >
            <button
              className="absolute right-4 top-4 text-white/70 transition-colors hover:text-white"
              onClick={() => setSelected(null)}
            >
              <X className="h-8 w-8" />
            </button>

            <motion.div
              initial={{ scale: 0.9, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.9, opacity: 0 }}
              onClick={(e) => e.stopPropagation()}
              className="relative w-full max-w-2xl overflow-hidden rounded-2xl bg-card shadow-2xl"
            >
              <div className="relative h-64 sm:h-72">
                <Image
                  src={teamMembers[selected].image}
                  alt={teamMembers[selected].name}
                  fill
                  className="object-contain"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-card via-card/20 to-transparent" />
              </div>

              <div className="relative -mt-20 px-6 pb-6 sm:px-8">
                <h3 className="font-heading text-2xl font-bold">
                  {teamMembers[selected].name}
                </h3>
                <p className="mt-1 text-sm font-medium text-gold">
                  {teamMembers[selected].role}
                </p>
                <p className="mt-4 text-sm leading-relaxed text-muted-foreground">
                  {teamMembers[selected].bio}
                </p>

                <div className="mt-6 grid gap-4 sm:grid-cols-2">
                  <div className="flex items-center gap-3 rounded-xl bg-muted/50 p-3">
                    <Briefcase className="h-5 w-5 shrink-0 text-gold" />
                    <div>
                      <p className="text-xs text-muted-foreground">Experience</p>
                      <p className="text-sm font-medium">{teamMembers[selected].experience}</p>
                    </div>
                  </div>
                  <div className="flex items-center gap-3 rounded-xl bg-muted/50 p-3">
                    <Globe className="h-5 w-5 shrink-0 text-gold" />
                    <div>
                      <p className="text-xs text-muted-foreground">Specialization</p>
                      <p className="text-sm font-medium">{teamMembers[selected].specialization}</p>
                    </div>
                  </div>
                  <div className="flex items-center gap-3 rounded-xl bg-muted/50 p-3">
                    <Languages className="h-5 w-5 shrink-0 text-gold" />
                    <div>
                      <p className="text-xs text-muted-foreground">Languages</p>
                      <p className="text-sm font-medium">{teamMembers[selected].languages.join(", ")}</p>
                    </div>
                  </div>
                </div>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </section>
  );
}
