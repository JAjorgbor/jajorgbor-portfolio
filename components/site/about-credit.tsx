import { PortableText } from "next-sanity";
import type { AboutContent } from "@/sanity/lib/types";
import { Label, MetaLink } from "./meta";

// The short About credit on Home. The full story lives on /about.
export function AboutCredit({ content }: { content?: AboutContent | null }) {
  if (!content?.heading && !content?.body) return null;

  return (
    <section data-scene="paper" className="grid-12 page-x gap-y-10 bg-bg py-(--section) text-ink">
      <div data-reveal="cut" className="col-span-12 lg:col-span-2">
        <Label>About</Label>
      </div>
      <div className="col-span-12 md:col-span-10 md:col-start-2 lg:col-span-6 lg:col-start-3">
        {content.heading && (
          <h2 data-reveal="lines" className="display text-step-4">
            {content.heading}
            {content.headingMuted && (
              <>
                <br className="br-md" /> <em className="text-ink-2">{content.headingMuted}</em>
              </>
            )}
          </h2>
        )}
        {content.body && (
          <div data-reveal="block" data-delay="0.2" className="prose-credit lead mt-10 text-ink-2">
            <PortableText value={content.body} />
          </div>
        )}
      </div>
      <div
        data-reveal="cut"
        data-delay="0.6"
        className="col-span-12 md:col-span-10 md:col-start-2 lg:col-span-3 lg:col-start-10"
      >
        <MetaLink href="/about">More about me</MetaLink>
      </div>
    </section>
  );
}
