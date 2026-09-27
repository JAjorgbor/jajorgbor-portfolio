import { notFound } from "next/navigation";

// With two root layouts (site and studio) there is no app-level not-found, so
// unmatched routes are caught here and rendered by the site's not-found page.
export default function Missing() {
  notFound();
}
