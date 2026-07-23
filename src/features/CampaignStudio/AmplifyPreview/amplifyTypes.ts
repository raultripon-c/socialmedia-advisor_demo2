export type AmplifyMode = "packs" | "dispatch" | "impact";

export type SharePackStatus = "needs_approval" | "ready" | "sent" | "archived";

export type AmplifyChannel = "email" | "slack" | "teams";

export type AmplifySource =
  | "push_crm"
  | "push_erm"
  | "push_calendar"
  | "pull_marketer"
  | "campaign"
  | "content_board";

export type AmplifyTemplateId =
  | "job_sourcing"
  | "hiring_manager"
  | "erg_culture"
  | "benefits"
  | "milestone";

export interface ShareCaption {
  id: string;
  text: string;
}

export interface SharePackMetrics {
  shares: number;
  clicks: number;
  applications: number;
  emvUsd: number;
}

export interface SharePack {
  id: string;
  title: string;
  subtitle: string;
  status: SharePackStatus;
  source: AmplifySource;
  sourceLabel: string;
  audienceLabel: string;
  audienceCount: number;
  channels: AmplifyChannel[];
  thumbnailUrl: string;
  ctaLabel: string;
  ctaDestination: string;
  utmPreview: string;
  captions: ShareCaption[];
  metrics?: SharePackMetrics;
  createdAt: string;
  sentAt?: string;
}

export interface AmplifyImpactSummary {
  shares: number;
  sharesDeltaLabel: string;
  clicks: number;
  applications: number;
  emvUsd: number;
  topPacks: { id: string; title: string; clicks: number }[];
  rows: {
    employee: string;
    packTitle: string;
    channel: AmplifyChannel;
    clicks: number;
    apps: number;
    lastShare: string;
  }[];
}
