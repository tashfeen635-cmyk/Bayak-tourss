import type { Metadata } from "next";
import { SITE_URL } from "@/lib/seo";
import { Navbar } from "@/components/portfolio/Navbar";
import { Hero } from "@/components/portfolio/Hero";
import { Marquee } from "@/components/portfolio/Marquee";
import { Services } from "@/components/portfolio/Services";
import { Projects } from "@/components/portfolio/Projects";
import { About } from "@/components/portfolio/About";
import { Skills } from "@/components/portfolio/Skills";
import { Experience } from "@/components/portfolio/Experience";
import { Faq } from "@/components/portfolio/Faq";
import { Contact } from "@/components/portfolio/Contact";
import { Footer } from "@/components/portfolio/Footer";
import { faqs } from "@/components/portfolio/data";

const PORTFOLIO_URL = `${SITE_URL}/tashfeenbinriaz`;
const PORTFOLIO_OG_IMAGE = `${SITE_URL}/tashfeenbinriaz/og.png`;

export const metadata: Metadata = {
  metadataBase: new URL(SITE_URL),
  title: {
    default:
      "Tashfeen Bin Riaz — Full-Stack Web Developer & Shopify Developer in Gilgit-Baltistan",
    template: "%s | Tashfeen Bin Riaz",
  },
  description:
    "Tashfeen Bin Riaz is a Full-Stack Web Developer and Shopify Developer from Gilgit-Baltistan, Pakistan, specializing in modern websites, web applications, e-commerce platforms, and custom digital solutions built with React, Next.js, Node.js, Laravel, MongoDB, PostgreSQL, and Shopify.",
  keywords: [
    "Tashfeen Bin Riaz",
    "Tashfeen Riaz developer",
    "Full Stack Developer Gilgit Baltistan",
    "Web Developer Gilgit Baltistan",
    "Shopify Developer Pakistan",
    "Full Stack Developer Pakistan",
    "Web Developer Northern Pakistan",
    "Developer in Gilgit-Baltistan",
    "Shopify Developer Gilgit-Baltistan",
    "Terra Pakistan developer",
  ],
  alternates: {
    canonical: "/tashfeenbinriaz",
  },
  robots: {
    index: true,
    follow: true,
  },
  openGraph: {
    type: "profile",
    title: "Tashfeen Bin Riaz — Full-Stack Web Developer & Shopify Developer",
    description:
      "Building digital experiences from Gilgit-Baltistan to the world. Websites, web applications, and e-commerce built with modern engineering.",
    url: PORTFOLIO_URL,
    siteName: "Terra Pakistan",
    locale: "en_US",
    images: [
      {
        url: PORTFOLIO_OG_IMAGE,
        width: 1200,
        height: 630,
        alt: "Tashfeen Bin Riaz — Full-Stack Web Developer & Shopify Developer",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Tashfeen Bin Riaz — Full-Stack Web Developer & Shopify Developer",
    description:
      "Building digital experiences from Gilgit-Baltistan to the world.",
    images: [PORTFOLIO_OG_IMAGE],
  },
};

const personJsonLd = {
  "@context": "https://schema.org",
  "@type": "Person",
  "@id": `${PORTFOLIO_URL}/#person`,
  name: "Tashfeen Bin Riaz",
  url: PORTFOLIO_URL,
  jobTitle: "Full-Stack Web Developer & Shopify Developer",
  description:
    "Full-Stack Web Developer and Shopify Developer from Gilgit-Baltistan, Pakistan, specializing in modern websites, web applications, e-commerce platforms, and custom digital solutions built with React, Next.js, Node.js, Laravel, MongoDB, PostgreSQL, and Shopify.",
  address: {
    "@type": "PostalAddress",
    addressCountry: "PK",
    addressRegion: "Gilgit-Baltistan",
  },
  knowsAbout: [
    "Next.js",
    "React",
    "TypeScript",
    "Node.js",
    "NestJS",
    "PHP",
    "Laravel",
    "Python",
    "Django",
    "MongoDB",
    "PostgreSQL",
    "Shopify",
    "Shopify Liquid",
    "Tailwind CSS",
    "Docker",
    "AWS",
  ],
  sameAs: [
    "https://github.com/tashfeen635-cmyk",
    "https://www.linkedin.com/in/tashfeen-riaz-39b1a2396/",
  ],
};

const websiteJsonLd = {
  "@context": "https://schema.org",
  "@type": "WebSite",
  "@id": `${PORTFOLIO_URL}/#website`,
  url: PORTFOLIO_URL,
  name: "Tashfeen Bin Riaz — Web Developer Portfolio",
  description:
    "Portfolio of Tashfeen Bin Riaz, full-stack web developer and Shopify developer from Gilgit-Baltistan, Pakistan.",
  inLanguage: "en",
  author: {
    "@id": `${PORTFOLIO_URL}/#person`,
  },
};

const projectsJsonLd = {
  "@context": "https://schema.org",
  "@type": "ItemList",
  name: "Featured Projects by Tashfeen Bin Riaz",
  itemListElement: [
    {
      "@type": "ListItem",
      position: 1,
      item: {
        "@type": "CreativeWork",
        name: "Gilgit Adventure Treks",
        description:
          "Tourism website for travel experiences in Gilgit-Baltistan and Northern Pakistan, with tour presentation, admin functionality, and AI chatbot integration.",
      },
    },
    {
      "@type": "ListItem",
      position: 2,
      item: {
        "@type": "CreativeWork",
        name: "MAS Corporates",
        description:
          "Professional corporate business website with a modern UI, responsive development, and reliable deployment.",
      },
    },
    {
      "@type": "ListItem",
      position: 3,
      item: {
        "@type": "WebSite",
        name: "Terra Pakistan",
        url: SITE_URL,
        description:
          "Premium tourism digital platform for Pakistan's travel ecosystem, built with Next.js, TypeScript, and MongoDB.",
      },
    },
  ],
};

const breadcrumbJsonLd = {
  "@context": "https://schema.org",
  "@type": "BreadcrumbList",
  "@id": `${PORTFOLIO_URL}/#breadcrumb`,
  itemListElement: [
    {
      "@type": "ListItem",
      position: 1,
      name: "Home",
      item: SITE_URL,
    },
    {
      "@type": "ListItem",
      position: 2,
      name: "Tashfeen Bin Riaz — Full-Stack Web Developer",
      item: PORTFOLIO_URL,
    },
  ],
};

const webpageJsonLd = {
  "@context": "https://schema.org",
  "@type": "WebPage",
  "@id": `${PORTFOLIO_URL}/#webpage`,
  url: PORTFOLIO_URL,
  name: "Tashfeen Bin Riaz — Full-Stack Web Developer & Shopify Developer",
  description:
    "Portfolio of Tashfeen Bin Riaz, a full-stack web developer and Shopify developer from Gilgit-Baltistan, Pakistan.",
  inLanguage: "en",
  isPartOf: {
    "@id": `${SITE_URL}/#website`,
  },
  about: {
    "@id": `${PORTFOLIO_URL}/#person`,
  },
  mainEntity: {
    "@id": `${PORTFOLIO_URL}/#person`,
  },
  breadcrumb: {
    "@id": `${PORTFOLIO_URL}/#breadcrumb`,
  },
};

const faqJsonLd = {
  "@context": "https://schema.org",
  "@type": "FAQPage",
  "@id": `${PORTFOLIO_URL}/#faq`,
  mainEntity: faqs.map((faq) => ({
    "@type": "Question",
    name: faq.question,
    acceptedAnswer: {
      "@type": "Answer",
      text: faq.answer.replace(/\n+/g, " "),
    },
  })),
};

export default function PortfolioPage() {
  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(personJsonLd) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(websiteJsonLd) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(projectsJsonLd) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbJsonLd) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(webpageJsonLd) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(faqJsonLd) }}
      />
      <Navbar />
      <main id="main">
        <Hero />
        <Marquee />
        <Services />
        <Projects />
        <About />
        <Skills />
        <Experience />
        <Faq />
        <Contact />
      </main>
      <Footer />
    </>
  );
}
