"use client";

import { useEffect, useState } from "react";
import { AnimatePresence, motion, useReducedMotion } from "framer-motion";
import { ArrowUpRight, Menu, X } from "lucide-react";

const links = [
  { label: "Services", href: "#services" },
  { label: "Work", href: "#work" },
  { label: "About", href: "#about" },
  { label: "Skills", href: "#skills" },
  { label: "Experience", href: "#experience" },
  { label: "Contact", href: "#contact" },
];

export function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);
  const reduce = useReducedMotion();

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 16);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") setOpen(false);
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, []);

  return (
    <header
      className={`fixed inset-x-0 top-0 z-50 transition-all duration-300 ${
        scrolled || open
          ? "border-b border-[var(--tp-line)] bg-[#0a0e14]/85 backdrop-blur-md"
          : "border-b border-transparent bg-transparent"
      }`}
    >
      <a
        href="#main"
        className="sr-only focus:not-sr-only focus:absolute focus:left-4 focus:top-4 focus:z-50 focus:bg-[var(--tp-accent)] focus:px-4 focus:py-2 focus:text-[var(--tp-on-accent)]"
      >
        Skip to content
      </a>

      <nav
        aria-label="Primary"
        className="mx-auto flex max-w-[1180px] items-center justify-between px-6 py-4 sm:px-8"
      >
        <a href="#main" className="group flex items-baseline gap-2">
          <span className="text-base font-bold tracking-tight text-[var(--tp-text)]">
            Tashfeen Bin Riaz
          </span>
          <span className="text-[var(--tp-accent)]">.</span>
        </a>

        <ul className="hidden items-center gap-8 md:flex">
          {links.map((link) => (
            <li key={link.href}>
              <a
                href={link.href}
                className="text-sm font-medium text-[var(--tp-muted)] transition-colors hover:text-[var(--tp-text)]"
              >
                {link.label}
              </a>
            </li>
          ))}
        </ul>

        <div className="hidden items-center gap-6 lg:flex">
          <a
            href="/"
            className="flex items-center gap-1 text-sm font-medium text-[var(--tp-muted)] transition-colors hover:text-[var(--tp-accent)]"
          >
            Terra Pakistan
            <ArrowUpRight className="h-4 w-4" />
          </a>
          <a
            href="#contact"
            className="tp-btn tp-btn-primary"
            style={{ padding: "0.7rem 1.25rem" }}
          >
            Let&apos;s Work Together
            <ArrowUpRight className="h-4 w-4" />
          </a>
        </div>

        <button
          onClick={() => setOpen((v) => !v)}
          aria-expanded={open}
          aria-controls="mobile-nav"
          aria-label={open ? "Close menu" : "Open menu"}
          className="flex h-10 w-10 items-center justify-center rounded-md border border-[var(--tp-line-strong)] text-[var(--tp-text)] md:hidden"
        >
          {open ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
        </button>
      </nav>

      <AnimatePresence>
        {open && (
          <motion.div
            id="mobile-nav"
            initial={reduce ? false : { opacity: 0, y: -8 }}
            animate={reduce ? undefined : { opacity: 1, y: 0 }}
            exit={reduce ? undefined : { opacity: 0, y: -8 }}
            transition={{ duration: 0.2 }}
            className="border-t border-[var(--tp-line)] bg-[#0a0e14] md:hidden"
          >
            <ul className="space-y-1 px-6 py-4">
              {links.map((link) => (
                <li key={link.href}>
                  <a
                    href={link.href}
                    onClick={() => setOpen(false)}
                    className="block rounded-md px-2 py-2.5 text-sm font-medium text-[var(--tp-muted)] transition-colors hover:bg-[var(--tp-accent-dim)] hover:text-[var(--tp-text)]"
                  >
                    {link.label}
                  </a>
                </li>
              ))}
              <li className="pt-3">
                <a
                  href="/"
                  onClick={() => setOpen(false)}
                  className="flex items-center justify-between rounded-md px-2 py-2.5 text-sm font-medium text-[var(--tp-muted)] transition-colors hover:bg-[var(--tp-accent-dim)] hover:text-[var(--tp-text)]"
                >
                  Terra Pakistan — Main Website
                  <ArrowUpRight className="h-4 w-4" />
                </a>
              </li>
              <li className="pt-3">
                <a
                  href="#contact"
                  onClick={() => setOpen(false)}
                  className="tp-btn tp-btn-primary w-full justify-center"
                >
                  Let&apos;s Work Together
                  <ArrowUpRight className="h-4 w-4" />
                </a>
              </li>
            </ul>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  );
}
