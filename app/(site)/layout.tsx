import type { Metadata } from "next";
import { Analytics } from "@vercel/analytics/next";
import { SpeedInsights } from "@vercel/speed-insights/next";
import { ViewTransitions } from "next-view-transitions";
import { display, displayItalic, text } from "@/app/fonts";
import "../globals.css";
import { Cursor } from "@/components/motion/cursor";
import { Grain } from "@/components/motion/grain";
import { Magnetic } from "@/components/motion/magnetic";
import { Reveals } from "@/components/motion/reveals";
import { SharedTitle } from "@/components/motion/shared-title";
import { SmoothScroll } from "@/components/motion/smooth-scroll";
import { EndCard } from "@/components/site/end-card";
import { Header } from "@/components/site/header";
import { siteUrl } from "@/lib/site-url";
import { getSettings } from "@/sanity/lib/fetch";

export async function generateMetadata(): Promise<Metadata> {
  const settings = await getSettings();
  const title = settings?.seoTitle ?? settings?.name ?? "Portfolio";
  return {
    metadataBase: siteUrl(),
    title,
    description: settings?.seoDescription ?? undefined,
    openGraph: { type: "website", siteName: settings?.name ?? undefined, title },
    twitter: { card: "summary_large_image" },
  };
}

// Runs before first paint. data-motion="on" only when JS is on and motion is
// allowed: only then do data-reveal elements start hidden (globals.css), so
// nobody else waits for an animation to read the page. data-leader="play"
// shows the preloader on Home, once per session. Both are attributes React never
// renders, so hydration has nothing to diff.
const PRE_PAINT = `(function(){var h=document.documentElement;if(matchMedia("(prefers-reduced-motion: reduce)").matches)return;h.setAttribute("data-motion","on");try{if(location.pathname==="/"&&!sessionStorage.getItem("leaderSeen"))h.setAttribute("data-leader","play")}catch(e){}})()`;

export default async function SiteLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  const settings = await getSettings();

  return (
    <ViewTransitions>
      <html lang="en" className={`${display.variable} ${displayItalic.variable} ${text.variable}`}
        suppressHydrationWarning>
        <head>
          <script dangerouslySetInnerHTML={{ __html: PRE_PAINT }} />
        </head>
        <body className="min-h-svh flex flex-col">
          <a
            href="#main"
            className="meta absolute left-(--margin) top-4 z-50 -translate-y-24 bg-bg px-3 py-2 text-ink focus:translate-y-0"
          >
            Skip to content
          </a>
          <Header settings={settings} />
          <main id="main" className="flex-1">
            {children}
          </main>
          <EndCard settings={settings} />
          <SmoothScroll />
          <Reveals />
          <SharedTitle />
          <Magnetic />
          <Cursor />
          <Grain />
          <Analytics />
          <SpeedInsights />
        </body>
      </html>
    </ViewTransitions>
  );
}
