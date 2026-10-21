# Brand & distribution decisions — Oct 2026

Everything here is backed by research done on 20 Oct 2026. Sources are in the notes at
the bottom of each section.

---

## 1. The name: CAVELDON stays

**Decision: keep CAVELDON.** All of `caveldon.com`, `.in`, `.io`, `.dev`, `.ai`, `.tech`,
`.cloud` are unregistered. `siegel.in` is taken by an unrelated "Launching Soon" page.

Why keep it:

- **It is an English surname** (cattle-dale, a valley where cattle are kept) and also reads
  as "cave" + "eldon". Short, pronounceable on a phone call, and it does not pin the
  business to one technology — which matters, because the offer now spans cloud, security,
  managed infrastructure, IT support and product engineering.
- **The visual identity is built on it.** The `C—` mark, the corner registration marks,
  the guide rails, the "engineer's drawing" concept. A rename throws away the one thing
  that makes the site look like nothing else in this market.
- **It is pronounceable by a non-native speaker.** Pujan, Caveldon, Kaval-don. It survives
  a phone call and a cold email subject line. That is a real filter for a business whose
  buyers are in the US and EU.

**Action:** register `caveldon.com` and `caveldon.in` before launch. Not `.io` or `.dev`
alone — both read as developer-tool brands and undercut a business selling managed
operations to non-technical buyers. Trademark clearance is still owed; the name is a
creative direction, not a cleared trademark.

---

## 2. The logo: the mark is right, the wordmark needs a system

**Decision: keep the `C—` mark (navy C, teal dash). Extend it into a full system.**

The mark already works because it is *drawn*, not designed — it looks like a piece of
technical annotation, which is exactly the brand promise ("showing the thinking"). But
right now there is only one size of it, and no lockups.

**What to build:**

| Asset | Purpose | Notes |
|---|---|---|
| `C—` mark, 24px | Header, favicon, Reddit avatar | Current asset. Keep. |
| `C—` in a square, reversed | Reddit avatar / app icon at 256px+ | Navy field, paper C, teal dash. Must read at 32px. |
| `CAVELDON.` wordmark | Primary lockup | Real text, never an image. Navy with the teal period. |
| `CAVELDON. / Cloud & Operational Engineering` | Footer / document lockup | Two lines, mono for the second. |
| Practice icon set | The four service families | Done — `src/components/PracticeIcon.astro` |

**On "does it look like the industry":** deliberately no. The 2026 cloud-industry visual
language is AWS orange and Azure blue gradients — which is why every cloud site looks the
same and none of them is memorable. A drawn, ink-on-paper mark with registration marks
reads as *engineering craft* rather than *cloud vendor*, and the buyers we want (founders
and small teams who need someone to be accountable) read that as a positive.

**Favicon:** the current `favicon.svg` is fine. A `C—` in a navy square would be stronger
at 16px, but the current one already passes. Low priority.

---

## 3. The colour system: how the redesign avoids the "everything is minimal" problem

**The problem with minimalism in 2026:** every site is off-white with one accent and a
lot of air. It is safe and forgettable. The failure mode to avoid is the "SaaS gradient"
— purple-to-blue mesh backgrounds, glassmorphic cards, glowing orbs.

**The move:** keep the paper + navy + teal engineering-drawing identity as the base, and
add **one signature colour per practice**. Colour becomes wayfinding, not decoration.

| Practice | Colour | Hex | Role |
|---|---|---|---|
| 01 Cloud, Platform & Product | blueprint blue | `#1F5FA8` | Card rule, icon, link hover, diagram highlight |
| 02 Security, Governance & Compliance | violet | `#6A3EBF` | " |
| 03 Managed Infrastructure & Support | green | `#1F7A52` | " |
| 04 Reliability, Performance & FinOps | ochre | `#A8610B` | " |

Each is checked at ≥4.5:1 against `--paper` and `--card`. The dark hero band carries a
tinted bloom per practice, so even the full-bleed sections are colour-coded.

**Result:** the site reads as four distinct services rather than one undifferentiated
list, and a reader can tell which practice they are looking at from one glance. That is
colour doing a job.

---

