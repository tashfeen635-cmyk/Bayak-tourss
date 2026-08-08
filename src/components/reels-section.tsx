"use client";

import { useRef, useState, useEffect, useCallback } from "react";
import { motion } from "framer-motion";
import { Play, ChevronLeft, ChevronRight, X, Loader2 } from "lucide-react";
import { FadeIn } from "./animations";
import { reels } from "@/data";

export function ReelsSection() {
  const scrollRef = useRef<HTMLDivElement>(null);
  const mobileScrollRef = useRef<HTMLDivElement>(null);
  const reelRefs = useRef<(HTMLDivElement | null)[]>([]);
  const cardRefs = useRef<(HTMLDivElement | null)[]>([]);
  const lightboxVideoRefs = useRef<(HTMLVideoElement | null)[]>([]);
  const desktopVideoRef = useRef<HTMLVideoElement | null>(null);
  const cardVideoRefs = useRef<(HTMLVideoElement | null)[]>([]);
  const [canScrollLeft, setCanScrollLeft] = useState(false);
  const [canScrollRight, setCanScrollRight] = useState(true);
  const [selected, setSelected] = useState<number | null>(null);
  const [videoLoading, setVideoLoading] = useState(true);
  const [loadedPosters, setLoadedPosters] = useState<boolean[]>(() =>
    reels.map(() => false)
  );
  const [mobileLoading, setMobileLoading] = useState<boolean[]>(() =>
    reels.map(() => true)
  );

  const loadPoster = useCallback((i: number) => {
    setLoadedPosters((prev) =>
      prev[i] ? prev : prev.map((loaded, idx) => (idx === i ? true : loaded))
    );
  }, []);

  const updateMobileLoading = useCallback((i: number, loading: boolean) => {
    setMobileLoading((prev) => {
      const next = [...prev];
      next[i] = loading;
      return next;
    });
  }, []);

  const isDesktop = useCallback(() =>
    typeof window !== "undefined" && window.matchMedia("(min-width: 640px)").matches, []);

  const getActiveVideo = useCallback(() => {
    if (isDesktop()) return desktopVideoRef.current;
    if (selected === null) return null;
    return lightboxVideoRefs.current[selected];
  }, [selected, isDesktop]);

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

  const scroll = useCallback((direction: "left" | "right") => {
    const el = scrollRef.current;
    if (!el) return;
    const amount = 340;
    el.scrollBy({ left: direction === "left" ? -amount : amount, behavior: "smooth" });
  }, []);

  const preloadVideo = useCallback((i: number) => {
    const video = cardVideoRefs.current[i];
    if (!video) return;
    video.preload = "auto";
    video.load();
  }, []);

  useEffect(() => {
    const el = scrollRef.current;
    if (!el) return;
    const observer = new IntersectionObserver(
      (entries) => {
        for (const entry of entries) {
          if (entry.isIntersecting) {
            const index = cardRefs.current.indexOf(entry.target as HTMLDivElement);
            if (index !== -1) loadPoster(index);
          }
        }
      },
      { root: el, rootMargin: "600px" }
    );
    cardRefs.current.forEach((card) => {
      if (card) observer.observe(card);
    });
    return () => observer.disconnect();
  }, [loadPoster]);

  useEffect(() => {
    setVideoLoading(true);
  }, [selected]);

  const toggleLightboxVideo = useCallback(() => {
    const video = getActiveVideo();
    if (!video) return;
    if (video.paused) {
      video.play().catch(() => {});
    } else {
      video.pause();
    }
  }, [getActiveVideo]);

  const goNext = useCallback(() => {
    if (selected === null) return;
    const prevVideo = getActiveVideo();
    if (prevVideo) prevVideo.pause();
    setSelected((selected + 1) % reels.length);
  }, [selected, getActiveVideo, reels.length]);

  const goPrev = useCallback(() => {
    if (selected === null) return;
    const prevVideo = getActiveVideo();
    if (prevVideo) prevVideo.pause();
    setSelected((selected - 1 + reels.length) % reels.length);
  }, [selected, getActiveVideo, reels.length]);

  useEffect(() => {
    if (selected !== null) return;
    const handleKey = (e: KeyboardEvent) => {
      if (e.key === "ArrowRight") scroll("right");
      if (e.key === "ArrowLeft") scroll("left");
    };
    window.addEventListener("keydown", handleKey);
    return () => window.removeEventListener("keydown", handleKey);
  }, [scroll, selected]);

  useEffect(() => {
    if (selected === null) return;
    const handleKey = (e: KeyboardEvent) => {
      if (e.key === "ArrowRight") goNext();
      if (e.key === "ArrowLeft") goPrev();
      if (e.key === "Escape") {
        const video = getActiveVideo();
        if (video) video.pause();
        setSelected(null);
      }
    };
    window.addEventListener("keydown", handleKey);
    return () => window.removeEventListener("keydown", handleKey);
  }, [selected, goNext, goPrev, getActiveVideo]);

  useEffect(() => {
    if (selected !== null) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "";
    }
    return () => { document.body.style.overflow = ""; };
  }, [selected]);

  useEffect(() => {
    if (selected === null) return;
    if (isDesktop()) return;
    const mobileEl = mobileScrollRef.current;
    if (!mobileEl) return;

    const observer = new IntersectionObserver(
      (entries) => {
        for (const entry of entries) {
          if (entry.isIntersecting) {
            const index = reelRefs.current.indexOf(entry.target as HTMLDivElement);
            if (index !== -1) {
              setSelected(index);
            }
          }
        }
      },
      { root: mobileEl, threshold: 0.6 }
    );

    reelRefs.current.forEach((el) => {
      if (el) observer.observe(el);
    });

    return () => observer.disconnect();
  }, [selected, isDesktop]);

  useEffect(() => {
    if (selected === null) return;
    if (isDesktop()) return;
    const mobileEl = mobileScrollRef.current;
    if (!mobileEl) return;
    const target = reelRefs.current[selected];
    if (target) {
      target.scrollIntoView({ behavior: "smooth", block: "start" });
    }
  }, [selected, isDesktop]);

  useEffect(() => {
    if (selected === null) return;
    const video = getActiveVideo();
    if (!video) return;
    video.currentTime = 0;
    video.play().catch(() => {});
  }, [selected, getActiveVideo]);

  useEffect(() => {
    if (selected === null) return;
    if (isDesktop()) return;
    const mobileEl = mobileScrollRef.current;
    if (!mobileEl) return;

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          const video = entry.target as HTMLVideoElement;
          if (entry.isIntersecting) {
            video.play().catch(() => {});
          } else {
            video.pause();
          }
        });
      },
      { root: mobileEl, threshold: 0.6 }
    );

    lightboxVideoRefs.current.forEach((video) => {
      if (video) observer.observe(video);
    });

    return () => observer.disconnect();
  }, [selected, isDesktop]);

  return (
    <section className="bg-[wheat] py-24 sm:py-32">
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
          className="flex flex-row gap-5 overflow-x-auto px-4 pb-4 scrollbar-none sm:px-8"
          style={{ scrollbarWidth: "none", WebkitOverflowScrolling: "touch" }}
        >
          {reels.map((reel, i) => (
            <motion.div
              key={reel.id}
              initial={{ opacity: 0, scale: 0.9 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5 }}
            >
              <div
                ref={(el) => { cardRefs.current[i] = el; }}
                onClick={() => setSelected(i)}
                onMouseEnter={() => preloadVideo(i)}
                className="group relative h-[400px] w-[280px] shrink-0 cursor-pointer overflow-hidden rounded-3xl bg-charcoal sm:h-[560px] sm:w-[320px]"
              >
                <div className="absolute inset-0 transition-transform duration-700 group-hover:scale-105">
                  <video
                    ref={(el) => { cardVideoRefs.current[i] = el; }}
                    src={reel.video}
                    poster={loadedPosters[i] ? reel.poster : undefined}
                    className="absolute inset-0 h-full w-full object-cover"
                    muted
                    loop
                    playsInline
                    preload="none"
                  />
                </div>
                <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/20 to-transparent" />

                <div className="absolute inset-0 z-10 flex items-center justify-center">
                  <div className="flex h-16 w-16 items-center justify-center rounded-full bg-white/20 text-white backdrop-blur-sm transition-transform duration-300 group-hover:scale-110">
                    <Play className="ml-1 h-7 w-7" />
                  </div>
                </div>

                <div className="absolute bottom-0 left-0 right-0 z-20 p-5">
                  <h3 className="font-heading text-xl font-bold text-white">
                    {reel.destination}
                  </h3>
                  <p className="mt-1 text-sm text-white/70">{reel.description}</p>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>

      {selected !== null && (
          <div className="fixed inset-0 z-50 bg-black">
            <button
              className="absolute right-4 top-4 z-50 flex h-10 w-10 items-center justify-center rounded-full bg-black/70 text-white/90 transition-all duration-200 hover:scale-110 hover:bg-black hover:text-white"
              onClick={() => {
                const video = getActiveVideo();
                if (video) video.pause();
                setSelected(null);
              }}
            >
              <X className="h-5 w-5" />
            </button>

            <div className="hidden sm:flex sm:items-center sm:justify-center sm:h-full">
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

              <div className="relative h-[560px] w-[320px] overflow-hidden rounded-3xl">
                {videoLoading && (
                  <div className="absolute inset-0 z-20 flex items-center justify-center bg-black">
                    <Loader2 className="h-10 w-10 animate-spin text-white/70" />
                  </div>
                )}
                <video
                  key={selected}
                  src={reels[selected].video}
                  poster={reels[selected].poster}
                  className="absolute inset-0 h-full w-full object-cover"
                  loop
                  playsInline
                  preload="metadata"
                  onWaiting={() => setVideoLoading(true)}
                  onCanPlay={() => setVideoLoading(false)}
                  ref={desktopVideoRef}
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/20 to-transparent" />

                <button
                  onClick={() => toggleLightboxVideo()}
                  className="absolute inset-0 z-10"
                  aria-label="Toggle play/pause"
                />

                <div className="absolute bottom-0 left-0 right-0 z-20 p-5">
                  <h3 className="font-heading text-xl font-bold text-white">
                    {reels[selected].destination}
                  </h3>
                  <p className="mt-1 text-sm text-white/70">{reels[selected].description}</p>
                </div>
              </div>
            </div>

            <div
              ref={mobileScrollRef}
              className="sm:hidden h-full overflow-y-scroll p-4"
              style={{ scrollSnapType: "y mandatory", scrollbarWidth: "none" }}
            >
              {reels.map((reel, i) => (
                <div
                  key={reel.id}
                  ref={(el) => { reelRefs.current[i] = el; }}
                  className="relative w-full shrink-0 overflow-hidden rounded-2xl"
                  style={{ scrollSnapAlign: "start", height: "calc(100dvh - 32px)" }}
                >
                  <video
                    src={reel.video}
                    poster={reel.poster}
                    className="absolute inset-0 h-full w-full object-cover"
                    loop
                    playsInline
                    preload="metadata"
                    onLoadStart={() => updateMobileLoading(i, true)}
                    onWaiting={() => updateMobileLoading(i, true)}
                    onPlaying={() => updateMobileLoading(i, false)}
                    onCanPlay={() => updateMobileLoading(i, false)}
                    ref={(el) => { lightboxVideoRefs.current[i] = el; }}
                  />
                  {mobileLoading[i] && selected === i && (
                    <div className="absolute inset-0 z-30 flex items-center justify-center bg-black">
                      <Loader2 className="h-10 w-10 animate-spin text-white/70" />
                    </div>
                  )}
                  <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/20 to-transparent" />

                  <button
                    onClick={() => {
                      const video = lightboxVideoRefs.current[i];
                      if (!video) return;
                      if (video.paused) {
                        video.play().catch(() => {});
                      } else {
                        video.pause();
                      }
                    }}
                    className="absolute inset-0 z-10"
                    aria-label="Toggle play/pause"
                  />

                  <div className="absolute bottom-0 left-0 right-0 z-20 p-5">
                    <h3 className="font-heading text-xl font-bold text-white">
                      {reel.destination}
                    </h3>
                    <p className="mt-1 text-sm text-white/70">{reel.description}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}
    </section>
  );
}
