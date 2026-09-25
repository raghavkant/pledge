// check:budgets: gzipped JS and CSS each page loads (docs/requirements.md, §6).
// Home page JS ≤ 15 KB (hard limit); other pages JS ≤ 30 KB; CSS ≤ 30 KB on every page.
import { readFile } from 'node:fs/promises';
import { existsSync } from 'node:fs';
import { join } from 'node:path';
import { gzipSync } from 'node:zlib';
import { DIST, BASE, builtPages, ok, fail } from './lib.mjs';

const KB = 1024;
const LIMITS = { homeJs: 15 * KB, js: 30 * KB, css: 30 * KB };
const gz = (s) => gzipSync(s, { level: 9 }).length;

async function assetSize(href) {
  if (!href.startsWith(BASE)) return 0; // only our own files exist; third-party files are forbidden anyway
  const file = join(DIST, decodeURIComponent(href.slice(BASE.length).split(/[?#]/)[0]));
  return existsSync(file) ? gz(await readFile(file)) : 0;
}

const problems = [];
const rows = [];
for (const { file, path } of await builtPages()) {
  const html = await readFile(file, 'utf8');
  const abs = (h) => new URL(h, `http://x${BASE}${path}`).pathname;
  let js = 0, css = 0;
  for (const m of html.matchAll(/<script\b[^>]*\bsrc="([^"]+)"/gi)) js += await assetSize(abs(m[1]));
  for (const m of html.matchAll(/<link\b[^>]*rel="modulepreload"[^>]*href="([^"]+)"/gi)) js += await assetSize(abs(m[1]));
  for (const m of html.matchAll(/<script\b(?![^>]*\bsrc=)(?![^>]*type="application\/(?:ld\+)?json")[^>]*>([\s\S]*?)<\/script>/gi)) js += m[1].trim() ? gz(m[1]) : 0;
  for (const m of html.matchAll(/<link\b[^>]*rel="stylesheet"[^>]*href="([^"]+)"/gi)) css += await assetSize(abs(m[1]));
  for (const m of html.matchAll(/<style\b[^>]*>([\s\S]*?)<\/style>/gi)) css += gz(m[1]);
  const jsLimit = path === '' ? LIMITS.homeJs : LIMITS.js;
  rows.push(`/${path}: JS ${(js / KB).toFixed(1)} KB, CSS ${(css / KB).toFixed(1)} KB`);
  if (js > jsLimit) problems.push(`/${path} JS ${(js / KB).toFixed(1)} KB > ${jsLimit / KB} KB`);
  if (css > LIMITS.css) problems.push(`/${path} CSS ${(css / KB).toFixed(1)} KB > ${LIMITS.css / KB} KB`);
}
if (problems.length) fail('size budgets broken', [...problems, ...rows]);
ok(`budgets: ${rows.length} pages within JS/CSS limits (home JS ≤ 15 KB)`);
if (process.argv.includes('--verbose')) for (const r of rows) console.log(`  ${r}`);
