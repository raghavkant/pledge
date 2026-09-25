# Design

Approved by the owner on 2026-09-25: **Direction A, "Night to morning"**. The site lives in the app icon's world: a deep ultramarine night, a gold map of Australia, an ivory four-point sparkle. Colours and fonts are the app's "Harbour" system (app project `docs/design.md`).

## 1. Principles

1. **One memorable thing per page.** On the home page it is the night sky and the gold map. Everything else is calm.
2. **Night to morning.** The home page starts at night and lightens to the ivory of the app as you scroll. Guides and legal pages are the morning: calm ivory reading pages (dark in dark mode).
3. **Typography does the work.** Fraunces for titles and big numbers, Manrope for everything else.
4. **Colour means something.** Ultramarine = brand and action, gold = the map and highlights on night, ochre = values, green = correct/pass, red = wrong only.
5. **Honest by design.** No fake UI, no fake social proof, nothing that looks like a government site.
6. **Avoid template tells** (frontend-design skill): no capitalised labels above headings, no arrows added to link text, no identical card grids, no decorative gradients on everything, no middle-dot meta strings in the design itself.

## 2. Colour tokens (`src/styles/tokens.css`)

| Token | Light | Dark | Use |
|---|---|---|---|
| `--night-0` | #0E1650 | same | Night gradient top, header band |
| `--night-1` | #2743D6 | same | Night gradient bottom |
| `--bg` | #F6F4EF | #0F1220 | Page (ivory) |
| `--surface` | #FFFFFF | #181C2E | Cards |
| `--hairline` | #E6E3DB | #2C3148 | Borders |
| `--ink` | #14161F | #F1EFE9 | Headings |
| `--ink-soft` | #33364A | #D5D6DF | Body text |
| `--muted` | #5B5F6E | #A3A7B8 | Secondary text (≥ 4.5:1) |
| `--accent` | #2743D6 | #7D93F2 | Links, primary buttons |
| `--gold-0` / `--gold-1` | #F7D38E / #E9AE4E | same | Map gradient |
| `--gold` | #F2C06B | same | Highlights on night |
| `--ivory` | #F6F4EF | same | Sparkle, text on night |
| `--ochre` | #D0842A | #E0A050 | Values |
| `--success` | #1F7A4C | #4CC38A | Correct, pass |
| `--danger` | #B42318 | #F97066 | Wrong only |

Contrast is checked by axe in light and dark.

## 3. Type

- **Fraunces 600** (static, Latin, 18 KB woff2): page titles, display numbers, section titles.
- **Manrope variable** (Latin, 25 KB woff2, weights 500–800): body and interface.
- Both are self-hosted in `public/fonts/`, preloaded, `font-display: swap`, with fallback fonts whose metrics are adjusted (`size-adjust`, `ascent-override`) so nothing shifts when the web font arrives.
- Body 18px / 1.65 on guides, 17px on small screens. Measure ≤ 68 characters.
- Scale (steps of about 1.25): 14, 15, 17/18, 21, 26, 33, 41, 52 (clamp for the hero).
- Headings in sentence case. No all-caps labels.

## 4. Layout

**Desktop is designed, not stretched** (owner, 2026-09-25). Breakpoints: phone < 720px, tablet 720–1099px, desktop ≥ 1100px, wide ≥ 1600px.

- **Grid:** a 12-column grid on desktop inside a 1320px frame (1440px on wide screens), with 48–96px outer margins. Reading text still stops at 68ch; the extra width goes to whitespace, side notes and imagery, not longer lines.
- **Guides and legal pages on desktop:** an editorial two-part layout: the title block spans wide, then the text column sits left-of-centre with a quiet side column (page contents, "checked on" date, related links) that sticks while reading. Generous vertical rhythm (section spacing 96–128px).
- **Home on desktop:** the hero fills the viewport width: headline and calls to action on the left, the gold map and the floating phones on the right, side by side. Later sections use two or three columns where the content is naturally parallel (for example the three privacy cards, Free vs Premium).
- **Hover and depth, desktop only** (`@media (hover: hover) and (pointer: fine)`): link underlines that grow, cards that lift 2px with a deeper shadow, buttons that brighten; the phones tilt a few degrees towards the pointer. Nothing depends on hover to work, and none of it runs on touch or with reduced motion.
- **Retina:** SVG for the map, sparkle, phone frame and icons; raster images get 1× and 2× sources (`srcset`) in AVIF/WebP.
- **Phone:** one reading column, max 68ch, left-aligned, 20px side gutter (≥ 16px).
- **Screenshot review:** every page at 390×844, 1280×800, 1440×900 and 1920×1080, light and dark.

