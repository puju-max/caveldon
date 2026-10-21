#!/usr/bin/env node
/**
 * Syndication pack generator.
 *
 * The rule: one guide is written once, on our own site, and every other
 * platform carries a copy that links back. That keeps a single canonical
 * version, and it means republishing is a copy-paste of generated text rather
 * than a second writing session.
 *
 * Usage:
 *   node scripts/syndicate.mjs                 # every published guide
 *   node scripts/syndicate.mjs aws-production-readiness
 *
 * Output lands in syndication/<slug>/ :
 *   dev.md        ready to paste into a DEV.to draft
 *   hashnode.md   ready to paste into a Hashnode draft
 *   linkedin.md   a long-form post
 *   x.md          three short posts
 *   checklist.md  what still has to be done by hand
 *
 * What this deliberately does NOT do: it does not post anywhere. Every
 * platform's publisher requires a human press of the button, and automatic
 * posting to a community is how accounts get banned.
 */
import { readFile, readdir, writeFile, mkdir } from 'node:fs/promises';
import { existsSync } from 'node:fs';
import path from 'node:path';

const ROOT = process.cwd();
const INSIGHTS = path.join(ROOT, 'src/content/insights');
const OUT = path.join(ROOT, 'syndication');
const BASE = (process.env.PUBLIC_SITE_URL || 'https://caveldon.com').trim().replace(/\/$/, '');

/* --------------------------- tiny YAML frontmatter --------------------------- */

