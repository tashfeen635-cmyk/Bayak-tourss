"use client";

import { motion } from "framer-motion";
import { ChevronDown } from "lucide-react";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import { Counter } from "./counter";
import { stats } from "@/data";

export function Hero() {
  return (
    <section className="relative flex min-h-screen items-center justify-center pb-20">
      <video
        autoPlay
        muted
        loop
        playsInline
        poster="https://images.unsplash.com/photo-1506905925346-21bda4d32df4?w=1920&q=80"
        className="absolute inset-0 h-full w-full object-cover"
      >
        <source
          src="https://assets.mixkit.co/videos/preview/mixkit-set-of-plateaus-in-the-middle-of-a-valley-2607-large.mp4"
          type="video/mp4"
        />
      </video>
      <div className="relative z-10 mx-auto max-w-5xl px-4 text-center sm:px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
        >
          <span className="mb-6 inline-block rounded-full border border-gold/40 bg-gold/10 px-5 py-2 text-sm font-medium tracking-wider text-gold backdrop-blur-sm invisible">
            PAKISTAN&apos;S #1 TRAVEL COMPANY
          </span>
        </motion.div>

        <motion.h1
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.15, ease: [0.22, 1, 0.36, 1] }}
          className="font-heading text-5xl font-bold leading-tight tracking-tight text-white sm:text-6xl md:text-7xl lg:text-8xl"
        >
          Discover Pakistan
          <br />
          <span className="text-gold">Like Never Before</span>
        </motion.h1>

        <motion.p
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.3, ease: [0.22, 1, 0.36, 1] }}
          className="mx-auto mt-6 max-w-2xl text-lg leading-relaxed text-white/70 sm:text-xl"
        >
          Adventure, Culture &amp; Unforgettable Experiences with Bayak Tours
        </motion.p>

        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.45, ease: [0.22, 1, 0.36, 1] }}
          className="mt-10 flex flex-col items-center justify-center gap-4 sm:flex-row"
        >
          <Link href="/tours">
            <Button
              size="lg"
              className="rounded-full bg-gold px-8 text-base text-white hover:bg-gold-dark"
            >
              Explore Tours
            </Button>
          </Link>
          <Link href="/contact">
            <Button
              size="lg"
              className="rounded-full border border-white/30 bg-transparent px-8 text-base text-white hover:border-white/60 hover:bg-white/10"
            >
              Contact Us
            </Button>
          </Link>
        </motion.div>
      </div>

      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1.2, duration: 1 }}
        className="absolute bottom-8 left-1/2 -translate-x-1/2"
      >
        <motion.div
          animate={{ y: [0, 8, 0] }}
          transition={{ repeat: Infinity, duration: 1.5 }}
        >
          <ChevronDown className="h-6 w-6 text-white/50" />
        </motion.div>
      </motion.div>

      <div className="absolute bottom-0 left-0 right-0 z-20 translate-y-1/2 px-4 sm:px-6 lg:px-8">
        <div className="mx-auto max-w-4xl">
          <div className="grid grid-cols-2 gap-4 rounded-2xl bg-white/95 p-6 shadow-2xl backdrop-blur-sm sm:grid-cols-4 sm:gap-0 sm:divide-x sm:divide-border dark:bg-charcoal/95">
            {stats.map((stat) => (
              <div key={stat.label} className="px-4 text-center">
                <div className="font-heading text-3xl font-bold text-gold sm:text-4xl">
                  <Counter target={stat.value} suffix="+" />
                </div>
                <div className="mt-1 text-sm text-muted-foreground">
                  {stat.label}
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
