"use client";

import React, { useEffect, useState, useCallback } from "react";
import { motion, useSpring, useMotionValue } from "framer-motion";

/**
 * A subtle, blurred orb that follows the mouse cursor to add depth and
 * atmospheric motion to the portfolio background.
 */
export function MouseTracker() {
  const [isMounted, setIsMounted] = useState(false);

  // Use MotionValues for high-performance updates outside of React's render cycle
  const mouseX = useMotionValue(-500);
  const mouseY = useMotionValue(-500);

  // Smooth springs create the "natural lag" requested
  // Damping: higher = less oscillation; Stiffness: higher = faster snap
  const springConfig = { damping: 40, stiffness: 150, mass: 0.8 };
  const smoothX = useSpring(mouseX, springConfig);
  const smoothY = useSpring(mouseY, springConfig);

  const handleMouseMove = useCallback(
    (e: MouseEvent) => {
      // Offset by half the orb's size (600px / 2 = 300)
      mouseX.set(e.clientX - 300);
      mouseY.set(e.clientY - 300);
    },
    [mouseX, mouseY],
  );

  useEffect(() => {
    // Only enable for devices that support fine pointer movement
    if (window.matchMedia("(hover: hover)").matches) {
      setIsMounted(true);
      window.addEventListener("mousemove", handleMouseMove);
    }

    return () => window.removeEventListener("mousemove", handleMouseMove);
  }, [handleMouseMove]);

  if (!isMounted) return null;

  return (
    <div
      className="pointer-events-none fixed inset-0 z-0 overflow-hidden"
      aria-hidden="true"
    >
      <motion.div
        className="absolute h-[600px] w-[600px] rounded-full bg-amber-500/[0.1] blur-[120px]"
        style={{
          x: smoothX,
          y: smoothY,
        }}
      />
    </div>
  );
}
