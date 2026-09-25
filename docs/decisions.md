# Decisions

One line per decision. Newest at the bottom.

## Decisions for Raghav to review

Choices made during a run without stopping to ask. Each is a recommendation; say if you want any changed.

| Date | Decision |
|---|---|
| 2026-09-25 | Run 2 order is 7 → 8 → 5 → 6: the home page's numbers must come from the export (rule 9), and its "Take the free practice test" button must link to a page that exists (the link check fails otherwise). Branch names keep their phase numbers. |
| 2026-09-25 | The export also writes `src/data/au/app-stats.json` (476 questions, 94 values, 33 lessons, 159 flashcards; free: 125 Part 1, 20 values, 8 lessons, 53 flashcards), so the home page never types a number by hand. |
| 2026-09-25 | Exported files are sorted by id and carry no timestamp, so re-running the export with unchanged app content gives identical files. `check:export` (local, in `check:full`) fails if the committed export is out of date. |
| 2026-09-25 | `check:free-tier` now needs the export to exist, with exactly 125 Part 1 and 20 values questions, each with a question, options, a valid answer, an explanation and a booklet source. |
| 2026-09-25 | From Run 2, only `main` is pushed to GitHub; each phase still has its own local branch and one commit, so GitHub keeps no stale branches. |
| 2026-09-25 | Practice test: pick an answer, then press "Check answer" (not instant on tap), so keyboard users can move through the options with the arrow keys without answering by accident. |
| 2026-09-25 | Practice test questions load from a small first-party file (`/australia/practice-test/questions.json`, 12 KB gzipped) as soon as the page opens, so the page itself stays light. |
| 2026-09-25 | In the practice test, when the optional timer runs out, unanswered questions count as not correct. The page says this is how this practice test works, not a rule of the real test. |
| 2026-09-25 | Practice test page: a side column on desktop repeats the pass rules with the Home Affairs check date, and links the free Home Affairs practice test and the booklet PDF. |
| 2026-09-25 | The results screen shows an app card (no price): what is free in the app and that Premium unlocks the rest, with "Coming soon to iPhone". Numbers come from the export. |
| 2026-09-25 | Header navigation now has "Practice test" and "Support". |
| 2026-09-25 | Facts used by pages live in `src/data/au/facts.ts` (check date, Home Affairs links, 20 / 15 / 5 / 45), each tied to `docs/facts.md`. Run 3 extends it. |
| 2026-09-25 | `check:paid-leak` ignores a sentence that is also a free question's text: p4-093 and p4-095 (paid) share their explanation, a booklet quote, with p4-049 and p4-020 (free). Their questions, and any text unique to paid questions, are still checked. |

## Decided

