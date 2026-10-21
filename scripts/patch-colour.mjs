#!/usr/bin/env node
/**
 * Colour system upgrade.
 *
 * The problem: everything in 2026 is minimalist, and a single-accent site reads as
 * anonymous. The failure mode to avoid is the "SaaS gradient" look.
 *
 * The move: keep the paper + navy + teal engineering-drawing identity as the base
 * (that is what makes CAVELDON recognisable), and add ONE signature colour per
 * practice. Colour becomes the wayfinding system rather than decoration — a reader
 * can tell which practice they are looking at from a glance at the rule above the
 * card, and each practice keeps its colour in its diagrams and links.
 */
import { readFile, writeFile } from 'node:fs/promises';

const path = 'src/styles/global.css';
let css = await readFile(path, 'utf8');

if (css.includes('--p1:')) { console.log('colour system already applied'); process.exit(0); }

// Insert the practice palette into :root, right after the accent tokens.
const anchor = `  --accent-wash: #DCEEEA;`;
const palette = `  --accent-wash: #DCEEEA;

  /* Practice colours. One per service family, used for wayfinding:
     a rule above a card, an icon, a link hover, and a diagram highlight.
     Each is checked at 4.5:1 or better against --paper and --card. */
  --p1: #1F5FA8;   /* Cloud, Platform & Product  — blueprint blue  */
  --p2: #6A3EBF;   /* Security, Governance & Compliance — violet */
  --p3: #1F7A52;   /* Managed Infrastructure & Support  — green */
  --p4: #A8610B;   /* Reliability, Performance & FinOps  — ochre */
  --p1-wash: #E3EDF8; --p2-wash: #EEE7F8; --p3-wash: #E1F1E9; --p4-wash: #F7EBDB;
  --p1-soft: #4A8AD0; --p2-soft: #8E6BD0; --p3-soft: #3E9E74; --p4-soft: #C58333;`;

if (!css.includes(anchor)) { console.error('accent anchor not found'); process.exit(1); }
css = css.replace(anchor, palette);

