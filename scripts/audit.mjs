// Lighthouse pass for the budgets in DESIGN.md §10. Run against `next start`.
//   node scripts/audit.mjs [base]      default http://localhost:3002
// Mobile emulation with simulated 4G throttling; prints the four category
// scores, LCP / CLS / TBT, and the gzipped JS transferred on first view.
import { writeFileSync, mkdirSync } from "node:fs";
import lighthouse from "lighthouse";
import { chromium } from "@playwright/test";

const base = process.argv[2] ?? "http://localhost:3002";
const routes = ["/", "/work", "/projects/linkpane", "/about", "/contact"];
const port = 9222;

mkdirSync(".shots/audit", { recursive: true });
// Playwright's Chromium, exposed on a debugging port for Lighthouse to drive.
const chrome = await chromium.launch({ args: [`--remote-debugging-port=${port}`] });

const kb = (n) => `${Math.round(n / 1024)} KB`;
const pct = (n) => Math.round(n * 100);

for (const route of routes) {
  const { lhr } = await lighthouse(base + route, {
    port,
    output: "json",
    onlyCategories: ["performance", "accessibility", "best-practices", "seo"],
    formFactor: "mobile",
    screenEmulation: { mobile: true, width: 412, height: 823, deviceScaleFactor: 2.625, disabled: false },
    throttlingMethod: "simulate",
  });
  writeFileSync(`.shots/audit/${route.replace(/\W+/g, "_") || "home"}.json`, JSON.stringify(lhr));

  const c = lhr.categories;
  const a = lhr.audits;
  const js = (a["network-requests"]?.details?.items ?? [])
    .filter((i) => i.resourceType === "Script")
    .reduce((sum, i) => sum + (i.transferSize ?? 0), 0);

  console.log(
    `${route.padEnd(20)} perf ${pct(c.performance.score)}  a11y ${pct(c.accessibility.score)}  bp ${pct(c["best-practices"].score)}  seo ${pct(c.seo.score)}` +
      `  | LCP ${a["largest-contentful-paint"].displayValue}  CLS ${a["cumulative-layout-shift"].displayValue}  TBT ${a["total-blocking-time"].displayValue}  JS ${kb(js)}`,
  );

  const failing = Object.values(a).filter(
    (x) => x.score !== null && x.score < 0.9 && x.scoreDisplayMode === "binary",
  );
  for (const x of failing) console.log(`    ✗ ${x.id}: ${x.title}`);
}

await chrome.close();
