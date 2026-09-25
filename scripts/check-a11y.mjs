// check:a11y: axe (WCAG 2.2 A and AA rules) on every built page, phone and desktop, light and dark.
// Zero violations allowed (docs/rules.md, rule 13).
import { chromium } from 'playwright';
import AxeBuilder from '@axe-core/playwright';
import { builtPages, serve, ok, fail } from './lib.mjs';

const TAGS = ['wcag2a', 'wcag2aa', 'wcag21a', 'wcag21aa', 'wcag22aa', 'best-practice'];
const VIEWPORTS = { phone: { width: 390, height: 844 }, desktop: { width: 1440, height: 900 } };
const only = process.argv.slice(2).filter((a) => !a.startsWith('-'));

const server = await serve();
const pages = (await builtPages()).filter((p) => !only.length || only.some((o) => p.path.startsWith(o)));
const browser = await chromium.launch();
const problems = [];
let runs = 0;
for (const scheme of ['light', 'dark']) {
  for (const [vpName, viewport] of Object.entries(VIEWPORTS)) {
    const context = await browser.newContext({ viewport, colorScheme: scheme, reducedMotion: 'reduce' });
    const page = await context.newPage();
    for (const p of pages) {
      await page.goto(server.base + p.path, { waitUntil: 'load' });
      const { violations } = await new AxeBuilder({ page }).withTags(TAGS).analyze();
      runs++;
      for (const v of violations) {
        const where = v.nodes.slice(0, 3).map((n) => n.target.join(' ')).join(' | ');
        problems.push(`/${p.path} [${vpName}, ${scheme}] ${v.id}: ${v.help} (${where})`);
      }
    }
    await context.close();
  }
}
await browser.close();
server.close();
if (problems.length) fail(`accessibility: ${problems.length} violations`, problems);
ok(`accessibility: ${pages.length} pages × phone/desktop × light/dark, no axe violations (${runs} runs)`);
