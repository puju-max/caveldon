#!/usr/bin/env node
/**
 * Wire the new components into the homepage and apply the practice colour
 * system to the service cards.
 */
import { readFile, writeFile } from 'node:fs/promises';

// ---- 1. colour system ----
{
  const path = 'src/styles/global.css';
  let css = await readFile(path, 'utf8');
  if (css.includes('--p1:')) { console.log('colour system: already applied'); }
  else {
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
    css = css.replace(anchor, palette);
    console.log('colour system: applied');
  }
  await writeFile(path, css, 'utf8');
}

// ---- 2. homepage ----
{
  const path = 'src/pages/index.astro';
  let src = await readFile(path, 'utf8');

  // import the new components
  if (!src.includes('StartHere')) {
    src = src.replace(
      "import Engagements from '../components/Engagements.astro';",
      "import Engagements from '../components/Engagements.astro';\nimport StartHere from '../components/StartHere.astro';\nimport PracticeIcon from '../components/PracticeIcon.astro';"
    );
  }

  // practice classes on the service cards
  src = src.replace(
    'const services = [\n  { id: \'setup\',',
    'const services = [\n  { id: \'setup\', p: 1,'
  );
  src = src.replace("{ id: 'security', title:", "{ id: 'security', p: 2, title:");
  src = src.replace("{ id: 'managed', title:", "{ id: 'managed', p: 3, title:");
  src = src.replace("{ id: 'reliability', title:", "{ id: 'reliability', p: 4, title:");

  // the service card markup: add practice class + icon
  src = src.replace(
    `          <article class="svc">
            <div class="svc-top"><span class="cell-num">0{i + 1}</span><span class="label">AWS · AZURE</span></div>`,
    `          <article class={\`svc practice p-\${s.p}\`}>
            <div class="svc-top"><PracticeIcon practice={s.p as 1|2|3|4} size={40} /><span class="label">AWS · AZURE</span></div>`
  );

  // insert StartHere before the FAQ section
  if (!src.includes('<StartHere />')) {
    src = src.replace(
      '  <!-- 10. FAQ -->',
      '  <!-- 9. START HERE -->\n  <StartHere />\n\n  <!-- 10. FAQ -->'
    );
  }

  await writeFile(path, src, 'utf8');
  console.log('homepage: wired');
}
