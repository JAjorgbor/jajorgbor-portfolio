import type { SiteSettings } from "@/sanity/lib/types";
import { Label, MetaLink } from "./meta";

export function EndCard({ settings }: { settings: SiteSettings | null }) {
  return (
    <footer className="grid-12 page-x gap-y-8 border-t border-line py-12">
      <div className="col-span-12 flex flex-col gap-1 md:col-span-4">
        <span className="meta text-ink">{settings?.name}</span>
        <span className="meta text-ink-3">© {new Date().getFullYear()}</span>
      </div>
      {settings?.footerNote && (
        <div className="col-span-12 flex flex-col gap-1 md:col-span-4">
          <Label>Credits</Label>
          <span className="meta text-ink">{settings.footerNote}</span>
        </div>
      )}
      {settings?.socials?.length ? (
        <div className="col-span-12 flex flex-wrap gap-x-6 gap-y-2 md:col-span-4 md:justify-end">
          {settings.socials.map((s) => (
            <MetaLink key={s._key} href={s.url} external>
              {s.platform}
            </MetaLink>
          ))}
        </div>
      ) : null}
    </footer>
  );
}
