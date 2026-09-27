"use client";

import { useEffect, useRef } from "react";
import { gsap, leader, tokens } from "@/lib/motion/gsap";

// Survives React's development double-invocation of effects: the timeline is
// created once per page load and never killed by a cleanup.
let started = false;

// §7.1 A film leader: 3, 2, 1, each pulling into focus, then the curtain
// rises. Rendered on the server (the first number visible, so it is the
// page's first large paint) but only displayed when the pre-paint script sets
// data-leader="play": Home, motion allowed, not yet seen this session. The
// focus pull is a blur, which stays on the compositor.
export function Leader() {
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const el = ref.current;
    const html = document.documentElement;
    if (!el || html.dataset.leader !== "play" || started) return;
    started = true;

    const t = tokens();
    const total = t.dur(5);
    const per = (total - 0.5) / 3;
    leader.offset = total + 0.1;
    sessionStorage.setItem("leaderSeen", "1");
    document.body.style.overflow = "hidden";

    const numbers = el.querySelectorAll<HTMLElement>("[data-number]");
    const ring = el.querySelector<SVGCircleElement>("circle[pathLength]");
    const tl = gsap.timeline({
      onComplete: () => {
        delete html.dataset.leader;
        el.style.display = "none";
        document.body.style.overflow = "";
        leader.offset = 0;
      },
    });

    gsap.set(el, { clipPath: "inset(0% 0 0% 0)" });
    numbers.forEach((n, i) => {
      const at = i * per;
      tl.set(numbers, { autoAlpha: 0 }, at);
      tl.set(n, { autoAlpha: 1 }, at);
      tl.fromTo(n, { filter: "blur(8px)" }, { filter: "blur(0px)", duration: per * 0.8, ease: t.ease.curtain }, at);
      if (ring) {
        tl.fromTo(ring, { strokeDashoffset: 1 }, { strokeDashoffset: 0, duration: per, ease: "none" }, at);
      }
    });
    tl.to(el, { clipPath: "inset(0% 0 100% 0)", duration: 0.5, ease: t.ease.curtain }, total - 0.5);
  }, []);

  return (
    <div
      ref={ref}
      aria-hidden="true"
      className="leader fixed inset-0 z-60 place-items-center bg-bg text-ink"
    >
      <div className="relative grid size-[min(60vw,24rem)] place-items-center">
        <svg className="absolute inset-0 size-full -rotate-90" viewBox="0 0 100 100" fill="none">
          <circle cx="50" cy="50" r="49" stroke="var(--line)" strokeWidth="0.5" />
          <circle
            cx="50"
            cy="50"
            r="49"
            stroke="var(--accent)"
            strokeWidth="0.5"
            pathLength={1}
            strokeDasharray={1}
            strokeDashoffset={1}
          />
        </svg>
        {[3, 2, 1].map((n, i) => (
          <span
            key={n}
            data-number
            className={`display absolute text-step-6 ${i === 0 ? "" : "opacity-0"}`}
          >
            {n}
          </span>
        ))}
      </div>
    </div>
  );
}
