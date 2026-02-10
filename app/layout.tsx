import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import { MouseTracker } from "@/components/ui/mouse-glow";
import "./globals.css";
import { SmoothCursor } from "@/components/ui/smooth-cursor";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Joshua Ajorgbor | Product-Focused Full-Stack Developer",
  description:
    "Full-Stack Developer with 4+ years of experience building scalable software solutions with TypeScript, Next.js, and Node.js.",
};

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
      </body>
    </html>
  );
}
