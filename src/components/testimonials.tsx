"use client";

import Image from "next/image";
import { useEffect, useState, useCallback, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Star, ChevronLeft, ChevronRight, Quote } from "lucide-react";
import { FadeIn } from "./animations";
import { Testimonial } from "@/types";

export function Testimonials() {
  const [testimonials, setTestimonials] = useState<Testimonial[]>([]);
  const [current, setCurrent] = useState(0);
  const [direction, setDirection] = useState(0);
  const hasInteracted = useRef(false);

  useEffect(() => {
    fetch("/api/testimonials")
      .then((r) => r.json())
      .then((data) => {
        if (Array.isArray(data)) setTestimonials(data);
        else if (data && Array.isArray(data.testimonials)) setTestimonials(data.testimonials);
        else setTestimonials([]);
      })
      .catch(() => setTestimonials([]));
  }, []);

  const next = useCallback(() => {
    setDirection(1);
    hasInteracted.current = true;
    setCurrent((prev) => (prev + 1) % testimonials.length);
  }, [testimonials.length]);

  const prev = useCallback(() => {
    setDirection(-1);
    hasInteracted.current = true;
    setCurrent(
      (prev) => (prev - 1 + testimonials.length) % testimonials.length
    );
  }, [testimonials.length]);

  useEffect(() => {
    if (testimonials.length === 0) return;
    const timer = setInterval(next, 5000);
    return () => clearInterval(timer);
  }, [next, testimonials.length]);

  const variants = {
    enter: (dir: number) => ({
      x: dir > 0 ? 200 : -200,
      opacity: 0,
    }),
    center: { x: 0, opacity: 1 },
    exit: (dir: number) => ({
      x: dir > 0 ? -200 : 200,
      opacity: 0,
    }),
  };

  if (testimonials.length === 0) return null;

  const t = testimonials[Math.min(current, testimonials.length - 1)];

  return (
    <section className="py-24 sm:py-32">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <FadeIn className="text-center">
          <span className="text-sm font-semibold uppercase tracking-wider text-gold">
            Testimonials
          </span>
          <h2 className="mt-3 font-heading text-4xl font-bold tracking-tight sm:text-5xl">
            What Travelers Say
          </h2>
        </FadeIn>

        <FadeIn className="mt-8 flex justify-center gap-8 text-center">
          <div>
            <div className="flex justify-center gap-0.5">
              {Array.from({ length: 5 }).map((_, i) => (
                <Star key={i} className="h-5 w-5 fill-gold text-gold" />
              ))}
            </div>
            <div className="mt-1 text-sm text-muted-foreground">
              5-Star Rated
            </div>
          </div>
          <div className="border-l border-border pl-8">
            <div className="font-heading text-2xl font-bold text-gold">
              10,000+
            </div>
            <div className="text-sm text-muted-foreground">
              Happy Travelers
            </div>
          </div>
          <div className="border-l border-border pl-8">
            <div className="font-heading text-2xl font-bold text-gold">
              98%
            </div>
            <div className="text-sm text-muted-foreground">
              Satisfaction Rate
            </div>
          </div>
        </FadeIn>

        <div className="relative mt-16 mx-auto max-w-3xl">
          <div className="overflow-hidden rounded-2xl border border-border bg-card p-8 sm:p-12">
            <Quote className="mb-4 h-10 w-10 text-gold/20" />
            <AnimatePresence custom={direction} mode="wait">
              <motion.div
                key={current}
                custom={direction}
                variants={variants}
                initial={hasInteracted.current ? "enter" : false}
                animate="center"
                exit="exit"
                transition={{ duration: 0.4, ease: [0.22, 1, 0.36, 1] }}
              >
                <div className="flex gap-1">
                  {Array.from({ length: t.rating }).map((_, i) => (
                    <Star key={i} className="h-4 w-4 fill-gold text-gold" />
                  ))}
                </div>
                <p className="mt-4 text-lg leading-relaxed text-muted-foreground">
                  &ldquo;{t.text}&rdquo;
                </p>
                <div className="mt-6 flex items-center gap-3">
                  {t.avatar ? (
                    <Image
                      src={t.avatar}
                      alt={t.name}
                      width={48}
                      height={48}
                      className="rounded-full object-cover"
                    />
                  ) : (
                    <div className="flex h-12 w-12 items-center justify-center rounded-full bg-gold/20 text-sm font-bold text-gold">
                      {t.name.charAt(0)}
                    </div>
                  )}
                  <div>
                    <div className="font-semibold">{t.name}</div>
                    <div className="text-sm text-muted-foreground">
                      {t.country}
                    </div>
                  </div>
                </div>
              </motion.div>
            </AnimatePresence>
          </div>

          <button
            onClick={prev}
            className="absolute -left-4 top-1/2 flex h-10 w-10 -translate-y-1/2 items-center justify-center rounded-full border border-border bg-card shadow-md transition-colors hover:border-gold hover:text-gold"
          >
            <ChevronLeft className="h-5 w-5" />
          </button>
          <button
            onClick={next}
            className="absolute -right-4 top-1/2 flex h-10 w-10 -translate-y-1/2 items-center justify-center rounded-full border border-border bg-card shadow-md transition-colors hover:border-gold hover:text-gold"
          >
            <ChevronRight className="h-5 w-5" />
          </button>

          <div className="mt-6 flex justify-center gap-2">
            {testimonials.map((_, i) => (
              <button
                key={i}
                onClick={() => {
                  setDirection(i > current ? 1 : -1);
                  setCurrent(i);
                }}
                className={`h-2 rounded-full transition-all ${
                  i === current ? "w-8 bg-gold" : "w-2 bg-border"
                }`}
              />
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
