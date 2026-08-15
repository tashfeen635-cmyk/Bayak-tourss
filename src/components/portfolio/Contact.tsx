"use client";

import { ArrowUpRight, ArrowDown } from "lucide-react";
import { Reveal } from "./Reveal";
import { Contours } from "./Contours";
import { profile } from "./data";

export function Contact() {
  return (
    <section id="contact" className="relative overflow-hidden border-t border-[var(--tp-line)] py-24 sm:py-36">
      <Contours className="absolute -left-40 bottom-0 h-[420px] w-[720px]" />

      <div className="relative mx-auto max-w-[1180px] px-6 sm:px-8">
        <Reveal>
          <p className="tp-eyebrow">Contact</p>
          <h2 className="mt-6 max-w-4xl text-4xl font-bold leading-[1.08] tracking-tight sm:text-6xl lg:text-7xl">
            Have an idea worth building?
            <br />
            Let&apos;s turn it into{" "}
            <span className="tp-accent">something real.</span>
          </h2>
        </Reveal>

        <div className="mt-12 flex flex-col gap-10 lg:flex-row lg:items-start lg:justify-between">
          <Reveal delay={0.1}>
            <p className="max-w-md text-base leading-relaxed text-[var(--tp-muted)]">
              I&apos;m currently available for freelance projects and collaborations.
              Tell me what you&apos;re building — I&apos;ll get back to you within a
              day or two.
            </p>

            <div className="mt-8 flex flex-wrap items-center gap-4">
              <a href={`mailto:${profile.email}`} className="tp-btn tp-btn-primary">
                Email Me
                <ArrowUpRight className="h-4 w-4" />
              </a>
              <a
                href={profile.whatsapp}
                target="_blank"
                rel="noopener noreferrer"
                className="tp-btn tp-btn-ghost"
              >
                WhatsApp
                <ArrowDown className="h-4 w-4" />
              </a>
            </div>
          </Reveal>

          <Reveal delay={0.15} className="w-full max-w-xl">
            <ul className="border-t border-[var(--tp-line)]">
              <li>
                <a
                  href={`mailto:${profile.email}`}
                  className="group flex items-center justify-between gap-4 border-b border-[var(--tp-line)] py-5 transition-colors duration-200 hover:bg-[var(--tp-accent-dim)] sm:px-3"
                >
                  <span className="tp-mono-label transition-colors duration-200 group-hover:text-[var(--tp-accent)]">
                    Email
                  </span>
                  <span className="flex items-center gap-2 text-sm text-[var(--tp-text)]">
                    {profile.email}
                    <ArrowUpRight className="h-4 w-4 text-[var(--tp-faint)] transition-colors group-hover:text-[var(--tp-accent)]" />
                  </span>
                </a>
              </li>
              {profile.socials
                .filter((s) => s.label !== "Email")
                .map((social) => (
                  <li key={social.label}>
                    <a
                      href={social.href}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="group flex items-center justify-between gap-4 border-b border-[var(--tp-line)] py-5 transition-colors duration-200 hover:bg-[var(--tp-accent-dim)] sm:px-3"
                    >
                      <span className="tp-mono-label transition-colors duration-200 group-hover:text-[var(--tp-accent)]">
                        {social.label}
                      </span>
                      <span className="flex items-center gap-2 text-sm text-[var(--tp-text)]">
                        {social.handle}
                        <ArrowUpRight className="h-4 w-4 text-[var(--tp-faint)] transition-colors group-hover:text-[var(--tp-accent)]" />
                      </span>
                    </a>
                  </li>
                ))}
            </ul>

            <p className="mt-6 text-sm text-[var(--tp-faint)]">
              Based in {profile.location}. Working with clients worldwide.
            </p>
          </Reveal>
        </div>
      </div>
    </section>
  );
}
