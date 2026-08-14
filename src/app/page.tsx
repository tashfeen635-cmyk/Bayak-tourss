import { Hero } from "@/components/hero";
import { GalleryTeaser } from "@/components/gallery-teaser";
import { ReelsSection } from "@/components/reels-section";
import { TeamTeaser } from "@/components/team-teaser";
import { BookingDeals } from "@/components/booking-deals";
import { Testimonials } from "@/components/testimonials";
import { CallToAction } from "@/components/call-to-action";
import { getCollection } from "@/lib/db";
import { sortMembers } from "@/lib/team";

export const dynamic = "force-dynamic";

async function GallerySection() {
  const images = await getCollection("gallery", {}, { limit: 6 });
  return <GalleryTeaser images={images} />;
}

async function TeamSection() {
  const team = sortMembers(await getCollection("team"));
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
      <DestinationsSection />
      <CallToAction />
      <TestimonialsSection />
      <TeamSection />
      <GallerySection />
      <ReelsSection />
    </>
  );
}
