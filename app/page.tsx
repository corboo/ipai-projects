"use client";
import { useState, useEffect } from "react";

interface ProjectLink { label: string; url: string; }
interface Comment { text: string; ts: string; }
interface Project {
  id: string; name: string; description: string; priority: string;
  rank: number; status: string; team: string; links: ProjectLink[];
  category: string;
}

const PROJECTS: Project[] = [
  // P1 — Real-Time Personalities
  { id: "aria", rank: 1, priority: "P1", category: "Real-Time Personalities", name: "ARIA — Real-Time Personality Pilot", description: "Live AI personality voice interactions. Board-approved top priority. Alberto leading pilot with Nigel, VV, and Claire.", status: "Active / Testing", team: "Alberto, CB, Katie", links: [
    { label: "Nigel Live", url: "https://nigel.inceptionpoint.ai/" },
    { label: "VV Live", url: "https://vv.inceptionpoint.ai/" },
    { label: "Claire Live", url: "https://clare.inceptionpoint.ai/" },
    { label: "Talk to Nigel", url: "https://talk-to-nigel.vercel.app" },
    { label: "Talk to VV", url: "https://talk-to-vv.vercel.app" },
    { label: "Talk to Claire", url: "https://talk-to-claire.vercel.app" },
  ]},
  { id: "mcp", rank: 2, priority: "P1", category: "Real-Time Personalities", name: "MCP Integration (Model Context Protocol)", description: "Deploy IPAI personalities as MCP tools for Claude/ChatGPT. Nigel MCP server built on AWS, pending DNS setup.", status: "In Progress", team: "CB", links: [
    { label: "Nigel Docs", url: "https://agent-nigel-docs.vercel.app" },
  ]},
  { id: "youtube", rank: 3, priority: "P1", category: "Real-Time Personalities", name: "YouTube Integration", description: "Video content pipeline. 127 subs, 34.7K views, 139 videos. Daily auto-refreshing dashboard.", status: "Active", team: "CB, Justin, Josh", links: [
    { label: "Dashboard", url: "https://inceptionpointai.github.io/youtube-dashboard/" },
    { label: "GitHub", url: "https://github.com/inceptionpointai/youtube-dashboard" },
  ]},
  { id: "instagram", rank: 4, priority: "P1", category: "Real-Time Personalities", name: "Instagram Integration", description: "Instagram Graph API for personality accounts. Nigel (@nigelthistledown) set up — 4,396 followers, publishing + reading.", status: "Active", team: "CB", links: [
    { label: "Nigel IG", url: "https://instagram.com/nigelthistledown" },
  ]},
  { id: "megaphone", rank: 6, priority: "P1", category: "Real-Time Personalities", name: "Megaphone FM Migration", description: "15,647 shows migrated to Megaphone FM. New primary podcast platform. Analytics dashboard built.", status: "Active", team: "Alberto, CB, Ann", links: [
    { label: "Dashboard", url: "https://megaphone-dashboard.vercel.app" },
    { label: "Analytics", url: "https://megaphone-dashboard.vercel.app/analytics/" },
    { label: "GitHub", url: "https://github.com/corboo/megaphone-dashboard" },
    { label: "Megaphone API", url: "https://developers.megaphone.fm/" },
  ]},

  { id: "makecom-megaphone", rank: 5, priority: "P1", category: "Real-Time Personalities", name: "Migrate Make.com & Dailies to Megaphone", description: "Migrate all Make.com automation scenarios and daily content workflows from Spreaker to Megaphone FM publishing.", status: "Planned", team: "CB, Alberto", links: []},

  // P2 — Autonomous Agents
  { id: "nigel", rank: 7, priority: "P2", category: "Autonomous Agents", name: "Agent Nigel — Autonomous Content Creator", description: "Fully autonomous AI agent producing garden/nature content across podcast, video, Instagram. 4 Megaphone shows, IG account.", status: "Active", team: "CB, One", links: [
    { label: "Docs", url: "https://agent-nigel-docs.vercel.app" },
    { label: "Content Portal", url: "https://content-review-portal.vercel.app" },
    { label: "Instagram", url: "https://instagram.com/nigelthistledown" },
  ]},
  { id: "monday", rank: 8, priority: "P2", category: "Autonomous Agents", name: "Agent Monday", description: "Next autonomous agent in development.", status: "Planned", team: "TBD", links: []},
  { id: "arc", rank: 9, priority: "P2", category: "Autonomous Agents", name: "Arc Content Production Engine", description: "Core content factory. Auto-produces podcasts at scale. v1.165. Scripting, TTS, publishing, Apple Podcasts submission.", status: "Active — v1.165", team: "David McHealy, Alberto", links: []},

  // P3 — Agent OS / Internal Agents
  { id: "cb", rank: 10, priority: "P3", category: "Agent OS / Internal", name: "CB ⚡ — Co-Chief AI Officer", description: "Internal AI agent. Dashboards, automations, email, monitoring, builds. Runs on Mac Mini via Clawdbot.", status: "Active", team: "CB", links: []},
  { id: "one", rank: 11, priority: "P3", category: "Agent OS / Internal", name: "One — Engineering Agent", description: "Internal AI agent on AWS. Engineering tasks, dashboard serving, infrastructure.", status: "Active", team: "One", links: []},
  // #4 ranked — Meta Glasses
  { id: "metaglasses", rank: 12, priority: "P4", category: "Hardware Integration", name: "Meta Glasses — Claire App", description: "Claire Delish on Meta Ray-Ban glasses. Voice + vision — sees what you're looking at, gives cooking/nutrition advice. iOS app with Hume EVI.", status: "In Progress", team: "CB, Boo", links: []},

  // Other projects ranked
  { id: "portal", rank: 13, priority: "Other", category: "Tools", name: "Content Review Portal", description: "HITL content approval portal. 91 items pending review.", status: "Active", team: "CB", links: [
    { label: "Portal", url: "https://content-review-portal.vercel.app" },
    { label: "GitHub", url: "https://github.com/corboo/ipai-content-review-portal" },
  ]},
  { id: "mediakit", rank: 14, priority: "Other", category: "Marketing", name: "IPAI Media Kit", description: "Auto-refreshing media kit. 956K downloads/30d, 12.7K active shows.", status: "Live", team: "CB", links: [
    { label: "Live", url: "https://ipai-media-kit.vercel.app" },
  ]},
  { id: "megaphone-analytics", rank: 15, priority: "Other", category: "Analytics", name: "Megaphone FM Analytics", description: "Podcast analytics dashboard. 15,647 shows, 309K episodes, listener geo/platform/device breakdowns, ad impressions.", status: "Active", team: "CB", links: [
    { label: "Dashboard", url: "https://megaphone-dashboard.vercel.app" },
    { label: "Listener Analytics", url: "https://megaphone-dashboard.vercel.app/analytics/" },
    { label: "GitHub", url: "https://github.com/corboo/megaphone-dashboard" },
  ]},
  { id: "deals", rank: 16, priority: "Other", category: "Tools", name: "Deal Pipeline Tools", description: "Deal Scorer + Partnership Scorer + Character Bible Builder for evaluating opportunities.", status: "Live", team: "CB", links: [
    { label: "Deal Scorer", url: "https://deal-scorer.ngrok.dev" },
    { label: "Partnership Scorer", url: "https://partnership-scorer.ngrok.dev" },
    { label: "Character Bible", url: "https://character-bible.ngrok.dev" },
  ]},
  { id: "forge", rank: 17, priority: "Other", category: "Tools", name: "FORGE — AI Video Generator", description: "Text/audio to video generation. LTX 2.3, Streamlit app.", status: "Active", team: "CB, Katie, Justin", links: [
    { label: "App", url: "https://ipai-forge-text-to-video.streamlit.app/" },
  ]},
  { id: "voicebridge", rank: 18, priority: "Other", category: "Infrastructure", name: "Voice Bridge (Telnyx)", description: "Phone-accessible AI voice. +1 (213) 221-2468.", status: "Active", team: "CB", links: []},
  { id: "reporting", rank: 19, priority: "Other", category: "Automation", name: "Automated Reporting Suite", description: "Trending Gaps (6am), Morning Briefing (6:30am), Arc Digest (9am), YouTube Dashboard (7:30am), Megaphone (every 6h).", status: "Active", team: "CB", links: []},
];

