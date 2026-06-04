"use client";

import { useEffect, useRef, useState } from "react";

/* ─────────────────────────────────────────
   DATA
───────────────────────────────────────── */
const NAV_LINKS = ["Tools", "Reviews", "Categories", "Blog", "Deals"] as const;

const TOOLS = [
  { emoji: "🤖", bg: "linear-gradient(135deg,#1a1a3e,#2a1a5e)", name: "ChatGPT Plus",  category: "Writing · Productivity", rating: "4.9", commission: "45% comm." },
  { emoji: "🎨", bg: "linear-gradient(135deg,#1a2e1a,#1a4a2e)", name: "Midjourney v7", category: "Design · Image AI",       rating: "4.8", commission: "38% comm." },
  { emoji: "⚡", bg: "linear-gradient(135deg,#2e1a1a,#4a2a1a)", name: "Jasper AI",     category: "Copywriting · SEO",       rating: "4.7", commission: "30% comm." },
  { emoji: "🎬", bg: "linear-gradient(135deg,#1a2a3e,#1a3a4a)", name: "Runway ML",     category: "Video · Creative",        rating: "4.6", commission: "35% comm." },
] as const;

const TRUST_STATS = [
  { target: 300,  suffix: "+",  label: "Gaming Gear."         },
  { target: 48,   suffix: "K+", label: "Monthly Users"    },
  { target: 2.1,  suffix: "M",  label: "Commissions Paid" },
] as const;

const TRUST_BADGES = [
  { icon: "🔒", label: "Verified Reviews" },
  { icon: "⚡", label: "Updated Daily"    },
  { icon: "💎", label: "Exclusive Deals"  },
  { icon: "🆓", label: "Free to Use"      },
] as const;

const STRIP_LOGOS = ["ProductHunt", "TechCrunch", "Forbes", "Wired", "The Verge", "Mashable"] as const;

const DASH_STATS = [
  { val: "12.4K", label: "Clicks Today",  color: "var(--text)"    },
  { val: "892",   label: "Conversions",   color: "#a78bfa"         },
  { val: "$684",  label: "Revenue",       color: "#4ade80"         },
] as const;

/* ─────────────────────────────────────────
   COUNTER HOOK
───────────────────────────────────────── */
function useCountUp(target: number, suffix: string, delay = 600) {
  const [display, setDisplay] = useState("0" + suffix);
  const started = useRef(false);

  useEffect(() => {
    if (started.current) return;
    started.current = true;
    const isFloat = target % 1 !== 0;
    const duration = 1800;
    const t0 = performance.now() + delay;

    function tick(now: number) {
      if (now < t0) { requestAnimationFrame(tick); return; }
      const elapsed = now - t0;
      const progress = Math.min(elapsed / duration, 1);
      const eased = 1 - Math.pow(1 - progress, 3);
      const val = target * eased;
      setDisplay((isFloat ? val.toFixed(1) : Math.round(val)) + suffix);
      if (progress < 1) requestAnimationFrame(tick);
    }
    requestAnimationFrame(tick);
  }, [target, suffix, delay]);

  return display;
}

/* ─────────────────────────────────────────
   SUB-COMPONENTS
───────────────────────────────────────── */
function TrustStat({ target, suffix, label }: { target: number; suffix: string; label: string }) {
  const display = useCountUp(target, suffix);
  return (
    <div className="trust-stat">
      <span className="trust-stat-num">{display}</span>
      <span className="trust-stat-label">{label}</span>
    </div>
  );
}

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
        opacity: visible ? 1 : 0,
        transform: visible ? "translateX(0)" : "translateX(20px)",
        transition: "opacity 0.5s ease, transform 0.5s ease",
      }}
    >
      <div className="tool-emoji" style={{ background: tool.bg }}>{tool.emoji}</div>
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

