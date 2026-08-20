"use client";

import { useState, useCallback, useEffect, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { X, ChevronLeft, ChevronRight, Loader2 } from "lucide-react";
import Image from "next/image";
import { FadeIn } from "./animations";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { GalleryImage } from "@/types";
import { buildImageUrl } from "@/lib/image";

export function GalleryTeaser({ images: data }: { images?: GalleryImage[] }) {
  const [galleryImages, setGalleryImages] = useState<GalleryImage[]>(() =>
    data ? data.filter((img) => img.src) : []
  );
  const [selected, setSelected] = useState<number | null>(null);
  const [imgLoading, setImgLoading] = useState(true);

  useEffect(() => {
    if (selected !== null) setImgLoading(true);
  }, [selected]);

  useEffect(() => {
    if (data) return;
    fetch("/api/gallery")
      .then((r) => r.json())
      .then((data) => {
        const list = Array.isArray(data) ? data : data?.images ?? [];
        setGalleryImages(list.filter((img: GalleryImage) => img.src));
      })
      .catch(() => setGalleryImages([]));
  }, [data]);

  const touchStartX = useRef(0);
  const touchStartY = useRef(0);

  const preloadImage = useCallback((url: string) => {
    const href = buildImageUrl(url, 1600);
    if (!document.querySelector(`link[rel="preload"][href="${href}"]`)) {
      const link = document.createElement("link");
      link.rel = "preload";
      link.as = "image";
      link.href = href;
      document.head.appendChild(link);
    }
  }, []);

  const goNext = useCallback(() => {
    if (selected === null) return;
    setSelected((selected + 1) % galleryImages.length);
  }, [selected, galleryImages.length]);

  const goPrev = useCallback(() => {
    if (selected === null) return;
    setSelected((selected - 1 + galleryImages.length) % galleryImages.length);
  }, [selected, galleryImages.length]);

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
    <section className="py-12 sm:py-24 md:py-32">
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
            <div className="grid grid-cols-2 gap-3 sm:grid-cols-3 sm:gap-4">
              {galleryImages.map((img, i) => (
                <div key={i}>
                  <div
                    onClick={() => setSelected(i)}
                    onMouseEnter={() => preloadImage(img.src)}
                    className="group relative cursor-pointer overflow-hidden rounded-xl aspect-square"
                  >
                    <Image
                      src={buildImageUrl(img.src, 600)}
                      alt={img.alt}
                      fill
                      sizes="33vw"
                      className="object-cover transition-transform duration-500 group-hover:scale-110"
                    />
                    <div className="absolute inset-0 flex items-end bg-gradient-to-t from-black/70 to-transparent opacity-0 transition-opacity duration-300 group-hover:opacity-100">
                      <div className="p-2">
                        <p className="text-xs font-medium text-white truncate">{img.alt}</p>
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
            onTouchStart={handleTouchStart}
            onTouchEnd={handleTouchEnd}
          >
            <button
              className="absolute right-4 top-4 z-10 flex h-10 w-10 items-center justify-center rounded-full bg-black/70 text-white/90 transition-all duration-200 hover:scale-110 hover:bg-black hover:text-white"
              onClick={() => setSelected(null)}
            >
              <X className="h-5 w-5" />
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
                className="flex flex-col items-center"
              >
                <div className="relative flex min-h-[45vh] items-center justify-center sm:min-h-[60vh]">
                  {imgLoading && (
                    <div className="absolute inset-0 flex items-center justify-center">
                      <Loader2 className="h-10 w-10 animate-spin text-white/60" />
                    </div>
                  )}
                  <Image
                    src={buildImageUrl(galleryImages[selected].src, 1600)}
                    alt={galleryImages[selected].alt}
                    width={1600}
                    height={1200}
                    onLoad={() => setImgLoading(false)}
                    className={`max-h-[85vh] w-auto max-w-5xl object-contain rounded-lg transition-opacity duration-300 ${
                      imgLoading ? "opacity-0" : "opacity-100"
                    }`}
                  />
                </div>
                {!imgLoading && (
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
                )}
              </motion.div>
            </AnimatePresence>
          </motion.div>
        )}
      </AnimatePresence>
    </section>
  );
}