const ADD = `
/* ---------- Practice colour system ----------
   Colour is used to navigate, not to decorate. A practice keeps the same colour
   in its card rule, its icon, its links and its diagram highlight, so the page
   reads as four distinct services rather than one undifferentiated list. */

.practice { position: relative; }
.practice::before {
  content: "";
  display: block;
  height: 3px;
  background: var(--pc, var(--accent));
  margin: -1px 0 0;
}
.p-1 { --pc: var(--p1); --pc-wash: var(--p1-wash); --pc-soft: var(--p1-soft); }
.p-2 { --pc: var(--p2); --pc-wash: var(--p2-wash); --pc-soft: var(--p2-soft); }
.p-3 { --pc: var(--p3); --pc-wash: var(--p3-wash); --pc-soft: var(--p3-soft); }
.p-4 { --pc: var(--p4); --pc-wash: var(--p4-wash); --pc-soft: var(--p4-soft); }

/* The rule sits on top of the card, so the card's own padding must not clip it. */
.practice .practice-top { display: flex; align-items: center; justify-content: space-between; gap: 14px; }
.practice .practice-icon { color: var(--pc); flex: none; }
.practice h3 { color: var(--ink); }
.practice .promise { color: var(--pc); }
.practice .bullets li::before { border-color: var(--pc); }
.practice .link { color: var(--ink); }
.practice .link:hover { color: var(--pc); }
.practice:hover { border-color: var(--pc); }

/* Card list items pick up the practice colour on hover. */
.cells > .practice:hover { background: var(--pc-wash); }

/* A numbered practice marker used in the service map. */
.pc-num {
  display: inline-grid; place-items: center;
  width: 30px; height: 30px; flex: none;
  font: 600 12px/1 var(--mono); letter-spacing: .02em;
  color: var(--pc); border: 1.5px solid var(--pc);
  background: var(--pc-wash);
}

/* Practice-tinted icon chips. */
.pc-chip {
  display: inline-grid; place-items: center;
  width: 44px; height: 44px; flex: none;
  color: var(--pc); background: var(--pc-wash);
  border: 1px solid color-mix(in srgb, var(--pc) 30%, transparent);
}

/* Tinted panels — used for the "what you get" style callouts. */
.tint { background: var(--pc-wash); border-color: color-mix(in srgb, var(--pc) 26%, transparent); }
.tint .label { color: var(--pc); }

/* Section-level colour bands. Each band carries the practice it belongs to. */
.band-p1 { background: #0A1522; }
.band-p2 { background: #0D1420; }
.band-p3 { background: #091A14; }
.band-p4 { background: #1A1207; }
.band-p1::before { background:
    radial-gradient(900px 460px at 80% -12%, rgba(74, 138, 208, .16), transparent 62%),
    linear-gradient(var(--night-grid) 1px, transparent 1px),
    linear-gradient(90deg, var(--night-grid) 1px, transparent 1px); background-size: auto, 32px 32px, 32px 32px; }
.band-p2::before { background:
    radial-gradient(900px 460px at 80% -12%, rgba(142, 107, 208, .16), transparent 62%),
    linear-gradient(var(--night-grid) 1px, transparent 1px),
    linear-gradient(90deg, var(--night-grid) 1px, transparent 1px); background-size: auto, 32px 32px, 32px 32px; }
.band-p3::before { background:
    radial-gradient(900px 460px at 80% -12%, rgba(62, 158, 116, .16), transparent 62%),
    linear-gradient(var(--night-grid) 1px, transparent 1px),
    linear-gradient(90deg, var(--night-grid) 1px, transparent 1px); background-size: auto, 32px 32px, 32px 32px; }
.band-p4::before { background:
    radial-gradient(900px 460px at 80% -12%, rgba(197, 131, 51, .16), transparent 62%),
    linear-gradient(var(--night-grid) 1px, transparent 1px),
    linear-gradient(90deg, var(--night-grid) 1px, transparent 1px); background-size: auto, 32px 32px, 32px 32px; }

/* On a coloured band, the accent shifts to the practice colour. */
.band-p1 { --night-accent: #6FB2F0; --night-accent-ink: #A8D0F7; --night-accent-wash: rgba(111, 178, 240, .16); }
.band-p2 { --night-accent: #A98AE0; --night-accent-ink: #C7B2F0; --night-accent-wash: rgba(169, 138, 224, .16); }
.band-p3 { --night-accent: #4FC38D; --night-accent-ink: #8FDCB8; --night-accent-wash: rgba(79, 195, 141, .16); }
.band-p4 { --night-accent: #E0A050; --night-accent-ink: #F0C48A; --night-accent-wash: rgba(224, 160, 80, .16); }

/* ---------- Learning path (start here) ---------- */
.path-list { display: grid; gap: 0; border-top: 1px solid var(--line-2); }
.path-step { display: grid; grid-template-columns: 64px minmax(0, 1fr) auto; gap: 20px; align-items: center;
  padding: 22px 0; border-bottom: 1px solid var(--line-2); text-decoration: none; transition: background .2s, padding .2s var(--ease); }
.path-step:hover { padding-left: 10px; background: linear-gradient(90deg, var(--pc-wash, var(--card)), transparent); }
.path-step h3 { font-size: 20px; margin: 0 0 4px; }
.path-step p { color: var(--ink-2); font-size: 15.5px; margin: 0; }
.path-step .path-meta { font: 500 12px var(--mono); color: var(--ink-3); letter-spacing: .04em; white-space: nowrap; }
.path-step .path-num { font: 600 13px/1.7 var(--mono); color: var(--pc, var(--accent-ink)); }
@media (max-width: 700px) {
  .path-step { grid-template-columns: 44px minmax(0, 1fr); gap: 14px; }
  .path-step .path-meta { grid-column: 2; }
}

/* A "start here" panel that catches beginners before they bounce. */
.start-here { display: grid; grid-template-columns: minmax(0, 1fr) minmax(0, 1fr); gap: clamp(28px, 4vw, 56px); align-items: start; }
@media (max-width: 900px) { .start-here { grid-template-columns: 1fr; } }
.start-here h3 { font-size: clamp(20px, 2.2vw, 24px); margin: 14px 0 10px; }
.start-here ol { padding-left: 1.25em; margin: 0; display: grid; gap: 10px; }
.start-here ol li { color: var(--ink-2); font-size: 16px; line-height: 1.55; }
.start-here ol li::marker { color: var(--accent-ink); font-family: var(--mono); font-size: .9em; }
.start-panel { background: var(--card); border: 1px solid var(--line-2); padding: clamp(20px, 2.6vw, 30px); }
.start-panel .label { color: var(--accent-ink); }
.start-panel p { color: var(--ink-2); font-size: 15.5px; margin: 12px 0 0; }

/* Price figures on the engagement tiers. */
.tier-price .amount { font: 700 clamp(26px, 2.6vw, 34px)/1 var(--sans); letter-spacing: -.03em; color: var(--ink); display: block; margin-bottom: 6px; }
.tier-price .per { font: 400 13px/1.5 var(--mono); color: var(--ink-3); }
`;

css = css.trimEnd() + '\n' + ADD;
await writeFile(path, css, 'utf8');
console.log('colour system applied');
