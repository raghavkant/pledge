// One-off, local (macOS): builds the site's icons from the app icon. Outputs are committed.
// Reads the app project READ-ONLY: assets/brand/pledge-icon.svg and pledge-icon-1024.png.
//   node scripts/build-icons.mjs
// Writes: public/favicon.svg, public/favicon.ico, public/mark.svg, public/apple-touch-icon.png,
//         public/icon-192.png, public/icon-512.png, src/lib/brand-paths.json (map + sparkle paths).
import { readFileSync, writeFileSync, mkdtempSync } from 'node:fs';
import { execFileSync } from 'node:child_process';
import { join } from 'node:path';
import { homedir, tmpdir } from 'node:os';
import { ROOT } from './lib.mjs';

const APP = process.env.PLEDGE_APP_DIR || join(homedir(), 'Desktop', 'citizenship test');
const svg = readFileSync(join(APP, 'assets', 'brand', 'pledge-icon.svg'), 'utf8');
const png1024 = join(APP, 'assets', 'brand', 'pledge-icon-1024.png');
const out = (p) => join(ROOT, p);

// The map: two outlines (mainland, Tasmania) of straight segments on a 1024 grid.
const d = svg.match(/<path d="([^"]{1000,})"/)[1];
const rings = d.split(/(?=M)/).map((part) =>
  [...part.matchAll(/(-?\d+(?:\.\d+)?),(-?\d+(?:\.\d+)?)/g)].map((m) => [+m[1], +m[2]]));
const sparkle = svg.match(/<path d="(M806[^"]+)"/)[1];

// Ramer–Douglas–Peucker simplification.
function simplify(pts, tol) {
  if (pts.length < 3) return pts;
  const [a, b] = [pts[0], pts[pts.length - 1]];
  let max = 0, idx = 0;
  for (let i = 1; i < pts.length - 1; i++) {
    const [x, y] = pts[i];
    const dx = b[0] - a[0], dy = b[1] - a[1];
    const len = Math.hypot(dx, dy);
    // A closed outline starts and ends on the same point: measure from that point instead.
    const dist = len === 0 ? Math.hypot(x - a[0], y - a[1]) : Math.abs(dy * x - dx * y + b[0] * a[1] - b[1] * a[0]) / len;
    if (dist > max) { max = dist; idx = i; }
  }
  if (max <= tol) return [a, b];
  return [...simplify(pts.slice(0, idx + 1), tol).slice(0, -1), ...simplify(pts.slice(idx), tol)];
}
const pathOf = (tol, digits = 0) => rings
  .map((r) => simplify(r, tol))
  .map((r) => 'M' + r.map(([x, y]) => `${x.toFixed(digits)} ${y.toFixed(digits)}`).join('L') + 'Z')
  .join('');

const mapFine = pathOf(0.9, 1);  // hero drawing (Run 2): smooth at 700px wide
const mapSmall = pathOf(3.2);    // favicon and header mark
const sparklePath = sparkle.replace(/\.0\b/g, '').replace(/ L/g, 'L').replace(/ Z/, 'Z');

writeFileSync(out('src/lib/brand-paths.json'), JSON.stringify({
  viewBox: '0 0 1024 1024', map: mapFine, mapSmall, sparkle: sparklePath,
  source: 'App icon (owner artwork); map outline from Natural Earth (public domain).',
}, null, 2) + '\n');

const gradients = `<defs><linearGradient id="n" x1="0" y1="0" x2="0" y2="1"><stop offset="0" stop-color="#0E1650"/><stop offset="1" stop-color="#2743D6"/></linearGradient><linearGradient id="g" x1="0" y1="0" x2="0" y2="1"><stop offset="0" stop-color="#F7D38E"/><stop offset="1" stop-color="#E9AE4E"/></linearGradient></defs>`;
writeFileSync(out('public/favicon.svg'),
  `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 1024 1024">${gradients}<rect width="1024" height="1024" rx="224" fill="url(#n)"/><path d="${mapSmall}" fill="url(#g)"/><path d="${sparklePath}" fill="#F6F4EF"/></svg>\n`);
// The header mark: map + sparkle only (it sits on the night band), cropped to the drawing.
writeFileSync(out('public/mark.svg'),
  `<svg xmlns="http://www.w3.org/2000/svg" viewBox="96 104 812 816">${gradients}<path d="${mapSmall}" fill="url(#g)"/><path d="${sparklePath}" fill="#F6F4EF"/></svg>\n`);

// A large, retina-sharp copy of the app icon for pages (fine map outline, soft shadow as in the app icon).
writeFileSync(out('public/icon-large.svg'),
  `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 1024 1024">${gradients.replace('</defs>', '<filter id="s" x="-20%" y="-20%" width="140%" height="140%"><feDropShadow dx="0" dy="14" stdDeviation="18" flood-color="#0B1447" flood-opacity=".35"/></filter></defs>')}<rect width="1024" height="1024" fill="url(#n)"/><path d="${mapFine}" fill="url(#g)" filter="url(#s)"/><path d="${sparklePath}" fill="#F6F4EF" filter="url(#s)"/></svg>\n`);

// PNG sizes from the 1024 PNG with macOS `sips`, and a 32px favicon.ico (an ICO holding one PNG).
const tmp = mkdtempSync(join(tmpdir(), 'pledge-icons-'));
const resize = (size, dest) => execFileSync('sips', ['-z', String(size), String(size), png1024, '--out', dest], { stdio: 'ignore' });
resize(180, out('public/apple-touch-icon.png'));
resize(192, out('public/icon-192.png'));
resize(512, out('public/icon-512.png'));
resize(32, join(tmp, 'f32.png'));
const png = readFileSync(join(tmp, 'f32.png'));
const header = Buffer.alloc(22);
header.writeUInt16LE(0, 0); header.writeUInt16LE(1, 2); header.writeUInt16LE(1, 4);
header.writeUInt8(32, 6); header.writeUInt8(32, 7); header.writeUInt8(0, 8); header.writeUInt8(0, 9);
header.writeUInt16LE(1, 10); header.writeUInt16LE(32, 12); header.writeUInt32LE(png.length, 14); header.writeUInt32LE(22, 18);
writeFileSync(out('public/favicon.ico'), Buffer.concat([header, png]));

console.log(`✓ icons: map ${rings.map((r) => r.length).join('+')} points → hero ${mapFine.length} chars, small ${mapSmall.length} chars`);
