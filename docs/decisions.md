# Decisions

One line per decision. Newest at the bottom.

## Decisions for Raghav to review

Choices made during a run without stopping to ask. Each is a recommendation; say if you want any changed.

| Date | Decision |
|---|---|

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
