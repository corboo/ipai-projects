"use client";

import { useState } from "react";
import { Project } from "../data/projects";
import { useComments } from "../hooks/useComments";

function getStatusColor(status: string): string {
  switch (status) {
    case "Live":
      return "#22C55E";
    case "Active":
      return "#3B82F6";
    case "In Progress":
    case "Testing":
      return "#EAB308";
    case "Planned":
      return "#6B7280";
    default:
      return "#6B7280";
  }
}

function getStatusBg(status: string): string {
  switch (status) {
    case "Live":
      return "rgba(34, 197, 94, 0.12)";
    case "Active":
      return "rgba(59, 130, 246, 0.12)";
    case "In Progress":
    case "Testing":
      return "rgba(234, 179, 8, 0.12)";
    case "Planned":
      return "rgba(107, 114, 128, 0.12)";
    default:
      return "rgba(107, 114, 128, 0.12)";
  }
}

function getPriorityColor(priority: string): string {
  switch (priority) {
    case "P1":
      return "#EF4444";
    case "P2":
      return "#F59E0B";
    case "P3":
      return "#3B82F6";
    default:
      return "#6B7280";
  }
}

function getPriorityBg(priority: string): string {
  switch (priority) {
    case "P1":
      return "rgba(239, 68, 68, 0.12)";
    case "P2":
      return "rgba(245, 158, 11, 0.12)";
    case "P3":
      return "rgba(59, 130, 246, 0.12)";
    default:
      return "rgba(107, 114, 128, 0.12)";
  }
}

function formatTimestamp(ts: number): string {
  const d = new Date(ts);
  const now = new Date();
  const diffMs = now.getTime() - d.getTime();
  const diffMin = Math.floor(diffMs / 60000);
  const diffHr = Math.floor(diffMin / 60);
  const diffDay = Math.floor(diffHr / 24);

  if (diffMin < 1) return "just now";
  if (diffMin < 60) return `${diffMin}m ago`;
  if (diffHr < 24) return `${diffHr}h ago`;
  if (diffDay < 7) return `${diffDay}d ago`;

  return d.toLocaleDateString("en-US", {
    month: "short",
    day: "numeric",
    year: d.getFullYear() !== now.getFullYear() ? "numeric" : undefined,
  });
}

