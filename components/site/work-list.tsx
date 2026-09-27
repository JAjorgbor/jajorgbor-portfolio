import { Link } from "next-view-transitions";
import { Timecode } from "@/components/motion/timecode";
import { WorkWindow, type WindowItem } from "@/components/motion/work-window";
import { urlFor } from "@/sanity/lib/image";
import type { ProjectCard } from "@/sanity/lib/types";
import { LetterboxPoster } from "./letterbox";
import { Label } from "./meta";
import { splitTitle } from "./title";

const pad = (n: number) => String(n).padStart(2, "0");

// §7.4 Projects listed as credits in columns 1–6; the letterbox window in
// 7–12, swapping its picture on hover. Inline posters serve
// coarse pointers, where the window is not rendered.
export function WorkList({ projects, label }: { projects: ProjectCard[]; label: string }) {
  if (!projects.length) return null;
  const listId = `work-list-${label.toLowerCase().replace(/\W+/g, "-")}`;

  const items: WindowItem[] = projects.map((p) => ({
    slug: p.slug,
    name: splitTitle(p.title).name,
    poster: p.thumbnail ? urlFor(p.thumbnail).width(1600).height(900).url() : null,
    lqip: p.thumbnail?.lqip ?? null,
    video: p.videoUrl ?? null,
    mimeType: p.videoMimeType ?? null,
    loopStart: p.loopStart ?? 0,
  }));

  return (
    <div className="grid-12 page-x gap-y-12">
      <div data-reveal="cut" className="col-span-6 flex items-baseline gap-4 lg:col-span-2">
        <Label>{label}</Label>
        <span className="meta text-ink">
          {pad(1)}—{pad(projects.length)}
        </span>
      </div>
      <div data-reveal="cut" className="col-span-6 text-right lg:col-span-2 lg:col-start-11">
        <Timecode />
      </div>

      <ol id={listId} className="col-span-12 border-t border-line lg:col-span-6">
        {projects.map((project, i) => {
          const { name, descriptor } = splitTitle(project.title);
          return (
            <li
              key={project._id}
              data-window-item={project.slug}
              data-cursor="view"
              className="group border-b border-line py-8 md:py-10"
            >
              <div className="flex flex-col gap-4 md:flex-row md:gap-8">
                <span data-reveal="cut" className="meta w-10 shrink-0 pt-2 text-ink-3 md:pt-4">
                  {pad(i + 1)}
                </span>
                <div className="flex flex-col gap-4">
                  <Link
                    href={`/projects/${project.slug}`}
                    className="text-ink"
                    data-shared-title
                  >
                    <h2 data-reveal="lines" className="display text-step-4 group-hover:italic">
                      {name}
                    </h2>
                  </Link>
                  {descriptor && (
                    <p data-reveal="block" data-delay="0.15" className="max-w-[40ch] text-ink-2">
                      {descriptor}
                    </p>
                  )}
                  <p data-reveal="cut" data-delay="0.5" className="meta text-ink-3">
                    {[project.role, project.year].filter(Boolean).join(" · ")}
                  </p>
                </div>
              </div>
              <div className="mt-6 md:pl-18 lg:hidden">
                <LetterboxPoster project={project} />
              </div>
            </li>
          );
        })}
      </ol>

      <div className="hidden lg:col-span-6 lg:col-start-7 lg:block">
        <WorkWindow items={items} listId={listId} />
      </div>
    </div>
  );
}
