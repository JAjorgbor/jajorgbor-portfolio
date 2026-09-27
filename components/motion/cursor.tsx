"use client";

import { useEffect, useRef } from "react";
import { finePointer, gsap, reducedMotion, tokens } from "@/lib/motion/gsap";

// §7.8 An 8px dot in blend-ink that follows with --ease-dolly. Elements set
// data-cursor="view|open|drag" to change its state; links to other origins
// read as "open" automatically. Not rendered on coarse pointers or under
// reduced motion, where the native cursor stays.
export function Cursor() {
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const el = ref.current;
    if (!el || !finePointer() || reducedMotion()) return;

    const t = tokens();
    const label = el.querySelector<HTMLElement>("[data-label]")!;
    const x = gsap.quickTo(el, "x", { duration: t.dur(2), ease: t.ease.dolly });
    const y = gsap.quickTo(el, "y", { duration: t.dur(2), ease: t.ease.dolly });
    gsap.set(el, { xPercent: -50, yPercent: -50, autoAlpha: 0 });
    document.documentElement.classList.add("has-cursor");

    let shown = false;
    const move = (e: MouseEvent) => {
      x(e.clientX);
      y(e.clientY);
      if (!shown) {
        shown = true;
        gsap.to(el, { autoAlpha: 1, duration: t.dur(1) });
      }
    };
    const over = (e: MouseEvent) => {
      const target = e.target as HTMLElement;
      const tagged = target.closest<HTMLElement>("[data-cursor]");
      const anchor = target.closest<HTMLAnchorElement>("a[href]");
      const external = anchor && anchor.origin !== location.origin;
      const state = tagged?.dataset.cursor ?? (external ? "open" : anchor ? "link" : "");
      el.dataset.state = state;
      label.textContent = state === "view" ? "View" : state === "open" ? "↗" : state === "drag" ? "←→" : "";
    };
    const leave = () => gsap.to(el, { autoAlpha: 0, duration: t.dur(1) });
    const enter = () => gsap.to(el, { autoAlpha: 1, duration: t.dur(1) });

    window.addEventListener("mousemove", move, { passive: true });
    document.addEventListener("mouseover", over);
    document.documentElement.addEventListener("mouseleave", leave);
    document.documentElement.addEventListener("mouseenter", enter);
    return () => {
      window.removeEventListener("mousemove", move);
      document.removeEventListener("mouseover", over);
      document.documentElement.removeEventListener("mouseleave", leave);
      document.documentElement.removeEventListener("mouseenter", enter);
      document.documentElement.classList.remove("has-cursor");
    };
  }, []);

  return (
    <div ref={ref} aria-hidden="true" className="cursor">
      <span className="cursor__dot" />
      <span className="cursor__ring" />
      <span data-label className="cursor__label meta" />
    </div>
  );
}
