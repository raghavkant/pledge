// check:paid-leak (local only): no paid question's text appears anywhere in the built site.
// Reads the app project's question bank READ-ONLY (never writes there). Skips with a message when the
// app project isn't on this machine (for example in CI), because check:free-tier still runs there.
import { readFile } from 'node:fs/promises';
import { existsSync } from 'node:fs';
import { join } from 'node:path';
import { homedir } from 'node:os';
import { builtFiles, ok, fail } from './lib.mjs';

const APP = process.env.PLEDGE_APP_DIR || join(homedir(), 'Developer', 'citizenship-test');
const BANK = join(APP, 'content', 'au', 'questions.json');
const FREE_VALUES = join(APP, 'content', 'au', 'free-values.json');

if (!existsSync(BANK) || !existsSync(FREE_VALUES)) {
  ok(`paid-leak: skipped (app project not found at ${APP})`);
  process.exit(0);
}

const bank = JSON.parse(await readFile(BANK, 'utf8'));
const freeValues = new Set(JSON.parse(await readFile(FREE_VALUES, 'utf8')));
const isFree = (q) => (q.part === 1 && !q.isValues) || (q.isValues && freeValues.has(q.id));
const norm = (s) => s.toLowerCase().replace(/[’‘]/g, "'").replace(/[“”]/g, '"').replace(/\s+/g, ' ').trim();
const paid = bank.filter((q) => !isFree(q));
// A few explanations quote the same booklet sentence in a free and a paid question. That sentence is
// free content, so only text that belongs to paid questions alone counts as a leak.
const freeText = new Set(bank.filter(isFree).flatMap((q) => [norm(q.question), norm(q.explanation || '')]));

// Everything the site ships, as one normalised string (HTML tags removed, JSON left as is).
let shipped = '';
for (const { file, rel } of await builtFiles()) {
  if (!/\.(html|js|mjs|json|txt|xml)$/.test(rel)) continue;
  const raw = await readFile(file, 'utf8');
  shipped += ' ' + norm(raw.replace(/<[^>]+>/g, ' ').replace(/\\u2019/g, "'").replace(/\\"/g, '"'));
}

const leaks = [];
for (const q of paid) {
  for (const text of [q.question, q.explanation]) {
    if (text && text.length >= 25 && !freeText.has(norm(text)) && shipped.includes(norm(text))) {
      leaks.push(`${q.id}: "${text.slice(0, 70)}${text.length > 70 ? '…' : ''}"`);
      break;
    }
  }
}
if (leaks.length) fail(`paid questions found in the built site (${leaks.length})`, leaks.slice(0, 20));
ok(`paid-leak: none of ${paid.length} paid questions appear in the build`);
