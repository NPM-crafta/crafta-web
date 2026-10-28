import type { MetadataRoute } from "next";
import { craftaPackages } from "../lib/site-data";
import { AUTH_ERROR_CODES, API_REFERENCE_ITEMS, AUTH_FLOW_DIAGRAMS } from "../lib/auth-docs-data";

const base = "https://crafta.dev";

// Anchor fragments are added to sitemap URLs to surface key doc sections for crawlers
const authAnchors = ["#quick-start", "#configuration", "#security-flows", "#api-reference", "#error-reference", "#production-checklist"];

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
      url: `${base}/docs/crafta-auth#quick-start`,
      lastModified: now,
      changeFrequency: "weekly",
      priority: 0.85,
    },
    {
      url: `${base}/docs/crafta-auth#configuration`,
      lastModified: now,
      changeFrequency: "weekly",
      priority: 0.85,
    },
    {
      url: `${base}/docs/crafta-auth#security-flows`,
      lastModified: now,
      changeFrequency: "weekly",
      priority: 0.9,
    },
    {
      url: `${base}/docs/crafta-auth#api-reference`,
      lastModified: now,
      changeFrequency: "weekly",
      priority: 0.9,
    },
    {
      url: `${base}/docs/crafta-auth#error-reference`,
      lastModified: now,
      changeFrequency: "weekly",
      priority: 0.9,
    },
    {
      url: `${base}/docs/crafta-auth#production-checklist`,
      lastModified: now,
      changeFrequency: "weekly",
      priority: 0.85,
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
      authAnchors.forEach((anchor) => {
        routes.push({
          url: `${base}/docs/crafta-auth${anchor}`,
          lastModified: now,
          changeFrequency: "weekly",
          priority: 0.8,
        });
      });
    }
    return routes;
  });

  return [...staticRoutes, ...packageRoutes];
}
