"use client";

import { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { FadeIn, StaggerContainer, StaggerItem } from "./animations";
import {
  ExternalLink,
  Newspaper,
  Mountain,
  Route,
  Compass,
  ArrowRight,
} from "lucide-react";

type Category = "News" | "Hiking" | "Road Trips" | "Travel Guides";

const categories: ("All" | Category)[] = [
  "All",
  "News",
  "Hiking",
  "Road Trips",
  "Travel Guides",
];

const featured = {
  title: "Gilgit-Baltistan named one of the best destinations to visit in 2025",
  excerpt:
    "CNN Travel picked Gilgit-Baltistan as one of the world's best places to visit in 2025 — celebrating the return of the 'hippie trail' and a region that is home to five of the 14 eight-thousander peaks, including K2, the world's second-highest mountain.",
  source: "CNN Travel",
  date: "January 2025",
  href: "https://www.cnn.com/travel/best-destinations-to-visit-2025",
  image: "/images/blog-cnn.jpg",
  quote:
    "It has more tantalizing peaks than a lemon meringue pie.",
};

const posts: {
  title: string;
  excerpt: string;
  category: Category;
  source: string;
  date: string;
  href: string;
  image: string;
}[] = [
  {
    title: "The road that's the '8th World Wonder'",
    excerpt:
      "The 1,300km Karakoram Highway cuts through some of the most astounding rock faces on the planet. BBC Travel takes this epic drive through the Hunza Valley — a road trip few have ever heard of, and one every traveller should.",
    category: "Road Trips",
    source: "BBC Travel",
    date: "September 2023",
    href: "https://www.bbc.com/travel/article/20230903-the-karakoram-highway-the-road-thats-the-eighth-world-wonder",
    image: "/images/blog-bbc-karakoram.jpg",
  },
  {
    title: "Pakistan's mountains are calling — here's why you should go",
    excerpt:
      "The Karakoram range in Baltistan attracts only around 15,000 hikers a year, versus Nepal's million-plus. A National Geographic writer treks this spectacular corner of Pakistan and asks why the world isn't paying attention.",
    category: "Hiking",
    source: "National Geographic",
    date: "April 2025",
    href: "https://www.nationalgeographic.com/travel/article/why-you-should-explore-pakistans-mountains-karakoram-range-baltistan",
    image: "/images/blog-natgeo-mountains.jpg",
  },
  {
    title: "How to trek to K2 base camp in Pakistan",
    excerpt:
      "The world's second-highest peak awaits at the end of a 14-day trek up the Baltoro Glacier. Lonely Planet's complete route guide covers permits, seasons, terrain and exactly what to expect at Concordia and K2 base camp.",
    category: "Travel Guides",
    source: "Lonely Planet",
    date: "November 2019",
    href: "https://www.lonelyplanet.com/articles/how-to-trek-to-k2-base-camp",
    image: "/images/blog-k2-base-camp.webp",
  },
  {
    title: "Gilgit-Baltistan 2026: record visitors, overtourism concerns",
    excerpt:
      "Early-season figures are tracking above the 2024 record of 989,793 domestic and 20,490 foreign tourists. But communities from Hunza to Deosai are raising the alarm on waste, water stress and overcrowding.",
    category: "News",
    source: "Gilgit Media Network",
    date: "June 2026",
    href: "https://gmnpk.com/gilgit-baltistan-tourism-season-2026-peak-record-visitors-overtourism/",
    image: "/images/blog-gmn-tourism.jpg",
  },
];

const WHATSAPP_URL = "https://wa.me/923146605966?text=" +
  encodeURIComponent(
    "Hi Terra Pakistan! I'd like to plan a trip to Pakistan."
  );

export function BlogsContent() {
  const [active, setActive] = useState<"All" | Category>("All");

  const filtered =
    active === "All" ? posts : posts.filter((p) => p.category === active);

  return (
    <>
      <section className="relative flex min-h-[50vh] items-center justify-center overflow-hidden bg-charcoal pt-32 pb-20">
        <div
          className="absolute inset-0 bg-cover bg-center opacity-40"
          style={{
            backgroundImage:
              "url('/images/blogs-hero.jpg')",
          }}
        />
        <div className="relative z-10 px-4 text-center">
          <FadeIn>
            <span className="text-sm font-semibold uppercase tracking-wider text-gold">
              Stories & News
            </span>
            <h1 className="mt-3 font-heading text-5xl font-bold text-white sm:text-6xl">
              Blogs
            </h1>
            <p className="mx-auto mt-4 max-w-2xl text-white/70">
              Why the world is falling for Pakistan — award-winning coverage,
              road-trip tales and travel guides from the Karakoram.
            </p>
          </FadeIn>
        </div>
      </section>

      <section className="py-12 sm:py-20">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <FadeIn className="text-center">
            <span className="text-sm font-semibold uppercase tracking-wider text-gold">
              Featured Story
            </span>
            <h2 className="mt-3 font-heading text-3xl font-bold tracking-tight sm:text-4xl">
              Pakistan in the global spotlight
            </h2>
          </FadeIn>

          <FadeIn className="mt-12" delay={0.1}>
            <a
              href={featured.href}
              target="_blank"
              rel="noopener noreferrer"
              className="group block overflow-hidden rounded-3xl border border-border bg-card transition-all duration-500 hover:shadow-2xl"
            >
              <div className="grid lg:grid-cols-2">
                <div className="relative aspect-[4/3] overflow-hidden lg:aspect-auto lg:min-h-full">
                  <Image
                    src={featured.image}
                    alt={featured.title}
                    fill
                    className="object-cover transition-transform duration-700 group-hover:scale-105"
                    sizes="(max-width: 1024px) 100vw, 50vw"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/30 to-transparent" />
                  <div className="absolute left-6 top-6 flex items-center gap-1 rounded-full bg-gold px-3 py-1 text-xs font-semibold text-white shadow-md">
                    <Newspaper className="h-3.5 w-3.5" />
                    News
                  </div>
                </div>
                <div className="flex flex-col justify-center p-8 sm:p-12">
                  <p className="text-sm font-semibold text-gold">
                    {featured.source} · {featured.date}
                  </p>
                  <h3 className="mt-4 font-heading text-2xl font-bold leading-snug tracking-tight sm:text-3xl">
                    {featured.title}
                  </h3>
                  <p className="mt-5 text-sm leading-loose text-muted-foreground">
                    {featured.excerpt}
                  </p>
                  <blockquote className="mt-6 border-l-2 border-gold pl-4 text-base italic text-muted-foreground">
                    &ldquo;{featured.quote}&rdquo;
                  </blockquote>
                  <span className="mt-8 inline-flex items-center gap-2 text-sm font-semibold text-gold transition-colors group-hover:text-gold-dark">
                    Read the full story
                    <ExternalLink className="h-4 w-4" />
                  </span>
                </div>
              </div>
            </a>
          </FadeIn>
        </div>
      </section>

      <section className="bg-muted/50 py-20">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <FadeIn className="text-center">
            <span className="text-sm font-semibold uppercase tracking-wider text-gold">
              News & Features
            </span>
            <h2 className="mt-3 font-heading text-3xl font-bold tracking-tight sm:text-4xl">
              Latest coverage
            </h2>
            <p className="mx-auto mt-4 max-w-2xl text-muted-foreground">
              The stories putting Pakistan&apos;s north on the travel map.
            </p>
          </FadeIn>

          <FadeIn className="mt-10">
            <div className="flex flex-wrap items-center justify-center gap-2">
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

          <StaggerContainer
            key={`posts-grid-${active}`}
            className="mt-12 grid gap-8 sm:grid-cols-2 xl:grid-cols-4"
          >
            {filtered.map((post) => (
              <StaggerItem key={post.title}>
                <a
                  href={post.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="group flex h-full flex-col overflow-hidden rounded-2xl border border-border bg-card transition-all duration-300 hover:shadow-xl"
                >
                  <div className="relative aspect-[16/10] overflow-hidden">
                    <Image
                      src={post.image}
                      alt={post.title}
                      fill
                      className="object-cover transition-transform duration-500 group-hover:scale-105"
                      sizes="(max-width: 640px) 100vw, (max-width: 1280px) 50vw, 25vw"
                    />
                  </div>
                  <div className="flex flex-1 flex-col p-8">
                    <span className="rounded-full bg-gold/10 px-3 py-1 text-xs font-semibold text-gold w-fit">
                      {post.category}
                    </span>
                    <h3 className="mt-4 font-heading text-lg font-semibold leading-snug">
                      {post.title}
                    </h3>
                    <p className="mt-4 text-sm leading-loose text-muted-foreground">
                      {post.excerpt}
                    </p>
                    <div className="mt-auto flex items-end justify-between border-t border-border pt-5">
                      <span className="text-xs text-muted-foreground">
                        <span className="font-semibold text-gold">
                          {post.source}
                        </span>
                        <span className="block">{post.date}</span>
                      </span>
                      <ExternalLink className="h-4 w-4 text-gold transition-transform group-hover:-translate-y-0.5 group-hover:translate-x-0.5" />
                    </div>
                  </div>
                </a>
              </StaggerItem>
            ))}
          </StaggerContainer>

          {filtered.length === 0 && (
            <p className="mt-12 text-center text-muted-foreground">
              No stories in this category yet — check back soon.
            </p>
          )}
        </div>
      </section>

      <section className="py-24">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <FadeIn>
            <div className="relative overflow-hidden rounded-3xl bg-gold px-8 py-16 text-center sm:px-16">
              <div className="absolute -left-20 -top-20 h-64 w-64 rounded-full bg-white/10" />
              <div className="absolute -bottom-20 -right-20 h-64 w-64 rounded-full bg-white/10" />
              <div className="relative z-10">
                <div className="flex flex-wrap items-center justify-center gap-4 text-white">
                  <Compass className="h-8 w-8" />
                  <Mountain className="h-8 w-8" />
                  <Route className="h-8 w-8" />
                </div>
                <h2 className="mt-6 font-heading text-3xl font-bold text-white sm:text-4xl">
                  Ready to explore Pakistan yourself?
                </h2>
                <p className="mx-auto mt-4 max-w-xl text-white/80">
                  From the Karakoram Highway to K2 Base Camp, Terra Pakistan plans
                  your perfect trip through Gilgit-Baltistan and beyond.
                </p>
                <div className="mt-8 flex flex-col items-center justify-center gap-4 sm:flex-row">
                  <a
                    href={WHATSAPP_URL}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center justify-center gap-2 rounded-full bg-white px-8 py-3 text-base font-semibold text-gold hover:bg-white/90"
                  >
                    <svg viewBox="0 0 24 24" fill="currentColor" className="h-5 w-5">
                      <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.297-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 0 1-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 0 1-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 0 1 2.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0 0 12.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 0 0 5.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 0 0-3.48-8.413Z" />
                    </svg>
                    WhatsApp Us
                  </a>
                  <Link
                    href="/contact"
                    className="inline-flex items-center justify-center gap-2 rounded-full bg-charcoal px-8 py-3 text-base font-semibold text-white hover:bg-charcoal/90"
                  >
                    Contact Us
                    <ArrowRight className="h-5 w-5" />
                  </Link>
                </div>
              </div>
            </div>
          </FadeIn>
        </div>
      </section>
    </>
  );
}
