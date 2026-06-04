"use client";

// components/Hero.tsx

import { useEffect, useRef, useState } from "react";
import Dashboard from "./Dashboard";

// ── Data ─────────────────────────────────────────────────────
const TRUST_STATS = [
  { target: 300, suffix: "+",  label: "AI Tools"         },
  { target: 48,  suffix: "K+", label: "Monthly Users"    },
  { target: 2.1, suffix: "M",  label: "Commissions Paid" },
] as const;

const TRUST_BADGES = [
  { icon: "🔒", label: "Verified Reviews" },
  { icon: "⚡", label: "Updated Daily"    },
  { icon: "💎", label: "Exclusive Deals"  },
  { icon: "🆓", label: "Free to Use"      },
] as const;

// ── useCountUp hook ───────────────────────────────────────────
function useCountUp(target: number, suffix: string, delay = 600): string {
  const [display, setDisplay] = useState("0" + suffix);
  const started = useRef(false);

  useEffect(() => {
    if (started.current) return;
    started.current = true;
    const isFloat  = target % 1 !== 0;
    const duration = 1800;
    const t0       = performance.now() + delay;

    function tick(now: number) {
      if (now < t0) { requestAnimationFrame(tick); return; }
      const elapsed  = now - t0;
      const progress = Math.min(elapsed / duration, 1);
      const eased    = 1 - Math.pow(1 - progress, 3);
      const val      = target * eased;
      setDisplay((isFloat ? val.toFixed(1) : Math.round(val)) + suffix);
      if (progress < 1) requestAnimationFrame(tick);
    }
    requestAnimationFrame(tick);
  }, [target, suffix, delay]);

  return display;
}

// ── TrustStat ─────────────────────────────────────────────────
function TrustStat({
  target,
  suffix,
  label,
}: {
  target: number;
  suffix: string;
  label: string;
}) {
  const display = useCountUp(target, suffix);
  return (
    <div className="trust-stat">
      <span className="trust-stat-num">{display}</span>
      <span className="trust-stat-label">{label}</span>
    </div>
  );
}

// ── Hero (main export) ────────────────────────────────────────
import Link from "next/link";

export default function Hero() {
  return (
    <section className="hero">

      {/* ── Left copy ── */}
      <div className="hero-left">

        <div className="badge-pill">
          <span className="badge-dot" />
          300+ AI Tools Reviewed &amp; Ranked
        </div>

        <h1 className="hero-headline">
          Discover The Best<br />
          <span className="headline-gradient">AI Tools</span> For<br />
          Online Success
        </h1>

        <p className="hero-sub">
          Compare, review, and find the most powerful AI tools for creators,
          freelancers, and entrepreneurs. One platform. Every tool. Real results.
        </p>

        <div className="hero-ctas">
          <Link href="/tools" className="btn-primary">
  <span className="btn-icon">⚡</span>
  Explore Tools
</Link>
          <a href="#" className="btn-secondary">
            <span className="btn-icon">★</span> View Reviews
          </a>
        </div>

        {/* ── Animated trust stats ── */}
        <div className="trust-row">
          {TRUST_STATS.map((s, i) => (
            <div key={s.label} style={{ display: "contents" }}>
              {i > 0 && <div className="trust-divider" />}
              <TrustStat target={s.target} suffix={s.suffix} label={s.label} />
            </div>
          ))}
        </div>

        {/* ── Trust badges ── */}
        <div
          className="trust-badges"
          style={{
            marginTop:          22,
            animation:          "fadeUp 0.7s ease 0.5s both",
            opacity:            0,
            animationFillMode:  "both",
          }}
        >
          {TRUST_BADGES.map(({ icon, label }) => (
            <span key={label} className="trust-badge">
              <span className="trust-badge-icon">{icon}</span> {label}
            </span>
          ))}
        </div>
      </div>

      {/* ── Right — dashboard panel ── */}
      <div className="hero-right">

        {/* Floating earnings card */}
        <div className="float-card float-card-1">
          <div className="float-label">This Month Earnings</div>
          <div className="float-value">$4,820</div>
          <div className="float-badge">
            <span className="float-up">↑ 24.3%</span>
            <span style={{ fontSize: "0.68rem", color: "var(--text-muted)" }}>
              vs last month
            </span>
          </div>
        </div>

        {/* Floating notification card */}
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
  );
}
