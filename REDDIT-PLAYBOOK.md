# Reddit playbook

**The one-line strategy: do not run a company account that posts. Be a person who answers
questions, and let the free checklist be the proof.**

This is written against r/msp's actual rules and against measured data from 10 brand
accounts (Empact Partners, Oct 2026). Read the rules of every room before posting in it.

---

## What the rules actually say

| Room | Members (Oct 2026) | The rule | What a vendor may do |
|---|---|---|---|
| **r/msp** | 249K | "Vendor Promotions and Webinars" | **Only in the "Weekly Promo and Webinar Thread"**, and vendors must **identify themselves as a vendor** |
| r/sysadmin | 1.3M | "Advertising" | Only inside an existing discussion, **with affiliation stated** |
| r/SaaS | 817K | "No Vendor Spam on posts or comments" | Occasionally, with a cap per 60 days, affiliation stated |
| r/smallbusiness | 2.5M | "No business promotion posts" | The weekly "Promote Your Business" thread, or where a reply calls for it |
| r/startups | 2.1M | "No direct sales, advertisements, or promotion" | "Share Your Startup" / "Feedback Friday"; a blog link needs a moderator's OK |
| r/Entrepreneur | 5.3M | "No promotion, sales, or solicitation" | "Thankful Thursday" / "Feedback Friday" only |
| r/marketing, r/sales, r/SEO | various | Effectively banned | **Do not post.** r/sales also bans company-branded accounts from commenting at all. |

**The 10% rule is etiquette, not policy.** Reddit's own "Reddiquette" calls 9:1 a "widely
used rule of thumb". The Moderator guide says some rooms "abide by the 10% rule". The
actual Reddit Rules set no ratio — Rule 2 asks people to "Participate authentically". But
moderators can switch the reputation filter on at any time, and that filter reads your
account history. **Assume 10% is the ceiling and that it is enforced by people, not code.**

---

## Why a company account fails here

Empact read 499 posts and comments from 10 official brand accounts in B2B software:

- **400 of 499** sat in the brand's own subreddit or on its own profile
- **107 of 159 posts** linked back to the brand's own site
- Of **340 brand comments, 266 sat at exactly 1 point** — Reddit's automatic author vote.
  Nobody else voted. **One comment in 499 cleared 5 points.**
- **Not one** of the 340 comments recommended a competitor over the brand's own product.

The comments that got traction were the ones that would still be useful with the logo
removed. The most trusted moment in the whole sample was a maker saying *"for your setup,
honestly, use the other tool."*

**Reddit's EVP of Community, Laura Nestler, at Cannes 2026: "act like a citizen, not like
a billboard."**

---

## Where the profile and bios live

Do not write the Reddit bio from scratch each time. It is already written, in three
lengths, on **`/community/`** — and the exact bio text for every other channel is in
**`DISTRIBUTION-PLAN.md`** section 4.

| What | Where |
|---|---|
| The bio, in three lengths | `/community/` on the site |
| Reddit bio text, and every other platform's | `DISTRIBUTION-PLAN.md` → "Copy-paste profile set-up" |
| The avatar file (256×256 for Reddit) | `public/assets/favicon.svg`, `C—` reversed on navy |
| Which channels exist and their cadence | `src/data/social.ts` |
| The syndication pack for a guide | `npm run syndicate` → `syndication/<slug>/` |

**The one thing to remember:** the Reddit account is a *person* with a vendor
disclosure. The bio says so in the first line. That disclosure is what makes the rest
of it credible, and it is also literally what r/msp's rule requires.


---

## The decision

**Do not create a CAVELDON company Reddit account that posts.**

Instead:

1. **A personal account under your own name.** Your reputation is the thing that gets
   read, not the logo. Put "Founder, CAVELDON" in the bio — that is the disclosure
   r/msp asks for, and disclosing is not the same as promoting.
2. **Comment in buyer rooms** — r/sysadmin, r/devops, r/aws, r/kubernetes, r/startups,
   r/SaaS. Only where the room allows it.
3. **r/msp: the Weekly Promo and Webinar Thread only**, and only with something real.
4. **Never post a launch.** There is no launch post.

---

## The ladder

Work up it. Each rung depends on the one below. There is no timeline.

| Rung | What it looks like | Ready for the next when | Measure |
|---|---|---|---|
| 1. **Listen** | Read the rules of the rooms your buyers use, and what they say about you and your rivals | You can name the three rooms that matter and quote what each allows | The questions buyers ask that nobody answers well |
| 2. **Answer for our product** | Straight answers where people ask about CAVELDON, including the awkward ones | Questions about us get a real answer, limits admitted | Answered questions; whether the reply settled the thread |
| 3. **Your name, in the room** | You post as yourself, with the company disclosed | People know you for more than the product | Repeat names in threads; replies to you |
| 4. **An AMA when you have news worth questions** | You answer whatever is asked, including the awkward parts | The best answers get quoted elsewhere | Questions answered, and the ones you declined |
| 5. **Be the answer in threads you don't own** | Useful threads in your buyers' rooms, where CAVELDON is one of the answers | The threads rank on Google and get cited by AI | Mentions in threads you didn't start; citations in AI answers; leads |

