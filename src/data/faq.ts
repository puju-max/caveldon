

export interface Faq { q: string; a: string[]; }

/** Homepage FAQ: useful questions, avoiding commitments before capacity and contracts are agreed. */
export const homeFaqs: Faq[] = [
  { q: 'Do we need to know exactly what we need?', a: ['No. Describe your situation in your own words. We can help define the technical problem before discussing a solution.'] },
  { q: 'Do you work with AWS and Azure?', a: ['Yes. We approach architecture, security, operations and costs across AWS and Azure, while accounting for the differences between their services and operating models.'] },
  { q: 'Can you help with security or an upcoming audit?', a: ['We focus on technical cloud controls, documentation, evidence and remediation. Independent auditors or appropriately qualified professionals provide formal audit reports, certifications and legal advice.'] },
  { q: 'How does an engagement start?', a: ['Start with a short inquiry. Depending on the problem, we may propose a scoped infrastructure review, implementation project or another agreed next step. Scope, availability and commercial terms are confirmed before paid work begins.'] },
  { q: 'Who is responsible for the work?', a: ['CAVELDON is founder-led. We clarify roles, responsibilities, access and handover expectations for each engagement rather than implying an established large team.'] },
  { q: 'Will you need our credentials or customer information?', a: ['Never send passwords, access keys, personal health information or client data through the initial contact form. Any access requirements should be agreed later using appropriately restricted, revocable credentials.'] },
];

/** Startups page FAQ: launching and fundraising. */
export const startupFaqs: Faq[] = [
  { q: 'What do investors check in technical due diligence?', a: [
    'Usually five things: whether the platform is reasonably secure, whether it can handle growth, what the cloud costs and why, whether more than one person can run it, and whether the company (not a contractor or a founder’s personal account) owns the code, cloud accounts and domains.'] },
  { q: 'When does technical due diligence usually happen?', a: [
    'Most often from Series A onwards, and earlier for deeply technical products. Earlier rounds focus more on team and market, but investors still ask basic questions about security and who controls the code and cloud accounts.'] },
  { q: 'We’re pre-seed. What’s the minimum cloud setup we need?', a: [
    'Company-owned cloud environments with separate production and testing, named access with MFA, repeatable infrastructure, an automated deployment process, tested backups and budget alerts. The appropriate level of separation and automation depends on the workload.'] },
  { q: 'Can you help us manage cloud credits and costs?', a: [
    'We can evaluate cloud architecture and spending decisions with attention to what costs may look like after credits expire.'] },
  { q: 'Can you be our DevOps team until we hire one?', a: [
    'Longer-term engineering support can be discussed after scope and capacity are confirmed. A well-documented handover should be part of any agreed engagement.'] },
];

/** SOC 2 page FAQ: plain answers to the questions people type into search and AI assistants. */
export const soc2Faqs: Faq[] = [
  { q: 'What is SOC 2, in plain English?', a: [
    'SOC 2 is a report from an independent CPA firm that says how well a service company protects its customers’ data. It’s based on the AICPA’s Trust Services Criteria. Security is always included; availability, confidentiality, processing integrity and privacy are optional.'] },
  { q: 'What’s the difference between SOC 2 Type I and Type II?', a: [
    'Type I checks that your controls are designed properly at a single point in time. Type II checks that they worked consistently over an observation period, usually 3 to 12 months. Many startups get a Type I first to unblock deals, then move to Type II.'] },
  { q: 'How long does technical SOC 2 readiness take?', a: [
    'It depends on where you start. A team with single sign-on, infrastructure as code and reviewed deployments might need a few weeks of fixes. A team with shared admin logins and manual deploys needs longer. A scoped review can help identify technical gaps and priorities before agreeing to an audit schedule.'] },
  { q: 'Which cloud engineering controls often need attention?', a: [
    'Named user access with MFA instead of shared credentials, activity logging and configuration monitoring, encryption, tested backups, separated environments and reviewed changes before production deployments.'] },
  { q: 'Do compliance platforms replace this work?', a: [
    'No. Platforms like Vanta, Drata and Secureframe can connect to cloud platforms, test settings and collect evidence. When a test fails, an engineer has to change the infrastructure. Our role can include implementing and documenting appropriate changes, with their ongoing operation assigned to an owner.'] },
  { q: 'We operate healthcare or financial systems. What changes?', a: [
    'Additional duties may apply based on the organization, sensitive information, geography and services involved. For example, HIPAA can matter to covered US healthcare entities and business associates, while DORA applies to specified EU financial entities. Technical safeguards and their evidence must be assessed against the obligations actually in scope.'] },
];
