import { ArrowUpRight } from "lucide-react";
import { Reveal } from "./Reveal";
import { categories } from "./data";

export function Services() {
  return (
    <section id="services" className="border-t border-[var(--tp-line)] py-24 sm:py-36">
      <div className="mx-auto max-w-[1180px] px-6 sm:px-8">
        <Reveal>
          <header className="flex flex-col gap-6 border-b border-[var(--tp-line)] pb-8 sm:flex-row sm:items-end sm:justify-between">
            <div>
              <p className="tp-eyebrow">What I Build</p>
              <h2 className="mt-4 text-4xl font-bold tracking-tight sm:text-5xl">
                Digital solutions, built for the real world.
              </h2>
            </div>
            <p className="max-w-sm text-sm leading-relaxed text-[var(--tp-muted)]">
              Every category below is a discipline I can take from concept to
              production — designed, developed, and deployed.
            </p>
          </header>
        </Reveal>

        <ul className="grid sm:grid-cols-2">
          {categories.map((category, i) => (
            <li
              key={category.label}
              className={`border-b border-[var(--tp-line)] ${
                i % 2 === 1 ? "sm:border-l" : ""
              }`}
            >
              <Reveal delay={(i % 2) * 0.08} className="h-full">
                <div className="group relative flex h-full flex-col gap-3 p-6 transition-colors duration-200 hover:bg-[var(--tp-accent-dim)] sm:p-8">
                  <div className="flex items-start justify-between gap-4">
                    <span className="tp-mono-label">0{i + 1}</span>
                    <ArrowUpRight className="h-4 w-4 text-[var(--tp-faint)] transition-all duration-200 group-hover:text-[var(--tp-accent)] group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
                  </div>
                  <h3 className="pt-4 text-xl font-bold leading-snug tracking-tight text-[var(--tp-text)] sm:text-2xl">
                    {category.label}
                  </h3>
                  <p className="text-sm leading-relaxed text-[var(--tp-muted)]">
                    {category.note}
                  </p>
                </div>
              </Reveal>
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
}
