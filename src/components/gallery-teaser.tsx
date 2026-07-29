"use client";

import { useState, useCallback, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { X, ChevronLeft, ChevronRight } from "lucide-react";
import { FadeIn } from "./animations";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { GalleryImage } from "@/types";

export function GalleryTeaser() {
  const [galleryImages, setGalleryImages] = useState<GalleryImage[]>([]);
  const [selected, setSelected] = useState<number | null>(null);

  useEffect(() => {
    fetch("/api/gallery")
      .then((r) => r.json())
      .then((data) => {
        const list = Array.isArray(data) ? data : data?.images ?? [];
        setGalleryImages(list.filter((img: GalleryImage) => img.src));
      })
      .catch(() => setGalleryImages([]));
  }, []);

  const goNext = useCallback(() => {
    if (selected === null) return;
    setSelected((selected + 1) % galleryImages.length);
  }, [selected, galleryImages.length]);

  const goPrev = useCallback(() => {
    if (selected === null) return;
    setSelected((selected - 1 + galleryImages.length) % galleryImages.length);
  }, [selected, galleryImages.length]);

  useEffect(() => {
    if (selected === null) return;
    const handleKey = (e: KeyboardEvent) => {
      if (e.key === "ArrowRight") goNext();
      if (e.key === "ArrowLeft") goPrev();
      if (e.key === "Escape") setSelected(null);
    };
    window.addEventListener("keydown", handleKey);
    return () => window.removeEventListener("keydown", handleKey);
  }, [selected, goNext, goPrev]);

  return (
    <section className="py-24 sm:py-32">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <FadeIn className="text-center">
          <span className="text-sm font-semibold uppercase tracking-wider text-gold">
            Gallery
          </span>
          <h2 className="mt-3 font-heading text-4xl font-bold tracking-tight sm:text-5xl">
            Captured Moments
          </h2>
          <p className="mx-auto mt-4 max-w-2xl text-muted-foreground">
            A glimpse into the extraordinary experiences our travelers enjoy.
          </p>
        </FadeIn>

        {galleryImages.length > 0 && (
          <div className="mt-12">
            <div className="flex gap-3 overflow-x-auto snap-x snap-mandatory scrollbar-none sm:hidden">
              {galleryImages.map((img, i) => (
                <div key={i} className="w-1/3 flex-shrink-0 snap-start">
                  <div
                    onClick={() => setSelected(i)}
                    className="group relative cursor-pointer overflow-hidden rounded-xl"
                  >
                    <img
                      src={img.src}
                      alt={img.alt}
                      loading="lazy"
                      className="h-auto w-full object-cover transition-transform duration-500 group-hover:scale-110"
                    />
                    <div className="absolute inset-0 flex items-end bg-gradient-to-t from-black/70 to-transparent opacity-0 transition-opacity duration-300 group-hover:opacity-100">
                      <div className="p-4">
                        <p className="text-sm font-medium text-white">{img.alt}</p>
                        <p className="text-xs text-gold">{img.category}</p>
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
            <div className="hidden sm:columns-2 sm:block lg:columns-3 gap-4">
              {galleryImages.map((img, i) => (
                <div key={i} className="mb-4 break-inside-avoid">
                  <div
                    onClick={() => setSelected(i)}
                    className="group relative cursor-pointer overflow-hidden rounded-xl"
                  >
                    <img
                      src={img.src}
                      alt={img.alt}
                      loading="lazy"
                      className="h-auto w-full object-cover transition-transform duration-500 group-hover:scale-110"
                    />
                    <div className="absolute inset-0 flex items-end bg-gradient-to-t from-black/70 to-transparent opacity-0 transition-opacity duration-300 group-hover:opacity-100">
                      <div className="p-4">
                        <p className="text-sm font-medium text-white">{img.alt}</p>
                        <p className="text-xs text-gold">{img.category}</p>
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        <FadeIn className="mt-10 text-center">
          <Link href="/gallery">
            <Button
              size="lg"
              variant="outline"
              className="rounded-full border-gold/30 px-8 text-gold hover:bg-gold hover:text-white"
            >
              View Full Gallery
            </Button>
          </Link>
        </FadeIn>
      </div>

      <AnimatePresence>
        {selected !== null && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-50 flex items-center justify-center bg-black/90 p-4"
            onClick={() => setSelected(null)}
          >
            <button
              className="absolute right-4 top-4 text-white/70 transition-colors hover:text-white"
              onClick={() => setSelected(null)}
            >
              <X className="h-8 w-8" />
            </button>

            <button
              onClick={(e) => { e.stopPropagation(); goPrev(); }}
              className="absolute left-4 top-1/2 flex h-12 w-12 -translate-y-1/2 items-center justify-center rounded-full bg-white/10 text-white backdrop-blur-sm transition-all hover:bg-white/20"
            >
              <ChevronLeft className="h-6 w-6" />
            </button>

            <button
              onClick={(e) => { e.stopPropagation(); goNext(); }}
              className="absolute right-4 top-1/2 flex h-12 w-12 -translate-y-1/2 items-center justify-center rounded-full bg-white/10 text-white backdrop-blur-sm transition-all hover:bg-white/20"
            >
              <ChevronRight className="h-6 w-6" />
            </button>

            <AnimatePresence mode="wait">
              <motion.div
                key={selected}
                initial={{ opacity: 0, x: 50 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -50 }}
                transition={{ duration: 0.25 }}
                onClick={(e) => e.stopPropagation()}
                className="relative max-h-[85vh] max-w-5xl"
              >
                <img
                  src={galleryImages[selected].src}
                  alt={galleryImages[selected].alt}
                  className="h-auto max-h-[80vh] w-auto rounded-lg object-contain"
                />
                <div className="mt-3 text-center">
                  <p className="text-sm font-medium text-white">
                    {galleryImages[selected].alt}
                  </p>
                  <p className="text-xs text-gold">
                    {galleryImages[selected].category}
                  </p>
                  <p className="mt-1 text-xs text-white/40">
                    {selected + 1} / {galleryImages.length}
                  </p>
                </div>
              </motion.div>
            </AnimatePresence>
          </motion.div>
        )}
      </AnimatePresence>
    </section>
  );
}
