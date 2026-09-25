// Shared helpers for the check scripts. Output rule: print one line on success, details only on failure.
import { createServer } from 'node:http';
import { readFile, readdir, stat } from 'node:fs/promises';
import { existsSync } from 'node:fs';
import { join, extname, relative, sep } from 'node:path';
import { fileURLToPath } from 'node:url';
import { BASE, DEPLOY_URL } from '../site.config.mjs';

export const ROOT = fileURLToPath(new URL('..', import.meta.url));
export const DIST = join(ROOT, 'dist');
export { BASE, DEPLOY_URL };

/** Every built HTML file, as { file, path } where path is the URL path under BASE (e.g. "privacy/"). */
export async function builtPages() {
  if (!existsSync(DIST)) fail('dist/ is missing: run `npm run build` first.');
  const out = [];
  async function walk(dir) {
    for (const name of await readdir(dir)) {
      const full = join(dir, name);
      if ((await stat(full)).isDirectory()) await walk(full);
      else if (name.endsWith('.html')) {
        const rel = relative(DIST, full).split(sep).join('/');
        const path = rel === 'index.html' ? '' : rel.endsWith('/index.html') ? rel.slice(0, -'index.html'.length) : rel;
        out.push({ file: full, path });
      }
    }
  }
  await walk(DIST);
  return out.sort((a, b) => a.path.localeCompare(b.path));
}

/** Every built file (any type), with its path relative to dist/. */
export async function builtFiles() {
  const out = [];
  async function walk(dir) {
    for (const name of await readdir(dir)) {
      const full = join(dir, name);
      if ((await stat(full)).isDirectory()) await walk(full);
      else out.push({ file: full, rel: relative(DIST, full).split(sep).join('/') });
    }
  }
  await walk(DIST);
  return out;
}

const TYPES = {
  '.html': 'text/html; charset=utf-8', '.css': 'text/css', '.js': 'text/javascript', '.mjs': 'text/javascript',
  '.json': 'application/json', '.svg': 'image/svg+xml', '.png': 'image/png', '.ico': 'image/x-icon',
  '.webp': 'image/webp', '.avif': 'image/avif', '.woff2': 'font/woff2', '.xml': 'application/xml',
  '.txt': 'text/plain', '.webmanifest': 'application/manifest+json',
};

/** Serves dist/ under BASE like GitHub Pages does (dir → index.html, missing → 404.html with status 404). */
export function serve(port = 0) {
  const server = createServer(async (req, res) => {
    const url = new URL(req.url, 'http://x');
    let p = decodeURIComponent(url.pathname);
    if (!p.startsWith(BASE)) {
      if (p + '/' === BASE) { res.writeHead(301, { location: BASE }); return res.end(); }
      return send404(res);
    }
    p = p.slice(BASE.length);
    let file = join(DIST, p);
    if (!file.startsWith(DIST)) return send404(res);
    if (existsSync(file) && (await stat(file)).isDirectory()) {
      if (!p.endsWith('/') && p !== '') { res.writeHead(301, { location: url.pathname + '/' }); return res.end(); }
      file = join(file, 'index.html');
    }
    if (!existsSync(file)) return send404(res);
    res.writeHead(200, { 'content-type': TYPES[extname(file)] || 'application/octet-stream' });
    res.end(await readFile(file));
  });
  async function send404(res) {
    const page = join(DIST, '404.html');
    res.writeHead(404, { 'content-type': 'text/html; charset=utf-8' });
    res.end(existsSync(page) ? await readFile(page) : 'Not found');
  }
  return new Promise((resolve) => {
    server.listen(port, '127.0.0.1', () => {
      const { port: actual } = server.address();
      resolve({ origin: `http://127.0.0.1:${actual}`, base: `http://127.0.0.1:${actual}${BASE}`, close: () => server.close() });
    });
  });
}

/** Visible text of an HTML fragment: tags removed, entities decoded, whitespace collapsed. */
export function textOf(html) {
  return html
    .replace(/<(script|style|noscript)[\s\S]*?<\/\1>/gi, ' ')
    .replace(/<\/?(?:a|em|strong|b|i|span|abbr|cite|code|small|sup|sub|time|mark|q)\b[^>]*>/gi, '')
    .replace(/<[^>]+>/g, ' ')
    .replace(/&nbsp;/g, ' ').replace(/&amp;/g, '&').replace(/&lt;/g, '<').replace(/&gt;/g, '>')
    .replace(/&quot;/g, '"').replace(/&#39;|&#x27;|&apos;/g, "'")
    .replace(/&#(\d+);/g, (_, n) => String.fromCodePoint(+n))
    .replace(/\s+/g, ' ')
    .trim();
}

export function ok(msg) { console.log(`✓ ${msg}`); }
export function fail(msg, details = []) {
  console.error(`✗ ${msg}`);
  for (const d of details) console.error(`  - ${d}`);
  process.exit(1);
}