## 4. Reddit: the research says do NOT run a brand account

This is the most important finding in this document, and it contradicts the plan we had.

**r/msp's actual rule:** *"Vendor Promotions and Webinars"* — vendors may only post in the
**"Weekly Promo and Webinar Thread,"** and **must identify themselves** as a vendor.
The sidebar also says: *"No self-promotion. Be SPECIFIC: Name names."*

**The measured failure mode.** Empact Partners read 499 posts and comments from 10
official brand accounts in B2B software. The result:

- **400 of 499 items** sat in the brand's own subreddit or on its own profile
- **107 of 159 posts** linked back to the brand's own site
- Of **340 brand comments, 266 sat at exactly 1 point** — Reddit's automatic author
  upvote, meaning nobody else voted. **One comment in 499 cleared 5 points.**
- **Not one of the 340 comments recommended a competitor over the brand's own product.**

Reddit's own EVP of Community, Laura Nestler, at Cannes 2026: *"act like a citizen, not
like a billboard."*

**Why a company profile fails here specifically:** Reddit's Contributor Quality Score
reads karma and account history *before* anyone reads the post. An account whose history is
96% its own subreddit has almost no sitewide signal, and moderators can switch the
reputation filter on at any time.

### The decision

**Do not create a CAVELDON company Reddit account that posts.**

Instead:

| Instead of | Do this |
|---|---|
| A brand account posting promos | **A personal account under your own name**, with vendor flair if the room offers it, and the company disclosed in the bio |
| Launch posts in r/msp | **Answer questions in the Weekly Promo thread when you have something genuinely useful** — a free teardown, a checklist, a template |
| Link-dropping in r/sysadmin | **Answer the question asked, name yourself, and only then offer the tool if it fits** |
| "Hire me" posts | **None.** They are banned in r/msp outright |

**The five-question test any Reddit plan must pass** (from Empact):
1. Which rooms do our buyers use, and what do their rules allow a brand to do?
2. What will we answer that never mentions our product?
3. **When would we recommend somebody else's tool, and are we prepared to?**
4. Whose names will be in the room, and what will they be known for?
5. What do we measure besides upvotes — mentions in threads we didn't start, citations
   in AI answers, and qualified leads?

**Question 3 is the one that matters.** The single most trusted comment in the whole
sample was a maker saying *"for your setup, honestly, use the other tool."* Credibility on
Reddit is spent, not earned. If we never recommend a competitor, we have nothing to spend.

### What we already have that fits this perfectly

**The free public scanner is the Reddit strategy.** It is:
- genuinely useful, with no pitch
- a real artifact, not a promise
- something a technical buyer can run on their own domain in 8 seconds
- the kind of thing that earns a "username checks out" reply

Put the scanner in the Weekly Promo thread, and in the weekly threads of rooms where
our buyers talk. Not as "here is our product" — as "here is a free scan of your own
domain, here is what it found, here is the fix."

**And the fact that we will occasionally say "we are not the right fit for this" is the
strategy.** Our own site says it in the Fit section. Put that on Reddit too.

### The Google/AI-search angle (this is the real reason to bother)

60% of Reddit's 130.3M daily visitors come from search engines and are **not logged in**.
A thread ranking for your brand name is a page a buyer reads before they ever reach
your site. In Empact's run of 72,000 software-buying answers, **Google AI Mode cited
Reddit in 6.6% of answers** and ChatGPT in 0.4%. One good Reddit thread outranked 38 of
41 vendor blog posts and was cited in 10 of 11 AI Mode answers.

**So the play is not traffic. It is being the answer that the AI quotes.** That favours
writing genuinely good answers over posting announcements, and it is a channel that
compounds while we sleep.

### The cadence that will not get us banned

| Activity | Frequency |
|---|---|
| Read the rules of every room before posting | Once, then re-check monthly |
| Genuinely useful comments in buyer rooms | 3–5 per week, across 2–3 rooms |
| Link to our own site | Under 10% of activity, and only where the room allows |
| Weekly Promo thread on r/msp | When we have something real (a scanner, a checklist, a template) |
| Recommended competitor | At least once, and only when it is true |
| Measure | Mentions in threads we did not start; citations in AI answers; qualified leads — not upvotes |

