import { defineCollection } from 'astro:content';
import { glob } from 'astro/loaders';
import { z } from 'astro/zod';

// The article catalogue is generated directly from Markdown files.
// Add one file to src/content/insights/ to add a page and a library card.
const insights = defineCollection({
  loader: glob({ pattern: '**/*.md', base: './src/content/insights' }),
  schema: z.object({
    title: z.string().min(8),
    description: z.string().min(20),
    category: z.enum(['architecture','reliability','automation','governance','finops','ai-infrastructure']),
    eyebrow: z.string(),
    readMinutes: z.number().int().min(1).max(99),
    cardDescription: z.string(),
    visualLabel: z.string(),
    order: z.number().int(),
    featured: z.boolean().default(false),
    draft: z.boolean().default(true),
    tags: z.array(z.string()).default([]),
    // Set when the article is published and whenever it is meaningfully updated. Shown to readers and search engines.
    pubDate: z.coerce.date().optional(),
    updated: z.coerce.date().optional(),
    // Defaults to the founder's name from src/data/site.ts.
    author: z.string().optional(),
    // Copies of this guide published elsewhere. Our page stays canonical and
    // the republished copy carries a link back, so the search engine and the
    // reader both end up here.
    syndicatedTo: z.array(z.object({ name: z.string(), url: z.string() })).default([]),
    // Set on the original when the guide was first published somewhere else
    // and we are the republication. Leave empty on original guides.
    originallyPublishedAt: z.string().optional(),
  }),
});

export const collections = { insights };
