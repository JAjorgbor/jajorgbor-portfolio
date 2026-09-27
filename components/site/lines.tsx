import { Fragment } from "react";

// DESIGN.md §3: authored breaks are written as "/" in Sanity and only apply
// from 768px up; below that the line balances.
export function Lines({ text, always = false }: { text: string; always?: boolean }) {
  const parts = text.split(/\s*\/\s*/).filter(Boolean);
  return parts.map((part, i) => (
    <Fragment key={i}>
      {i > 0 && (always ? <br /> : <br className="br-md" />)}
      {part}
    </Fragment>
  ));
}

// A name reads as credits when first and last names sit on their own lines.
export function NameLines({ name }: { name: string }) {
  const words = name.trim().split(/\s+/);
  if (words.length < 2) return name;
  const last = words.pop();
  return (
    <>
      {words.join(" ")}
      <br />
      {last}
    </>
  );
}