---

## 5. Where we are in the market, and what a profile should say

**Target, in priority order:**
1. **Startups with no in-house infrastructure** who need someone accountable
2. **Small teams who have outgrown one person** doing all the DevOps
3. **Developers who want to understand their own setup** (the "Start here" content) — these
   are the earliest-funnel readers, and they refer us later
4. **MSPs themselves** (adjacent, different product)

**What the profile must say, in this order:**
1. What CAVELDON does, in one line, with no adjectives
2. Where it is based and the timezone overlap that implies
3. The price of the smallest engagement, because a price filters well and attracts well
4. How to start (the scan, or the contact form)

**What the profile must not do:** claim a team, claim certifications we do not hold,
claim client outcomes, or use stock photography. The site already refuses to make
claims it cannot evidence; the profile has to match that or the site becomes a lie.

**A note on stock photography.** The research is unambiguous: *"Stock photography of
diverse smiling teams. Reads as 'we have no real customers yet.'"* For a founder-led
practice selling to technical buyers, a **real photo of the founder** is stronger than any
stock image. If no photo exists yet, the designed placeholder on the site is the correct
answer — it looks deliberate, and it tells the truth. Unsplash and Pexels are free for
commercial use with no attribution required, but they are for *environments* (a data centre,
a desk, an architecture drawing) — never for people.

---

## 6. Pricing: on the site, in numbers

**Decision: show the price.** Research on 2026 SaaS sites: *"Pricing is on the site, not
behind a form"* — a gate costs 30–50% of trials. For a services business the equivalent
is a visitor who cannot tell whether we are in their budget; they leave to ask someone
else who is.

Published 2026 market rates, for calibration:

| | Range |
|---|---|
| Independent contractor, India | $25–35 junior · $35–50 mid · $50–80 senior |
| Independent contractor, US / Western EU | $100–150 junior · $150–220 mid · $220–300+ senior |
| Fixed-scope DevOps maturity assessment | $3,000–$8,000 |
| Managed DevOps retainer, SMB | $2,500–$5,000/mo |
| Managed DevOps retainer, mid-market | $6,000–$15,000/mo |
| Boutique senior-led consultancy | $8,000–$30,000/mo |

**Our published prices:**

| Tier | Price | Shape |
|---|---|---|
| Cloud Readiness Review | **$2,500** | Fixed scope, 1–2 weeks |
| Evidence & Audit Prep | **$1,500** | Fixed scope, 1–3 weeks |
| Managed Infrastructure & Support | **$1,200/mo** | 3-month minimum |
| Multi-environment managed | **$2,200/mo** | 3-month minimum |

**Why these numbers hold up:** they sit inside the published market ranges for the work
(an assessment is $3–8K; we are at the low end because scope is one environment and it
is designed as a first step), and they are far above India-domestic rates because we are
**not** pricing on geography. The site says this explicitly: *"We do not price on
geography — we price on the outcome, and we hold a fixed price against it."*

**On "we are in India, does that make us cheap?"** No. Two reasons, both on the site:
1. The scope is one environment and one framework. It is not a body-shop hour rate.
2. The price includes carrying the risk of a fixed quote. A vendor that prices hourly
   shifts estimation risk to you; a fixed price includes it.

---

## 7. The one thing to fix before anything else

`src/data/site.ts` is still empty, and the build throws `[CAVELDON launch blocked]`
when `PUBLIC_SITE_LIVE=true`. Empty fields:

- `founder.name`, `founder.bio`, `founder.experience`
- `founder.location` — and this doubles as the timezone-overlap line US/EU buyers need
- `founder.industries` — real ones only
- `founder.certifications` — AWS certs, if held
- `workingHours` — *"We are based in India (IST) and overlap with UK/EU working hours and
  US East Coast mornings."*
- `offer.price` — currently blank, so no price is implied anywhere
- `PUBLIC_CONTACT_EMAIL` in `.env` — the contact form goes nowhere without it

**A founder photo** is the highest-leverage single asset. The research is clear that a
named person with a real face is the strongest trust signal available to a founder-led
practice. The site has a designed placeholder that says so honestly — replace it when
you have a good portrait.
---

