// check:free-tier: only the app's free questions may appear on this public site (docs/rules.md, rule 4).
// 1. src/data/au/free-questions.json (from `npm run export:questions`) must exist and hold exactly the free tier:
//    125 Part 1 questions (p1-NNN, not values) and the 20 allow-listed values questions, each well formed.
// 2. The allow-list (free-values-ids.json) is exactly the values questions in the export.
// 3. No built file mentions a Part 2, 3 or 4 question id, except the allow-listed values ids.
import { readFile } from 'node:fs/promises';
import { existsSync } from 'node:fs';
import { join } from 'node:path';
import { ROOT, builtFiles, ok, fail } from './lib.mjs';

const DATA = join(ROOT, 'src', 'data', 'au');
const QUESTIONS = join(DATA, 'free-questions.json');
const ALLOW = join(DATA, 'free-values-ids.json');
const STATS = join(DATA, 'app-stats.json');
const PART1 = 125;
const VALUES = 20;

for (const f of [QUESTIONS, ALLOW, STATS]) if (!existsSync(f)) fail(`${f.slice(ROOT.length)} is missing: run \`npm run export:questions\``);

const problems = [];
const allowIds = new Set(JSON.parse(await readFile(ALLOW, 'utf8')));
if (allowIds.size !== VALUES) problems.push(`free-values-ids.json has ${allowIds.size} ids; the free tier has exactly ${VALUES}`);
for (const id of allowIds) if (!/^p4-\d{3}$/.test(id)) problems.push(`free-values-ids.json: "${id}" is not a Part 4 id`);

const { questions } = JSON.parse(await readFile(QUESTIONS, 'utf8'));
const seen = new Set();
const valuesSeen = new Set();
let part1 = 0;
for (const q of Array.isArray(questions) ? questions : []) {
  if (seen.has(q.id)) problems.push(`duplicate question id ${q.id}`);
  seen.add(q.id);
  if (/^p1-\d{3}$/.test(q.id) && q.part === 1 && q.isValues === false) part1++;
  else if (allowIds.has(q.id) && q.part === 4 && q.isValues === true) valuesSeen.add(q.id);
  else problems.push(`${q.id} (part ${q.part}, isValues ${q.isValues}) is not a free-tier question`);
  const wellFormed = typeof q.question === 'string' && q.question && Array.isArray(q.options) && q.options.length >= 2
    && q.options.every((o) => typeof o === 'string' && o) && Number.isInteger(q.answerIndex)
    && q.answerIndex >= 0 && q.answerIndex < q.options.length && typeof q.explanation === 'string' && typeof q.source === 'string';
  if (!wellFormed) problems.push(`${q.id} is missing its question, options, answer, explanation or source`);
}
if (!Array.isArray(questions)) problems.push('free-questions.json has no questions array');
if (part1 !== PART1) problems.push(`${part1} Part 1 questions; the free tier has exactly ${PART1}`);
if (valuesSeen.size !== VALUES) problems.push(`${valuesSeen.size} values questions; the free tier has exactly ${VALUES}`);
for (const id of allowIds) if (!valuesSeen.has(id)) problems.push(`allow-listed ${id} is not in free-questions.json`);

const stats = JSON.parse(await readFile(STATS, 'utf8'));
if (stats.free?.part1Questions !== part1 || stats.free?.valuesQuestions !== valuesSeen.size) problems.push('app-stats.json free counts disagree with free-questions.json');
const counted = `${part1} Part 1 + ${valuesSeen.size} values questions`;

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
