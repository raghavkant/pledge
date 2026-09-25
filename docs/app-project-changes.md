# Changes for the app project

This website repo is now the single source of truth for the legal pages. Claude never edits the app project (`~/Desktop/citizenship test`); these are the changes for you to make there yourself. Line numbers were checked on 2026-09-25.

## Now: this repo becomes the legal pages' source

Do these in this order:

1. **`tests/store/paywall.test.ts`, lines 16–22.** The test "each page has its source in site/, with the same support email as the app" reads `site/<page>/index.html`. Delete it (or replace it with a comment pointing to `raghavkant/pledge`) **before** deleting `site/`, or `npm test` will fail.
2. **Delete the `site/` folder** (including `site/README.md`).
3. **`src/store/legalLinks.ts`:** the comments on lines 2–3 and 30 name `site/`. Point them to the public repo `raghavkant/pledge` (`privacy/` is built from `src/pages/privacy.astro` there after Run 1).
4. **`docs/ui.md:183`** ("must match the full Privacy Policy (`site/privacy/`)") and **`docs/store-listing.md:146`** ("Full detail: `site/privacy/index.html`"): point both to `https://github.com/raghavkant/pledge`.
5. **`docs/requirements.md:117`:** "Servers (the only exception: free GitHub Pages for the privacy policy and terms pages)" → "… free GitHub Pages for the website, including the privacy policy and terms pages".
6. **`docs/decisions.md`:** add "Legal pages' source moved to the public repo `raghavkant/pledge` (website project)". Also update `docs/architecture.md:455` and `docs/phases.md:27` and `:610`, which describe `site/`.

## Privacy Policy change (Phase 3, approved 2026-09-25)

7. §11 "This website" now says the website uses small first-party scripts that store and send nothing. `PRIVACY_SUMMARY` in `src/store/legalLinks.ts` describes the app, not the website, so it should not need to change. Read it once to confirm. The Privacy screen in the app opens the live page, so there is nothing else to update. If you keep `site/` for a while before deleting it, copy the same §11 sentence into `site/privacy/index.html` so the two don't disagree.

## Domain day (later)

8. `SITE_URL` in `src/store/legalLinks.ts` (line 7) → the new domain.
9. `tests/store/paywall.test.ts`, lines 10–12: the three expected URLs.
10. `docs/store-listing.md`, lines 31–33 and 86–87: Privacy, Support and Marketing URLs, and the two links in the description.
11. App Store Connect: Privacy Policy URL, Support URL, Marketing URL, and the description links.
