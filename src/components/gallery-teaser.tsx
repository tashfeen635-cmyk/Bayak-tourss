"use client";

import Image from "next/image";
import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { X } from "lucide-react";
import { galleryImages } from "@/data";
import { FadeIn, StaggerContainer, StaggerItem } from "./animations";
import Link from "next/link";
import { Button } from "@/components/ui/button";

export function GalleryTeaser() {
  const [selected, setSelected] = useState<number | null>(null);

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

        <StaggerContainer className="mt-12 columns-1 gap-4 sm:columns-2 lg:columns-3">
          {galleryImages.map((img, i) => (
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
                  className="h-auto w-full object-cover transition-transform duration-500 group-hover:scale-110"
                />
                <div className="absolute inset-0 flex items-end bg-gradient-to-t from-black/70 to-transparent opacity-0 transition-opacity duration-300 group-hover:opacity-100">
                  <div className="p-4">
                    <p className="text-sm font-medium text-white">{img.alt}</p>
                    <p className="text-xs text-gold">{img.category}</p>
                  </div>
                </div>
              </div>
            </StaggerItem>
          ))}
        </StaggerContainer>

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
            <motion.div
              initial={{ scale: 0.9, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.9, opacity: 0 }}
              onClick={(e) => e.stopPropagation()}
              className="relative max-h-[85vh] max-w-5xl"
            >
              <Image
                src={galleryImages[selected].src}
                alt={galleryImages[selected].alt}
                width={1200}
                height={800}
                className="h-auto max-h-[80vh] w-auto rounded-lg object-contain"
              />
              <div className="mt-3 text-center">
                <p className="text-sm font-medium text-white">
                  {galleryImages[selected].alt}
                </p>
                <p className="text-xs text-gold">
                  {galleryImages[selected].category}
                </p>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </section>
  );
}
