"use client";

import { useState } from "react";
import { Mail, Phone, Send, MessageCircle } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { FadeIn, StaggerContainer, StaggerItem } from "./animations";

export function ContactContent() {
  const [submitted, setSubmitted] = useState(false);
  const [submitting, setSubmitting] = useState(false);
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const [destination, setDestination] = useState("");
  const [travelDates, setTravelDates] = useState("");
  const [message, setMessage] = useState("");

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setSubmitting(true);
    try {
      await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ firstName, lastName, email, phone, destination, travelDates, message }),
      });
      setSubmitted(true);
    } catch {
      // silently fail for now
    } finally {
      setSubmitting(false);
    }
  }

  return (
    <>
      <section className="relative flex min-h-[50vh] items-center justify-center overflow-hidden bg-charcoal">
        <div
          className="absolute inset-0 bg-cover bg-center opacity-30"
          style={{
            backgroundImage:
              "url('/images/fairy-meadows.jpg')",
          }}
        />
        <div className="relative z-10 px-4 text-center">
          <FadeIn>
            <h1 className="font-heading pt-[59px] text-[30px] font-bold text-white sm:pt-0 sm:text-5xl md:text-6xl">
              Get in Touch
            </h1>
            <p className="mx-auto mt-4 max-w-2xl text-white/60">
              Ready to start planning? We&apos;d love to hear from you.
            </p>
          </FadeIn>
        </div>
      </section>

      <section className="py-20 sm:py-28">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="grid gap-12 lg:grid-cols-5">
            <FadeIn className="lg:col-span-2">
              <h2 className="font-heading text-2xl font-bold">
                Contact Information
              </h2>
              <p className="mt-3 text-sm leading-relaxed text-muted-foreground">
                Reach out to us through any of the channels below. Our team
                typically responds within 24 hours.
              </p>

              <StaggerContainer className="mt-8 space-y-6">
                {[
                  {
                    icon: Phone,
                    label: "Call Us",
                    value: "+92 314 6605966",
                    href: "https://wa.me/923146605966",
                  },
                  {
                    icon: Mail,
                    label: "Email Us",
                    value: "info@terrapakistan.com",
                    href: "mailto:info@terrapakistan.com",
                  },
                  {
                    icon: MessageCircle,
                    label: "WhatsApp",
                    value: "+92 314 6605966",
                    href: "https://wa.me/923146605966",
                  },
                ].map((item) => (
                  <StaggerItem key={item.label}>
                    <div className="flex items-start gap-4">
                      <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-gold/10 text-gold">
                        <item.icon className="h-5 w-5" />
                      </div>
                      <div>
                        <div className="text-sm font-semibold">
                          {item.label}
                        </div>
                        <div className="text-sm text-muted-foreground">
                          {item.href ? (
                            <a
                              href={item.href}
                              target={item.href.startsWith("http") ? "_blank" : undefined}
                              rel={item.href.startsWith("http") ? "noopener noreferrer" : undefined}
                              className="transition-colors hover:text-gold"
                            >
                              {item.value}
                            </a>
                          ) : (
                            item.value
                          )}
                        </div>
                      </div>
                    </div>
                  </StaggerItem>
                ))}
              </StaggerContainer>
            </FadeIn>

            <FadeIn className="lg:col-span-3" delay={0.1}>
              <div className="rounded-2xl border border-border bg-card p-8">
                {submitted ? (
                  <div className="flex flex-col items-center py-12 text-center">
                    <div className="flex h-16 w-16 items-center justify-center rounded-full bg-gold/10 text-gold">
                      <Send className="h-8 w-8" />
                    </div>
                    <h3 className="mt-4 font-heading text-xl font-semibold">
                      Message Sent!
                    </h3>
                    <p className="mt-2 text-sm text-muted-foreground">
                      Thank you for reaching out. We&apos;ll get back to you
                      within 24 hours.
                    </p>
                    <Button
                      variant="outline"
                      className="mt-6 rounded-full"
                      onClick={() => setSubmitted(false)}
                    >
                      Send Another Message
                    </Button>
                  </div>
                ) : (
                  <form onSubmit={handleSubmit} className="space-y-6">
                    <div className="grid gap-6 sm:grid-cols-2">
                      <div>
                        <label className="mb-2 block text-sm font-medium">
                          First Name
                        </label>
                        <Input
                          placeholder="John"
                          required
                          className="rounded-xl"
                          value={firstName}
                          onChange={(e) => setFirstName(e.target.value)}
                        />
                      </div>
                      <div>
                        <label className="mb-2 block text-sm font-medium">
                          Last Name
                        </label>
                        <Input
                          placeholder="Doe"
                          required
                          className="rounded-xl"
                          value={lastName}
                          onChange={(e) => setLastName(e.target.value)}
                        />
                      </div>
                    </div>
                    <div>
                      <label className="mb-2 block text-sm font-medium">
                        Email
                      </label>
                      <Input
                        type="email"
                        placeholder="john@example.com"
                        required
                        className="rounded-xl"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                      />
                    </div>
                    <div>
                      <label className="mb-2 block text-sm font-medium">
                        Phone (Optional)
                      </label>
                      <Input
                        type="tel"
                        placeholder="+92 314 6605966"
                        className="rounded-xl"
                        value={phone}
                        onChange={(e) => setPhone(e.target.value)}
                      />
                    </div>
                    <div>
                      <label className="mb-2 block text-sm font-medium">
                        Destination Interest
                      </label>
                      <Input
                        placeholder="e.g., Hunza, Skardu, Fairy Meadows"
                        className="rounded-xl"
                        value={destination}
                        onChange={(e) => setDestination(e.target.value)}
                      />
                    </div>
                    <div>
                      <label className="mb-2 block text-sm font-medium">
                        Travel Dates
                      </label>
                      <Input
                        placeholder="e.g., Aug 15 - Aug 20, 2025"
                        className="rounded-xl"
                        value={travelDates}
                        onChange={(e) => setTravelDates(e.target.value)}
                      />
                    </div>
                    <div>
                      <label className="mb-2 block text-sm font-medium">
                        Message
                      </label>
                      <Textarea
                        placeholder="Tell us about your dream trip..."
                        rows={5}
                        required
                        className="rounded-xl"
                        value={message}
                        onChange={(e) => setMessage(e.target.value)}
                      />
                    </div>
                    <Button
                      type="submit"
                      disabled={submitting}
                      className="w-full rounded-full bg-gold text-white hover:bg-gold-dark"
                      size="lg"
                    >
                      <Send className="mr-2 h-4 w-4" />
                      {submitting ? "Sending..." : "Send Message"}
                    </Button>
                  </form>
                )}
              </div>
            </FadeIn>
          </div>
        </div>
      </section>
    </>
  );
}
