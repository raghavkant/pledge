// npm run export:questions: copies the app's FREE questions and its content counts into src/data/au/.
// Reads the app project READ-ONLY (docs/rules.md, rule 14); never writes there.
// Writes (committed):
//   free-questions.json   Part 1 (not values) + the 20 free values questions, sorted by id
//   free-values-ids.json  the 20 free values ids (the allow-list check:free-tier uses)
//   app-stats.json        content counts for the home page (rule 9: numbers come from the export)
// --check: writes nothing; fails if the committed files differ from what the app project would give now.
import { readFile, writeFile, mkdir } from 'node:fs/promises';
import { existsSync } from 'node:fs';
import { join } from 'node:path';
import { homedir } from 'node:os';
import { ROOT, ok, fail } from './lib.mjs';

const APP = process.env.PLEDGE_APP_DIR || join(homedir(), 'Desktop', 'citizenship test');
const SRC = join(APP, 'content', 'au');
const OUT = join(ROOT, 'src', 'data', 'au');
const check = process.argv.includes('--check');

if (!existsSync(join(SRC, 'questions.json'))) {
  if (check) { ok(`export: check skipped (app project not found at ${APP})`); process.exit(0); }
  fail(`app project not found at ${APP}`);
}

const read = async (name) => JSON.parse(await readFile(join(SRC, name), 'utf8'));
const [bank, freeValues, lessons, flashcards, meta, testConfig] = await Promise.all(
  ['questions.json', 'free-values.json', 'lessons.json', 'flashcards.json', 'meta.json', 'test-config.json'].map(read),
);

const freeValueSet = new Set(freeValues);
const byId = (a, b) => a.id.localeCompare(b.id);
const FIELDS = ['id', 'part', 'topic', 'isValues', 'question', 'options', 'answerIndex', 'explanation', 'source'];
const pick = (q) => Object.fromEntries(FIELDS.map((f) => [f, q[f]]));

const part1 = bank.filter((q) => q.part === 1 && q.isValues === false);
const values = bank.filter((q) => q.isValues === true && freeValueSet.has(q.id));
if (values.length !== freeValues.length) fail(`free-values.json lists ${freeValues.length} ids but ${values.length} match values questions in the bank`);
for (const q of values) if (q.part !== 4) fail(`free values question ${q.id} is not in Part 4`);

const count = (list, test) => list.filter(test).length;
const files = {
  'free-questions.json': {
    contentVersion: meta.contentVersion,
    bookletCheckedDate: meta.bookletCheckedDate,
    questions: [...part1, ...values].sort(byId).map(pick),
  },
  'free-values-ids.json': [...freeValues].sort(),
  'app-stats.json': {
    contentVersion: meta.contentVersion,
    questions: bank.length,
    questionsByPart: Object.fromEntries([1, 2, 3, 4].map((p) => [p, count(bank, (q) => q.part === p)])),
    valuesQuestions: count(bank, (q) => q.isValues === true),
    lessons: lessons.length,
    flashcards: flashcards.length,
    mockTest: {
      questions: testConfig.questionsPerPart.reduce((sum, p) => sum + p.count, 0),
      minutes: testConfig.timeLimitMinutes,
      passMark: testConfig.passMark,
      allValuesMustBeCorrect: testConfig.allValuesMustBeCorrect,
    },
    free: {
      part1Questions: part1.length,
      valuesQuestions: values.length,
      lessons: count(lessons, (l) => l.part === 1),
      flashcards: count(flashcards, (f) => f.part === 1),
    },
  },
};

const text = (data) => JSON.stringify(data, null, 2) + '\n';
if (check) {
  const stale = [];
  for (const [name, data] of Object.entries(files)) {
    const file = join(OUT, name);
    if (!existsSync(file) || (await readFile(file, 'utf8')) !== text(data)) stale.push(`src/data/au/${name}`);
  }
  if (stale.length) fail('the committed export is out of date with the app project: run `npm run export:questions`', stale);
  ok(`export: src/data/au matches the app project (content ${meta.contentVersion})`);
} else {
  await mkdir(OUT, { recursive: true });
  for (const [name, data] of Object.entries(files)) await writeFile(join(OUT, name), text(data));
  ok(`export: ${part1.length} Part 1 + ${values.length} values questions and the content counts written to src/data/au/`);
}
