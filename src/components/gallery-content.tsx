"use client";

import Image from "next/image";
import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { X } from "lucide-react";
import { galleryImages } from "@/data";
import { FadeIn, StaggerContainer, StaggerItem } from "./animations";

export function GalleryContent() {
  const [selected, setSelected] = useState<number | null>(null);
  const categories = ["All", ...new Set(galleryImages.map((img) => img.category))];
  const [active, setActive] = useState("All");

  const filtered =
    active === "All"
      ? galleryImages
      : galleryImages.filter((img) => img.category === active);

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

          <StaggerContainer className="mt-12 columns-1 gap-4 sm:columns-2 lg:columns-3">
            {filtered.map((img, i) => (
              <StaggerItem key={i} className="mb-4 break-inside-avoid">
                <div
                  onClick={() => setSelected(i)}
                  className="group relative cursor-pointer overflow-hidden rounded-xl"
                >
                  <Image
                    src={img.src}
                    alt={img.alt}
                    width={800}
                    height={600}
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
              </StaggerItem>
            ))}
          </StaggerContainer>
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
          >
            <button
              className="absolute right-4 top-4 text-white/70 transition-colors hover:text-white"
              onClick={() => setSelected(null)}
            >
              <X className="h-8 w-8" />
            </button>
            <motion.div
              initial={{ scale: 0.9, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.9, opacity: 0 }}
              onClick={(e) => e.stopPropagation()}
              className="relative max-h-[85vh] max-w-5xl"
            >
              <Image
                src={filtered[selected].src}
                alt={filtered[selected].alt}
                width={1200}
                height={800}
                className="h-auto max-h-[80vh] w-auto rounded-lg object-contain"
              />
              <div className="mt-3 text-center">
                <p className="text-sm font-medium text-white">
                  {filtered[selected].alt}
                </p>
                <p className="text-xs text-gold">
                  {filtered[selected].category}
                </p>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