## 8. The surfaces we own (added 20 Oct 2026)

The distribution plan is operationalised in **`DISTRIBUTION-PLAN.md`**. What changed on
the site as a result:

| Surface | What it is | Why it earns its place |
|---|---|---|
| `/checklist/` | The small-environment checklist. Eight sections, about sixty checks, covering access, network, workload, deployments, data, monitoring, cost and handover. Free, printable, no signup. | The only artefact that is not marketing. It is generous rather than cheap — it gives away the method, which is exactly what a technical buyer is trying to find out. It also makes a credible Reddit contribution, because it needs no pitch. |
| `/setup/` | Cloud setup for a team that knows the code but not the infrastructure. One application, one environment, AWS or Azure, fixed scope and price. | The missing entry point. The smallest, cheapest, most specific offer — and the one that fits a one-to-five person team who has never provisioned anything. |
| `/partner/` | How MSPs buy delivery from us. Five steps, five deliverables, the wholesale price table, and six things we will never do. | The B2B2C track, stated in full. An MSP is not going to engage a subcontractor on a promise, so the promise needs to be specific — including the margin they keep. |
| `/experience/` | Nine disciplines and the seams between them. What each layer teaches you to notice, and why one engineer who has done all of them sees what five narrow contractors will not. | The founder's breadth was hidden talent. This turns it into the reason to hire one person rather than five, which is the only thing that justifies the price. |
| `/community/` | Every profile, its purpose, its cadence, copy-paste bios, and the rules we follow in third-party communities. | Turns "who is this vendor?" into a two-minute read. This is the page that makes a personal Reddit or LinkedIn profile check out. |
| `/rss.xml` | A feed of every guide and reference design. | The plumbing behind one-write-many-publish syndication, and an honest alternative to a newsletter we cannot fill yet. |
| `sameAs` in schema.org | Every live profile linked back to the Organization entity. | Makes a search for the founder and a search for the brand resolve to the same entity instead of two unrelated things. |
| Signal strip on the homepage | Real numbers, each one verifiable: platforms worked across, control families, credentials required, reference designs. | The 2026 pattern that works is specific numbers, not "trusted by thousands". We do not have thousands, and we should not pretend otherwise. |

The profile registry lives in **`src/data/social.ts`** and is the single source of truth:
the footer, the `sameAs` schema and the community page all read from it, so a profile is
linked everywhere or nowhere, and a profile that does not exist yet is never linked.

**A channel that is only planned is shown, not linked.** An empty profile reads as "new
agency trying to look established", which is the opposite of what an MSP owner screens
for.

**The free domain scanner was removed (20 Oct 2026).** It was a product, and this is a
services practice — and to a buyer deciding whether to engage an expensive engineer, a
free tool reads as cheap. It has been replaced by `/checklist/`: the same generosity,
expressed as written expertise instead of software, and more useful to this buyer
because a scan tells you three things are wrong while a checklist tells you the thirty
you have not looked at yet.

---

## Sources

- Empact Partners, *"Why Brand Accounts Fail at Reddit Marketing, and What Works,"* 2 Oct 2026 (499 posts/comments from 10 brand accounts; r/msp and 9 other subreddit rule sets read from July–Aug 2026 archives; Reddit Q2 2026 filing for DAU figures)
- Design Key Studio, *"SaaS Website Design: Patterns That Convert,"* 20 May 2026 (12 teardown patterns; the "not for you" pattern; ICP-named tiers; pricing transparency)
- InfraZen, *"DevOps consulting rates in 2026,"* 26 Aug 2026 (regional rate tables; ITJobsWatch UK sample of 3,942 day rates; fixed-scope project ranges; managed retainer bands)
- Wildnet Edge, *"DevOps Services Cost 2026,"* 28 Jan 2026 (managed retainer bands by segment; cost drivers)
- TechTarget, *"What CIOs need to know about cyber risk insurance issues,"* Jan 2026 (external scanning of applicants before binding; the three denial reasons)
- Google News/Open Startups, Reddit's Contributor Quality Score and 10:1 guidance, r/msp sidebar rules
