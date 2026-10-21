import type { APIRoute } from 'astro';
import { studies } from '../data/work.js';
import { visibleInsights } from '../lib/content';

// Lists every public page. Empty until PUBLIC_SITE_URL is set (sitemaps need full URLs).
export const GET: APIRoute = async () => {
  const site = (import.meta.env.PUBLIC_SITE_URL || '').trim().replace(/\/$/, '');
  const paths = [
    '/', '/services/', '/services/cloud-migration/', '/startups/', '/soc-2/', '/services/security-compliance/', '/work/', '/about/', '/contact/', '/privacy/', '/legal/', '/community/', '/partner/', '/setup/', '/checklist/', '/experience/',
    ...studies.map(s => `/work/${s.slug}/`),
  ];
  const posts = await visibleInsights();
  if (posts.length) paths.push('/insights/', ...posts.map(p => `/insights/${p.id}/`));
  const urls = site ? paths.map(p => `  <url><loc>${site}${p}</loc></url>`).join('\n') : '';
  const xml = `<?xml version="1.0" encoding="UTF-8"?>\n<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">\n${urls}\n</urlset>\n`;
  return new Response(xml, { headers: { 'Content-Type': 'application/xml; charset=utf-8' } });
};
