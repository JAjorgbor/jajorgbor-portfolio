// One-off migration for the Title Sequence redesign (DESIGN.md §9).
// Sets only the new fields, with setIfMissing, so nothing edited in the
// Studio (including project visibility) is overwritten. Safe to re-run.
//
//   node --env-file=.env.local scripts/migrate-title-sequence.mjs

import { createClient } from "@sanity/client";

const { NEXT_PUBLIC_SANITY_PROJECT_ID, NEXT_PUBLIC_SANITY_DATASET, SANITY_API_WRITE_TOKEN } =
  process.env;

if (!NEXT_PUBLIC_SANITY_PROJECT_ID || !NEXT_PUBLIC_SANITY_DATASET || !SANITY_API_WRITE_TOKEN) {
  console.error("Missing Sanity env vars in .env.local");
  process.exit(1);
}

const client = createClient({
  projectId: NEXT_PUBLIC_SANITY_PROJECT_ID,
  dataset: NEXT_PUBLIC_SANITY_DATASET,
  apiVersion: "2025-09-01",
  token: SANITY_API_WRITE_TOKEN,
  useCdn: false,
});

const home = await client.fetch('*[_id == "homePage"][0]{ about }');

const tx = client.transaction();

tx.patch("siteSettings", (p) =>
  p.setIfMissing({
    role: "Fullstack Engineer",
    positioning: "Fullstack engineer who takes products from first commit to production.",
    // Derived from the existing contact copy; edit in the Studio if it drifts.
    availability: "Open to full-time and contract roles",
    notFoundLine: "This reel is missing.",
  }),
);

// The About page starts from the existing About section copy.
tx.createIfNotExists({
  _id: "aboutPage",
  _type: "aboutPage",
  heading: [home?.about?.heading, home?.about?.headingMuted].filter(Boolean).join(" / "),
  story: home?.about?.body ?? [],
  approach: [],
});

await tx.commit();
console.log("✓ Migration applied.");
