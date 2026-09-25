// check:lighthouse: Lighthouse on mobile (its default: phone screen, slow 4G, slower CPU) for every page.
// Hard limits (docs/rules.md, rule 12): performance ≥ 90; accessibility, best practices, SEO ≥ 95; CLS ≤ 0.05.
// Options: --runs=N (median of N runs, default 1), page path prefixes to check only some pages.
import { spawn } from 'node:child_process';
import { readdir, readFile, rm } from 'node:fs/promises';
import { join } from 'node:path';
import { ROOT, builtPages, serve, ok, fail } from './lib.mjs';

const MIN = { performance: 0.9, accessibility: 0.95, 'best-practices': 0.95, seo: 0.95 };
const MAX_CLS = 0.05;
const runs = Number((process.argv.find((a) => a.startsWith('--runs=')) || '--runs=1').split('=')[1]);
const only = process.argv.slice(2).filter((a) => !a.startsWith('-'));
const OUT = join(ROOT, '.lighthouseci');

const server = await serve();
const pages = (await builtPages()).filter((p) => p.path !== '404.html' && (!only.length || only.some((o) => p.path.startsWith(o))));
await rm(OUT, { recursive: true, force: true });

const args = ['lhci', 'collect', `--numberOfRuns=${runs}`, '--settings.chromeFlags=--headless=new --no-sandbox',
  ...pages.map((p) => `--url=${server.base}${p.path}`)];
const log = await new Promise((resolve) => {
  let out = '';
  const child = spawn('npx', args, { cwd: ROOT, env: process.env });
  child.stdout.on('data', (d) => (out += d));
  child.stderr.on('data', (d) => (out += d));
  child.on('close', (code) => resolve({ code, out }));
});
server.close();
if (log.code !== 0) fail('Lighthouse could not run', [log.out.trim().split('\n').slice(-8).join('\n    ')]);

const reports = {};
for (const name of (await readdir(OUT)).filter((n) => n.startsWith('lhr-') && n.endsWith('.json'))) {
  const lhr = JSON.parse(await readFile(join(OUT, name), 'utf8'));
  (reports[lhr.requestedUrl] ||= []).push(lhr);
}

const median = (xs) => [...xs].sort((a, b) => a - b)[Math.floor(xs.length / 2)];
const problems = [];
const rows = [];
for (const p of pages) {
  const list = reports[server.base + p.path];
  if (!list?.length) { problems.push(`/${p.path}: no Lighthouse report`); continue; }
  const score = (cat) => median(list.map((l) => l.categories[cat]?.score ?? 0));
  const cls = median(list.map((l) => l.audits['cumulative-layout-shift']?.numericValue ?? 1));
  const row = Object.fromEntries(Object.keys(MIN).map((c) => [c, Math.round(score(c) * 100)]));
  rows.push(`/${p.path || ''}: perf ${row.performance}, a11y ${row.accessibility}, bp ${row['best-practices']}, seo ${row.seo}, CLS ${cls.toFixed(3)}`);
  for (const [cat, min] of Object.entries(MIN)) {
    if (score(cat) < min) {
      const failing = Object.values(list[0].audits)
        .filter((a) => a.score !== null && a.score < 0.9 && list[0].categories[cat].auditRefs.some((r) => r.id === a.id && r.weight > 0))
        .map((a) => a.id).slice(0, 6).join(', ');
      problems.push(`/${p.path} ${cat} ${Math.round(score(cat) * 100)} < ${min * 100}${failing ? ` (failing: ${failing})` : ''}`);
    }
  }
  if (cls > MAX_CLS) problems.push(`/${p.path} layout shift ${cls.toFixed(3)} > ${MAX_CLS}`);
}
if (problems.length) fail(`Lighthouse limits broken`, [...problems, 'scores:', ...rows]);
ok(`Lighthouse mobile: ${pages.length} pages within limits`);
if (process.argv.includes('--verbose')) for (const r of rows) console.log(`  ${r}`);
