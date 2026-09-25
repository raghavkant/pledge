// npm run screenshots: every built page at phone and three desktop sizes, light and dark,
// saved in screenshots/ (not in git) for review before a phase is called done (docs/rules.md, rule 18).
// Options: page path prefixes to shoot only some pages; --motion to keep animations on (default: reduced).
import { chromium } from 'playwright';
import { mkdir, rm } from 'node:fs/promises';
import { join } from 'node:path';
import { ROOT, builtPages, serve, ok } from './lib.mjs';

const SIZES = { phone: [390, 844], '1280': [1280, 800], '1440': [1440, 900], '1920': [1920, 1080] };
const OUT = join(ROOT, 'screenshots');
const only = process.argv.slice(2).filter((a) => !a.startsWith('-'));
const motion = process.argv.includes('--motion');

if (!only.length) await rm(OUT, { recursive: true, force: true });
await mkdir(OUT, { recursive: true });
const server = await serve();
const pages = (await builtPages()).filter((p) => !only.length || only.some((o) => p.path.startsWith(o)));
const browser = await chromium.launch();

// Scroll down the page and back, as a reader would, so everything below the first screen is painted
// (and anything that appears on scroll has appeared) before the full-page capture.
async function scrollThrough(page) {
  await page.evaluate(async () => {
    const step = Math.max(200, innerHeight * 0.7);
    for (let y = 0; y < document.documentElement.scrollHeight; y += step) {
      scrollTo(0, y);
      await new Promise((r) => requestAnimationFrame(() => setTimeout(r, 40)));
    }
    scrollTo(0, 0);
  });
}
let count = 0;
for (const scheme of ['light', 'dark']) {
  for (const [name, [width, height]] of Object.entries(SIZES)) {
    const context = await browser.newContext({
      viewport: { width, height },
      deviceScaleFactor: name === 'phone' ? 3 : 1,
      isMobile: name === 'phone',
      hasTouch: name === 'phone',
      colorScheme: scheme,
      reducedMotion: motion ? 'no-preference' : 'reduce',
    });
    const page = await context.newPage();
    for (const p of pages) {
      await page.goto(server.base + p.path, { waitUntil: 'networkidle' });
      await page.evaluate(() => document.fonts.ready);
      await scrollThrough(page);
      await page.waitForTimeout(motion ? 2500 : 150);
      const slug = (p.path.replace(/\/$/, '').replace(/[/.]/g, '_') || 'home');
      await page.screenshot({ path: join(OUT, `${slug}--${name}--${scheme}.png`), fullPage: true });
      count++;
    }
    await context.close();
  }
}
await browser.close();
server.close();
ok(`screenshots: ${count} saved in screenshots/ (${pages.length} pages × 4 sizes × light/dark)`);
