// check:free-tier: only the app's free questions may appear on this public site (docs/rules.md, rule 4).
// 1. If src/data/au/free-questions.json exists: every question is Part 1 (not values) with a p1-NNN id,
//    or one of the 20 allow-listed free values questions; no duplicates; no more than the free counts.
// 2. No built file mentions a Part 2, 3 or 4 question id, except the allow-listed values ids.
import { readFile } from 'node:fs/promises';
import { existsSync } from 'node:fs';
import { join } from 'node:path';
import { ROOT, builtFiles, ok, fail } from './lib.mjs';

const DATA = join(ROOT, 'src', 'data', 'au');
const QUESTIONS = join(DATA, 'free-questions.json');
const ALLOW = join(DATA, 'free-values-ids.json');
const MAX_PART1 = 125;
const MAX_VALUES = 20;

const problems = [];
const allowIds = existsSync(ALLOW) ? new Set(JSON.parse(await readFile(ALLOW, 'utf8'))) : new Set();
if (allowIds.size > MAX_VALUES) problems.push(`free-values-ids.json has ${allowIds.size} ids; the free tier has ${MAX_VALUES}`);
for (const id of allowIds) if (!/^p4-\d{3}$/.test(id)) problems.push(`free-values-ids.json: "${id}" is not a Part 4 id`);

let counted = 'no question data yet';
if (existsSync(QUESTIONS)) {
  const data = JSON.parse(await readFile(QUESTIONS, 'utf8'));
  const questions = Array.isArray(data) ? data : data.questions;
  if (!Array.isArray(questions)) problems.push('free-questions.json has no questions array');
  else {
    const seen = new Set();
    let part1 = 0, values = 0;
    for (const q of questions) {
      if (seen.has(q.id)) problems.push(`duplicate question id ${q.id}`);
      seen.add(q.id);
      if (/^p1-\d{3}$/.test(q.id) && q.part === 1 && q.isValues === false) part1++;
      else if (allowIds.has(q.id) && q.part === 4 && q.isValues === true) values++;
      else problems.push(`${q.id} (part ${q.part}, isValues ${q.isValues}) is not a free-tier question`);
    }
    if (part1 > MAX_PART1) problems.push(`${part1} Part 1 questions; the free tier has ${MAX_PART1}`);
    if (values > MAX_VALUES) problems.push(`${values} values questions; the free tier has ${MAX_VALUES}`);
    counted = `${part1} Part 1 + ${values} values questions`;
  }
}

const idPattern = /\bp[2-4]-\d{3}\b/g;
let scanned = 0;
for (const { file, rel } of await builtFiles()) {
  if (!/\.(html|js|mjs|json|txt|xml|css|map)$/.test(rel)) continue;
  scanned++;
  const hits = (await readFile(file, 'utf8')).match(idPattern) || [];
  for (const id of new Set(hits)) if (!allowIds.has(id)) problems.push(`dist/${rel} mentions paid question id ${id}`);
}

if (problems.length) fail('free-tier rule broken (docs/rules.md, rule 4)', problems);
ok(`free tier: ${counted}; ${scanned} built files contain no paid question ids`);
