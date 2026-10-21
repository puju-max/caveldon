#!/usr/bin/env node
/**
 * Post-build QA.
 *
 * Two things that are easy to break when a site is assembled from components
 * and patch scripts, and that a browser will not tell you about until someone
 * clicks the wrong thing:
 *
 *   1. Duplicate element IDs. Two components both using id="how-we-work" means
 *      the second anchor link silently scrolls to the wrong place, and the
 *      label association on aria-labelledby points at the wrong node.
 *
 *   2. Broken internal links. A link to /scan/ that was never built looks
 *      exactly like a working link until a visitor tries it.
 *
 * Run after every build:  node scripts/check-site.mjs
 */
import { readFile, readdir, stat } from 'node:fs/promises';
import { existsSync } from 'node:fs';
import path from 'node:path';

const DIST = path.join(process.cwd(), 'dist');

async function htmlFiles(dir) {
  const out = [];
  for (const entry of await readdir(dir, { withFileTypes: true })) {
    const full = path.join(dir, entry.name);
    if (entry.isDirectory()) out.push(...(await htmlFiles(full)));
    else if (entry.name.endsWith('.html')) out.push(full);
  }
  return out;
}

const files = (await htmlFiles(DIST)).sort();
let problems = 0;
const check = (ok, msg) => {
  if (!ok) { problems++; console.log(`  FAIL  ${msg}`); }
};

console.log(`Checking ${files.length} built pages…\n`);

/* ---- 1. Duplicate IDs ---- */
const idReport = [];
for (const file of files) {
  const html = await readFile(file, 'utf8');
  const ids = [...html.matchAll(/\sid="([^"]+)"/g)].map(m => m[1]);
  const seen = new Map();
  for (const id of ids) seen.set(id, (seen.get(id) || 0) + 1);
  const dupes = [...seen.entries()].filter(([, n]) => n > 1);
  if (dupes.length) {
    idReport.push([file, dupes]);
    check(false, `${path.relative(DIST, file)} — duplicate id(s): ${dupes.map(([i, n]) => `${i} (${n}×)`).join(', ')}`);
  }
}
if (!idReport.length) console.log('  ok    no duplicate element IDs on any page');

/* ---- 2. Internal links resolve ---- */
const broken = [];
for (const file of files) {
  const html = await readFile(file, 'utf8');
  const hrefs = [...html.matchAll(/\shref="(\/[^"#?]*)(?:[#?][^"]*)?"/g)].map(m => m[1]);
  for (const href of new Set(hrefs)) {
    if (href.startsWith('/_astro') || href.startsWith('/assets/')) continue;
    const target = href.endsWith('/') ? path.join(DIST, href, 'index.html') : path.join(DIST, href);
    const candidates = [target, `${target}.html`, path.join(target, 'index.html')];
    if (!candidates.some(c => existsSync(c))) broken.push([file, href]);
  }
}
if (broken.length) {
  for (const [file, href] of broken) check(false, `${path.relative(DIST, file)} — broken link: ${href}`);
} else {
  console.log('  ok    every internal link resolves to a built page');
}

/* ---- 3. Every real page has exactly one h1 (redirect stubs are exempt) ---- */
let h1Problems = 0;
for (const file of files) {
  const html = await readFile(file, 'utf8');
  // A redirect stub has no body content by design.
  if (/http-equiv="refresh"/i.test(html)) continue;
  const n = (html.match(/<h1[\s>]/g) || []).length;
  if (n !== 1) {
    h1Problems++;
    check(false, `${path.relative(DIST, file)} — ${n} <h1> elements`);
  }
}
if (!h1Problems) console.log('  ok    every real page has exactly one <h1>');

/* ---- 4. Structured data parses ---- */
let ldProblems = 0;
for (const file of files) {
  const html = await readFile(file, 'utf8');
  for (const m of html.matchAll(/<script type="application\/ld\+json"[^>]*>([\s\S]*?)<\/script>/g)) {
    try {
      JSON.parse(m[1]);
    } catch (e) {
      ldProblems++;
      console.log(`  FAIL  ${path.relative(DIST, file)} — invalid JSON-LD: ${e.message}`);
    }
  }
}
if (!ldProblems) console.log('  ok    all JSON-LD blocks parse as valid JSON');

/* ---- 5. The pages that carry the new work exist ---- */
for (const p of ['/community/', '/setup/', '/checklist/', '/partner/', '/experience/', '/insights/', '/work/']) {
  const target = path.join(DIST, p, 'index.html');
  check(existsSync(target), `missing expected page: ${p}`);
}
for (const p of ['/rss.xml', '/sitemap.xml', '/llms.txt', '/robots.txt']) {
  check(existsSync(path.join(DIST, p)), `missing expected file: ${p}`);
}
if (!problems) console.log('  ok    community, setup, checklist, partner, experience, insights, work, rss, sitemap, llms.txt and robots.txt are all present');

console.log(problems ? `\n${problems} problem(s) found.` : '\nNo problems found.');
process.exit(problems ? 1 : 0);
