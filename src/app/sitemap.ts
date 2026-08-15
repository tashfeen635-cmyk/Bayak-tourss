import type { MetadataRoute } from "next";

import { SITE_URL } from "@/lib/seo";

export default function sitemap(): MetadataRoute.Sitemap {
  const routes = [
    "",
    "/tashfeenbinriaz",
    "/about",
    "/tours",
    "/gallery",
    "/team",
    "/contact",
    "/blogs",
    "/tourist-visa",
    "/work-with-us",
  ];

  return routes.map((route) => ({
    url: `${SITE_URL}${route}`,
    lastModified: new Date(),
    changeFrequency: "weekly",
    priority: route === "" ? 1 : 0.8,
  }));
}
