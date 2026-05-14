export type Priority = "P1" | "P2" | "P3" | "#4" | "Other";
export type Status = "Active" | "Live" | "In Progress" | "Planned" | "Testing";

export interface ProjectLink {
  label: string;
  url: string;
}

export interface Project {
  id: string;
  rank: number;
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
  // ── P1 — Real-Time Personalities (Board Priority) ──
  {
    priority: "P1",
    label: "P1 — Real-Time Personalities",
    emoji: "🔴",
    subtitle: "Board Priority",
    projects: [
      {
        id: "aria",
        rank: 1,
        name: "ARIA — Real-Time Personality Pilot",
        description:
          "Live AI personality voice interactions. Board-approved top priority. Alberto leading pilot with Nigel, VV, and Claire.",
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
        rank: 2,
        name: "MCP Integration (Model Context Protocol)",
        description:
          "Deploy IPAI personalities as MCP tools for Claude/ChatGPT. Nigel MCP server built on AWS, pending DNS setup.",
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
        rank: 3,
        name: "YouTube Integration",
        description:
          "Video content pipeline. 127 subs, 34.7K views, 139 videos. Daily auto-refreshing dashboard.",
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
        rank: 4,
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
        rank: 5,
        name: "Spreaker → Megaphone Migration",
        description:
          "15,647 shows migrated from Spreaker to Megaphone FM. New primary podcast platform. Analytics dashboard built.",
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

  // ── P2 — Autonomous Agents ──
  {
    priority: "P2",
    label: "P2 — Autonomous Agents",
    emoji: "🟡",
    subtitle: "Autonomous Agents",
    projects: [
      {
        id: "agent-nigel",
        rank: 6,
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
        rank: 7,
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
        rank: 8,
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

  // ── P3 — Agent OS / Internal Agents ──
  {
    priority: "P3",
    label: "P3 — Agent OS / Internal Agents",
    emoji: "🟢",
    subtitle: "Agent OS / Internal Agents",
    projects: [
      {
        id: "cb",
        rank: 9,
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
        rank: 10,
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
        rank: 11,
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
    ],
  },

  // ── #4 — Hardware Integration ──
  {
    priority: "#4",
    label: "#4 — Hardware Integration",
    emoji: "🟣",
    subtitle: "Hardware Integration",
    projects: [
      {
        id: "meta-glasses",
        rank: 12,
        name: "Meta Glasses — Claire App",
        description:
          "Claire Delish on Meta Ray-Ban glasses. Voice + vision — sees what you're looking at, gives cooking/nutrition advice. iOS app with Hume EVI.",
        priority: "#4",
        status: "In Progress",
        statusNote: "TestFlight builds deployed, testing Bluetooth audio + camera",
        links: [],
        team: ["CB", "Boo"],
        category: "Hardware / AR",
      },
    ],
  },

  // ── Other Projects (Ranked) ──
  {
    priority: "Other",
    label: "Other Projects (Ranked)",
    emoji: "⚪",
    subtitle: "Supporting Tools & Dashboards",
    projects: [
      {
        id: "content-review",
        rank: 13,
        name: "Content Review Portal",
        description:
          "HITL content approval portal. 91 items pending review.",
        priority: "Other",
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
        rank: 14,
        name: "IPAI Media Kit",
        description:
          "Auto-refreshing media kit. 956K downloads/30d, 12.7K active shows.",
        priority: "Other",
        status: "Live",
        links: [
          { label: "Live", url: "https://ipai-media-kit.vercel.app" },
        ],
        team: ["CB"],
        category: "Marketing",
      },
      {
        id: "spreaker-analytics",
        rank: 15,
        name: "Spreaker Analytics Dashboard",
        description:
          "Weekly download, revenue, impression tracking from Arc S3 data. Phasing out as Megaphone becomes primary.",
        priority: "Other",
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
        rank: 16,
        name: "Deal Pipeline Tools",
        description:
          "Deal Scorer + Comprehensive Partnership Scorer + Character Bible Builder for evaluating opportunities.",
        priority: "Other",
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
        rank: 17,
        name: "FORGE — AI Video Generator",
        description:
          "Text/audio to video generation tool. LTX 2.3, Streamlit app.",
        priority: "Other",
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
        id: "voice-bridge",
        rank: 18,
        name: "Voice Bridge (Telnyx)",
        description:
          "Phone-accessible AI voice. +1 (213) 221-2468. launchd service.",
        priority: "Other",
        status: "Active",
        links: [],
        team: ["CB"],
        category: "Voice",
      },
      {
        id: "dashboards",
        rank: 19,
        name: "Dashboards & Automated Reporting",
        description:
          "Trending Gaps (daily 6am), Morning Briefing (daily 6:30am), Arc GitHub Digest (daily 9am), YouTube Dashboard (daily 7:30am), Spreaker Dashboard (every 6h)",
        priority: "Other",
        status: "Active",
        statusNote: "All automated via cron",
        links: [],
        team: ["CB"],
        category: "Automation",
      },
    ],
  },
];
