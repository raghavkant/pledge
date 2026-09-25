# CLAUDE.md

## Project

The public website for **Pledge**, an iPhone app that helps people prepare for the Australian citizenship test. This repo (`raghavkant/pledge`, **public**) is served by GitHub Pages at `https://raghavkant.github.io/pledge/`. It is:

- the marketing site (home page, free practice test, plain-English guides under `/australia/`, room for `/uk/` and others later), and
- the **single source of truth** for the app's legal pages: `/privacy/`, `/terms/` and `/support/`. The app links to these URLs; they must return 200 at every moment.

Built with Astro (static output), deployed by GitHub Actions. The app project lives at `~/Desktop/citizenship test` and is **read-only** for this repo.

## Before any task

Read `docs/requirements.md`, `docs/rules.md`, `docs/design.md`, `docs/phases.md` and `docs/facts.md`. Never contradict them. If a request conflicts with them, say so before doing anything. Check `docs/phases.md` and `docs/progress-log.md` to see where the work is.

## The 5 most important rules

(Full list in `docs/rules.md`.)

1. **Legal URLs are sacred.** `/privacy/`, `/terms/` and `/support/` keep their URLs and their text (checked by `check:legal`). Text changes need the owner's approval, logged in `docs/decisions.md`.
2. **Free tier only.** Only the app's free questions may appear here: Part 1 plus the 20 free values questions. Never the full bank (checked by `check:free-tier` and `check:paid-leak`).
3. **Honest and verified.** Every fact about the real test comes from `docs/facts.md` (Home Affairs quote, URL, date checked). Not affiliated with the Australian Government; no pass guarantees; never the word "official"; no fake reviews, ratings, counts or logos. Never looks like a government site.
4. **Privacy.** No cookies, analytics, tracking, third-party requests or browser storage. Anything that would change this needs the owner's approval and the exact Privacy Policy change.
5. **Performance and accessibility are hard limits.** Lighthouse mobile: performance ≥ 90, accessibility, best practices and SEO ≥ 95, on every page. Home page JS ≤ 15 KB gzipped. WCAG 2.2 AA. Respect `prefers-reduced-motion`. If an idea breaks a limit, cut the idea, not the limit.

## Working rules

- **Plan first** on anything big. Small commits. **Verify before claiming** something is done.
- Run only the relevant checks while working (`npm run check`), then the full set once before each commit (`npm run check:full`).
- Keep command output quiet and show only failures.
- Background or sub-agents are **read-only** unless the owner says otherwise for that task, and **never commit**.
- **Never touch the app project** (`~/Desktop/citizenship test`): no edits, no commits, no `git` there. The only access is reading, by `npm run export:questions` and `check:paid-leak`. Changes the app needs go in `docs/app-project-changes.md` for the owner.
- One branch per phase (`phase-N-name`), one commit per phase; merge into `main` and push only when the checks pass.
- After each phase, add a line to `docs/progress-log.md`.
- Every internal link goes through the `url()` helper (`src/lib/url.ts`); the deploy URL lives only in `site.config.mjs`.
- No new packages without asking first and explaining why.
- Before saying a phase is done, look at its screenshots (`npm run screenshots`) yourself.
- Pricing, Premium strategy and business notes stay out of this public repo: write "see the app project".
- The owner is a beginner: explain what you do and why, in plain words.
- Record every important decision in `docs/decisions.md` (date + one line).
