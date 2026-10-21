import type { APIRoute } from 'astro';
import { site } from '../data/site';
import { studies } from '../data/work.js';
import { visibleInsights } from '../lib/content';

/**
 * RSS feed.
 *
 * This is the plumbing behind the syndication strategy: one guide is written
 * here, and the same markdown is republished to DEV, Hashnode and Medium with
 * the canonical URL pointing back at us. A feed means a human does not have to
 * copy and paste anything twice.
 *
 * The feed is also the honest alternative to a newsletter we cannot fill yet.
 */
const esc = (s: string) =>
  String(s)
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;');

export const GET: APIRoute = async () => {
  const base = (import.meta.env.PUBLIC_SITE_URL || '').trim().replace(/\/$/, '');
  const url = (p: string) => `${base}${p}`;
  const posts = await visibleInsights();

  type Item = { title: string; link: string; description: string; pubDate?: Date; category: string; guid: string };
  const items: Item[] = [];

  for (const p of posts) {
    items.push({
      title: p.data.title,
      link: url(`/insights/${p.id}/`),
      description: p.data.description,
      pubDate: p.data.pubDate,
      category: p.data.category,
      guid: url(`/insights/${p.id}/`),
    });
  }

  for (const s of studies) {
    items.push({
      title: s.title,
      link: url(`/work/${s.slug}/`),
      description: s.summary,
      category: 'reference design',
      guid: url(`/work/${s.slug}/`),
    });
  }

  const dates = items.map(i => i.pubDate?.getTime() ?? 0).filter(Boolean);
  const lastBuild = dates.length ? new Date(Math.max(...dates)).toUTCString() : new Date().toUTCString();

  const body = `<?xml version="1.0" encoding="UTF-8"?>
<rss version="2.0" xmlns:atom="http://www.w3.org/2005/Atom">
  <channel>
    <title>${esc(site.name)} — ${esc(site.shortDescription)}</title>
    <link>${esc(url('/'))}</link>
    <description>${esc(site.description)} Guides and reference designs on cloud, security, reliability and cost engineering. Written to be useful whether or not you work with us.</description>
    <language>en</language>
    <lastBuildDate>${lastBuild}</lastBuildDate>
    <atom:link href="${esc(url('/rss.xml'))}" rel="self" type="application/rss+xml" />
    <generator>Astro</generator>
${items
  .map(
    i => `    <item>
      <title>${esc(i.title)}</title>
      <link>${esc(i.link)}</link>
      <guid isPermaLink="true">${esc(i.guid)}</guid>
      <description>${esc(i.description)}</description>
      <category>${esc(i.category)}</category>${i.pubDate ? `\n      <pubDate>${i.pubDate.toUTCString()}</pubDate>` : ''}
    </item>`
  )
  .join('\n')}
  </channel>
</rss>
`;

  return new Response(body, {
    headers: {
      'Content-Type': 'application/rss+xml; charset=utf-8',
      'Cache-Control': 'public, max-age=3600',
    },
  });
};
