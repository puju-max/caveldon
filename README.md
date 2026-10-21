
## CAVELDON v13 — Service Architecture Update

The existing v12 visual identity, C— mark, DM Sans / JetBrains Mono and restrained architectural grid remain unchanged.

- **Services** now starts with three practice categories. Every sub-service links to a relevant detailed capability or dedicated service page.
- **Starting engagements** are four proposed, scoped assessments *within* Services; they are not a new main-nav item. No fixed price, availability, or client delivery outcome is implied.
- **Cloud Migration & Modernization** is now its own page at `/services/cloud-migration/` with application/data/cloud-to-cloud/hybrid capabilities, a line-diagram, phased approach, validation and handover expectations. Dynamics 365 work is explicitly separate and not implicitly promised.
- **Evidence** connects Services to three Engineering Lab reference studies and distinguishes reference designs from customer case studies.
- **AI Infrastructure** is clearly a developing practice.
- A static offline preview of the updated Services and Migration pages is available in `PREVIEW/` (the remaining prebuilt preview pages are legacy and may not exactly reflect the newest Astro source).

To run the **actual website** after extracting this project:

```bash
npm ci
npm run check
npm run build
npm run dev
```

Open `http://localhost:4321/services/` and `http://localhost:4321/services/cloud-migration/`. Do not deploy without passing the launch review in `V13-CONTENT-AND-LAUNCH.md`.

**Validation status:** on 14 October 2026, `npm run check` completed with 0 errors and `npm run build` produced the static site successfully. The contact API test suite also passed all 12 tests. Re-run these checks after content, dependency or configuration changes.

# CAVELDON v12 — Cloud & Operational Engineering

This is the updated Astro source derived from the supplied v11 project. **The design system is unchanged.** General service pages use capability language rather than AWS service names; AWS and Azure are identified as platforms. A dedicated Cloud Migration & Modernization offering covers applications, databases and infrastructure. Technical Lab studies remain specific where the proof needs to be specific.

Start here:
- [V12-POSITIONING-AND-REVIEW.md](./V12-POSITIONING-AND-REVIEW.md) — precise editorial decisions and scope boundaries
- [CONTACT_SETUP.md](./CONTACT_SETUP.md) — real contact delivery configuration (prelaunch behavior remains safe)
- [BRAND_IDENTITY.md](./BRAND_IDENTITY.md) — unchanged CAVELDON brand identity

Development:
```sh
npm ci
npm run dev
npm run build
npm run check
```

**Launch status:** prelaunch. Do not enable production indexing or claim verified client outcomes until approved.

## Run it

```sh
npm install
npm run dev        # http://localhost:4321
npm run build      # static output in dist/
npm run check      # type and template checks (should report 0 errors)
```

Requires Node.js 20.3+ (22 LTS recommended). Fonts are self-hosted from npm (`@fontsource-variable/*`), so the site makes no requests to Google.

## Before launch: fill in your details (one file)

Open **`src/data/site.ts`** and fill in:

| Field | Why it matters |
|---|---|
| `founder.name`, `photo`, `linkedin`, `location`, `experience`, `certifications`, `bio` | Buyers hire people, not logos. This is the single biggest trust gap on the site. |
| `workingHours` | US/UK/EU buyers always ask about time-zone overlap. |
| `founder.industries` | Pre-filled with SaaS, Healthcare, Financial services, E-commerce. **Keep only industries where you have real work experience.** |
| `offer.price` | Optional. Leave empty to say "fixed price, agreed before we start". |
| `offer.duration` | Defaults to "1–2 weeks". Change it if your Health Check takes longer. |

Empty fields show as **amber `[placeholders]`** while `PUBLIC_SITE_LIVE=false`, so you can see what is missing. When `PUBLIC_SITE_LIVE=true` they are hidden automatically and can never reach visitors.

Then set these in `.env` (copy `.env.example`):

```dotenv
PUBLIC_BOOKING_URL=https://cal.com/your-name/30min   # every "Book a call" button goes here
PUBLIC_CONTACT_EMAIL=hello@your-domain.com
PUBLIC_SITE_URL=https://www.your-domain.com
PUBLIC_SITE_LIVE=true                                  # only when you are ready to be indexed
PUBLIC_ANALYTICS_PROVIDER=plausible                    # or umami / cloudflare (cookie-free)
PUBLIC_ANALYTICS_ID=your-domain.com
```

Analytics loads only on a live build. With Plausible or Umami, every "Book call" click is recorded as an event with the page and section it came from, plus "LinkedIn click", "Message sent" and "Message draft copied".

Without `PUBLIC_BOOKING_URL`, "Book a call" buttons go to the contact form.

When you build with `PUBLIC_SITE_LIVE=true`, the build prints a **`[launch check]`** line listing anything visitors need that is still missing. On a live site the contact form only appears once the email backend is configured (`CONTACT_SETUP.md`); until then the contact page shows your email address and calendar link instead.

## Promises the copy makes (confirm or edit)

The new copy makes specific commitments because specifics convert better than vague claims. Make sure you are happy to keep each one, or edit it:

