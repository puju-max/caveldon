import type { APIRoute } from 'astro';

// Prelaunch: block all crawlers. Live: allow everything (search engines and AI assistants) and point to the sitemap.
export const GET: APIRoute = () => {
  const live = import.meta.env.PUBLIC_SITE_LIVE === 'true';
  const site = (import.meta.env.PUBLIC_SITE_URL || '').trim().replace(/\/$/, '');
  const body = live
    ? [
        '# Search engines and AI assistants (ChatGPT, Claude, Perplexity, Gemini) are all welcome.',
        '# To stay visible in AI answers but opt out of AI model training only, uncomment the lines below.',
        '# User-agent: GPTBot',
        '# Disallow: /',
        '# User-agent: Google-Extended',
        '# Disallow: /',
        '# User-agent: CCBot',
        '# Disallow: /',
        '',
        'User-agent: *',
        'Allow: /',
        ...(site ? ['', `Sitemap: ${site}/sitemap.xml`] : []),
        '',
      ].join('\n')
    : 'User-agent: *\nDisallow: /\n';
  return new Response(body, { headers: { 'Content-Type': 'text/plain; charset=utf-8' } });
};
