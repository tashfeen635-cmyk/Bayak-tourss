"use client";

import Image from "next/image";
import { useState } from "react";
import { motion } from "framer-motion";
import {
  MapPin,
  Clock,
  Star,
  Calendar,
  Check,
  BadgeCheck,
  Filter,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { destinations } from "@/data";
import { FadeIn, StaggerContainer, StaggerItem } from "./animations";

const categories = [
  "All",
  "Adventure",
  "Family",
  "Honeymoon",
  "Cultural",
  "Luxury",
];

export function DestinationsContent() {
  const [active, setActive] = useState("All");

  const filtered =
    active === "All"
      ? destinations
      : destinations.filter((d) => d.category.includes(active));

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
              Our Destinations
            </h1>
            <p className="mx-auto mt-4 max-w-2xl text-white/60">
              From the towering peaks of the Karakoram to the lush valleys of
              Kashmir — find your perfect escape.
            </p>
          </FadeIn>
        </div>
      </section>

      <section className="py-20 sm:py-28">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <FadeIn>
            <div className="flex flex-wrap items-center justify-center gap-2">
              <Filter className="mr-1 h-4 w-4 text-muted-foreground" />
              {categories.map((cat) => (
                <button
                  key={cat}
                  onClick={() => setActive(cat)}
                  className={`rounded-full px-5 py-2 text-sm font-medium transition-all ${
                    active === cat
                      ? "bg-gold text-white shadow-md"
                      : "border border-border bg-card text-muted-foreground hover:border-gold/30 hover:text-gold"
                  }`}
                >
                  {cat}
                </button>
              ))}
            </div>
          </FadeIn>

          <StaggerContainer className="mt-12 grid gap-6 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
            {filtered.map((dest) => (
              <StaggerItem key={dest.id}>
                <div className="group relative overflow-hidden rounded-2xl border border-border bg-card transition-all duration-300 hover:shadow-xl">
                  {dest.featured && (
                    <div className="absolute left-3 top-3 z-10 flex items-center gap-1 rounded-full bg-gold px-3 py-1 text-xs font-semibold text-white shadow-md">
                      <BadgeCheck className="h-3.5 w-3.5" />
                      Featured
                    </div>
                  )}
                  <div className="relative aspect-[4/3] overflow-hidden">
                    <Image
                      src={dest.image}
                      alt={dest.name}
                      fill
                      className="object-cover transition-transform duration-500 group-hover:scale-105"
                      sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/40 to-transparent" />
                    <div className="absolute bottom-3 left-3">
                      <div className="flex items-center gap-1 rounded-full bg-white/90 px-3 py-1 text-xs font-semibold text-charcoal backdrop-blur-sm dark:text-foreground">
                        <Star className="h-3 w-3 fill-gold text-gold" />
                        {dest.rating} ({dest.reviews})
                      </div>
                    </div>
                  </div>
                  <div className="p-5">
                    <div className="flex items-center gap-1.5 text-xs text-muted-foreground">
                      <MapPin className="h-3 w-3 text-gold" />
                      {dest.region}
                    </div>
                    <h3 className="mt-1.5 font-heading text-lg font-semibold">
                      {dest.name}
                    </h3>
                    <p className="mt-2 line-clamp-2 text-xs leading-relaxed text-muted-foreground">
                      {dest.description}
                    </p>
                    <div className="mt-3 flex items-center gap-3 text-xs text-muted-foreground">
                      <span className="flex items-center gap-1">
                        <Clock className="h-3 w-3" />
                        {dest.duration}
                      </span>
                    </div>
                    <div className="mt-3 flex flex-wrap gap-1.5">
                      {dest.category.map((c) => (
                        <span
                          key={c}
                          className="rounded-full bg-gold/10 px-2.5 py-0.5 text-[10px] font-medium text-gold"
                        >
                          {c}
                        </span>
                      ))}
                    </div>
                    <div className="mt-3 flex items-center gap-1.5 text-xs text-muted-foreground">
                      <Calendar className="h-3 w-3 text-gold" />
                      {dest.availableDates.slice(0, 3).join(", ")}
                    </div>
                    <div className="mt-3 flex flex-wrap gap-1.5">
                      {dest.included.map((item) => (
                        <span
                          key={item}
                          className="flex items-center gap-1 text-[10px] text-muted-foreground"
                        >
                          <Check className="h-2.5 w-2.5 text-green-500" />
                          {item}
                        </span>
                      ))}
                    </div>
                    <div className="mt-4 flex items-end justify-between border-t border-border pt-4">
                      <div>
                        <span className="text-xs text-muted-foreground line-through">
                          Rs. {dest.originalPrice.toLocaleString()}
                        </span>
                        <div className="text-xl font-bold text-gold">
                          Rs. {dest.price.toLocaleString()}
                        </div>
                        <span className="text-[10px] text-muted-foreground">
                          per person
                        </span>
                      </div>
                      <Button
                        size="sm"
                        className="rounded-full bg-gold px-5 text-white hover:bg-gold-dark"
                      >
                        Book Now
                      </Button>
                    </div>
                  </div>
                </div>
              </StaggerItem>
            ))}
          </StaggerContainer>
        </div>
      </section>
    </>
  );
}
