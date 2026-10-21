import { CloudUpload, ShieldCheck, Gauge } from "lucide-react";

export const brand = {
  description: "Cloud, platform and product engineering for growing software businesses. AWS and Azure architecture, application engineering, security and governance readiness, managed infrastructure and IT support, reliability and cloud cost efficiency.",
  short: "Cloud systems that businesses can depend on.",
  founder: "Pujan Patel",
  role: "Founder & Principal Cloud Engineer",
  bio: "I run CAVELDON, a cloud and operational engineering practice. I build and run production infrastructure on AWS and Azure — platform architecture, security controls, delivery pipelines and the day-to-day operations that keep it working. I care about work you can read: written findings, version-controlled infrastructure, and evidence that the controls actually run.",
  experience: "Building and running production systems on AWS and Azure — infrastructure and platform work, delivery pipelines, identity and access, security controls, monitoring and on-call. Most of it spent making other engineers' releases less frightening.",
  hours: "We are based in India (IST, UTC+5:30) and overlap with UK and EU working hours, and with US East Coast mornings.",
};

export const services = [
  {
    id: "platform", icon: CloudUpload, title: "Cloud & Platform Engineering",
    short: "A working environment on AWS or Azure — chosen with you, not for you. Networking, identity, compute, storage and deployment, set up and documented.",
    long: "A working environment on AWS or Azure — chosen with you, not for you. Networking, identity, compute, storage and deployment, set up and documented.",
    points: ["AWS and Azure architecture", "Networking, identity, compute and storage", "Version-controlled infrastructure and delivery pipelines", "Written findings, documentation and handover"],
    approach: ["Understand the situation", "Agree the scope", "Design together", "Build and review", "Document and hand over"],
  },
  {
    id: "security", icon: ShieldCheck, title: "Security, Governance & Compliance",
    short: "Technical cloud controls, documentation, evidence and remediation. Control inventory with named owners and scope boundaries. Evidence collection and gap analysis against the framework.",
    long: "Technical cloud controls, documentation, evidence and remediation. Control inventory with named owners and scope boundaries. Evidence collection and gap analysis against the framework.",
    points: ["Named control owners and clear scope boundaries", "Identity, access and configuration checks", "Evidence collection and framework gap analysis", "Technical remediation; independent formal assurance"],
    approach: ["Define scope", "Inventory controls", "Review the evidence", "Remediate gaps", "Prepare for independent review"],
  },
  {
    id: "operations", icon: Gauge, title: "FinOps & Operational Engineering",
    short: "Combine cloud charges with utilization, latency, errors, availability and the human effort needed to operate it. Allocate costs meaningfully and change one hypothesis at a time.",
    long: "Combine cloud charges with utilization, latency, errors, availability and the human effort needed to operate it. Allocate costs meaningfully and change one hypothesis at a time.",
    points: ["Cloud costs alongside service health and utilization", "Meaningful cost allocation", "Managed infrastructure, IT support and operational runbooks", "Measured changes verified in actual conditions"],
    approach: ["Measure the service", "Allocate costs", "Form a hypothesis", "Change and observe", "Verify and document"],
  },
];

export const labDesigns = [
  {
    id: "platform", label: "Engineering Lab reference design · not client delivery", category: "Cloud platform · AWS",
    title: "A cloud platform designed for safer change.",
    summary: "A reference architecture for running a web API on AWS with repeatable releases, clear access boundaries, and observable failure modes.",
    principles: ["Resilient service placement", "Controlled releases", "Least-privilege runtime", "Observable production"],
  },
  {
    id: "security", label: "Engineering Lab reference design · not client delivery", category: "Security & compliance · AWS and Azure",
    title: "Security controls need evidence, not just intentions.",
    summary: "A cloud-control reference model showing how policy, identity, configuration checks and operational evidence can support audit readiness.",
    principles: ["Start with scope", "Turn policy into checks", "Preserve traceable evidence", "Keep assurance independent"],
  },
  {
    id: "efficiency", label: "Engineering Lab reference design · not client delivery", category: "Reliability & cost · AWS and Azure",
    title: "Make infrastructure efficient without making it fragile.",
    summary: "A practical measurement-first framework for balancing cloud spend, performance, availability and the time teams spend operating systems.",
    principles: ["Measure the whole service", "Allocate costs meaningfully", "Change one hypothesis at a time", "Verify in actual conditions"],
  },
];

