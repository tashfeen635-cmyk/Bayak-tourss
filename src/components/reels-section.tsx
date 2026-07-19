"use client";

import { useRef, useState, useEffect, useCallback } from "react";
import { motion } from "framer-motion";
import { Heart, Share2, Play, Pause, ChevronLeft, ChevronRight } from "lucide-react";
import { reels } from "@/data";
import { FadeIn } from "./animations";

function ReelCard({ reel }: { reel: (typeof reels)[0] }) {
  const [liked, setLiked] = useState(false);
  const [likes, setLikes] = useState(reel.likes);
  const [playing, setPlaying] = useState(false);

  function handleLike() {
    setLiked(!liked);
    setLikes(liked ? reel.likes : reel.likes + 1);
  }

  return (
    <div className="group relative h-[480px] w-[280px] shrink-0 overflow-hidden rounded-3xl bg-charcoal sm:h-[560px] sm:w-[320px]">
      <div
        className="absolute inset-0 bg-cover bg-center transition-transform duration-700 group-hover:scale-105"
        style={{ backgroundImage: `url(${reel.poster})` }}
      />
      <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/20 to-transparent" />

      <button
        onClick={() => setPlaying(!playing)}
        className="absolute inset-0 z-10 flex items-center justify-center"
      >
        <div className="flex h-16 w-16 items-center justify-center rounded-full bg-white/20 text-white opacity-0 backdrop-blur-sm transition-opacity group-hover:opacity-100">
          {playing ? (
            <Pause className="h-7 w-7" />
          ) : (
            <Play className="ml-1 h-7 w-7" />
          )}
        </div>
      </button>

      <div className="absolute right-3 top-1/2 z-20 flex -translate-y-1/2 flex-col items-center gap-4">
        <button
          onClick={handleLike}
          className="flex flex-col items-center gap-1"
        >
          <div
            className={`flex h-12 w-12 items-center justify-center rounded-full backdrop-blur-sm transition-all ${
              liked
                ? "bg-red-500/20 text-red-500"
                : "bg-white/10 text-white hover:bg-white/20"
            }`}
          >
            <Heart
              className={`h-5 w-5 ${liked ? "fill-red-500" : ""}`}
            />
          </div>
          <span className="text-xs text-white/70">
            {(likes / 1000).toFixed(1)}K
          </span>
        </button>
        <button className="flex flex-col items-center gap-1">
          <div className="flex h-12 w-12 items-center justify-center rounded-full bg-white/10 text-white backdrop-blur-sm transition-all hover:bg-white/20">
            <Share2 className="h-5 w-5" />
          </div>
          <span className="text-xs text-white/70">Share</span>
        </button>
      </div>

      <div className="absolute bottom-0 left-0 right-0 z-20 p-5">
        <h3 className="font-heading text-xl font-bold text-white">
          {reel.destination}
        </h3>
        <p className="mt-1 text-sm text-white/70">{reel.description}</p>
      </div>
    </div>
  );
}

export function ReelsSection() {
  const scrollRef = useRef<HTMLDivElement>(null);
  const [canScrollLeft, setCanScrollLeft] = useState(false);
  const [canScrollRight, setCanScrollRight] = useState(true);

  const checkScroll = useCallback(() => {
    const el = scrollRef.current;
    if (!el) return;
    setCanScrollLeft(el.scrollLeft > 10);
    setCanScrollRight(el.scrollLeft < el.scrollWidth - el.clientWidth - 10);
  }, []);

  useEffect(() => {
    const el = scrollRef.current;
    if (!el) return;
    el.addEventListener("scroll", checkScroll);
    checkScroll();
    return () => el.removeEventListener("scroll", checkScroll);
  }, [checkScroll]);

  function scroll(direction: "left" | "right") {
    const el = scrollRef.current;
    if (!el) return;
    const amount = 340;
    el.scrollBy({ left: direction === "left" ? -amount : amount, behavior: "smooth" });
  }

  return (
    <section className="overflow-hidden bg-charcoal py-24 sm:py-32">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <FadeIn className="text-center">
          <span className="text-sm font-semibold uppercase tracking-wider text-gold">
            Explore
          </span>
          <h2 className="mt-3 font-heading text-4xl font-bold tracking-tight text-white sm:text-5xl">
            Destination Reels
          </h2>
          <p className="mx-auto mt-4 max-w-2xl text-white/60">
            Swipe through breathtaking moments from Pakistan&apos;s most stunning destinations.
          </p>
        </FadeIn>
      </div>

      <div className="relative mt-12">
        {canScrollLeft && (
          <button
            onClick={() => scroll("left")}
            className="absolute left-4 top-1/2 z-30 flex h-12 w-12 -translate-y-1/2 items-center justify-center rounded-full bg-white/10 text-white backdrop-blur-sm transition-all hover:bg-white/20"
          >
            <ChevronLeft className="h-6 w-6" />
          </button>
        )}
        {canScrollRight && (
          <button
            onClick={() => scroll("right")}
            className="absolute right-4 top-1/2 z-30 flex h-12 w-12 -translate-y-1/2 items-center justify-center rounded-full bg-white/10 text-white backdrop-blur-sm transition-all hover:bg-white/20"
          >
            <ChevronRight className="h-6 w-6" />
          </button>
        )}

        <div
          ref={scrollRef}
          className="flex gap-5 overflow-x-auto px-8 pb-4 scrollbar-none"
          style={{ scrollbarWidth: "none" }}
        >
          {reels.map((reel) => (
            <motion.div
              key={reel.id}
              initial={{ opacity: 0, scale: 0.9 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5 }}
            >
              <ReelCard reel={reel} />
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
