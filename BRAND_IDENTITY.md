# CAVELDON visual identity (v9)

The look of an engineer's drawing: structure is visible and nothing is decorative for its own sake. It matches the brand promise of showing the thinking.

## Colour tokens (`src/styles/global.css`)

| Token | Hex | Use |
|---|---|---|
| `--paper` | `#F5F5F1` | Page background |
| `--paper-2` | `#EDEDE7` | Alternate sections |
| `--card` | `#FBFBF9` | Raised surfaces, diagram boxes |
| `--ink` | `#142237` | Text, lines, solid buttons (the original CAVELDON navy) |
| `--ink-2` | `#3A495B` | Body text |
| `--ink-3` | `#536173` | Labels, captions |
| `--accent` | `#2BA39B` | **The brand accent.** Exactly one saturated colour on the page: the logo dash, the primary button, the active nav state, diagram highlights |
| `--accent-deep` | `#1E8C85` | Hover state for accent-filled controls |
| `--accent-ink` | `#0B6F69` | Teal for text, links and ghost-button hover |
| `--accent-wash` | `#DCEEEA` | Highlighted boxes |

Every text/background pair passes WCAG AA (4.5:1). Don't add new colours; reuse a token.

## Type

- **DM Sans** (variable, self-hosted) for headings and body.
- **JetBrains Mono** (variable, self-hosted) for labels, eyebrows, chips and diagram annotations: the "drawing annotations".

## Skeleton signatures (use consistently, don't overdo)

1. **Corner registration marks** on framed figures (`.frame`).
2. **Guide rails**: two thin vertical lines outside the content column on wide screens, with `+` crosshairs where section lines meet them.
3. **Grid paper** behind heroes only (`.gridpaper`), never behind long text.
4. **Shared-border cells** (`.cells`): grids that share 1px lines like a table.
5. **Line diagrams** in ink with a single teal highlight. No gradients, glows or shadows.
6. **One dark block** per page: the final call to action.

## Motion (v9)

Motion lives in `src/styles/motion.css` and `public/motion.js`. It is a separate layer so the
brand rules above stay readable and the site still works with JavaScript disabled.

| Effect | What it does | Where it applies |
|---|---|---|
| `data-reveal` | Block fades and rises 14px as it enters the viewport | Cards, rows, panels, steps |
| `data-words` | Heading is split into per-word masks; each word rides up from behind its own clip, staggered 45ms | `h1`, `h2` not already inside a revealing block |
| `.diag` | Diagram strokes draw themselves in sequence, like a plotter; fills land after the lines that frame them | Every inline SVG diagram |
| `.service-overview-hero` | The oversized `C—` signature fades in behind the hero | Services page hero |

**Rules the engine follows — do not break them:**

1. **Content is never hidden without a fallback.** The inline `<head>` script adds `js` to
   `<html>` and sets a 2.5s timer. If `motion.js` fails to load, the timer removes `js`
   and everything appears normally. This is why the hidden state is scoped to `.js`.
2. **The word splitter preserves whitespace.** Words are split with `/(\s+)/` and the space
   stays as a real text node, so screen readers and copy-paste still work.
3. **Reduced motion is honoured twice** — in CSS (`prefers-reduced-motion: reduce`) and in
   JS (the engine never starts). Do not add animation outside those two checks.
4. **Nothing animates twice.** Elements are unobserved as soon as they are revealed.
5. **No layout shift.** Diagrams get their real `getTotalLength()` set as `--len` before
   animating, so the dashed placeholder is the same size as the final stroke.

**Adding a new animated element:** give it `data-reveal` and let the engine handle it.
The engine already targets `.sec-head, .pain, .svc, .step, .row, .study-card, .post,
.finding, .owner-note, .aside-note, .evidence-note, .callout, .numbered li, .decision,
.principles > div, .report, .founder, .split > div, .split-3 > div,
.migration-stages > li, .practice-card, .timeline li, .ctl-row, .faq details, .answer-box,
.split, .fx, .filters, .crumbs`. Add new selectors to that list rather than hand-rolling
animation inside a component.

**Verify after any change:** `npm run build && node scripts/check-motion.mjs`

## Marks

`CAVELDON.` wordmark is primary and always appears as real text.
`C—` mark (`src/components/BrandMark.astro`) sits beside it: navy C, teal dash. Favicon: `public/assets/favicon.svg`.

## On the name

CAVELDON is an English surname (cattle-dale, a valley where cattle are kept) that also
reads as "cave" + "eldon". It is short, pronounceable on a phone call, and does not pin
the business to one technology — which matters, because the offer now spans cloud,
security, managed infrastructure, IT support and product engineering.

**Domain status checked 20 Oct 2026 — all free, none registered:**

| Domain | Status |
|---|---|
| caveldon.com | free |
| caveldon.in | free |
| caveldon.io | free |
| caveldon.dev | free |
| caveldon.ai | free |
| caveldon.tech | free |
| caveldon.cloud | free |

**Register `caveldon.com` and `caveldon.in` before launch.** Do not launch on `.io` or
`.dev` alone — both read as developer tools and undercut a business that sells managed
operations and support to non-technical buyers. `.in` is the practical default for an
India-based team serving overseas: it signals where you are, reads as local, and costs a
fraction of `.com`.

The name and mark are a creative direction, **not trademark clearance**. Check the name
and domain before commercial launch.

---

## The colour hierarchy (revised 20 Oct 2026)

The question was whether to adopt a single dominant brand colour the way AWS uses
orange and Azure uses blue. The answer is **yes — but the colour already exists.**

The problem was not that there was no primary. It was that the primary action on the
page was navy, the same colour as the body text and the dark bands, so the site read
as "navy and white" with a teal hairline. A hairline is not a brand colour.

The structure now, in one line each:

| Role | Colour | Where it is allowed |
|---|---|---|
| **Field** | Navy `#0A1522` | Body text, dark full-bleed bands, structural lines, the paper-and-ink drawing itself |
| **Accent** | Teal `#2BA39B` | The logo dash, the primary button, the active nav underline, the focus ring, diagram highlights. One saturated colour per page — the one that means CAVELDON |
| **Wayfinding** | Blueprint blue, violet, green, ochre | Only inside their own practice: a card rule, an icon chip, a section band. Never in the logo, the nav or the hero |
| **Signal** | Amber `#8F4506`, red `#A3201C` | Prelaunch placeholders and genuine failures. Nothing else |

**Why teal, and why not AWS orange or Azure blue:** both of those are owned. Teal is
not a cloud-vendor colour, which is the point — a buyer who sees teal does not file
CAVELDON under "another AWS reseller", and a buyer scanning the page can still tell
which of the four practices they are looking at.

**Verified contrast after the change:**

| Pair | Ratio | Need |
|---|---|---|
| Navy on teal (primary button) | 5.96:1 | 4.5 |
| Navy on teal-deep (hover) | 4.50:1 | 4.5 |
| Paper on teal-ink (ghost hover) | 5.50:1 | 4.5 |
| Night on night-teal (button in a dark band) | 9.85:1 | 4.5 |
| Teal on navy (decorative on a dark band) | 5.96:1 | 3.0 |
| Navy on paper (body text, unchanged) | 16.81:1 | 4.5 |

**The rule to protect:** if a fifth colour is ever proposed, the answer is no. The
four practice colours are wayfinding, not decoration, and the accent is the only
saturated colour allowed to carry an action.
