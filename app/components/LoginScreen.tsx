"use client";

import { useState } from "react";

interface LoginScreenProps {
  onLogin: () => void;
}

export default function LoginScreen({ onLogin }: LoginScreenProps) {
  const [password, setPassword] = useState("");
  const [error, setError] = useState(false);
  const [shake, setShake] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (password === "boo") {
      localStorage.setItem("ipai-projects-auth", "true");
      onLogin();
    } else {
      setError(true);
      setShake(true);
      setTimeout(() => setShake(false), 600);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center px-4"
      style={{ background: "linear-gradient(135deg, #0F1117 0%, #151829 50%, #0F1117 100%)" }}>
      <div
        className={`w-full max-w-md ${shake ? "animate-shake" : ""}`}
        style={{
          background: "rgba(26, 29, 43, 0.9)",
          backdropFilter: "blur(20px)",
          borderRadius: "16px",
          border: "1px solid rgba(212, 168, 71, 0.2)",
          padding: "48px 40px",
          boxShadow: "0 25px 60px rgba(0, 0, 0, 0.5), 0 0 80px rgba(212, 168, 71, 0.05)",
        }}
      >
        <div className="flex flex-col items-center mb-8">
          <img
            src="https://www.inceptionpoint.ai/wp-content/uploads/2025/08/cropped-Inception-Point-Logo-FINAL-RGB.png"
            alt="Inception Point AI"
            className="h-16 w-auto mb-6"
          />
          <h1 className="text-2xl font-bold text-white mb-1">Project Tracker</h1>
          <p className="text-sm" style={{ color: "#9CA3AF" }}>
            Enter password to continue
          </p>
        </div>

        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <input
              type="password"
              value={password}
              onChange={(e) => {
                setPassword(e.target.value);
                setError(false);
              }}
              placeholder="Password"
              autoFocus
              className="w-full px-4 py-3 rounded-lg text-white placeholder-gray-500 outline-none transition-all focus:ring-2"
              style={{
                background: "#1E2235",
                border: error ? "1px solid #EF4444" : "1px solid #2A2E3F",
              }}
              onFocus={(e) => {
                e.target.style.borderColor = "#D4A847";
                e.target.style.boxShadow = "0 0 0 2px rgba(212, 168, 71, 0.2)";
              }}
              onBlur={(e) => {
                e.target.style.borderColor = error ? "#EF4444" : "#2A2E3F";
                e.target.style.boxShadow = "none";
              }}
            />
            {error && (
              <p className="text-red-400 text-sm mt-2">
                Incorrect password. Try again.
              </p>
            )}
          </div>
          <button
            type="submit"
            className="w-full py-3 rounded-lg font-semibold text-black transition-all hover:opacity-90 active:scale-[0.98]"
            style={{
              background: "linear-gradient(135deg, #D4A847, #B8922E)",
            }}
          >
            Sign In
          </button>
        </form>

        <p className="text-center text-xs mt-6" style={{ color: "#6B7280" }}>
          © 2026 Inception Point AI
        </p>
      </div>

      <style jsx>{`
        @keyframes shake {
          0%, 100% { transform: translateX(0); }
          20% { transform: translateX(-10px); }
          40% { transform: translateX(10px); }
          60% { transform: translateX(-6px); }
          80% { transform: translateX(6px); }
        }
        .animate-shake {
          animation: shake 0.5s ease-in-out;
        }
      `}</style>
    </div>
  );
}
