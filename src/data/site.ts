/**
 * YOUR DETAILS: edit this one file to put real information on the site.
 *
 * Any empty value shows as an amber [placeholder] while the site is in prelaunch mode,
 * so you can see what is missing. When PUBLIC_SITE_LIVE=true, empty values are hidden
 * automatically, so a placeholder can never reach real visitors.
 */
export const site = {
  name: 'CAVELDON',
  description: 'Cloud, platform and product engineering for growing software businesses. AWS and Azure architecture, application engineering, security and governance readiness, managed infrastructure and IT support, reliability and cloud cost efficiency.',
  shortDescription: 'Cloud systems that businesses can depend on.',

  founder: {
    name: 'Pujan Patel',
    role: 'Founder & Principal Cloud Engineer',
    // Shown on the About page once you have a team. Real people only; leave empty until then.
    team: [] as { name: string; role: string; linkedin?: string }[],
    photo: '',         // e.g. '/assets/founder.jpg'. Put the file in public/assets/. Portrait, at least 800px wide.
    linkedin: '',      // Full URL. TODO: claim https://www.linkedin.com/in/caveldon/ and paste the final URL here.
    location: 'India (IST, UTC+5:30)',
    experience: 'Building and running production systems on AWS and Azure — infrastructure and platform work, delivery pipelines, identity and access, security controls, monitoring and on-call. Most of it spent making other engineers’ releases less frightening.',
    certifications: [] as string[], // TODO: add only certifications you actually hold.
    bio: 'I run CAVELDON, a cloud and operational engineering practice. I build and run production infrastructure on AWS and Azure — platform architecture, security controls, delivery pipelines and the day-to-day operations that keep it working. I care about work you can read: written findings, version-controlled infrastructure, and evidence that the controls actually run.',
    // Industries you have REAL work experience in. Shown on the founder card. Remove any that are only contacts.
    industries: ['Cloud infrastructure', 'Security and compliance readiness', 'Managed IT operations'],
  },

  // Shown in the FAQ. US/UK/EU buyers always ask this.
  workingHours: 'We are based in India (IST, UTC+5:30) and overlap with UK and EU working hours, and with US East Coast mornings.',

  // Potential entry-point engagement. Confirm scope and price before making a public commitment.
  offer: {
    name: 'Cloud Readiness Review',
    duration: 'Timing by agreement',
    price: '$2,500',
  },
};

/** Analytics (cookie-free). Set in .env; see README. Empty = no analytics script. */
export const analytics = {
  provider: (import.meta.env.PUBLIC_ANALYTICS_PROVIDER || '').trim().toLowerCase(), // 'plausible' | 'umami' | 'cloudflare'
  id: (import.meta.env.PUBLIC_ANALYTICS_ID || '').trim(),       // Plausible: your domain · Umami: website ID · Cloudflare: beacon token
  src: (import.meta.env.PUBLIC_ANALYTICS_SRC || '').trim(),     // Optional: custom script URL (self-hosted Umami/Plausible)
};

export const isLive = import.meta.env.PUBLIC_SITE_LIVE === 'true';

/** Where every "Book a call" button goes: your scheduling link if set, otherwise the contact form. */
const booking = (import.meta.env.PUBLIC_BOOKING_URL || '').trim();
export const bookHref = booking || '/contact/#form';
export const bookIsExternal = Boolean(booking);
