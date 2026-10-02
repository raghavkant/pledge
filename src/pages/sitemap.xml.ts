// sitemap.xml for search engines (submit it in Google Search Console and Bing Webmaster Tools).
// Built from the page files, so every new page is included; 404 and redirect pages are left out.
import { absoluteUrl } from '../lib/url';
import { CHECKED } from '../data/au/facts';

const files = Object.keys(import.meta.glob('./**/*.astro'));
/** Pages that only redirect elsewhere (see the page's own comment). */
const REDIRECTS = ['australia/practice-test/'];
/** lastmod: the legal pages' own "Last updated" date; every other page changes with the fact check. */
const LEGAL_UPDATED = '2026-09-25';
const LEGAL = ['privacy/', 'terms/', 'support/'];

export function GET() {
  const paths = files
    .map((f) => f.replace(/^\.\//, '').replace(/index\.astro$/, '').replace(/\.astro$/, '/'))
    .filter((p) => p !== '404/' && !REDIRECTS.includes(p))
    .sort();
  const body = `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
${paths.map((p) => `  <url><loc>${absoluteUrl(p)}</loc><lastmod>${LEGAL.includes(p) ? LEGAL_UPDATED : CHECKED.iso}</lastmod></url>`).join('\n')}
</urlset>
`;
  return new Response(body, { headers: { 'content-type': 'application/xml' } });
}
