"use client";

import { useEffect, useRef } from "react";
import { gsap, reducedMotion, tokens } from "@/lib/motion/gsap";

// §7.3 The lights-down. Wraps the hero and the work strip on Home. The strip
// ships with data-scene="theatre" so it is dark without JS; with motion
// allowed, that attribute is removed and this wrapper's tokens are scrubbed
// from Paper to Theatre over 60vh entering the strip, and back over 60vh
// leaving it.
export function Lights({ children }: { children: React.ReactNode }) {
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const wrapper = ref.current;
    const target = wrapper?.querySelector<HTMLElement>("[data-lights-target]");
    if (!wrapper || !target || reducedMotion()) return;

    const t = tokens();
    const paper = t.scene("paper");
    const theatre = t.scene("theatre");
    delete target.dataset.scene;

    const ctx = gsap.context(() => {
      gsap.set(wrapper, paper);
      gsap.fromTo(wrapper, paper, {
        ...theatre,
        ease: "none",
        scrollTrigger: { trigger: target, start: "top 90%", end: "top 30%", scrub: 0.6 },
      });
      gsap.fromTo(wrapper, theatre, {
        ...paper,
        ease: "none",
        immediateRender: false,
        scrollTrigger: { trigger: target, start: "bottom 70%", end: "bottom 10%", scrub: 0.6 },
      });
    });

    return () => {
      ctx.revert();
      target.dataset.scene = "theatre";
    };
  }, []);

  return (
    <div ref={ref} className="bg-bg text-ink">
      {children}
    </div>
  );
}
