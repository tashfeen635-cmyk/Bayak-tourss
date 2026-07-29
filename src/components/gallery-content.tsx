"use client";

import { useState, useCallback, useEffect, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { X, ChevronLeft, ChevronRight } from "lucide-react";
import { FadeIn } from "./animations";
import { GalleryImage } from "@/types";

export function GalleryContent() {
  const [galleryImages, setGalleryImages] = useState<GalleryImage[]>([]);
  const [selected, setSelected] = useState<number | null>(null);
  const categories = ["All", ...new Set(galleryImages.map((img) => img.category))];
  const [active, setActive] = useState("All");

  useEffect(() => {
    fetch("/api/gallery")
      .then((r) => r.json())
      .then((data) => {
        const list = Array.isArray(data) ? data : data?.images ?? [];
        setGalleryImages(list.filter((img: GalleryImage) => img.src));
      })
      .catch(() => setGalleryImages([]));
  }, []);

  const filtered =
    active === "All"
      ? galleryImages
      : galleryImages.filter((img) => img.category === active);

  const touchStartX = useRef(0);
  const touchStartY = useRef(0);

  const goNext = useCallback(() => {
    if (selected === null) return;
    setSelected((selected + 1) % filtered.length);
  }, [selected, filtered.length]);

  const goPrev = useCallback(() => {
    if (selected === null) return;
    setSelected((selected - 1 + filtered.length) % filtered.length);
  }, [selected, filtered.length]);

  const handleTouchStart = useCallback((e: React.TouchEvent) => {
    touchStartX.current = e.touches[0].clientX;
    touchStartY.current = e.touches[0].clientY;
  }, []);

  const handleTouchEnd = useCallback((e: React.TouchEvent) => {
    const dx = e.changedTouches[0].clientX - touchStartX.current;
    const dy = e.changedTouches[0].clientY - touchStartY.current;
    if (Math.abs(dx) > Math.abs(dy) && Math.abs(dx) > 50) {
      if (dx > 0) goPrev();
      else goNext();
    }
  }, [goNext, goPrev]);

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
    <>
      <section className="relative flex min-h-[50vh] items-center justify-center overflow-hidden bg-charcoal">
        <div
          className="absolute inset-0 bg-cover bg-center opacity-30"
          style={{
            backgroundImage:
              "url('https://images.unsplash.com/photo-1506905925346-21bda4d32df4?w=1920&q=80')",
          }}
        />
        <div className="relative z-10 px-4 text-center">
          <FadeIn>
            <h1 className="font-heading text-5xl font-bold text-white sm:text-6xl">
              Travel Gallery
            </h1>
            <p className="mx-auto mt-4 max-w-2xl text-white/60">
              A visual journey through Pakistan&apos;s most stunning landscapes.
            </p>
          </FadeIn>
        </div>
      </section>

      <section className="py-20 sm:py-28">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <FadeIn>
            <div className="flex flex-wrap justify-center gap-3">
              {categories.map((cat) => (
                <button
                  key={cat}
                  onClick={() => setActive(cat)}
                  className={`rounded-full px-5 py-2 text-sm font-medium transition-all ${
                    active === cat
                      ? "bg-gold text-white"
                      : "border border-border text-muted-foreground hover:border-gold/30 hover:text-gold"
                  }`}
                >
                  {cat}
                </button>
              ))}
            </div>
          </FadeIn>

          <div className="mt-12">
            <div className="grid grid-cols-3 gap-3 sm:hidden">
              {filtered.map((img, i) => (
                <div key={i}>
                  <div
                    onClick={() => setSelected(i)}
                    className="group relative cursor-pointer overflow-hidden rounded-xl aspect-square"
                  >
                    <img
                      src={img.src}
                      alt={img.alt}
                      loading="lazy"
                      className="absolute inset-0 h-full w-full object-cover transition-transform duration-500 group-hover:scale-105"
                    />
                    <div className="absolute inset-0 flex items-end bg-gradient-to-t from-black/60 to-transparent opacity-0 transition-opacity duration-300 group-hover:opacity-100">
                      <div className="p-2">
                        <p className="text-xs font-medium text-white truncate">
                          {img.alt}
                        </p>
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
            <div className="hidden sm:columns-2 sm:block lg:columns-3 gap-4">
              {filtered.map((img, i) => (
                <div key={i} className="mb-4 break-inside-avoid">
                  <div
                    onClick={() => setSelected(i)}
                    className="group relative cursor-pointer overflow-hidden rounded-xl"
                  >
                    <img
                      src={img.src}
                      alt={img.alt}
                      loading="lazy"
                      className="h-auto w-full object-cover transition-transform duration-500 group-hover:scale-105"
                    />
                    <div className="absolute inset-0 flex items-end bg-gradient-to-t from-black/60 to-transparent opacity-0 transition-opacity duration-300 group-hover:opacity-100">
                      <div className="p-4">
                        <p className="text-sm font-medium text-white">
                          {img.alt}
                        </p>
                        <p className="text-xs text-gold">{img.category}</p>
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      <AnimatePresence>
        {selected !== null && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-50 flex items-center justify-center bg-black/90 p-4"
            onClick={() => setSelected(null)}
            onTouchStart={handleTouchStart}
            onTouchEnd={handleTouchEnd}
          >
            <button
              className="absolute right-4 top-4 text-white/70 transition-colors hover:text-white"
              onClick={() => setSelected(null)}
            >
              <X className="h-8 w-8" />
            </button>

            <button
              onClick={(e) => { e.stopPropagation(); goPrev(); }}
              className="absolute left-4 top-1/2 z-10 flex h-12 w-12 -translate-y-1/2 items-center justify-center rounded-full bg-white/10 text-white backdrop-blur-sm transition-all hover:bg-white/20"
            >
              <ChevronLeft className="h-6 w-6" />
            </button>

            <button
              onClick={(e) => { e.stopPropagation(); goNext(); }}
              className="absolute right-4 top-1/2 z-10 flex h-12 w-12 -translate-y-1/2 items-center justify-center rounded-full bg-white/10 text-white backdrop-blur-sm transition-all hover:bg-white/20"
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
                  src={filtered[selected].src}
                  alt={filtered[selected].alt}
                  className="h-auto max-h-[80vh] w-auto rounded-lg object-contain"
                />
                <div className="mt-3 text-center">
                  <p className="text-sm font-medium text-white">
                    {filtered[selected].alt}
                  </p>
                  <p className="text-xs text-gold">
                    {filtered[selected].category}
                  </p>
                  <p className="mt-1 text-xs text-white/40">
                    {selected + 1} / {filtered.length}
                  </p>
                </div>
              </motion.div>
            </AnimatePresence>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
