import type { Metadata } from "next";
import { Playfair_Display, Inter } from "next/font/google";
import "./globals.css";
import { ThemeProvider } from "@/components/theme-provider";
import { LayoutShell } from "@/components/layout-shell";

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
    url: "https://bayaktours.com",
    siteName: "Bayak Tours",
    locale: "en_US",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "Bayak Tours | Premium Pakistan Travel Experiences",
    description:
      "Discover Pakistan with Bayak Tours. Premium travel experiences to Hunza, Skardu, Fairy Meadows, and more.",
  },
  icons: {
    icon: "/favicon.png",
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
        <ThemeProvider>
          <LayoutShell>{children}</LayoutShell>
        </ThemeProvider>
      </body>
    </html>
  );
}
