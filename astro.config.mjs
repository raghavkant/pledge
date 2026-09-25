// @ts-check
import { defineConfig } from 'astro/config';
import { SITE, BASE } from './site.config.mjs';

export default defineConfig({
  site: SITE,
  base: BASE,
  trailingSlash: 'always',
  build: { format: 'directory', inlineStylesheets: 'always' },
  devToolbar: { enabled: false },
});