- "We reply within one working day": `src/pages/contact/index.astro`, `public/contact.js`
- "Fixed price before work starts" and "no open-ended hourly bills": homepage, FAQ
- "You own everything we build… no lock-in": homepage, About
- "Drawing on hands-on experience in healthcare and financial services": `/services/security-compliance/`
- "Read-only access is enough for the Health Check" and "we never ask for root keys": FAQ
- "We'll sign your NDA": FAQ, Contact
- "Ongoing support · Cancel anytime": `src/pages/services/index.astro`
- **Tools lists** on the Services page: keep only tools you have really used in production.

## Where things live

| Path | What it is |
|---|---|
| `src/data/site.ts` | Your details, the offer, and where the booking button points |
| `src/styles/global.css` | The whole design system. All colours are tokens at the top |
| `src/pages/index.astro` | Homepage: hero → problems → services → how it works → sample report → founder → work → FAQ → call to action |
| `src/pages/services/` | Services overview and the Security & compliance page |
| `src/pages/work/` + `src/data/work.js` | Reference designs (clearly labelled as not client projects) |
| `src/components/diagrams/` | Line-drawn SVG diagrams that inherit the site colours |
| `src/pages/soc-2/` | The SOC 2 on AWS landing page (main niche page) |
| `src/data/faq.ts` | All FAQ answers. Used on the pages and in the search-engine markup |
| `src/content/insights/*.md` | Articles. `draft: true` articles are hidden on a live build. Set `pubDate` when you publish |
| `src/lib/schema.ts`, `src/components/JsonLd.astro` | Structured data (organisation, founder, service, FAQ, article, breadcrumbs), live builds only |
| `src/pages/llms.txt.ts` | Plain-text summary for AI assistants, generated from the site data |
| `src/components/Analytics.astro` | Cookie-free analytics loader |
| `src/pages/robots.txt.ts`, `sitemap.xml.ts` | Block crawlers in prelaunch, allow + sitemap when live |
| `public/og.png` | The image shown when the site is shared on LinkedIn, WhatsApp, Slack, etc. |
| `infra/contact-api/` | Optional AWS backend for the contact form (see `CONTACT_SETUP.md`) |

Old `/expertise/` URLs redirect to `/services/`.

## Adding an article

Copy a file in `src/content/insights/`, edit the frontmatter, write Markdown, keep `draft: true` until it has been reviewed, then set `draft: false`. The Insights link in the header and footer only appears once at least one article is visible.

## What changed in v10

- Repositioned as a **cloud & DevOps agency** with a team, for startups and SaaS (not a solo consultancy).
- Homepage built around **six moments**: launching, raising a round, selling to enterprises, scaling, adding AI, and needing a DevOps team every month.
- **Services** page now covers all six services plus the monthly DevOps plan.
- New **`/startups/`** page: the startup cloud foundation, and a table of what investors check in technical due diligence.
- "Engineers, not salespeople" promise on the homepage, About and FAQ. About shows team members from `founder.team` in `src/data/site.ts` once you add them.
- Offer renamed to **Cloud Readiness Review**.

## What changed in v9

- Repositioned for **B2B SaaS that needs SOC 2 on AWS**: new hero, problems, services order, sample report mapped to SOC 2 criteria, FAQ.
- New **`/soc-2/`** page: short answer first, Type I vs Type II timeline, a table of six control areas with what auditors look for, what we build in AWS, and the SOC 2 criteria.
- Security page reframed for **SaaS selling to hospitals and banks** (HIPAA, PCI DSS, DORA).
- **Search and AI answers:** FAQ, service, organisation, founder, article and breadcrumb structured data; article bylines and dates; llms.txt; robots.txt notes for AI crawlers.
- **Cookie-free analytics** with call tracking.
- Offer renamed to **SOC 2 Readiness Review**.

The 12-guide content plan lives in a separate shared document (CAVELDON Content Plan).

## What changed in v8

- **Message:** the homepage now says who it's for, what problem it fixes and what to do next in the first screen. A "Sound familiar?" section lets visitors recognise their own problem; a sample report shows what they get; a founder section and FAQ answer the trust questions before the call.
- **One clear action:** "Book a free 30-min call" everywhere, leading to a fixed-price Cloud Health Check.
- **Skeleton design:** paper background, navy line drawings, one teal accent, corner registration marks and guide rails. 339 one-off colours were reduced to a small token set, and every text colour now passes WCAG AA contrast (the old grey headlines measured 2.5:1).
- **Honesty, but once:** disclaimers were cut from ~25 repetitions to one clear label per reference design.
- **Technical:** self-hosted fonts (no Google Fonts, which matters for GDPR), share image, robots.txt and sitemap, structured data when live, `astro check` passes with 0 errors.

Deployment notes: `AWS_DEPLOYMENT_PLAN.md`. Contact backend: `CONTACT_SETUP.md`. Brand rules: `BRAND_IDENTITY.md`.

Note: PREVIEW is an optional static snapshot. After npm install, Astro builds its own production assets and locally managed font dependencies. The design system is not changed in v12.
