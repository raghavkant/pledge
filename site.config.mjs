// The one place the site's public address lives.
// Domain day: change DEPLOY_URL to 'https://yourdomain.app/' (docs/phases.md, "Domain day").
export const DEPLOY_URL = 'https://raghavkant.github.io/pledge/';

const url = new URL(DEPLOY_URL);
/** The origin, e.g. https://raghavkant.github.io */
export const SITE = url.origin;
/** The path the site lives under, e.g. /pledge/ (just / on a custom domain). */
export const BASE = url.pathname.endsWith('/') ? url.pathname : `${url.pathname}/`;
