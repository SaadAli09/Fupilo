"use client";

// components/Navbar.tsx

import { useState } from "react";

const NAV_LINKS = ["Tools", "Reviews", "Categories", "Blog", "Deals"] as const;

export default function Navbar() {
  const [open, setOpen] = useState(false);
  const toggle = () => setOpen((o) => !o);

  return (
    <nav className="aiv-nav">
      {/* ── Logo ── */}
      <a href="#" className="nav-logo">
        <div className="nav-logo-icon">✦</div>
        AI<span className="logo-accent">Vault</span>
      </a>

      {/* ── Desktop links ── */}
      <ul className="nav-links">
        {NAV_LINKS.map((link) => (
          <li key={link}>
            <a href="#">{link}</a>
          </li>
        ))}
      </ul>

      {/* ── Actions ── */}
      <div className="nav-actions">
        <button className="btn-ghost">Sign In</button>
        <button className="btn-nav-cta">Get Started Free</button>

        {/* Hamburger — visible on mobile via CSS */}
        <button className="hamburger" aria-label="Toggle menu" onClick={toggle}>
          <span />
          <span />
          <span />
        </button>
      </div>

      {/* ── Mobile drawer ── */}
      {open && (
        <div className="nav-mobile-menu">
          {NAV_LINKS.map((link) => (
            <a key={link} href="#" onClick={toggle}>
              {link}
            </a>
          ))}
        </div>
      )}
    </nav>
  );
}
