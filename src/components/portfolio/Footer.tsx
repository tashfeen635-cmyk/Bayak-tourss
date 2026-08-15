import Link from "next/link";
import { ArrowUp, ArrowUpRight } from "lucide-react";
import { profile } from "./data";

export function Footer() {
  return (
    <footer className="border-t border-[var(--tp-line)]">
      <div className="mx-auto flex max-w-[1180px] flex-col gap-8 px-6 py-12 sm:px-8">
        <div className="flex flex-col justify-between gap-6 sm:flex-row sm:items-end">
          <div>
            <p className="text-base font-bold tracking-tight text-[var(--tp-text)]">
              {profile.name}
            </p>
            <p className="tp-mono-label mt-1.5">{profile.role}</p>
          </div>
          <div className="flex items-center justify-between gap-8 sm:flex-col sm:items-end">
            <p className="tp-mono-label">{profile.location}</p>
            <a
              href="#main"
              aria-label="Back to top"
              className="flex h-10 w-10 items-center justify-center rounded-md border border-[var(--tp-line-strong)] text-[var(--tp-muted)] transition-colors hover:border-[var(--tp-accent)] hover:text-[var(--tp-accent)]"
            >
              <ArrowUp className="h-4 w-4" />
            </a>
          </div>
        </div>
        <div className="flex flex-col justify-between gap-2 border-t border-[var(--tp-line)] pt-6 sm:flex-row">
          <p className="text-xs text-[var(--tp-faint)]">
            &copy; {new Date().getFullYear()} {profile.name}
          </p>
          <div className="flex flex-wrap items-center gap-x-6 gap-y-2">
            <p className="text-xs text-[var(--tp-faint)]">
              Built from Gilgit-Baltistan. Designed for the world.
            </p>
            <Link
              href="/"
              className="tp-link inline-flex items-center gap-1.5 text-xs font-medium"
            >
              Back to Terra Pakistan
              <ArrowUpRight className="h-4 w-4" />
            </Link>
          </div>
        </div>
      </div>
    </footer>
  );
}
