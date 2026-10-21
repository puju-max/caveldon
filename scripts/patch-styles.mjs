#!/usr/bin/env node
/** Append the redesign styles: fit grid, engagement tiers, founder placeholder, band fixes. */
import { readFile, writeFile } from 'node:fs/promises';

const path = 'src/styles/global.css';
let css = await readFile(path, 'utf8');

if (css.includes('/* ---------- Fit grid')) { console.log('already applied'); process.exit(0); }

const ADD = `
/* ---------- Fit grid (who this is for / who it is not) ---------- */
.fit-grid { display: grid; grid-template-columns: minmax(0, .85fr) minmax(0, 1.15fr); gap: 0; border: 1px solid var(--line-2); }
.fit-col { padding: clamp(22px, 3vw, 38px); background: var(--card); }
.fit-col--yes { border-right: 1px solid var(--line-2); }
.fit-head { display: flex; align-items: center; gap: 12px; font-size: 20px; margin: 0 0 20px; }
.fit-mark { display: grid; place-items: center; width: 26px; height: 26px; flex: none; font: 600 15px/1 var(--mono); border: 1.5px solid currentColor; }
.fit-col--yes .fit-head { color: var(--accent-ink); }
.fit-col--no .fit-head { color: var(--ink); }
.fit-list { list-style: none; padding: 0; margin: 0; display: grid; gap: 14px; }
.fit-list li { position: relative; padding-left: 24px; font-size: 16px; line-height: 1.55; color: var(--ink-2); }
.fit-col--yes .fit-list li::before { content: "→"; position: absolute; left: 0; top: 0; color: var(--accent-ink); font-family: var(--mono); }
.fit-col--no .fit-list li { padding-left: 0; display: grid; gap: 4px; }
.fit-col--no .fit-list b { color: var(--ink); font-weight: 600; }
.fit-col--no .fit-list span { font-size: 15.5px; }
@media (max-width: 900px) { .fit-grid { grid-template-columns: 1fr; } .fit-col--yes { border-right: 0; border-bottom: 1px solid var(--line-2); } }

/* ---------- Engagement tiers ---------- */
.tier-grid { display: grid; grid-template-columns: repeat(3, minmax(0, 1fr)); gap: 20px; }
@media (max-width: 1000px) { .tier-grid { grid-template-columns: 1fr; } }
.tier { background: var(--card); border: 1px solid var(--line-2); padding: clamp(22px, 2.8vw, 34px); display: flex; flex-direction: column; transition: border-color .2s; }
.tier:hover { border-color: var(--ink); }
.tier-for { font: 500 12px/1.4 var(--mono); letter-spacing: .06em; text-transform: uppercase; color: var(--accent-ink); margin: 0 0 14px; }
.tier-name { font-size: clamp(21px, 2.2vw, 25px); line-height: 1.2; letter-spacing: -.025em; margin: 0 0 12px; }
.tier-price { font: 600 17px/1.35 var(--sans); color: var(--ink); margin: 0 0 20px; display: grid; gap: 3px; }
.tier-price span { font: 400 13.5px/1.5 var(--mono); color: var(--ink-3); }
.tier-list { list-style: none; padding: 0; margin: 0 0 22px; display: grid; gap: 11px; }
.tier-list li { position: relative; padding-left: 20px; font-size: 15.5px; line-height: 1.5; color: var(--ink-2); }
.tier-list li::before { content: ""; position: absolute; left: 0; top: .55em; width: 7px; height: 7px; border: 1.5px solid var(--accent-ink); }
.tier .link { margin-top: auto; }
.price-note { margin-top: 28px; padding: 18px 22px; border: 1px solid var(--line-2); background: var(--card); font-size: 15.5px; line-height: 1.6; color: var(--ink-2); }
.price-note b { color: var(--ink); }

/* ---------- Founder placeholder (designed, not empty) ---------- */
.photo-ph { display: flex; flex-direction: column; align-items: center; justify-content: center; gap: 22px; text-align: center; padding: 28px 22px; height: 100%; min-height: 300px;
  font: 500 12.5px/1.7 var(--mono); color: var(--amber);
  background: repeating-linear-gradient(-45deg, transparent 0 9px, rgba(143, 69, 6, .09) 9px 10px), var(--card); }
.photo-initials { display: grid; place-items: center; width: 78px; height: 78px; border: 1.5px solid var(--amber); color: var(--amber);
  font: 700 27px/1 var(--sans); letter-spacing: -.04em; }
.photo-cta { max-width: 30ch; }
.photo-cta b { color: var(--ink); font-weight: 600; }
.photo-cta code { font-size: 11.5px; background: rgba(143, 69, 6, .1); padding: 1px 5px; border-radius: 3px; }

/* ---------- Band refinements ---------- */
/* The old .cta dark block is now the same system as .band. */
.cta { background: var(--night); color: var(--night-text); border-top: 0; position: relative; isolation: isolate; }
.cta::before { content: ""; position: absolute; inset: 0; z-index: 0; pointer-events: none;
  background: radial-gradient(900px 460px at 82% -10%, rgba(79, 209, 197, .09), transparent 62%),
              linear-gradient(var(--night-grid) 1px, transparent 1px),
              linear-gradient(90deg, var(--night-grid) 1px, transparent 1px);
  background-size: auto, 32px 32px, 32px 32px; }
.cta > .wrap { position: relative; z-index: 1; }
.cta .eyebrow { color: var(--night-accent-ink); }
.cta .eyebrow::before { background: var(--night-accent); }
.cta p:not(.eyebrow) { color: var(--night-sub); font-size: 18px; max-width: 54ch; margin-top: 18px; }
.cta .link { color: var(--night-text); text-decoration-color: var(--night-line); }
.cta .link:hover { text-decoration-color: currentColor; }
.cta .btn-light { background: var(--night-text); color: var(--night); border-color: var(--night-text); }
.cta .btn-light:hover { background: #fff; }

/* Section rules sit above the band; make sure the crosshairs still read. */
.band + .section, .section + .band { border-top: 0; }
`;

css = css.trimEnd() + '\n' + ADD;
await writeFile(path, css, 'utf8');
console.log('appended redesign styles');
