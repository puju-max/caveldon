/**
 * Where CAVELDON shows up, and why.
 *
 * This file is the single source of truth for every profile link on the site.
 * A profile is only linked once the account actually exists — set `live: true`
 * on the day you create it. Until then the community page shows the plan and
 * the footer shows nothing, so there is never a dead link.
 *
 * Two rules that come from the research on how this buyer actually buys:
 *
 *   1. Do not open a channel you will not post in. An empty profile reads as
 *      "new agency trying to look established", which is the opposite of what
 *      an MSP owner is looking for. Fewer, alive channels beat many, dead ones.
 *
 *   2. Company accounts earn less trust than people do. On every platform
 *      where we have a choice, the post comes from the founder's personal
 *      account and the commercial relationship is disclosed. The company
 *      profile exists to be linked to, not to post from.
 *
 * The `purpose` field is a commitment, not a description. If you cannot keep
 * the cadence, delete the row rather than let it rot.
 *
 * `availability` records what we actually measured, so nobody wastes an hour
 * discovering a handle is taken. Re-check before you claim — someone else may
 * have taken one since.
 */

export type Tier = 'work' | 'founder' | 'community';
export type Availability = 'available' | 'taken' | 'unknown';
export type ChannelId =
  | 'linkedin-company' | 'linkedin-personal' | 'reddit' | 'x' | 'github'
  | 'devto' | 'hashnode' | 'medium' | 'youtube' | 'bluesky'
  | 'facebook' | 'instagram';

export interface Channel {
  id: ChannelId;
  /** Display name. */
  label: string;
  /** Two-character mark used in the badge. Keeps the engineer's-drawing look
   *  and avoids repackaging other companies' trademarked logos. */
  monogram: string;
  /** The @handle or profile path, for the copy-paste profile bios. */
  handle: string;
  /** Canonical profile URL. */
  url: string;
  /** work = the brand · founder = the person · community = where we take part. */
  tier: Tier;
  /** Who this channel is for, and what belongs there. */
  purpose: string;
  /** The commitment. */
  cadence: string;
  /** 1 = do this first, 3 = only if there is time. */
  priority: 1 | 2 | 3;
  /** Set true on the day the account exists and has a profile image. */
  live: boolean;
  /** What the handle check found, and when. */
  availability?: { checked: string; result: Availability; note?: string };
}

/** The date every handle check below was run. */
const CHECKED = '20 Oct 2026';

