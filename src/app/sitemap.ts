import type { MetadataRoute } from "next";

const SITE_URL = "https://terrapakistan.com";

export default function sitemap(): MetadataRoute.Sitemap {
  const routes = [
    "",
    "/about",
    "/tours",
    "/gallery",
    "/team",
    "/contact",
    "/blogs",
    "/tourist-visa",
    "/creators-and-group-leaders",
  ];

  return routes.map((route) => ({
    url: `${SITE_URL}${route}`,
    lastModified: new Date(),
    changeFrequency: "weekly",
    priority: route === "" ? 1 : 0.8,
  }));
}
