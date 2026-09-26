import type { SiteSettings } from "@/sanity/lib/types";

export function Footer({ settings }: { settings: SiteSettings | null }) {
  return (
    <footer className="w-full border-t border-neutral-900 bg-neutral-950 py-12 text-center text-sm text-neutral-500">
      <p>
        © {new Date().getFullYear()} {settings?.name}. All rights reserved.
      </p>
      {settings?.footerNote && (
        <p className="mt-2 text-xs text-neutral-600">{settings.footerNote}</p>
      )}
    </footer>
  );
}
