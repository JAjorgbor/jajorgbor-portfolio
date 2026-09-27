import type { ImageLoaderProps } from "next/image";

// Global next/image loader (next.config.ts → images.loaderFile). Every image
// on the site comes from the Sanity CDN, which resizes and converts to
// AVIF/WebP itself, so the srcset is built from it directly and nothing goes
// through /_next/image (DESIGN.md §10).
export default function sanityLoader({ src, width, quality }: ImageLoaderProps) {
  const url = new URL(src);
  url.searchParams.set("w", String(width));
  url.searchParams.set("auto", "format");
  url.searchParams.set("fit", "max");
  if (quality) url.searchParams.set("q", String(quality));
  return url.toString();
}
