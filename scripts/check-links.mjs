// check:links: every internal link, image, stylesheet and script in the built site works when served
// under the real base path (a link that skips the url() helper breaks here).
// `--external` also checks links to other sites, and only warns (Home Affairs blocks some bots).
import { LinkChecker } from 'linkinator';
import { builtPages, serve, ok, fail } from './lib.mjs';

const external = process.argv.includes('--external');
const server = await serve();
const pages = await builtPages();
const checker = new LinkChecker();
const result = await checker.check({
  path: pages.filter((p) => p.path !== '404.html').map((p) => server.base + p.path),
  recurse: true,
  checkCss: true,
  checkFragments: true,
  concurrency: 8,
  timeout: 20000,
  userAgent: 'Mozilla/5.0 (Macintosh; Intel Mac OS X 14_0) AppleWebKit/605.1.15 (KHTML, like Gecko) Version/17.0 Safari/605.1.15',
  linksToSkip: async (link) => link.startsWith('mailto:') || (!external && !link.startsWith(server.origin)),
});
server.close();

const broken = result.links.filter((l) => l.state === 'BROKEN');
const describe = (l) => `${l.url.replace(server.origin, '')} (${l.status || 'no response'}) on ${(l.parent || '').replace(server.origin, '')}`;
if (external) {
  const ext = broken.filter((l) => !l.url.startsWith(server.origin));
  const int = broken.filter((l) => l.url.startsWith(server.origin));
  if (int.length) fail(`${int.length} broken internal links`, int.map(describe));
  if (ext.length) { console.warn(`! ${ext.length} external links need a look:`); for (const l of ext) console.warn(`  - ${describe(l)}`); }
  ok(`links: ${result.links.length} checked including external (${ext.length} warnings)`);
} else {
  if (broken.length) fail(`${broken.length} broken internal links`, broken.map(describe));
  ok(`links: ${result.links.filter((l) => l.state !== 'SKIPPED').length} internal links and assets work under ${new URL(server.base).pathname}`);
}
