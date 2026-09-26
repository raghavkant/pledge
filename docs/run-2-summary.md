# Run 2 summary: home page and practice test (phases 5–8)

Finished 2026-09-26. Everything below is live at <https://raghavkant.github.io/pledge/>, deployed by GitHub Actions after every check passed. `/privacy/`, `/terms/` and `/support/` returned 200 after every deploy, with their text unchanged.

## What's live

| Phase | Commit | What |
|---|---|---|
| 7. Question export | `bd11041` | `npm run export:questions` copies the app's free questions (125 Part 1 + the 20 free values questions) and its content counts into `src/data/au/`, reading the app project read-only. `check:free-tier` now needs exact counts and well-formed questions; `check:export` catches a stale export. Your Run 1 decisions moved to "Decided"; the merged `phase-*` branches were deleted on GitHub. |
| 8. Practice test | `b3de258` | `/australia/practice-test/`: 20 questions (15 Part 1 + 5 values, shuffled, answers shuffled). Pick an answer, press "Check answer", see right or wrong with the explanation and the booklet page. Optional 45-minute timer with pause. Results show both pass rules separately, count up the score, list every answer, and end with an app card (no price). Nothing is stored. |
| 5. Home page | `ae4f38e` | The "Night to morning" home page: night hero with the gold map, sparkle, stars and a floating phone; "The rule that decides a pass" (15 of 20 and 5 of 5, set very large); the story from lesson to mock test; the real content numbers; private-by-design cards; Free vs Premium table (no prices); a practice test teaser with one real free question. |
| 6. Home motion | `b200fb0` | The map draws itself as one gold line and fills with gold, the sparkle catches the light, the phone rises and floats; the sky warms towards dawn as you scroll; on desktop the phone leans towards your pointer and one sticky phone changes screen as you read the story; the numbers count up. Home JavaScript: 0.7 KB (limit 15 KB). |

Order was 7 → 8 → 5 → 6: the home page's numbers come from the export, and its button must link to a practice test that exists.

## Quality

- Lighthouse mobile: every page passed the limits in GitHub's CI (median of 3 runs: performance ≥ 90, the rest ≥ 95). Local runs scored the animated home page 100 / 100 / 100 / 100 with zero layout shift.
- axe: no violations on any page, phone and desktop, light and dark, and in every practice-test state (question, right, wrong, results).
- Practice test played end to end by a script: marking, the values-only fail (18/20 with 4/5 values → "Not a pass yet"), keyboard only, focus, timer and pause, no storage.
- All screenshots reviewed at 390×844, 1280×800, 1440×900 and 1920×1080, light and dark, plus motion captures (hero over time, pointer tilt, each story step, count-up).

## Decisions for you to review

All are in `docs/decisions.md` under "Decisions for Raghav to review" (35 rows from Run 2). The ones most worth a look:

1. **Home headline:** "Get ready for the Australian citizenship test."
2. **Free vs Premium** shows features only, no prices ("You'll see the price in the App Store before you buy").
3. **Practice test:** answers are checked with a button, not on tap; if the optional timer runs out, unanswered questions count as not correct (said on the page as this test's rule, not the real test's).
4. **The results screen** has an app card listing what's free in the app and that Premium unlocks the rest.
5. **`check:paid-leak`** ignores two booklet sentences that a free and a paid question share word for word (p4-093/p4-049 and p4-095/p4-020).
6. **Only `main` is pushed**; phase branches are deleted after merging.
7. **From Phase 6, Lighthouse is gated in GitHub's CI** (see "Your Mac" below).

## Your Mac: please read

Your project folder is on the iCloud-synced Desktop, and the Mac is 95% full (about 10 GB free). macOS "Optimise Mac Storage" had offloaded over 10,000 of the project's files, including `node_modules`, to iCloud. Tools stalled while files downloaded, and one copy even came out empty. The live site was never affected.

What I did: from Phase 6, I worked in a fresh clone of your GitHub repo at `~/pledge-work` (outside iCloud) and pushed from there. Two leftovers you can delete: `~/pledge-deps` and `~/pledge-phase6-save` (a safety copy of Phase 6 work, now on GitHub).

What I'd suggest (your choice):
- **Simplest:** keep working in `~/pledge-work`. It is the same repo, fully up to date.
- **Or** bring the Desktop copy up to date with `git pull` in it (slow while iCloud catches up), and free some disk space so macOS stops offloading.
- **Lasting fix:** move the project out of Desktop/Documents (for example to `~/Projects/pledge-website`), or turn off "Optimise Mac Storage" (System Settings → your name → iCloud → Drive). The app project on the Desktop has the same exposure.

## What to look at in your browser

**Laptop** (<https://raghavkant.github.io/pledge/>):
- Load the home page and watch the first 3 seconds: the map draws itself, fills with gold, and the sparkle catches the light.
- Move your mouse over the hero: the phone leans towards it.
- Scroll slowly: the sky warms, then in "From first lesson to test day" the phone stays put while its screen changes with each step. The numbers count up when they come into view.
- Try the practice test: <https://raghavkant.github.io/pledge/australia/practice-test/>. Get one wrong on purpose (a gentle shake) and one right (a small pop). Finish to see both pass rules.
- Switch your Mac to dark mode and look again.

**Phone** (same links): the hero fits the first screen with the button in reach; the story shows one phone per step; the practice test is thumb-friendly. With "Reduce Motion" on (Settings → Accessibility → Motion), everything appears without animation.
