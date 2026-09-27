// §7.10 A fixed film grain: one SVG turbulence, never animated, blended with
// `overlay` so it reads on paper and on black at once.
export function Grain() {
  return (
    <svg aria-hidden="true" className="grain" xmlns="http://www.w3.org/2000/svg">
      <filter id="grain-filter">
        <feTurbulence type="fractalNoise" baseFrequency="0.9" numOctaves="2" stitchTiles="stitch" />
        <feColorMatrix type="saturate" values="0" />
      </filter>
      <rect width="100%" height="100%" filter="url(#grain-filter)" />
    </svg>
  );
}
