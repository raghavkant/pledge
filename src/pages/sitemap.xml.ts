// sitemap.xml for search engines (submit it in Google Search Console and Bing Webmaster Tools).
// Built from the page files, so every new page is included; 404 is left out.
import { absoluteUrl } from '../lib/url';

const files = Object.keys(import.meta.glob('./**/*.astro'));

export function GET() {
  const paths = files
    .map((f) => f.replace(/^\.\//, '').replace(/index\.astro$/, '').replace(/\.astro$/, '/'))
    .filter((p) => p !== '404/')
    .sort();
  const body = `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
${paths.map((p) => `  <url><loc>${absoluteUrl(p)}</loc></url>`).join('\n')}
</urlset>
`;
  return new Response(body, { headers: { 'content-type': 'application/xml' } });
}
