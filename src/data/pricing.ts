/**
 * Published prices — the single source of truth.
 *
 * Pricing calibration (2026 published market rates):
 *   - India independent: $25-35 junior / $35-50 mid / $50-80 senior per hour
 *   - US / Western EU: $100-150 junior / $150-220 mid / $220-300+ senior
 *   - Fixed-scope assessment work: $3K-8K for a maturity assessment
 *   - Managed DevOps retainer: SMB $2.5K-5K/mo, mid-market $6K-15K/mo
 *   - Boutique senior-led consultancy: $8K-30K/mo
 *
 * We price on the work and the risk carried, not on geography. A founder reading this
 * should be able to tell whether we are in their range before they send a message.
 *
 * Both the homepage and the partner page read from this file, so a price can never
 * disagree with itself across the site.
 */

export interface Engagement {
  /** Practice colour number, 1-4. */
  practice: 1 | 2 | 3 | 4;
  /** Who this engagement is for. */
  for: string;
  name: string;
  /** Amount as shown on the page, e.g. '$2,500'. */
  amount: string;
  /** The numeric amount, used to derive wholesale. */
  value: number;
  /** Whether the amount is one-off or recurring. */
  recurring: boolean;
  /** Shape of the engagement. */
  per: string;
  includes: string[];
  /** Why the price holds up, or what it excludes. */
  note: string;
  cta: string;
}

export const engagements: Engagement[] = [
  {
    practice: 1,
    for: 'For a small team that needs an environment that works',
    name: 'Cloud Setup & Handover',
    amount: '$900',
    value: 900,
    recurring: false,
    per: 'fixed scope · about a week',
    includes: [
      'A working environment on AWS or Azure — chosen with you, not for you',
      'Networking, identity, compute, storage and deployment, set up and documented',
      'One production deployment pipeline, with a rollback path that has been tested',
      'Monitoring, backups and a written handover your developers can follow',
    ],
    note: 'Scoped to one application in one environment. It is not a managed service and it does not include ongoing support — that is a separate engagement. If the real problem turns out to be bigger than a setup, we will say so and price that instead.',
    cta: 'Start here',
  },
  {
    practice: 1,
    for: 'For a founder who needs an answer',
    name: 'Cloud Readiness Review',
    amount: '$2,500',
    value: 2500,
    recurring: false,
    per: 'fixed scope · 1–2 weeks',
    includes: [
      'Architecture, security, reliability and cost review of one environment',
      'Findings separated into observation and inference',
      'Prioritised roadmap with effort estimates per fix',
      'A walkthrough of the findings with the engineering owner',
    ],
    note: 'Published market range for this class of assessment is $3,000–$8,000. We start at the lower end because the scope is one environment, and because the review is designed to be the first step, not the whole engagement.',
    cta: 'Start here',
  },
  {
    practice: 2,
    for: 'For a team facing a deadline',
    name: 'Evidence & Audit Prep',
    amount: '$1,500',
    value: 1500,
    recurring: false,
    per: 'fixed scope · 1–3 weeks',
    includes: [
      'Control inventory with named owners and scope boundaries',
      'Evidence collection and gap analysis against the framework',
      'Configuration and access findings with concrete fixes',
      'Written handover your team can maintain and re-run',
    ],
    note: 'Priced for the technical controls and evidence only. Formal certification, attestation and legal opinion are issued by independent bodies and are not included.',
    cta: 'Discuss a deadline',
  },
  {
    practice: 3,
    for: 'For a team that needs hands-on help',
    name: 'Managed Infrastructure & Support',
    amount: '$1,200',
    value: 1200,
    recurring: true,
    per: 'per month · 3-month minimum',
    includes: [
      'Patching, backup and review on a documented schedule',
      'Monitoring, alerting and a written response path',
      'Restore drills with recorded recovery times',
      'Helpdesk triage, escalation and service reporting',
    ],
    note: 'Covers a single production environment and business-hours response. A 24/7 on-call commitment with minutes-level response is a different product and is priced separately.',
    cta: 'Talk about coverage',
  },
  {
    practice: 4,
    for: 'For a team that has outgrown one environment',
    name: 'Managed Infrastructure & Support — multi-environment',
    amount: '$2,200',
    value: 2200,
    recurring: true,
    per: 'per month · 3-month minimum',
    includes: [
      'Everything in the single-environment tier',
      'Multiple environments, plus shared cost and access review',
      'Quarterly cost and right-sizing review with actual savings',
      'A named engineering owner for the relationship',
    ],
    note: 'Cost visibility is part of the engagement, not an upsell. We report what we find, including the cases where the answer is to do nothing.',
    cta: 'Talk about coverage',
  },
];

/**
 * Wholesale rate for MSPs who resell the work to their own client.
 *
 * An MSP buying delivery capacity needs to make a margin on it, or there is no
 * reason to buy from us rather than hire. Wholesale is set at 70% of the
 * published list price, so a partner reselling at list still keeps 30% — a
 * normal agency margin, and enough to be worth the relationship.
 *
 * Change this one number and every wholesale price on the site moves with it.
 */
export const WHOLESALE_RATE = 0.7;

/** Wholesale amount for an engagement, as a display string. */
export function wholesale(e: Engagement): string {
  const amount = e.value * WHOLESALE_RATE;
  return `$${amount.toLocaleString('en-US', { maximumFractionDigits: 0 })}`;
}

/** The margin a partner keeps when they resell at our published list price. */
export function partnerMargin(e: Engagement): string {
  const margin = (e.value - e.value * WHOLESALE_RATE) / e.value;
  return `${Math.round(margin * 100)}%`;
}
