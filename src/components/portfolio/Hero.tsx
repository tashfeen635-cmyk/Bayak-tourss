"use client";

import Image from "next/image";
import { ArrowUpRight, ArrowDown } from "lucide-react";
import { Reveal } from "./Reveal";
import { Contours } from "./Contours";
import { profile } from "./data";

export function Hero() {
  return (
    <section className="relative overflow-hidden">
      <Contours className="absolute -right-40 top-0 hidden h-[420px] w-[720px] lg:block" />

      <div className="relative mx-auto grid max-w-[1180px] gap-16 px-6 pb-20 pt-32 sm:px-8 sm:pt-40 lg:grid-cols-12 lg:gap-10 lg:pb-28">
        <div className="lg:col-span-7">
          <Reveal>
            <p className="tp-eyebrow">{profile.location}</p>
          </Reveal>

          <Reveal delay={0.08}>
            <h1 className="mt-6 text-[2.6rem] font-bold leading-[1.06] tracking-tight sm:text-6xl lg:text-[4.25rem]">
              Building digital experiences from{" "}
              <span className="tp-accent">Gilgit-Baltistan</span> to the world.
            </h1>
          </Reveal>

          <Reveal delay={0.16}>
            <p className="mt-6 font-mono text-sm font-medium tracking-wide text-[var(--tp-muted)] sm:text-base">
              {profile.role}
            </p>
          </Reveal>

          <Reveal delay={0.24}>
            <p className="mt-6 max-w-xl text-base leading-relaxed text-[var(--tp-muted)] sm:text-lg">
              {profile.intro}
            </p>
          </Reveal>

          <Reveal delay={0.32}>
            <div className="mt-10 flex flex-wrap items-center gap-4">
              <a href="#work" className="tp-btn tp-btn-primary">
                View Selected Work
                <ArrowDown className="h-4 w-4" />
              </a>
              <a href="#contact" className="tp-btn tp-btn-ghost">
                Let&apos;s Work Together
                <ArrowUpRight className="h-4 w-4" />
              </a>
            </div>
          </Reveal>

          <Reveal delay={0.4}>
            <div className="mt-14 flex flex-wrap items-center gap-x-10 gap-y-3 border-t border-[var(--tp-line)] pt-6">
              <p className="text-sm text-[var(--tp-faint)]">
                <span className="mr-2 inline-block h-1.5 w-1.5 rounded-full bg-[var(--tp-accent)]" />
                {profile.current}
              </p>
              <p className="text-sm text-[var(--tp-faint)]">
                Status — <span className="text-[var(--tp-text)]">{profile.availability}</span>
              </p>
            </div>
          </Reveal>
        </div>

        <Reveal delay={0.2} className="lg:col-span-5">
          <figure className="relative mx-auto max-w-md lg:mx-0 lg:max-w-none">
            <div className="relative">
              <div className="absolute -left-5 -top-5 h-full w-full rounded-lg border border-[var(--tp-accent)]/25" />
              <div className="relative aspect-[4/5] overflow-hidden rounded-lg border border-[var(--tp-line)] bg-[#0d131c]">
                <Image
                  src={profile.portrait}
                  alt={`Portrait of ${profile.name}, ${profile.role.toLowerCase()}, based in ${profile.location}`}
                  fill
                  priority
                  sizes="(max-width: 1024px) 100vw, 40vw"
                  className="object-cover"
                />
              </div>
              <figcaption className="absolute -bottom-7 left-6 flex flex-col gap-1 border border-[var(--tp-line-strong)] bg-[#0d131c] px-5 py-4">
                <span className="text-sm font-semibold text-[var(--tp-text)]">
                  {profile.name}
                </span>
                <span className="tp-mono-label">{profile.location}</span>
              </figcaption>
            </div>
          </figure>
        </Reveal>
      </div>
    </section>
  );
}
