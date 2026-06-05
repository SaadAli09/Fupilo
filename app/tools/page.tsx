export default function ToolsPage() {
  const tools = [
    "ChatGPT",
    "Claude",
    "Gemini",
    "Midjourney",
    "Cursor",
    "Runway",
  ];

  return (
    <main style={{ padding: "40px" }}>
      <h1>AI Tools Directory</h1>

      <div
        style={{
          display: "grid",
          gridTemplateColumns: "repeat(auto-fit,minmax(250px,1fr))",
          gap: "20px",
          marginTop: "30px",
        }}
      >
        {tools.map((tool) => (
          <div
            key={tool}
            style={{
              padding: "20px",
              border: "1px solid #333",
              borderRadius: "12px",
            }}
          >
            <h3>{tool}</h3>
            <p>AI tool description coming soon.</p>
          </div>
        ))}
      </div>
    </main>
  );
}   