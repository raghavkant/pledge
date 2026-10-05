# Phases

**Current:** SEO sprint (phases 15–20) finished and published 2026-10-02. Domain day done 2026-10-02. Then waiting for the owner: Search Console and Bing for the new domain, the app project's URL changes, App Store launch (to-do list in `docs/seo-sprint-report.md`). See `docs/progress-log.md` for the latest step.

The owner prefers **fewer, longer runs** (2026-09-25). Each phase inside a run still gets its own branch (`phase-N-name`) and one commit, merged into `main` and pushed only when `npm run check:full` passes, with a line in `docs/progress-log.md`. Inside a run, don't stop to ask: pick the recommendation and log it under "Decisions for the owner to review" in `docs/decisions.md`. The only reason to stop early is a legal URL (`/privacy/`, `/terms/`, `/support/`) not returning 200: roll back, then stop and report.

Every phase ends with something the owner can open, and with screenshots reviewed at 390×844, 1280×800, 1440×900 and 1920×1080, light and dark.

---

## Run 1: foundations (phases 0–4)

- [x] **Phase 0. Docs.** `CLAUDE.md` and `docs/` (requirements, rules, design, phases, decisions, facts, keywords, app-project-changes, progress-log). *Visible:* the docs on GitHub.
- [x] **Phase 1. Deploy with GitHub Actions.** Rehearse the switch on a throwaway repo with a `curl` loop. Add Astro; the first build outputs today's site byte for byte (`public/`); keep the old root files on `main` as the rollback. Workflow builds on every push; deploys when started by hand or once the repo variable `PAGES_ACTIONS=true` is set. Switch Pages to Actions, deploy at once, confirm the legal pages byte for byte, then set the variable. *Visible:* the same site, deployed by Actions.
- [x] **Phase 2. Quality tools.** `npm run check` / `check:full`: build, `check:legal` (text baseline), `check:free-tier`, `check:paid-leak` (local), internal links, axe (light + dark), Lighthouse mobile, budgets, screenshots at 4 sizes × light/dark. CI runs them; after every deploy CI fetches the four URLs. *Visible:* screenshots and a Lighthouse report.
- [x] **Phase 3. Privacy wording.** The approved §11 sentence about first-party scripts, in the built page and the rollback copy; baseline updated; app-project change list updated. *Visible:* the updated Privacy page.
- [x] **Phase 4. Design system.** Tokens, self-hosted fonts, layout with header and footer (disclaimer, CC BY, "General information, not migration advice."), `url()` helper, `site.config.mjs`, 404, favicon and manifest, desktop editorial layout; legal pages and the interim home page moved into the new layout with their text unchanged. *Visible:* restyled legal pages and the 404 page, on phone and desktop.

## Run 2: home page and practice test (phases 5–8)

- [x] **Phase 5. Home page, static.** All sections, labelled phone frames, calls to action ("Take the free practice test", "Coming soon to iPhone"); full-width desktop hero with the map and phones beside the headline.
- [x] **Phase 6. Home page motion.** Map draw, sparkle, floating phones, desktop pointer depth, scroll story, count-up, view transitions, reduced motion. Home JS ≤ 15 KB.
- [x] **Phase 7. Question export and free-tier checks.** `npm run export:questions` (read-only from the app project), committed JSON and allow-list, checks tightened.
- [x] **Phase 8. Practice test page.** Quiz, feedback motion, optional timer, results with both pass rules, app card; keyboard and screen reader tested.

## Run 3: guides and SEO (phases 9–14)

- [x] **Phase 9.** Guide template (desktop editorial layout), facts data, and 3 early-win guides: failed test, who sits the test, test format.
- [x] **Phase 10.** Test day and FAQ (including "Is Pledge endorsed by Home Affairs?"), facts re-checked first.
- [x] **Phase 11.** Our Common Bond hub and Parts 1–3 (sample questions on Part 1 only).
- [x] **Phase 12.** Values questions page with the free values drill.
- [x] **Phase 13.** `/australia/` hub (with the Home Affairs statement and free resources), About page, structured data, sitemap, Open Graph images, internal linking.
- [x] **Phase 14.** Full audit; the owner sets up Search Console and Bing.

## SEO sprint (phases 15–20, October 2026)

Research, target map and decisions: `docs/seo-sprint.md`; summary and the owner's to-do list: `docs/seo-sprint-report.md`.

- [x] **Phase 15.** Research: Australian results pages, why #3 ranks, one main search per page; facts re-checked.
- [x] **Phase 16.** The free practice test in the home page hero; `/australia/practice-test/` redirects there.
- [x] **Phase 17.** `/australia/citizenship-test-questions/`: 50 free-tier practice questions and a printable PDF.
- [x] **Phase 18.** `/australia/book-citizenship-test/`.
- [x] **Phase 19.** Long-tail pages answer-first, `/australia/is-the-citizenship-test-hard/`, 2026 titles, the January check.
- [x] **Phase 20.** Trust: `/about/how-we-check-facts/`, author byline, practice-test box on guides, share images.

## Separate small steps

- [x] **Domain day** (2026-10-02): `https://pledgecitizenship.com/` (Hostinger DNS, verified on GitHub, HTTPS enforced); every `github.io/pledge/*` URL 301s to the same path; `robots.txt` allows all crawlers with the sitemap. Not rehearsed (owner's decision). Still for the owner: Search Console and Bing for the new domain, and the app project changes (`docs/app-project-changes.md`).
- [x] **Real screenshots in the phone slots** (2026-10-05): the 4 named slots (`mock-test`, `lesson`, `question`, `mock-result`) now hold real App Store screenshots from the app project, rendered through Astro's image pipeline (AVIF/WebP, 1x/2x, no layout shift). Only `lesson`, `question` and `mock-result` are shown on the home page today.
- [ ] **App Store pre-order** (once the app passes review): Apple's "Pre-order on the App Store" badge.
- [ ] **App Store launch:** "Download on the App Store" badge, Smart App Banner, `MobileApplication` structured data.

## Later

Citizenship Pledge page (wording checked on legislation.gov.au first), more free practice sets, removing the old root rollback files, remove the github.io redirect check once the app ships with pledgecitizenship.com links, UK and other countries.
