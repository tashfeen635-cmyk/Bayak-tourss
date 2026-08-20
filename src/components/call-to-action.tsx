"use client";

import { useState } from "react";
import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { Button } from "@/components/ui/button";
import { FadeIn } from "./animations";
import { BookingModal } from "./booking-modal";

export function CallToAction() {
  const [bookingOpen, setBookingOpen] = useState(false);

  return (
    <section className="py-12 sm:py-24 md:py-32">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <FadeIn>
          <div className="relative overflow-hidden rounded-3xl bg-gold px-5 py-10 text-center sm:px-8 sm:py-16 md:px-16">
            <div className="absolute -left-20 -top-20 h-64 w-64 rounded-full bg-white/10" />
            <div className="absolute -bottom-20 -right-20 h-64 w-64 rounded-full bg-white/10" />
            <div className="relative z-10">
              <h2 className="font-heading text-3xl font-bold text-white sm:text-4xl lg:text-5xl">
                Create your own trip
              </h2>
              <p className="mx-auto mt-4 max-w-xl text-white/80">
                Let us craft a personalized Pakistan journey that matches your
                dreams. No templates, no compromises — just pure wanderlust
                brought to life.
              </p>
              <div className="mt-8 flex flex-col items-center justify-center gap-4 sm:flex-row">
                <Button
                  size="lg"
                  className="rounded-full bg-white px-8 text-gold hover:bg-white/90"
                  onClick={() => setBookingOpen(true)}
                >
                  Custom Trips
                  <ArrowRight className="ml-2 h-4 w-4" />
                </Button>
              </div>
            </div>
          </div>
        </FadeIn>
      </div>

      <BookingModal isOpen={bookingOpen} onClose={() => setBookingOpen(false)} apiEndpoint="/api/custom-trips" />
    </section>
  );
}
