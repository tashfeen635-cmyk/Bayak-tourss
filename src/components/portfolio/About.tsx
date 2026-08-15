"use client";

import { Reveal } from "./Reveal";
import { capabilities } from "./data";

export function About() {
  return (
    <section id="about" className="border-t border-[var(--tp-line)] py-24 sm:py-36">
      <div className="mx-auto max-w-[1180px] px-6 sm:px-8">
        <div className="grid gap-10 lg:grid-cols-12">
          <Reveal className="lg:col-span-4">
            <p className="tp-eyebrow">About</p>
            <h2 className="mt-4 text-3xl font-bold leading-tight tracking-tight sm:text-4xl">
              A developer from the mountains, building for the world.
            </h2>
          </Reveal>

          <Reveal delay={0.1} className="lg:col-span-7 lg:col-start-6">
            <p className="text-lg leading-relaxed text-[var(--tp-text)]">
              I&apos;m Tashfeen Bin Riaz — a Full-Stack Web Developer and
              Shopify Developer from Gilgit-Baltistan, Pakistan. I specialize in
              modern websites, web applications, e-commerce platforms, and custom
              digital solutions, working with React, Next.js, Node.js, Laravel,
              MongoDB, PostgreSQL, and Shopify.
            </p>
            <p className="mt-6 text-base leading-relaxed text-[var(--tp-muted)]">
              My work includes corporate websites, tourism platforms, e-commerce
              stores, LMS and education systems, POS solutions, dashboards, and
              custom web applications — built with a strong understanding of
              design, SEO, performance, and real-world business requirements.
            </p>
            <p className="mt-6 text-base leading-relaxed text-[var(--tp-muted)]">
              Whether you need a Shopify storefront, a custom web application, or a
              complete digital platform, I take projects from first sketch to
              production — and stay for what comes after.
            </p>
          </Reveal>
        </div>

        <Reveal delay={0.1} className="mt-20">
          <p className="tp-mono-label">Capabilities</p>
          <ul className="mt-4 grid border-t border-[var(--tp-line)] sm:grid-cols-2 lg:grid-cols-3">
            {capabilities.map((cap) => (
              <li
                key={cap.label}
                className="flex flex-col gap-1 border-b border-[var(--tp-line)] py-5 pr-6"
              >
                <span className="text-sm font-semibold text-[var(--tp-text)]">
                  {cap.label}
                </span>
                <span className="text-sm text-[var(--tp-muted)]">{cap.note}</span>
              </li>
            ))}
          </ul>
        </Reveal>
      </div>
    </section>
  );
}
