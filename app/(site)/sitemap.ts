import type { MetadataRoute } from "next";
import { siteUrl } from "@/lib/site-url";
import { client } from "@/sanity/lib/client";
import { PROJECT_SLUGS_QUERY } from "@/sanity/lib/queries";

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const base = siteUrl().origin;
  const slugs = await client.fetch<{ slug: string }[]>(PROJECT_SLUGS_QUERY);
  const now = new Date();
  return [
    { url: `${base}/`, lastModified: now, priority: 1 },
    { url: `${base}/work`, lastModified: now, priority: 0.8 },
    { url: `${base}/about`, lastModified: now, priority: 0.6 },
    { url: `${base}/contact`, lastModified: now, priority: 0.6 },
    ...slugs.map(({ slug }) => ({ url: `${base}/projects/${slug}`, lastModified: now, priority: 0.7 })),
  ];
}
