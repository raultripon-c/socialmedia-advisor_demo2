import marcusThumb from "../../../assets/campaign-studio/video-hub/vh-marcus-chen.jpg";
import priyaThumb from "../../../assets/campaign-studio/video-hub/vh-priya-patel.jpg";
import aishaThumb from "../../../assets/campaign-studio/video-hub/vh-aisha-rahman.jpg";
import jordanThumb from "../../../assets/campaign-studio/video-hub/vh-jordan-blake.jpg";
import elenaThumb from "../../../assets/campaign-studio/video-hub/vh-elena-vasquez.jpg";
import { AmplifyImpactSummary, AmplifyTemplateId, SharePack } from "./amplifyTypes";

const captions = (prefix: string, lines: string[]) =>
  lines.map((text, index) => ({ id: `${prefix}-c${index + 1}`, text }));

export const amplifyTemplates: {
  id: AmplifyTemplateId;
  title: string;
  description: string;
}[] = [
  {
    id: "job_sourcing",
    title: "Job sourcing amplify",
    description: "Push open roles through peer networks with a hiring CTA.",
  },
  {
    id: "hiring_manager",
    title: "Hiring manager amplify",
    description: "Arm hiring managers with 1-click share packs for their reqs.",
  },
  {
    id: "erg_culture",
    title: "ERG / culture event",
    description: "Amplify community moments with authentic employee voices.",
  },
  {
    id: "benefits",
    title: "Benefits showcase",
    description: "Highlight perks and total rewards with tracked career-site links.",
  },
  {
    id: "milestone",
    title: "Milestone / onboarding",
    description: "Celebrate promotions, anniversaries, and new joinee cohorts.",
  },
];

