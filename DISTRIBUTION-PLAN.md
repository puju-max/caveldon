# Distribution plan — Oct 2026

The short version: **one piece of work, three owned surfaces, many borrowed ones.**
Everything here is built around not paying for attention we cannot afford yet.

This document is the operational half of `BRAND-AND-DISTRIBUTION.md`. That one explains
*why* the decisions were made. This one is what to do on Monday.

---

## 1. The strategy in one paragraph

We do not have a marketing budget, so we cannot buy distribution — we have to *earn*
it by publishing work that is worth reading and by being useful in rooms where our
buyers already argue about this stuff. The engine has three owned surfaces (the free
checklist, the guides, the Engineering Lab) and a set of borrowed ones (Reddit, LinkedIn,
DEV, Hashnode, X, GitHub). Every borrowed surface points back to an owned one. The
metric that matters is not traffic — it is **being the answer that an AI assistant or a
peer quotes when someone asks who is good at this**, because 60% of Reddit's daily
visitors arrive from search without logging in.

---

## 2. The three owned surfaces

| Surface | Job | Funnel position | Why it is ours |
|---|---|---|---|
| `/checklist/` — the small-environment checklist | Give something real away | Top | A written artifact, free, printable, and written to be useful without us |
| `/insights/` — guides | Earn the right to be found | Middle | Written to be useful whether or not anyone buys; this is the SEO and AI-citation surface |
| `/work/` — Engineering Lab | Show how we think | Middle | Reference designs with decisions, trade-offs and validation plans |

The checklist is the only one that is *not* marketing, and that is why it works.
Everything else points at it.

**Do not add a newsletter until there is something to send.** An empty subscription box
is worse than none. The RSS feed at `/rss.xml` covers the syndication need for now.

---

## 3. The channels

Full detail, including the live/planned state and the commitment for each, lives in
`src/data/social.ts`. That file is the single source of truth — the footer, the
`sameAs` schema and the community page all read from it, so a profile is linked
everywhere or nowhere.

| Channel | Tier | Priority | Cadence | Why |
|---|---|---|---|---|
| LinkedIn (founder) | founder | **P1** | 2 posts/wk, 1 long-form/fortnight | The channel that actually reaches MSP owners and CTOs |
| GitHub | work | **P1** | When something is reusable | Proof you can read, not a claim you can trust |
| Reddit | community | **P1** | 3 substantive comments/wk, ≤10% links | Where this buyer argues about compliance and pricing |
| DEV Community | work | P2 | Every new guide, within a week | Developer search reach; canonical link back |
| Hashnode | work | P2 | Every new guide, within a fortnight | Better developer search than DEV |
| LinkedIn (company) | work | P2 | Quarterly | A profile to be linked to, not a posting account |
| X | work | P2 | 3 posts/wk, mostly replies | Cheap to run, slow to convert |
| Medium | work | P3 | Only if already written | Weak conversion, syndication-only audience |
| YouTube | work | P3 | One walkthrough/month | Video converts best for technical buyers, slowest to produce |
| Bluesky | community | P3 | 2 posts/wk | Cheap to claim the handle; links back to the site |
| Facebook | community | P3 | Monthly | Only so a name search lands somewhere real |
| Instagram | community | P3 | Only when a diagram exists | Almost no value for this buyer |

**Honest note on Facebook and Instagram.** They are listed because they were asked for,
and they are last because they are the wrong place to find an MSP owner or a CTO. The
only reason to open them is to stop someone else opening them first. Do not spend time
there.

**Do not open a channel you will not post in.** An empty profile reads as "new agency
trying to look established", which is the exact opposite of what an MSP owner is
screening for. Fewer, alive channels beat many, dead ones.

---

## 4. Copy-paste profile set-up

Every profile below is already written. Paste, set the handle, upload the avatar, done.
Handle all: `caveldon` (LinkedIn company, X, GitHub, DEV, Hashnode, Medium, YouTube,
Bluesky, Facebook, Instagram). Reddit: `u/caveldon`.

