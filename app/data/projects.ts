export type Priority = "P1" | "P2" | "P3";
export type Status = "Active" | "Live" | "In Progress" | "Planned" | "Testing";

export interface ProjectLink {
  label: string;
  url: string;
}

export interface Project {
  id: string;
  name: string;
  description: string;
  priority: Priority;
  status: Status;
  statusNote?: string;
  links: ProjectLink[];
  team: string[];
  category: string;
}

export interface PriorityGroup {
  priority: Priority;
  label: string;
  emoji: string;
  subtitle: string;
  projects: Project[];
}

export const projectGroups: PriorityGroup[] = [
  {
    priority: "P1",
    label: "P1 — Real-Time Personalities",
    emoji: "🔴",
    subtitle: "Board Priority",
    projects: [
      {
        id: "aria",
        name: "ARIA — Real-Time Personality Pilot",
        description:
          "Live AI personality voice interactions. Board-approved priority. Alberto leading pilot.",
        priority: "P1",
        status: "Testing",
        statusNote: "Active / Testing",
        links: [
          { label: "Nigel Live", url: "https://nigel.inceptionpoint.ai/" },
          { label: "VV Live", url: "https://vv.inceptionpoint.ai/" },
          { label: "Clare Live", url: "https://clare.inceptionpoint.ai/" },
          { label: "Talk to Nigel", url: "https://talk-to-nigel.vercel.app" },
          { label: "Talk to VV", url: "https://talk-to-vv.vercel.app" },
          { label: "Talk to Claire", url: "https://talk-to-claire.vercel.app" },
        ],
        team: ["Alberto", "CB", "Katie"],
        category: "Real-Time AI",
      },
      {
        id: "mcp",
        name: "MCP Integration (Model Context Protocol)",
        description:
          "Deploy IPAI personalities as MCP tools for Claude/ChatGPT. Nigel MCP server built, pending DNS setup.",
        priority: "P1",
        status: "In Progress",
        statusNote: "Blocked on DNS (nigel.inceptionpoint.ai → 35.92.203.138)",
        links: [
          { label: "Docs", url: "https://agent-nigel-docs.vercel.app" },
        ],
        team: ["CB"],
        category: "Integration",
      },
      {
        id: "youtube",
        name: "YouTube Integration",
        description:
          "Video content pipeline. 127 subs, 34.7K views, 139 videos. Auto-dashboard.",
        priority: "P1",
        status: "Active",
        links: [
          {
            label: "Dashboard",
            url: "https://inceptionpointai.github.io/youtube-dashboard/",
          },
          {
            label: "GitHub",
            url: "https://github.com/inceptionpointai/youtube-dashboard",
          },
        ],
        team: ["CB", "Justin", "Josh"],
        category: "Content",
      },
      {
        id: "instagram",
        name: "Instagram Integration",
        description:
          "Instagram Graph API for personality accounts. Nigel (@nigelthistledown) set up with 4,396 followers. Publishing + reading capabilities.",
        priority: "P1",
        status: "Active",
        links: [],
        team: ["CB"],
        category: "Social Media",
      },
      {
        id: "megaphone-migration",
        name: "Spreaker → Megaphone Migration",
        description:
          "15,647 shows migrated from Spreaker to Megaphone FM. New primary podcast platform.",
        priority: "P1",
        status: "Active",
        links: [
          {
            label: "Megaphone Dashboard",
            url: "https://megaphone-dashboard.vercel.app",
          },
          {
            label: "Megaphone Analytics",
            url: "https://megaphone-dashboard.vercel.app/analytics/",
          },
          {
            label: "GitHub",
            url: "https://github.com/corboo/megaphone-dashboard",
          },
          {
            label: "Developer Docs",
            url: "https://developers.megaphone.fm/",
          },
        ],
        team: ["Alberto", "CB", "Ann"],
        category: "Podcast",
      },
    ],
  },
  {
    priority: "P2",
    label: "P2 — Autonomous Agents",
    emoji: "🟡",
    subtitle: "Autonomous Agents",
    projects: [
      {
        id: "agent-nigel",
        name: "Agent Nigel — Autonomous Content Creator",
        description:
          "Fully autonomous AI agent producing garden/nature content across podcast, video, Instagram. 4 Megaphone shows, IG account, content pipeline.",
        priority: "P2",
        status: "Active",
        links: [
          { label: "Docs", url: "https://agent-nigel-docs.vercel.app" },
          {
            label: "Content Portal",
            url: "https://content-review-portal.vercel.app",
          },
          {
            label: "Instagram",
            url: "https://instagram.com/nigelthistledown",
          },
        ],
        team: ["CB", "One"],
        category: "Autonomous Agent",
      },
      {
        id: "agent-monday",
        name: "Agent Monday (TBD)",
        description: "Next autonomous agent in development.",
        priority: "P2",
        status: "Planned",
        links: [],
        team: ["TBD"],
        category: "Autonomous Agent",
      },
      {
        id: "arc",
        name: "Arc Content Production Engine",
        description:
          "Core content factory. Auto-produces podcasts at scale. v1.165. Handles scripting, TTS, publishing, Apple Podcasts submission.",
        priority: "P2",
        status: "Active",
        statusNote: "v1.165",
        links: [],
        team: ["David McHealy", "Alberto"],
        category: "Content Production",
      },
    ],
  },
  {
    priority: "P3",
    label: "P3 — Agent OS / Internal Agents",
    emoji: "🟢",
    subtitle: "Agent OS / Internal Agents",
    projects: [
      {
        id: "cb",
        name: "CB (Clawdbot) — Co-Chief AI Officer",
        description:
          "Internal AI agent. Handles dashboards, automations, email, monitoring, builds. Runs on Mac Mini via Clawdbot gateway.",
        priority: "P3",
        status: "Active",
        links: [],
        team: ["CB"],
        category: "Internal Agent",
      },
      {
        id: "one",
        name: "One — Engineering Agent",
        description:
          "Internal AI agent on AWS. Handles engineering tasks, dashboard serving, infrastructure.",
        priority: "P3",
        status: "Active",
        links: [],
        team: ["One"],
        category: "Internal Agent",
      },
      {
        id: "oaisys",
        name: "OAISYS Platform",
        description:
          "AI personality platform. Hub-and-spoke architecture. 8 personalities. Consumer app + API.",
        priority: "P3",
        status: "Live",
        links: [
          { label: "App", url: "https://oaisys-v2.vercel.app" },
          {
            label: "Onboarding",
            url: "https://oaisys-onboarding-v2.vercel.app",
          },
          {
            label: "API Health",
            url: "https://oaisys-api.ngrok.io/health",
          },
          { label: "Web Chat", url: "https://oaisys-chat.vercel.app" },
        ],
        team: ["CB", "One"],
        category: "Platform",
      },
      {
        id: "content-review",
        name: "Content Review Portal",
        description:
          "HITL content approval portal. 91 items pending review.",
        priority: "P3",
        status: "Active",
        links: [
          {
            label: "Portal",
            url: "https://content-review-portal.vercel.app",
          },
          {
            label: "GitHub",
            url: "https://github.com/corboo/ipai-content-review-portal",
          },
        ],
        team: ["CB"],
        category: "Tools",
      },
      {
        id: "media-kit",
        name: "IPAI Media Kit",
        description:
          "Auto-refreshing media kit. 956K downloads/30d, 12.7K active shows.",
        priority: "P3",
        status: "Live",
        links: [
          { label: "Live", url: "https://ipai-media-kit.vercel.app" },
        ],
        team: ["CB"],
        category: "Marketing",
      },
      {
        id: "spreaker-analytics",
        name: "Spreaker Analytics Dashboard",
        description:
          "Weekly download, revenue, impression tracking from Arc S3 data.",
        priority: "P3",
        status: "Active",
        statusNote: "Will phase out as Megaphone becomes primary",
        links: [
          {
            label: "Dashboard",
            url: "https://spreaker-analytics-dashboard.vercel.app",
          },
        ],
        team: ["CB"],
        category: "Analytics",
      },
      {
        id: "deal-pipeline",
        name: "Deal Pipeline Tools",
        description:
          "Deal Scorer + Comprehensive Partnership Scorer + Character Bible Builder",
        priority: "P3",
        status: "Live",
        links: [
          { label: "Deal Scorer", url: "https://deal-scorer.ngrok.dev" },
          {
            label: "Partnership Scorer",
            url: "https://partnership-scorer.ngrok.dev",
          },
          {
            label: "Character Bible",
            url: "https://character-bible.ngrok.dev",
          },
          {
            label: "Google Sheet",
            url: "https://docs.google.com/spreadsheets/d/1FKJdH8fQzfOph-Ws4DwEHQ1nLhhBPvtp7EF6U2ba3mE",
          },
        ],
        team: ["CB"],
        category: "Business",
      },
      {
        id: "forge",
        name: "FORGE — AI Video Generator",
        description:
          "Text/audio to video generation tool. LTX 2.3, Streamlit app.",
        priority: "P3",
        status: "Active",
        links: [
          {
            label: "App",
            url: "https://ipai-forge-text-to-video.streamlit.app/",
          },
        ],
        team: ["CB", "Katie", "Justin"],
        category: "Creative Tools",
      },
      {
        id: "dashboards",
        name: "Dashboards & Automated Reporting",
        description:
          "Trending Gaps (daily 6am), Morning Briefing (daily 6:30am), Arc GitHub Digest (daily 9am), YouTube Dashboard (daily 7:30am), Spreaker Dashboard (every 6h)",
        priority: "P3",
        status: "Active",
        statusNote: "All automated via cron",
        links: [],
        team: ["CB"],
        category: "Automation",
      },
      {
        id: "voice-bridge",
        name: "Voice Bridge (Telnyx)",
        description:
          "Phone-accessible AI voice. +1 (213) 221-2468. launchd service.",
        priority: "P3",
        status: "Active",
        links: [],
        team: ["CB"],
        category: "Voice",
      },
    ],
  },
];
