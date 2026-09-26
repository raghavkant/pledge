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
| 2026-09-25 | Home headline: "Get ready for the Australian citizenship test." (plain, has the search words, promises nothing). Title and meta description as in `docs/keywords.md`. |
| 2026-09-25 | Home hero: headline, lead, one gold button ("Take the free practice test") and a "Coming soon to iPhone" badge that is not a link; on the right the gold map, the sparkle, a quiet star field and one floating phone. The whole hero fits the first screen at 1280, 1440 and 1920. |
| 2026-09-25 | Phone screens are labelled frames (brand gradient, the screen's name, a caption and "App screenshot coming at launch") in named slots in `src/assets/screens/`; captions are built from the export. On launch day a real screenshot goes in each slot. |
| 2026-09-25 | "The rule that decides a pass" is the page's big typographic moment: 15 of 20 and 5 of 5 set very large, the values number in ochre (values colour). |
| 2026-09-25 | The numbers section is set as large lines of text (476 practice questions, 33 lessons, 159 flashcards, 94 values questions), not a grid of stat tiles, and says that Premium unlocks all of it. |
| 2026-09-25 | Privacy cards: "No account", "Your progress stays on your phone", "No ads, no tracking", each matching the Privacy Policy; the section says everything works offline except buying Premium and links the policy. |
| 2026-09-25 | Free vs Premium is a table of features only, no prices ("You'll see the price in the App Store before you buy"). Free column from the app's free tier: Part 1 lessons, questions and flashcards, 20 values questions, one full mock, mistakes on free questions. |
| 2026-09-25 | The practice test teaser shows one real free question (p1-001) with its answer, explanation and booklet page, so it is a true sample, not a mock-up. |
| 2026-09-25 | No guides section on the home page yet (guides arrive in Run 3). The 404 page links the practice test instead of the Privacy Policy. |
| 2026-09-25 | The export also records the app's mock-test format (20 questions, 45 minutes) from its `test-config.json`, used in the story captions. |
| 2026-09-25 | `npm run screenshots` scrolls through each page before the full-page capture (needed for Phase 6's scroll effects). |
| 2026-09-25 | Astro's anonymous usage telemetry is turned off in every npm script (`ASTRO_TELEMETRY_DISABLED=1`, as CI already did), so builds send nothing from your machine. (I first blamed it for slow local builds; the real cause was iCloud, see below.) |
| 2026-09-25 | `check:lighthouse` runs the installed `lhci` directly instead of through `npx` (one less layer), stops a run that hangs after 20 minutes instead of waiting forever, and accepts `index` to check only the home page. |
| 2026-09-26 | Root cause of the local hangs in Run 2: this project sits on the iCloud-synced Desktop with "Optimise Mac Storage", and macOS had offloaded over 10,000 of its files (including `node_modules`) to iCloud. Tools stalled while files downloaded, and one failed download broke Lighthouse. Downloading them back could not keep up (the disk is 95% full, so macOS kept offloading), and even `git` stalled. So from Phase 6 on I worked in a fresh clone of the GitHub repo at `~/pledge-work` (outside iCloud) and pushed from there. Your Desktop copy is behind until you run `git pull` in it; see `docs/run-2-summary.md`. Nothing on the live site was affected. |
| 2026-09-26 | Home motion is one orchestrated moment on load: the map draws itself as one gold line (~1.3 s), fills with gold, the sparkle catches the light, the phone rises in and then floats slowly. The headline never animates (it is the LCP). |
| 2026-09-26 | Night to morning: as the hero scrolls away, the sky warms towards dawn and the stars fade (CSS scroll-driven, only in browsers that support it; otherwise it stays still). |
| 2026-09-26 | Desktop pointer depth: the hero phone leans a few degrees towards the pointer and the map shifts slightly the other way (fine pointer and hover only; never on touch or with reduced motion). |
| 2026-09-26 | Scroll story (desktop ≥ 900px, with JavaScript): one sticky phone changes screen (lesson, question, mock result) as each step reaches the middle of the screen; a gold bar marks the step being read. Without JavaScript, and on phones, each step keeps its own phone. |
| 2026-09-26 | The numbers count up once (1.2 s) when first scrolled into view, only if they start below the first screen; screen readers always get the final number; width is reserved so nothing moves. |
| 2026-09-26 | Home page JavaScript is 0.7 KB gzipped (limit 15 KB). With reduced motion everything is shown in its final state. |
| 2026-09-26 | Because this Mac is overloaded tonight (iCloud), local Lighthouse runs hang or score noise (a JavaScript-free page scored 78). From Phase 6, each phase branch is pushed first so GitHub's CI runs every check including Lighthouse (median of 3) on clean machines, with no deploy; only when that is green is it merged into `main`, and the branch is then deleted. All other checks still run locally before the push. |
| 2026-09-26 | `npm run screenshots` waits up to 2 minutes per capture and accepts `index` for the home page only. |
| 2026-09-26 | Run 3 started with a full re-check of every Home Affairs fact (all 54 quotes still present; fees $595/$85 on Form 1298i "Design date 07/26"). `docs/facts.md` now shows 2026-09-26, notes the pages' own "Last updated" dates, and adds newly verified quotes (the interview, other exemptions, photo ID, support during the test, Assisted Test eligibility, breaking the rules). Pages now say "Checked against Home Affairs on 26 September 2026". |
| 2026-09-26 | Guide layout: the answer comes first, in large text in the night hero, with the check date and "General information, not migration advice." under it; then the reading column with Home Affairs quotes set as block quotes, a Sources list, a line pointing to Home Affairs or a registered migration agent (MARA) for personal advice, and "Keep reading" links. On desktop a side column holds "On this page" and the check note. |
| 2026-09-26 | Guides quote Home Affairs word for word for every rule, and never use the word "official" (even though Home Affairs' own sentence about its practice test does; we paraphrase that one out). |
| 2026-09-26 | The Part 2–4 booklet guides (Phase 11) will be written from the booklet itself (text extracted from the Home Affairs PDF), not from the app's lessons, because those lessons are Premium in the app. |
| 2026-09-26 | `docs/run-2-summary.md` is committed with Phase 9 (it was written while Phase 6's checks were running). |
| 2026-09-26 | Test day guide (`/australia/test-day/`): letter and rescheduling, where, what to bring (with the two warnings: no certified copies or photos of ID; no photo ID means a later date), at the centre, the Test Facilitator, the rules, and after the test. |
| 2026-09-26 | FAQ (`/australia/faq/`): nine questions (fee, residence, pass mark, result, after passing, attempts, language, practice test, "Is Pledge endorsed by Home Affairs?"), kept in `src/data/au/faq.ts` for reuse in structured data. The fee is quoted only from Form 1298i ($595, concession $85), never from the conflicting AUD285 block, with "check the current form before you apply". |
| 2026-09-26 | "Is Pledge endorsed by Home Affairs?" answers "No", quotes the Department's statement about paid apps in full, lists the four free Home Affairs resources with the booklet's own line "All of the information you need to sit the Australian citizenship test is in this book.", and then says plainly what Pledge adds and what is free. |
| 2026-09-26 | Booklet guides (`/australia/our-common-bond/` and Parts 1–3) summarise *Our Common Bond* in plain English section by section, each heading with its printed page numbers, written from the booklet PDF (CC BY 4.0, credited in the hero and footer), never from the app's Premium lessons. Each says it is a study summary, not a replacement for the booklet, and links the free PDF. |
| 2026-09-26 | Part 1 has five free practice questions from the export (p1-001, p1-013, p1-026, p1-041, p1-109) with "Show the answer" (works without JavaScript). A component refuses any id that isn't a free Part 1 question. p1-091 was skipped because its wording contains "official". Parts 2 and 3 have no sample questions. |
| 2026-09-26 | The booklet hub quotes the booklet's own line that everything needed for the test is in it and no other package is required, and lists the free Home Affairs resources. |
| 2026-09-26 | Until Phase 12's values page exists, Part 4 on the hub is shown without a link; Phase 12 links it. |
| 2026-09-26 | Values page (`/australia/values-questions/`): the rule quoted from Home Affairs, Part 4's key points with page numbers, and a free drill of all 20 free values questions (random order, answers shuffled, answer and booklet page after each; result says how many to review; no pass rules or timer). It says the test "includes" 5 values questions, as Home Affairs and the booklet do. |
| 2026-09-26 | The practice test and the values drill share one `Quiz` component and one script (a "mode" switch), so both behave the same. The practice test was re-tested end to end after the change (marking, values-only fail, keyboard, focus, timer, no storage, axe in every state): unchanged. |
| 2026-09-26 | The selected answer is now marked by a class set by the script instead of the CSS `:has()` selector, which also makes it work on iPhones older than iOS 15.4. (While testing I briefly thought the live practice test showed a wrong answer in blue; it doesn't: my screenshot was taken one frame too early. Verified on the live site, with and without reduced motion.) |
| 2026-09-26 | **For you to decide:** six free questions from the app use the word "official" in the booklet's own sense (p1-030, p1-038, p1-091 "the official flag", p1-113, p4-069 "official government secrets", p4-075). They appear in the practice test and the values drill word for word from the app. Rule 6 is about never calling Pledge or its content official, so I kept them; the guides' sample questions avoid them. If you'd rather, reword them in the app and re-run the export. |

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
