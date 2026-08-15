"use client";

import Image from "next/image";
import { useState, useEffect } from "react";
import { useSearchParams, useRouter } from "next/navigation";
import { buildImageUrl } from "@/lib/image";
import { motion, AnimatePresence } from "framer-motion";
import {
  MapPin,
  Clock,
  Star,
  Calendar,
  Check,
  BadgeCheck,
  Filter,
  X,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { FadeIn, StaggerContainer, StaggerItem } from "./animations";
import { BookingModal } from "./booking-modal";
import { ComingSoon } from "./coming-soon";
import { Destination } from "@/types";

const CATEGORIES = [
  "All",
  "Autumn",
  "Blossom",
  "Honeymoon",
  "Family",
  "Trekking",
  "Bike tours",
  "Kalash Festival",
  "Safari",
  "South",
];

function toArr(v: unknown): string[] {
  if (Array.isArray(v)) return v;
  if (typeof v === "string" && v) return v.split(",").map((s) => s.trim()).filter(Boolean);
  return [];
}

function normalizeDest(d: Destination): Destination {
  return {
    ...d,
    category: toArr(d.category),
    availableDates: toArr(d.availableDates),
    included: toArr(d.included),
    notIncluded: toArr(d.notIncluded),
  };
}

export function DestinationsContent({ destinations: data }: { destinations?: Destination[] }) {
  const searchParams = useSearchParams();
  const router = useRouter();
  const categoryParam = searchParams.get("category");

  const selectCategory = (cat: string) => {
    setActive(cat);
    router.replace(
      cat === "All" ? "/tours" : `/tours?category=${encodeURIComponent(cat)}`
    );
  };

  const [destinations, setDestinations] = useState<Destination[]>(() =>
    data ? data.map(normalizeDest) : []
  );
  const [active, setActive] = useState(
    () => (categoryParam && CATEGORIES.includes(categoryParam) ? categoryParam : "All")
  );
  const [selected, setSelected] = useState<number | null>(null);
  const [bookingDest, setBookingDest] = useState<Destination | null>(null);

  useEffect(() => {
    if (categoryParam && CATEGORIES.includes(categoryParam)) {
      setActive(categoryParam);
    }
  }, [categoryParam]);

  useEffect(() => {
    if (data) return;
    fetch("/api/destinations")
      .then((r) => r.json())
      .then((data) => {
        if (Array.isArray(data)) setDestinations(data.map(normalizeDest));
        else if (data && Array.isArray(data.destinations)) setDestinations(data.destinations.map(normalizeDest));
        else setDestinations([]);
      })
      .catch(() => setDestinations([]));
  }, []);

  const filtered =
    active === "All"
      ? destinations
      : destinations.filter((d) =>
          d.category.some((c) => c.toLowerCase() === active.toLowerCase())
        );

  return (
    <>
      <section className="relative flex min-h-[50vh] items-center justify-center overflow-hidden bg-charcoal">
        <div
          className="absolute inset-0 bg-cover bg-center opacity-30"
          style={{
            backgroundImage:
              "url('/images/hunza.jpg')",
          }}
        />
        <div className="relative z-10 px-4 text-center">
          <FadeIn>
            <h1 className="font-heading text-5xl font-bold text-gold sm:text-6xl">
              Our Tours
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
              {CATEGORIES.map((cat) => (
                <button
                  key={cat}
                  onClick={() => selectCategory(cat)}
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

          {filtered.length > 0 && (
            <StaggerContainer key={`dest-content-grid-${active}`} className="mt-12 grid gap-6 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">              {filtered.map((dest, i) => (
                <StaggerItem key={String(dest._id ?? dest.id ?? i)}>
                  <div
                    onClick={() => setSelected(i)}
                    className="group cursor-pointer relative overflow-hidden rounded-2xl border border-border bg-card transition-all duration-300 hover:shadow-xl"
                  >
                    {dest.featured && (
                      <div className="absolute left-3 top-3 z-10 flex items-center gap-1 rounded-full bg-gold px-3 py-1 text-xs font-semibold text-white shadow-md">
                        <BadgeCheck className="h-3.5 w-3.5" />
                        Featured
                      </div>
                    )}
                    <div className="relative aspect-[4/3] overflow-hidden">
                      <Image
                        src={buildImageUrl(dest.image, 600)}
                        alt={dest.name}
                        fill
                        className="object-cover transition-transform duration-500 group-hover:scale-105"
                        sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
                      />
                      <div className="absolute inset-0 bg-gradient-to-t from-black/40 to-transparent" />
                      <div className="absolute bottom-3 left-3">
                        <div className="flex items-center gap-1 rounded-full bg-white/90 px-3 py-1 text-xs font-semibold text-charcoal backdrop-blur-sm dark:text-foreground">
                          <Star className="h-3 w-3 fill-gold text-gold" />
                          {dest.rating}
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
                      {dest.notIncluded.length > 0 && (
                        <div className="mt-1 flex flex-wrap gap-1.5">
                          {dest.notIncluded.map((item) => (
                            <span
                              key={item}
                              className="flex items-center gap-1 text-[10px] text-muted-foreground"
                            >
                              <X className="h-2.5 w-2.5 text-red-400" />
                              {item}
                            </span>
                          ))}
                        </div>
                      )}
                      <div className="mt-4 flex items-end justify-between border-t border-border pt-4">
                        <span className="text-sm font-medium text-gold transition-colors group-hover:text-gold-dark">
                          View Details
                        </span>
                      </div>
                    </div>
                  </div>
                </StaggerItem>
              ))}
            </StaggerContainer>
          )}

          {filtered.length === 0 && <ComingSoon category={active} />}
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
              className="absolute right-4 top-4 z-50 flex h-10 w-10 items-center justify-center rounded-full bg-black/70 text-white/90 transition-all duration-200 hover:scale-110 hover:bg-black hover:text-white"
              onClick={() => setSelected(null)}
            >
              <X className="h-5 w-5" />
            </button>

            <motion.div
              initial={{ scale: 0.9, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.9, opacity: 0 }}
              onClick={(e) => e.stopPropagation()}
              className="relative max-h-[85vh] w-full max-w-3xl overflow-y-auto rounded-2xl bg-card shadow-2xl scrollbar-none"
              style={{ scrollbarWidth: "none" }}
            >
              <div className="relative h-64 sm:h-80">
                <Image
                  src={buildImageUrl(filtered[selected].image, 800)}
                  alt={filtered[selected].name}
                  fill
                  className="object-cover"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-card via-card/30 to-transparent" />
                {filtered[selected].featured && (
                  <div className="absolute left-4 top-4 flex items-center gap-1 rounded-full bg-gold px-3 py-1 text-xs font-semibold text-white shadow-md">
                    <BadgeCheck className="h-3.5 w-3.5" />
                    Featured
                  </div>
                )}
                <div className="absolute bottom-4 left-4">
                  <div className="flex items-center gap-1 rounded-full bg-white/90 px-3 py-1 text-xs font-semibold text-charcoal backdrop-blur-sm dark:text-foreground">
                    <Star className="h-3 w-3 fill-gold text-gold" />
                    {filtered[selected].rating}
                  </div>
                </div>
              </div>

              <div className="px-6 pb-6 sm:px-8">
                <div className="flex items-center gap-1.5 text-xs text-muted-foreground">
                  <MapPin className="h-3 w-3 text-gold" />
                  {filtered[selected].region}
                </div>
                <h3 className="mt-1 font-heading text-2xl font-bold">
                  {filtered[selected].name}
                </h3>
                <p className="mt-3 text-sm leading-relaxed text-muted-foreground">
                  {filtered[selected].description}
                </p>

                <div className="mt-4 flex flex-wrap gap-1.5">
                  {filtered[selected].category.map((c) => (
                    <span
                      key={c}
                      className="rounded-full bg-gold/10 px-3 py-1 text-xs font-medium text-gold"
                    >
                      {c}
                    </span>
                  ))}
                </div>

                <div className="mt-4 flex items-center gap-6 text-sm text-muted-foreground">
                  <span className="flex items-center gap-1.5">
                    <Clock className="h-4 w-4 text-gold" />
                    {filtered[selected].duration}
                  </span>
                  <span className="flex items-center gap-1.5">
                    <Calendar className="h-4 w-4 text-gold" />
                    {filtered[selected].availableDates.join(", ")}
                  </span>
                </div>

                <div className="mt-5">
                  <h4 className="text-sm font-semibold">What&apos;s Included</h4>
                  <div className="mt-2 flex flex-wrap gap-2">
                    {filtered[selected].included.map((item) => (
                      <span
                        key={item}
                        className="flex items-center gap-1.5 rounded-full bg-muted/50 px-3 py-1 text-xs"
                      >
                        <Check className="h-3 w-3 text-green-500" />
                        {item}
                      </span>
                    ))}
                  </div>
                </div>

                {filtered[selected].notIncluded.length > 0 && (
                  <div className="mt-4">
                    <h4 className="text-sm font-semibold">What&apos;s Not Included</h4>
                    <div className="mt-2 flex flex-wrap gap-2">
                      {filtered[selected].notIncluded.map((item) => (
                        <span
                          key={item}
                          className="flex items-center gap-1.5 rounded-full bg-muted/50 px-3 py-1 text-xs"
                        >
                          <X className="h-3 w-3 text-red-400" />
                          {item}
                        </span>
                      ))}
                    </div>
                  </div>
                )}

                <div className="mt-6">
                  <h4 className="text-sm font-semibold">Day-by-Day Itinerary</h4>
                  <div className="mt-3 space-y-0">
                    {(filtered[selected].itinerary ?? []).map((day, i) => (
                      <div key={i} className="flex gap-4">
                        <div className="flex flex-col items-center">
                          <div className="flex h-8 w-8 shrink-0 items-center justify-center rounded-full bg-gold text-xs font-bold text-white">
                            {day.day}
                          </div>
                          {i < (filtered[selected].itinerary ?? []).length - 1 && (
                            <div className="w-px flex-1 bg-border" />
                          )}
                        </div>
                        <div className="pb-6">
                          <h5 className="text-sm font-semibold">{day.title}</h5>
                          <p className="mt-1 text-xs leading-relaxed text-muted-foreground">
                            {day.description}
                          </p>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>

                <div className="mt-4 flex items-center gap-3 border-t border-border pt-5">
                  <Button
                    className="rounded-full bg-gold px-6 text-white hover:bg-gold-dark"
                    onClick={() => setBookingDest(filtered[selected])}
                  >
                    Book Now
                  </Button>
                  <Button
                    variant="outline"
                    className="rounded-full border-border px-6"
                    onClick={() => setSelected(null)}
                  >
                    Close
                  </Button>
                </div>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      <BookingModal
        isOpen={bookingDest !== null}
        onClose={() => setBookingDest(null)}
        tourName={bookingDest?.name}
        tourDuration={bookingDest?.duration}
        destinationId={bookingDest?.id}
      />
    </>
  );
}
