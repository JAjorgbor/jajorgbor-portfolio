// Project titles are stored as "Name — Descriptor". The name carries the
// credit; the descriptor is set at text size beneath it.
export function splitTitle(title: string): { name: string; descriptor?: string } {
  const [name, ...rest] = title.split(/\s+[—–-]\s+/);
  const descriptor = rest.join(" — ").trim();
  return descriptor ? { name: name.trim(), descriptor } : { name: title.trim() };
}
