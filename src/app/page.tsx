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

export default async function Home() {
  const [galleryImages, destinations, team, testimonials] = await Promise.all([
    getCollection("gallery"),
    getCollection("destinations"),
    getCollection("team"),
    getCollection("testimonials", { status: "approved" }),
  ]);

  return (
    <>
      <Hero />
      <Intro />
      <WhyChooseUs />
      <Suspense fallback={<GalleryTeaserSkeleton />}>
        <GalleryTeaser images={galleryImages} />
      </Suspense>
      <Suspense fallback={<SectionFallback />}>
        <ReelsSection />
      </Suspense>
      <Suspense fallback={<TeamTeaserSkeleton />}>
        <TeamTeaser team={team} />
      </Suspense>
      <Suspense fallback={<BookingDealsSkeleton />}>
        <BookingDeals destinations={destinations} />
      </Suspense>
      <Suspense fallback={<TestimonialsSkeleton />}>
        <Testimonials testimonials={testimonials} />
      </Suspense>
      <CallToAction />
    </>
  );
}

function SectionFallback() {
  return <div className="h-96 animate-pulse bg-muted/30" />;
}
