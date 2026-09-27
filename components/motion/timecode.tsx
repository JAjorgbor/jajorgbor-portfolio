"use client";

import { useEffect, useRef } from "react";
import { reducedMotion } from "@/lib/motion/gsap";

const FPS = 24;
const pad = (n: number) => String(n).padStart(2, "0");

// §7.3 The running timecode. Starts when its section is in view, at 24fps,
// and holds its last value when scrolled away. Static under reduced motion.
export function Timecode({ className = "" }: { className?: string }) {
  const ref = useRef<HTMLSpanElement>(null);

  useEffect(() => {
    const el = ref.current;
    if (!el || reducedMotion()) return;

    let frames = 0;
    let raf = 0;
    let last = 0;
    let running = false;

    const tick = (now: number) => {
      if (now - last >= 1000 / FPS) {
        last = now;
        frames += 1;
        const s = Math.floor(frames / FPS);
        el.textContent = `${pad(Math.floor(s / 3600))}:${pad(Math.floor(s / 60) % 60)}:${pad(s % 60)}:${pad(frames % FPS)}`;
      }
      if (running) raf = requestAnimationFrame(tick);
    };

    const io = new IntersectionObserver(([entry]) => {
      running = entry.isIntersecting;
      cancelAnimationFrame(raf);
      if (running) raf = requestAnimationFrame(tick);
    });
    io.observe(el.closest("section") ?? el);

    return () => {
      running = false;
      cancelAnimationFrame(raf);
      io.disconnect();
    };
  }, []);

  return (
    <span ref={ref} className={`meta tabular-nums text-ink-3 ${className}`}>
      00:00:00:00
    </span>
  );
}
