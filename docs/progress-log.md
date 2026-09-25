# Progress log

One line per finished phase or important step, newest at the bottom, so work can resume if a run stops.

| Date | Step |
|---|---|
| 2026-09-25 | Phase 0 done: CLAUDE.md and docs/ (requirements, rules, design, phases, decisions, facts, keywords, app-project-changes, progress-log). |
| 2026-09-25 | Rehearsal on `raghavkant/pledge-pages-rehearsal`: switching branch → Actions had no downtime (old site served until the Actions deploy went live 42 s later; 84 checks, all 200). Rollback = switch back to branch `main` `/` **and** request a build (`gh api -X POST repos/<repo>/pages/builds`); back in ~60 s, no errors. |
| 2026-09-25 | Phase 1 done: Astro 7.3.5 builds today's site byte for byte from `public/`; Pages switched to GitHub Actions at 21:27 (watcher: every check 200); live pages byte-identical to the build; repo variable `PAGES_ACTIONS=true` turns on deploy-on-push. Old root files kept on `main` as the rollback. |
| 2026-09-25 | Phase 2 done: `npm run check` / `check:ci` / `check:full` (build, free tier, legal text baseline in `tests/legal-baseline/`, types, budgets, internal links, axe phone+desktop light+dark, Lighthouse mobile, paid-leak, screenshots at 4 sizes × light/dark). CI runs `check:ci`; weekly external-link check (warnings). Today's pages: perf 99–100, a11y 100, bp 96 (no favicon yet), SEO 100. |
| 2026-09-25 | Phase 2 fix: the first CI run on main failed Lighthouse on / (perf 84, total blocking time) on a plain HTML page: cold-browser noise. CI now scores the median of 3 runs after an unscored warm-up. Limits unchanged. Nothing was deployed by the failed run. |
| 2026-09-25 | Phase 3 done: Privacy Policy §11 has the approved sentence about first-party scripts (built page and root rollback copy), legal baseline updated, app-project change list updated. |
| 2026-09-25 | Phase 4 done: design system (tokens, self-hosted Fraunces + Manrope with measured fallback metrics, night hero with dawn horizon, one layout frame, desktop editorial reading layout with sticky "On this page", header, footer, desktop-only hover), `url()` helper, 404, favicon + manifest; legal pages and the interim home in the new design with legal text unchanged. Lighthouse 100/100/100/100 on every page, axe clean, CSS 3.7 KB, JS 0 KB. Run 1 complete. |
| 2026-09-25 | Rule 3 (rollback) now gives the exact steps the rehearsal proved: re-run the last good deploy first; switching Pages back to the branch also needs a build request. All 40 Phase 4 screenshots reviewed on two contact sheets (5 pages × 4 sizes × light/dark). |
