# Legal page text

The text of `/privacy/`, `/terms/` and `/support/`: exactly what was inside each page's `<main>`
when this repo became their source (Phase 4, 2026-09-25). `src/layouts/Legal.astro` wraps it in the
site design without changing a word.

**Never change these files without the owner's approval** (`docs/rules.md`, rules 1–2).
`npm run check` compares the built text with `tests/legal-baseline/`.
