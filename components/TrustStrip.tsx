// components/TrustStrip.tsx
// Static component — no client-side hooks needed.

const STRIP_LOGOS = [
  "ProductHunt",
  "TechCrunch",
  "Forbes",
  "Wired",
  "The Verge",
  "Mashable",
] as const;

export default function TrustStrip() {
  return (
    <div className="trust-strip">
      <div className="trust-strip-inner">
        <span className="strip-label">Featured on</span>
        <div className="strip-logos">
          {STRIP_LOGOS.map((logo) => (
            <span key={logo} className="strip-logo">
              {logo}
            </span>
          ))}
        </div>
      </div>
    </div>
  );
}
