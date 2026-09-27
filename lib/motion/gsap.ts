"use client";

import { gsap } from "gsap";
import { CustomEase } from "gsap/CustomEase";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { SplitText } from "gsap/SplitText";

gsap.registerPlugin(ScrollTrigger, SplitText, CustomEase);

export { gsap, ScrollTrigger, SplitText };

export const reducedMotion = () =>
  typeof window !== "undefined" && window.matchMedia("(prefers-reduced-motion: reduce)").matches;

export const finePointer = () =>
  typeof window !== "undefined" && window.matchMedia("(pointer: fine)").matches;

// Set by the Leader when it plays so first-view entrances wait for it.
export const leader = { offset: 0 };

// Motion tokens are read from CSS (DESIGN.md §6) so the two never drift.
let cache: Tokens | null = null;

type Ease = string | gsap.EaseFunction;

type Tokens = {
  dur: (n: 1 | 2 | 3 | 4 | 5) => number;
  stagger: (n: "char" | "word" | "line" | "item") => number;
  ease: { curtain: Ease; dolly: Ease; cut: Ease };
  scene: (name: "paper" | "theatre") => Record<string, string>;
};

const SCENE_VARS = ["--bg", "--ink", "--ink-2", "--ink-3", "--line", "--accent", "--grain-opacity"];

export function tokens(): Tokens {
  if (cache) return cache;
  const root = getComputedStyle(document.documentElement);
  // The CSS minifier rewrites "900ms" as ".9s", so both units must parse.
  const seconds = (name: string) => {
    const v = root.getPropertyValue(name).trim();
    const n = parseFloat(v);
    return v.endsWith("ms") ? n / 1000 : n;
  };

  const bezier = (name: string): Ease => {
    const value = root.getPropertyValue(name).trim();
    const m = value.match(/cubic-bezier\(([^)]+)\)/);
    if (!m) return "none";
    const pts = m[1].split(",").map((n) => n.trim());
    return CustomEase.create(name.replace("--", ""), `M0,0 C${pts.join(",")} 1,1`);
  };

  const scene = (name: "paper" | "theatre") => {
    const probe = document.createElement("div");
    probe.dataset.scene = name;
    probe.style.display = "none";
    document.body.append(probe);
    const cs = getComputedStyle(probe);
    const vars = Object.fromEntries(SCENE_VARS.map((v) => [v, cs.getPropertyValue(v).trim()]));
    probe.remove();
    return vars;
  };

  const built: Tokens = {
    dur: (n) => seconds(`--dur-${n}`),
    stagger: (n) => seconds(`--stagger-${n}`),
    ease: {
      curtain: bezier("--ease-curtain"),
      dolly: bezier("--ease-dolly"),
      cut: "steps(1)",
    },
    scene,
  };
  cache = built;
  return built;
}
