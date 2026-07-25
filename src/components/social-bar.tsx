"use client";

import { useState, useEffect } from "react";

const socials = [
  {
    label: "Instagram",
    href: "https://www.instagram.com/travel_with_arrehman/",
    icon: (
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="h-[18px] w-[18px] sm:h-5 sm:w-5">
        <rect x="2" y="2" width="20" height="20" rx="5" ry="5" />
        <circle cx="12" cy="12" r="5" />
        <circle cx="17.5" cy="6.5" r="1.5" fill="currentColor" stroke="none" />
      </svg>
    ),
  },
  {
    label: "Facebook",
    href: "https://www.facebook.com/Travelwitharrehman/",
    icon: (
      <svg viewBox="0 0 24 24" fill="currentColor" className="h-[18px] w-[18px] sm:h-5 sm:w-5">
        <path d="M18 2h-3a5 5 0 0 0-5 5v3H7v4h3v8h4v-8h3l1-4h-4V7a1 1 0 0 1 1-1h3z" />
      </svg>
    ),
  },
  {
    label: "TikTok",
    href: "https://www.tiktok.com/@travelwith_arrehman",
    icon: (
      <svg viewBox="0 0 24 24" fill="currentColor" className="h-[18px] w-[18px] sm:h-5 sm:w-5">
        <path d="M16.6 5.82A4.28 4.28 0 0 1 13.4 2h-2.8v13.67a2.89 2.89 0 0 1-2.88 2.5 2.89 2.89 0 0 1-2.89-2.89 2.89 2.89 0 0 1 2.89-2.89c.29 0 .56.04.81.11V7.4a6.37 6.37 0 0 0-.81-.05A6.34 6.34 0 0 0 3.15 15.2a6.34 6.34 0 0 0 6.34 6.34 6.34 6.34 0 0 0 6.34-6.34V9.41a8.16 8.16 0 0 0 4.76 1.52V7.49a4.28 4.28 0 0 1-4.05-1.67z" />
      </svg>
    ),
  },
];

export function SocialBar() {
  const [hidden, setHidden] = useState(false);

  useEffect(() => {
    const check = () => {
      setHidden(!!document.querySelector(".fixed.inset-0.z-50"));
    };
    const observer = new MutationObserver(check);
    observer.observe(document.body, { childList: true, subtree: true });
    check();
    return () => observer.disconnect();
  }, []);

  if (hidden) return null;

  return (
    <div className="fixed right-6 top-1/2 z-50 -translate-y-1/2 hidden sm:block">
      <div className="flex flex-col items-center gap-3">
        {socials.map((social) => (
          <a
            key={social.label}
            href={social.href}
            target="_blank"
            rel="noopener noreferrer"
            aria-label={social.label}
            className="flex h-9 w-9 items-center justify-center rounded-full bg-charcoal/80 text-gold shadow-md backdrop-blur-sm transition-all duration-300 hover:scale-110 hover:bg-gold hover:text-white hover:shadow-lg sm:h-10 sm:w-10"
          >
            {social.icon}
          </a>
        ))}
      </div>
    </div>
  );
}
