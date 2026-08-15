"use client";

import Link from "next/link";
import { ArrowUpRight } from "lucide-react";
import { Reveal } from "./Reveal";
import { Contours } from "./Contours";
import { projects } from "./data";

function ProjectCover({
  project,
  large,
}: {
  project: (typeof projects)[number];
  large?: boolean;
}) {
  return (
    <div
      className={`group/cvr relative flex items-center justify-center overflow-hidden rounded-lg border border-[var(--tp-line)] bg-[#0d131c] ${
        large ? "aspect-[4/3] sm:aspect-[21/9]" : "aspect-[4/3] sm:aspect-[16/11]"
      }`}
    >
      <Contours className="absolute inset-0 h-full w-full" />
      <span className="absolute left-3 top-3 z-10 max-w-[calc(100%-2.5rem)] truncate border border-[var(--tp-line-strong)] bg-[#0a0e14]/80 px-2.5 py-1 font-mono text-[10px] uppercase tracking-[0.18em] text-[var(--tp-muted)] sm:left-4 sm:top-4">
        {project.category}
      </span>
      <div className="relative z-10 flex flex-col items-center gap-2.5 px-6 text-center sm:gap-3">
        <span className="tp-mono-label">Project {project.index}</span>
        <span
          className={`font-bold tracking-tight text-[var(--tp-text)] ${
            large ? "text-3xl sm:text-6xl" : "text-2xl sm:text-5xl"
          }`}
        >
          {project.title}
        </span>
        <span className="h-px w-14 bg-[var(--tp-accent)] transition-all duration-500 group-hover/cvr:w-28 sm:w-16" />
        <span className="text-sm text-[var(--tp-muted)]">{project.type}</span>
      </div>
      <span className="absolute bottom-4 right-5 font-mono text-xs tracking-[0.2em] text-[var(--tp-faint)]">
        {project.index}
      </span>
    </div>
  );
}

function ProjectMeta({ project }: { project: (typeof projects)[number] }) {
  const rows: [string, string][] = [
    ["Role", project.meta.role],
    ["Stack", project.meta.stack],
    ["Type", project.meta.type],
    ["Year", project.meta.year],
    ["Services", project.meta.services],
  ];

  return (
    <dl className="border-t border-[var(--tp-line)]">
      {rows.map(([label, value]) => (
        <div
          key={label}
          className="grid grid-cols-[88px_1fr] gap-3 border-b border-[var(--tp-line)] py-2.5 sm:grid-cols-[110px_1fr] sm:gap-4"
        >
          <dt className="tp-mono-label pt-0.5">{label}</dt>
          <dd className="text-sm text-[var(--tp-text)]">{value}</dd>
        </div>
      ))}
    </dl>
  );
}

function ProjectLink({ url, label }: { url: string; label: string }) {
  const inner = (
    <>
      {label}
      <ArrowUpRight className="h-4 w-4" />
    </>
  );

  if (url === "/") {
    return (
      <Link href={url} className="tp-link inline-flex items-center gap-1.5 text-sm font-medium">
        {inner}
      </Link>
    );
  }

  return null;
}

export function Projects() {
  const featured = projects.find((p) => p.featured);
  const rest = projects.filter((p) => !p.featured);

  return (
    <section id="work" className="py-24 sm:py-36">
      <div className="mx-auto max-w-[1180px] px-6 sm:px-8">
        <Reveal>
          <header className="flex flex-col gap-6 border-b border-[var(--tp-line)] pb-8 sm:flex-row sm:items-end sm:justify-between">
            <div>
              <p className="tp-eyebrow">Selected Work</p>
              <h2 className="mt-4 text-4xl font-bold tracking-tight sm:text-5xl">
                Featured projects
              </h2>
            </div>
            <p className="max-w-sm text-sm leading-relaxed text-[var(--tp-muted)]">
              A selection of work across tourism, corporate, and digital platforms.
            </p>
          </header>
        </Reveal>

        {rest.map((project, i) => {
          const flip = i % 2 === 1;
          return (
            <article
              key={project.index}
              className="grid gap-10 border-b border-[var(--tp-line)] py-16 sm:py-20 lg:grid-cols-12 lg:gap-14"
            >
              <Reveal
                className={`lg:col-span-7 ${flip ? "lg:order-2" : ""}`}
              >
                <ProjectCover project={project} />
              </Reveal>

              <Reveal
                delay={0.1}
                className={`flex flex-col justify-center lg:col-span-5 ${flip ? "lg:order-1" : ""}`}
              >
                <p className="tp-mono-label">Project {project.index}</p>
                <h3 className="mt-3 text-3xl font-bold tracking-tight sm:text-4xl">
                  {project.title}
                </h3>
                <p className="mt-1.5 text-sm font-medium text-[var(--tp-accent)]">
                  {project.type}
                </p>
                <p className="mt-5 text-base leading-relaxed text-[var(--tp-muted)]">
                  {project.summary}
                </p>

                <ul className="mt-6 grid gap-x-6 gap-y-2 sm:grid-cols-2">
                  {project.details.map((detail) => (
                    <li
                      key={detail}
                      className="flex items-start gap-2 text-sm text-[var(--tp-text)]"
                    >
                      <span className="mt-2 h-px w-3 shrink-0 bg-[var(--tp-accent)]" />
                      {detail}
                    </li>
                  ))}
                </ul>

                <div className="mt-8">
                  <ProjectMeta project={project} />
                </div>

                <div className="mt-6">
                  {project.url !== "#" && (
                    <ProjectLink url={project.url} label="View Case Study" />
                  )}
                </div>
              </Reveal>
            </article>
          );
        })}

        {featured && (
          <article key={featured.index} className="py-16 sm:py-20">
            <Reveal>
              <div className="flex flex-wrap items-end justify-between gap-4">
                <div>
                  <p className="tp-eyebrow">Flagship Project — {featured.index}</p>
                  <h3 className="mt-4 text-3xl font-bold tracking-tight sm:text-6xl">
                    {featured.title}
                  </h3>
                  <p className="mt-2 text-base font-medium text-[var(--tp-accent)]">
                    {featured.type}
                  </p>
                </div>
                <p className="tp-mono-label">{featured.meta.year}</p>
              </div>
            </Reveal>

            <Reveal delay={0.1} className="mt-8">
              <ProjectCover project={featured} large />
            </Reveal>

            <div className="mt-10 grid gap-10 lg:grid-cols-12 lg:gap-14">
              <Reveal className="lg:col-span-5">
                <p className="max-w-md text-base leading-relaxed text-[var(--tp-muted)]">
                  {featured.summary}
                </p>
                <ul className="mt-6 grid gap-x-6 gap-y-2 sm:grid-cols-2">
                  {featured.details.map((detail) => (
                    <li
                      key={detail}
                      className="flex items-start gap-2 text-sm text-[var(--tp-text)]"
                    >
                      <span className="mt-2 h-px w-3 shrink-0 bg-[var(--tp-accent)]" />
                      {detail}
                    </li>
                  ))}
                </ul>
                <div className="mt-8">
                  <ProjectLink url={featured.url} label="View the Platform" />
                </div>
              </Reveal>
              <Reveal delay={0.1} className="lg:col-span-7">
                <ProjectMeta project={featured} />
              </Reveal>
            </div>
          </article>
        )}
      </div>
    </section>
  );
}
