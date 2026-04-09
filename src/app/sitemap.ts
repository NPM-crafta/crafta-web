import type { MetadataRoute } from "next";
import { craftaPackages } from "../lib/site-data";

const base = "https://crafta.dev";

export default function sitemap(): MetadataRoute.Sitemap {
  const now = new Date();

  const staticRoutes: MetadataRoute.Sitemap = [
    {
      url: `${base}/`,
      lastModified: now,
      changeFrequency: "weekly",
      priority: 1,
    },
    {
      url: `${base}/packages`,
      lastModified: now,
      changeFrequency: "weekly",
      priority: 0.95,
    },
    {
      url: `${base}/docs`,
      lastModified: now,
      changeFrequency: "weekly",
      priority: 0.95,
    },
    {
      url: `${base}/ecosystem`,
      lastModified: now,
      changeFrequency: "weekly",
      priority: 0.86,
    },
    {
      url: `${base}/guides`,
      lastModified: now,
      changeFrequency: "weekly",
      priority: 0.88,
    },
    {
      url: `${base}/showcase`,
      lastModified: now,
      changeFrequency: "weekly",
      priority: 0.84,
    },
    {
      url: `${base}/contact`,
      lastModified: now,
      changeFrequency: "monthly",
      priority: 0.8,
    },
  ];

  const packageRoutes: MetadataRoute.Sitemap = craftaPackages.map((pkg) => ({
    url: `${base}/packages/${pkg.slug}`,
    lastModified: now,
    changeFrequency: "weekly",
    priority: pkg.status === "stable" ? 0.9 : 0.72,
  }));

  return [...staticRoutes, ...packageRoutes];
}
