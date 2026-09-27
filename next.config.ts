import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  images: {
    // All images are served by the Sanity CDN; see sanity/lib/image-loader.ts.
    loader: "custom",
    loaderFile: "./sanity/lib/image-loader.ts",
    remotePatterns: [{ protocol: "https", hostname: "cdn.sanity.io" }],
  },
  // Browsers still request /favicon.ico unprompted; serve the SVG mark.
  async redirects() {
    return [{ source: "/favicon.ico", destination: "/icon.svg", permanent: true }];
  },
};

export default nextConfig;