const priorityColors: Record<string, string> = {
  P1: "#EF4444", P2: "#F59E0B", P3: "#3B82F6", P4: "#8B5CF6", Other: "#6B7280"
};
const priorityLabels: Record<string, string> = {
  P1: "🔴 P1 — Real-Time Personalities (Board Priority)",
  P2: "🟡 P2 — Autonomous Agents",
  P3: "🔵 P3 — Agent OS / Internal Agents",
  P4: "🟣 #4 — Hardware Integration",
  Other: "⚪ Other Projects (Ranked)"
};
const statusColors: Record<string, string> = {
  Live: "#10B981", Active: "#3B82F6", "In Progress": "#F59E0B", Planned: "#6B7280"
};

function getStatusColor(s: string) {
  if (s.includes("Live")) return statusColors.Live;
  if (s.includes("Active")) return statusColors.Active;
  if (s.includes("Progress") || s.includes("Testing")) return statusColors["In Progress"];
  return statusColors.Planned;
}

const STORAGE_KEY = "ipai-project-comments";
const AUTH_KEY = "ipai-projects-auth";

function loadComments(): Record<string, Comment[]> {
  if (typeof window === "undefined") return {};
  try { return JSON.parse(localStorage.getItem(STORAGE_KEY) || "{}"); } catch { return {}; }
}
function saveComments(c: Record<string, Comment[]>) {
  localStorage.setItem(STORAGE_KEY, JSON.stringify(c));
}

