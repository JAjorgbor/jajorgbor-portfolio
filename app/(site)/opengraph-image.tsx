import { ImageResponse } from "next/og";
import { OG, OG_SIZE, ogFonts } from "@/lib/og";
import { client } from "@/sanity/lib/client";
import { SETTINGS_QUERY } from "@/sanity/lib/queries";
import type { SiteSettings } from "@/sanity/lib/types";

export const size = OG_SIZE;
export const contentType = "image/png";
export const alt = "Portfolio";

// The site's card, set like the first credit: name, positioning, meta.
export default async function Image() {
  const s = await client.fetch<SiteSettings | null>(SETTINGS_QUERY);
  const c = OG.paper;
  const name = s?.name ?? "";
  const [first, ...rest] = name.split(" ");
  const positioning = (s?.positioning ?? "").replace(/\s*\/\s*/g, " ");
  const text = [name, positioning, s?.role, s?.availability, "0123456789"].filter(Boolean).join("");

  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          background: c.bg,
          color: c.ink,
          display: "flex",
          flexDirection: "column",
          justifyContent: "space-between",
          padding: 56,
          fontFamily: "Instrument Sans",
        }}
      >
        <div
          style={{
            display: "flex",
            justifyContent: "space-between",
            fontSize: 20,
            letterSpacing: 2,
            textTransform: "uppercase",
            color: c.ink3,
          }}
        >
          <span>{s?.role ?? ""}</span>
          {s?.availability && (
            <span style={{ display: "flex", alignItems: "center", gap: 12 }}>
              <span style={{ width: 12, height: 12, borderRadius: 6, background: c.accent }} />
              {s.availability}
            </span>
          )}
        </div>

        <div style={{ display: "flex", flexDirection: "column" }}>
          <div
            style={{
              display: "flex",
              flexDirection: "column",
              fontFamily: "Fraunces",
              fontSize: 168,
              lineHeight: 0.9,
              letterSpacing: -5,
            }}
          >
            <span>{first}</span>
            <span>{rest.join(" ")}</span>
          </div>
          {positioning && (
            <div
              style={{
                marginTop: 36,
                fontFamily: "Fraunces",
                fontSize: 44,
                lineHeight: 1.05,
                letterSpacing: -0.7,
                color: c.ink2,
                maxWidth: 760,
              }}
            >
              {positioning}
            </div>
          )}
        </div>
      </div>
    ),
    { ...size, fonts: await ogFonts(text) },
  );
}