### Which handles are actually free

Checked on 20 Oct 2026 and recorded in `src/data/social.ts` (shown on `/community/`):

| Handle | Result |
|---|---|
| `github.com/caveldon` | **Free** — confirmed via the GitHub API |
| `dev.to/caveldon` | **Free** — confirmed via the DEV API |
| `hashnode.com/@caveldon` | **Free** — the profile returns "User not found" |
| `linkedin.com/company/caveldon` | **Free** — 404 |
| `x.com/caveldon` | **Free** — 404 |
| `youtube.com/@caveldon` | **Free** — 404 |
| `bsky.app/profile/caveldon.bsky.social` | **Free** — "Profile not found" via the Bluesky API |
| `linkedin.com/in/caveldon` | Unknown — LinkedIn rate-limited the check. Open it in a browser |
| `reddit.com/user/caveldon` | Unknown — Reddit blocks automated lookups. Open it in a browser |
| `medium.com/@caveldon` | Unknown — Medium blocked the check |
| `facebook.com/caveldon` | Unknown — Facebook blocked the check |
| `instagram.com/caveldon` | Unknown — Instagram does not return a reliable status |

Claim the seven confirmed-free ones first, and check the remaining five by hand.

**Avatar, everywhere:** the `C—` mark reversed — navy square, paper C, teal dash, with the
corner registration marks. Run `npm run make:avatars` and the PNGs are produced at every
size the platforms ask for:

| File | For |
|---|---|
| `public/assets/avatar-1024.png` | GitHub organisation |
| `public/assets/avatar-800.png` | YouTube |
| `public/assets/avatar-512.png` | General / spare |
| `public/assets/avatar-400.png` | LinkedIn company, X |
| `public/assets/avatar-256.png` | Reddit (the size Reddit renders) |
| `public/assets/avatar-128.png` | Small / favicon fallback |

One source SVG (`public/assets/avatar.svg`) renders all of them, so the mark cannot drift
between platforms. Do not hand-export these — regenerate them.

### LinkedIn — founder profile (P1, do this first)

- **Profile photo:** `public/assets/avatar-400.png`
- **Headline:** `Founder, CAVELDON · Cloud, security and managed operations engineering · AWS & Azure`
- **Banner:** the Engineering Lab cloud-production-architecture diagram, with the line
  *"Reference designs, not client work"* on it. It is honest and it is unusual.
- **About:**

  > I run CAVELDON, a one-person cloud and operational engineering practice. I am Pujan Patel.
  >
  > We do four things: cloud and platform engineering; security, governance and
  > compliance readiness; managed infrastructure and support; and reliability and cloud
  > cost work.
  >
  > Two ways to buy it. A team engages us directly. Or an MSP engages us and resells the
  > work to their own client under their own name — we are invisible, they keep the
  > client and the margin.
  >
  > Everything we produce is written down: findings, runbooks, code, and the evidence an
  > insurer or an auditor will ask for. We run every review and every restore drill
  > inside the client's own cloud account, under access the client can revoke. We do not
  > ask for credentials.
  >
  > Fixed scope, published prices, and we do not price on geography — we price on the
  > outcome.
  >
  > Free checklist: caveldon.com/checklist
  > Guides: caveldon.com/insights

- **Featured:** the free checklist link, the two best guides, and `/community/`.

### LinkedIn — company page (P2)

- **Name:** `CAVELDON`
- **Tagline:** `Cloud, security and managed operations engineering. Fixed scope, published prices.`
- **About:** the two-line version from `/community/`, then "Founded in 2026. India-based,
  working across US and EU hours." Then the same three links.
- **Industry:** IT Services and IT Consulting · **Company size:** 2–10 · **Type:** Privately
  Held · **Headquarters:** Pune, India (or wherever)

### Reddit — `u/caveldon` (P1)

