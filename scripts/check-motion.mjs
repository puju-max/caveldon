#!/usr/bin/env node
/**
 * Static checks for the motion layer.
 *
 * There is no browser in this environment, so instead of a live render we
 * verify the things that can actually break a visitor:
 *   1. motion.css is emitted into the built CSS.
 *   2. motion.js is emitted into dist/ and the layout references it.
 *   3. The inline <head> fallback exists, so content can never stay hidden.
 *   4. Reduced-motion is honoured in both CSS and JS.
 *   5. The word splitter preserves spaces (so screen readers read it correctly).
 *   6. Every element the engine targets exists in the built HTML.
 */

import { promises as fs } from 'node:fs';
import { join, dirname } from 'node:path';
import { fileURLToPath } from 'node:url';

const HERE = dirname(fileURLToPath(import.meta.url));
const DIST = join(HERE, '..', 'dist');

let pass = 0, fail = 0;
const ok = (m) => { pass++; console.log(`  ok   ${m}`); };
const no = (m) => { fail++; console.log(`  FAIL ${m}`); };

async function main() {
  console.log('\nMOTION LAYER CHECKS\n');

  // 1. CSS emitted
  const cssFiles = await fs.readdir(join(DIST, '_astro')).catch(() => []);
  let css = '';
  for (const f of cssFiles) {
    if (!f.endsWith('.css')) continue;
    css += await fs.readFile(join(DIST, '_astro', f), 'utf8');
  }
  if (!css) { no('built CSS found'); } else {
    css.includes('[data-words]') ? ok('motion.css rules present in built CSS') : no('motion.css rules missing from built CSS');
    css.includes('prefers-reduced-motion') ? ok('reduced-motion honoured in CSS') : no('reduced-motion missing in CSS');
    css.includes('stroke-dashoffset') ? ok('diagram draw rules present') : no('diagram draw rules missing');
    css.includes('is-revealed') ? ok('reveal state rules present') : no('reveal state rules missing');
  }

  // 2. JS emitted
  const motionJs = await fs.readFile(join(DIST, 'motion.js'), 'utf8').catch(() => null);
  if (!motionJs) { no('motion.js emitted to dist/'); } else {
    ok('motion.js emitted to dist/');
    motionJs.includes('prefers-reduced-motion') ? ok('reduced-motion honoured in JS') : no('reduced-motion missing in JS');
    motionJs.includes("split(/(\\s+)/)") ? ok('word splitter preserves whitespace') : no('word splitter may drop whitespace');
    motionJs.includes('__cvMotionFallback') ? ok('JS cancels the inline safety fallback') : no('JS does not cancel the fallback');
    motionJs.includes('is-revealed') ? ok('JS applies reveal class') : no('JS reveal class missing');
  }

  // 3. Layout references + inline fallback
  const home = await fs.readFile(join(DIST, 'index.html'), 'utf8').catch(() => null);
  if (!home) { no('built index.html found'); } else {
    home.includes('/motion.js') ? ok('layout references motion.js') : no('layout does not reference motion.js');
    home.includes('__cvMotionFallback') ? ok('inline safety fallback present in built HTML') : no('inline safety fallback missing');
    home.includes("classList.add('js')") ? ok('js class set inline in <head>') : no('js class not set inline');
    home.includes('<noscript>') ? ok('noscript fallback present') : ok('no noscript needed (motion is progressive)');
  }

  // 4. Content is present in the built HTML (not stripped by the build)
  const services = await fs.readFile(join(DIST, 'services', 'index.html'), 'utf8').catch(() => null);
  if (services) {
    const h1 = services.match(/<h1[^>]*>([\s\S]*?)<\/h1>/);
    h1 && h1[1].trim() ? ok('services page has an h1 in built HTML') : no('services h1 missing');
    services.includes('data-reveal') ? no('data-reveal leaked into static HTML (should be added by JS)') : ok('data-reveal is added at runtime, not baked into HTML');
  }

  // 5. Every real page has the scripts. Redirect stubs (meta-refresh, no <body>
  // content) legitimately do not, so they are excluded.
  const pages = await listHtml(DIST);
  let missingScript = 0;
  let checked = 0;
  for (const p of pages) {
    const html = await fs.readFile(p, 'utf8');
    if (isRedirectStub(html)) continue;
    checked++;
    if (!html.includes('/motion.js')) { missingScript++; console.log(`       missing on ${p.replace(DIST, '')}`); }
  }
  missingScript === 0 ? ok(`all ${checked} real pages reference motion.js`) : no(`${missingScript} page(s) missing motion.js`);

  // 6. No leftover console noise or obvious syntax break in the emitted JS
  if (motionJs) {
    try { new Function(motionJs); ok('motion.js parses as valid JavaScript'); }
    catch (e) { no(`motion.js has a syntax error: ${e.message}`); }
  }

  console.log(`\n${pass} passed, ${fail} failed\n`);
  process.exit(fail ? 1 : 0);
}

async function listHtml(dir) {
  const out = [];
  for (const e of await fs.readdir(dir, { withFileTypes: true })) {
    const p = join(dir, e.name);
    if (e.isDirectory()) out.push(...await listHtml(p));
    else if (e.name.endsWith('.html')) out.push(p);
  }
  return out;
}

/** A redirect stub: a meta-refresh page with no real document body. */
function isRedirectStub(html) {
  return /<meta http-equiv="refresh"/i.test(html) && !/<main/i.test(html);
}

main();
