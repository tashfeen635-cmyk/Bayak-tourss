"use client";

import Image from "next/image";
import { useState, useEffect, useRef } from "react";
import { buildImageUrl } from "@/lib/image";
import { motion, AnimatePresence } from "framer-motion";
import { X, Globe, Briefcase, Languages, ChevronLeft, ChevronRight } from "lucide-react";
import { FadeIn } from "./animations";
import Link from "next/link";
import { Button } from "@/components/ui/button";
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

function MemberCard({
  member,
  index,
  onSelect,
}: {
  member: TeamMember;
  index: number;
  onSelect: (i: number) => void;
}) {
  return (
    <div
      onClick={() => onSelect(index)}
      className="group flex h-full w-[280px] cursor-pointer flex-col overflow-hidden rounded-2xl border border-border bg-card transition-all duration-300 hover:shadow-xl sm:w-[320px]"
    >
      <div className="relative aspect-square overflow-hidden">
        {member.image ? (
          <Image
            src={buildImageUrl(member.image, 800)}
            alt={member.name}
            fill
            className="object-cover transition-transform duration-500 group-hover:scale-105"
            sizes="(max-width: 640px) 100vw, 320px"
          />
        ) : (
          <div className="flex h-full w-full items-center justify-center bg-muted/50">
            <span className="font-heading text-6xl font-bold text-gold/40">
              {member.name.charAt(0)}
            </span>
          </div>
        )}
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
            onClick={() => onSelect(index)}
            className="inline-flex items-center gap-1.5 rounded-full border border-gold/30 px-4 py-1.5 text-xs font-medium text-gold transition-colors hover:bg-gold hover:text-white"
          >
            More Details
          </button>
        </div>
      </div>
    </div>
  );
}

export function TeamTeaser({ team: data }: { team?: TeamMember[] }) {
  const [teamMembers, setTeamMembers] = useState<TeamMember[]>(() =>
    data ? sortMembers(data.map(normalizeMember)) : []
  );
  const [selected, setSelected] = useState<number | null>(null);
  const [canScrollLeft, setCanScrollLeft] = useState(false);
  const [canScrollRight, setCanScrollRight] = useState(false);
  const scrollRef = useRef<HTMLUListElement>(null);

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
  }, [data]);

  const updateScrollState = () => {
    const el = scrollRef.current;
    if (!el) return;
    setCanScrollLeft(el.scrollLeft > 4);
    setCanScrollRight(el.scrollLeft + el.clientWidth < el.scrollWidth - 4);
  };

  useEffect(() => {
    const el = scrollRef.current;
    if (!el) return;
    updateScrollState();
    el.addEventListener("scroll", updateScrollState, { passive: true });
    window.addEventListener("resize", updateScrollState);
    return () => {
      el.removeEventListener("scroll", updateScrollState);
      window.removeEventListener("resize", updateScrollState);
    };
  }, [teamMembers]);

  const scrollByCards = (dir: -1 | 1) => {
    const el = scrollRef.current;
    if (!el) return;
    const cardWidth = el.querySelector("li")?.clientWidth ?? 320;
    el.scrollBy({ left: dir * (cardWidth + 32), behavior: "smooth" });
  };

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

        {teamMembers.length > 0 && (
          <div className="mt-16">
            <div className="relative">
              <ul
                ref={scrollRef}
                className="scrollbar-none flex snap-x snap-mandatory gap-8 overflow-x-auto"
              >
                {teamMembers.map((member, i) => (
                  <li key={member.name} className="flex shrink-0 snap-start">
                    <MemberCard member={member} index={i} onSelect={setSelected} />
                  </li>
                ))}
              </ul>

              <button
                onClick={() => scrollByCards(-1)}
                disabled={!canScrollLeft}
                aria-label="Scroll team left"
                className="absolute -left-4 top-1/2 flex h-10 w-10 -translate-y-1/2 items-center justify-center rounded-full border border-gold/30 bg-card text-gold shadow-lg transition-all duration-200 hover:bg-gold hover:text-white disabled:pointer-events-none disabled:opacity-30 sm:-left-5"
              >
                <ChevronLeft className="h-5 w-5" />
              </button>
              <button
                onClick={() => scrollByCards(1)}
                disabled={!canScrollRight}
                aria-label="Scroll team right"
                className="absolute -right-4 top-1/2 flex h-10 w-10 -translate-y-1/2 items-center justify-center rounded-full border border-gold/30 bg-card text-gold shadow-lg transition-all duration-200 hover:bg-gold hover:text-white disabled:pointer-events-none disabled:opacity-30 sm:-right-5"
              >
                <ChevronRight className="h-5 w-5" />
              </button>
            </div>
          </div>
        )}

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
                {teamMembers[selected].image ? (
                  <Image
                    src={buildImageUrl(teamMembers[selected].image, 600)}
                    alt={teamMembers[selected].name}
                    fill
                    className="object-contain"
                  />
                ) : (
                  <div className="flex h-full w-full items-center justify-center bg-muted/50">
                    <span className="font-heading text-7xl font-bold text-gold/40">
                      {teamMembers[selected].name.charAt(0)}
                    </span>
                  </div>
                )}
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
    </section>
  );
}