export const demoSharePacks: SharePack[] = [
  {
    id: "pack-atlanta-eng",
    title: "Atlanta Engineering hiring",
    subtitle: "Pipeline lag · senior engineers",
    status: "ready",
    source: "push_crm",
    sourceLabel: "Push · CRM pipeline drop",
    audienceLabel: "Atlanta Engineering · Senior+",
    audienceCount: 47,
    channels: ["email"],
    thumbnailUrl: jordanThumb,
    ctaLabel: "Apply — Sr Engineer, Atlanta",
    ctaDestination: "/careers/jobs/sr-engineer-atlanta",
    utmPreview:
      "?utm_source=advocacy&utm_medium=email&utm_campaign=atlanta-eng&utm_content={empId}",
    captions: captions("atl", [
      "Proud of our Atlanta eng team — we’re hiring seniors who care about craft.",
      "We’re hiring — here’s why I stay building here.",
      "Know a strong engineer in Atlanta? Open roles on our team.",
      "Our Atlanta squad is growing. Apply if systems + impact excite you.",
      "Peer note: we’re looking for senior engineers who mentor as they ship.",
      "Join a team that ships thoughtfully. Sr Engineer roles open in Atlanta.",
    ]),
    createdAt: "2026-07-21T10:00:00.000Z",
  },
  {
    id: "pack-priya-rn",
    title: "Priya’s RN journey",
    subtitle: "Intern → RN story",
    status: "needs_approval",
    source: "push_erm",
    sourceLabel: "Push · ERM milestone",
    audienceLabel: "Nursing · Mentors",
    audienceCount: 28,
    channels: ["email", "slack"],
    thumbnailUrl: priyaThumb,
    ctaLabel: "Explore nursing careers",
    ctaDestination: "/careers/nursing",
    utmPreview:
      "?utm_source=advocacy&utm_medium=slack&utm_campaign=priya-rn&utm_content={empId}",
    captions: captions("priya", [
      "Priya went intern → RN — her story is why I recommend nursing here.",
      "From intern to bedside: proud of Priya and our nurse residency path.",
      "Thinking about nursing? Read how Priya grew with our team.",
      "Mentorship made the difference for Priya. Explore our RN pathway.",
      "Employee story worth sharing — Priya’s journey into nursing.",
    ]),
    createdAt: "2026-07-22T09:30:00.000Z",
  },
  {
    id: "pack-earth-day",
    title: "Earth Day culture",
    subtitle: "Cultural calendar amplify",
    status: "sent",
    source: "push_calendar",
    sourceLabel: "Push · Cultural calendar",
    audienceLabel: "Sustainability ERG",
    audienceCount: 64,
    channels: ["email", "teams"],
    thumbnailUrl: aishaThumb,
    ctaLabel: "Join our talent community",
    ctaDestination: "/careers/talent-community",
    utmPreview:
      "?utm_source=advocacy&utm_medium=email&utm_campaign=earth-day&utm_content={empId}",
    captions: captions("earth", [
      "Earth Day with our sustainability ERG — proud of this team.",
      "How we show up for the planet at work. Join the conversation.",
      "Culture you can feel: our Earth Day volunteer day.",
      "Looking for a values-led workplace? Here’s a glimpse.",
      "Our ERG made Earth Day count — share if this resonates.",
    ]),
    metrics: { shares: 48, clicks: 312, applications: 11, emvUsd: 4200 },
    createdAt: "2026-07-10T12:00:00.000Z",
    sentAt: "2026-07-12T15:00:00.000Z",
  },
  {
    id: "pack-hiring-fair",
    title: "Hiring fair — Sales",
    subtitle: "Pull · marketer dispatch",
    status: "sent",
    source: "pull_marketer",
    sourceLabel: "Pull · Hiring event template",
    audienceLabel: "Sales Management",
    audienceCount: 33,
    channels: ["email"],
    thumbnailUrl: elenaThumb,
    ctaLabel: "RSVP — Sales hiring fair",
    ctaDestination: "/careers/events/sales-hiring-fair",
    utmPreview:
      "?utm_source=advocacy&utm_medium=email&utm_campaign=sales-fair&utm_content={empId}",
    captions: captions("fair", [
      "Our sales hiring fair is next week — share with strong AEs.",
      "Hiring fair invite from someone on the team (not a brand page).",
      "Know a closer who wants growth? Here’s the fair link.",
      "Come meet the sales leadership team — I’m going.",
      "Personal invite: Sales hiring fair details inside.",
    ]),
    metrics: { shares: 21, clicks: 89, applications: 7, emvUsd: 1800 },
    createdAt: "2026-07-08T11:00:00.000Z",
    sentAt: "2026-07-09T09:00:00.000Z",
  },
  {
    id: "pack-marcus-5yr",
    title: "Marcus · 5-year story",
    subtitle: "From campaign publish",
    status: "ready",
    source: "campaign",
    sourceLabel: "Campaign · published assets",
    audienceLabel: "Nursing · Campus ambassadors",
    audienceCount: 19,
    channels: ["email", "slack"],
    thumbnailUrl: marcusThumb,
    ctaLabel: "See open nursing roles",
    ctaDestination: "/careers/jobs?dept=nursing",
    utmPreview:
      "?utm_source=advocacy&utm_medium=email&utm_campaign=marcus-5yr&utm_content={empId}",
    captions: captions("marcus", [
      "Five years in — Marcus shares why he stayed.",
      "Anniversary stories hit different from a teammate.",
      "If you’re exploring nursing careers, start with Marcus’s story.",
      "Growth + purpose: Marcus’s five-year reflection.",
      "Sharing a colleague’s milestone — and open roles on our units.",
    ]),
    createdAt: "2026-07-20T16:00:00.000Z",
  },
];

export const demoImpactSummary: AmplifyImpactSummary = {
  shares: 1284,
  sharesDeltaLabel: "+18% WoW",
  clicks: 6902,
  applications: 214,
  emvUsd: 48200,
  topPacks: [
    { id: "pack-earth-day", title: "Earth Day culture", clicks: 312 },
    { id: "pack-hiring-fair", title: "Hiring fair — Sales", clicks: 89 },
    { id: "pack-atlanta-eng", title: "Atlanta Engineering hiring", clicks: 0 },
  ],
  rows: [
    {
      employee: "Jordan Blake",
      packTitle: "Earth Day culture",
      channel: "email",
      clicks: 42,
      apps: 2,
      lastShare: "Jul 14",
    },
    {
      employee: "Elena Vasquez",
      packTitle: "Hiring fair — Sales",
      channel: "email",
      clicks: 31,
      apps: 3,
      lastShare: "Jul 10",
    },
    {
      employee: "Aisha Rahman",
      packTitle: "Earth Day culture",
      channel: "teams",
      clicks: 28,
      apps: 1,
      lastShare: "Jul 13",
    },
    {
      employee: "Sam Okonkwo",
      packTitle: "Hiring fair — Sales",
      channel: "email",
      clicks: 19,
      apps: 1,
      lastShare: "Jul 9",
    },
  ],
};

export const statusLabel: Record<SharePack["status"], string> = {
  needs_approval: "Needs approval",
  ready: "Ready",
  sent: "Sent",
  archived: "Archived",
};

export const channelLabel: Record<string, string> = {
  email: "Email",
  slack: "Slack",
  teams: "MS Teams",
};
