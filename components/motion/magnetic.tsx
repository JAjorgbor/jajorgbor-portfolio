"use client";

import { usePathname } from "next/navigation";
import { useEffect } from "react";
import { finePointer, gsap, reducedMotion, tokens } from "@/lib/motion/gsap";

// §7.9 Magnetic pull on elements marked data-magnetic: 40px radius, 6px max
// displacement, --dur-2 / --ease-dolly. Used sparingly (nav links, the email).
export function Magnetic() {
  const pathname = usePathname();

  useEffect(() => {
    if (!finePointer() || reducedMotion()) return;
    const root = getComputedStyle(document.documentElement);
    const radius = parseFloat(root.getPropertyValue("--magnet-radius")) || 40;
    const shift = parseFloat(root.getPropertyValue("--magnet-shift")) || 6;
    const t = tokens();

    const cleanups = [...document.querySelectorAll<HTMLElement>("[data-magnetic]")].map((el) => {
      const x = gsap.quickTo(el, "x", { duration: t.dur(2), ease: t.ease.dolly });
      const y = gsap.quickTo(el, "y", { duration: t.dur(2), ease: t.ease.dolly });
      const move = (e: MouseEvent) => {
        const r = el.getBoundingClientRect();
        const dx = e.clientX - (r.left + r.width / 2);
        const dy = e.clientY - (r.top + r.height / 2);
        const dist = Math.hypot(dx, dy);
        const reach = radius + Math.max(r.width, r.height) / 2;
        if (dist > reach) {
          x(0);
          y(0);
          return;
        }
        const k = shift / reach;
        x(dx * k);
        y(dy * k);
      };
      const reset = () => {
        x(0);
        y(0);
      };
      window.addEventListener("mousemove", move, { passive: true });
      el.addEventListener("mouseleave", reset);
      return () => {
        window.removeEventListener("mousemove", move);
        el.removeEventListener("mouseleave", reset);
      };
    });

    return () => cleanups.forEach((fn) => fn());
  }, [pathname]);

  return null;
}
