import { defineConfig } from 'astro/config';

// A static site: no always-on application server or secret runtime needed.
// The domain is set through PUBLIC_SITE_URL once it is registered and configured.
export default defineConfig({
  output: 'static',
  trailingSlash: 'always',
  redirects: {
    '/expertise/': '/services/',
    '/expertise/security-governance/': '/services/security-compliance/',
  },
});