| Date | Decision |
|---|---|
| 2026-09-25 | Legal pages (Privacy, Terms, Support) published on GitHub Pages from this public repo (decided in the app project). |
| 2026-09-25 | Plan approved by the owner. Stack: Astro (static), deployed by GitHub Actions to GitHub Pages. |
| 2026-09-25 | Packages approved: `astro`, `@astrojs/sitemap`; dev: `@astrojs/check`, `typescript`, `playwright`, `@axe-core/playwright`, `@lhci/cli`, `linkinator`. Fonts are copied in as woff2 files (OFL), no font package. |
| 2026-09-25 | This repo is the single source of truth for the legal pages. App-project changes are listed in `docs/app-project-changes.md` for the owner. |
| 2026-09-25 | Privacy Policy §11 wording about first-party scripts approved (Phase 3). |
| 2026-09-25 | Legal pages restyled into the site design with their text unchanged (approved). |
| 2026-09-25 | Map-draw animation may use `stroke-dashoffset` (the one exception to "transform and opacity only"). |
| 2026-09-25 | Home page Direction A, "Night to morning". |
| 2026-09-25 | No waitlist. Once the app passes review, switch to Apple's "Pre-order on the App Store" badge. |
| 2026-09-25 | Domain day happens when the owner's `.app` domain arrives. |
| 2026-09-25 | Every page carries "General information, not migration advice." |
| 2026-09-25 | The Home Affairs "does not endorse paid apps" statement is shown openly on the `/australia/` hub, the About page and the FAQ answer "Is Pledge endorsed by Home Affairs?", each linking the free Home Affairs resources and saying plainly what Pledge adds. Not a home-page section. |
| 2026-09-25 | Phone mockups: a neutral phone frame drawn by us, no Apple device images. Real app screenshots go in the slots once they exist; labelled frames until then. |
| 2026-09-25 | Pricing, Premium strategy and business notes stay out of this public repo ("see the app project"). |
| 2026-09-25 | After domain day, `robots.txt` allows all crawlers, including GPTBot. |
| 2026-09-25 | The owner allowed a throwaway rehearsal repo on their account (not to be deleted by Claude) and the `gh` commands that switch Pages to GitHub Actions. |
| 2026-09-25 | Home page JS ≤ 15 KB gzipped and Lighthouse performance ≥ 90 are hard limits: cut the idea, not the limit. |
| 2026-09-25 | Build in 3 runs: Run 1 = phases 0–4, Run 2 = 5–8, Run 3 = 9–14. Domain day and App Store launch are separate small steps. |
| 2026-09-25 | Desktop is designed, not stretched: wide editorial layouts, full-width hero, desktop-only hover and pointer depth, retina images. Screenshots at 390×844, 1280×800, 1440×900 and 1920×1080, light and dark. |
| 2026-09-25 | Privacy Policy §11 now reads "This website uses no cookies, analytics or tracking. Some pages, such as the free practice test, use small scripts that run only in your browser. They don’t store anything on your device or send anything anywhere. Fonts and images are loaded from this website only." (approved); legal baseline updated in the same commit. |
| 2026-09-25 | (Run 1, approved 2026-09-25) Privacy Policy "Last updated" stays 25 September 2026: the approved §11 change was made the same day. |
| 2026-09-25 | (Run 1, approved 2026-09-25) The rehearsal repo `raghavkant/pledge-pages-rehearsal` is left in branch mode (after the rollback test). It is yours to delete. |
| 2026-09-25 | (Run 1, approved 2026-09-25) Legal pages: their `<main>` text moved word for word into `src/content/legal/*.html`; `Legal.astro` wraps it in the new design. On desktop (≥ 1100px) an "On this page" list repeats the h2 headings; `check:legal` leaves it out of the text comparison and checks it holds only those headings. |
| 2026-09-25 | (Run 1, approved 2026-09-25) Header navigation shows only "Support" for now; links are added as pages arrive (Runs 2–3). |
| 2026-09-25 | (Run 1, approved 2026-09-25) Interim home page (until Run 2): the old home page's text in the new design, plus a "Coming soon to iPhone" pill, "Independent study app. Not affiliated with the Australian Government." and the large app icon; three cards link Support, Privacy and Terms. Title and description unchanged. |
| 2026-09-25 | (Run 1, approved 2026-09-25) Footer on every page: the disclaimer, "General information, not migration advice.", Help and legal links, the support email, the CC BY credit and "© 2026 Raghav Kant". |
| 2026-09-25 | (Run 1, approved 2026-09-25) One layout frame for every page (1320px; 1440px on screens ≥ 1600px), so the logo, titles and text share one left edge. Reading text stops at 42rem (about 68 characters). |
| 2026-09-25 | (Run 1, approved 2026-09-25) The signature of the reading pages is the "dawn horizon": every night hero fades into the page through a low gold glow (CSS only). |
| 2026-09-25 | (Run 1, approved 2026-09-25) CSS is inlined into each page (3.7 KB gzipped): no extra request. Page-to-page transitions use CSS View Transitions (0 KB), off with reduced motion. |
| 2026-09-25 | (Run 1, approved 2026-09-25) Icons are made from the app icon by `scripts/build-icons.mjs` (macOS `sips`, run by hand; outputs committed). The favicon and header mark use a simplified map (2 KB). |
| 2026-09-25 | (Run 1, approved 2026-09-25) The 404 page is `noindex` and has no canonical link. |
| 2026-09-25 | (Run 1, approved 2026-09-25) The old root files (`index.html`, `style.css`, `privacy/`, `terms/`, `support/`) stay on `main` as rollback copies (old design, current text) until a later cleanup, after at least a week of stable Actions deploys. |
| 2026-09-25 | (Run 1, approved 2026-09-25) Lighthouse in CI scores the median of 3 runs after an unscored warm-up (a single cold run gave perf 84 on a plain HTML page). Local runs use 1 run by default. The limits are unchanged. |
