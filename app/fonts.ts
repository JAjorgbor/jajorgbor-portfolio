import { Instrument_Sans } from "next/font/google";
import localFont from "next/font/local";

// DESIGN.md §3. The display face is Fraunces at a single instance (optical
// size 144, weight 300), committed as two static Latin files: 16 KB roman and
// 21 KB italic, against 118 KB + 146 KB for the variable files with the SOFT
// and WONK axes (measured in build step 6). The roman is the only preloaded
// font on the site: it is the LCP element on every page.
export const display = localFont({
  src: "./fonts/fraunces-display.woff2",
  weight: "300",
  style: "normal",
  display: "swap",
  preload: true,
  adjustFontFallback: "Times New Roman",
  variable: "--font-display",
});

export const displayItalic = localFont({
  src: "./fonts/fraunces-display-italic.woff2",
  weight: "300",
  style: "italic",
  display: "swap",
  preload: false,
  adjustFontFallback: "Times New Roman",
  variable: "--font-display-italic",
});

export const text = Instrument_Sans({
  subsets: ["latin"],
  weight: "variable",
  style: ["normal", "italic"],
  axes: ["wdth"],
  display: "swap",
  preload: false,
  variable: "--font-text",
});
