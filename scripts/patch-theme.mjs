#!/usr/bin/env node
/**
 * Theme redesign + scanner styles.
 *
 * The brief: keep the "engineer's drawing" idea but make it work better for the
 * agency, use colour with intent, and add the pieces that drive clients.
 *
 * What changes visually:
 *   - A wider, calmer page rhythm and a slightly larger reading measure.
 *   - The practice colour system extended onto cards, tiers, and the section bands.
 *   - A new "signal" strip on the homepage: real numbers, not adjectives.
 *   - The scanner page styles.
 */
import { readFile, writeFile } from 'node:fs/promises';

const path = 'src/styles/global.css';
let css = await readFile(path, 'utf8');

if (css.includes('/* ---------- Scanner')) { console.log('theme already applied'); process.exit(0); }

const ADD = `
/* ---------- Scanner ---------- */
.scan-wrap { max-width: 880px; }
.scan-form { margin: 0 0 4px; }
.scan-label { display: block; font: 500 12px/1.4 var(--mono); letter-spacing: .06em; text-transform: uppercase; color: var(--ink-3); margin-bottom: 10px; }
.scan-input-row { display: flex; gap: 10px; flex-wrap: wrap; }
.scan-input-row input {
  flex: 1 1 260px; min-width: 0;
  background: var(--card); border: 1px solid var(--line-2); color: var(--ink);
  padding: 14px 16px; font: 400 17px/1.3 var(--mono); border-radius: 0;
}
.scan-input-row input:focus { outline: none; border-color: var(--ink); box-shadow: 0 0 0 3px var(--accent-wash); }
.scan-input-row .btn { min-height: 56px; }
.scan-help { margin: 12px 0 0; font-size: 14.5px; line-height: 1.55; color: var(--ink-3); max-width: 62ch; }
.scan-error { margin: 12px 0 0; font-size: 15px; color: var(--red); font-weight: 500; }

.scan-result { margin-top: 32px; }
.scan-summary {
  display: flex; align-items: center; gap: 28px; flex-wrap: wrap;
  border: 1px solid var(--line-2); background: var(--card);
  padding: 20px 24px; margin-bottom: 20px;
}
.scan-summary--ok { border-left: 3px solid var(--accent-ink); }
.scan-summary--warn { border-left: 3px solid var(--amber); }
.scan-summary--bad { border-left: 3px solid var(--red); }
.scan-score { display: grid; gap: 2px; }
.scan-score-n { font: 700 40px/1 var(--sans); letter-spacing: -.04em; }
.scan-summary--ok .scan-score-n { color: var(--accent-ink); }
.scan-summary--warn .scan-score-n { color: var(--amber); }
.scan-summary--bad .scan-score-n { color: var(--red); }
.scan-score-l { font: 500 12px/1.4 var(--mono); letter-spacing: .05em; text-transform: uppercase; color: var(--ink-3); }
.scan-tally { list-style: none; padding: 0; margin: 0; display: grid; gap: 8px; font-size: 15px; color: var(--ink-2); }
.scan-tally li { display: flex; align-items: center; gap: 9px; }
.tally-dot { width: 8px; height: 8px; border-radius: 50%; flex: none; }
.tally-dot.ok { background: var(--accent); }
.tally-dot.warn { background: var(--amber); }
.tally-dot.bad { background: var(--red); }

.scan-results { border-top: 1px solid var(--line-2); }
.scan-row {
  display: grid; grid-template-columns: 74px minmax(0, 1fr); gap: 16px;
  padding: 18px 0; border-bottom: 1px solid var(--line);
  animation: rise .4s var(--ease) both;
}
.scan-row--running { opacity: .55; }
.scan-mark {
  font: 600 11px/1 var(--mono); letter-spacing: .07em;
  align-self: start; padding: 5px 7px; border: 1px solid currentColor; text-align: center;
}
.scan-row--pass .scan-mark { color: var(--accent-ink); }
.scan-row--warn .scan-mark { color: var(--amber); }
.scan-row--fail .scan-mark { color: var(--red); }
.scan-row--info .scan-mark { color: var(--ink-3); }
.scan-row-body { min-width: 0; }
.scan-id { display: block; font: 500 12px/1.6 var(--mono); color: var(--ink-3); letter-spacing: .03em; margin-bottom: 4px; }
.scan-detail { font-size: 16.5px; line-height: 1.55; color: var(--ink); margin: 0; }
.scan-fix { font-size: 15px; line-height: 1.55; color: var(--ink-2); margin: 8px 0 0; }
.scan-fix b { font-family: var(--mono); font-weight: 500; font-size: 11.5px; letter-spacing: .04em; text-transform: uppercase; color: var(--ink-3); margin-right: 6px; }
.scan-foot { margin-top: 20px; font-size: 14px; line-height: 1.6; color: var(--ink-3); max-width: 70ch; }
.scan-foot b { color: var(--ink-2); font-weight: 600; }
@media (max-width: 560px) {
  .scan-row { grid-template-columns: 62px minmax(0, 1fr); gap: 12px; }
  .scan-summary { gap: 18px; }
}

/* ---------- Signal strip (real numbers, not adjectives) ---------- */
.signal-strip {
  display: grid; grid-template-columns: repeat(4, minmax(0, 1fr));
  border-top: 1px solid var(--line-2); border-left: 1px solid var(--line-2);
  margin-top: clamp(32px, 4vw, 48px);
}
.signal {
  background: var(--card); border-right: 1px solid var(--line-2); border-bottom: 1px solid var(--line-2);
  padding: clamp(20px, 2.4vw, 30px);
}
.signal-n {
  font: 700 clamp(30px, 3.4vw, 42px)/1 var(--sans); letter-spacing: -.045em;
  color: var(--sc, var(--ink)); display: block; margin-bottom: 10px;
}
.signal-l { font-size: 15px; line-height: 1.5; color: var(--ink-2); }
.signal-l b { color: var(--ink); font-weight: 600; }
@media (max-width: 860px) { .signal-strip { grid-template-columns: repeat(2, minmax(0, 1fr)); } }
@media (max-width: 520px) { .signal-strip { grid-template-columns: 1fr; } }

/* ---------- Reading rhythm ---------- */
.prose { max-width: 72ch; }

/* Slightly larger body copy on the light sections: the pages are read, not scanned. */
.section p, .intro, .lead { text-wrap: pretty; }
`;

css = css.trimEnd() + '\n' + ADD;
await writeFile(path, css, 'utf8');
console.log('theme + scanner styles applied');
