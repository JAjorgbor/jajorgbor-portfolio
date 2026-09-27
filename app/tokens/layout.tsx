import type { Metadata } from "next";
import { display, displayItalic, text } from "@/app/fonts";
import "@/app/tokens.css";
import "./tokens.css";

export const metadata: Metadata = {
  title: "Tokens",
  robots: { index: false, follow: false },
};

export default function TokensLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="en" className={`${display.variable} ${displayItalic.variable} ${text.variable}`}>
      <body>{children}</body>
    </html>
  );
}
