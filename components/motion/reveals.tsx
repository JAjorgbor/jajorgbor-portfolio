"use client";

import { usePathname } from "next/navigation";
import { useEffect, useRef } from "react";
import { gsap, leader, reducedMotion, ScrollTrigger, SplitText, tokens } from "@/lib/motion/gsap";

// §6 / §7.6. Every entrance on the site comes from here. Elements opt in with
// data-reveal="lines|focus|block|media|cut" and optionally data-delay (seconds).
// "focus" elements are never hidden before JS runs (they are the largest paint
// on their page) and only settle into place; everything else starts hidden
// only when motion is allowed
// (the pre-paint script in the site layout sets data-motion).
export function Reveals() {
  const pathname = usePathname();
  const first = useRef(true);

  useEffect(() => {
    if (reducedMotion()) return;
    const t = tokens();

    // First view waits for the Leader; later views wait for the curtain (§7.7).
    // `first` is only consumed once the setup actually runs, so a development
    // double-invocation of this effect cannot spend it early.
    const hold = leader.offset > 0 ? leader.offset : first.current ? 0 : t.dur(4) * 0.5;

    let ctx: gsap.Context | undefined;
    const id = window.setTimeout(() => {
      first.current = false;
      ctx = gsap.context(() => {
        document.querySelectorAll<HTMLElement>("[data-reveal]").forEach((el) => {
          const kind = el.dataset.reveal;
          const delay = parseFloat(el.dataset.delay ?? "0");
          const scrollTrigger = { trigger: el, start: "top 88%", once: true };

          switch (kind) {
            case "focus":
              gsap.from(el, { y: 16, duration: t.dur(3), ease: t.ease.curtain, delay, scrollTrigger });
              break;
            case "lines":
              // aria: "none" keeps the text readable in place; SplitText's default
              // would add aria-label to paragraphs and aria-hidden around links.
              SplitText.create(el, {
                type: "lines",
                mask: "lines",
                autoSplit: true,
                aria: "none",
                onSplit(self) {
                  gsap.set(el, { autoAlpha: 1 });
                  return gsap.from(self.lines, {
                    yPercent: 110,
                    duration: t.dur(3),
                    ease: t.ease.curtain,
                    stagger: t.stagger("line"),
                    delay,
                    scrollTrigger,
                  });
                },
              });
              break;
            case "block":
              gsap.fromTo(
                el,
                { autoAlpha: 1, clipPath: "inset(100% 0 0 0)", y: 24 },
                { clipPath: "inset(0% 0 0 0)", y: 0, duration: t.dur(3), ease: t.ease.curtain, delay, scrollTrigger },
              );
              break;
            case "media":
              // The letterbox opens from a horizontal slit.
              gsap.fromTo(
                el,
                { autoAlpha: 1, clipPath: "inset(50% 0 50% 0)" },
                { clipPath: "inset(0% 0 0% 0)", duration: t.dur(4), ease: t.ease.curtain, delay, scrollTrigger },
              );
              break;
            default:
              gsap.fromTo(el, { autoAlpha: 0 }, { autoAlpha: 1, duration: 0.01, delay, scrollTrigger });
          }
        });
      });
      // Fonts change line breaks; re-measure once they're in.
      document.fonts.ready.then(() => ScrollTrigger.refresh());
    }, hold * 1000);

    return () => {
      window.clearTimeout(id);
      ctx?.revert();
    };
  }, [pathname]);

  return null;
}
