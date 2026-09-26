import type { Metadata } from "next";
import { Analytics } from "@vercel/analytics/next";
import { Geist, Geist_Mono } from "next/font/google";
import { SpeedInsights } from "@vercel/speed-insights/next";
import { MouseTracker } from "@/components/ui/mouse-glow";
import "../globals.css";
import { SmoothCursor } from "@/components/ui/smooth-cursor";
import { SanityLive } from "@/sanity/lib/live";
import { getSettings } from "@/sanity/lib/fetch";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export async function generateMetadata(): Promise<Metadata> {
  const settings = await getSettings();
  return {
    title: settings?.seoTitle ?? settings?.name ?? "Portfolio",
    description: settings?.seoDescription ?? undefined,
  };
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className="scroll-smooth">
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased selection:bg-amber-500/30 selection:text-white relative`}
      >
        <Analytics />
        <SpeedInsights />
        <MouseTracker />
        <SmoothCursor
          springConfig={{
            damping: 70,
            stiffness: 600,
            mass: 1,
            restDelta: 0.001,
          }}
        />

        {children}
        <SanityLive />
      </body>
    </html>
  );
}