export const channels: Channel[] = [
  {
    id: 'linkedin-personal',
    label: 'LinkedIn (founder)',
    monogram: 'in',
    handle: 'CAVELDON founder',
    url: 'https://www.linkedin.com/in/caveldon/',
    tier: 'founder',
    purpose: 'The channel that actually reaches MSP owners and CTOs. Long-form posts about a real problem we solved, no link spam, no pitch threads.',
    cadence: '2 posts a week, 1 long-form post a fortnight',
    priority: 1,
    live: false,
    availability: { checked: CHECKED, result: 'unknown', note: 'LinkedIn rate-limited the check. Open the URL in a browser — if it 404s, the handle is yours to claim.' },
  },
  {
    id: 'github',
    label: 'GitHub',
    monogram: 'GH',
    handle: 'caveldon',
    url: 'https://github.com/caveldon',
    tier: 'work',
    purpose: 'Proof, not promotion. The open-source checker library, IaC templates and runbooks we actually use. A buyer can read the code before they book a call.',
    cadence: 'When something is genuinely reusable',
    priority: 1,
    live: false,
    availability: { checked: CHECKED, result: 'available', note: 'Confirmed free via the GitHub API (404).' },
  },
  {
    id: 'reddit',
    label: 'Reddit',
    monogram: 'r/',
    handle: 'u/caveldon',
    url: 'https://www.reddit.com/user/caveldon',
    tier: 'community',
    purpose: 'Where the buyer argues about compliance, tooling and pricing. We take part as a person with a vendor disclosure, never as a company account, and we never link in a comment.',
    cadence: '3 substantive comments a week, links capped at 10% of a thread',
    priority: 1,
    live: false,
    availability: { checked: CHECKED, result: 'unknown', note: 'Reddit blocks automated lookups. Check in a browser, and pick a variant if it is taken.' },
  },
  {
    id: 'devto',
    label: 'DEV Community',
    monogram: 'DEV',
    handle: '@caveldon',
    url: 'https://dev.to/caveldon',
    tier: 'work',
    purpose: 'Where the same guides are syndicated for reach. Written once on our own site, cross-posted with the canonical link pointing back.',
    cadence: 'Every new guide, republished within a week',
    priority: 2,
    live: false,
    availability: { checked: CHECKED, result: 'available', note: 'Confirmed free via the DEV API (404).' },
  },
  {
    id: 'hashnode',
    label: 'Hashnode',
    monogram: '#',
    handle: '@caveldon',
    url: 'https://hashnode.com/@caveldon',
    tier: 'work',
    purpose: 'Second syndication target, and the one with the better developer search. Same rule: canonical link back to us.',
    cadence: 'Every new guide, republished within a fortnight',
    priority: 2,
    live: false,
    availability: { checked: CHECKED, result: 'available', note: 'Confirmed free — the profile returns "User not found".' },
  },
  {
    id: 'linkedin-company',
    label: 'LinkedIn (company)',
    monogram: 'in',
    handle: 'CAVELDON',
    url: 'https://www.linkedin.com/company/caveldon',
    tier: 'work',
    purpose: 'A business profile to be linked to and found — not a posting account. It carries the same facts as our website so a buyer who checks it sees consistency.',
    cadence: 'Quarterly update only',
    priority: 2,
    live: false,
    availability: { checked: CHECKED, result: 'available', note: 'Confirmed free (404).' },
  },
  {
    id: 'medium',
    label: 'Medium',
    monogram: 'M',
    handle: '@caveldon',
    url: 'https://medium.com/@caveldon',
    tier: 'work',
    purpose: 'Low priority. Medium syndicates to a large audience but the conversion to a buyer is weak, and the reading experience is the least ours. Post only if the same guide is already written.',
    cadence: 'When there is a guide worth republishing',
    priority: 3,
    live: false,
    availability: { checked: CHECKED, result: 'unknown', note: 'Medium blocked the automated check.' },
  },
  {
    id: 'x',
    label: 'X',
    monogram: 'X',
    handle: '@caveldon',
    url: 'https://x.com/caveldon',
    tier: 'work',
    purpose: 'Short takes on cloud and security findings. Cheap to run, slow to convert, but it is where engineering buyers talk to each other.',
    cadence: '3 posts a week, mostly replies',
    priority: 2,
    live: false,
    availability: { checked: CHECKED, result: 'available', note: 'Confirmed free (404).' },
  },
  {
    id: 'youtube',
    label: 'YouTube',
    monogram: '▶',
    handle: '@caveldon',
    url: 'https://www.youtube.com/@caveldon',
    tier: 'work',
    purpose: 'Recorded walkthroughs of a real finding — a misconfigured SPF record, a failing restore test. Video converts far better than text for a technical buyer, but it is slow to produce.',
    cadence: 'One walkthrough a month',
    priority: 3,
    live: false,
    availability: { checked: CHECKED, result: 'available', note: 'Confirmed free (404).' },
  },
  {
    id: 'bluesky',
    label: 'Bluesky',
    monogram: 'BS',
    handle: '@caveldon.bsky.social',
    url: 'https://bsky.app/profile/caveldon.bsky.social',
    tier: 'community',
    purpose: 'A low-cost second home on a timeline people actually read. Useful mainly because the profile URL is easy to claim and points back to the site.',
    cadence: 'Mirror of X, 2 posts a week',
    priority: 3,
    live: false,
    availability: { checked: CHECKED, result: 'available', note: 'Confirmed free via the Bluesky public API ("Profile not found").' },
  },
  {
    id: 'facebook',
    label: 'Facebook',
    monogram: 'f',
    handle: 'CAVELDON',
    url: 'https://www.facebook.com/caveldon',
    tier: 'community',
    purpose: 'Rarely the place this buyer is. Worth a page only so that a name search lands somewhere real rather than an impersonation notice.',
    cadence: 'Mirror of LinkedIn company, monthly',
    priority: 3,
    live: false,
    availability: { checked: CHECKED, result: 'unknown', note: 'Facebook blocked the automated check. Verify in a browser.' },
  },
  {
    id: 'instagram',
    label: 'Instagram',
    monogram: 'IG',
    handle: '@caveldon',
    url: 'https://www.instagram.com/caveldon',
    tier: 'community',
    purpose: 'Almost no value for this buyer. A diagram or a terminal screenshot can work as a post, but this is the last channel to spend time on.',
    cadence: 'Only when a diagram is already made',
    priority: 3,
    live: false,
    availability: { checked: CHECKED, result: 'unknown', note: 'Instagram does not return a reliable status code for a missing profile. Verify in a browser.' },
  },
];

/** Profiles that actually exist. Only these get linked anywhere on the site. */
export const liveChannels = channels.filter(c => c.live);

/** Profiles that exist, filtered by tier. */
export const liveByTier = (tier: Tier) => liveChannels.filter(c => c.tier === tier);

/** The `sameAs` list for schema.org. Empty means no brand-entity links yet. */
export const sameAs = liveChannels.map(c => c.url);

export const tierLabels: Record<Tier, string> = {
  work: 'The practice',
  founder: 'The person',
  community: 'Where we take part',
};

export const tierNotes: Record<Tier, string> = {
  work: 'Channels that carry published work. Anyone can check them against what we say elsewhere.',
  founder: 'Personal profiles. People trust people, and these are where the honest version lives.',
  community: 'Places we take part as a participant. We follow the rules of the room, including the ones about not advertising.',
};

/** How many handles were confirmed free in the last check. */
export const confirmedFree = channels.filter(c => c.availability?.result === 'available').length;
