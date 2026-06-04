"use client";

// app/page.tsx
// Thin composition root. All logic and markup live in components/.
// The <style> tag renders the original CSS exactly once at the top level.

import { globalStyles } from "@/lib/styles";
import Navbar      from "@/components/Navbar";
import Hero        from "@/components/Hero";
import TrustStrip  from "@/components/TrustStrip";
import Footer      from "@/components/Footer";

export default function Page() {
  return (
    <>
      {/* ── Single global stylesheet (tokens, resets, all class names) ── */}
      <style>{globalStyles}</style>

      {/* ── Ambient background blobs ── */}
      <div className="glow-blob glow-blob-1" aria-hidden="true" />
      <div className="glow-blob glow-blob-2" aria-hidden="true" />
      <div className="glow-blob glow-blob-3" aria-hidden="true" />

      {/* ── Page sections ── */}
      <Navbar />

      <main>
        <Hero />
        <TrustStrip />
      </main>

      <Footer />
    </>
  );
}
