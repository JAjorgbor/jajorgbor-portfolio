"use client";

import Lenis from "lenis";
import { useEffect } from "react";
import { finePointer, gsap, reducedMotion, ScrollTrigger } from "@/lib/motion/gsap";

// §6 Scroll. Weighted scroll on fine pointers only; native everywhere else.
export function SmoothScroll() {
  useEffect(() => {
    if (reducedMotion() || !finePointer()) return;

    const lenis = new Lenis({
      lerp: 0.08,
      duration: 1.2,
      smoothWheel: true,
      syncTouch: false,
      anchors: true,
    });

    lenis.on("scroll", ScrollTrigger.update);
    const tick = (time: number) => lenis.raf(time * 1000);
    gsap.ticker.add(tick);
    gsap.ticker.lagSmoothing(0);

    return () => {
      gsap.ticker.remove(tick);
      lenis.destroy();
    };
  }, []);

  return null;
}
