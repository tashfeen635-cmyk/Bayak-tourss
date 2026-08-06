import Link from "next/link";
import { FadeIn, StaggerContainer, StaggerItem } from "@/components/animations";
import { CheckCircle2, FileText, Globe, CreditCard, Plane } from "lucide-react";
import { buildMetadata } from "@/lib/seo";

export const metadata = buildMetadata({
  title: "Tourist Visa",
  description:
    "Step-by-step guide for foreigners visiting Pakistan. How to apply for a Pakistan tourist visa online through the official Pakistan Online Visa System.",
  path: "/tourist-visa",
});

const checklist = [
  "Passport valid for at least 6 months with blank pages",
  "Recent passport-size photo — white background, minimum 350×467 px, no glasses",
  "Hotel booking details (or a local host's invitation letter)",
  "Confirmed return flight ticket",
  "Bank statement as proof of funds (recommended)",
  "Valid international Visa/MasterCard to pay the visa fee",
];

const steps = [
  {
    title: "Check your eligibility",
    description:
      "Visit the official Pakistan Online Visa System at visa.nadra.gov.pk and confirm your nationality qualifies for the online tourist e-Visa. Review the visa category and its document requirements.",
  },
  {
    title: "Create an account",
    description:
      "Register on the portal with your full name, email address and passport number. Choose a strong password and verify your email.",
  },
  {
    title: "Start a new application",
    description:
      "Select 'Pak Visa' as the document type, choose your nationality, and click 'Start Application'. If you have applied before, you can load your previous application.",
  },
  {
    title: "Fill in the application form",
    description:
      "Select visa category 'Tourist'. Provide personal details, passport information, intended arrival and departure dates, entry and exit ports, and your accommodation in Pakistan.",
  },
  {
    title: "Upload your documents",
    description:
      "Upload a scanned copy of your passport bio page, your photograph, hotel booking, return flight ticket and any other required documents. Accepted formats: JPG, JPEG, PNG and PDF.",
  },
  {
    title: "Review and declare",
    description:
      "Go through every section carefully. Confirm all information is accurate and sign the online declaration before submission.",
  },
  {
    title: "Pay the visa fee",
    description:
      "Pay the application fee online using a Visa or MasterCard. The fee depends on your nationality and visa type.",
  },
  {
    title: "Submit your application",
    description:
      "Submit the application and note your application/reference ID. This number lets you track the status of your visa online.",
  },
  {
    title: "Download your visa",
    description:
      "Once approved, you will receive a Visa Grant Notice (and ETA for visa-on-arrival categories). Download and print it before you travel.",
  },
  {
    title: "Travel to Pakistan",
    description:
      "Carry your passport and printed visa documents to the airport and entry port. Present them to immigration upon arrival.",
  },
];

const facts = [
  {
    title: "Processing time",
    description:
      "Standard processing takes 7–10 working days, though it can take up to 20 days in practice. Apply at least 4–6 weeks before your planned travel date.",
  },
  {
    title: "Sent back for review?",
    description:
      "If your application is returned for corrections, you must resubmit within 7 days or it is cancelled. Note that the processing clock restarts from your resubmission date.",
  },
  {
    title: "Visa fees",
    description:
      "Fees vary by nationality and visa type. Some nationalities (e.g. Afghanistan, China, Japan, Malaysia, UAE, Saudi Arabia) are exempt from visa fees — they still apply through the portal.",
  },
  {
    title: "Beware of unofficial websites",
    description:
      "Visa applications are only accepted at visa.nadra.gov.pk. The Government of Pakistan does not collaborate with any other website — never share your data or pay on a third-party site.",
  },
  {
    title: "Visa Prior to Arrival (VPA)",
    description:
      "The free Visa Prior to Arrival programme was discontinued on 1 January 2026. All foreign tourists must now apply for a standard paid e-Visa before travelling.",
  },
];

