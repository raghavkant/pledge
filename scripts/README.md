# Checks

Each check prints one line when it passes and details only when it fails.

| Command | What it checks | Where it runs |
|---|---|---|
| `npm run check` | Build, free tier (exactly 125 Part 1 + the 20 free values questions, well formed; no paid ids in the build), legal text. Quick: run it while working. | local, CI |
| `npm run check:types` | `astro check` (TypeScript) | local, CI |
| `npm run check:budgets` | Gzipped JS and CSS per page (home JS ≤ 15 KB) | local, CI |
| `npm run check:links` | Every internal link and asset, served under the real base path | local, CI |
| `npm run check:a11y` | axe, WCAG 2.2 A/AA, every page, phone + desktop, light + dark | local, CI |
| `npm run check:lighthouse` | Lighthouse mobile, every page: perf ≥ 90, a11y/bp/SEO ≥ 95, CLS ≤ 0.05 | local, CI |
| `npm run check:export` | The committed `src/data/au/` export still matches the app project (reads it read-only) | local only |
| `npm run check:paid-leak` | No paid question's text in the build (reads the app project read-only) | local only |
| `npm run screenshots` | Every page at 390×844, 1280×800, 1440×900, 1920×1080, light + dark → `screenshots/` | local |
| `npm run check:ci` | Everything CI runs | local, CI |
| `npm run check:full` | `check:ci` + export + paid-leak + screenshots. Run once before each commit. | local |

Page-limited runs while working (`index` = the home page only): `node scripts/check-a11y.mjs privacy/`, `node scripts/check-lighthouse.mjs --verbose privacy/`, `node scripts/screenshots.mjs privacy/`.

Legal text baseline: `node scripts/check-legal.mjs --update` rewrites `tests/legal-baseline/`. Only for a text change the owner approved, recorded in `docs/decisions.md`.

Question export: `npm run export:questions` reads the app project **read-only** and writes `src/data/au/free-questions.json` (Part 1 + the 20 free values questions), `free-values-ids.json` (the allow-list) and `app-stats.json` (content counts for the home page). Run it when the app's content changes, then commit the three files.

Share images: after adding or renaming a page, run `npm run build && node scripts/build-og.mjs`, then commit `public/og/`.