Shared rules:
- Header: a slim night band (`--night-0`) with the icon mark and "Pledge" in Fraunces. The home page's hero extends the night.
- Footer on every page: legal links, support email, the disclaimer (rule 7), "General information, not migration advice.", the CC BY credit.
- Radius: buttons 14, cards 20, large cards 26. Touch targets ≥ 48×48.

## 5. Home page (Run 2)

1. **Hero (night).** The headline (Fraunces) is the largest element on first load (LCP), not the map. The gold map draws itself as one gold line (the approved `stroke-dashoffset` exception, ~1.6 s, once), then fills with the gold gradient (opacity); the ivory sparkle catches the light once (transform + opacity). Calls to action and "Independent study app. Not affiliated with the Australian Government." A neutral phone floats beside it (drawn by us, 3D transform, slow float; pointer tilt on desktop only).
2. **The rule that decides a pass:** 15 of 20 and 5 of 5.
3. **Scroll story:** a sticky phone whose screen changes lesson → question → mock result as text steps scroll by (opacity swaps; CSS scroll-driven with an IntersectionObserver fallback).
4. **Real numbers, counting up:** from the export, never hand-typed.
5. **Private by design:** three glass cards (the only `backdrop-filter` on the site, solid fallback).
6. **Free vs Premium:** honest table, Premium features marked.
7. **Practice test teaser**, **guides**, footer.

The sky lightens from night to ivory through stacked gradient layers faded with opacity.

## 6. Phone mockups

- A **neutral phone frame drawn by us** (SVG/CSS), not an Apple device image.
- Screens are named slots in `src/assets/screens/` (`lesson`, `question`, `mock-result`, …). Until the real screenshots exist (app project `store/screenshots/`), each slot shows a **labelled frame** (brand gradient + the screen's name). Never the prototype `design-refs`, never invented UI.
- Space is reserved with `aspect-ratio`, so nothing shifts.

## 7. Motion

| Tool | Cost | Use |
|---|---|---|
| CSS transitions, keyframes, `linear()` spring curves | 0 KB | All springs and micro-interactions |
| CSS scroll-driven animations | 0 KB | Behind `@supports`; static in browsers without it |
| Cross-page View Transitions (`@view-transition`) | 0 KB | Subtle page change |
| Our own small script | ~2 KB | IntersectionObserver fallback, desktop tilt, count-up; deferred |
| GSAP + ScrollTrigger | 46 KB | Not used (breaks the 15 KB limit) |
| Motion (motion.dev) | 49 KB | Not used |
| Lenis | 5 KB | Never: takes over native scrolling |

Curves (from the app): `ease-out-expo` = `cubic-bezier(0.22, 1, 0.36, 1)`; springs as CSS `linear()` approximations of the app's `springPop` (damping 12, stiffness 180) and `springPress` (damping 18, stiffness 320).

Practice-test feedback: right = scale 1 → 1.03 → 1 (springPop) + success tint; wrong = horizontal shake −8, 7, −5, 3, 0 px over 450 ms + danger tint; score counts up over ~0.8 s.

**Reduced motion:** everything appears in its final state with 200 ms fades; no tilt, shake, pulse, parallax or count-up.

## 8. Icons and images

- Favicon: `favicon.svg` (the app icon, metadata stripped), `favicon.ico` (32px), `apple-touch-icon.png` (180px), from `assets/brand/` in the app project.
- Images: AVIF/WebP, `width`/`height` always set, lazy below the fold.
- The map outline is from Natural Earth (public domain).