const faqs = [
  {
    q: "How long does it take to get a Pakistan tourist visa?",
    a: "Official processing time is 7–10 working days, though it can take up to 20 days during busy periods. Apply at least 4–6 weeks before your trip.",
  },
  {
    q: "Do I need an invitation letter for a tourist visa?",
    a: "For a standard tourist visa you generally need hotel booking details. An invitation letter is required for family visit or business visas.",
  },
  {
    q: "Is the free visa still available?",
    a: "No. The free Visa Prior to Arrival (VPA) programme ended on 1 January 2026. All visitors now apply for a paid e-Visa through the Pakistan Online Visa System.",
  },
  {
    q: "Can Terra Pakistan help with my visa?",
    a: "Yes. Our team can guide you through the application and arrange your itinerary, hotels and transport so everything is ready for your trip. Contact us for assistance.",
  },
];

export default function TouristVisaPage() {
  return (
    <>
      <section className="relative flex min-h-[50vh] items-center justify-center overflow-hidden bg-charcoal pt-32 pb-20">
        <div
          className="absolute inset-0 bg-cover bg-center opacity-40"
          style={{
            backgroundImage:
              "url('https://images.unsplash.com/photo-1506905925346-21bda4d32df4?w=1920&q=80')",
          }}
        />
        <div className="relative z-10 px-4 text-center">
          <FadeIn>
            <h1 className="font-heading text-5xl font-bold text-white sm:text-6xl">
              Tourist Visa
            </h1>
            <p className="mx-auto mt-4 max-w-2xl text-white/70">
              Your step-by-step guide to getting a Pakistan tourist visa as a
              foreign visitor.
            </p>
          </FadeIn>
        </div>
      </section>

      <section className="py-20">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <FadeIn className="text-center">
            <span className="text-sm font-semibold uppercase tracking-wider text-gold">
              Before You Apply
            </span>
            <h2 className="mt-3 font-heading text-3xl font-bold tracking-tight sm:text-4xl">
              What you&apos;ll need
            </h2>
          </FadeIn>

          <StaggerContainer className="mt-12 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
            {checklist.map((item) => (
              <StaggerItem key={item}>
                <div className="flex h-full items-start gap-3 rounded-xl border border-border bg-card p-5">
                  <CheckCircle2 className="mt-0.5 h-5 w-5 shrink-0 text-gold" />
                  <p className="text-sm leading-relaxed text-muted-foreground">
                    {item}
                  </p>
                </div>
              </StaggerItem>
            ))}
          </StaggerContainer>
        </div>
      </section>

      <section className="bg-muted/50 py-20">
        <div className="mx-auto max-w-4xl px-4 sm:px-6 lg:px-8">
          <FadeIn className="text-center">
            <span className="text-sm font-semibold uppercase tracking-wider text-gold">
              The Process
            </span>
            <h2 className="mt-3 font-heading text-3xl font-bold tracking-tight sm:text-4xl">
              Step-by-step guide
            </h2>
          </FadeIn>

          <div className="mt-14 space-y-0">
            {steps.map((step, i) => (
              <FadeIn key={step.title} delay={Math.min(i * 0.05, 0.3)}>
                <div className="relative flex gap-5 pb-10 last:pb-0">
                  <div className="flex flex-col items-center">
                    <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-full bg-gold text-lg font-bold text-white">
                      {i + 1}
                    </div>
                    {i < steps.length - 1 && (
                      <div className="mt-2 w-px flex-1 bg-gold/30" />
                    )}
                  </div>
                  <div className="pt-1">
                    <h3 className="font-heading text-xl font-semibold">
                      {step.title}
                    </h3>
                    <p className="mt-2 text-sm leading-relaxed text-muted-foreground">
                      {step.description}
                    </p>
                  </div>
                </div>
              </FadeIn>
            ))}
          </div>
        </div>
      </section>

      <section className="py-20">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <FadeIn className="text-center">
            <span className="text-sm font-semibold uppercase tracking-wider text-gold">
              Good To Know
            </span>
            <h2 className="mt-3 font-heading text-3xl font-bold tracking-tight sm:text-4xl">
              Key facts
            </h2>
          </FadeIn>

          <StaggerContainer className="mt-12 grid gap-8 sm:grid-cols-2 lg:grid-cols-3">
            {facts.map((fact) => (
              <StaggerItem key={fact.title}>
                <div className="h-full rounded-2xl border border-border bg-card p-8">
                  <h3 className="font-heading text-lg font-semibold text-gold">
                    {fact.title}
                  </h3>
                  <p className="mt-4 text-sm leading-loose text-muted-foreground">
                    {fact.description}
                  </p>
                </div>
              </StaggerItem>
            ))}
            <StaggerItem>
              <div className="h-full rounded-2xl border border-dashed border-gold/40 bg-gold/5 p-8">
                <div className="flex items-center gap-2">
                  <Globe className="h-5 w-5 text-gold" />
                  <h3 className="font-heading text-lg font-semibold">
                    Apply online
                  </h3>
                </div>
                <p className="mt-4 text-sm leading-loose text-muted-foreground">
                  Start your application at the official portal.
                </p>
                <a
                  href="https://visa.nadra.gov.pk"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="mt-4 inline-flex items-center gap-1 text-sm font-semibold text-gold underline underline-offset-4 hover:text-gold/80"
                >
                  visa.nadra.gov.pk
                </a>
              </div>
            </StaggerItem>
          </StaggerContainer>
        </div>
      </section>

      <section className="bg-muted/50 py-20">
        <div className="mx-auto max-w-3xl px-4 sm:px-6 lg:px-8">
          <FadeIn className="text-center">
            <span className="text-sm font-semibold uppercase tracking-wider text-gold">
              FAQ
            </span>
            <h2 className="mt-3 font-heading text-3xl font-bold tracking-tight sm:text-4xl">
              Frequently asked questions
            </h2>
          </FadeIn>

          <div className="mt-12 space-y-4">
            {faqs.map((faq, i) => (
              <FadeIn key={faq.q} delay={Math.min(i * 0.05, 0.3)}>
                <div className="rounded-xl border border-border bg-card p-6">
                  <h3 className="font-heading text-lg font-semibold">{faq.q}</h3>
                  <p className="mt-2 text-sm leading-relaxed text-muted-foreground">
                    {faq.a}
                  </p>
                </div>
              </FadeIn>
            ))}
          </div>
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
                  <Plane className="h-8 w-8" />
                  <FileText className="h-8 w-8" />
                  <CreditCard className="h-8 w-8" />
                </div>
                <h2 className="mt-6 font-heading text-3xl font-bold text-white sm:text-4xl">
                  Need help with your visa or itinerary?
                </h2>
                <p className="mx-auto mt-4 max-w-xl text-white/80">
                  Our team can guide you through the visa process and arrange
                  your hotels, transport and tours across Pakistan.
                </p>
                <div className="mt-8 flex flex-col items-center justify-center gap-4 sm:flex-row">
                  <Link
                    href="/contact"
                    className="inline-flex items-center justify-center rounded-full bg-white px-8 py-3 text-base font-semibold text-gold hover:bg-white/90"
                  >
                    Contact Us
                  </Link>
                  <a
                    href="https://wa.me/923146605966"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center justify-center gap-2 rounded-full bg-charcoal px-8 py-3 text-base font-semibold text-white hover:bg-charcoal/90"
                  >
                    <svg viewBox="0 0 24 24" fill="currentColor" className="h-5 w-5">
                      <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.297-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 0 1-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 0 1-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 0 1 2.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0 0 12.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 0 0 5.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 0 0-3.48-8.413Z" />
                    </svg>
                    WhatsApp Us
                  </a>
                </div>
              </div>
            </div>
          </FadeIn>
        </div>
      </section>
    </>
  );
}
