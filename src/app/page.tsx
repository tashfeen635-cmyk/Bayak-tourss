import { Hero } from "@/components/hero";
import { Intro } from "@/components/intro";
import { WhyChooseUs } from "@/components/why-choose-us";
import { GalleryTeaser } from "@/components/gallery-teaser";
import { ReelsSection } from "@/components/reels-section";
import { TeamTeaser } from "@/components/team-teaser";
import { BookingDeals } from "@/components/booking-deals";
import { Testimonials } from "@/components/testimonials";
import { CallToAction } from "@/components/call-to-action";

export default function Home() {
  return (
    <>
      <Hero />
      <Intro />
      <WhyChooseUs />
      <GalleryTeaser />
      <ReelsSection />
      <TeamTeaser />
      <BookingDeals />
      <Testimonials />
      <CallToAction />
    </>
  );
}
