import { ImageResponse } from "next/og";
import { splitTitle } from "@/components/site/title";
import { OG, OG_SIZE, ogFonts } from "@/lib/og";
import { client } from "@/sanity/lib/client";
import { PROJECT_QUERY, SETTINGS_QUERY } from "@/sanity/lib/queries";
import type { ProjectDetail, SiteSettings } from "@/sanity/lib/types";

export const size = OG_SIZE;
export const contentType = "image/png";
export const alt = "Case study";

// A case study's card: the title sequence in Theatre, with letterbox bars.
export default async function Image({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const [project, s] = await Promise.all([
    client.fetch<ProjectDetail | null>(PROJECT_QUERY, { slug }),
    client.fetch<SiteSettings | null>(SETTINGS_QUERY),
  ]);
  const c = OG.theatre;
  const { name, descriptor } = splitTitle(project?.title ?? "");
  const meta = [project?.role, project?.year].filter(Boolean).join(" · ");
  const text = [name, descriptor, meta, s?.name, "0123456789"].filter(Boolean).join("");

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
          fontFamily: "Instrument Sans",
        }}
      >
        <div style={{ height: 44, background: "#000" }} />
        <div
          style={{
            flex: 1,
            display: "flex",
            flexDirection: "column",
            justifyContent: "space-between",
            padding: "40px 56px",
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
            <span>{s?.name ?? ""}</span>
            <span>{meta}</span>
          </div>
          <div style={{ display: "flex", flexDirection: "column" }}>
            <div
              style={{
                fontFamily: "Fraunces",
                fontSize: name.length > 14 ? 120 : 160,
                lineHeight: 0.92,
                letterSpacing: -4,
              }}
            >
              {name}
            </div>
            {descriptor && (
              <div
                style={{
                  marginTop: 28,
                  fontFamily: "Fraunces",
                  fontSize: 40,
                  lineHeight: 1.05,
                  color: c.ink2,
                  maxWidth: 900,
                }}
              >
                {descriptor}
              </div>
            )}
          </div>
        </div>
        <div style={{ height: 44, background: "#000" }} />
      </div>
    ),
    { ...size, fonts: await ogFonts(text) },
  );
}