function parseFrontmatter(raw) {
  const m = raw.match(/^---\r?\n([\s\S]*?)\r?\n---\r?\n?/);
  if (!m) return { data: {}, body: raw };
  const data = {};
  let key = null;
  let list = null;
  for (const line of m[1].split(/\r?\n/)) {
    if (/^\s*-\s+/.test(line) && key) {
      list.push(line.replace(/^\s*-\s+/, '').trim().replace(/^['"]|['"]$/g, ''));
      continue;
    }
    const kv = line.match(/^([A-Za-z0-9_]+):\s*(.*)$/);
    if (!kv) continue;
    key = kv[1];
    const value = kv[2].trim();
    if (value === '') {
      list = [];
      data[key] = list;
      continue;
    }
    list = null;
    data[key] = value.replace(/^['"]|['"]$/g, '');
  }
  return { data, body: raw.slice(m[0].length) };
}

/** Clean the body for a third-party platform. */
function cleanBody(body) {
  return body
    // The callout becomes a blockquote, which reads as an aside on every platform.
    .replace(/<p class="article-callout">\s*(<strong>.*?<\/strong>)?\s*([\s\S]*?)<\/p>/g,
      (_, strong, rest) => `> ${strong ? strong + ' ' : ''}${String(rest).trim()}\n`)
    .replace(/<code>(.*?)<\/code>/g, '`$1`')
    .replace(/<\/?p>/g, '')
    .replace(/\n{3,}/g, '\n\n')
    .trim();
}

/* --------------------------------- channels --------------------------------- */

/**
 * Platform front-matter. These are the real keys each publisher's API and
 * editor accept. Getting them wrong means the canonical link is silently
 * dropped, so they are declared once, here.
 */
const TARGETS = {
  devto: {
    file: 'dev.md',
    front: (p) => [
      `title: "${p.title}"`,
      `published: ${p.pubDate}`,
      `description: "${p.description}"`,
      `tags: ${JSON.stringify(p.tags.slice(0, 4).map(t => t.toLowerCase().replace(/[^a-z0-9]/g, '-')))}`,
      `canonical_url: ${p.url}`,
      `cover_image: ${BASE}/og.png`,
      `series: "CAVELDON field notes"`,
    ],
  },
  hashnode: {
    file: 'hashnode.md',
    front: (p) => [
      `title: "${p.title}"`,
      `subtitle: "${p.description}"`,
      `published: ${p.pubDate}`,
      `tags: ${JSON.stringify(p.tags.slice(0, 4).map(t => t.toLowerCase().replace(/[^a-z0-9]/g, '-')))}`,
      `coverImage: ${BASE}/og.png`,
    ],
    after: (p) =>
      `\n\n---\n\n*Originally published on [CAVELDON](${p.url}). That link is the canonical copy — please point to it rather than this one.*\n`,
  },
};

function linkedinPost(p) {
  return `${p.title}

${p.description}

The short version:

• What the control actually protects
• What a reviewer will check
• Where it usually breaks in practice
• What to do first when it does

Full guide (free, no signup): ${p.url}

I write up what we learn building and running cloud systems for growing teams.
If it is useful, share it with whoever owns that part of your stack.

#cloud #aws #devops #security #engineering`;
}

function xPosts(p) {
  return [
    `1/ ${p.title}\n\n${p.description}\n\n${p.url}`,
    `2/ The part most teams get wrong: having the tool is not the same as having the evidence. A reviewer asks for proof that the control runs, not that it could run.`,
    `3/ Full guide, free: ${p.url}\n\nWritten for teams who want it to be right, not for a demo.`,
  ].join('\n\n---\n\n');
}

function checklist(p) {
  return `# Publishing checklist — ${p.title}

The content is generated. These steps are not, and they are the ones that
actually decide whether the post reads like a person or like a machine.

- [ ] Read the guide once, end to end, as a reader who does not know us.
- [ ] Add one sentence at the top that only we would know — a client situation,
      a number from our own work, or a mistake we made. This is the part that
      gets it read.
- [ ] Open the target platform and create the draft. Paste the generated file.
- [ ] Set the canonical link field (\`canonical_url\` on DEV, "Canonical URL" in the Hashnode editor).
- [ ] Choose a cover image, or let the default stand.
- [ ] Publish.
- [ ] Add the published URL to \`syndicatedTo\` in
      \`src/content/insights/${p.slug}.md\` and rebuild, so our own page lists it.
- [ ] Post the short versions to X and the long version to LinkedIn, from a
      personal account, with the vendor disclosure in the first line.
- [ ] Do not post the same link in a community thread unless the thread
      explicitly allows it.

Canonical URL for this guide:
${p.url}
`;
}

/* ---------------------------------- run ---------------------------------- */

async function main() {
  if (!existsSync(INSIGHTS)) {
    console.error('No insights collection found at src/content/insights');
    process.exit(1);
  }
  const files = (await readdir(INSIGHTS)).filter(f => f.endsWith('.md'));
  const only = process.argv[2];

  let made = 0;
  for (const file of files) {
    const slug = file.replace(/\.md$/, '');
    if (only && slug !== only) continue;

    const raw = await readFile(path.join(INSIGHTS, file), 'utf8');
    const { data, body } = parseFrontmatter(raw);

    if (data.draft === 'true') {
      console.log(`skip  ${slug} (draft)`);
      continue;
    }

    const url = `${BASE}/insights/${slug}/`;
    const title = data.title || slug;
    const description = data.description || '';
    const pubDate = data.pubDate || new Date().toISOString().slice(0, 10);
    const tags = String(data.tags || '')
      .split(',')
      .map(t => t.trim())
      .filter(Boolean);

    const p = { slug, title, description, pubDate, tags, url, body: cleanBody(body) };

    const dir = path.join(OUT, slug);
    await mkdir(dir, { recursive: true });

    for (const [name, target] of Object.entries(TARGETS)) {
      const front = target.front(p).join('\n');
      const extra = target.after ? target.after(p) : '';
      const md = `---\n${front}\n---\n\n${p.body}\n${extra}`;
      await writeFile(path.join(dir, target.file), md, 'utf8');
      console.log(`  ${name.padEnd(9)} ${target.file}`);
    }

    await writeFile(path.join(dir, 'linkedin.md'), linkedinPost(p), 'utf8');
    await writeFile(path.join(dir, 'x.md'), xPosts(p), 'utf8');
    await writeFile(path.join(dir, 'checklist.md'), checklist(p), 'utf8');
    console.log(`  written  syndication/${slug}/`);
    made++;
  }

  console.log(`\n${made} guide(s) prepared. Nothing was posted anywhere — every platform still needs a human to press publish.`);
}

main().catch(e => {
  console.error(e);
  process.exit(1);
});
