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

function SectionFallback() {
  return <div className="h-96 animate-pulse bg-muted/30" />;
}

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
      <Suspense fallback={<SectionFallback />}>
        <GalleryTeaser images={galleryImages} />
      </Suspense>
      <Suspense fallback={<SectionFallback />}>
        <ReelsSection />
      </Suspense>
      <Suspense fallback={<SectionFallback />}>
        <TeamTeaser team={team} />
      </Suspense>
      <Suspense fallback={<SectionFallback />}>
        <BookingDeals destinations={destinations} />
      </Suspense>
      <Suspense fallback={<SectionFallback />}>
        <Testimonials testimonials={testimonials} />
      </Suspense>
      <CallToAction />
    </>
  );
}
