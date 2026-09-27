# Joshua Ajorgbor — Portfolio

A portfolio built as a film's title sequence. The design, its tokens and every named interaction are specified in [DESIGN.md](DESIGN.md); that file is the source of truth and the place to change a decision before changing code.

- **Stack:** Next.js 16 (App Router), Sanity (all content, Studio embedded at `/studio`), Tailwind CSS v4 on top of the design tokens, GSAP (ScrollTrigger, SplitText, CustomEase), Lenis, `next-view-transitions`.
- **Content:** everything a visitor reads comes from Sanity. Components contain no sentences; an empty field means the element does not render.
- **Fonts:** Fraunces (two static instances, committed in `app/fonts/`) and Instrument Sans (variable), self-hosted through `next/font`.

## Setup

```bash
pnpm install
cp .env.example .env.local   # then fill in the values
pnpm dev                     # http://localhost:3000
```

Environment variables (see `.env.example`):

| Variable | Purpose |
| --- | --- |
| `NEXT_PUBLIC_SANITY_PROJECT_ID`, `NEXT_PUBLIC_SANITY_DATASET`, `NEXT_PUBLIC_SANITY_API_VERSION` | Sanity project |
| `SANITY_API_WRITE_TOKEN` | Editor token, server-only: stores contact messages, runs the seed and migration scripts |
| `NEXT_PUBLIC_SITE_URL` | Canonical origin for social images, sitemap and robots (optional on Vercel) |

In the Sanity project, add the dev origin (`http://localhost:3000`) and the production domain under **API → CORS origins** with credentials allowed, so the embedded Studio can sign in.

## Content model

Open `/studio`. Singletons: **Site Settings** (name, role, positioning line, availability, contact details, socials, SEO), **Home Page** (section copy), **About Page**. Lists: **Projects** (with a *Visible on website* toggle, narrative sections, demo video and hover-loop start time), **Experience**, **Education**, **Skills**. **Messages** holds contact-form submissions; they are private to signed-in users.

Pages are static and revalidate every 60 seconds, so a published edit reaches the site within a minute.

Display copy fields accept `/` where a line should break on wide screens.

## Scripts

| Command | What it does |
| --- | --- |
| `pnpm dev` / `pnpm build` / `pnpm start` | Next.js |
| `pnpm lint` | ESLint |
| `pnpm seed` | Loads the original portfolio content into an empty dataset (replaces documents; don't run on a dataset you have edited) |
| `node --env-file=.env.local scripts/migrate-title-sequence.mjs` | Adds the redesign's fields to an existing dataset without overwriting edits |
| `pnpm shoot <route> [label]` | Screenshots a route at 375/768/1280/1920 into `.shots/` (`BASE`, `SCROLL`, `HOVER`, `LEADER`, `REDUCED` options documented in the script) |
| `pnpm audit [base]` | Lighthouse (mobile) on the key routes against a running production server |

## Layout of the code

- `app/(site)/` — the site: home, `/work`, `/projects/[slug]`, `/about`, `/contact`, 404, sitemap, robots, Open Graph images.
- `app/studio/` — the embedded Sanity Studio. `app/tokens/` — the design-token preview page (not indexed).
- `app/tokens.css`, `app/globals.css` — tokens, then the small component layer built on them.
- `components/site/` — server-rendered credits, lists and chrome. `components/motion/` — the motion system (reveals, lights-down, leader, work window, cursor, magnetic, grain, transitions).
- `sanity/` — schema, structure, queries, fetch helpers. `lib/` — server action, motion tokens reader, OG helpers.
