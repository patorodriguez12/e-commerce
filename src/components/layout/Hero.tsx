import Link from "next/link";

export default function Hero() {
  return (
    <section
      style={{
        borderBottom: "0.5px solid var(--border)",
        padding: "100px 24px 88px",
        maxWidth: "1200px",
        margin: "0 auto",
      }}
    >
      {/* Gold diamond + label */}
      <div
        style={{
          display: "inline-flex",
          alignItems: "center",
          gap: "8px",
          fontSize: "11px",
          color: "var(--gold)",
          textTransform: "uppercase",
          letterSpacing: "1.5px",
          marginBottom: "32px",
        }}
      >
        <span style={{ fontSize: "10px", opacity: 0.7 }}>◆</span>
        New arrivals 2026
      </div>

      {/* Copper accent line */}
      <div
        style={{
          width: "48px",
          height: "1.5px",
          background: "var(--accent)",
          borderRadius: "1px",
          marginBottom: "28px",
        }}
      />

      <h1
        style={{
          fontSize: "clamp(40px, 6vw, 72px)",
          fontWeight: "500",
          lineHeight: "1.05",
          letterSpacing: "-2px",
          marginBottom: "24px",
          maxWidth: "680px",
          fontFamily: "var(--font-sora)",
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
          maxWidth: "440px",
          marginBottom: "40px",
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
            color: "#fff",
            background: "var(--accent)",
            textDecoration: "none",
            padding: "11px 28px",
            borderRadius: "8px",
            fontWeight: "500",
            transition: "all 0.2s ease",
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
            padding: "11px 28px",
            borderRadius: "8px",
            border: "0.5px solid var(--border-hover)",
            transition: "all 0.2s ease",
          }}
        >
          View deals
        </Link>
      </div>
    </section>
  );
}
