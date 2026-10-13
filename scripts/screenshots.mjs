// Captures review screenshots of the production build at several widths.
// Usage: npm run build && npm run preview, then in another terminal:
//   node scripts/screenshots.mjs [outDir]      (default: ./screenshots)
import { mkdir } from 'node:fs/promises';
import { chromium } from '@playwright/test';

const base = process.env.BASE_URL ?? 'http://localhost:4173/';
const outDir = process.argv[2] ?? 'screenshots';

const viewports = [
  { name: 'desktop', width: 1440, height: 900 },
  { name: 'laptop', width: 1280, height: 800 },
  { name: 'tablet', width: 820, height: 1180 },
  { name: 'mobile', width: 390, height: 844 },
];

await mkdir(outDir, { recursive: true });
const browser = await chromium.launch();

for (const viewport of viewports) {
  // Reduced motion shows every scroll-revealed element in full-page captures.
  const context = await browser.newContext({ viewport, reducedMotion: 'reduce' });
  const page = await context.newPage();
  await page.goto(base, { waitUntil: 'networkidle' });
  await page.evaluate(() => document.fonts.ready);
  await page.screenshot({ path: `${outDir}/${viewport.name}-first-view.png` });
  await page.screenshot({ path: `${outDir}/${viewport.name}-full.png`, fullPage: true });
  await context.close();
}

await browser.close();
console.log(`Saved screenshots to ${outDir}/`);
