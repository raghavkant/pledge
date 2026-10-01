// check:year (the January check). Titles say the year people search with ("… 2026"), taken from the latest fact
// check (YEAR in src/data/au/facts.ts), so a title can never claim a year the facts weren't checked in.
// 1. Every year in a built page's <title> must be that year (catches a year typed by hand). Fails.
// 2. Once a new year starts, the facts need a re-check before the titles move on: a warning on every build,
//    and a failure with --strict (the weekly GitHub workflow), which emails the owner without blocking deploys.
// To clear it: re-check every fact in docs/facts.md, then update CHECKED in src/data/au/facts.ts and re-run
// scripts/build-pdf.mjs (the 50-questions PDF carries the date).
import { readFile } from 'node:fs/promises';
import { join } from 'node:path';
import { ROOT, builtPages, ok, fail } from './lib.mjs';

const facts = await readFile(join(ROOT, 'src/data/au/facts.ts'), 'utf8');
const year = facts.match(/CHECKED = \{ iso: '(\d{4})-/)[1];
const now = String(new Date().getUTCFullYear());

const problems = [];
let dated = 0;
for (const { file, path } of await builtPages()) {
  const title = (await readFile(file, 'utf8')).match(/<title>([^<]*)<\/title>/)?.[1] ?? '';
  for (const y of title.match(/\b20\d\d\b/g) ?? []) {
    dated++;
    if (y !== year) problems.push(`/${path}: title says ${y}, the facts were last checked in ${year}`);
  }
}
if (problems.length) fail('a page title has the wrong year', problems);

if (now > year) {
  const msg = `It is ${now}, and the titles still say ${year}. Re-check every fact in docs/facts.md, then update CHECKED in src/data/au/facts.ts and re-run scripts/build-pdf.mjs.`;
  if (process.argv.includes('--strict')) fail(`January check: ${msg}`);
  console.warn(`! January check: ${msg}`);
}
ok(`year: ${dated} page titles say ${year}, the year of the latest fact check`);