- **Profile name:** `Pujan — CAVELDON (cloud/infra)` — a person, not a company.
- **Profile picture:** the `C—` mark, 256×256.
- **Bio (the "flair"):**

  > Founder of CAVELDON — cloud, security and managed ops engineering. Vendor: I do this
  > for a living, and I say so in every thread I post in. I mostly answer questions and
  > occasionally recommend other tools when they fit better. Free small-environment
  > checklist (printable, no signup): caveldon.com/checklist

- **Do NOT** post from this account to advertise. Read `REDDIT-PLAYBOOK.md` first.

### GitHub — `github.com/caveldon` (P1)

- **Type:** Organization (not a personal account — it should outlive you).
- **Description:** `Cloud, security and managed-operations engineering practice. Open-source
  tooling, reference architectures and IaC. caveldon.com`
- **Profile README:** what CAVELDON is, what is open source, and the link to the guides.
- **What to publish:** the environment-setup templates as code (CloudFormation and
  Terraform modules for a small, well-documented environment), the review checklists as
  markdown, and the runbooks we write for clients — with permission. Genuinely reusable,
  not content marketing.
- **This is the channel that lets a buyer read our code before they book a call.**

### DEV Community — `dev.to/caveldon` (P2)

- **Profile bio:**

  > Cloud, security and managed-operations engineering. Guides on AWS and Azure that are
  > useful whether or not you work with us. The originals live on caveldon.com/insights —
  > that is the canonical copy.

- **Avatar:** the `C—` mark.
- **Everything posted here:** generated by `npm run syndicate`, with the canonical URL set
  to our own page.

### Hashnode — `hashnode.com/@caveldon` (P2)

- **Bio:** as DEV. Set the same canonical URL in the editor.
- **Domain:** `caveldon.hashnode.dev` if it is free — it points at the blog we own.

### X — `x.com/caveldon` (P2)

- **Display name:** `CAVELDON`
- **Bio:**

  > Cloud, security and managed ops engineering. Fixed scope, published prices. Free
  > small-environment checklist: caveldon.com/checklist

- **Link:** the checklist page, not the homepage. It is the thing people will click.

### Medium — `medium.com/@caveldon` (P3)

- **Bio:** as DEV. Use the Medium Partner Program for the homepage link, and set the
  canonical URL to our own page on every post.

### YouTube — `@caveldon` (P3)

- **Description:** `Cloud and security walkthroughs. Reference designs, not client work.`
- **First three videos, in this order:**
  1. *Ten environments, ten ways to get it wrong* (the checklist, applied to real setups)
  2. *Your backups are not tested until you restore one* (a restore drill, in a public lab)
  3. *One environment, AWS and Azure side by side* (the same app on both, same price)

### Bluesky, Facebook, Instagram (P3)

- **Bluesky bio:** the X bio, with the handle `@caveldon.bsky.social`.
- **Facebook page:** category "Software Company"; About = the two-line version.
- **Instagram:** same. Post only diagrams or terminal output we already have.

---

## 5. The syndication workflow

Write once, publish everywhere, keep one canonical copy.

```
1. Write the guide in src/content/insights/<slug>.md   (frontmatter: title, description,
   category, eyebrow, readMinutes, cardDescription, visualLabel, order, featured,
   draft: false, pubDate, author, tags)

2. npm run build                     → check it renders and the motion checks pass

3. npm run syndicate                → writes syndication/<slug>/ with
     dev.md        DEV.to draft, canonical_url set
     hashnode.md   Hashnode draft
     linkedin.md   long-form post
     x.md          three short posts
     checklist.md  what still needs a human

4. Paste into DEV, then Hashnode, then LinkedIn, then X. Human presses publish.

5. Add the published URLs to `syndicatedTo:` in the guide's frontmatter and rebuild,
   so our own page lists where else it has appeared.

6. Cross-post the guide to your personal LinkedIn and, if it fits, one of the buyer
   rooms on Reddit — as a person, with the vendor disclosure in the first line.
```

`npm run syndicate` generates the text. It does not post anything, and it should never
post anything: automatic posting into a community is how accounts get banned, and every
platform's publisher requires a human press of the button anyway.

