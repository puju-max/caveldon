/** Helpers that build schema.org objects. Absolute URLs come from PUBLIC_SITE_URL. */
import type { Faq } from '../data/faq';
import { site } from '../data/site';

const base = () => (import.meta.env.PUBLIC_SITE_URL || '').trim().replace(/\/$/, '');
export const abs = (path: string) => `${base()}${path}`;

export function faqSchema(faqs: Faq[]) {
  return {
    '@context': 'https://schema.org',
    '@type': 'FAQPage',
    mainEntity: faqs.map(f => ({
      '@type': 'Question',
      name: f.q,
      acceptedAnswer: { '@type': 'Answer', text: f.a.join(' ') },
    })),
  };
}

export function breadcrumbSchema(items: { name: string; path: string }[]) {
  return {
    '@context': 'https://schema.org',
    '@type': 'BreadcrumbList',
    itemListElement: [{ name: 'Home', path: '/' }, ...items].map((it, i) => ({
      '@type': 'ListItem', position: i + 1, name: it.name, item: abs(it.path),
    })),
  };
}

export function serviceSchema(name: string, description: string, path: string) {
  return {
    '@context': 'https://schema.org',
    '@type': 'Service',
    name,
    description,
    url: abs(path),
    serviceType: name,
    audience: { '@type': 'BusinessAudience', name: 'Startups and SaaS companies' },
    areaServed: ['US', 'GB', 'EU'],
    provider: { '@type': 'ProfessionalService', name: site.name, url: abs('/') },
  };
}

export function personSchema() {
  const f = site.founder;
  if (!f.name) return null;
  return {
    '@type': 'Person',
    name: f.name,
    jobTitle: f.role,
    worksFor: { '@type': 'Organization', name: site.name },
    ...(f.linkedin ? { sameAs: [f.linkedin] } : {}),
    ...(f.certifications.length ? { hasCredential: f.certifications.map(c => ({ '@type': 'EducationalOccupationalCredential', name: c })) } : {}),
  };
}
