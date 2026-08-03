"use client";

import Image from "next/image";
import { useState, useEffect } from "react";
import { buildImageUrl } from "@/lib/image";
import { motion, AnimatePresence } from "framer-motion";
import { X, Globe, Briefcase, Languages } from "lucide-react";
import { FadeIn, StaggerContainer, StaggerItem } from "./animations";
import { TeamMember } from "@/types";
import { sortMembers } from "@/lib/team";

function toArr(v: unknown): string[] {
  if (Array.isArray(v)) return v;
  if (typeof v === "string" && v) return v.split(",").map((s) => s.trim()).filter(Boolean);
  return [];
}

function normalizeMember(m: TeamMember): TeamMember {
  return { ...m, languages: toArr(m.languages) };
}

export function TeamContent({ team: data }: { team?: TeamMember[] }) {
  const [teamMembers, setTeamMembers] = useState<TeamMember[]>(() =>
    data ? sortMembers(data.map(normalizeMember)) : []
  );
  const [selected, setSelected] = useState<number | null>(null);

  useEffect(() => {
    if (data) return;
    fetch("/api/team")
      .then((r) => r.json())
      .then((data) => {
        if (Array.isArray(data)) setTeamMembers(sortMembers(data.map(normalizeMember)));
        else if (data && Array.isArray(data.team)) setTeamMembers(sortMembers(data.team.map(normalizeMember)));
        else setTeamMembers([]);
      })
      .catch(() => setTeamMembers([]));
  }, []);

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
          {teamMembers.length > 0 && (
            <StaggerContainer key="team-content-grid" className="grid gap-8 sm:grid-cols-2 lg:grid-cols-4">
              {teamMembers.map((member, i) => (
                <StaggerItem key={member.name}>
                  <div
                    onClick={() => setSelected(i)}
                    className="group cursor-pointer overflow-hidden rounded-2xl border border-border bg-card transition-all duration-300 hover:shadow-xl flex flex-col"
                  >
                    <div className="relative aspect-square overflow-hidden">
                      <Image
                        src={buildImageUrl(member.image, 400)}
                        alt={member.name}
                        fill
                        className="object-cover transition-transform duration-500 group-hover:scale-105"
                        sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 25vw"
                      />
                    </div>
                    <div className="flex flex-1 flex-col p-6">
                      <h3 className="font-heading text-lg font-semibold">
                        {member.name}
                      </h3>
                      <p className="mt-1 text-sm font-medium text-gold">
                        {member.role}
                      </p>
                      <p className="mt-3 text-sm leading-relaxed text-muted-foreground line-clamp-4">
                        {member.bio}
                      </p>
                      <div className="mt-auto pt-4">
                        <button
                          onClick={() => setSelected(i)}
                          className="inline-flex items-center gap-1.5 rounded-full border border-gold/30 px-4 py-1.5 text-xs font-medium text-gold transition-colors hover:bg-gold hover:text-white"
                        >
                          More Details
                        </button>
                      </div>
                    </div>
                  </div>
                </StaggerItem>
              ))}
            </StaggerContainer>
          )}
        </div>
      </section>

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
              className="absolute right-4 top-4 z-10 flex h-10 w-10 items-center justify-center rounded-full bg-black/70 text-white/90 transition-all duration-200 hover:scale-110 hover:bg-black hover:text-white"
              onClick={() => setSelected(null)}
            >
              <X className="h-5 w-5" />
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
                  src={buildImageUrl(teamMembers[selected].image, 600)}
                  alt={teamMembers[selected].name}
                  fill
                  className="object-contain"
                />
              </div>

              <div className="px-6 pb-6 sm:px-8 pt-5">
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
    </>
  );
}
