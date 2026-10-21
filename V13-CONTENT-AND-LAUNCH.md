# CAVELDON v13 — Content architecture & review checklist

## Approved navigation (unchanged)
Services · Engineering Lab · Insights · About · Contact Us.
Solutions are **scoped starting engagements within Services**, not a separate navigation category.

## Service architecture
- Cloud & Platform Engineering: cloud setup, application/database migration, hybrid/cloud-to-cloud migration, modernization, DevOps automation.
- Security, Governance & Compliance Readiness: identity, access, protection, technical policies, audit evidence, regulated workload controls.
- Reliability, Operations & FinOps: monitoring, incident readiness, recovery, performance, capacity, cost optimization.
- AI Infrastructure: developing laboratory practice, not yet an established client service.

## Wording rules
- Customer-facing service language describes work across providers. Use exact AWS/Azure product names in Lab/reference engineering and precise platform-specific guides.
- "Solution" means a *proposed, scoped service offering or assessment*, **not** a completed customer result.
- "Engineering Lab" means a reference design or verified lab implementation only with accurately labeled validation state.
- "Case Study" is reserved for actual authorized customer work; do not invent client names, logos, metrics or quotes.
- Healthcare and finance are buyer industries with their own data, regulatory, operational and contracting constraints; they aren't extra generic engineering services. Technical readiness support is not an independent certification or legal opinion.

## Before public launch
1. Verify founder biography, credentials and industry claims against real experience.
2. Confirm scope and delivery capacity for migration, database moves and assessments. Dynamics 365 migration must not be implied without product-specific experience.
3. Review compliance-related language with an appropriate specialist where necessary.
4. Configure genuine inquiry delivery and spam controls; ensure privacy notice and sensitive-data warning.
5. Review every Insight article and remove draft flags only after publication approval.
6. Run `npm install && npm run check && npm run build` and test pages at mobile/tablet/desktop in the real Astro build.
7. Confirm hosting, domain, TLS, security headers, metadata, indexing and accessibility before going live.

The `PREVIEW/` directory is an **offline browser preview**. It does not guarantee that the Astro source has passed a production build in the present environment.
