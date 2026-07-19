"use client";

import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { Button } from "@/components/ui/button";
import { FadeIn } from "./animations";

export function CallToAction() {
  return (
    <section className="py-24 sm:py-32">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <FadeIn>
          <div className="relative overflow-hidden rounded-3xl bg-gold px-8 py-20 text-center sm:px-16">
            <div className="absolute -left-20 -top-20 h-64 w-64 rounded-full bg-white/10" />
            <div className="absolute -bottom-20 -right-20 h-64 w-64 rounded-full bg-white/10" />
            <div className="relative z-10">
              <h2 className="font-heading text-3xl font-bold text-white sm:text-4xl lg:text-5xl">
                Ready for Your Next Adventure?
              </h2>
              <p className="mx-auto mt-4 max-w-xl text-white/80">
                Let us craft a personalized Pakistan journey that matches your
                dreams. No templates, no compromises — just pure wanderlust
                brought to life.
              </p>
              <div className="mt-8 flex flex-col items-center justify-center gap-4 sm:flex-row">
                <Link href="/destinations">
                  <Button
                    size="lg"
                    className="rounded-full bg-white px-8 text-gold hover:bg-white/90"
                  >
                    Explore Tours
                    <ArrowRight className="ml-2 h-4 w-4" />
                  </Button>
                </Link>
                <Link href="/contact">
                  <Button
                    size="lg"
                    className="rounded-full border border-white/50 bg-transparent px-8 text-white hover:border-white/80 hover:bg-white/10"
                  >
                    Contact Us
                  </Button>
                </Link>
              </div>
            </div>
          </div>
        </FadeIn>
      </div>
    </section>
  );
}
