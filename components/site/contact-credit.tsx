import type { ContactContent, SiteSettings } from "@/sanity/lib/types";
import { CopyEmail } from "./copy-email";
import { Label, MetaLink } from "./meta";

// The Contact credit. On Home it stands alone; on /contact the form follows it.
export function ContactCredit({
  content,
  settings,
  children,
}: {
  content?: ContactContent | null;
  settings: SiteSettings | null;
  children?: React.ReactNode;
}) {
  return (
    <section data-scene="paper" className="grid-12 page-x gap-y-10 bg-bg py-(--section) text-ink">
      <div data-reveal="cut" className="col-span-12 lg:col-span-2">
        <Label>Contact</Label>
      </div>
      <div className="col-span-12 md:col-span-10 md:col-start-2 lg:col-span-6 lg:col-start-3">
        {content?.heading && (
          <h2 data-reveal="focus" className="display text-step-4">
            {content.heading}
            {content.headingAccent && (
              <>
                {" "}
                <em>{content.headingAccent}</em>
              </>
            )}
          </h2>
        )}
        {content?.body && (
          <p data-reveal="block" data-delay="0.2" className="lead mt-10 text-ink-2">
            {content.body}
          </p>
        )}

        {settings?.email && (
          <div data-reveal="block" data-delay="0.4" className="mt-12">
            <CopyEmail email={settings.email} />
          </div>
        )}

        <div data-reveal="cut" data-delay="0.8" className="mt-10 flex flex-wrap gap-x-8 gap-y-3">
          {settings?.chatUrl && settings.phoneDisplay && (
            <MetaLink href={settings.chatUrl} external>
              {settings.chatLabel ?? "Chat"} · {settings.phoneDisplay}
            </MetaLink>
          )}
          {settings?.socials?.map((s) => (
            <MetaLink key={s._key} href={s.url} external>
              {s.platform}
            </MetaLink>
          ))}
        </div>

        {children}
      </div>
    </section>
  );
}
