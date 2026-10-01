// Run by hand after the 50 practice questions page changes: `npm run build && node scripts/build-pdf.mjs && npm run build`.
// Prints /australia/citizenship-test-questions/ (with every answer open) to an A4 PDF in public/ (committed), and
// records what went into it in src/data/au/fifty-pdf.json. check:free-tier compares that record with the page,
// the export and the fact-check date, so a stale PDF can't ship. Uses Playwright (already a dev dependency).
import { chromium } from 'playwright';
import { writeFile, readFile } from 'node:fs/promises';
import { createHash } from 'node:crypto';
import { join } from 'node:path';
import { ROOT, DEPLOY_URL, serve, ok, fail } from './lib.mjs';

const PAGE = 'australia/citizenship-test-questions/';
const facts = await readFile(join(ROOT, 'src/data/au/facts.ts'), 'utf8');
const checked = facts.match(/CHECKED = \{ iso: '([\d-]+)', label: '([^']+)'/);
const fifty = await readFile(join(ROOT, 'src/data/au/fifty.ts'), 'utf8');
const pdfPath = fifty.match(/FIFTY_PDF = '([^']+)'/)[1];

const server = await serve();
const browser = await chromium.launch();
const page = await browser.newPage();
await page.goto(server.base + PAGE, { waitUntil: 'networkidle' });
await page.emulateMedia({ media: 'print', colorScheme: 'light' });
await page.evaluate(() => { for (const d of document.querySelectorAll('details')) d.open = true; });
await page.evaluate(() => document.fonts.ready);
const ids = await page.$$eval('[data-qid]', (els) => els.map((e) => e.dataset.qid));
if (ids.length !== 50) fail(`expected 50 questions on the page, found ${ids.length}`);
const site = DEPLOY_URL.replace(/^https?:\/\//, '').replace(/\/$/, '');
await page.pdf({
  path: join(ROOT, 'public', pdfPath),
  format: 'A4',
  printBackground: false,
  displayHeaderFooter: true,
  headerTemplate: '<span></span>',
  footerTemplate: `<div style="width:100%;font:8px Arial,sans-serif;color:#555;padding:0 14mm;display:flex;justify-content:space-between"><span>Pledge: 50 free practice questions, not questions from the real test. ${site}</span><span><span class="pageNumber"></span> of <span class="totalPages"></span></span></div>`,
  margin: { top: '14mm', bottom: '16mm', left: '14mm', right: '14mm' },
});
await browser.close();
server.close();

// What the PDF contains: the ids, a hash of their text in the export, and the fact-check date on it.
const { questions } = JSON.parse(await readFile(join(ROOT, 'src/data/au/free-questions.json'), 'utf8'));
const content = ids.map((id) => JSON.stringify(questions.find((q) => q.id === id)));
const record = { pdf: pdfPath, ids, contentHash: createHash('sha256').update(content.join('\n')).digest('hex'), checked: checked[1] };
await writeFile(join(ROOT, 'src/data/au/fifty-pdf.json'), JSON.stringify(record, null, 2) + '\n');
ok(`pdf: ${pdfPath} (${ids.length} questions, facts checked ${checked[2]}); run \`npm run build\` again to publish it`);
