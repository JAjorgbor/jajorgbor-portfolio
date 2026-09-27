# DESIGN.md — Title Sequence

Source of truth for the portfolio redesign. Every token, rule and named moment in the build must trace back to something here. If a decision isn't here, it isn't decided; add it here first.

---

## 1. Direction

**Concept.** The portfolio as a film's opening credits. Every section is a credit card: type on a plain field, timed, unhurried. The site opens on warm paper and stays there, except for one moment. Scrolling into Selected Work brings the lights down: the page darkens to black, the type inverts, a timecode starts in the corner, and the work plays in a letterboxed frame. When the work ends, the lights come back up for About and Contact.

Light and dark are both in the film. Darkness is the theatre, not the default.

**Tone.** Cinematic, composed, deliberate.

**Positioning line.** "Fullstack engineer who takes products from first commit to production."

**Name.** Joshua Ajorgbor.

**What the site is not.** No 3D. No gradients, glass, glow or blobs. No card grid. No centred hero with two buttons. No emoji. No icon-library decoration. No "Hi, I'm…" copy. No section rhythm repeated twice in a row.

**Stack.** Next.js 16 (kept), Sanity (kept, all copy and projects; pages are static and revalidate every 60 seconds, so a published edit reaches the site within a minute), GSAP + ScrollTrigger + SplitText + CustomEase, Lenis, View Transitions via `next-view-transitions`. framer-motion is retired; two motion libraries is one too many. Sanity's live client was removed in build step 6: it cost 25 KB of gzipped JS and an open EventSource on every page, against a 150 KB budget, for updates that ISR delivers a minute later. Tailwind stays for utilities, but every value it uses comes from the tokens below.

---

## 2. Principles

1. **Type is the picture.** If a section would still work with the type removed, the type isn't doing enough.
2. **One camera.** All motion reads as one camera moving through one film: same easings, same pacing, same weight. No effect appears once.
3. **Enter by mask, never by fade.** Text and images arrive through a clip-path or a moving cover. Opacity alone is for hover states and reduced motion.
4. **Break the grid on purpose.** Every element sits on the 12-column grid unless the section notes say where and why it doesn't.
5. **Mobile is a cut of the film, not a squeeze.** Each section has a specified 375px composition.
6. **Colour is a scene, not a theme.** The page is in *Paper* or *Theatre*. There is no user toggle. The scene changes because the film does.
7. **Copy comes from Sanity.** No hardcoded sentences in components. Placeholders are forbidden; if a field is empty the element doesn't render.

---

## 3. Typography

### Faces

| Role | Face | Source | Instance | Licence |
| --- | --- | --- | --- | --- |
| Display | **Fraunces**, two static files (roman, italic) | undercasetype, via Google Fonts, committed in `app/fonts/` | `opsz` 144, `wght` 300 | OFL 1.1 |
| Text & UI | **Instrument Sans** (variable, roman + italic) | Google Fonts / Instrument | `wdth` 75–100, `wght` 400–700 | OFL 1.1 |
| Meta (timecode, labels) | Instrument Sans at `wdth` 75, uppercase, tracked | — | — | — |

No third face. Mono needs (timecode) are met by Instrument Sans condensed with `font-variant-numeric: tabular-nums`.

Fraunces is served as static instances, not as the variable font. Measured in build step 6: the variable files with the `SOFT` and `WONK` axes were 118 KB (roman) and 146 KB (italic) of Latin woff2 on the LCP path; the single instance the site uses is 16 KB and 21 KB. The site sets Fraunces at exactly one optical size and weight everywhere, so nothing visible was lost. What was given up: the `SOFT` focus-pull (now carried by a compositor blur on the leader and a settle on display type) and `WONK` on the 404 (now italic). The roman is the only preloaded font on the site; the italic is a separate face loaded on first use.

### Loading

