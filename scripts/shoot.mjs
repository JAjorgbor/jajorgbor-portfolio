// Screenshot loop for the self-critique pass (DESIGN.md §11).
//   node scripts/shoot.mjs <route> [label]        e.g. node scripts/shoot.mjs /tokens
// Captures 375 / 768 / 1280 / 1920 into .shots/<label>/ and prints loaded fonts
// and console errors per width.
//   BASE=…       dev server URL (default http://localhost:3000)
//   SCENES=1     also capture with the html-level theatre override (token page only)
//   SCROLL=a,b   also capture the viewport at these fractions of page height,
//                after scrolling there and letting scrubbed motion settle
//   SETTLE=ms    wait after load before the full-page capture (default 3200,
//                enough for the longest entrance sequence)
//   LEADER=1     also capture the preloader mid-countdown
//   HOVER=sel    hover the first match at 1280+ and capture the viewport
//   REDUCED=1    emulate prefers-reduced-motion: reduce
import { chromium } from "@playwright/test";
import { mkdirSync } from "node:fs";
import path from "node:path";

const route = process.argv[2] ?? "/";
const label = process.argv[3] ?? (route.replace(/\W+/g, "_") || "home");
const base = process.env.BASE ?? "http://localhost:3000";
const settle = Number(process.env.SETTLE ?? 3200);
const fractions = (process.env.SCROLL ?? "").split(",").filter(Boolean).map(Number);
const out = path.resolve(".shots", label);
mkdirSync(out, { recursive: true });

const widths = [375, 768, 1280, 1920];
const browser = await chromium.launch();

for (const width of widths) {
  // REDUCED=1 emulates prefers-reduced-motion: reduce.
  const page = await browser.newPage({
    viewport: { width, height: width < 768 ? 812 : 1080 },
    deviceScaleFactor: 1,
    reducedMotion: process.env.REDUCED === "1" ? "reduce" : "no-preference",
  });
  const errors = [];
  page.on("console", (m) => m.type() === "error" && errors.push(m.text()));
  page.on("pageerror", (e) => errors.push(e.message));

  // LEADER=1: capture the preloader mid-countdown (fresh context, so it plays).
  if (process.env.LEADER === "1") {
    await page.goto(base + route, { waitUntil: "commit" });
    await page.waitForTimeout(900);
    await page.screenshot({ path: path.join(out, `${width}-leader.png`) });
  }

  await page.goto(base + route, { waitUntil: "networkidle" });
  await page.evaluate(() => document.fonts.ready);
  await page.waitForTimeout(settle);

  // HOVER=<selector>: scroll it into view, hover it, capture the viewport (fine pointers only).
  if (process.env.HOVER && width >= 1280) {
    const el = page.locator(process.env.HOVER).first();
    await el.scrollIntoViewIfNeeded();
    await page.waitForTimeout(1500);
    await el.hover({ position: { x: 120, y: 40 } });
    await page.waitForTimeout(1400);
    await page.screenshot({ path: path.join(out, `${width}-hover.png`) });
    await page.mouse.move(0, 0);
  }

  for (const f of fractions) {
    await page.evaluate((frac) => {
      const max = document.documentElement.scrollHeight - innerHeight;
      scrollTo(0, Math.round(max * frac));
    }, f);
    await page.waitForTimeout(1800);
    await page.screenshot({ path: path.join(out, `${width}-scroll-${f}.png`) });
  }

  // Walk the page so every scroll-triggered entrance has played, then capture.
  await page.evaluate(async () => {
    const max = document.documentElement.scrollHeight - innerHeight;
    for (let y = 0; y <= max; y += innerHeight * 0.6) {
      scrollTo(0, y);
      await new Promise((r) => setTimeout(r, 250));
    }
    scrollTo(0, max);
  });
  await page.waitForTimeout(1800);
  await page.evaluate(() => scrollTo(0, 0));
  await page.waitForTimeout(800);
  await page.screenshot({ path: path.join(out, `${width}.png`), fullPage: true });

  if (process.env.SCENES === "1") {
    await page.evaluate(() => (document.documentElement.dataset.scene = "theatre"));
    await page.waitForTimeout(1000);
    await page.screenshot({ path: path.join(out, `${width}-theatre.png`), fullPage: true });
  }

  const fonts = await page.evaluate(() =>
    [...document.fonts].map((f) => `${f.family} ${f.style} ${f.status}`),
  );
  console.log(`${width}px  fonts: ${[...new Set(fonts)].join(" | ")}`);
  // Ignore the Sanity Live CORS error (local origin not allowed in the project)
  // and the 404 status a not-found page itself returns.
  const real = errors.filter(
    (e) => !e.includes("api.sanity.io") && !e.includes("ERR_FAILED") && !/status of 404/.test(e),
  );
  if (real.length) console.log(`${width}px  console errors:\n  ${real.join("\n  ")}`);
  await page.close();
}

await browser.close();
console.log(`saved to ${out}`);
