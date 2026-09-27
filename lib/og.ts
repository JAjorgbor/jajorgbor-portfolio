// Fonts for the Open Graph renderer. Fetched from the same Google Fonts source
// the site builds with; a legacy user agent makes the API answer with static
// TrueType instances, which the renderer (Satori) can read.
const LEGACY_UA = "Mozilla/5.0 (X11; Linux x86_64; rv:20.0) Gecko/20100101 Firefox/20.0";

async function fetchFont(family: string, axes: string, text?: string) {
  const params = new URLSearchParams({ family: `${family}:${axes}` });
  if (text) params.set("text", text);
  const css = await fetch(`https://fonts.googleapis.com/css2?${params}`, {
    headers: { "User-Agent": LEGACY_UA },
  }).then((r) => r.text());
  const url = css.match(/src:\s*url\(([^)]+)\)/)?.[1];
  if (!url) throw new Error(`No font file for ${family}`);
  return fetch(url).then((r) => r.arrayBuffer());
}

export async function ogFonts(text?: string) {
  const [display, meta] = await Promise.all([
    fetchFont("Fraunces", "opsz,wght@144,300", text),
    fetchFont("Instrument Sans", "wght@500", text),
  ]);
  return [
    { name: "Fraunces", data: display, weight: 300 as const, style: "normal" as const },
    { name: "Instrument Sans", data: meta, weight: 500 as const, style: "normal" as const },
  ];
}

export const OG_SIZE = { width: 1200, height: 630 };

// Colour tokens, mirrored from app/tokens.css (the renderer has no CSS).
export const OG = {
  paper: { bg: "#F2EFE9", ink: "#121212", ink2: "#4A4744", ink3: "#6F6B66", line: "#D9D4CB", accent: "#E0421B" },
  theatre: { bg: "#0B0B0B", ink: "#F2EFE9", ink2: "#B8B3AB", ink3: "#8A857E", line: "#262626", accent: "#FF5A2E" },
};
