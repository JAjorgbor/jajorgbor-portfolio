import type { MetadataRoute } from "next";
import { siteUrl } from "@/lib/site-url";

export default function robots(): MetadataRoute.Robots {
  return {
    rules: { userAgent: "*", allow: "/", disallow: ["/studio", "/tokens"] },
    sitemap: `${siteUrl().origin}/sitemap.xml`,
  };
}
