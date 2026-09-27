// The canonical origin, for metadataBase, the sitemap and robots. Set
// NEXT_PUBLIC_SITE_URL in production; on Vercel the production URL is used
// when it is not set; locally it falls back to the dev server.
export function siteUrl() {
  const explicit = process.env.NEXT_PUBLIC_SITE_URL;
  if (explicit) return new URL(explicit);
  const vercel = process.env.VERCEL_PROJECT_PRODUCTION_URL;
  if (vercel) return new URL(`https://${vercel}`);
  return new URL("http://localhost:3000");
}
