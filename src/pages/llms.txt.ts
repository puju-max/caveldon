import type { APIRoute } from 'astro';
import { site } from '../data/site';
import { homeFaqs, soc2Faqs, startupFaqs } from '../data/faq';
import { studies } from '../data/work.js';
import { visibleInsights } from '../lib/content';

// A plain-text summary for AI assistants and agents (llmstxt.org format).
// Google Search ignores it; some AI tools read it. Cheap to keep accurate because it is generated.
export const GET: APIRoute = async () => {
  const base = (import.meta.env.PUBLIC_SITE_URL || '').trim().replace(/\/$/, '');
  const url = (p: string) => `${base}${p}`;
  const posts = await visibleInsights();
  const f = site.founder;
  const lines = [
    `# ${site.name}`,
    '',
    `> ${site.description}`,
    '',
    `${site.name} is a founder-led cloud and operational engineering practice, working with AWS and Azure. ` +
      `Core practices: cloud and platform engineering; security, governance and compliance readiness; reliability, operations and FinOps. ` +
      `AI infrastructure is a developing technical practice. Example Engineering Lab studies are reference designs, not completed client work. ` +
      `CAVELDON engagements, prior professional experience and Engineering Lab work are identified separately. ` +
      `Project delivery, pricing and response commitments are agreed per engagement. CAVELDON does not issue audit reports, certifications or legal opinions.` +
      (f.name ? ` Founder: ${f.name}, ${f.role}.` : ''),
    '',
    '## Services',
    `- [Services](${url('/services/')}): cloud setup, migration and modernization across AWS and Azure, security and governance readiness, reliability, cost efficiency, and developing AI infrastructure work`,
    `- [For startups](${url('/startups/')}): a focused resource on startup cloud foundations and investor-readiness questions`,
    `- [SOC 2 technical readiness](${url('/soc-2/')}): what SOC 2 cloud technical readiness involves, Type I vs Type II, and the controls we build`,
    `- [Regulated customers](${url('/services/security-compliance/')}): cloud engineering controls for sensitive or regulated workloads`,
    `- [Cloud setup for small teams](${url('/setup/')}): a fixed-scope setup engagement for a team that knows the code but not the infrastructure — one application, one environment, on AWS or Azure. Includes the honest AWS-versus-Azure trade-offs`,
    `- [The small-environment checklist](${url('/checklist/')}): a free checklist for teams running one application in the cloud — access, network, workload, deployments, data, monitoring, cost and handover`,
    `- [Every layer, from the inside](${url('/experience/')}): the disciplines behind CAVELDON — hosting, support, DevOps, SRE, DevSecOps, security, cost, governance and AI infrastructure — and the seams where cloud systems actually fail. Professional experience before CAVELDON, clearly labelled`,
    `- [Partner with CAVELDON](${url('/partner/')}): white-label cloud, security and managed-operations delivery for MSPs — the MSP keeps the client, the credit and the margin; wholesale is 70% of the published list price`,
    `- [Community and profiles](${url('/community/')}): every CAVELDON profile, what each channel is for, and the rules CAVELDON follows in third-party communities`,
    `- [RSS feed](${url('/rss.xml')}): all guides and reference designs in one feed`,
    '',
    '## Reference designs',
    ...studies.map(s => `- [${s.title}](${url(`/work/${s.slug}/`)}): ${s.summary}`),
    ...(posts.length ? ['', '## Guides', ...posts.map(p => `- [${p.data.title}](${url(`/insights/${p.id}/`)}): ${p.data.description}`)] : []),
    '',
    '## Common questions',
    ...[...homeFaqs, ...startupFaqs, ...soc2Faqs].map(q => `- ${q.q} ${q.a.join(' ')}`),
    '',
    '## Contact',
    `- [Contact CAVELDON about a cloud engineering project](${url('/contact/')})`,
    `- [Privacy notice](${url('/privacy/')})`,
    `- [Legal notice](${url('/legal/')})`,
    '',
  ];
  return new Response(lines.join('\n'), { headers: { 'Content-Type': 'text/plain; charset=utf-8' } });
};
