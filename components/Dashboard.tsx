"use client";

// components/Dashboard.tsx

import { useEffect, useState } from "react";

// ── Data ─────────────────────────────────────────────────────
const TOOLS = [
  { emoji: "🤖", bg: "linear-gradient(135deg,#1a1a3e,#2a1a5e)", name: "ChatGPT Plus",  category: "Writing · Productivity", rating: "4.9", commission: "45% comm." },
  { emoji: "🎨", bg: "linear-gradient(135deg,#1a2e1a,#1a4a2e)", name: "Midjourney v7", category: "Design · Image AI",       rating: "4.8", commission: "38% comm." },
  { emoji: "⚡", bg: "linear-gradient(135deg,#2e1a1a,#4a2a1a)", name: "Jasper AI",     category: "Copywriting · SEO",       rating: "4.7", commission: "30% comm." },
  { emoji: "🎬", bg: "linear-gradient(135deg,#1a2a3e,#1a3a4a)", name: "Runway ML",     category: "Video · Creative",        rating: "4.6", commission: "35% comm." },
] as const;

const DASH_STATS = [
  { val: "12.4K", label: "Clicks Today", color: "var(--text)"  },
  { val: "892",   label: "Conversions",  color: "#a78bfa"       },
  { val: "$684",  label: "Revenue",      color: "#4ade80"       },
] as const;

// ── ToolRow ───────────────────────────────────────────────────
function ToolRow({ tool, index }: { tool: (typeof TOOLS)[number]; index: number }) {
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const id = setTimeout(() => setVisible(true), 700 + index * 120);
    return () => clearTimeout(id);
  }, [index]);

  return (
    <div
      className="tool-row"
      style={{
        opacity:    visible ? 1 : 0,
        transform:  visible ? "translateX(0)" : "translateX(20px)",
        transition: "opacity 0.5s ease, transform 0.5s ease",
      }}
    >
      <div className="tool-emoji" style={{ background: tool.bg }}>
        {tool.emoji}
      </div>
      <div className="tool-info">
        <div className="tool-name">{tool.name}</div>
        <div className="tool-category">{tool.category}</div>
      </div>
      <div className="tool-meta">
        <div className="tool-rating">★ {tool.rating}</div>
        <div className="tool-commission">{tool.commission}</div>
      </div>
    </div>
  );
}

// ── Dashboard (main export) ───────────────────────────────────
export default function Dashboard() {
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    const id = setTimeout(() => setMounted(true), 100);
    return () => clearTimeout(id);
  }, []);

  return (
    <div
      className="dashboard-card"
      style={{
        opacity:    mounted ? 1 : 0,
        transform:  mounted ? "translateY(0)" : "translateY(30px)",
        transition: "opacity 0.8s ease 0.3s, transform 0.8s ease 0.3s",
      }}
    >
      {/* ── Header ── */}
      <div className="dash-header">
        <span className="dash-title">Top AI Tools</span>
        <span className="dash-live">
          <span className="live-dot" /> Live
        </span>
      </div>

      {/* ── Tool rows ── */}
      <div className="tool-list">
        {TOOLS.map((tool, i) => (
          <ToolRow key={tool.name} tool={tool} index={i} />
        ))}
      </div>

      {/* ── Sparkline chart ── */}
      <div className="dash-chart">
        <div className="chart-label">
          <span>Affiliate Clicks (7 days)</span>
          <span className="chart-value">+18.4% ↑</span>
        </div>
        <svg
          className="sparkline"
          viewBox="0 0 440 50"
          preserveAspectRatio="none"
          aria-hidden="true"
        >
          <defs>
            <linearGradient id="lineGrad" x1="0" y1="0" x2="1" y2="0">
              <stop offset="0%"   stopColor="#3b82f6" />
              <stop offset="100%" stopColor="#8b5cf6" />
            </linearGradient>
            <linearGradient id="fillGrad" x1="0" y1="0" x2="0" y2="1">
              <stop offset="0%"   stopColor="#8b5cf6" stopOpacity="0.3" />
              <stop offset="100%" stopColor="#3b82f6" stopOpacity="0"   />
            </linearGradient>
          </defs>
          <path
            d="M0,40 L60,32 L120,28 L180,20 L240,22 L300,14 L360,8 L440,4 L440,50 L0,50 Z"
            fill="url(#fillGrad)"
          />
          <path
            d="M0,40 L60,32 L120,28 L180,20 L240,22 L300,14 L360,8 L440,4"
            fill="none"
            stroke="url(#lineGrad)"
            strokeWidth="2.5"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
          <circle cx="60"  cy="32" r="3" fill="#3b82f6" />
          <circle cx="180" cy="20" r="3" fill="#6366f1" />
          <circle cx="300" cy="14" r="3" fill="#8b5cf6" />
          <circle cx="440" cy="4"  r="4" fill="#a78bfa" stroke="#1a0a3e" strokeWidth="2" />
        </svg>
      </div>

      {/* ── Stats strip ── */}
      <div className="dash-stats">
        {DASH_STATS.map(({ val, label, color }) => (
          <div className="dash-stat" key={label}>
            <div className="dash-stat-val" style={{ color }}>{val}</div>
            <div className="dash-stat-label">{label}</div>
          </div>
        ))}
      </div>
    </div>
  );
}
