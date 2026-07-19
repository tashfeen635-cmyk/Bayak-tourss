"use client";

import Link from "next/link";
import { useState } from "react";
import {
  MapPin,
  Phone,
  Mail,
  Globe,
  Share2,
  MessageCircle,
  Send,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { MapPin as LogoIcon } from "lucide-react";

const footerLinks = {
  explore: [
    { label: "About Us", href: "/about" },
    { label: "Destinations", href: "/destinations" },
    { label: "Gallery", href: "/gallery" },
    { label: "Our Team", href: "/team" },
    { label: "Contact", href: "/contact" },
  ],
  services: [
    { label: "Adventure Tours", href: "/destinations" },
    { label: "Family Packages", href: "/destinations" },
    { label: "Honeymoon Trips", href: "/destinations" },
    { label: "Group Travel", href: "/destinations" },
  ],
};

const socials = [
  { icon: Globe, label: "WhatsApp", href: "#" },
  { icon: Share2, label: "Facebook", href: "#" },
  { icon: MessageCircle, label: "Instagram", href: "#" },
];

export function Footer() {
  const [email, setEmail] = useState("");
  const [subscribed, setSubscribed] = useState(false);

  function handleSubscribe(e: React.FormEvent) {
    e.preventDefault();
    if (email) {
      setSubscribed(true);
      setEmail("");
    }
  }

  return (
    <footer className="bg-charcoal text-white/80">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="grid gap-12 py-16 sm:grid-cols-2 lg:grid-cols-4">
          <div>
            <Link href="/" className="flex items-center gap-2 group">
              <div className="flex h-10 w-10 items-center justify-center rounded-full bg-gold text-white transition-transform group-hover:scale-110">
                <LogoIcon className="h-5 w-5" />
              </div>
              <span className="font-heading text-2xl font-bold tracking-tight text-white">
                Bayak Tours
              </span>
            </Link>
            <p className="mt-4 text-sm leading-relaxed text-white/60">
              Pakistan&apos;s premier travel company. Crafting unforgettable
              journeys to the most breathtaking destinations since 2012.
            </p>
            <div className="mt-6 flex gap-3">
              {socials.map((s) => (
                <a
                  key={s.label}
                  href={s.href}
                  aria-label={s.label}
                  className="flex h-9 w-9 items-center justify-center rounded-full border border-white/20 text-white/60 transition-all hover:border-gold hover:text-gold"
                >
                  <s.icon className="h-4 w-4" />
                </a>
              ))}
            </div>
          </div>

          <div>
            <h3 className="font-heading text-sm font-semibold uppercase tracking-wider text-gold">
              Explore
            </h3>
            <ul className="mt-4 space-y-3">
              {footerLinks.explore.map((link) => (
                <li key={link.label}>
                  <Link
                    href={link.href}
                    className="text-sm text-white/60 transition-colors hover:text-white"
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <h3 className="font-heading text-sm font-semibold uppercase tracking-wider text-gold">
              Services
            </h3>
            <ul className="mt-4 space-y-3">
              {footerLinks.services.map((link) => (
                <li key={link.label}>
                  <Link
                    href={link.href}
                    className="text-sm text-white/60 transition-colors hover:text-white"
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <h3 className="font-heading text-sm font-semibold uppercase tracking-wider text-gold">
              Stay Connected
            </h3>
            <ul className="mt-4 space-y-4">
              <li className="flex items-center gap-3">
                <Phone className="h-4 w-4 shrink-0 text-gold" />
                <span className="text-sm text-white/60">+92 300 1234567</span>
              </li>
              <li className="flex items-center gap-3">
                <Mail className="h-4 w-4 shrink-0 text-gold" />
                <span className="text-sm text-white/60">
                  hello@bayaktours.com
                </span>
              </li>
              <li className="flex items-start gap-3">
                <MapPin className="mt-0.5 h-4 w-4 shrink-0 text-gold" />
                <span className="text-sm text-white/60">
                  Main Boulevard, Islamabad, Pakistan
                </span>
              </li>
            </ul>

            <div className="mt-6">
              <h4 className="text-xs font-semibold uppercase tracking-wider text-gold">
                Newsletter
              </h4>
              {subscribed ? (
                <p className="mt-2 text-sm text-green-400">
                  Thanks for subscribing!
                </p>
              ) : (
                <form
                  onSubmit={handleSubscribe}
                  className="mt-2 flex gap-2"
                >
                  <Input
                    type="email"
                    placeholder="Your email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    required
                    className="h-9 rounded-full border-white/20 bg-white/5 px-4 text-xs text-white placeholder:text-white/30"
                  />
                  <Button
                    type="submit"
                    size="sm"
                    className="h-9 rounded-full bg-gold px-3 text-white hover:bg-gold-dark"
                  >
                    <Send className="h-3.5 w-3.5" />
                  </Button>
                </form>
              )}
            </div>
          </div>
        </div>

        <div className="border-t border-white/10 py-6 text-center text-xs text-white/40">
          &copy; {new Date().getFullYear()} Bayak Tours. All rights reserved.
        </div>
      </div>
    </footer>
  );
}
