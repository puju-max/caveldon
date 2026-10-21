#!/usr/bin/env node
/**
 * One-off patch: add the full-bleed dark band system and rework the hero.
 * Run from the site root: node scripts/patch-band.mjs
 */
import { readFile, writeFile } from 'node:fs/promises';

const path = 'src/styles/global.css';
let css = await readFile(path, 'utf8');
const before = css;

const BAND = `/* ---------- Full-bleed dark band ----------
   A full-width dark surface. The content column stays constrained, but the band
   runs edge to edge, so wide screens get deliberate breathing room instead of
   accidental empty paper. This is the "console" reading of the brand: the same
   navy and teal, used the way a cloud console uses them. */
.band {
  position: relative;
  background: var(--night);
  color: var(--night-text);
  border-top: 0;
  isolation: isolate;
}
.band::before {
  content: "";
  position: absolute; inset: 0; z-index: 0; pointer-events: none;
  background:
    radial-gradient(900px 480px at 78% -10%, rgba(79, 209, 197, .10), transparent 62%),
    radial-gradient(700px 420px at 8% 110%, rgba(56, 118, 191, .10), transparent 60%),
    linear-gradient(var(--night-grid) 1px, transparent 1px),
    linear-gradient(90deg, var(--night-grid) 1px, transparent 1px);
  background-size: auto, auto, 32px 32px, 32px 32px;
}
.band > .wrap { position: relative; z-index: 1; }
.band h1, .band h2, .band h3 { color: var(--night-text); }
.band p { color: var(--night-sub); }
.band .eyebrow { color: var(--night-accent-ink); }
.band .eyebrow::before { background: var(--night-accent); }
.band .label { color: var(--night-sub); }
.band .lead, .band .intro { color: var(--night-sub); }
.band .link { color: var(--night-text); text-decoration-color: var(--night-line); }
.band .link:hover { text-decoration-color: currentColor; }
.band .cell-num { color: var(--night-sub); }
.band .ticks li { color: var(--night-sub); }
.band .ticks li::before { color: var(--night-accent); }
.band .chip { background: transparent; border-color: var(--night-line); color: var(--night-sub); }
.band .chip--acc { border-color: var(--night-accent); color: var(--night-accent-ink); background: var(--night-accent-wash); }
.band .btn-ghost { border-color: var(--night-text); color: var(--night-text); }
.band .btn-ghost:hover { background: var(--night-text); color: var(--night); }
.band .btn-solid { background: var(--night-text); color: var(--night); border-color: var(--night-text); }
.band .btn-solid:hover { background: #fff; }
.band .cells { border-color: var(--night-line); }
.band .cells > * { background: var(--night-card); border-color: var(--night-line); }
.band .frame { background: var(--night-card); border-color: var(--night-line); }
.band .frame-cap { border-color: var(--night-line); color: var(--night-sub); }
.band .frame::before { background:
    linear-gradient(var(--night-accent), var(--night-accent)) top left / 12px 1.5px no-repeat,
    linear-gradient(var(--night-accent), var(--night-accent)) top left / 1.5px 12px no-repeat,
    linear-gradient(var(--night-accent), var(--night-accent)) top right / 12px 1.5px no-repeat,
    linear-gradient(var(--night-accent), var(--night-accent)) top right / 1.5px 12px no-repeat,
    linear-gradient(var(--night-accent), var(--night-accent)) bottom left / 12px 1.5px no-repeat,
    linear-gradient(var(--night-accent), var(--night-accent)) bottom left / 1.5px 12px no-repeat,
    linear-gradient(var(--night-accent), var(--night-accent)) bottom right / 12px 1.5px no-repeat,
    linear-gradient(var(--night-accent), var(--night-accent)) bottom right / 1.5px 12px no-repeat; }
.band .diag { color: var(--night-text); }
.band .diag .box { fill: var(--night-card); }
.band .diag .box-hl { fill: var(--night-accent-wash); }
.band .diag .mask { fill: var(--night-card); }
.band .diag .t-label { fill: var(--night-sub); }
.band .diag .t-sub { fill: var(--night-sub); }
.band .diag .acc { stroke: var(--night-accent); }
.band .diag .acc-dash { stroke: var(--night-accent); }
.band .diag .dot { fill: var(--night-accent); }
.band .diag .group { stroke: var(--night-sub); }
.band .bullets li { color: var(--night-sub); }
.band .bullets li::before { border-color: var(--night-accent); }
.band .svc p, .band .step p, .band .pain .fix { color: var(--night-sub); }
.band .svc .promise { color: var(--night-accent-ink); }
.band .pain:hover { background: var(--night-2); }
.band .pain .go { color: var(--night-accent-ink); }
.band .step::before { border-color: var(--night-line); }
.band .step::after { background: var(--night-accent); }
.band .row { border-color: var(--night-line); }
.band .row:hover { background: linear-gradient(90deg, var(--night-2), transparent); }
.band .row p { color: var(--night-sub); }
.band .row .arr { color: var(--night-accent); }
.band .owner-note { background: var(--night-card); border-color: var(--night-line); color: var(--night-sub); }
.band .owner-note .label { color: var(--night-accent-ink); }
.band .facts { border-color: var(--line-2); }
.band .facts div { border-color: var(--night-line); }
.band .facts dt { color: var(--night-sub); }
.band .bio { color: var(--night-sub); }
.band .callout { background: var(--night-card); border-color: var(--night-line); color: var(--night-sub); }
.band .callout strong { color: var(--night-text); }
.band .divider { border-color: var(--night-line); }
.band .mono-note { color: var(--night-sub); }
.band .num-stat { color: var(--night-text); }
.band .stat-label { color: var(--night-sub); }
.band .rule { border-color: var(--night-line); }
.band .reveal-panel { background: var(--night-card); border-color: var(--night-line); }
.band .reveal-panel h3 { color: var(--night-text); }
.band .reveal-panel p { color: var(--night-sub); }

/* ---------- Hero ---------- */
.hero { padding-block: clamp(56px, 8vw, 116px) clamp(64px, 8vw, 124px); }
.hero-grid { display: grid; grid-columns: minmax(0, 1.06fr) minmax(0, .94fr); gap: clamp(36px, 5vw, 76px); align-items: center; }
.hero h1 { margin: 6px 0 24px; font-size: clamp(40px, 5.1vw, 70px); letter-spacing: -.05em; line-height: 1.01; }
.hero .lead { font-size: clamp(18px, 1.5vw, 20.5px); line-height: 1.6; max-width: 54ch; }
.ticks { list-style: none; display: flex; flex-wrap: wrap; gap: 10px 24px; margin: 32px 0 0; padding: 0; font: 500 13px/1.5 var(--mono); }
@media (max-width: 960px) { .hero-grid { grid-template-columns: 1fr; } }
@media (max-width: 520px) { .actions .btn { width: 100%; } }
`;

// Replace the existing hero block (from the marker to the Frame comment).
const heroStart = css.indexOf('/* ---------- Hero ---------- */');
const heroEnd = css.indexOf('/* Frame with corner registration marks');
if (heroStart < 0 || heroEnd < 0) {
  console.error('anchors not found');
  process.exit(1);
}
css = css.slice(0, heroStart) + BAND + '\n' + css.slice(heroEnd);

if (css === before) { console.error('no change'); process.exit(1); }
await writeFile(path, css, 'utf8');
console.log('patched: band system + hero');
