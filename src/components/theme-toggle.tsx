"use client";

import { useTheme } from "./theme-provider";
import { Sun, Moon } from "lucide-react";

export function ThemeToggle({ light = false }: { light?: boolean }) {
  const { theme, toggle } = useTheme();

  return (
    <button
      onClick={toggle}
      aria-label="Toggle theme"
      className={
        light
          ? "flex h-9 w-9 items-center justify-center rounded-full border border-border text-foreground/70 transition-all hover:border-gold hover:text-gold"
          : "flex h-9 w-9 items-center justify-center rounded-full border border-white/20 text-white/80 transition-all hover:border-gold hover:text-gold dark:border-white/10 dark:text-white/60 dark:hover:border-gold dark:hover:text-gold"
      }
    >
      {theme === "dark" ? <Sun className="h-4 w-4" /> : <Moon className="h-4 w-4" />}
    </button>
  );
}
