"use client";

import Image from "next/image";
import { useEffect, useState, useCallback } from "react";
import { buildImageUrl } from "@/lib/image";
import { motion, AnimatePresence } from "framer-motion";
import { Star, ChevronLeft, ChevronRight, Quote, X, Upload, Loader2 } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { FadeIn } from "./animations";
import { Testimonial } from "@/types";

const MAX_CHARS = 200;

export function Testimonials({ testimonials: data }: { testimonials?: Testimonial[] }) {
  const [testimonials, setTestimonials] = useState<Testimonial[]>(data ?? []);
  const [current, setCurrent] = useState(0);
  const [direction, setDirection] = useState(0);
  const [hasInteracted, setHasInteracted] = useState(false);

  const [reviewOpen, setReviewOpen] = useState(false);
  const [reviewName, setReviewName] = useState("");
  const [reviewRating, setReviewRating] = useState(0);
  const [reviewHover, setReviewHover] = useState(0);
  const [reviewText, setReviewText] = useState("");
  const [reviewAvatar, setReviewAvatar] = useState("");
  const [reviewUploading, setReviewUploading] = useState(false);
  const [reviewSaving, setReviewSaving] = useState(false);
  const [reviewSubmitted, setReviewSubmitted] = useState(false);
  const [reviewError, setReviewError] = useState<string | null>(null);

  useEffect(() => {
    if (data) return;
    fetch("/api/testimonials?status=approved")
      .then((r) => r.json())
      .then((data) => {
        if (Array.isArray(data)) setTestimonials(data);
        else setTestimonials([]);
      })
      .catch(() => setTestimonials([]));
  }, [data]);

  const next = useCallback(() => {
    setDirection(1);
    setHasInteracted(true);
    setCurrent((prev) => (prev + 1) % testimonials.length);
  }, [testimonials.length]);

  const prev = useCallback(() => {
    setDirection(-1);
    setHasInteracted(true);
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

  const handleAvatarUpload = async (file: File) => {
    setReviewUploading(true);
    try {
      const body = new FormData();
      body.append("file", file);
      const res = await fetch("/api/upload", { method: "POST", body });
      const data = await res.json();
      if (res.ok && data.url) {
        setReviewAvatar(data.url);
      }
    } catch {
      // silent
    } finally {
      setReviewUploading(false);
    }
  };

  const charCount = reviewText.length;

  const handleSubmitReview = async () => {
    if (!reviewName.trim() || reviewRating === 0 || !reviewText.trim()) {
      setReviewError("Please fill in all required fields.");
      return;
    }
    setReviewSaving(true);
    setReviewError(null);
    try {
      const res = await fetch("/api/testimonials", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          name: reviewName.trim(),
          country: "",
          text: reviewText.trim(),
          rating: reviewRating,
          avatar: reviewAvatar,
          status: "pending",
        }),
      });
      if (res.ok) {
        setReviewSubmitted(true);
      } else {
        setReviewError("Something went wrong. Please try again.");
      }
    } catch {
      setReviewError("Network error. Please try again.");
    } finally {
      setReviewSaving(false);
    }
  };

  const closeReviewModal = () => {
    setReviewOpen(false);
    setReviewSubmitted(false);
    setReviewName("");
    setReviewRating(0);
    setReviewHover(0);
    setReviewText("");
    setReviewAvatar("");
    setReviewError(null);
  };

  const t = testimonials.length > 0
    ? testimonials[Math.min(current, testimonials.length - 1)]
    : null;

  return (
    <>
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
                438+
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

          {t && (
            <div className="relative mt-16 mx-auto max-w-3xl">
              <div className="overflow-hidden rounded-2xl border border-border bg-card p-8 sm:p-12">
                <Quote className="mb-4 h-10 w-10 text-gold/20" />
                <AnimatePresence custom={direction} mode="wait">
                  <motion.div
                    key={current}
                    custom={direction}
                    variants={variants}
                    initial={hasInteracted ? "enter" : false}
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
                          src={buildImageUrl(t.avatar, 96)}
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
                        {t.country && (
                          <div className="text-sm text-muted-foreground">
                            {t.country}
                          </div>
                        )}
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
          )}

          <div className="mt-10 text-center">
            <Button
              onClick={() => setReviewOpen(true)}
              className="rounded-full bg-gold px-6 text-white hover:bg-gold-dark"
            >
              Write a Review
            </Button>
          </div>
        </div>
      </section>

      {/* Review Modal */}
      <AnimatePresence>
        {reviewOpen && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-50 flex items-center justify-center bg-black/90 p-4"
            onClick={closeReviewModal}
          >
            <motion.div
              initial={{ scale: 0.9, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.9, opacity: 0 }}
              onClick={(e) => e.stopPropagation()}
              className="w-full max-w-md rounded-2xl bg-card p-6 shadow-2xl"
            >
              {reviewSubmitted ? (
                <div className="text-center py-8 space-y-4">
                  <div className="flex h-16 w-16 mx-auto items-center justify-center rounded-full bg-green-100">
                    <Star className="h-8 w-8 text-green-600" />
                  </div>
                  <h3 className="font-heading text-xl font-bold">Thank You!</h3>
                  <p className="text-sm text-muted-foreground">
                    Your review has been submitted and will appear on the site after admin approval.
                  </p>
                  <Button
                    onClick={closeReviewModal}
                    className="rounded-full bg-gold px-6 text-white hover:bg-gold-dark"
                  >
                    Done
                  </Button>
                </div>
              ) : (
                <>
                  <div className="flex items-center justify-between mb-5">
                    <h3 className="font-heading text-xl font-bold">Write a Review</h3>
                    <button
                      onClick={closeReviewModal}
                      className="text-muted-foreground hover:text-foreground"
                    >
                      <X className="h-5 w-5" />
                    </button>
                  </div>

                  <div className="space-y-4">
                    {/* Avatar */}
                    <div className="space-y-1">
                      <label className="text-sm font-medium">Photo (optional)</label>
                      <div className="flex items-center gap-3">
                        {reviewAvatar ? (
                          <div className="relative">
                            <img
                              src={reviewAvatar}
                              alt="Avatar"
                              className="h-14 w-14 rounded-full object-cover border border-border"
                            />
                            <button
                              type="button"
                              onClick={() => setReviewAvatar("")}
                              className="absolute -top-1 -right-1 bg-black/60 text-white rounded-full p-0.5"
                            >
                              <X className="h-3 w-3" />
                            </button>
                          </div>
                        ) : null}
                        <label className="cursor-pointer">
                          <span className="inline-flex items-center gap-1.5 rounded-lg border border-dashed border-border px-3 py-1.5 text-xs text-muted-foreground hover:border-gold/50 hover:text-gold transition-colors">
                            <Upload className="h-3.5 w-3.5" />
                            {reviewUploading ? "Uploading..." : "Upload photo"}
                          </span>
                          <input
                            type="file"
                            accept="image/*"
                            className="hidden"
                            disabled={reviewUploading}
                            onChange={(e) => {
                              const file = e.target.files?.[0];
                              if (file) handleAvatarUpload(file);
                            }}
                          />
                        </label>
                      </div>
                    </div>

                    {/* Name */}
                    <div className="space-y-1">
                      <label className="text-sm font-medium">Name *</label>
                      <Input
                        value={reviewName}
                        onChange={(e) => setReviewName(e.target.value)}
                        placeholder="Your name"
                      />
                    </div>

                    {/* Stars */}
                    <div className="space-y-1">
                      <label className="text-sm font-medium">Rating *</label>
                      <div className="flex gap-1">
                        {[1, 2, 3, 4, 5].map((star) => (
                          <button
                            key={star}
                            type="button"
                            onMouseEnter={() => setReviewHover(star)}
                            onMouseLeave={() => setReviewHover(0)}
                            onClick={() => setReviewRating(star)}
                            className="p-0.5"
                          >
                            <Star
                              className={`h-7 w-7 transition-colors ${
                                star <= (reviewHover || reviewRating)
                                  ? "fill-gold text-gold"
                                  : "text-muted-foreground"
                              }`}
                            />
                          </button>
                        ))}
                      </div>
                    </div>

                    {/* Review text */}
                    <div className="space-y-1">
                      <label className="text-sm font-medium">
                        Review *{" "}
                        <span className="text-muted-foreground font-normal">
                          ({charCount}/{MAX_CHARS} characters)
                        </span>
                      </label>
                      <textarea
                        className="w-full min-h-[80px] rounded-lg border border-input bg-transparent px-3 py-2 text-sm"
                        value={reviewText}
                        onChange={(e) => setReviewText(e.target.value)}
                        maxLength={MAX_CHARS}
                        placeholder="Share your experience..."
                      />
                    </div>

                    {reviewError && (
                      <p className="text-xs text-red-500">{reviewError}</p>
                    )}

                    <div className="flex justify-end gap-2 pt-2">
                      <Button variant="outline" onClick={closeReviewModal}>
                        Cancel
                      </Button>
                      <Button
                        onClick={handleSubmitReview}
                        disabled={
                          reviewSaving ||
                          reviewUploading ||
                          !reviewName.trim() ||
                          reviewRating === 0 ||
                          !reviewText.trim()
                        }
                        className="rounded-full bg-gold px-5 text-white hover:bg-gold-dark"
                      >
                        {reviewSaving && <Loader2 className="size-4 animate-spin mr-1" />}
                        Submit Review
                      </Button>
                    </div>
                  </div>
                </>
              )}
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
