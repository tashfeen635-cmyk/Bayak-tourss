"use client";

import { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import {
  Heart,
  Target,
  Eye,
  Award,
  Users,
  MapPin,
  Globe,
  ShieldCheck,
  Sparkles,
  ArrowRight,
  ChevronDown,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Counter } from "./counter";
import { FadeIn, StaggerContainer, StaggerItem } from "./animations";

const values = [
  {
    icon: Heart,
    title: "Passion for Pakistan",
    description:
      "We live and breathe Pakistan's beauty. Every recommendation comes from personal experience and genuine love for this land.",
  },
  {
    icon: ShieldCheck,
    title: "Safety First",
    description:
      "Your safety is non-negotiable. Verified accommodations, trained guides, and 24/7 support on every trip.",
  },
  {
    icon: Sparkles,
    title: "Authentic Experiences",
    description:
      "No tourist traps. We connect you with real culture, real people, and real moments that travel guides can't capture.",
  },
  {
    icon: Globe,
    title: "Sustainable Tourism",
    description:
      "We give back to every community we visit, ensuring tourism benefits locals and preserves natural beauty.",
  },
];

const milestones = [
  {
    year: "2021",
    title: "The Beginning",
    description:
      "Ahmed Khan founded Terra Pakistan from a small office in Islamabad with a dream to show the world Pakistan's true beauty.",
  },
  {
    year: "2022",
    title: "First 200 Travelers",
    description:
      "Reached our first 200 happy travelers, expanding routes to cover all of Gilgit-Baltistan and Khyber Pakhtunkhwa.",
  },
  {
    year: "2023",
    title: "International Recognition",
    description:
      "Featured in Lonely Planet and recognized by Pakistan's Ministry of Tourism as a top-tier travel operator.",
  },
  {
    year: "2024",
    title: "438+ Happy Travelers",
    description:
      "Crossed the milestone of 438 satisfied travelers from over 10 countries around the world.",
  },
  {
    year: "2024",
    title: "Expanding Horizons",
    description:
      "Launched luxury glamping experiences, cultural immersion programs, and sustainable tourism initiatives.",
  },
];

const aboutStats = [
  { label: "Years of Experience", value: 5, suffix: "+" },
  { label: "Happy Travelers", value: 438, suffix: "+" },
  { label: "Destinations Covered", value: 11, suffix: "" },
  { label: "Team Members", value: 35, suffix: "+" },
];

const faqs = [
  {
    question: "What does Terra mean?",
    answer:
      "Terra comes from the Latin word for \"earth\" or \"land.\" Paired with \"Pakistan,\" it reflects our passion for this land — its soaring mountains, turquoise lakes and warm people — and our mission to share it with the world.",
  },
  {
    question: "What is Terra Pakistan?",
    answer:
      "Terra Pakistan is Pakistan's premier travel company, founded in 2021. We specialize in crafting premium travel experiences to Pakistan's most breathtaking destinations including Hunza Valley, Skardu, Fairy Meadows, Naran Kaghan, Swat Valley, and more. We have served over 438 happy travelers from 40+ countries worldwide.",
  },
  {
    question: "Is Pakistan safe for tourists?",
    answer:
      "Yes, Pakistan is very safe for tourists, especially the northern regions like Gilgit-Baltistan and Khyber Pakhtunkhwa where most tourist destinations are located. The Pakistani government has invested heavily in tourist safety infrastructure. Terra Pakistan provides verified accommodations, experienced local guides, and 24/7 support to ensure a safe and comfortable journey.",
  },

  {
    question: "What are the best months to visit Pakistan?",
    answer:
      "The best time to visit Pakistan's northern areas is from April to October. May to September offers the most pleasant weather with clear skies, blooming meadows, and accessible mountain passes. August and September are ideal for trekking. Winter trips (December to February) are perfect for witnessing snow-covered landscapes in Skardu and Hunza.",
  },
  {
    question: "What destinations does Terra Pakistan cover?",
    answer:
      "Terra Pakistan covers 15+ destinations across Pakistan including Hunza Valley, Skardu, Fairy Meadows, Naran Kaghan, Swat Valley, Gilgit, Neelum Valley, Deosai Plains, and more. We offer adventure tours, family packages, honeymoon trips, cultural experiences, and luxury glamping across Gilgit-Baltistan, Khyber Pakhtunkhwa, and Azad Kashmir.",
  },
  {
    question: "Do I need a visa to visit Pakistan?",
    answer:
      "Most international travelers need a visa to visit Pakistan. Citizens of 50+ countries can apply for an e-Visa online through the Pakistan government portal. Some countries are eligible for visa-on-arrival. Terra Pakistan assists with visa guidance and provides invitation letters to help streamline your application process.",
  },
  {
    question: "What is included in Terra Pakistan packages?",
    answer:
      "Every Terra Pakistan package includes hotel or camping accommodation, daily meals, comfortable transport (4x4s or air-conditioned vehicles), a certified English-speaking local guide, and all planned activities. Some packages also include boat rides, trekking gear, and cultural experiences. Custom additions like photography services and premium upgrades are available on request.",
  },
  {
    question: "Can I customize my trip itinerary?",
    answer:
      "Absolutely. Terra Pakistan specializes in personalized itineraries. No trip is cookie-cutter — we tailor every journey to your interests, budget, group size, and travel pace. Whether you want an action-packed adventure, a relaxed family vacation, or a romantic honeymoon, our team will craft the perfect plan for you.",
  },
  {
    question: "Does Terra Pakistan offer group travel packages?",
    answer:
      "Yes, Terra Pakistan offers special group travel packages for families, corporate teams, school groups, and friend groups. Group discounts are available for parties of 6 or more. We handle all logistics including custom routes, group accommodations, team-building activities, and dedicated guides to ensure a seamless group experience.",
  },
  {
    question: "How do I book a trip with Terra Pakistan?",
    answer:
      `Booking a trip with Terra Pakistan is simple. You can reach us via our website contact form, WhatsApp at <a href="https://wa.me/923146605966" target="_blank" rel="noopener noreferrer" style="color: #B8860B; text-decoration: underline;">+92 314 6605966</a>, or email at <a href="mailto:info@terrapakistan.com" style="color: #B8860B; text-decoration: underline;">info@terrapakistan.com</a>. Share your preferred destination, travel dates, group size, and budget. Our team will create a customized itinerary and guide you through the booking process with secure payment options.`,
    isHtml: true,
  },
];

export function AboutContent() {
  const [openFaq, setOpenFaq] = useState<number | null>(null);

  const faqJsonLd = {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: faqs.map((faq) => ({
      "@type": "Question",
      name: faq.question,
      acceptedAnswer: {
        "@type": "Answer",
        text: faq.answer,
      },
    })),
  };

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(faqJsonLd) }}
      />
      <section className="relative flex min-h-[50vh] items-center justify-center overflow-hidden bg-charcoal">
        <div
          className="absolute inset-0 bg-cover bg-center opacity-30"
          style={{
            backgroundImage:
              "url('https://images.unsplash.com/photo-1464822759023-fed622ff2c3b?w=1920&q=80')",
          }}
        />
        <div className="relative z-10 px-4 text-center">
          <FadeIn>
            <h1 className="font-heading text-5xl font-bold text-white sm:text-6xl">
              About Terra Pakistan
            </h1>
            <p className="mx-auto mt-4 max-w-2xl text-white/60">
              Our story, our mission, and the passion that drives every journey
              we craft.
            </p>
          </FadeIn>
        </div>
      </section>

      <section className="py-20 sm:py-28">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="grid items-center gap-12 lg:grid-cols-2 lg:gap-20">
            <FadeIn direction="left">
              <div className="relative">
                <div className="relative overflow-hidden rounded-2xl shadow-2xl">
                  <Image
                    src="https://images.unsplash.com/photo-1506905925346-21bda4d32df4?w=800&q=80"
                    alt="Terra Pakistan team exploring Pakistan mountains"
                    width={800}
                    height={600}
                    className="h-auto w-full object-cover"
                  />
                </div>
                <div className="absolute -bottom-6 -right-6 rounded-2xl bg-gold p-6 text-white shadow-xl sm:-bottom-8 sm:-right-8">
                  <div className="font-heading text-3xl font-bold">5+</div>
                  <div className="text-sm text-white/80">Years of Excellence</div>
                </div>
              </div>
            </FadeIn>

            <div>
              <FadeIn direction="right">
                <span className="text-sm font-semibold uppercase tracking-wider text-gold">
                  Our Story
                </span>
                <h2 className="mt-3 font-heading text-3xl font-bold tracking-tight sm:text-4xl">
                  Born From a Love of Pakistan
                </h2>
                <p className="mt-4 text-muted-foreground">
                  Terra Pakistan was founded in 2021 by Ahmed Khan, a lifelong
                  mountaineer and travel enthusiast who saw the incredible beauty
                  of Pakistan going unnoticed by the world. What started as a
                  small team of passionate guides has grown into Pakistan&apos;s
                  most trusted travel company.
                </p>
                <p className="mt-4 text-muted-foreground">
                  From the soaring peaks of the Karakoram to the lush valleys of
                  Swat, we&apos;ve dedicated ourselves to crafting journeys that
                  don&apos;t just show you Pakistan — they let you experience it
                  with all your senses.
                </p>
              </FadeIn>
              <FadeIn direction="right" delay={0.1}>
                <Link href="/tours">
                  <Button className="mt-8 rounded-full bg-gold px-6 text-white hover:bg-gold-dark">
                    Explore Our Trips
                    <ArrowRight className="ml-2 h-4 w-4" />
                  </Button>
                </Link>
              </FadeIn>
            </div>
          </div>
        </div>
      </section>

      <section className="bg-sand py-20 dark:bg-charcoal/50 sm:py-28">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <FadeIn className="text-center">
            <span className="text-sm font-semibold uppercase tracking-wider text-gold">
              Our Mission
            </span>
            <h2 className="mt-3 font-heading text-3xl font-bold tracking-tight sm:text-4xl">
              What Drives Us Every Day
            </h2>
          </FadeIn>

          <div className="mt-16 grid gap-8 sm:grid-cols-2 lg:grid-cols-4">
            {values.map((value, i) => (
              <FadeIn key={value.title} delay={i * 0.1}>
                <div className="group relative overflow-hidden rounded-2xl border border-border bg-card p-8 text-center transition-all duration-500 hover:border-gold/30 hover:shadow-xl">
                  <div className="absolute -right-10 -top-10 h-32 w-32 rounded-full bg-gold/5 transition-all duration-500 group-hover:scale-150 group-hover:bg-gold/10" />
                  <div className="relative z-10">
                    <div className="mx-auto flex h-14 w-14 items-center justify-center rounded-xl bg-gold/10 text-gold transition-colors group-hover:bg-gold group-hover:text-white">
                      <value.icon className="h-7 w-7" />
                    </div>
                    <h3 className="mt-6 font-heading text-xl font-semibold">
                      {value.title}
                    </h3>
                    <p className="mt-3 text-sm leading-relaxed text-muted-foreground">
                      {value.description}
                    </p>
                  </div>
                </div>
              </FadeIn>
            ))}
          </div>
        </div>
      </section>

      <section className="py-20 sm:py-28">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <FadeIn className="text-center">
            <span className="text-sm font-semibold uppercase tracking-wider text-gold">
              Our Journey
            </span>
            <h2 className="mt-3 font-heading text-3xl font-bold tracking-tight sm:text-4xl">
              Milestones That Define Us
            </h2>
          </FadeIn>

          <div className="relative mt-16">
            <div className="absolute left-4 top-0 h-full w-px bg-border sm:left-1/2 sm:-translate-x-px" />

            {milestones.map((m, i) => (
              <div key={m.year} className="relative mb-12 last:mb-0">
                <FadeIn
                  direction={i % 2 === 0 ? "left" : "right"}
                  delay={i * 0.1}
                  className={`flex flex-col sm:flex-row ${
                    i % 2 === 0 ? "sm:flex-row" : "sm:flex-row-reverse"
                  } items-start gap-8`}
                >
                  <div className={`flex-1 ${i % 2 === 0 ? "sm:text-right" : "sm:text-left"}`}>
                    <span className="inline-block rounded-full bg-gold/10 px-4 py-1.5 text-sm font-bold text-gold">
                      {m.year}
                    </span>
                    <h3 className="mt-3 font-heading text-xl font-semibold">
                      {m.title}
                    </h3>
                    <p className="mt-2 text-sm leading-relaxed text-muted-foreground">
                      {m.description}
                    </p>
                  </div>
                  <div className="absolute left-4 top-1 h-4 w-4 -translate-x-1/2 rounded-full border-2 border-gold bg-background sm:relative sm:left-auto sm:top-auto sm:translate-x-0" />
                  <div className="hidden flex-1 sm:block" />
                </FadeIn>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="bg-charcoal py-20 sm:py-28">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <StaggerContainer className="grid grid-cols-2 gap-8 lg:grid-cols-4">
            {aboutStats.map((stat) => (
              <StaggerItem key={stat.label}>
                <div className="text-center">
                  <div className="font-heading text-4xl font-bold text-gold sm:text-5xl">
                    <Counter target={stat.value} suffix={stat.suffix} />
                  </div>
                  <div className="mt-2 text-sm text-white/60">{stat.label}</div>
                </div>
              </StaggerItem>
            ))}
          </StaggerContainer>
        </div>
      </section>

      <section className="py-20 sm:py-28">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="grid items-center gap-12 lg:grid-cols-2 lg:gap-20">
            <div className="order-2 lg:order-1">
              <FadeIn direction="left">
                <span className="text-sm font-semibold uppercase tracking-wider text-gold">
                  Why Pakistan
                </span>
                <h2 className="mt-3 font-heading text-3xl font-bold tracking-tight sm:text-4xl">
                  A Hidden Gem Waiting to Be Discovered
                </h2>
                <p className="mt-4 text-muted-foreground">
                  Pakistan is home to some of the world&apos;s most dramatic
                  landscapes — from the world&apos;s highest peaks to ancient
                  silk route cities, turquoise lakes, and deserts that stretch
                  to the horizon. Yet it remains one of the most underrated
                  travel destinations on Earth.
                </p>
                <p className="mt-4 text-muted-foreground">
                  At Terra Pakistan, we believe everyone deserves to experience
                  the warmth of Pakistani hospitality, the grandeur of the
                  Karakoram, and the magic of a land where every corner holds
                  a new adventure.
                </p>
              </FadeIn>
            </div>
            <div className="relative order-1 lg:order-2">
              <FadeIn direction="right">
                <div className="relative overflow-hidden rounded-2xl shadow-2xl">
                  <Image
                    src="https://images.unsplash.com/photo-1531761535209-180857e963b9?w=800&q=80"
                    alt="Scenic view of Skardu, Pakistan"
                    width={800}
                    height={600}
                    className="h-auto w-full object-cover"
                  />
                </div>
              </FadeIn>
            </div>
          </div>
        </div>
      </section>

      <section className="py-20 sm:py-28">
        <div className="mx-auto max-w-4xl px-4 sm:px-6 lg:px-8">
          <FadeIn className="text-center">
            <span className="text-sm font-semibold uppercase tracking-wider text-gold">
              Frequently Asked Questions
            </span>
            <h2 className="mt-3 font-heading text-3xl font-bold tracking-tight sm:text-4xl">
              Got Questions? We&apos;ve Got Answers
            </h2>
            <p className="mx-auto mt-4 max-w-2xl text-muted-foreground">
              Everything you need to know about traveling to Pakistan with
              Terra Pakistan. Can&apos;t find what you&apos;re looking for?{" "}
              <Link href="/contact" className="text-gold hover:underline">
                Contact us
              </Link>
              .
            </p>
          </FadeIn>

          <div className="mt-12 space-y-3">
            {faqs.map((faq, i) => (
              <FadeIn key={i} delay={i * 0.05}>
                <div className="overflow-hidden rounded-xl border border-border bg-card transition-all duration-300 hover:border-gold/30">
                  <button
                    onClick={() => setOpenFaq(openFaq === i ? null : i)}
                    className="flex w-full items-center justify-between gap-4 px-6 py-5 text-left"
                  >
                    <h3 className="font-heading text-base font-semibold sm:text-lg">
                      {faq.question}
                    </h3>
                    <ChevronDown
                      className={`h-5 w-5 shrink-0 text-gold transition-transform duration-300 ${
                        openFaq === i ? "rotate-180" : ""
                      }`}
                    />
                  </button>
                  <div
                    className={`grid transition-all duration-300 ease-in-out ${
                      openFaq === i
                        ? "grid-rows-[1fr] opacity-100"
                        : "grid-rows-[0fr] opacity-0"
                    }`}
                  >
                    <div className="overflow-hidden">
                      <div className="px-6 pb-5 text-sm leading-relaxed text-muted-foreground">
                        {faq.isHtml ? (
                          <span dangerouslySetInnerHTML={{ __html: faq.answer }} />
                        ) : (
                          faq.answer
                        )}
                      </div>
                    </div>
                  </div>
                </div>
              </FadeIn>
            ))}
          </div>
        </div>
      </section>

      <section className="bg-gold py-20 sm:py-28">
        <div className="mx-auto max-w-4xl px-4 text-center sm:px-6 lg:px-8">
          <FadeIn>
            <h2 className="font-heading text-3xl font-bold text-white sm:text-4xl">
              Ready to Experience Pakistan?
            </h2>
            <p className="mx-auto mt-4 max-w-2xl text-white/80">
              Let us craft your perfect journey. Whether you seek adventure in
              the mountains, cultural immersion in ancient cities, or a relaxing
              escape by turquoise lakes — we&apos;ve got you covered.
            </p>
            <div className="mt-8 flex flex-col items-center justify-center gap-4 sm:flex-row">
              <Link href="/tours">
                <Button
                  size="lg"
                  className="rounded-full bg-charcoal px-8 text-white hover:bg-charcoal/90"
                >
                  View Tours
                </Button>
              </Link>
              <Link href="/contact">
                <Button
                  size="lg"
                  variant="outline"
                  className="rounded-full border-charcoal bg-charcoal px-8 text-white hover:bg-charcoal/90"
                >
                  Contact Us
                </Button>
              </Link>
            </div>
          </FadeIn>
        </div>
      </section>
    </>
  );
}
