# Asset credits

Every font, icon and image the site ships, with its source and licence. Add a row whenever one is added or replaced.

| Asset | Source | Licence | Where |
|---|---|---|---|
| Fraunces 600 (Latin, `public/fonts/fraunces-600.woff2`) | Google Fonts via Fontsource (`@fontsource/fraunces`) | SIL Open Font License 1.1 (`licenses/Fraunces-OFL.txt`) | Titles, big numbers |
| Manrope variable (Latin, `public/fonts/manrope-var.woff2`) | Google Fonts via Fontsource (`@fontsource-variable/manrope`) | SIL Open Font License 1.1 (`licenses/Manrope-OFL.txt`) | All other text |
| Pledge icon and mark (`public/favicon.svg`, `favicon.ico`, `mark.svg`, `icon-large.svg`, `apple-touch-icon.png`, `icon-192.png`, `icon-512.png`) and `src/lib/brand-paths.json` | Made by `scripts/build-icons.mjs` from the owner's app icon (app project `assets/brand/`, read-only) | Owner's own artwork | Favicon, header and footer mark, home page |
| Map outline of Australia (inside the icon) | [Natural Earth](https://www.naturalearthdata.com/) | Public domain | As above |
| Text from *Australian Citizenship: Our Common Bond* | Department of Home Affairs | CC BY 4.0 (credited in every page's footer) | Guides (Run 3) |
| Share images (`public/og/*.jpg`) | Made by `scripts/build-og.mjs` from each page's title, the Pledge map and sparkle, and the self-hosted fonts | Owner's own artwork; fonts OFL | Open Graph / social previews |
