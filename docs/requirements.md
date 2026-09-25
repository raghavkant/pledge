# Requirements

## 1. What this site is

- The public website for **Pledge** (App Store name "Pledge: Citizenship Test AU"), an iPhone app for the Australian citizenship test. The app is not on the App Store yet.
- Hosted free on GitHub Pages from this public repo. Today: `https://raghavkant.github.io/pledge/`. Later: a custom `.app` domain (see "Domain day" in `docs/phases.md`).
- Later it will also cover other countries (UK, Canada and so on) under their own folders.

## 2. Goals

1. **Search:** rank on Google, Bing and AI search (ChatGPT, Perplexity, Google AI Overviews) for Australian citizenship test searches, starting with long-tail questions we can realistically win (`docs/keywords.md`).
2. **Conversion:** turn visitors into app downloads and Premium subscribers, honestly.
3. **Feel:** more premium than the app, like an Apple product page, while still loading fast.

## 3. Pages and URLs

Trailing slash on every URL. Countries live in their own folder.

| URL | Page | Built in |
|---|---|---|
| `/` | Home: the Pledge app page (Direction A "Night to morning") | Run 2 |
| `/privacy/`, `/terms/`, `/support/` | Legal pages. **URLs and text never change without approval.** | exist; restyled in Run 1 |
| `/404.html` | Page not found | Run 1 |
| `/australia/practice-test/` | Free 20-question practice test | Run 2 |
| `/australia/` | Hub: how the test works, links to every guide, free Home Affairs resources | Run 3 |
| `/australia/test-format/`, `/test-day/`, `/failed-citizenship-test/`, `/who-sits-the-test/`, `/faq/` | Guides | Run 3 |
| `/australia/values-questions/` | Values rule, Part 4, free values drill | Run 3 |
| `/australia/our-common-bond/` and `/part-1/`, `/part-2/`, `/part-3/` | Booklet guides (sample questions on Part 1 only) | Run 3 |
| `/about/` | Who makes Pledge and how facts are checked | Run 3 |

Titles, meta descriptions and search targets for each page: `docs/keywords.md`.

## 4. The free practice test

- 20 questions: 15 from Part 1 and 5 from the fixed set of 20 free values questions, shuffled, options shuffled.
- The page says plainly that the real test covers all four parts.
- Marked with the real pass rules from `docs/facts.md`: at least 15 of 20 **and** all 5 values questions right.
- App-style feedback: green pulse when right, gentle shake when wrong, explanation with the booklet reference, score count-up on results. Reduced motion: no pulse, no shake.
- Optional timer, off by default, with pause (WCAG 2.2.1).
- No storage: a reload starts a new test.
- Questions are exported read-only from the app project into `src/data/au/free-questions.json` (committed).

## 5. Privacy

- No cookies, analytics, tracking, third-party requests or browser storage (`localStorage`, `sessionStorage`, IndexedDB).
- First-party scripts are allowed (Privacy Policy §11, approved 2026-09-25): they run only in the browser, store nothing and send nothing.
- Fonts and images are served from this site only.

## 6. Performance, accessibility and quality (hard limits)

| Limit | Value |
|---|---|
| Lighthouse mobile, every page | Performance ≥ 90; Accessibility, Best practices, SEO ≥ 95 |
| Layout shift (CLS) | ≤ 0.05; no shift from animations |
| Home page JS | ≤ 15 KB gzipped (hard limit) |
| CSS per page | ≤ 30 KB gzipped |
| Fonts | Fraunces 600 + Manrope variable, Latin, self-hosted (≈ 43 KB) |
| Accessibility | WCAG 2.2 AA; axe: zero violations, light and dark |
| Motion | Only `transform` and `opacity` (one approved exception: the map-draw `stroke-dashoffset`); respects `prefers-reduced-motion`; heavy motion loads after the text |

If an idea breaks a limit, cut the idea, not the limit.

## 7. Desktop is designed, not stretched (owner, 2026-09-25)

The site must look just as premium on desktop as on mobile. It is never a stretched phone layout.

- Wide editorial layouts with generous whitespace.
- A large cinematic hero that uses the full width: the map and the floating phones side by side with the headline.
- Multi-column sections where they help; a maximum content width for reading.
- Hover states and subtle pointer-based depth on desktop only (fine pointer + hover capable), never on touch.
- Sharp images on retina screens (2× sources, SVG where possible).
- Every page is checked at **390×844 (phone), 1280×800, 1440×900 and 1920×1080**, in **light and dark**, and those screenshots are reviewed before a phase is called done (`npm run screenshots`).

## 8. Out of scope

Accounts, forms, waitlists, comments, analytics, ads, cookies, third-party embeds, a question bank beyond the free tier, personal eligibility calculators or any migration advice.

## 9. Money

Pricing, Premium strategy and business notes are not kept in this public repo: see the app project.
