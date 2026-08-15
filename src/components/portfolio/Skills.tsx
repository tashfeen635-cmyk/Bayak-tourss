"use client";

import { Reveal } from "./Reveal";
import { skills } from "./data";

export function Skills() {
  return (
    <section id="skills" className="border-t border-[var(--tp-line)] py-24 sm:py-36">
      <div className="mx-auto max-w-[1180px] px-6 sm:px-8">
        <Reveal>
          <header className="flex flex-col gap-6 border-b border-[var(--tp-line)] pb-8 sm:flex-row sm:items-end sm:justify-between">
            <div>
              <p className="tp-eyebrow">Technology</p>
              <h2 className="mt-4 text-4xl font-bold tracking-tight sm:text-5xl">
                Skills &amp; stack
              </h2>
            </div>
            <p className="max-w-sm text-sm leading-relaxed text-[var(--tp-muted)]">
              The tools I use across the full stack — from interface to
              infrastructure.
            </p>
          </header>
        </Reveal>

        <Reveal delay={0.1} className="mt-4">
          <ul className="border-t border-[var(--tp-line)]">
            {skills.map((group) => (
              <li
                key={group.label}
                className="group grid gap-2 border-b border-[var(--tp-line)] py-6 transition-colors duration-200 hover:bg-[var(--tp-accent-dim)] sm:grid-cols-12 sm:gap-6 sm:py-7 sm:px-3"
              >
                <h3 className="tp-mono-label sm:col-span-3 transition-colors duration-200 group-hover:text-[var(--tp-accent)]">
                  {group.label}
                </h3>
                <ul className="flex flex-wrap gap-x-6 gap-y-2 sm:col-span-9">
                  {group.items.map((item) => (
                    <li key={item}>
                      <span className="text-sm text-[var(--tp-text)]">{item}</span>
                    </li>
                  ))}
                </ul>
              </li>
            ))}
          </ul>
        </Reveal>
      </div>
    </section>
  );
}
