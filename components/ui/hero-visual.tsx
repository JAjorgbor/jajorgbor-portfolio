"use client";

import React from "react";
import { motion } from "framer-motion";
import { Code2, Database, Layout, Smartphone, Zap } from "lucide-react";

/**
 * An abstract, technical visual representation of Fullstack Product Engineering.
 * Features floating UI elements, code abstractions, and system nodes.
 */
export function HeroVisual() {
  return (
    <div className="relative h-[400px] w-full max-w-[500px] lg:h-[500px]">
      {/* Central "Core" Node */}
      <motion.div
        className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 z-20"
        animate={{
          scale: [1, 1.05, 1],
          rotate: [0, 5, -5, 0],
        }}
        transition={{
          duration: 10,
          repeat: Infinity,
          ease: "easeInOut",
        }}
      >
        <div className="size-16 md:size-24 rounded-2xl bg-amber-500/20 border border-amber-500/50 backdrop-blur-xl flex items-center justify-center shadow-[0_0_50px_-12px_rgba(245,158,11,0.5)]">
          <Zap className="size-8 md:size-10 text-amber-500" />
        </div>
      </motion.div>

      {/* Floating System Components */}
      <FloatingCard
        delay={0}
        duration={6}
        className="top-0 left-0"
        icon={<Layout className="h-5 w-5 text-amber-400" />}
        label="Frontend"
        tags={["Next.js", "React"]}
      />

      <FloatingCard
        delay={1.5}
        duration={7}
        className="bottom-12 right-0"
        icon={<Database className="h-5 w-5 text-amber-600" />}
        label="Backend"
        tags={["Node.js", "Bun"]}
      />

      <FloatingCard
        delay={3}
        duration={8}
        className="top-12 right-12"
        icon={<Code2 className="h-5 w-5 text-amber-500" />}
        label="Logic"
        tags={["TypeScript"]}
      />

      <FloatingCard
        delay={4.5}
        duration={6.5}
        className="bottom-0 left-12"
        icon={<Smartphone className="h-5 w-5 text-amber-300" />}
        label="Mobile"
        tags={["Native"]}
      />

      {/* Decorative Connecting Lines (Abstract) */}
      <svg
        className="absolute inset-0 h-full w-full opacity-20"
        viewBox="0 0 500 500"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
      >
        <motion.path
          d="M100 100 L250 250 L400 400"
          stroke="url(#gradient1)"
          strokeWidth="1"
          strokeDasharray="5 5"
          animate={{ strokeDashoffset: [0, -20] }}
          transition={{ duration: 2, repeat: Infinity, ease: "linear" }}
        />
        <motion.path
          d="M400 100 L250 250 L100 400"
          stroke="url(#gradient1)"
          strokeWidth="1"
          strokeDasharray="5 5"
          animate={{ strokeDashoffset: [0, 20] }}
          transition={{ duration: 2, repeat: Infinity, ease: "linear" }}
        />
        <defs>
          <linearGradient id="gradient1" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stopColor="#f59e0b" />
            <stop offset="100%" stopColor="#d97706" />
          </linearGradient>
        </defs>
      </svg>

      {/* Background Glows */}
      <div className="absolute -inset-4 bg-amber-500/5 blur-3xl rounded-full" />
    </div>
  );
}

function FloatingCard({
  className,
  icon,
  label,
  tags,
  delay = 0,
  duration = 5,
}: {
  className?: string;
  icon: React.ReactNode;
  label: string;
  tags: string[];
  delay?: number;
  duration?: number;
}) {
  return (
    <motion.div
      className={`absolute z-30 ${className}`}
      initial={{ opacity: 0, scale: 0.9 }}
      animate={{
        opacity: 1,
        scale: 1,
        y: [0, -15, 0],
      }}
      transition={{
        opacity: { duration: 1, delay },
        scale: { duration: 1, delay },
        y: {
          duration,
          repeat: Infinity,
          ease: "easeInOut",
          delay,
        },
      }}
    >
      <div className="flex flex-col gap-2 p-4 rounded-xl bg-neutral-900/80 border border-neutral-800 backdrop-blur-md shadow-xl">
        <div className="flex items-center gap-3">
          <div className="p-2 rounded-lg bg-neutral-800 border border-neutral-700">
            {icon}
          </div>
          <span className="text-sm font-bold text-neutral-200">{label}</span>
        </div>
        <div className="flex gap-1.5">
          {tags.map((tag) => (
            <span
              key={tag}
              className="px-2 py-0.5 rounded text-[10px] bg-neutral-800/50 text-neutral-500 font-mono"
            >
              {tag}
            </span>
          ))}
        </div>
      </div>
    </motion.div>
  );
}