**Rung 5 is where the value is.** 60% of Reddit's 130.3M daily visitors come from search
engines and are not logged in — they read the thread, not your site. In Empact's run of
72,000 software-buying answers, Google AI Mode cited Reddit in 6.6% of answers and
ChatGPT in 0.4%. One good Reddit thread outranked 38 of 41 vendor blog posts.

---

## What we post

### The free checklist — our one real asset on Reddit

`https://caveldon.com/checklist/` is the list we work from when we set up an
environment for a team that knows the code but not the infrastructure: eight sections,
about sixty checks, covering access, network, workload, deployments, data, monitoring,
cost and handover. It is printable, free, and written to be useful on its own.

**Why the checklist and not a scanner:** a free tool is a product, and this is a
services practice — it also reads as "cheap" to a buyer who is deciding whether to
engage an expensive engineer. A checklist is the same generosity expressed as
expertise rather than as software. It is also more useful: a scan tells you three
things are wrong, a checklist tells you the thirty you have not looked at yet.

**How to post it:** as an offer, not an announcement.

> I put together a checklist for small teams running one application in the cloud —
> access, network, deployments, backups, monitoring, cost. About sixty checks. No
> signup, no email, nothing to install.
>
> I do this work commercially, so I'm disclosing that up front. But the checklist is
> free and it is written to be useful whether or not anyone hires me — if you work
> through it and everything is fine, you don't need me.
>
> Link if useful. No pitch beyond that.

**Why this works and a launch post doesn't:** it is genuinely useful, it is a real artifact
rather than a promise, and the person asking gets something. It is also the exact
behaviour the research says earns trust — answering the question that was asked, and
naming yourself.

### The "not for you" reply

When someone describes a problem we do not solve, say so, and say who does.

> That is a compliance/legal question rather than a technical one, and I am not the right
> person for it — a lawyer or your auditor should sign off. What I can help with is the
> engineering side: what the controls actually are, whether they are configured, and
> what evidence exists.

This is the comment that earns the most credibility, because it costs the reader nothing
and costs us the sale we should not have made.

### The template

> Sharing this because it keeps coming up, not because it promotes anything.
>
> **[the specific problem]**
>
> **[what actually causes it]**
>
> **[the fix, in order]**
>
> I am the founder of a small engineering practice that does this kind of work
> commercially, so mentioning that for full disclosure. If the fix is something you can do
> yourself, the steps above are all you need.

---

## The rules we hold ourselves to

| | |
|---|---|
| Link to our own site | **Under 10%** of activity, and only where the room allows it |
| Identify as a vendor | **Always**, in the first two lines, without being asked |
| Recommend a competitor | **At least once a month**, when it is true |
| Reply to a question | **In the thread**, not on my own profile |
| Old threads | Reply where the question is still live; a 2019 thread is not a customer |
| Post frequency | **3–5 useful comments a week**, across 2–3 rooms. Not more. |
| Weekly Promo thread (r/msp) | Only when we have something real: the checklist, a teardown, a template |
| "Hire me" posts | **Never.** Banned in r/msp outright. |
| Measure | Mentions in threads we did not start · citations in AI answers · qualified leads. **Not upvotes.** |

---

## The 30-second pre-post check

Before any post, answer these five. If you cannot, do not post.

1. Which room, and what does its sidebar allow a vendor to do here?
2. What am I answering that never mentions our product?
3. **Would I ever recommend somebody else's tool here — and am I prepared to?**
4. Whose name is going to be in the room, and what will they be known for?
5. What am I measuring besides upvotes?

**Question 3 is the one that matters.** The single most trusted comment in the entire
research sample was a maker recommending a competitor. Credibility on Reddit is spent, not
earned. If we never spend it, we have nothing to spend.

---

## What NOT to do (measured failures)

| Do not | Why |
|---|---|
| Post a launch announcement | 1 upvote and "Nice ad." 400 of 499 brand items were this. |
| Run an ad shelf | Salesforce filed 570 ad posts while its organic side sat at 1 point. |
| Answer only friendly threads | Readers notice. It reads as a schedule. |
| Post blog links to your own site | 107 of 159 posts did this. It reads as an RSS feed with a logo. |
| Post 5 comments a day on unrelated topics | Bluehost wrote 47 in nine days, 45 on threads that never mentioned it. None scored above 4. |
| Be invisible without saying so | If the room bans vendors entirely, stay off. Reddit's own answer is to advertise. |

---

## The uncomfortable one

> "The uncomfortable bit: if your product has a complaint thread ranking for your brand
> name and you can't fix the complaint yet, a brand account arriving in that thread will
> make it rank better. Fix the 'thing' first, then answer it."

Our checklist will find problems. That is the point. But we do not have a product with
public complaints yet, and we should not manufacture a presence that makes an unresolved
problem more findable. **Answer threads about our own work honestly, including the ones
where the answer is "you do not need us for this."**
