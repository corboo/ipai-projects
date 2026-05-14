"use client";

import { projectGroups } from "../data/projects";
import ProjectCard from "./ProjectCard";

function getSectionStyle(priority: string) {
  switch (priority) {
    case "P1":
      return {
        accent: "#EF4444",
        gradient: "linear-gradient(90deg, rgba(239,68,68,0.15) 0%, transparent 100%)",
        borderColor: "rgba(239,68,68,0.3)",
      };
    case "P2":
      return {
        accent: "#F59E0B",
        gradient: "linear-gradient(90deg, rgba(245,158,11,0.15) 0%, transparent 100%)",
        borderColor: "rgba(245,158,11,0.3)",
      };
    case "P3":
      return {
        accent: "#3B82F6",
        gradient: "linear-gradient(90deg, rgba(59,130,246,0.15) 0%, transparent 100%)",
        borderColor: "rgba(59,130,246,0.3)",
      };
    default:
      return {
        accent: "#6B7280",
        gradient: "linear-gradient(90deg, rgba(107,114,128,0.15) 0%, transparent 100%)",
        borderColor: "rgba(107,114,128,0.3)",
      };
  }
}

export default function Dashboard({ onLogout }: { onLogout: () => void }) {
  const totalProjects = projectGroups.reduce(
    (acc, g) => acc + g.projects.length,
    0
  );
  const liveCount = projectGroups.reduce(
    (acc, g) => acc + g.projects.filter((p) => p.status === "Live").length,
    0
  );
  const activeCount = projectGroups.reduce(
    (acc, g) =>
      acc +
      g.projects.filter(
        (p) => p.status === "Active" || p.status === "Testing"
      ).length,
    0
  );

  return (
    <div className="min-h-screen flex flex-col">
      {/* Header */}
      <header
        className="sticky top-0 z-50"
        style={{
          background: "rgba(15, 17, 23, 0.85)",
          backdropFilter: "blur(16px)",
          borderBottom: "1px solid #2A2E3F",
        }}
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4 flex items-center justify-between">
          <div className="flex items-center gap-4">
            <img
              src="https://www.inceptionpoint.ai/wp-content/uploads/2025/08/cropped-Inception-Point-Logo-FINAL-RGB.png"
              alt="IPAI"
              className="h-10 w-auto"
            />
            <div>
              <h1 className="text-xl font-bold text-white">Project Tracker</h1>
              <p className="text-xs" style={{ color: "#9CA3AF" }}>
                Inception Point AI
              </p>
            </div>
          </div>
          <button
            onClick={onLogout}
            className="text-sm px-4 py-2 rounded-lg transition-all hover:opacity-80"
            style={{
              background: "rgba(255,255,255,0.06)",
              color: "#9CA3AF",
              border: "1px solid #2A2E3F",
            }}
          >
            Sign Out
          </button>
        </div>
      </header>

      {/* Stats bar */}
      <div
        style={{
          background: "rgba(26, 29, 43, 0.5)",
          borderBottom: "1px solid #2A2E3F",
        }}
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
          <div className="flex flex-wrap gap-6">
            <div className="flex items-center gap-2">
              <span
                className="text-2xl font-bold"
                style={{ color: "#D4A847" }}
              >
                {totalProjects}
              </span>
              <span className="text-sm" style={{ color: "#9CA3AF" }}>
                Total Projects
              </span>
            </div>
            <div
              className="w-px h-8 self-center"
              style={{ background: "#2A2E3F" }}
            />
            <div className="flex items-center gap-2">
              <span
                className="w-2 h-2 rounded-full"
                style={{ background: "#22C55E" }}
              />
              <span className="text-sm text-white font-medium">
                {liveCount} Live
              </span>
            </div>
            <div className="flex items-center gap-2">
              <span
                className="w-2 h-2 rounded-full"
                style={{ background: "#3B82F6" }}
              />
              <span className="text-sm text-white font-medium">
                {activeCount} Active
              </span>
            </div>
            <div className="flex items-center gap-2">
              <span
                className="w-2 h-2 rounded-full"
                style={{ background: "#EF4444" }}
              />
              <span className="text-sm text-white font-medium">
                {projectGroups[0].projects.length} P1 Priority
              </span>
            </div>
          </div>
        </div>
      </div>

      {/* Main content */}
      <main className="flex-1 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 w-full">
        {projectGroups.map((group) => {
          const style = getSectionStyle(group.priority);
          return (
            <section key={group.priority} className="mb-12">
              {/* Section header */}
              <div
                className="mb-6 px-5 py-4 rounded-lg"
                style={{
                  background: style.gradient,
                  borderLeft: `3px solid ${style.accent}`,
                }}
              >
                <div className="flex items-center gap-3">
                  <span className="text-xl">{group.emoji}</span>
                  <div>
                    <h2 className="text-lg font-bold text-white">
                      {group.label}
                    </h2>
                    <p className="text-xs" style={{ color: "#9CA3AF" }}>
                      {group.subtitle} • {group.projects.length} project
                      {group.projects.length !== 1 ? "s" : ""}
                    </p>
                  </div>
                </div>
              </div>

              {/* Project cards grid */}
              <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-4">
                {group.projects.map((project) => (
                  <ProjectCard key={project.id} project={project} />
                ))}
              </div>
            </section>
          );
        })}

        {/* Bottom note */}
        <div
          className="mt-4 mb-8 px-5 py-4 rounded-lg text-sm"
          style={{
            background: "rgba(59, 130, 246, 0.06)",
            border: "1px solid rgba(59, 130, 246, 0.15)",
            color: "#9CA3AF",
          }}
        >
          <span style={{ color: "#3B82F6" }}>ℹ️</span>{" "}
          <strong className="text-white">Note:</strong> One&apos;s projects to be added — sync pending
        </div>
      </main>

      {/* Footer */}
      <footer
        className="py-6 text-center text-sm"
        style={{
          borderTop: "1px solid #2A2E3F",
          color: "#6B7280",
        }}
      >
        © 2026 Inception Point AI
      </footer>
    </div>
  );
}
