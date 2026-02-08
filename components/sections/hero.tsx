"use client";

import { motion } from "framer-motion";
import { ArrowRight } from "lucide-react";
import Link from "next/link";
import { BackgroundBeams } from "@/components/ui/background-beams"; // Placeholder for a Magic UI effect
import { Container } from "@/components/ui/container";
import { Button } from "@/components/ui/button";
import { HeroVisual } from "@/components/ui/hero-visual";

export function Hero() {
  return (
    <section
      className="relative flex lg:h-screen min-h-[800px] w-full items-center justify-center overflow-hidden bg-neutral-950 text-neutral-50 py-20 lg:py-0"
      id="home"
    >
      <BackgroundBeams className="opacity-15" />
      <div className="absolute inset-0 z-0 bg-[radial-gradient(circle_at_20%_20%,rgba(245,158,11,0.1),transparent_40%),radial-gradient(circle_at_80%_80%,rgba(217,119,6,0.1),transparent_40%),radial-gradient(circle_at_50%_50%,rgba(245,158,11,0.05),transparent_60%)]" />
      <div className="absolute inset-0 z-0 bg-linear-to-t from-neutral-950 via-neutral-950/20 to-transparent" />

      <Container className="relative z-10 font-sans">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-24 items-center">
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8, ease: "easeOut" }}
            className="flex flex-col items-start gap-6 font-bold tracking-tight text-neutral-50 sm:gap-8 order-2 lg:order-1"
          >
            <motion.h1
              className="text-4xl sm:text-6xl leading-[0.9] text-transparent bg-clip-text bg-linear-to-br from-neutral-50 to-neutral-400"
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.8, ease: "easeOut", delay: 0.2 }}
            >
              Product-Focused <br />
              Fullstack Engineer.
            </motion.h1>

            <motion.p
              className="max-w-xl text-lg sm:text-xl text-neutral-400 font-light"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.8, ease: "easeOut", delay: 0.4 }}
            >
              Joshua Ajorgbor — Building scalable software solutions for
              startups and enterprises across Africa and Beyond ✨🚀.
            </motion.p>

            <motion.div
              className="flex gap-4 flex-wrap mt-8"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, ease: "easeOut", delay: 0.6 }}
            >
              <Button
                className="rounded-full bg-neutral-50 text-neutral-950 hover:bg-neutral-200 md:px-8 md:py-6 text-lg"
                variant="primary"
                onClick={() =>
                  document
                    .getElementById("projects")
                    ?.scrollIntoView({ behavior: "smooth" })
                }
              >
                View Projects
              </Button>
              <Button
                asChild
                className="rounded-full border-neutral-800 text-neutral-400 hover:text-neutral-50 hover:bg-neutral-900 md:px-8 md:py-6 text-lg cursor-pointer flex-1"
                variant="outline"
              >
                <a
                  href="https://showcv.ng/joshua-ajorgbor"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  View Resume
                </a>
              </Button>
            </motion.div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, scale: 0.8, rotate: 5 }}
            animate={{ opacity: 1, scale: 1, rotate: 0 }}
            transition={{ duration: 1, ease: "circOut", delay: 0.5 }}
            className="flex justify-center items-center order-1 lg:order-2 scale-75 sm:scale-90 lg:scale-100"
          >
            <HeroVisual />
          </motion.div>
        </div>
      </Container>
    </section>
  );
}
