import Link from "next/link";

export default function Hero() {
  return (
    <section
      style={{
        borderBottom: "0.5px solid var(--border)",
        padding: "80px 24px 72px",
        maxWidth: "1200px",
        margin: "0 auto",
      }}
    >
      <div
        style={{
          display: "inline-flex",
          alignItems: "center",
          gap: "8px",
          fontSize: "12px",
          color: "var(--accent-text)",
          background: "var(--accent-bg)",
          border: "0.5px solid var(--accent-border)",
          borderRadius: "20px",
          padding: "4px 14px",
          marginBottom: "28px",
        }}
      >
        <span
          style={{
            width: "6px",
            height: "6px",
            borderRadius: "50%",
            background: "var(--accent)",
            display: "inline-block",
          }}
        />
        New arrivals 2026
      </div>

      <h1
        style={{
          fontSize: "clamp(36px, 6vw, 64px)",
          fontWeight: "500",
          lineHeight: "1.05",
          letterSpacing: "-2px",
          marginBottom: "20px",
          maxWidth: "600px",
        }}
      >
        The gear that{" "}
        <span style={{ color: "var(--text-muted)" }}>moves you forward.</span>
      </h1>

      <p
        style={{
          fontSize: "15px",
          color: "var(--text-secondary)",
          lineHeight: "1.7",
          maxWidth: "420px",
          marginBottom: "36px",
        }}
      >
        Premium tech, curated for creators and builders. Free shipping on orders
        over $99.
      </p>

      <div style={{ display: "flex", gap: "10px", flexWrap: "wrap" }}>
        <Link
          href="#catalog"
          style={{
            fontSize: "14px",
            color: "#000",
            background: "#fff",
            textDecoration: "none",
            padding: "10px 24px",
            borderRadius: "8px",
            fontWeight: "500",
            transition: "opacity 0.15s",
          }}
        >
          Shop now
        </Link>
        <Link
          href="#catalog"
          style={{
            fontSize: "14px",
            color: "var(--text-secondary)",
            textDecoration: "none",
            padding: "10px 24px",
            borderRadius: "8px",
            border: "0.5px solid var(--border-hover)",
            transition: "all 0.15s",
          }}
        >
          View deals
        </Link>
      </div>
    </section>
  );
}
