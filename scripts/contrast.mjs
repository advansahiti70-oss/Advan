// Prints WCAG 2.x contrast ratios for the Ocean & Coral palette pairings used on the site.
// Usage: node scripts/contrast.mjs
const palette = {
  ocean: '#102B35',
  deep: '#1A3B46',
  coral: '#FF8975',
  text: '#F1F7F5',
  muted: '#A9C2C7',
  line: '#34515A',
};

const hexToRgb = (hex) => hex.match(/[0-9a-f]{2}/gi).map((h) => parseInt(h, 16));
const mix = (a, b, weightA) => {
  const [ra, rb] = [hexToRgb(a), hexToRgb(b)];
  return '#' + ra.map((c, i) => Math.round(c * weightA + rb[i] * (1 - weightA)).toString(16).padStart(2, '0')).join('');
};
const luminance = (hex) => {
  const [r, g, b] = hexToRgb(hex).map((c) => {
    const s = c / 255;
    return s <= 0.03928 ? s / 12.92 : ((s + 0.055) / 1.055) ** 2.4;
  });
  return 0.2126 * r + 0.7152 * g + 0.0722 * b;
};
const ratio = (fg, bg) => {
  const [l1, l2] = [luminance(fg), luminance(bg)].sort((a, b) => b - a);
  return (l1 + 0.05) / (l2 + 0.05);
};

// Interactive outlines need 3:1 against both backgrounds; derived from muted + ocean.
const borderStrong = mix(palette.muted, palette.ocean, 0.62);

const pairs = [
  ['text on ocean', palette.text, palette.ocean, 4.5],
  ['text on deep', palette.text, palette.deep, 4.5],
  ['muted on ocean', palette.muted, palette.ocean, 4.5],
  ['muted on deep', palette.muted, palette.deep, 4.5],
  ['coral on ocean', palette.coral, palette.ocean, 4.5],
  ['coral on deep', palette.coral, palette.deep, 4.5],
  ['ocean on coral (button label)', palette.ocean, palette.coral, 4.5],
  ['text on coral (avoid)', palette.text, palette.coral, 4.5],
  ['line on ocean (decorative)', palette.line, palette.ocean, 1],
  [`border-strong ${borderStrong} on ocean (UI)`, borderStrong, palette.ocean, 3],
  [`border-strong ${borderStrong} on deep (UI)`, borderStrong, palette.deep, 3],
  ['coral focus ring on ocean (UI)', palette.coral, palette.ocean, 3],
  ['coral focus ring on deep (UI)', palette.coral, palette.deep, 3],
];

let failed = false;
for (const [label, fg, bg, min] of pairs) {
  const r = ratio(fg, bg);
  const ok = r >= min || label.includes('avoid') || min === 1;
  if (!ok) failed = true;
  console.log(`${ok ? 'ok  ' : 'FAIL'} ${r.toFixed(2).padStart(5)}:1  (min ${min})  ${label}`);
}
process.exit(failed ? 1 : 0);
