#!/usr/bin/env node
/** Insert the FitSection before the "SEE HOW WE THINK" block on the homepage. */
import { readFile, writeFile } from 'node:fs/promises';

const path = 'src/pages/index.astro';
let src = await readFile(path, 'utf8');

const marker = '  <!-- 7. SEE HOW WE THINK -->';
if (!src.includes(marker)) { console.error('marker not found'); process.exit(1); }
if (src.includes('<FitSection />')) { console.error('already inserted'); process.exit(0); }

src = src.replace(
  marker,
  '  <!-- 8. IS THIS FOR YOU -->\n  <FitSection />\n\n  <!-- 9. SEE HOW WE THINK -->'
);

// Renumber the trailing FAQ comment.
src = src.replace('<!-- 8. FAQ -->', '<!-- 10. FAQ -->');

await writeFile(path, src, 'utf8');
console.log('inserted FitSection + renumbered');
