import { Suspense } from "react";
import { Hero } from "@/components/hero";
import { Intro } from "@/components/intro";
import { WhyChooseUs } from "@/components/why-choose-us";
import { GalleryTeaser } from "@/components/gallery-teaser";
import { ReelsSection } from "@/components/reels-section";
import { TeamTeaser } from "@/components/team-teaser";
import { BookingDeals } from "@/components/booking-deals";
import { Testimonials } from "@/components/testimonials";
import { CallToAction } from "@/components/call-to-action";
import { getCollection } from "@/lib/db";
import {
  GalleryTeaserSkeleton,
  TeamTeaserSkeleton,
  BookingDealsSkeleton,
  TestimonialsSkeleton,
} from "@/components/skeletons";

async function GallerySection() {
  const images = await getCollection("gallery");
  return <GalleryTeaser images={images} />;
}

async function TeamSection() {
  const team = await getCollection("team");
  return <TeamTeaser team={team} />;
}

async function DestinationsSection() {
  const destinations = await getCollection("destinations");
  return <BookingDeals destinations={destinations} />;
}

async function TestimonialsSection() {
  const testimonials = await getCollection("testimonials", { status: "approved" });
  return <Testimonials testimonials={testimonials} />;
}

export default function Home() {
  return (
    <>
      <Hero />
      <Intro />
      <WhyChooseUs />
      <Suspense fallback={<GalleryTeaserSkeleton />}>
        <GallerySection />
      </Suspense>
      <Suspense fallback={<SectionFallback />}>
        <ReelsSection />
      </Suspense>
      <Suspense fallback={<TeamTeaserSkeleton />}>
        <TeamSection />
      </Suspense>
      <Suspense fallback={<BookingDealsSkeleton />}>
        <DestinationsSection />
      </Suspense>
      <Suspense fallback={<TestimonialsSkeleton />}>
        <TestimonialsSection />
      </Suspense>
      <CallToAction />
    </>
  );
}

function SectionFallback() {
  return <div className="h-96 animate-pulse bg-muted/30" />;
}