export default function ProjectCard({ project }: { project: Project }) {
  const statusColor = getStatusColor(project.status);
  const statusBg = getStatusBg(project.status);
  const priorityColor = getPriorityColor(project.priority);
  const priorityBg = getPriorityBg(project.priority);

  const { comments, addComment, deleteComment } = useComments(project.id);
  const [draft, setDraft] = useState("");
  const [showComments, setShowComments] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const text = draft.trim();
    if (!text) return;
    addComment(text);
    setDraft("");
  };

  const commentCount = comments.length;

  return (
    <div
      className="group relative flex flex-col overflow-hidden transition-all duration-300 hover:translate-y-[-2px]"
      style={{
        background: "#1A1D2B",
        borderRadius: "12px",
        border: "1px solid #2A2E3F",
        padding: "24px",
      }}
      onMouseEnter={(e) => {
        e.currentTarget.style.borderColor = `${priorityColor}33`;
        e.currentTarget.style.boxShadow = `0 8px 32px rgba(0, 0, 0, 0.3), 0 0 20px ${priorityColor}10`;
      }}
      onMouseLeave={(e) => {
        e.currentTarget.style.borderColor = "#2A2E3F";
        e.currentTarget.style.boxShadow = "none";
      }}
    >
      {/* Top row: badges */}
      <div className="flex items-center gap-2 mb-3 flex-wrap">
        <span
          className="text-xs font-bold px-2.5 py-1 rounded-full"
          style={{
            background: priorityBg,
            color: priorityColor,
            border: `1px solid ${priorityColor}33`,
          }}
        >
          {project.priority}
        </span>
        <span
          className="text-xs font-medium px-2.5 py-1 rounded-full flex items-center gap-1.5"
          style={{
            background: statusBg,
            color: statusColor,
            border: `1px solid ${statusColor}33`,
          }}
        >
          <span
            className="w-1.5 h-1.5 rounded-full inline-block"
            style={{ background: statusColor }}
          />
          {project.statusNote || project.status}
        </span>
        <span
          className="text-xs px-2.5 py-1 rounded-full ml-auto"
          style={{
            background: "rgba(255,255,255,0.05)",
            color: "#9CA3AF",
          }}
        >
          {project.category}
        </span>
      </div>

      {/* Project name */}
      <h3 className="text-lg font-bold text-white mb-2 leading-snug">
        {project.name}
      </h3>

      {/* Description */}
      <p className="text-sm leading-relaxed mb-4" style={{ color: "#9CA3AF" }}>
        {project.description}
      </p>

      {/* Team */}
      <div className="flex items-center gap-2 mb-4">
        <svg
          className="w-4 h-4 flex-shrink-0"
          style={{ color: "#6B7280" }}
          fill="none"
          viewBox="0 0 24 24"
          stroke="currentColor"
          strokeWidth={1.5}
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            d="M15 19.128a9.38 9.38 0 002.625.372 9.337 9.337 0 004.121-.952 4.125 4.125 0 00-7.533-2.493M15 19.128v-.003c0-1.113-.285-2.16-.786-3.07M15 19.128v.106A12.318 12.318 0 018.624 21c-2.331 0-4.512-.645-6.374-1.766l-.001-.109a6.375 6.375 0 0111.964-3.07M12 6.375a3.375 3.375 0 11-6.75 0 3.375 3.375 0 016.75 0zm8.25 2.25a2.625 2.625 0 11-5.25 0 2.625 2.625 0 015.25 0z"
          />
        </svg>
        <div className="flex flex-wrap gap-1.5">
          {project.team.map((member) => (
            <span
              key={member}
              className="text-xs px-2 py-0.5 rounded-md"
              style={{
                background: "rgba(255,255,255,0.06)",
                color: "#D1D5DB",
              }}
            >
              {member}
            </span>
          ))}
        </div>
      </div>

      {/* Links */}
      {project.links.length > 0 && (
        <div className="flex flex-wrap gap-2 mb-4">
          {project.links.map((link) => (
            <a
              key={link.url}
              href={link.url}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-1.5 text-xs font-medium px-3 py-1.5 rounded-full transition-all hover:opacity-80"
              style={{
                background: "rgba(212, 168, 71, 0.1)",
                color: "#D4A847",
                border: "1px solid rgba(212, 168, 71, 0.2)",
              }}
              onMouseEnter={(e) => {
                e.currentTarget.style.background = "rgba(212, 168, 71, 0.2)";
                e.currentTarget.style.borderColor = "rgba(212, 168, 71, 0.4)";
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.background = "rgba(212, 168, 71, 0.1)";
                e.currentTarget.style.borderColor = "rgba(212, 168, 71, 0.2)";
              }}
            >
              <svg
                className="w-3 h-3"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
                strokeWidth={2}
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M13.5 6H5.25A2.25 2.25 0 003 8.25v10.5A2.25 2.25 0 005.25 21h10.5A2.25 2.25 0 0018 18.75V10.5m-10.5 6L21 3m0 0h-5.25M21 3v5.25"
                />
              </svg>
              {link.label}
            </a>
          ))}
        </div>
      )}

      {/* ── Comments section ── */}
      <div
        className="mt-auto pt-3"
        style={{ borderTop: "1px solid rgba(255,255,255,0.06)" }}
      >
        {/* Toggle button */}
        <button
          onClick={() => setShowComments(!showComments)}
          className="flex items-center gap-1.5 text-xs transition-colors"
          style={{ color: "#6B7280" }}
          onMouseEnter={(e) => (e.currentTarget.style.color = "#D4A847")}
          onMouseLeave={(e) => (e.currentTarget.style.color = "#6B7280")}
        >
          <svg
            className="w-3.5 h-3.5"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
            strokeWidth={1.5}
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M7.5 8.25h9m-9 3H12m-9.75 1.51c0 1.6 1.123 2.994 2.707 3.227 1.087.16 2.185.283 3.293.369V21l4.076-4.076a1.526 1.526 0 011.037-.443 48.282 48.282 0 005.68-.494c1.584-.233 2.707-1.626 2.707-3.228V6.741c0-1.602-1.123-2.995-2.707-3.228A48.394 48.394 0 0012 3c-2.392 0-4.744.175-7.043.513C3.373 3.746 2.25 5.14 2.25 6.741v6.018z"
            />
          </svg>
          {commentCount > 0
            ? `${commentCount} comment${commentCount !== 1 ? "s" : ""}`
            : "Add note"}
          <svg
            className="w-3 h-3 transition-transform"
            style={{
              transform: showComments ? "rotate(180deg)" : "rotate(0deg)",
            }}
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
            strokeWidth={2}
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M19.5 8.25l-7.5 7.5-7.5-7.5"
            />
          </svg>
        </button>

        {/* Expanded comments area */}
        {showComments && (
          <div className="mt-3 space-y-2">
            {/* Existing comments */}
            {comments.length > 0 && (
              <div
                className="space-y-1.5 max-h-48 overflow-y-auto pr-1"
                style={{ scrollbarWidth: "thin" }}
              >
                {comments.map((c) => (
                  <div
                    key={c.id}
                    className="group/comment flex gap-2 items-start rounded-lg px-3 py-2"
                    style={{ background: "rgba(255,255,255,0.03)" }}
                  >
                    <div className="flex-1 min-w-0">
                      <p
                        className="text-xs leading-relaxed break-words"
                        style={{ color: "#D1D5DB" }}
                      >
                        {c.text}
                      </p>
                      <span
                        className="text-[10px] mt-0.5 block"
                        style={{ color: "#6B7280" }}
                      >
                        {formatTimestamp(c.timestamp)}
                      </span>
                    </div>
                    <button
                      onClick={() => deleteComment(c.id)}
                      className="opacity-0 group-hover/comment:opacity-100 transition-opacity flex-shrink-0 p-0.5 rounded hover:bg-red-500/20"
                      title="Delete comment"
                      style={{ color: "#6B7280" }}
                      onMouseEnter={(e) =>
                        (e.currentTarget.style.color = "#EF4444")
                      }
                      onMouseLeave={(e) =>
                        (e.currentTarget.style.color = "#6B7280")
                      }
                    >
                      <svg
                        className="w-3 h-3"
                        fill="none"
                        viewBox="0 0 24 24"
                        stroke="currentColor"
                        strokeWidth={2}
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          d="M6 18L18 6M6 6l12 12"
                        />
                      </svg>
                    </button>
                  </div>
                ))}
              </div>
            )}

            {/* Input form */}
            <form onSubmit={handleSubmit} className="flex gap-1.5">
              <input
                type="text"
                value={draft}
                onChange={(e) => setDraft(e.target.value)}
                placeholder="Add a note…"
                className="flex-1 min-w-0 text-xs px-3 py-2 rounded-lg text-white placeholder-gray-500 outline-none transition-all"
                style={{
                  background: "#151829",
                  border: "1px solid #2A2E3F",
                }}
                onFocus={(e) => {
                  e.target.style.borderColor = "rgba(212, 168, 71, 0.4)";
                  e.target.style.boxShadow =
                    "0 0 0 2px rgba(212, 168, 71, 0.1)";
                }}
                onBlur={(e) => {
                  e.target.style.borderColor = "#2A2E3F";
                  e.target.style.boxShadow = "none";
                }}
              />
              <button
                type="submit"
                disabled={!draft.trim()}
                className="flex-shrink-0 text-xs font-semibold px-3 py-2 rounded-lg transition-all disabled:opacity-30 disabled:cursor-not-allowed"
                style={{
                  background:
                    draft.trim()
                      ? "linear-gradient(135deg, #D4A847, #B8922E)"
                      : "rgba(212, 168, 71, 0.15)",
                  color: draft.trim() ? "#000" : "#D4A847",
                }}
              >
                Add
              </button>
            </form>
          </div>
        )}
      </div>
    </div>
  );
}
