export default function PrivacyPage() {
  return (
  <main
    style={{
      maxWidth: "900px",
      margin: "0 auto",
      padding: "80px 24px",
      color: "white",
    }}
  >
    <div
      style={{
        background: "rgba(255,255,255,0.03)",
        border: "1px solid rgba(255,255,255,0.1)",
        borderRadius: "20px",
        padding: "40px",
      }}
    >
      <h1 style={{ fontSize: "48px", marginBottom: "20px" }}>
        Privacy Policy
      </h1>

      <p style={{ marginBottom: "30px", lineHeight: "1.8" }}>
        Your privacy is important to us. This website does not sell or share
        your personal information with third parties.
      </p>

      <h2>Information We Collect</h2>

      <p style={{ marginBottom: "30px", lineHeight: "1.8" }}>
        We may collect information you voluntarily provide such as your name
        and email address.
      </p>

      <h2>How We Use Information</h2>

      <p style={{ marginBottom: "30px", lineHeight: "1.8" }}>
        Information is used to improve our services and communicate with users.
      </p>

      <h2>Contact</h2>

      <p style={{ lineHeight: "1.8" }}>
        If you have any questions regarding this policy, please contact us.
      </p>
  </div>
</main>
);
}