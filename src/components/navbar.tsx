"use client";

import Link from "next/link";
import Image from "next/image";
import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Menu, X } from "lucide-react";
import { Button } from "@/components/ui/button";
import { ThemeToggle } from "./theme-toggle";

const navLinks = [
  { href: "/", label: "Home" },
  { href: "/about", label: "About" },
  { href: "/tours", label: "Tours" },
  { href: "/tourist-visa", label: "Tourist Visa" },
  { href: "/work-with-us", label: "Work With Us" },
  { href: "/blogs", label: "Blogs" },
  { href: "/contact", label: "Contact" },
];

export function Navbar() {
  const [isOpen, setIsOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 50);
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <header
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-500 ${
        scrolled
          ? ""
          : "bg-transparent"
      }`}
    >
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 h-[100px]">
        <nav className="flex h-[100px] items-center justify-between mt-[10px] p-[29px_27px_8px_12px] backdrop-blur-2xl rounded-[100px]">
          <Link href="/" className="flex items-center gap-2 group">
            <Image
              src="/bayak-tours-logo-v2.png"
              alt="Bayak Tours"
              width={1024}
              height={1536}
              priority
              className="h-50 w-auto object-contain"
            />
            <span className="font-heading text-2xl font-bold tracking-tight text-gold -mt-9">
              Bayak Tours
            </span>
          </Link>

          <div className="hidden items-center gap-1 min-[1028px]:flex pb-[25px]">
            {navLinks.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                className={`rounded-lg px-4 py-2 text-sm font-medium transition-colors ${
                  scrolled
                    ? "text-foreground/70 hover:bg-gold/10 hover:text-gold"
                    : "text-white/80 hover:bg-white/10 hover:text-white"
                }`}
              >
                {link.label}
              </Link>
            ))}
            <div className="ml-4 flex items-center gap-2">
              <ThemeToggle light={scrolled} />
            </div>
          </div>

          <div className="flex items-center gap-2 min-[1028px]:hidden pb-[31px]">
            <ThemeToggle light={scrolled} />
            <button
              onClick={() => setIsOpen(!isOpen)}
              className={`rounded-lg p-2 ${
                scrolled
                  ? "text-foreground"
                  : "text-white"
              }`}
            >
              {isOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
            </button>
          </div>
        </nav>
      </div>

      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: "auto" }}
            exit={{ opacity: 0, height: 0 }}
            transition={{ duration: 0.3 }}
            className="overflow-hidden border-t border-border bg-white/95 backdrop-blur-lg dark:bg-charcoal/95 min-[1028px]:hidden"
          >
            <div className="space-y-1 px-4 py-4">
              {navLinks.map((link) => (
                <Link
                  key={link.href}
                  href={link.href}
                  onClick={() => setIsOpen(false)}
                  className="block rounded-lg px-4 py-3 text-sm font-medium text-foreground/70 transition-colors hover:bg-gold/10 hover:text-gold"
                >
                  {link.label}
                </Link>
              ))}
              <div className="pt-2" />
            </div>
          </motion.div>
        )}
      </AnimatePresence>

    </header>
  );
}
