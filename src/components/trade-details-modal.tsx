"use client";

import { useEffect, useState } from "react";
import {
  Plane,
  Compass,
  MapPin,
  CalendarCheck,
  BadgePercent,
  LifeBuoy,
  Bus,
  ShieldCheck,
  HeartHandshake,
  MessageSquareText,
  Megaphone,
  ClipboardList,
  X,
  MessageCircle,
  type LucideIcon,
} from "lucide-react";

const tradePartners = [
  { icon: Plane, title: "Travel Agencies" },
  { icon: Compass, title: "Tour Operators" },
  { icon: MapPin, title: "Content Creators" },
];

type TradeItem = { icon: LucideIcon; title: string; description: string };

const tradeOffers: TradeItem[] = [
  {
    icon: CalendarCheck,
    title: "Custom Itineraries",
    description:
      "Itineraries designed around your clients' preferences, group size and budget.",
  },
  {
    icon: BadgePercent,
    title: "Exclusive B2B Rates",
    description:
      "Tailored trade rates based on your volume, group size and collaboration.",
  },
  {
    icon: LifeBuoy,
    title: "Dedicated Local Support",
    description:
      "A dedicated team on the ground before and throughout every tour.",
  },
  {
    icon: Bus,
    title: "Full Logistics",
    description:
      "Reliable transport, accommodation, permits and on-ground logistics handled for you.",
  },
  {
    icon: ShieldCheck,
    title: "Professional Guides",
    description:
      "Experienced, trusted guides who represent your brand and clients well.",
  },
  {
    icon: HeartHandshake,
    title: "Long-Term Partnership",
    description:
      "A reliable partner you can count on for recurring client bookings.",
  },
];

const tradeExpectations: TradeItem[] = [
  {
    icon: MessageSquareText,
    title: "Clear Communication",
    description: "Share client requirements and keep communication open throughout the booking.",
  },
  {
    icon: CalendarCheck,
    title: "Timely Bookings",
    description: "Confirm bookings and client details in advance so we can plan smoothly.",
  },
  {
    icon: ShieldCheck,
    title: "Professional Conduct",
    description: "Represent Terra Pakistan with integrity and professionalism at all times.",
  },
  {
    icon: Megaphone,
    title: "Honest Promotion",
    description: "Promote destinations accurately and set honest expectations for your clients.",
  },
  {
    icon: ClipboardList,
    title: "Valuable Feedback",
    description: "Share feedback from your clients to help us keep improving our experiences.",
  },
];

const WHATSAPP_URL =
  "https://wa.me/923146605966?text=" +
  encodeURIComponent(
    "Hi Terra Pakistan! I'd like to become a trade partner. Here are my details:"
  );

export function TradeDetailsModal() {
  const [open, setOpen] = useState(false);

  useEffect(() => {
    if (open) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "";
    }
    return () => {
      document.body.style.overflow = "";
    };
  }, [open]);

  useEffect(() => {
    if (!open) return;
    const handleKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") setOpen(false);
    };
    window.addEventListener("keydown", handleKey);
    return () => window.removeEventListener("keydown", handleKey);
  }, [open]);

  return (
    <>
      <div className="mt-12 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
        {tradePartners.map((partner) => (
          <div
            key={partner.title}
            className="group flex h-full flex-col items-center gap-4 rounded-2xl border border-border bg-card p-8 text-center transition-all duration-500 hover:border-gold/30 hover:shadow-xl"
          >
            <div className="flex h-14 w-14 items-center justify-center rounded-2xl bg-gold/10 text-gold transition-colors group-hover:bg-gold group-hover:text-white">
              <partner.icon className="h-7 w-7" />
            </div>
            <h3 className="font-heading text-lg font-semibold">
              {partner.title}
            </h3>
            <button
              onClick={() => setOpen(true)}
              className="mt-auto inline-flex items-center justify-center rounded-full bg-gold/10 px-5 py-2 text-sm font-semibold text-gold transition-colors hover:bg-gold hover:text-white"
            >
              View All Details
            </button>
          </div>
        ))}
      </div>

      {open && (
        <div
          className="fixed inset-0 z-[60] overflow-y-auto bg-black/70 p-4 sm:p-8"
          onClick={() => setOpen(false)}
        >
          <div
            className="mx-auto my-4 max-w-5xl rounded-3xl bg-card p-6 sm:p-10"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="flex items-start justify-between gap-4">
              <div>
                <span className="text-sm font-semibold uppercase tracking-wider text-gold">
                  Trade Partners
                </span>
                <h3 className="mt-1 font-heading text-2xl font-bold tracking-tight sm:text-3xl">
                  Travel Trade Partnerships
                </h3>
              </div>
              <button
                onClick={() => setOpen(false)}
                aria-label="Close details"
                className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full border border-border text-muted-foreground transition-all hover:border-gold hover:text-gold"
              >
                <X className="h-5 w-5" />
              </button>
            </div>

            <div className="mt-8 grid gap-10 lg:grid-cols-2">
              <div>
                <h4 className="font-heading text-xl font-bold tracking-tight">
                  What We Offer
                </h4>
                <div className="mt-5 space-y-4">
                  {tradeOffers.map((offer) => (
                    <div
                      key={offer.title}
                      className="flex items-start gap-4 rounded-xl border border-border bg-card p-5 transition-all duration-300 hover:border-gold/30"
                    >
                      <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-xl bg-gold/10 text-gold">
                        <offer.icon className="h-5 w-5" />
                      </div>
                      <div>
                        <h5 className="font-heading text-base font-semibold">
                          {offer.title}
                        </h5>
                        <p className="mt-1 text-sm leading-relaxed text-muted-foreground">
                          {offer.description}
                        </p>
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              <div>
                <h4 className="font-heading text-xl font-bold tracking-tight">
                  What We Expect
                </h4>
                <div className="mt-5 space-y-4">
                  {tradeExpectations.map((expectation) => (
                    <div
                      key={expectation.title}
                      className="flex items-start gap-4 rounded-xl border border-border bg-card p-5 transition-all duration-300 hover:border-gold/30"
                    >
                      <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-xl bg-gold/10 text-gold">
                        <expectation.icon className="h-5 w-5" />
                      </div>
                      <div>
                        <h5 className="font-heading text-base font-semibold">
                          {expectation.title}
                        </h5>
                        <p className="mt-1 text-sm leading-relaxed text-muted-foreground">
                          {expectation.description}
                        </p>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>

            <div className="mt-10 flex justify-center">
              <a
                href={WHATSAPP_URL}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center justify-center gap-2 rounded-full bg-gold px-8 py-3 text-base font-semibold text-white transition-colors hover:bg-gold/90"
              >
                <MessageCircle className="h-5 w-5" />
                WhatsApp Us
              </a>
            </div>
          </div>
        </div>
      )}
    </>
  );
}
