// check:legal: the legal pages exist at their URLs and their text has not changed (docs/rules.md, rules 1–2).
// Compares the text of each page's <main> (with every link's target) with tests/legal-baseline/<page>.txt.
// `node scripts/check-legal.mjs --update` rewrites the baseline: only for a text change the owner approved.
import { readFile, writeFile, mkdir } from 'node:fs/promises';
import { existsSync } from 'node:fs';
import { join } from 'node:path';
import { DIST, ROOT, DEPLOY_URL, textOf, ok, fail } from './lib.mjs';

const PAGES = ['privacy', 'terms', 'support'];
const BASELINE = join(ROOT, 'tests', 'legal-baseline');
const update = process.argv.includes('--update');

// The "On this page" list (Legal.astro) repeats the h2 headings. It is left out of the text comparison,
// and instead must hold only the label "On this page" and links whose text equals an h2 on the page.
function stripToc(main, page, problems) {
  const toc = main.match(/<nav\b[^>]*\bdata-legal-toc\b[^>]*>([\s\S]*?)<\/nav>/i);
  if (!toc) return main;
  const headings = new Set([...main.matchAll(/<h2\b[^>]*>([\s\S]*?)<\/h2>/gi)].map((m) => textOf(m[1])));
  const items = [...toc[1].matchAll(/<a\b[^>]*>([\s\S]*?)<\/a>/gi)].map((m) => textOf(m[1]));
  const rest = textOf(toc[1].replace(/<a\b[^>]*>[\s\S]*?<\/a>/gi, ''));
  if (rest !== 'On this page') problems.push(`/${page}/ "On this page" list has extra text: "${rest}"`);
  for (const item of items) if (!headings.has(item)) problems.push(`/${page}/ "On this page" item is not a heading: "${item}"`);
  return main.replace(toc[0], '');
}

function legalText(html, page, problems) {
  const main = html.match(/<main[^>]*>([\s\S]*?)<\/main>/i);
  if (!main) return null;
  const pageUrl = new URL(`${page}/`, DEPLOY_URL);
  const withLinks = stripToc(main[1], page, problems).replace(/<a\b[^>]*\bhref="([^"]*)"[^>]*>([\s\S]*?)<\/a>/gi, (_, href, inner) => {
    let target = new URL(href.replace(/&amp;/g, '&'), pageUrl).href;
    if (target.startsWith(DEPLOY_URL)) target = '~/' + target.slice(DEPLOY_URL.length);
    return `${inner} [link: ${target}]`;
  });
  // One line per block, so a diff shows exactly which sentence changed.
  return withLinks
    .split(/<\/(?:p|li|h[1-6]|dt|dd|tr|summary)>|<br\s*\/?>/i)
    .map((block) => textOf(block))
    .filter(Boolean)
    .join('\n') + '\n';
}

const problems = [];
if (update) await mkdir(BASELINE, { recursive: true });
for (const page of PAGES) {
  const file = join(DIST, page, 'index.html');
  if (!existsSync(file)) { problems.push(`/${page}/ is missing from the build (dist/${page}/index.html)`); continue; }
  const text = legalText(await readFile(file, "utf8"), page, problems);
  if (!text) { problems.push(`/${page}/ has no <main> element`); continue; }
  const base = join(BASELINE, `${page}.txt`);
  if (update) { await writeFile(base, text); continue; }
  if (!existsSync(base)) { problems.push(`no baseline for /${page}/ (tests/legal-baseline/${page}.txt)`); continue; }
  const want = (await readFile(base, 'utf8')).split('\n');
  const got = text.split('\n');
  for (let i = 0; i < Math.max(want.length, got.length); i++) {
    if (want[i] !== got[i]) {
      problems.push(`/${page}/ line ${i + 1} changed:\n      was: ${want[i] ?? '(nothing)'}\n      now: ${got[i] ?? '(nothing)'}`);
      break;
    }
  }
}
if (update) ok(`legal baseline rewritten for ${PAGES.length} pages: record the owner's approval in docs/decisions.md`);
else if (problems.length) fail('legal pages changed or missing (docs/rules.md, rules 1–2)', problems);
else ok(`legal pages: ${PAGES.length} present, text unchanged`);
