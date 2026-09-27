import { Link } from "next-view-transitions";
import type { SiteSettings } from "@/sanity/lib/types";
import { Nav } from "./nav";

// Floats over every scene, so it is drawn in blend-ink (see tokens.css).
export function Header({ settings }: { settings: SiteSettings | null }) {
  return (
    <header className="blend-ink absolute inset-x-0 top-0 z-40 grid-12 page-x items-baseline py-6">
      <Link href="/" className="meta nav-link col-span-6 md:col-span-4">
        {settings?.name}
      </Link>
      <Nav />
    </header>
  );
}
