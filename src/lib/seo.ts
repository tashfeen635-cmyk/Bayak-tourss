import type { Metadata } from "next";

const PROD_URL = "https://terrapakistan.com";

export const SITE_URL =
  process.env.NEXT_PUBLIC_SITE_URL ??
  (process.env.VERCEL_URL ? `https://${process.env.VERCEL_URL}` : PROD_URL);
export const SITE_NAME = "Terra Pakistan";
export const SITE_TITLE = "Terra Pakistan | Premium Pakistan Travel Experiences";
export const SITE_DESCRIPTION =
  "Discover Pakistan with Terra Pakistan. Premium travel experiences to Hunza, Skardu, Fairy Meadows, and more. Adventure, culture & unforgettable journeys.";
export const SITE_OG_IMAGE = `${SITE_URL}/og-image.jpg`;

type BuildMetadataOptions = {
  title: string;
  description: string;
  path: string;
  image?: string;
};

export function buildMetadata({
  title,
  description,
  path,
  image = SITE_OG_IMAGE,
}: BuildMetadataOptions): Metadata {
  const ogTitle = title === SITE_TITLE ? SITE_TITLE : `${title} | ${SITE_NAME}`;
  return {
    title,
    description,
    alternates: {
      canonical: path,
    },
    openGraph: {
      title: ogTitle,
      description,
      url: `${SITE_URL}${path}`,
      siteName: SITE_NAME,
      locale: "en_US",
      type: "website",
      images: [
        {
          url: image,
          width: 1200,
          height: 630,
          alt: ogTitle,
        },
      ],
    },
    twitter: {
      card: "summary_large_image",
      title: ogTitle,
      description,
      images: [image],
    },
  };
}
