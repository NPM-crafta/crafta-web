import type { MetadataRoute } from "next";
import { craftaPackages } from "../lib/site-data";
import { AUTH_DOC_SECTIONS } from "@/lib/doc-sections";
import { AUTH_ERROR_CODES, API_REFERENCE_ITEMS, AUTH_FLOW_DIAGRAMS } from "../lib/auth-docs-data";

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
      url: `${base}/docs/crafta-auth`,
      lastModified: now,
      changeFrequency: "weekly",
      priority: 0.9,
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
      url: `${base}/ecosystem`,
      lastModified: now,
      changeFrequency: "weekly",
      priority: 0.82,
    },
    {
      url: `${base}/contact`,
      lastModified: now,
      changeFrequency: "monthly",
      priority: 0.8,
    },
  ];

  const packageRoutes: MetadataRoute.Sitemap = craftaPackages.flatMap((pkg) => {
    const routes: MetadataRoute.Sitemap = [
      {
        url: `${base}/packages/${pkg.slug}`,
        lastModified: now,
        changeFrequency: "weekly",
        priority: pkg.status === "stable" ? 0.9 : 0.72,
      },
      {
        url: `${base}/docs/${pkg.slug}`,
        lastModified: now,
        changeFrequency: "weekly",
        priority: pkg.status === "stable" ? 0.88 : 0.68,
      },
    ];
    if (pkg.slug === "crafta-auth") {
      AUTH_DOC_SECTIONS.forEach((sec) => {
        routes.push({
          url: `${base}/docs/crafta-auth/${sec.id}`,
          lastModified: now,
          changeFrequency: "weekly",
          priority: 0.85,
        });
      });
    }
    return routes;
  });

  return [...staticRoutes, ...packageRoutes];
}
