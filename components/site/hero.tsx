import type { SiteSettings } from "@/sanity/lib/types";
import { Lines, NameLines } from "./lines";
import { LiveDot, MetaItem, MetaLink } from "./meta";

// §7.2 The first credit. At least one viewport tall; never clipped. Entrances
// are timed as credits: name, then the positioning line, then the meta cuts in.
export function Hero({ settings }: { settings: SiteSettings | null }) {
  if (!settings?.name) return null;

  return (
    <section className="grid-12 page-x min-h-svh grid-rows-[auto_1fr_auto] gap-y-12 pb-10 pt-28 md:pt-32">
      <div
        data-reveal="cut"
        data-delay="1.1"
        className="col-span-12 grid grid-cols-2 gap-6 md:col-span-10 md:col-start-2 md:grid-cols-3 lg:col-span-2 lg:col-start-1 lg:row-span-2 lg:grid-cols-1 lg:content-start"
      >
        {settings.role && <MetaItem label="Role">{settings.role}</MetaItem>}
      </div>

      <div className="col-span-12 self-center md:col-span-10 md:col-start-2 lg:col-span-8 lg:col-start-3 lg:row-start-1 lg:row-span-2">
        <h1 data-reveal="focus" className="display text-step-6">
          <NameLines name={settings.name} />
        </h1>
        {settings.positioning && (
          <p
            role="doc-subtitle"
            data-reveal="lines"
            data-delay="0.35"
            className="display mt-10 text-step-3 md:mt-12 lg:text-step-4"
          >
            <Lines text={settings.positioning} />
          </p>
        )}
      </div>

      <div
        data-reveal="cut"
        data-delay="1.2"
        className="col-span-12 grid grid-cols-2 gap-6 md:col-span-10 md:col-start-2 md:grid-cols-3 lg:col-span-2 lg:col-start-11 lg:row-start-1 lg:row-span-2 lg:grid-cols-1 lg:content-start"
      >
        {settings.availability && (
          <MetaItem label="Status">
            <LiveDot /> {settings.availability}
          </MetaItem>
        )}
        {settings.resumeUrl && (
          <div>
            <MetaLink href={settings.resumeUrl} external>
              Resume
            </MetaLink>
          </div>
        )}
      </div>

      <div
        data-reveal="cut"
        data-delay="1.4"
        className="col-span-12 self-end md:col-span-10 md:col-start-2 lg:col-span-8 lg:col-start-3"
      >
        <a href="#work" className="meta inline-flex items-center gap-3 text-ink-3">
          Selected work <span aria-hidden="true">↓</span>
        </a>
      </div>
    </section>
  );
}
