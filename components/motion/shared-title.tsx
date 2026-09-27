"use client";

import { useEffect } from "react";

// §7.7 Before a project link navigates, its title is given the shared
// view-transition name so it morphs into the case-study heading. Only the
// clicked one is named, since duplicate names abort the transition.
export function SharedTitle() {
  useEffect(() => {
    const onClick = (e: MouseEvent) => {
      const link = (e.target as HTMLElement).closest<HTMLElement>("[data-shared-title]");
      if (!link) return;
      document
        .querySelectorAll<HTMLElement>("[data-shared-title]")
        .forEach((el) => (el.style.viewTransitionName = ""));
      link.style.viewTransitionName = "project-title";
    };
    document.addEventListener("click", onClick, true);
    return () => document.removeEventListener("click", onClick, true);
  }, []);
  return null;
}
