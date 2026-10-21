#!/usr/bin/env node
/**
 * Progressive disclosure pass.
 *
 * Long content is the classic scroll killer: the reader reaches the bottom and
 * cannot find the button. The fix is not shorter writing — it is letting the
 * reader choose depth. Summary always visible, detail one click away, in place.
 */
import { readFile, writeFile } from 'node:fs/promises';

// ---- 1. CSS ----
{
  const path = 'src/styles/global.css';
  let css = await readFile(path, 'utf8');

  if (!css.includes('/* ---------- Progressive disclosure')) {
    css = css.trimEnd() + `

/* ---------- Progressive disclosure ----------
   Summary is always visible. Detail expands in place so the reader keeps their
   position. Native <details> means keyboard, screen readers and crawlers all
   work without JavaScript, and the content stays in the DOM for search. */

.readmore { border-top: 1px solid var(--line-2); border-bottom: 1px solid var(--line-2); }
.readmore:first-of-type { border-top: 0; }
.readmore > summary {
  list-style: none; cursor: pointer;
  display: flex; align-items: flex-start; justify-content: space-between; gap: 20px;
  padding: 18px 0;
}
.readmore > summary::-webkit-details-marker { display: none; }
.readmore-summary { display: grid; gap: 5px; min-width: 0; }
.readmore-eyebrow { margin: 0; }
.readmore-text { color: var(--ink-2); font-size: 16px; line-height: 1.55; }
.readmore-toggle { display: inline-flex; align-items: center; gap: 8px; flex: none; padding-top: 2px; }
.readmore-label { font: 500 12px/1 var(--mono); letter-spacing: .05em; text-transform: uppercase; color: var(--accent-ink); }
.readmore-chev { transition: transform .2s var(--ease); }
.readmore[open] .readmore-chev { transform: rotate(180deg); }
.readmore[open] .readmore-label::after { content: ""; }
.readmore:hover .readmore-text { color: var(--ink); }
.readmore-body { padding: 0 0 20px; color: var(--ink-2); font-size: 16px; line-height: 1.6; max-width: 68ch; }
.readmore-body > * + * { margin-top: .8em; }
.readmore-link { margin-top: 14px; display: inline-flex; }

/* How-we-work list */
.how-list { list-style: none; padding: 0; margin: 0; border-top: 1px solid var(--line-2); }
.how-item { display: grid; grid-template-columns: 64px minmax(0, 1fr); gap: 20px; padding: 26px 0; border-bottom: 1px solid var(--line-2); }
.how-num { font: 600 13px/1.9 var(--mono); color: var(--accent-ink); }
.how-head { display: flex; align-items: baseline; justify-content: space-between; gap: 16px; flex-wrap: wrap; margin-bottom: 8px; }
.how-head h3 { font-size: 21px; margin: 0; }
.how-time { font: 500 12px var(--mono); color: var(--ink-3); letter-spacing: .04em; white-space: nowrap; }
.how-summary { color: var(--ink-2); font-size: 16.5px; line-height: 1.55; margin: 0 0 12px; max-width: 66ch; }
.how-detail > summary { list-style: none; cursor: pointer; display: inline-flex; align-items: center; gap: 8px;
  font: 500 12px/1 var(--mono); letter-spacing: .05em; text-transform: uppercase; color: var(--accent-ink); }
.how-detail > summary::-webkit-details-marker { display: none; }
.how-detail svg { transition: transform .2s var(--ease); }
.how-detail[open] svg { transform: rotate(180deg); }
.how-detail[open] .how-detail-label::after { content: ""; }
.how-detail ul { list-style: none; padding: 0; margin: 16px 0 0; display: grid; gap: 12px; max-width: 68ch; }
.how-detail li { position: relative; padding-left: 20px; color: var(--ink-2); font-size: 16px; line-height: 1.55; }
.how-detail li::before { content: ""; position: absolute; left: 0; top: .6em; width: 7px; height: 7px; border: 1.5px solid var(--accent-ink); }
@media (max-width: 620px) { .how-item { grid-template-columns: 40px minmax(0, 1fr); gap: 12px; } }

/* FAQ answers collapse to a tighter block */
.faq .answer { font-size: 15.5px; }
.faq details[open] .answer { animation: fadein .3s var(--ease); }
@keyframes fadein { from { opacity: 0; transform: translateY(-4px); } to { opacity: 1; transform: none; } }
@media (prefers-reduced-motion: reduce) { .faq details[open] .answer { animation: none; } }
`;
    console.log('css: disclosure styles added');
  }
  await writeFile(path, css, 'utf8');
}

// ---- 2. homepage: use HowWeWork, drop the old inline "how" section ----
{
  const path = 'src/pages/index.astro';
  let src = await readFile(path, 'utf8');

  if (!src.includes("import HowWeWork")) {
    src = src.replace(
      "import StartHere from '../components/StartHere.astro';",
      "import StartHere from '../components/StartHere.astro';\nimport HowWeWork from '../components/HowWeWork.astro';"
    );
  }

  // Replace the old inline "how" section with the component.
  const start = src.indexOf('  <!-- 4. HOW IT WORKS -->');
  const end = src.indexOf('  <!-- 5. STARTING ENGAGEMENTS -->');
  if (start > 0 && end > start) {
    src = src.slice(0, start) + '  <!-- 4. HOW IT WORKS -->\n  <HowWeWork />\n\n' + src.slice(end);
    console.log('homepage: HowWeWork component wired');
  }

  await writeFile(path, src, 'utf8');
}