- Self-hosted via `next/font/google` (`app/fonts.ts`), which downloads at build time, subsets to `latin`, and serves the files from the app's own origin: no request ever goes to Google at runtime. Variable axes are declared explicitly (`opsz`, `SOFT`, `WONK` for Fraunces; `wdth` for Instrument Sans) so they survive subsetting. Measured from the build (Latin files, the only ones fetched for English text): Fraunces roman 118 KB, italic 146 KB, Instrument Sans roman 56 KB, italic 61 KB; 381 KB total. Dropping `WONK` was measured and saves nothing (Google serves one file per style regardless of declared axes), so the axis stays. Budget is therefore **≤ 390 KB** of fonts on first view; any face added later must come out of that.
- `font-display: swap` on all. Fraunces is preloaded (`preload: true`, which covers both roman and italic; the italic is needed in the first viewport because the positioning line's emphasis is italic). Instrument Sans is not preloaded, since it never renders above the fold before Fraunces. If LCP misses its budget in build step 6, the remedy is to move italic emphasis out of the first viewport so the italic can stop being preloaded, not to change the faces.
- Fallback metrics: `size-adjust` and `ascent-override` set so layout doesn't shift on swap (CLS budget below).

### Display settings

| Token | Value | Use |
| --- | --- | --- |
| `--font-display-stack` | Fraunces roman instance, Georgia fallback with adjusted metrics | All display type |
| `--font-display-italic-stack` | Fraunces italic instance | `em` inside a credit, hover italics, the 404 line; never whole paragraphs |
| `--display-tracking` | `-0.03em` | ≥ step 4 |
| `--display-tracking-mid` | `-0.015em` | steps 2–3 |
| `--display-leading` | `0.92` | ≥ step 4 |
| `--display-leading-mid` | `1.05` | steps 2–3 |

The 404 line is set in the italic: its one appearance as a whole line.

### Text settings

| Token | Value |
| --- | --- |
| `--text-settings` | `"wdth" 100, "wght" 400` |
| `--text-settings-strong` | `"wdth" 100, "wght" 600` |
| `--meta-settings` | `"wdth" 75, "wght" 500` |
| `--text-leading` | `1.5` |
| `--meta-leading` | `1.2` |
| `--meta-tracking` | `0.08em`, uppercase |

### Fluid scale

Fluid between 375px and 1440px viewports; clamped outside. Nothing on the site uses a font size that isn't one of these tokens.

| Token | Min (375) | Max (1440) | Value |
| --- | --- | --- | --- |
| `--step--2` | 11.5px | 12.8px | `clamp(0.72rem, 0.692rem + 0.12vw, 0.8rem)` |
| `--step--1` | 13.6px | 15px | `clamp(0.85rem, 0.818rem + 0.135vw, 0.94rem)` |
| `--step-0` | 16px | 18px | `clamp(1rem, 0.956rem + 0.188vw, 1.125rem)` |
| `--step-1` | 20px | 24px | `clamp(1.25rem, 1.162rem + 0.376vw, 1.5rem)` |
| `--step-2` | 25.6px | 36px | `clamp(1.6rem, 1.371rem + 0.977vw, 2.25rem)` |
| `--step-3` | 33.6px | 54.4px | `clamp(2.1rem, 1.642rem + 1.953vw, 3.4rem)` |
| `--step-4` | 44.8px | 80px | `clamp(2.8rem, 2.025rem + 3.305vw, 5rem)` |
| `--step-5` | 57.6px | 120px | `clamp(3.6rem, 2.227rem + 5.859vw, 7.5rem)` |
| `--step-6` | 72px | 176px | `clamp(4.5rem, 2.211rem + 9.765vw, 11rem)` |

Assignments: meta `--step--2`; captions `--step--1`; body `--step-0`; lead paragraphs `--step-1`; section labels `--step-2`; case-study headings and project descriptors `--step-3`; credit titles (project names in lists, section statements) `--step-4`; the positioning line `--step-4` from 1280 up and `--step-3` below; the next-project card `--step-5`; the name and a case study's project name `--step-6`.

Project titles are stored as "Name — Descriptor" and always rendered split: the name at credit size, the descriptor at body size beneath it. A 70-character sentence cannot be set above step 4 at any width without wrapping past four lines, which is why the positioning line lives at step 4 and not step 5 (tested at 1280 in build step 2).

### Line-break rule

Display type ≥ step 4 never relies on natural wrapping at 768px and above. Breaks are authored: Sanity fields for display copy accept `/` as a hard break marker, and the component renders it as a `<br>` that is active from 768px up. Below 768px authored breaks are removed and the line wraps with `text-wrap: balance` inside a `max-width` set per element, because a break written for a wide line will strand a word on a narrow one. Every authored break is checked at 768, 1280 and 1920; every balanced wrap is checked at 375. Orphans in display type are a bug at any width.

---

## 4. Colour

Two scenes. Tokens are identical in name; values swap with `data-scene` on `<html>`.

### Paper (default)

| Token | Value | Use |
| --- | --- | --- |
| `--bg` | `#F2EFE9` | Page |
| `--ink` | `#121212` | Display type, body |
| `--ink-2` | `#4A4744` | Secondary text |
| `--ink-3` | `#6F6B66` | Meta, captions (4.9:1 on `--bg`) |
| `--line` | `#D9D4CB` | Rules, frames |
| `--accent` | `#E0421B` | Timecode, live dot, link underline, cursor label |
| `--frame` | `#0B0B0B` | Letterbox bars, video background |

### Theatre

| Token | Value | Use |
| --- | --- | --- |
| `--bg` | `#0B0B0B` | Page |
| `--ink` | `#F2EFE9` | Display type, body |
| `--ink-2` | `#B8B3AB` | Secondary text |
| `--ink-3` | `#8A857E` | Meta, captions (5.3:1 on `--bg`) |
| `--line` | `#262626` | Rules, frames |
| `--accent` | `#FF5A2E` | Same roles; lifted for contrast on black |
| `--frame` | `#0B0B0B` | Letterbox bars |

### Rules

- Accent never carries running text. It appears at `--step--2` uppercase meta (where it is a mark, not a paragraph), on the 8px live dot, as link underlines, and on the cursor label. Accent text below `--step-1` is always paired with `--ink` for the readable part.
- No other colours. No tints created by opacity except `--ink` at 8% for hover fills and the grain layer.
- Scene change is continuous: during the lights-down the tokens are tweened by GSAP between the two tables (scrubbed to scroll), not switched. Everywhere else the scene is static per page: Home is Paper → Theatre → Paper; Work index is Theatre; case studies open in Theatre (title sequence) and turn to Paper at the first narrative section; About and Contact are Paper; 404 is Theatre.

---

## 5. Spacing, grid, breakpoints

### Spacing

Base 4px. Fixed scale for components; fluid tokens for section rhythm.

| Token | Value |
| --- | --- |
| `--space-1` … `--space-8` | 4, 8, 12, 16, 24, 32, 48, 64px |
| `--space-9` … `--space-12` | 96, 128, 192, 256px |
| `--section` | `clamp(6rem, 12vw, 14rem)` — vertical padding between acts |
| `--section-tight` | `clamp(3rem, 6vw, 7rem)` — within an act |

### Grid

- 12 columns everywhere. `--margin: clamp(1rem, 4vw, 4rem)`. `--gutter: clamp(0.75rem, 1.5vw, 1.5rem)`.
- At 375 the same 12 tracks exist; content spans in multiples of 3 (i.e. behaves as 4 columns). No separate mobile grid.
- Max content width: none. The grid runs to the viewport; whitespace grows on large screens by design. Display type stops growing at 1440 (see scale), so at 1920 there is more paper around the credits, which is the intended feel.

### Column assignments (desktop ≥ 1280)

| Element | Columns |
| --- | --- |
| Hero credit block (name, positioning) | 3–10 |
| Hero meta left (ROLE) | 1–2 |
| Hero meta right (STATUS / RESUME) | 11–12 |
| Work strip: project credits | 1–6 |
| Work strip: letterbox window | 7–12 (fixed on /work; follows the cursor on Home from step 4) |
| About / Contact credit block | 3–8, meta link in 10–12 |
| Case study title and descriptor | 1–12 |
| Body copy in case studies | 4–9, label in 1–3 |
| Full-bleed media | 1–12, margins ignored |
| Letterboxed video in a title sequence | 2–11 |

At 768: credit block 2–10, meta stacks above it. At 375: everything 1–12; meta becomes a single line above the credit.

### Breakpoints

375 (design), 768 (design), 1280 (design), 1920 (verify). Tailwind screens map to `md: 768`, `lg: 1280`, `xl: 1920`. No other breakpoints.

---

## 6. Motion

### Easings

| Token | Curve | Use |
| --- | --- | --- |
| `--ease-curtain` | `cubic-bezier(0.77, 0, 0.175, 1)` | Masks, reveals, anything that enters or leaves |
| `--ease-dolly` | `cubic-bezier(0.22, 1, 0.36, 1)` | Layout moves, cursor follow, hover, Flip transitions |
| `--ease-cut` | `steps(1, end)` | Timecode digits, live dot, anything that should change without motion |

No `ease`, `ease-in-out`, `linear` or spring anywhere in the site.

### Durations

| Token | Value | Use |
| --- | --- | --- |
| `--dur-1` | 160ms | Micro: underline, dot, cursor state |
| `--dur-2` | 400ms | Hover moves, magnetic pull |
| `--dur-3` | 900ms | Text and image reveals |
| `--dur-4` | 1400ms | Scene moves, page transitions |
| `--dur-5` | 2200ms | Preloader, total |

### Staggers

| Token | Value |
| --- | --- |
| `--stagger-char` | 18ms |
| `--stagger-word` | 45ms |
| `--stagger-line` | 110ms |
| `--stagger-item` | 80ms |

Display type ≥ step 4 splits by line and staggers by `--stagger-line`; steps 2–3 split by word; body never splits (it reveals as a block by mask). Character splits are used once: the name on the preloader.

### Scroll

- Lenis: `lerp 0.08`, `duration 1.2`, wheel multiplier 1. Disabled on touch (native scroll), disabled under reduced motion.
- ScrollTrigger scrub for the lights-down: `scrub: 0.6`, over `60vh` of scroll.
- Nothing is pinned with ScrollTrigger. The work window uses `position: sticky`, and the case-study title sequence plays on load rather than on a pin; both were chosen in step 3 for robustness on mobile and for keeping native scroll behaviour intact.
- Parallax on media: ±6% translate, never more.

### Property rules

- Animate only `transform`, `opacity`, `clip-path`. `filter: blur()` is permitted only on the preloader and only up to 8px.
- `font-variation-settings` is never tweened per frame. The SOFT focus-pull on display type ≤ 2 lines is a stepped sequence of four instances, on entrance only (§7.1 explains why). Never on scroll, never on body text.
- Elements with `data-reveal="focus"` are never hidden before JavaScript runs; they are the largest paint on their page and the LCP must not wait for hydration. Everything else may start hidden, only when motion is allowed.
- `will-change` is set by GSAP at animation start and removed at end; never in static CSS.
- Target 60fps. Any moment that drops under 55fps on a mid-range phone in DevTools throttling is simplified, not tolerated.

### Reduced motion

Under `prefers-reduced-motion: reduce`: no preloader; Lenis off; no pinning or scrub (the scene switch happens instantly at the section boundary); reveals become a 200ms opacity fade with no transform; cursor is the native cursor; magnetic pull off; video does not autoplay (poster + play control). Content and order are identical.

---

## 7. Signature moments

### 7.1 Preloader ("Leader")

A film leader countdown, on Home only (a deep link to any other page opens directly). Paper scene. `3`, `2`, `1` in Fraunces at `--step-6`, each pulling into focus, then a hard cut to the next number. Total ≤ `--dur-5`. A thin ring sweeps once per number. Then the page reveals by a curtain mask from the top. Skipped when `sessionStorage.leaderSeen` is set. Skipped under reduced motion. The `3` is visible before any JavaScript runs, so it is the page's first large paint rather than something the visitor waits for.

The focus pull, here and on display type (§7.2), is not a per-frame tween of the SOFT axis: re-instancing a variable font at display size every frame costs layout on every step (measured in build step 6 as seconds of main-thread time on a throttled phone). It is three or four stepped SOFT instances on the curtain's timing, with a compositor blur (8px → 0, leader only) carrying the smoothness.

### 7.2 Hero (first credit)

Paper. Columns 3–10. Three cards in sequence on load, timed as credits (no scroll needed): the name at `--step-6` (SOFT focus-pull), the positioning line at `--step-4` (line stagger by mask), then the meta appears in the outer columns with `--ease-cut`. A single line of `--ink-3` meta at the bottom of the viewport: `SELECTED WORK ↓`. No buttons. The hero is at least one viewport tall and never a fixed height: content is never clipped or overlapped.

### 7.3 Lights-down (the moment)

Scrolling from the hero into Selected Work: over 60vh, tokens tween Paper → Theatre, the timecode (`00:00:00:00`) appears top-right and starts running, and the section label `SELECTED WORK` rises into columns 1–2. Reversible by scrolling back. Under reduced motion the switch is instant.

### 7.4 Work strip (Home) and project index (/work)

Theatre. Projects are listed as credits in columns 1–6: name at `--step-4`, descriptor at body size, role and year as meta. A letterboxed window (16:9, black bars, `--frame`) sits sticky in columns 7–12 and shows the first project at rest. Hovering a credit (pointer: fine) crossfades the window to that project (`--dur-2`, `--ease-dolly`) and plays a muted 4-second loop of its demo cut from `loopStart`; the credit's italic switches on. On touch, each credit carries its own poster inline and the window is not rendered. `/work` is the same component under an index heading. A cursor-following window was built and rejected in step 4: it left the right half of the strip empty for anyone not hovering, and covered the title being hovered.

### 7.5 Case study title sequence

Theatre, pinned for one viewport: project title at `--step-5` enters by line mask; meta (ROLE / YEAR / STACK / LINK) cuts in; the demo video sits letterboxed in columns 2–11 and reveals by a clip-path opening from a horizontal slit (letterbox bars sliding apart). Scrolling on releases the pin and the scene turns Paper at the first narrative section.

### 7.6 Image and video reveals

All media enters through `clip-path: inset(…)` from a horizontal slit (matching the letterbox), `--dur-3`, `--ease-curtain`, once per element, triggered at 20% in view. Never by fade.

### 7.7 Page transitions

Home → case study: Flip on the project title (it moves from its credit position to the title-sequence position) while a Theatre curtain covers and reveals. Case study → next project: the "Next" credit at the bottom is the next film's first card; clicking it scrolls it to the top and it becomes the new title sequence. Uses View Transitions API where supported; GSAP Flip where not.

### 7.8 Cursor

An 8px `--ink` dot, `mix-blend-mode: difference`, following with `--ease-dolly`. States: `view` (grows to 56px ring with the label VIEW in accent meta), `drag` (ring with ← → glyphs, on the work strip), `open` (ring with ↗, on external links). Hidden on coarse pointers and under reduced motion. Replaces the existing SmoothCursor.

### 7.9 Magnetic elements

Only the two nav links and the contact email. Pull radius 40px, max displacement 6px, `--dur-2`, `--ease-dolly`.

### 7.10 Grain

A fixed SVG `feTurbulence` layer at 6% opacity with `mix-blend-mode: overlay`, `pointer-events: none`. One layer covers both scenes at once (Home shows Paper and Theatre in the same viewport during the lights-down), so a per-scene blend mode is not possible; `overlay` reads as grain on paper and on black alike. No canvas, no animation of the grain itself.

---

## 8. Pages

| Route | Scene | Sections |
| --- | --- | --- |
| `/` | Paper → Theatre → Paper | Leader · Hero credit · Lights-down · Work strip (3 credits) · About credit (short) · Contact credit · End card (footer) |
| `/work` | Theatre | Index credit · Project list with fixed window · End card |
| `/projects/[slug]` | Theatre → Paper | Title sequence · Narrative sections (heading + body + media, from Sanity) · Credits (role, stack, links) · Next project card |
| `/about` | Paper | Story credit · Approach (three statements) · Experience list · Education · One playful detail (the running timecode here shows your years-in-industry clock) |
| `/contact` | Paper | Statement credit · Email (copy-to-clipboard with `COPIED` cut-in) · Chat link · Socials · Form (existing Sanity + Linkpane flow) |
| `/404` | Theatre | `WONK 1` display: "This reel is missing." · Link home as a credit |

The end card (footer) on every page is the same: name, year, "Credits" (stack used to build the site), socials, in meta type.

Existing URLs `/`, `/contact`, `/projects/[slug]` are preserved.

---

## 9. Content model (Sanity additions)

Required before the case-study build. All text in Sanity; no component contains a sentence.

- `siteSettings.positioning` (string, supports `/` breaks) — the positioning line.
- `project.tagline` (string) — one-sentence story under the title in the title sequence.
- `project.sections[]` — `{ heading, body (portable text), media[] (image | file(video)), layout: "column" | "full" }`.
- `project.loopStart` (number, seconds) — where the 4-second hover loop begins in the demo video.
- `project.stack[]` — already covered by `tags`; renamed in the UI to STACK.
- `aboutPage` singleton — `story (portable text)`, `approach[3] (string)`, `detail (string)`.
- `homePage.about.short` (portable text, ≤ 60 words) — the About credit on Home.

Media guidance: each project needs a poster still (from its demo video), the demo video re-encoded (H.264, ≤ 4 MB, 24fps, muted, poster) and a 4-second hover loop (≤ 600 KB, WebM + MP4).

---

## 10. Budgets and checks

| Metric | Target |
| --- | --- |
| Lighthouse Performance (mobile) | ≥ 90 on `/`, `/work`, one case study |
| LCP | < 2.5s (the LCP element is the name in Fraunces; the font is preloaded) |
| CLS | < 0.05 (font fallback metrics; explicit media dimensions) |
| Initial JS | Target < 150 KB gzipped on `/`. Measured after build step 6: 177 KB executed on Home (React + Next runtime ≈ 95 KB, GSAP with ScrollTrigger, SplitText and CustomEase ≈ 50 KB, the rest Lenis, view transitions, analytics), plus 64 KB prefetched for routes linked in the viewport. The budget is missed by 27 KB; the remaining levers are dropping SplitText for a hand-rolled line splitter (≈ 12 KB) and the Vercel analytics pair (≈ 8 KB). |
| Fonts total | ≤ 160 KB woff2 on first view (measured after build step 6: Fraunces 16 + 21 KB static instances, Instrument Sans 56 + 61 KB variable; only the Fraunces roman is preloaded) |
| Images | AVIF/WebP via Sanity CDN `auto=format`, `srcset` at 640/1024/1600/2400, explicit width/height, lazy below fold |

Measurement note (build step 6): Lighthouse on the development laptop, mobile emulation with simulated 4G, gave Home 81–82 / Work 90–93 / case study 90–93 / About 88–91 / Contact 83–88 on an idle machine, and 20–30 points lower while the machine was in use (TBT swung by seconds on pages whose JavaScript had not changed). Accessibility was 100 on every route in every run. Treat the idle figures as the baseline and confirm on the deployed site with PageSpeed Insights before deciding anything from the numbers.

Accessibility: semantic landmarks; skip link (styled as a credit, visible on focus); focus ring `2px solid var(--accent)` offset 4px on all interactives; keyboard path through the work list and cursor-less operation of every hover moment; alt text from Sanity; contrast per §4; SplitText output kept accessible with `aria-label` on the original text and `aria-hidden` on split spans.

SEO: per-page title and description from Sanity; OG image per page rendered from a template that uses the credit layout (name / title on Paper); sitemap; favicon set derived from the live dot.

---

## 11. Build order and checkpoints

1. Tokens (this file → `app/tokens.css`) and a `/tokens` preview page. Checkpoint.
2. Static layouts, all pages, no motion, responsive at 375/768/1280/1920. Checkpoint with screenshots.
3. Lenis + core motion system (reveals, scene switch). Checkpoint.
4. Signature moments (7.1–7.5, 7.7). Checkpoint.
5. Micro-interactions and texture (7.8–7.10). Checkpoint.
6. Reduced motion, accessibility, performance pass. Checkpoint with Lighthouse.
7. Polish (§12).

After every visual step: Playwright screenshots at the four widths including mid-scroll states, self-critique against Design / Usability / Creativity / Content scored 1–10, three weakest items fixed before continuing, anything under 8 reworked.

---

## 12. Polish checklist

- Every element on the grid; deviations listed in §5 only.
- No orphans or unauthored breaks in display type at any of the four widths.
- Hover, focus, active and loading states designed for every interactive element.
- No flashes, no layout jumps across page transitions or scene changes.
- Verified in Chrome, Safari (including iOS), Firefox.
- Reduced-motion version reviewed as a design, not a fallback.
- Loads acceptably on throttled 4G: name visible under 2.5s.
