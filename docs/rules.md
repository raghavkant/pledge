# Rules

**Never break these rules.** If a request conflicts with a rule, say so before doing anything.

## Legal pages

1. **`/privacy/`, `/terms/` and `/support/` must return 200 at every moment**, at exactly these URLs, including while the deploy setup changes. After every deploy, CI fetches them and fails loudly if one isn't 200.
2. **Their text never changes without the owner's approval.** `check:legal` compares the text of each page's `<main>` with `tests/legal-baseline/`. A baseline change goes in the same commit as the approved text change, with a line in `docs/decisions.md`.
3. If a legal URL ever stops returning 200: **roll back first**, then report. In this order:
   1. **Re-run the last good deploy:** Actions → "Site" → the last green run on `main` → "Re-run all jobs" (or `gh run rerun <run-id>`).
   2. **If that isn't enough, switch Pages back to the branch** (the old root files on `main` are the rollback copies). Switching alone does **not** publish anything; the rehearsal on 2026-09-25 showed you must also request a build:
      - `gh api -X PUT repos/raghavkant/pledge/pages -f build_type=legacy -f "source[branch]=main" -f "source[path]=/"`
      - `gh api -X POST repos/raghavkant/pledge/pages/builds`
      - wait about 60 seconds, then check the four URLs.
   3. To go back to Actions later: `gh api -X PUT repos/raghavkant/pledge/pages -f build_type=workflow`, then `gh workflow run site.yml --ref main`.

## Content and honesty

4. **Only free-tier questions:** Part 1 (`p1-*`, not values) plus the 20 free values questions in `src/data/au/free-values-ids.json`. Never the full bank. Enforced by `check:free-tier` (CI) and `check:paid-leak` (local).
5. **Every fact about the real test** (questions, pass mark, time, values rule, booking, fees, eligibility and so on) comes from `docs/facts.md`, which quotes the Home Affairs page, gives its URL and the date it was checked. Pages show "Checked against Home Affairs on <date>" and link the source. Never rely on the app docs or memory. If a fact can't be verified, don't state it.
6. **Never:** "official" (say "the Home Affairs practice test"), "real test questions", a promise of a pass, fake reviews, ratings, user counts, testimonials or press logos, the Coat of Arms, government logos or anything that looks like a government website.
7. Every page shows: "Pledge is an independent study app. It is not affiliated with or endorsed by the Australian Government." and the CC BY credit for *Australian Citizenship: Our Common Bond*.
8. **General information, not migration advice.** No personal eligibility calculators. Point people to Home Affairs or a registered migration agent for their own situation.
9. Numbers about the app's content (questions, lessons, flashcards) come from the export, never typed in by hand.
10. Plain English for readers whose first language may not be English. Answer first. Sources cited. A date on every guide.

## Privacy

11. No cookies, analytics, tracking, third-party requests, third-party fonts or embeds, forms, or browser storage. First-party scripts may run in the browser only if they store and send nothing. Anything else needs the owner's approval and the exact Privacy Policy change.

## Performance and accessibility

12. Lighthouse mobile on every page: performance ≥ 90; accessibility, best practices and SEO ≥ 95. Home page JS ≤ 15 KB gzipped. These are hard limits: cut the idea, not the limit.
13. WCAG 2.2 AA. Respect `prefers-reduced-motion`. Animate only `transform` and `opacity` (the map-draw `stroke-dashoffset` is the one approved exception). No layout shift from animations: reserve space.

## Code and workflow

14. **Never touch the app project** (`~/Developer/citizenship-test`): read-only, no edits, no commits, no `git`. List needed app changes in `docs/app-project-changes.md`.
15. **The deploy URL lives only in `site.config.mjs`.** Every internal link goes through `url()`.
16. **No new packages without asking first** and explaining why.
17. **One branch and one commit per phase.** Merge into `main` and push only when `npm run check:full` passes. Add a line to `docs/progress-log.md`.
18. **Before saying a phase is done:** run the full checks and review the screenshots yourself: every page at 390×844, 1280×800, 1440×900 and 1920×1080, light and dark. Desktop must be designed, never a stretched phone layout.
19. **Background or sub-agents are read-only** (no edits, no commits) unless the owner explicitly says otherwise for that task.
20. **No pricing, Premium strategy or business notes** in this public repo: "see the app project".

## Working with the owner

21. The owner is a beginner: explain what you are doing and why, in plain words.
22. For anything bigger than a small fix, show a plan first and wait for OK (unless the owner has said to run a set of phases without stopping; then log choices under "Decisions for Raghav to review" in `docs/decisions.md`).
23. Record every important decision in `docs/decisions.md` (date + one line).
