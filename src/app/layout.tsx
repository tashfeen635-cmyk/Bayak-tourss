import type { Metadata } from "next";
import { Playfair_Display, Inter } from "next/font/google";
import "./globals.css";
import { ThemeProvider } from "@/components/theme-provider";
import { LayoutShell } from "@/components/layout-shell";
import {
  SITE_URL,
  SITE_NAME,
  SITE_TITLE,
  SITE_DESCRIPTION,
  SITE_OG_IMAGE,
} from "@/lib/seo";

const organizationJsonLd = {
  "@context": "https://schema.org",
  "@type": "TravelAgency",
  "@id": `${SITE_URL}/#organization`,
  name: SITE_NAME,
  url: SITE_URL,
  logo: `${SITE_URL}/bayak-tours-logo-v5.png`,
  image: SITE_OG_IMAGE,
  description: SITE_DESCRIPTION,
  foundingDate: "2021",
  telephone: "+923146605966",
  email: "info@terrapakistan.com",
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
  name: SITE_NAME,
  description: SITE_DESCRIPTION,
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

const sitelinksJsonLd = {
  "@context": "https://schema.org",
  "@type": "SiteNavigationElement",
  name: [
    "About",
    "Tours",
    "Tourist Visa",
    "Travel Partners",
    "Gallery",
    "Our Team",
    "Blogs",
    "Contact",
  ],
  url: [
    `${SITE_URL}/about`,
    `${SITE_URL}/tours`,
    `${SITE_URL}/tourist-visa`,
    `${SITE_URL}/travel-partners`,
    `${SITE_URL}/gallery`,
    `${SITE_URL}/team`,
    `${SITE_URL}/blogs`,
    `${SITE_URL}/contact`,
  ],
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
    default: SITE_TITLE,
    template: "%s | Terra Pakistan",
  },
  description: SITE_DESCRIPTION,
  keywords: [
    "Pakistan tourism",
    "Hunza Valley tours",
    "Skardu trips",
    "Fairy Meadows trek",
    "Pakistan travel agency",
    "Terra Pakistan",
  ],
  openGraph: {
    title: SITE_TITLE,
    description: SITE_DESCRIPTION,
    url: SITE_URL,
    siteName: SITE_NAME,
    locale: "en_US",
    type: "website",
    images: [
      {
        url: SITE_OG_IMAGE,
        width: 1200,
        height: 630,
        alt: SITE_TITLE,
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: SITE_TITLE,
    description: SITE_DESCRIPTION,
    images: [SITE_OG_IMAGE],
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
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(sitelinksJsonLd) }}
        />
        <ThemeProvider>
          <LayoutShell>{children}</LayoutShell>
        </ThemeProvider>
      </body>
    </html>
  );
}
