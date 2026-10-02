// The one place the site's public address lives.
// Domain day (2026-10-02): moved from https://raghavkant.github.io/pledge/, which now redirects here.
export const DEPLOY_URL = 'https://pledgecitizenship.com/';

const url = new URL(DEPLOY_URL);
/** The origin, e.g. https://pledgecitizenship.com */
export const SITE = url.origin;
/** The path the site lives under: / on the custom domain (it was /pledge/ on github.io). */
export const BASE = url.pathname.endsWith('/') ? url.pathname : `${url.pathname}/`;
