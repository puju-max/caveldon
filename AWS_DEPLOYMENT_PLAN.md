# CAVELDON — AWS static-hosting plan (not executed)

The project builds to `dist/` as a static website. The launch domain is
**`caveldon.com`** (with **`caveldon.in`** registered as a defensive second
domain); `PUBLIC_SITE_URL` can be changed later without changing the site
architecture. Both were verified unregistered via RDAP on 20 Oct 2026 — they
still need to be **purchased**, which is the one step only the domain owner can do.

Once it is reviewed and ready for launch, a reasonable AWS baseline is:

1. **Private S3 bucket** for static artifacts. Enable Block Public Access. Do not use a public S3 website endpoint for the production origin.
2. **CloudFront** with **Origin Access Control (OAC)**, HTTPS-only viewer redirects, and a restrictive S3 bucket policy allowing the distribution to read site objects.
3. **Clean URL rewrites.** Astro creates nested `index.html` objects for routes such as `/insights/`. With a private S3 REST origin, configure and test a CloudFront Function at viewer-request to rewrite `/insights/` to `/insights/index.html`. An illustrative function is in `infra/cloudfront-clean-urls.js`; test it before use.
4. **DNS and TLS.** Only after CAVELDON has purchased/cleared its domain, request or import an ACM certificate for the relevant hostname in `us-east-1` for CloudFront, validate ownership, and configure the chosen DNS provider.
5. **Build and delivery.** Use CI to install pinned dependencies, run checks and `npm run build`, and upload `dist/` to the private bucket. Use a restricted deployment identity, clear audit logs and environment separation.
6. **Cache strategy.** Apply short-lived caching to HTML, longer-lived caching to hashed assets, and explicitly decide whether/when to invalidate CloudFront after updates. Avoid an indiscriminate `/*` invalidation on every release if you can use targeted object changes.
7. **Prelaunch release gate.** Validate the rendered site, content, business claims, article sources, privacy notices and contact handling. Set `PUBLIC_SITE_LIVE=true` and `PUBLIC_SITE_URL` only when launch approvals are complete. In that mode Markdown articles with `draft: true` do not build into URLs.
8. **Security and observability.** Enable appropriate CloudFront access logging and alarms, use security response headers, monitor availability, and document rollback procedures. Decide whether a WAF is justified by the site's risk profile.

**No live deployment or AWS resource creation has been performed.** The current contact experience only copies a draft to the visitor's clipboard, and no contact records are stored or delivered.

---

## Readiness status (20 Oct 2026)

### Done

- [x] `src/data/site.ts` filled — founder name, bio, experience, location, industries, working hours, published entry price.
- [x] `PUBLIC_SITE_URL` set to `https://caveldon.com`; `PUBLIC_CONTACT_EMAIL` set to `hello@caveldon.com`.
- [x] The live-build gate passes: `PUBLIC_SITE_LIVE=true npx astro build` completes with no `[CAVELDON launch blocked]` error. Nothing else is missing for the site to build and render correctly.
- [x] `npm run verify` — build + 17 motion checks + 5 site checks (duplicate IDs, broken internal links, one `h1` per page, JSON-LD parses, key pages present). All green.
- [x] Profile avatars rasterised at every size the platforms ask for — `npm run make:avatars` → `public/assets/avatar-{128,256,400,512,800,1024}.png`.
- [x] Handles checked and recorded in `src/data/social.ts`. Six confirmed free: GitHub, DEV, Hashnode, LinkedIn company, X, YouTube, Bluesky.

### Not done — needs a person, not a script

- [ ] **Buy `caveldon.com` and `caveldon.in`.** Nothing goes live until this happens.
- [ ] **Create the mailbox `hello@caveldon.com`.** The contact page currently shows this address instead of a working form, because no form backend is deployed. Either build the API (`infra/contact-api/`) or accept email-only contact — which is honest and works.
- [ ] **Claim the confirmed-free handles**, starting with GitHub and the LinkedIn company page.
- [ ] **Publish the contact API** if the form is wanted. `infra/contact-api/template.yaml` is the SAM template; it needs a bucket, a domain and Turnstile keys.
- [ ] **Set `PUBLIC_SITE_LIVE=true` in `.env`** at launch. `.env` deliberately stays `false` in the repository so a stray build never goes live by accident.
- [ ] **Founder portrait.** Optional but high leverage. Put the file in `public/assets/` and set `founder.photo`. Until then the site shows a designed panel that says "founder-led" — honest, and it does not look broken.

### Deliberately not done

- Analytics are left empty. Cookie-free and privacy-respecting analytics can be added with one environment variable, but there is nothing to measure until there is traffic, and an empty analytics ID would be one more thing to check.
- The free scanner is never instrumented. It runs entirely in the visitor's browser by design; tracking it would make the privacy claim false.
