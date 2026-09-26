// Run by hand after adding or renaming a page: `npm run build && node scripts/build-og.mjs`.
// Makes a 1200×630 share image (Open Graph) for every built page from its h1, in the site's night-sky
// style with the gold map, and saves them as public/og/<slug>.jpg (committed). Uses Playwright (already a
// dev dependency) and the self-hosted fonts; nothing is fetched from anywhere else.
import { chromium } from 'playwright';
import { readFile, mkdir } from 'node:fs/promises';
import { join } from 'node:path';
import { ROOT, builtPages, textOf, ok } from './lib.mjs';

const brand = JSON.parse(await readFile(join(ROOT, 'src/lib/brand-paths.json'), 'utf8'));
const font = async (f) => (await readFile(join(ROOT, 'public/fonts', f))).toString('base64');
const [fraunces, manrope] = await Promise.all([font('fraunces-600.woff2'), font('manrope-var.woff2')]);
const OUT = join(ROOT, 'public', 'og');
await mkdir(OUT, { recursive: true });

export const ogSlug = (path) => (path.replace(/\/$/, '').replace(/[/.]/g, '-') || 'home');
const esc = (s) => s.replace(/&/g, '&amp;').replace(/</g, '&lt;');

const card = (title, kicker) => `<!doctype html><html><head><style>
@font-face{font-family:F;src:url(data:font/woff2;base64,${fraunces}) format('woff2');font-weight:600}
@font-face{font-family:M;src:url(data:font/woff2;base64,${manrope}) format('woff2');font-weight:200 800}
html,body{margin:0;width:1200px;height:630px;overflow:hidden}
body{position:relative;background:linear-gradient(180deg,#0E1650 0%,#17237A 62%,#2438B0 100%);color:#F6F4EF;font-family:M}
.glow{position:absolute;left:0;right:0;bottom:0;height:150px;background:radial-gradient(55% 100% at 50% 100%,rgba(242,192,107,.55),rgba(242,192,107,0) 75%)}
svg{position:absolute;right:56px;top:70px;width:430px;height:430px}
.brand{position:absolute;left:72px;top:64px;font-family:F;font-size:40px;display:flex;align-items:center;gap:14px}
.brand svg{position:static;width:44px;height:44px}
h1{position:absolute;left:72px;top:170px;width:640px;margin:0;font-family:F;font-weight:600;font-size:${title.length > 48 ? 58 : 68}px;line-height:1.02;letter-spacing:-0.02em}
p{position:absolute;left:72px;bottom:64px;margin:0;font-size:24px;font-weight:600;color:rgba(246,244,239,.82)}
</style></head><body><div class="glow"></div>
<svg viewBox="95 106 810 813"><defs><linearGradient id="g" x1="0" y1="0" x2="0" y2="1"><stop offset="0" stop-color="#F7D38E"/><stop offset="1" stop-color="#E9AE4E"/></linearGradient></defs><path d="${brand.map}" fill="url(#g)"/><path d="${brand.sparkle}" fill="#F6F4EF"/></svg>
<div class="brand"><svg viewBox="95 106 810 813"><path d="${brand.map}" fill="#F2C06B"/></svg>Pledge</div>
<h1>${esc(title)}</h1><p>${esc(kicker)}</p></body></html>`;

const browser = await chromium.launch();
const page = await browser.newPage({ viewport: { width: 1200, height: 630 } });
let n = 0;
for (const p of await builtPages()) {
  if (p.path === '404.html') continue;
  const html = await readFile(p.file, 'utf8');
  const h1 = textOf(html.match(/<h1[^>]*>([\s\S]*?)<\/h1>/)?.[1] ?? 'Pledge');
  const kicker = p.path.startsWith('australia/') ? 'An independent guide to the Australian citizenship test' : 'Independent study app for the Australian citizenship test';
  await page.setContent(card(h1, kicker));
  await page.evaluate(() => document.fonts.ready);
  await page.screenshot({ path: join(OUT, `${ogSlug(p.path)}.jpg`), type: 'jpeg', quality: 82 });
  n++;
}
await browser.close();
ok(`og images: ${n} written to public/og/`);
