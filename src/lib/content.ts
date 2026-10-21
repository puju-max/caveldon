import { getCollection } from 'astro:content';

/** Hide draft articles automatically when the real site goes public. */
export async function visibleInsights() {
  const live = import.meta.env.PUBLIC_SITE_LIVE === 'true';
  const articles = await getCollection('insights', ({ data }) => !live || !data.draft);
  return articles.sort((a, b) => a.data.order - b.data.order);
}

export const categoryLabels = {
  architecture: 'Architecture',
  reliability: 'Reliability',
  automation: 'Automation',
  governance: 'Governance',
  finops: 'FinOps',
  'ai-infrastructure': 'AI Infrastructure',
};
