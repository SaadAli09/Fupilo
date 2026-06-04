// components/Footer.tsx
// Static component — no client-side hooks needed.

const FOOTER_COLS = [
  {
    heading: "Explore",
    links: ["AI Writing Tools", "Image Generators", "Video AI", "Coding Assistants", "SEO Tools"],
  },
  {
    heading: "Company",
    links: ["About", "Blog", "Careers", "Press Kit", "Contact"],
  },
  {
    heading: "Legal",
    links: ["Privacy Policy", "Terms of Use", "Affiliate Disclosure", "Cookie Policy"],
  },
] as const;

const SOCIALS = [
  { label: "X / Twitter", icon: "𝕏",  href: "#" },
  { label: "YouTube",     icon: "▶",  href: "#" },
  { label: "Discord",     icon: "💬", href: "#" },
] as const;

export default function Footer() {
  const year = new Date().getFullYear();

  return (
    <footer className="site-footer">
      <div className="footer-inner">

        {/* ── Brand column ── */}
        <div className="footer-col">
          <a href="#" className="footer-logo-wrap">
            <div className="nav-logo-icon" style={{ width: 28, height: 28, fontSize: 14 }}>
              ✦
            </div>
            AI<span className="logo-accent">Vault</span>
          </a>
          <p className="footer-tagline">
            The independent platform for discovering, comparing, and monetising
            the best AI tools on the internet.
          </p>
          <div className="footer-socials">
            {SOCIALS.map(({ label, icon, href }) => (
              <a key={label} href={href} aria-label={label} className="footer-social-btn">
                {icon}
              </a>
            ))}
          </div>
        </div>

        {/* ── Link columns ── */}
        {FOOTER_COLS.map((col) => (
          <div key={col.heading} className="footer-col">
            <h4>{col.heading}</h4>
            <ul>
              {col.links.map((link) => (
                <li key={link}>
                  <a href="#">{link}</a>
                </li>
              ))}
            </ul>
          </div>
        ))}
      </div>

      {/* ── Bottom bar ── */}
      <div className="footer-bottom">
        <span className="footer-copy">
          © {year} AIVault. All rights reserved. Affiliate links may earn us a commission at no extra cost to you.
        </span>
        <div className="footer-legal">
          <a href="#">Privacy Policy</a>
          <a href="#">Terms of Use</a>
          <a href="#">Affiliate Disclosure</a>
        </div>
      </div>
    </footer>
  );
}
