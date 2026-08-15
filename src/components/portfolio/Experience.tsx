"use client";

import { Reveal } from "./Reveal";
import { experience } from "./data";

export function Experience() {
  return (
    <section id="experience" className="border-t border-[var(--tp-line)] py-24 sm:py-36">
      <div className="mx-auto max-w-[1180px] px-6 sm:px-8">
        <Reveal>
          <header className="flex flex-col gap-6 border-b border-[var(--tp-line)] pb-8 sm:flex-row sm:items-end sm:justify-between">
            <div>
              <p className="tp-eyebrow">Experience</p>
              <h2 className="mt-4 text-4xl font-bold tracking-tight sm:text-5xl">
                Professional experience
              </h2>
            </div>
            <p className="max-w-sm text-sm leading-relaxed text-[var(--tp-muted)]">
              Real product work, shipped and maintained — not just coursework.
            </p>
          </header>
        </Reveal>

        <Reveal delay={0.1} className="mt-4">
          <ul className="border-t border-[var(--tp-line)]">
            {experience.map((item) => (
              <li
                key={item.role}
                className="grid gap-2 border-b border-[var(--tp-line)] py-8 sm:grid-cols-12 sm:gap-6 sm:py-9 sm:px-3"
              >
                <p className="tp-mono-label sm:col-span-3 pt-1">{item.period}</p>
                <div className="sm:col-span-9">
                  <h3 className="text-lg font-semibold tracking-tight text-[var(--tp-text)]">
                    {item.role}
                  </h3>
                  <p className="mt-0.5 text-sm font-medium text-[var(--tp-accent)]">
                    {item.company}
                  </p>
                  <p className="mt-3 text-sm leading-relaxed text-[var(--tp-muted)]">
                    {item.summary}
                  </p>
                </div>
              </li>
            ))}
          </ul>
        </Reveal>
      </div>
    </section>
  );
}
