#!/usr/bin/env node
/**
 * Rasterise the brand avatar for the platforms that do not accept SVG.
 *
 * GitHub, Reddit, LinkedIn, X, YouTube, DEV and Hashnode all want a raster
 * image. Rather than hand-exporting eight sizes from a design tool, this
 * renders the one source SVG — public/assets/avatar.svg — at every size that
 * is actually asked for, so the mark can never drift between platforms.
 *
 * Usage:  node scripts/make-avatars.mjs
 */
import { readFile, writeFile } from 'node:fs/promises';
import path from 'node:path';
import { createRequire } from 'node:module';

const require = createRequire(import.meta.url);
const sharp = require('sharp');

const SRC = path.join(process.cwd(), 'public/assets/avatar.svg');
const OUT = path.join(process.cwd(), 'public/assets');

/**
 * What each platform asks for, so nobody has to guess later.
 *   1024 — GitHub organisation avatar (upload allows up to 1024)
 *    800 — YouTube channel picture (must be under 2MB, square)
 *    400 — LinkedIn company logo, X profile image
 *    256 — Reddit avatar (the size Reddit actually renders)
 *    128 — small / favicon fallbacks
 */
const SIZES = [1024, 800, 512, 400, 256, 128];

const svg = await readFile(SRC);

for (const size of SIZES) {
  const png = await sharp(svg, { density: 384 })
    .resize(size, size, { fit: 'contain', background: '#0A1522' })
    .png({ compressionLevel: 9 })
    .toBuffer();
  const file = path.join(OUT, `avatar-${size}.png`);
  await writeFile(file, png);
  console.log(`  avatar-${String(size).padStart(4, '0')}.png  ${(png.length / 1024).toFixed(1)} KB`);
}

console.log('\nDone. Upload avatar-1024.png to GitHub, avatar-256.png to Reddit, avatar-400.png to LinkedIn and X.');
