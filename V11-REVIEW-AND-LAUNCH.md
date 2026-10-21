# CAVELDON v11 — Decisions, changes, and launch requirements

## Strategy (approved direction)

CAVELDON is a **founder-led cloud and operational engineering consultancy**. The core technical platforms are **AWS and Microsoft Azure**. Growing software businesses, especially B2B SaaS, are an initial audience, not the limit of the brand.

The website explains **three connected engineering practices**:

1. Cloud & Platform Engineering — architecture, modernization, infrastructure as code, delivery.
2. Security, Governance & Compliance Readiness — identity, data protection, guardrails, technical evidence, remediation.
3. Reliability, Operations & FinOps — monitoring, incident and recovery readiness, performance, cost visibility.

AI infrastructure is a developing specialization; do not describe it as a mature established service without tested implementation and capacity.

## v11 changes

- Kept v10's technical-drawing visual identity, C— symbol, typography, palette, diagrams and fast static-site approach.
- Replaced AWS-only 'DevOps team for startups' lead with a broader AWS + Azure consultancy proposition.
- Simplified navigation to **Services / Engineering Lab / Insights / About / Contact Us**. Startup and SOC 2 landing pages are retained for contextual links and search.
- Homepage shows **3 practices** and **4 customer concerns**, while Services retains detailed capability sections.
- Updated founder and contact statements to avoid implying a staffed team, fixed support coverage, one-day replies, audit outcomes, certifications or specific industry experience that has not been confirmed.
- Reframed Cloud Readiness Review as a scoped potential entry engagement, without invented pricing or guaranteed turnaround.
- Preserved original reference studies as **reference designs**, not customer deployments.
- Preserved all 4 Markdown article drafts; review, update and explicitly publish them when ready.
- Changed production-build launch checks from warnings to failures if critical business identity and contact information are missing.

## Must confirm before PUBLIC_SITE_LIVE=true

- [ ] Business/domain name and legal/trademark position reviewed.
- [ ] `src/data/site.ts`: actual founder identity, accurate bio, experience, and only earned certifications and verified industries.
- [ ] Real business mailbox OR functioning inquiry API with Turnstile; test a genuine delivered inquiry end to end.
- [ ] Contact/booking availability: add a calendar only if it exists and is staffed; agree response-time commitments before publishing any promise.
- [ ] Scope and availability of any ongoing support, incident response, turnaround times, project pricing and Azure/AI capabilities.
- [ ] Framework and regulatory claims reviewed by a competent professional where necessary. CAVELDON provides technical engineering support, NOT independent certifications, attestation or legal advice.
- [ ] Engineering Lab studies: keep 'reference design' labeling until implementation is verified, documented and permitted to publish.
- [ ] Publish at least one fully reviewed Insights article (`draft: false`) before marketing Insights as an active publication.
- [ ] Verify `PUBLIC_SITE_URL`, robots.txt, sitemap, privacy notice, analytics settings (if used), CDN/HTTPS, DNS, security headers, backups, forms and accessibility.
- [ ] Verify complete Astro production build and cross-browser/mobile accessibility testing on a machine with packages installed.

## Quality status in this package

**Verified in this environment**: 17 static preview pages, local content structure and navigation links, JavaScript syntax, visual in-memory preview of 13 viewport/page combinations, responsive overflow and mobile menu behavior for the checked examples. Contact backend unit tests are included separately.

**Not verified here**: npm/Astro compilation (the registry was not reachable), live SES/Turnstile delivery, full Lighthouse score, legal/compliance interpretations, actual client results or AWS lab deployments.

## Developer commands

```sh
npm ci
npm run dev
npm run build
```

Open the complete static preview at `PREVIEW/index.html` or open the screenshot previews. The `PREVIEW/` HTML is a convenience render adapted from v10 for design review; the **Astro source** in `src/` is the authoritative implementation for future changes. Rebuild with Astro before production deployment.
