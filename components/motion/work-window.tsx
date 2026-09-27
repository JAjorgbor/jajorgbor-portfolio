"use client";

import Image from "next/image";
import { useEffect, useRef, useState, useSyncExternalStore } from "react";
import { reducedMotion } from "@/lib/motion/gsap";

export type WindowItem = {
  slug: string;
  name: string;
  poster: string | null;
  lqip: string | null;
  video: string | null;
  mimeType: string | null;
  loopStart: number;
};

const LOOP_SECONDS = 4;

const FINE = "(pointer: fine)";
const subscribeFine = (cb: () => void) => {
  const mq = matchMedia(FINE);
  mq.addEventListener("change", cb);
  return () => mq.removeEventListener("change", cb);
};
const useFinePointer = () =>
  useSyncExternalStore(subscribeFine, () => matchMedia(FINE).matches, () => false);

// §7.4 The letterbox window, fixed beside the credits. Hovering a credit
// (data-window-item="<slug>") swaps the picture and plays a 4-second loop of
// that project's demo, cut from `loopStart`. Rendered for fine pointers only;
// the inline posters in the list serve touch.
export function WorkWindow({ items, listId }: { items: WindowItem[]; listId: string }) {
  const videos = useRef<Map<string, HTMLVideoElement>>(new Map());
  const [active, setActive] = useState<string>(items[0]?.slug ?? "");
  const enabled = useFinePointer();

  useEffect(() => {
    const list = document.getElementById(listId);
    if (!list || !enabled) return;
    const motion = !reducedMotion();
    let current = "";

    // Videos are preload="none" so they cost nothing until the first hover.
    const play = (slug: string) => {
      const v = videos.current.get(slug);
      if (!v || !motion) return;
      const start = items.find((i) => i.slug === slug)?.loopStart ?? 0;
      const seekAndPlay = () => {
        v.currentTime = start;
        v.play().catch(() => {});
      };
      if (v.readyState >= 1) seekAndPlay();
      else {
        v.addEventListener("loadedmetadata", seekAndPlay, { once: true });
        v.load();
      }
    };
    const stop = (slug: string) => videos.current.get(slug)?.pause();

    const onOver = (e: MouseEvent) => {
      const item = (e.target as HTMLElement).closest<HTMLElement>("[data-window-item]");
      const slug = item?.dataset.windowItem;
      if (!slug || slug === current) return;
      if (current) stop(current);
      current = slug;
      setActive(slug);
      play(slug);
    };
    const onLeave = () => {
      if (current) stop(current);
      current = "";
    };

    list.addEventListener("mouseover", onOver);
    list.addEventListener("mouseleave", onLeave);
    return () => {
      list.removeEventListener("mouseover", onOver);
      list.removeEventListener("mouseleave", onLeave);
    };
  }, [enabled, items, listId]);

  if (!enabled) return null;
  const activeItem = items.find((i) => i.slug === active);

  return (
    <div aria-hidden="true" className="sticky top-24">
      <div data-reveal="media" className="letterbox relative">
        {items.map((item) => (
          <div
            key={item.slug}
            className={`transition-opacity duration-(--dur-2) ease-dolly ${item.slug === active ? "relative opacity-100" : "absolute inset-0 opacity-0"}`}
          >
            {item.video ? (
              <video
                ref={(v) => {
                  if (v) videos.current.set(item.slug, v);
                  else videos.current.delete(item.slug);
                }}
                muted
                playsInline
                preload="none"
                poster={item.poster ?? undefined}
                onTimeUpdate={(e) => {
                  const v = e.currentTarget;
                  if (v.currentTime - item.loopStart >= LOOP_SECONDS) v.currentTime = item.loopStart;
                }}
              >
                <source src={item.video} type={item.mimeType ?? "video/mp4"} />
              </video>
            ) : item.poster ? (
              <Image
                src={item.poster}
                alt=""
                width={1600}
                height={900}
                sizes="(min-width: 1280px) 50vw, 100vw"
                placeholder={item.lqip ? "blur" : "empty"}
                blurDataURL={item.lqip ?? undefined}
              />
            ) : null}
          </div>
        ))}
      </div>
      {activeItem && <p className="meta mt-3 text-ink-3">{activeItem.name}</p>}
    </div>
  );
}