function ProjectCard({ project }: { project: Project }) {
  const [comments, setComments] = useState<Comment[]>([]);
  const [input, setInput] = useState("");
  const [showComments, setShowComments] = useState(false);

  useEffect(() => {
    const all = loadComments();
    setComments(all[project.id] || []);
  }, [project.id]);

  const addComment = () => {
    if (!input.trim()) return;
    const all = loadComments();
    const c: Comment = { text: input.trim(), ts: new Date().toLocaleString() };
    all[project.id] = [...(all[project.id] || []), c];
    saveComments(all);
    setComments(all[project.id]);
    setInput("");
  };

  return (
    <div style={{ background: "#111827", border: `1px solid ${priorityColors[project.priority]}33`, borderRadius: 12, padding: 20, marginBottom: 16, borderLeft: `4px solid ${priorityColors[project.priority]}` }}>
      <div style={{ display: "flex", alignItems: "center", gap: 10, marginBottom: 8, flexWrap: "wrap" }}>
        <span style={{ background: priorityColors[project.priority], color: "#fff", padding: "2px 10px", borderRadius: 20, fontSize: 12, fontWeight: 600 }}>{project.priority}</span>
        <span style={{ background: getStatusColor(project.status) + "22", color: getStatusColor(project.status), padding: "2px 10px", borderRadius: 20, fontSize: 12, fontWeight: 500, border: `1px solid ${getStatusColor(project.status)}44` }}>{project.status}</span>
        <span style={{ fontSize: 12, color: "#9CA3AF" }}>#{project.rank}</span>
      </div>
      <h3 style={{ fontSize: 18, fontWeight: 600, color: "#F9FAFB", margin: "4px 0" }}>{project.name}</h3>
      <p style={{ fontSize: 14, color: "#9CA3AF", margin: "4px 0 8px" }}>{project.description}</p>
      <div style={{ fontSize: 12, color: "#6B7280", marginBottom: 8 }}>Team: {project.team}</div>

      {project.links.length > 0 && (
        <div style={{ display: "flex", gap: 8, flexWrap: "wrap", marginBottom: 8 }}>
          {project.links.map((l, i) => (
            <a key={i} href={l.url} target="_blank" rel="noopener noreferrer"
              style={{ background: "#D4A84722", color: "#D4A847", padding: "4px 12px", borderRadius: 20, fontSize: 12, textDecoration: "none", border: "1px solid #D4A84744", fontWeight: 500 }}
              onMouseOver={e => (e.currentTarget.style.background = "#D4A84744")}
              onMouseOut={e => (e.currentTarget.style.background = "#D4A84722")}
            >{l.label} ↗</a>
          ))}
        </div>
      )}

      <div style={{ marginTop: 8 }}>
        <button onClick={() => setShowComments(!showComments)}
          style={{ background: "none", border: "none", color: "#6B7280", fontSize: 12, cursor: "pointer", padding: 0 }}>
          💬 {comments.length > 0 ? `${comments.length} comment${comments.length > 1 ? "s" : ""}` : "Add comment"} {showComments ? "▲" : "▼"}
        </button>

        {showComments && (
          <div style={{ marginTop: 8 }}>
            {comments.map((c, i) => (
              <div key={i} style={{ background: "#1F2937", borderRadius: 8, padding: "8px 12px", marginBottom: 6, fontSize: 13 }}>
                <div style={{ color: "#E5E7EB" }}>{c.text}</div>
                <div style={{ color: "#6B7280", fontSize: 11, marginTop: 2 }}>{c.ts}</div>
              </div>
            ))}
            <div style={{ display: "flex", gap: 8, marginTop: 6 }}>
              <input value={input} onChange={e => setInput(e.target.value)}
                onKeyDown={e => e.key === "Enter" && addComment()}
                placeholder="Add a comment..."
                style={{ flex: 1, background: "#1F2937", border: "1px solid #374151", borderRadius: 8, padding: "6px 12px", color: "#E5E7EB", fontSize: 13, outline: "none" }}
              />
              <button onClick={addComment}
                style={{ background: "#D4A847", color: "#0a0a1a", padding: "6px 16px", borderRadius: 8, fontSize: 13, fontWeight: 600, border: "none", cursor: "pointer" }}>
                Post
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}

export default function Home() {
  const [authed, setAuthed] = useState(false);
  const [pw, setPw] = useState("");
  const [error, setError] = useState(false);
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
    if (localStorage.getItem(AUTH_KEY) === "true") setAuthed(true);
  }, []);

  const login = () => {
    if (pw === "boo") {
      localStorage.setItem(AUTH_KEY, "true");
      setAuthed(true);
    } else {
      setError(true);
      setTimeout(() => setError(false), 1000);
    }
  };

  if (!mounted) return null;

  if (!authed) {
    return (
      <div style={{ minHeight: "100vh", display: "flex", alignItems: "center", justifyContent: "center", background: "#0a0a1a" }}>
        <div style={{ textAlign: "center", maxWidth: 360 }}>
          <img src="https://www.inceptionpoint.ai/wp-content/uploads/2025/08/cropped-Inception-Point-Logo-FINAL-RGB.png" alt="IPAI" style={{ height: 60, margin: "0 auto 24px" }} />
          <h1 style={{ fontSize: 22, fontWeight: 600, color: "#F9FAFB", marginBottom: 8 }}>Project Tracker</h1>
          <p style={{ color: "#6B7280", fontSize: 14, marginBottom: 20 }}>Enter password to continue</p>
          <div style={{ display: "flex", gap: 8 }}>
            <input type="password" value={pw} onChange={e => setPw(e.target.value)}
              onKeyDown={e => e.key === "Enter" && login()}
              placeholder="Password"
              style={{ flex: 1, background: "#1F2937", border: error ? "1px solid #EF4444" : "1px solid #374151", borderRadius: 8, padding: "10px 14px", color: "#E5E7EB", fontSize: 14, outline: "none" }}
            />
            <button onClick={login}
              style={{ background: "#D4A847", color: "#0a0a1a", padding: "10px 20px", borderRadius: 8, fontSize: 14, fontWeight: 600, border: "none", cursor: "pointer" }}>
              Enter
            </button>
          </div>
        </div>
      </div>
    );
  }

  const groups = ["P1", "P2", "P3", "P4", "Other"];

  return (
    <div style={{ minHeight: "100vh", background: "#0a0a1a", padding: "20px" }}>
      <div style={{ maxWidth: 900, margin: "0 auto" }}>
        <div style={{ display: "flex", alignItems: "center", gap: 16, marginBottom: 32, paddingBottom: 16, borderBottom: "1px solid #1F2937" }}>
          <img src="https://www.inceptionpoint.ai/wp-content/uploads/2025/08/cropped-Inception-Point-Logo-FINAL-RGB.png" alt="IPAI" style={{ height: 40 }} />
          <div>
            <h1 style={{ fontSize: 24, fontWeight: 700, color: "#F9FAFB", margin: 0 }}>Project Tracker</h1>
            <p style={{ fontSize: 13, color: "#6B7280", margin: 0 }}>Inception Point AI — {PROJECTS.length} projects tracked</p>
          </div>
        </div>

        {groups.map(g => {
          const items = PROJECTS.filter(p => p.priority === g).sort((a, b) => a.rank - b.rank);
          if (items.length === 0) return null;
          return (
            <div key={g} style={{ marginBottom: 32 }}>
              <h2 style={{ fontSize: 16, fontWeight: 600, color: priorityColors[g], marginBottom: 12, paddingBottom: 8, borderBottom: `1px solid ${priorityColors[g]}33` }}>
                {priorityLabels[g]}
              </h2>
              {items.map(p => <ProjectCard key={p.id} project={p} />)}
            </div>
          );
        })}

        <div style={{ textAlign: "center", padding: "24px 0", borderTop: "1px solid #1F2937", color: "#6B7280", fontSize: 12 }}>
          <p>📝 One&apos;s projects to be added — sync pending</p>
          <p style={{ marginTop: 4 }}>© 2026 Inception Point AI</p>
        </div>
      </div>
    </div>
  );
}
