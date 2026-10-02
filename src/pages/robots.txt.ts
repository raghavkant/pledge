// robots.txt: every crawler may read every page, including AI crawlers such as GPTBot (docs/decisions.md,
// 2026-09-25). Only possible since domain day, because robots.txt must sit at the domain root.
import { absoluteUrl } from '../lib/url';

export function GET() {
  const body = `User-agent: *
Allow: /

Sitemap: ${absoluteUrl('sitemap.xml')}
`;
  return new Response(body, { headers: { 'content-type': 'text/plain; charset=utf-8' } });
}