export const engagements = [
  { id: "setup", title: "Cloud Setup & Handover", amount: 900, currency: "USD", recurring: false, duration: "~1 week", fixedScope: true, minimumMonths: 0 },
  { id: "readiness", title: "Cloud Readiness Review", amount: 2500, currency: "USD", recurring: false, duration: "1–2 weeks", fixedScope: true, minimumMonths: 0 },
  { id: "evidence", title: "Evidence & Audit Prep", amount: 1500, currency: "USD", recurring: false, duration: "1–3 weeks", fixedScope: true, minimumMonths: 0 },
  { id: "managed", title: "Managed Infrastructure & Support", amount: 1200, currency: "USD", recurring: true, duration: "", fixedScope: false, minimumMonths: 3 },
  { id: "multi", title: "Multi-environment Support", amount: 2200, currency: "USD", recurring: true, duration: "", fixedScope: false, minimumMonths: 3 },
];

export function formatPrice(engagement: (typeof engagements)[number]) {
  return `$${engagement.amount.toLocaleString("en-US")}${engagement.recurring ? "/month" : ""}`;
}

export const posts = [
  { slug: "aws-production-readiness", tag: "Production readiness", title: "AWS production readiness: what to check before you go live", excerpt: "Practical checklist for production AWS." },
  { slug: "cloud-governance-audit-readiness", tag: "Security & governance", title: "Cloud governance and audit readiness", excerpt: "How to prepare cloud controls for review." },
  { slug: "elastic-beanstalk-vs-ecs", tag: "Cloud platforms", title: "Elastic Beanstalk vs ECS: choosing the right container platform", excerpt: "Comparison guide." },
  { slug: "repeatable-aws-deployments", tag: "Delivery pipelines", title: "Repeatable AWS deployments", excerpt: "Infrastructure-as-code deployment strategies." },
];

export const homeFaq = [
  ["Do we need to know exactly what we need?", "No. Describe your situation in your own words. We can help define the technical problem before discussing a solution."],
  ["Do you work with AWS and Azure?", "Yes. We approach architecture, security, operations and costs across AWS and Azure, while accounting for the differences between their services and operating models."],
  ["Can you help with security or an upcoming audit?", "We focus on technical cloud controls, documentation, evidence and remediation. Independent auditors or appropriately qualified professionals provide formal audit reports, certifications and legal advice."],
  ["How does an engagement start?", "Start with a short inquiry. Depending on the problem, we may propose a scoped infrastructure review, implementation project or another agreed next step. Scope, availability and commercial terms are confirmed before paid work begins."],
  ["Who is responsible for the work?", "CAVELDON is founder-led. We clarify roles, responsibilities, access and handover expectations for each engagement rather than implying an established large team."],
  ["Will you need our credentials or customer information?", "Never send passwords, access keys, personal health information or client data through the initial contact form. Any access requirements should be agreed later using appropriately restricted, revocable credentials."],
];

export const soc2Faq = [
  ["What is SOC 2, in plain English?", "SOC 2 is a report from an independent CPA firm that says how well a service company protects its customers' data. It's based on the AICPA's Trust Services Criteria."],
  ["Type I vs Type II?", "Type I checks controls at a single point in time. Type II checks they worked consistently over 3-12 months."],
  ["How long does readiness take?", "Depends on where you start. A team with SSO, IaC and reviewed deployments might need a few weeks. A team with shared admin logins needs longer."],
  ["Which controls need attention?", "Named user access with MFA, activity logging, encryption, tested backups, separated environments and reviewed changes."],
  ["Do compliance platforms replace this work?", "No. Platforms like Vanta, Drata and Secureframe test settings and collect evidence. When a test fails, an engineer has to change the infrastructure."],
];