function Dashboard() {
  const [mounted, setMounted] = useState(false);
  useEffect(() => { const id = setTimeout(() => setMounted(true), 100); return () => clearTimeout(id); }, []);

  return (
    <div
      className="dashboard-card"
      style={{
        opacity: mounted ? 1 : 0,
        transform: mounted ? "translateY(0)" : "translateY(30px)",
        transition: "opacity 0.8s ease 0.3s, transform 0.8s ease 0.3s",
      }}
    >
      {/* Header */}
      <div className="dash-header">
        <span className="dash-title">Top</span>
        <span className="dash-live">
          <span className="live-dot" />
          {" "}Live
        </span>
      </div>

      {/* Tool rows */}
      <div className="tool-list">
        {TOOLS.map((tool, i) => <ToolRow key={tool.name} tool={tool} index={i} />)}
      </div>

      {/* Sparkline */}
      <div className="dash-chart">
        <div className="chart-label">
          <span>Affiliate Clicks (7 days)</span>
          <span className="chart-value">+18.4% ↑</span>
        </div>
        <svg className="sparkline" viewBox="0 0 440 50" preserveAspectRatio="none" aria-hidden="true">
          <defs>
            <linearGradient id="lineGrad" x1="0" y1="0" x2="1" y2="0">
              <stop offset="0%" stopColor="#3b82f6" />
              <stop offset="100%" stopColor="#8b5cf6" />
            </linearGradient>
            <linearGradient id="fillGrad" x1="0" y1="0" x2="0" y2="1">
              <stop offset="0%" stopColor="#8b5cf6" stopOpacity="0.3" />
              <stop offset="100%" stopColor="#3b82f6" stopOpacity="0" />
            </linearGradient>
          </defs>
          <path d="M0,40 L60,32 L120,28 L180,20 L240,22 L300,14 L360,8 L440,4 L440,50 L0,50 Z" fill="url(#fillGrad)" />
          <path d="M0,40 L60,32 L120,28 L180,20 L240,22 L300,14 L360,8 L440,4" fill="none" stroke="url(#lineGrad)" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" />
          <circle cx="60"  cy="32" r="3" fill="#3b82f6" />
          <circle cx="180" cy="20" r="3" fill="#6366f1" />
          <circle cx="300" cy="14" r="3" fill="#8b5cf6" />
          <circle cx="440" cy="4"  r="4" fill="#a78bfa" stroke="#1a0a3e" strokeWidth="2" />
        </svg>
      </div>

      {/* Stats strip */}
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

/* ─────────────────────────────────────────
   MOBILE NAV HOOK
───────────────────────────────────────── */
function useHamburger() {
  const [open, setOpen] = useState(false);
  const toggle = () => setOpen((o) => !o);
  return { open, toggle };
}

/* ─────────────────────────────────────────
   PAGE
───────────────────────────────────────── */
export default function Page() {
  const { open, toggle } = useHamburger();

  return (
    <>
      {/* ── Global styles ── */}
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Syne:wght@400;600;700;800&family=DM+Sans:ital,opsz,wght@0,9..40,300;0,9..40,400;0,9..40,500;1,9..40,300&display=swap');

        *, *::before, *::after { box-sizing: border-box; margin: 0; padding: 0; }

        :root {
          --bg-deep:       #060611;
          --bg-mid:        #0b0b1e;
          --blue:          #3b82f6;
          --blue-light:    #60a5fa;
          --purple:        #8b5cf6;
          --purple-light:  #a78bfa;
          --cyan:          #22d3ee;
          --pink:          #f472b6;
          --text:          #f0f0ff;
          --text-muted:    #8888aa;
          --glass-bg:      rgba(255,255,255,0.04);
          --glass-border:  rgba(255,255,255,0.09);
          --glow-blue:     rgba(59,130,246,0.35);
          --glow-purple:   rgba(139,92,246,0.35);
          --radius-lg:     18px;
          --radius-md:     12px;
          --radius-sm:     8px;
          --font-head:     'Syne', sans-serif;
          --font-body:     'DM Sans', sans-serif;
        }

        html { scroll-behavior: smooth; }

        body {
          background: var(--bg-deep);
          color: var(--text);
          font-family: var(--font-body);
          min-height: 100vh;
          overflow-x: hidden;
        }

        /* noise overlay */
        body::before {
          content: '';
          position: fixed; inset: 0;
          background-image: url("data:image/svg+xml,%3Csvg viewBox='0 0 256 256' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noise'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.9' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noise)' opacity='0.03'/%3E%3C/svg%3E");
          pointer-events: none; z-index: 0;
        }

        /* glow blobs */
        .glow-blob { position: absolute; border-radius: 50%; filter: blur(90px); pointer-events: none; }
        .glow-blob-1 {
          width: 600px; height: 600px;
          background: radial-gradient(circle, rgba(139,92,246,0.22) 0%, transparent 70%);
          top: -200px; left: -150px;
          animation: driftA 12s ease-in-out infinite alternate;
        }
        .glow-blob-2 {
          width: 500px; height: 500px;
          background: radial-gradient(circle, rgba(59,130,246,0.2) 0%, transparent 70%);
          top: 100px; right: -100px;
          animation: driftB 15s ease-in-out infinite alternate;
        }
        .glow-blob-3 {
          width: 350px; height: 350px;
          background: radial-gradient(circle, rgba(34,211,238,0.12) 0%, transparent 70%);
          bottom: 0; left: 40%;
          animation: driftC 10s ease-in-out infinite alternate;
        }
        @keyframes driftA { from { transform: translate(0,0) scale(1); }    to { transform: translate(60px,40px) scale(1.1); } }
        @keyframes driftB { from { transform: translate(0,0) scale(1.05); } to { transform: translate(-50px,30px) scale(0.95); } }
        @keyframes driftC { from { transform: translate(0,0); }             to { transform: translate(30px,-40px); } }

        /* navbar */ 
        .aiv-nav {
          position: fixed; top: 0; left: 0; right: 0; z-index: 100;
          display: flex; align-items: center; justify-content: space-between;
          padding: 0 clamp(20px, 5vw, 60px);
          height: 68px;
          background: rgba(6,6,17,0.7);
          backdrop-filter: blur(20px) saturate(180%);
          border-bottom: 1px solid var(--glass-border);
        }
        .nav-logo {
          display: flex; align-items: center; gap: 10px;
          font-family: var(--font-head); font-weight: 800; font-size: 1.25rem;
          letter-spacing: -0.02em; text-decoration: none; color: var(--text);
        }
        .nav-logo-icon {
          width: 32px; height: 32px; border-radius: 8px;
          background: linear-gradient(135deg, var(--blue) 0%, var(--purple) 100%);
          display: flex; align-items: center; justify-content: center; font-size: 16px;
        }
        .logo-accent { color: var(--blue-light); }

        .nav-links { display: flex; gap: 32px; list-style: none; }
        .nav-links a {
          text-decoration: none; color: var(--text-muted);
          font-size: 0.875rem; font-weight: 400; transition: color 0.2s; letter-spacing: 0.01em;
        }
        .nav-links a:hover { color: var(--text); }

        .nav-mobile-menu {
          position: absolute; top: 68px; left: 0; right: 0;
          background: rgba(6,6,17,0.97);
          border-bottom: 1px solid var(--glass-border);
          padding: 20px 24px 24px;
          display: flex; flex-direction: column; gap: 16px;
          z-index: 99;
        }
        .nav-mobile-menu a {
          text-decoration: none; color: var(--text-muted);
          font-size: 1rem; font-weight: 400; transition: color 0.2s;
        }
        .nav-mobile-menu a:hover { color: var(--text); }

        .nav-actions { display: flex; align-items: center; gap: 12px; }

        .btn-ghost {
          background: none; border: 1px solid var(--glass-border);
          color: var(--text-muted); padding: 8px 18px; border-radius: 8px;
          font-family: var(--font-body); font-size: 0.875rem; font-weight: 500;
          cursor: pointer; transition: all 0.2s;
        }
        .btn-ghost:hover { color: var(--text); border-color: rgba(255,255,255,0.2); background: var(--glass-bg); }

        .btn-nav-cta {
          background: linear-gradient(135deg, var(--blue) 0%, var(--purple) 100%);
          border: none; color: #fff; padding: 9px 20px; border-radius: 8px;
          font-family: var(--font-body); font-size: 0.875rem; font-weight: 600;
          cursor: pointer; transition: all 0.25s;
          box-shadow: 0 0 20px rgba(139,92,246,0.3);
        }
        .btn-nav-cta:hover { transform: translateY(-1px); box-shadow: 0 0 30px rgba(139,92,246,0.5); }

        .hamburger {
          display: none; flex-direction: column; gap: 5px;
          background: none; border: none; cursor: pointer; padding: 4px;
        }
        .hamburger span {
          display: block; width: 22px; height: 2px;
          background: var(--text-muted); border-radius: 2px; transition: all 0.3s;
        }

        /* hero */
        .hero {
          position: relative; overflow: hidden; min-height: 100vh;
          display: flex; align-items: center;
          padding: 100px clamp(20px, 5vw, 60px) 60px; gap: 48px;
        }
        .hero-left { flex: 1; min-width: 0; position: relative; z-index: 2; max-width: 620px; }

        .badge-pill {
          display: inline-flex; align-items: center; gap: 8px;
          background: rgba(59,130,246,0.1); border: 1px solid rgba(59,130,246,0.25);
          border-radius: 100px; padding: 6px 14px 6px 8px;
          font-size: 0.78rem; font-weight: 500; color: var(--blue-light);
          margin-bottom: 28px; animation: fadeUp 0.7s ease both;
        }
        .badge-dot {
          width: 6px; height: 6px; border-radius: 50%;
          background: var(--cyan); box-shadow: 0 0 8px var(--cyan);
          animation: pulse 2s ease infinite;
        }
        @keyframes pulse { 0%,100%{ opacity:1; } 50%{ opacity:0.4; } }

        .hero-headline {
          font-family: var(--font-head); font-size: clamp(2.4rem, 5.5vw, 4.2rem);
          font-weight: 800; line-height: 1.05; letter-spacing: -0.03em;
          margin-bottom: 22px; animation: fadeUp 0.7s ease 0.1s both;
        }
        .headline-gradient {
          background: linear-gradient(100deg, var(--blue-light) 0%, var(--purple-light) 55%, var(--pink) 100%);
          -webkit-background-clip: text; -webkit-text-fill-color: transparent; background-clip: text;
        }
        .hero-sub {
          font-size: clamp(1rem, 1.8vw, 1.15rem); color: var(--text-muted);
          font-weight: 300; line-height: 1.7; max-width: 500px;
          margin-bottom: 38px; animation: fadeUp 0.7s ease 0.2s both;
        }
        .hero-ctas {
          display: flex; gap: 14px; flex-wrap: wrap;
          margin-bottom: 52px; animation: fadeUp 0.7s ease 0.3s both;
        }
        .btn-primary {
          display: inline-flex; align-items: center; gap: 8px;
          background: linear-gradient(135deg, var(--blue) 0%, var(--purple) 100%);
          color: #fff; font-family: var(--font-body); font-weight: 600;
          font-size: 0.95rem; padding: 14px 28px; border-radius: var(--radius-sm);
          border: none; cursor: pointer; text-decoration: none;
          box-shadow: 0 0 40px rgba(139,92,246,0.4), inset 0 1px 0 rgba(255,255,255,0.15);
          transition: all 0.3s; position: relative; overflow: hidden;
        }
        .btn-primary::after {
          content: ''; position: absolute; inset: 0;
          background: linear-gradient(135deg, transparent 40%, rgba(255,255,255,0.1));
          opacity: 0; transition: opacity 0.3s;
        }
        .btn-primary:hover { transform: translateY(-2px); box-shadow: 0 0 60px rgba(139,92,246,0.6), inset 0 1px 0 rgba(255,255,255,0.15); }
        .btn-primary:hover::after { opacity: 1; }

        .btn-secondary {
          display: inline-flex; align-items: center; gap: 8px;
          background: var(--glass-bg); border: 1px solid var(--glass-border);
          color: var(--text); font-family: var(--font-body); font-weight: 500;
          font-size: 0.95rem; padding: 14px 28px; border-radius: var(--radius-sm);
          cursor: pointer; text-decoration: none;
          backdrop-filter: blur(10px); transition: all 0.3s;
        }
        .btn-secondary:hover { background: rgba(255,255,255,0.08); border-color: rgba(255,255,255,0.2); transform: translateY(-2px); }
        .btn-icon { font-size: 1.1em; }

        .trust-row { display: flex; align-items: center; gap: 24px; flex-wrap: wrap; animation: fadeUp 0.7s ease 0.4s both; }
        .trust-divider { width: 1px; height: 32px; background: var(--glass-border); }
        .trust-stat { display: flex; flex-direction: column; gap: 2px; }
        .trust-stat-num { font-family: var(--font-head); font-weight: 700; font-size: 1.1rem; color: var(--text); }
        .trust-stat-label { font-size: 0.72rem; color: var(--text-muted); letter-spacing: 0.04em; text-transform: uppercase; }

        .trust-badges { display: flex; align-items: center; gap: 10px; flex-wrap: wrap; margin-top: 6px; }
        .trust-badge {
          display: inline-flex; align-items: center; gap: 6px;
          background: var(--glass-bg); border: 1px solid var(--glass-border);
          border-radius: 100px; padding: 5px 12px;
          font-size: 0.75rem; color: var(--text-muted); backdrop-filter: blur(8px);
        }
        .trust-badge-icon { font-size: 0.85em; }

        /* hero right */
        .hero-right { flex: 0 0 auto; width: min(500px, 100%); position: relative; z-index: 2; animation: fadeUp 0.8s ease 0.2s both; }

        .dashboard-card {
          background: rgba(11,11,30,0.7); border: 1px solid var(--glass-border);
          border-radius: var(--radius-lg); padding: 22px;
          backdrop-filter: blur(24px);
          box-shadow: 0 30px 80px rgba(0,0,0,0.5), 0 0 0 1px rgba(255,255,255,0.03), inset 0 1px 0 rgba(255,255,255,0.06);
          position: relative;
        }
        .dashboard-card::before {
          content: ''; position: absolute; inset: 0; border-radius: var(--radius-lg);
          background: linear-gradient(135deg, rgba(59,130,246,0.05) 0%, rgba(139,92,246,0.05) 100%);
          pointer-events: none;
        }
        .dash-header { display: flex; align-items: center; justify-content: space-between; margin-bottom: 18px; }
        .dash-title { font-family: var(--font-head); font-size: 0.85rem; font-weight: 600; color: var(--text-muted); letter-spacing: 0.05em; text-transform: uppercase; }
        .dash-live { display: flex; align-items: center; gap: 6px; font-size: 0.72rem; color: #4ade80; }
        .live-dot { width: 6px; height: 6px; border-radius: 50%; background: #4ade80; box-shadow: 0 0 8px #4ade80; animation: pulse 1.5s ease infinite; display: inline-block; }

        .tool-list { display: flex; flex-direction: column; gap: 10px; margin-bottom: 20px; }
        .tool-row {
          display: flex; align-items: center; gap: 12px;
          background: rgba(255,255,255,0.03); border: 1px solid rgba(255,255,255,0.06);
          border-radius: var(--radius-md); padding: 12px 14px; cursor: pointer;
        }
        .tool-row:hover { background: rgba(255,255,255,0.06); border-color: rgba(139,92,246,0.25); transform: translateX(3px); box-shadow: 0 0 20px rgba(139,92,246,0.1); }
        .tool-emoji { width: 38px; height: 38px; border-radius: 10px; display: flex; align-items: center; justify-content: center; font-size: 1.2rem; flex-shrink: 0; }
        .tool-info { flex: 1; min-width: 0; }
        .tool-name { font-size: 0.875rem; font-weight: 600; color: var(--text); margin-bottom: 2px; }
        .tool-category { font-size: 0.72rem; color: var(--text-muted); }
        .tool-meta { display: flex; flex-direction: column; align-items: flex-end; gap: 4px; }
        .tool-rating { font-size: 0.8rem; font-weight: 700; color: #fbbf24; display: flex; align-items: center; gap: 3px; }
        .tool-commission { font-size: 0.7rem; color: #4ade80; font-weight: 500; background: rgba(74,222,128,0.1); border-radius: 4px; padding: 1px 6px; }

        .dash-chart { background: rgba(255,255,255,0.02); border-radius: var(--radius-sm); padding: 14px; border: 1px solid rgba(255,255,255,0.05); margin-bottom: 16px; }
        .chart-label { font-size: 0.72rem; color: var(--text-muted); margin-bottom: 10px; display: flex; justify-content: space-between; }
        .chart-value { font-weight: 600; color: #4ade80; }
        .sparkline { width: 100%; height: 50px; }

        .dash-stats { display: grid; grid-template-columns: repeat(3,1fr); gap: 10px; }
        .dash-stat { background: rgba(255,255,255,0.03); border-radius: var(--radius-sm); padding: 10px 12px; border: 1px solid rgba(255,255,255,0.05); text-align: center; }
        .dash-stat-val { font-family: var(--font-head); font-size: 1rem; font-weight: 700; }
        .dash-stat-label { font-size: 0.65rem; color: var(--text-muted); margin-top: 2px; }

        /* floating cards */
        .float-card {
          position: absolute; background: rgba(11,11,30,0.85);
          border: 1px solid var(--glass-border); border-radius: var(--radius-md);
          backdrop-filter: blur(20px); padding: 12px 16px;
          box-shadow: 0 16px 40px rgba(0,0,0,0.4); pointer-events: none;
        }
        .float-card-1 { top: -24px; left: -40px; animation: floatA 5s ease-in-out infinite; }
        .float-card-2 { bottom: -20px; right: -36px; animation: floatB 6s ease-in-out infinite; }
        @keyframes floatA { 0%,100%{ transform: translateY(0) rotate(-2deg); } 50%{ transform: translateY(-10px) rotate(-1deg); } }
        @keyframes floatB { 0%,100%{ transform: translateY(0) rotate(1.5deg); } 50%{ transform: translateY(8px) rotate(0.5deg); } }
        .float-label { font-size: 0.7rem; color: var(--text-muted); margin-bottom: 4px; }
        .float-value { font-family: var(--font-head); font-size: 1.05rem; font-weight: 700; color: var(--text); }
        .float-badge { display: flex; align-items: center; gap: 5px; margin-top: 3px; }
        .float-up { font-size: 0.72rem; color: #4ade80; font-weight: 600; }
        .float-notify { display: flex; align-items: flex-start; gap: 10px; min-width: 180px; }
        .float-notify-icon {
          width: 28px; height: 28px; border-radius: 7px;
          background: linear-gradient(135deg, var(--purple) 0%, var(--blue) 100%);
          display: flex; align-items: center; justify-content: center; font-size: 0.85rem; flex-shrink: 0;
        }
        .float-notify-text { flex: 1; }
        .float-notify-title { font-size: 0.78rem; font-weight: 600; color: var(--text); }
        .float-notify-sub { font-size: 0.68rem; color: var(--text-muted); margin-top: 1px; }

        @keyframes fadeUp { from { opacity: 0; transform: translateY(24px); } to { opacity: 1; transform: translateY(0); } }

        /* trust strip */
        .trust-strip { position: relative; z-index: 2; padding: 0 clamp(20px, 5vw, 60px) 80px; }
        .trust-strip-inner {
          border-top: 1px solid var(--glass-border); padding-top: 36px;
          display: flex; align-items: center; justify-content: center;
          gap: clamp(24px, 4vw, 60px); flex-wrap: wrap;
        }
        .strip-label { font-size: 0.78rem; color: var(--text-muted); text-transform: uppercase; letter-spacing: 0.1em; white-space: nowrap; }
        .strip-logos { display: flex; align-items: center; gap: clamp(20px, 3vw, 44px); flex-wrap: wrap; }
        .strip-logo { font-family: var(--font-head); font-weight: 700; font-size: 1rem; color: rgba(255,255,255,0.18); letter-spacing: -0.02em; transition: color 0.3s; cursor: default; }
        .strip-logo:hover { color: rgba(255,255,255,0.4); }

        /* responsive */
        @media (max-width: 960px) {
          .hero { flex-direction: column; align-items: flex-start; padding-top: 110px; }
          .hero-right { width: 100%; max-width: 520px; align-self: center; }
          .float-card-1, .float-card-2 { display: none; }
          .nav-links { display: none; }
          .hamburger { display: flex; }
        }
        @media (max-width: 600px) {
          .nav-actions .btn-ghost { display: none; }
          .hero-ctas { gap: 10px; }
          .btn-primary, .btn-secondary { padding: 12px 20px; font-size: 0.9rem; }
          .trust-row { gap: 16px; }
        }

        ::-webkit-scrollbar { width: 6px; }
        ::-webkit-scrollbar-track { background: var(--bg-black); }
        ::-webkit-scrollbar-thumb { background: rgba(139,92,246,0.4); border-radius: 3px; }
      `}</style>

      {/* ── Ambient blobs ── */}
      <div className="glow-blob glow-blob-1" aria-hidden="true" />
      <div className="glow-blob glow-blob-2" aria-hidden="true" />
      <div className="glow-blob glow-blob-3" aria-hidden="true" />

      {/* ── Navbar ── */}
      <nav className="aiv-nav">
        <a href="#" className="nav-logo">
          <div className="nav-logo-icon">✦</div>
          Fupilo<span className="logo-accent"></span>
        </a>

        <ul className="nav-links">
          {NAV_LINKS.map((link) => (
            <li key={link}><a href="#">{link}</a></li>
          ))}
        </ul>

        <div className="nav-actions">
          <button className="btn-ghost">Sign In</button>
          <button className="btn-nav-cta">Get Started Free</button>
          <button className="hamburger" aria-label="Toggle menu" onClick={toggle}>
            <span /><span /><span />
          </button>
        </div>

        {open && (
          <div className="nav-mobile-menu">
            {NAV_LINKS.map((link) => (
              <a key={link} href="#" onClick={() => toggle()}>{link}</a>
            ))}
          </div>
        )}
      </nav>

      {/* ── Hero ── */}
      <section className="hero">
        {/* Left copy */}
        <div className="hero-left">
          <div className="badge-pill">
            <span className="badge-dot" />
            300+ Gaming Gear. Reviewed &amp; Ranked
          </div>

          <h1 className="hero-headline">
            Discover The Best
Gaming Gear For
2026<br />
            <span className="headline-gradient">Gaming Gear.</span> For<br />
            Online Success
          </h1>

          <p className="hero-sub">
            Compare, review, and find the most powerful Gaming Gear. for creators, freelancers, and entrepreneurs. One platform. Every tool. Real results.
          </p>

          <div className="hero-ctas">
            <a href="#" className="btn-primary">
              <span className="btn-icon">⚡</span> View Deals
            </a>
            <a href="#" className="btn-secondary">
              <span className="btn-icon">★</span> View Reviews
            </a>
          </div>

          {/* Trust stats */}
          <div className="trust-row">
            {TRUST_STATS.map((s, i) => (
              <div key={s.label} style={{ display: "contents" }}>
                {i > 0 && <div className="trust-divider" />}
                <TrustStat target={s.target} suffix={s.suffix} label={s.label} />
              </div>
            ))}
          </div>

          {/* Trust badges */}
          <div
            className="trust-badges"
            style={{ marginTop: 22, animation: "fadeUp 0.7s ease 0.5s both", opacity: 0, animationFillMode: "both" }}
          >
            {TRUST_BADGES.map(({ icon, label }) => (
              <span key={label} className="trust-badge">
                <span className="trust-badge-icon">{icon}</span> {label}
              </span>
            ))}
          </div>
        </div>

        {/* Right — dashboard */}
        <div className="hero-right">
          {/* Floating card 1 */}
          <div className="float-card float-card-1">
            <div className="float-label">This Month Earnings</div>
            <div className="float-value">$4,820</div>
            <div className="float-badge">
              <span className="float-up">↑ 24.3%</span>
              <span style={{ fontSize: "0.68rem", color: "var(--text-muted)" }}>vs last month</span>
            </div>
          </div>

          {/* Floating card 2 */}
          <div className="float-card float-card-2">
            <div className="float-notify">
              <div className="float-notify-icon">🤖</div>
              <div className="float-notify-text">
                <div className="float-notify-title">New Tool Listed</div>
                <div className="float-notify-sub">Claude 4 · 40% commission</div>
              </div>
            </div>
          </div>

          <Dashboard />
        </div>
      </section>

      {/* ── Trust strip ── */}
      <div className="trust-strip">
        <div className="trust-strip-inner">
          <span className="strip-label">Featured on</span>
          <div className="strip-logos">
            {STRIP_LOGOS.map((logo) => (
              <span key={logo} className="strip-logo">{logo}</span>
            ))}
          </div>
        </div>
      </div>
    </>
  );
}