"use client";

import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { cn } from "@/lib/utils";

const NAV_ITEMS = [
  { name: "Projects", href: "/#projects" },
  { name: "About", href: "/#about" },
  { name: "Contact", href: "/#contact" },
];

export function Header() {
  const pathname = usePathname();
  const [isScrolled, setIsScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <motion.header
      initial={{ y: -100 }}
      animate={{
        y: 0,
        width: isScrolled ? "60%" : "100%",
        top: isScrolled ? 12 : 0,
      }}
      transition={{ duration: 0.3, ease: "easeInOut" }}
      className={cn(
        "fixed z-50 flex items-center justify-center md:justify-between left-1/2 -translate-x-1/2 transition-all duration-300",
        isScrolled
          ? "h-14 px-8 rounded-2xl border border-white/10 bg-black/60 backdrop-blur-lg shadow-2xl"
          : "h-16 px-6 md:px-12 border-b border-white/10 bg-black/50 backdrop-blur-md",
      )}
    >
      <Link
        href="/"
        className="text-xl font-bold tracking-tighter text-white shrink-0"
      >
        Joshua <span className="text-amber-500">Ajorgbor</span>
      </Link>

      <nav
        className={cn(
          "hidden md:flex items-center gap-8 transition-all duration-300",
        )}
      >
        {NAV_ITEMS.map((item) => (
          <Link
            key={item.href}
            href={item.href}
            className={cn(
              "text-sm font-medium text-neutral-400 transition-colors hover:text-white",
              pathname === item.href && "text-white",
            )}
          >
            {item.name}
          </Link>
        ))}
      </nav>

      <a
        href="https://showcv.ng/joshua-ajorgbor"
        target="_blank"
        rel="noopener noreferrer"
        className={cn(
          "hidden md:inline-flex items-center justify-center rounded-full bg-white text-black text-xs font-semibold transition-all hover:scale-105 active:scale-95",
          isScrolled ? "px-4 py-1.5" : "px-5 py-2",
        )}
      >
        Resume
      </a>
    </motion.header>
  );
}
