import { SceneToggle } from "./scene-toggle";

const STEPS = [
  ["--step-6", "The name"],
  ["--step-5", "Positioning line"],
  ["--step-4", "Credit titles"],
  ["--step-3", "Case-study headings"],
  ["--step-2", "Section labels"],
  ["--step-1", "Lead paragraphs"],
  ["--step-0", "Body"],
  ["--step--1", "Captions"],
  ["--step--2", "Meta"],
] as const;

const COLOURS = [
  ["--bg", "Page"],
  ["--ink", "Display, body"],
  ["--ink-2", "Secondary"],
  ["--ink-3", "Meta, captions"],
  ["--line", "Rules, frames"],
  ["--accent", "Timecode, live dot, links"],
  ["--frame", "Letterbox"],
] as const;

const SPACES = Array.from({ length: 12 }, (_, i) => `--space-${i + 1}`);

const EASES = [
  ["--ease-curtain", "Masks, reveals"],
  ["--ease-dolly", "Layout moves, cursor, hover"],
  ["--ease-cut", "Timecode, hard cuts"],
] as const;

const DURS = [
  ["--dur-1", "160ms", "Micro"],
  ["--dur-2", "400ms", "Hover"],
  ["--dur-3", "900ms", "Reveals"],
  ["--dur-4", "1400ms", "Scene moves"],
  ["--dur-5", "2200ms", "Preloader"],
] as const;

function Section({
  label,
  full,
  children,
}: {
  label: string;
  full?: boolean;
  children: React.ReactNode;
}) {
  return (
    <section className="section grid">
      <div className="section__label meta">{label}</div>
      <div className={full ? "section__body section__body--full" : "section__body"}>
        {children}
      </div>
    </section>
  );
}

export default function TokensPage() {
  return (
    <main className="page">
      <SceneToggle />

      <p className="meta meta--accent">Tokens · DESIGN.md</p>
      <h1 className="display" style={{ fontSize: "var(--step-6)", marginTop: "var(--space-5)" }}>
        Joshua
        <br />
        Ajorgbor
      </h1>
      <p
        className="display display--mid"
        style={{ fontSize: "var(--step-3)", marginTop: "var(--space-6)" }}
      >
        Fullstack engineer who takes products
        <br className="br-md" />
        from first commit <em>to production.</em>
      </p>

      <Section label="Type scale">
        {STEPS.map(([token, use]) => (
          <div className="row" key={token}>
            <span className="meta">
              {token}
              <br />
              {use}
            </span>
            <span
              className={
                token === "--step-6" || token === "--step-5" || token === "--step-4"
                  ? "display"
                  : token === "--step-3" || token === "--step-2"
                    ? "display display--mid"
                    : token === "--step--2"
                      ? "meta"
                      : undefined
              }
              style={{ fontSize: `var(${token})`, color: "var(--ink)" }}
            >
              Selected work, 2023
            </span>
          </div>
        ))}
      </Section>

      <Section label="Display faces">
        <div className="row">
          <span className="meta">Roman · 16 KB · preloaded</span>
          <span className="display" style={{ fontSize: "var(--step-4)" }}>
            First commit
          </span>
        </div>
        <div className="row">
          <span className="meta">Italic · 21 KB · on demand</span>
          <span className="display" style={{ fontSize: "var(--step-4)" }}>
            <em>First commit</em>
          </span>
        </div>
        <div className="row">
          <span className="meta">404 line</span>
          <span className="display" style={{ fontSize: "var(--step-4)" }}>
            <em>This reel is missing</em>
          </span>
        </div>
      </Section>

      <Section label="Text">
        <p style={{ fontSize: "var(--step-1)", margin: 0 }}>
          Lead paragraph. Instrument Sans at width 100, weight 400, leading
          1.5. Used under credit titles and to open a case study section.
        </p>
        <p style={{ marginTop: "var(--space-5)" }}>
          Body copy. The same face at step zero.{" "}
          <strong style={{ fontVariationSettings: "var(--text-settings-strong)" }}>
            Strong is weight 600
          </strong>
          , never bold via a second file.{" "}
          <em>Italic is the real italic.</em>
        </p>
        <p className="meta" style={{ marginTop: "var(--space-5)" }}>
          Meta · Role · 2023 · 00:01:24:12
        </p>
      </Section>

      <Section label="Colour">
        <div className="swatches">
          {COLOURS.map(([token, use]) => (
            <div className="swatch" key={token}>
              <div
                className="swatch__chip"
                style={{ background: `var(${token})` }}
              />
              <div className="meta">
                {token}
                <br />
                {use}
              </div>
            </div>
          ))}
        </div>
        <div
          className="scene"
          data-scene="theatre"
          style={{ marginTop: "var(--space-6)" }}
        >
          <p className="meta meta--accent">Theatre, nested</p>
          <p className="display" style={{ fontSize: "var(--step-3)", marginTop: "var(--space-3)" }}>
            The lights go down.
          </p>
          <p style={{ color: "var(--ink-2)" }}>Secondary text in the dark.</p>
          <p className="meta">Meta at 5.3:1</p>
        </div>
      </Section>

      <Section label="Spacing">
        <div className="spacing">
          {SPACES.map((token) => (
            <div key={token} style={{ textAlign: "center" }}>
              <div
                className="spacing__bar"
                style={{ height: `var(${token})` }}
              />
              <div className="meta" style={{ marginTop: "var(--space-2)" }}>
                {token.replace("--space-", "")}
              </div>
            </div>
          ))}
        </div>
        <div className="row" style={{ marginTop: "var(--space-6)" }}>
          <span className="meta">--section</span>
          <div style={{ height: "var(--section)", background: "var(--hover-fill)" }} />
        </div>
        <div className="row">
          <span className="meta">--section-tight</span>
          <div style={{ height: "var(--section-tight)", background: "var(--hover-fill)" }} />
        </div>
      </Section>

      <Section label="Grid" full>
        <div className="grid" style={{ height: "6rem" }}>
          {Array.from({ length: 12 }, (_, i) => (
            <div
              key={i}
              style={{
                background: "var(--hover-fill)",
                borderLeft: "1px solid var(--line)",
                borderRight: "1px solid var(--line)",
              }}
            />
          ))}
        </div>
        <p className="meta" style={{ marginTop: "var(--space-3)" }}>
          12 columns · margin clamp(1rem, 4vw, 4rem) · gutter clamp(0.75rem,
          1.5vw, 1.5rem)
        </p>
      </Section>

      <Section label="Easing">
        {EASES.map(([token, use]) => (
          <div key={token}>
            <div className="meta">
              {token} · {use}
            </div>
            <div className="easing">
              <div
                className="easing__dot"
                style={{ ["--ease" as string]: `var(${token})` }}
              />
            </div>
          </div>
        ))}
        <div className="row" style={{ marginTop: "var(--space-5)" }}>
          <span className="meta">Durations</span>
          <span className="meta">
            {DURS.map(([t, v, u]) => `${t} ${v} ${u}`).join(" · ")}
          </span>
        </div>
        <div className="row">
          <span className="meta">Staggers</span>
          <span className="meta">char 18 · word 45 · line 110 · item 80</span>
        </div>
      </Section>

      <Section label="Reveal (mask)">
        {["Line one enters", "through a mask,", "never by fade."].map(
          (line, i) => (
            <div className="mask" key={line}>
              <div
                className="display"
                style={{
                  fontSize: "var(--step-4)",
                  ["--delay" as string]: `calc(var(--stagger-line) * ${i})`,
                }}
              >
                {line}
              </div>
            </div>
          ),
        )}
      </Section>
    </main>
  );
}