**The line that makes syndicated posts work:** the copy on DEV and Hashnode must be
*identical* to the original, with the canonical link pointing at us. Do not "adapt" it
per platform. Search engines penalise near-duplicates; readers notice.

**The line that makes them worth reading:** add one sentence at the top that only we
would know — a client situation, a number from our own work, or a mistake we made. That
sentence is what a competitor cannot copy and what an AI answer will quote.

---

## 6. The first 30 days

Do not run all of this at once. The order below is the order of dependency.

| Week | Do this | Why now |
|---|---|---|
| 1 | Register `caveldon.com` and `caveldon.in`. Set up the LinkedIn founder profile and the GitHub organisation. Claim `caveldon` handles everywhere else — claiming is free and stopping someone else claiming it is the point. | The two profiles a buyer actually looks up |
| 2 | Fix the launch blockers (`src/data/site.ts`, `.env`). Build. Publish the first two guides. | A profile that links to a site with placeholders loses the click |
| 3 | Publish guide 1 on DEV and Hashnode. Post the free checklist to the r/msp Weekly Promo thread and to 2–3 buyer rooms as a person. | One real artifact, not an announcement |
| 4 | Publish guide 2. Post 3 substantive comments in buyer rooms. Publish the environment setup templates as a GitHub release. | Repeat the pattern once so it becomes habit, not an event |
| 5+ | One guide a week, syndicated. Three Reddit comments a week. Two LinkedIn posts a week. | The compounding part |

**The 30-day goal is not followers.** It is:
- one guide published and syndicated to two platforms
- 10 substantive comments in rooms where the buyer argues
- one piece of feedback from a stranger that changes what we do next

---

## 7. What to measure

**Do not measure impressions.** They reward the wrong behaviour and they are trivially
gamed by posting more.

| Measure | Where it comes from | Why it is the right signal |
|---|---|---|
| Mentions in threads we did not start | Reddit, DEV, LinkedIn search | Someone remembered us without being sold to |
| Citations in AI answers | Ask ChatGPT / Claude / Perplexity / AI Mode the buyer questions | 60% of Reddit's daily visitors come from search without logging in; AI Mode cited Reddit in 6.6% of software-buying answers |
| Qualified inbound | The contact form, and replies to outreach | Only this one is revenue |
| Checklist downloads | Analytics on `/checklist/` | Whether the free thing is actually being used — and it is the one page that must never be gated |
| Guide → contact clicks | Analytics on `/insights/` | Which subjects a buyer cares about |

**Do not add analytics to the free checklist.** It is a page, not a tool — but the
same principle applies: it is the one artefact that must read as generous. Do not
gate it, do not email-gate it, do not put a tracking pixel on it.

---

## 8. What not to do

- **Do not run a company Reddit account that posts.** Measured: 400 of 499 brand
  items sat on the brand's own subreddit, 266 of 340 brand comments scored exactly 1
  point, and not one recommended a competitor. See `REDDIT-PLAYBOOK.md`.
- **Do not link to yourself in a community thread** where links are not allowed, or as
  softened versions ("my post", "check my bio").
- **Do not recommend only yourself.** Credibility on Reddit is spent, not earned. We
  already have the case: trustyourinbox white-labels email authentication at
  $2/domain/month, so we do not sell that check standalone.
- **Do not buy ads, do not buy a mailing list, do not run a launch announcement.**
- **Do not claim a team, certifications we do not hold, or client outcomes.** The site
  refuses to make claims it cannot evidence; the profiles must match it or the site
  becomes a lie.
- **Do not open a channel to post once.** Either commit to the cadence in
  `src/data/social.ts` or delete the row.
- **Do not resell the free checklist as a product.** It is the top of the funnel and
  the thing that earns the right to sell the deeper work.

---

## Sources

The research behind every decision here is cited in `BRAND-AND-DISTRIBUTION.md`.
The channel-by-channel mechanics (Reddit rules, AI-citation behaviour, platform
front-matter keys) were checked against each platform's own documentation and current
behaviour in Oct 2026.
