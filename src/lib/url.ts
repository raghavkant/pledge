// Every internal link goes through url() (docs/rules.md, rule 15). The base path comes from
// site.config.mjs via astro.config.mjs, so domain day is a one-line change.
const BASE = import.meta.env.BASE_URL.endsWith('/') ? import.meta.env.BASE_URL : `${import.meta.env.BASE_URL}/`;

/** A site path such as "privacy/" → "/pledge/privacy/". Pass "" for the home page. */
export function url(path = ''): string {
  return BASE + path.replace(/^\/+/, '');
}

/** The full public address, e.g. for canonical links: "privacy/" → "https://…/pledge/privacy/". */
export function absoluteUrl(path = ''): string {
  return new URL(url(path), import.meta.env.SITE).href;
}
