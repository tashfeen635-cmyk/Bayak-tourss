import type { Metadata } from "next";
import { Playfair_Display, Inter } from "next/font/google";
import "./globals.css";
import { ThemeProvider } from "@/components/theme-provider";
import { LayoutShell } from "@/components/layout-shell";

const SITE_URL = "https://bayaktours.com";

const organizationJsonLd = {
  "@context": "https://schema.org",
  "@type": "TravelAgency",
  "@id": `${SITE_URL}/#organization`,
  name: "Bayak Tours",
  url: SITE_URL,
  logo: `${SITE_URL}/bayak-tours-logo-v2.png`,
  image: `${SITE_URL}/og-image.jpg`,
  description:
    "Discover Pakistan with Bayak Tours. Premium travel experiences to Hunza, Skardu, Fairy Meadows, and more. Adventure, culture & unforgettable journeys.",
  foundingDate: "2021",
  telephone: "+923146605966",
  email: "info@bayaktours.com",
  address: {
    "@type": "PostalAddress",
    addressCountry: "PK",
  },
  sameAs: [
    "https://facebook.com/Travelwitharrehman",
    "https://instagram.com/travelwith_arrehman",
    "https://tiktok.com/@travelwith_arrehman",
    "https://wa.me/923146605966",
  ],
};

const websiteJsonLd = {
  "@context": "https://schema.org",
  "@type": "WebSite",
  "@id": `${SITE_URL}/#website`,
  url: SITE_URL,
  name: "Bayak Tours",
  description:
    "Discover Pakistan with Bayak Tours. Premium travel experiences to Hunza, Skardu, Fairy Meadows, and more.",
  inLanguage: "en",
  publisher: {
    "@id": `${SITE_URL}/#organization`,
  },
  potentialAction: {
    "@type": "SearchAction",
    target: {
      "@type": "EntryPoint",
      urlTemplate: `${SITE_URL}/tours?q={search_term_string}`,
    },
    "query-input": "required name=search_term_string",
  },
};

const playfair = Playfair_Display({
  variable: "--font-heading",
  subsets: ["latin"],
  display: "swap",
});

const inter = Inter({
  variable: "--font-sans",
  subsets: ["latin"],
  display: "swap",
});

export const metadata: Metadata = {
  metadataBase: new URL(SITE_URL),
  title: {
    default: "Bayak Tours | Premium Pakistan Travel Experiences",
    template: "%s | Bayak Tours",
  },
  description:
    "Discover Pakistan with Bayak Tours. Premium travel experiences to Hunza, Skardu, Fairy Meadows, and more. Adventure, culture & unforgettable journeys.",
  keywords: [
    "Pakistan tourism",
    "Hunza Valley tours",
    "Skardu trips",
    "Fairy Meadows trek",
    "Pakistan travel agency",
    "Bayak Tours",
  ],
  openGraph: {
    title: "Bayak Tours | Premium Pakistan Travel Experiences",
    description:
      "Discover Pakistan with Bayak Tours. Premium travel experiences to Hunza, Skardu, Fairy Meadows, and more.",
    url: SITE_URL,
    siteName: "Bayak Tours",
    locale: "en_US",
    type: "website",
    images: [
      {
        url: `${SITE_URL}/og-image.jpg`,
        width: 1200,
        height: 630,
        alt: "Bayak Tours — Premium Pakistan Travel Experiences",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Bayak Tours | Premium Pakistan Travel Experiences",
    description:
      "Discover Pakistan with Bayak Tours. Premium travel experiences to Hunza, Skardu, Fairy Meadows, and more.",
    images: [`${SITE_URL}/og-image.jpg`],
  },
  icons: {
    icon: "/favicon.png",
  },
  alternates: {
    canonical: "/",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className={`${playfair.variable} ${inter.variable}`} suppressHydrationWarning>
      <body className="min-h-screen flex flex-col antialiased" suppressHydrationWarning>
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(organizationJsonLd) }}
        />
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(websiteJsonLd) }}
        />
        <ThemeProvider>
          <LayoutShell>{children}</LayoutShell>
        </ThemeProvider>
      </body>
    </html>
  );
}
