import type { MetadataRoute } from "next";
import { siteConfig } from "@/config/site";
import { getFeatures } from "@/lib/features";

/** Public URLs only — admin routes are intentionally excluded. */
export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const features = await getFeatures();
  const base = siteConfig.url.replace(/\/$/, "");
  const now = new Date();

  const routes: { path: string; enabled: boolean }[] = [
    { path: "/", enabled: true },
    { path: "/brothers", enabled: features.brothers },
    { path: "/events", enabled: features.events },
    { path: "/recruitment", enabled: features.recruitment },
    { path: "/newsletter", enabled: features.newsletter },
    { path: "/about", enabled: features.about },
    { path: "/potluck", enabled: features.potluck },
  ];

  return routes
    .filter((r) => r.enabled)
    .map((r) => ({
      url: `${base}${r.path}`,
      lastModified: now,
      changeFrequency: "weekly",
      priority: r.path === "/" ? 1 : 0.7,
    }));
}
