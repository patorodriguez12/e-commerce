export function Skeleton({
  className = "",
  style = {},
}: {
  className?: string;
  style?: React.CSSProperties;
}) {
  return (
    <div
      className={className}
      style={{
        background:
          "linear-gradient(90deg, #1a1a1a 25%, #222222 50%, #1a1a1a 75%)",
        backgroundSize: "200% 100%",
        animation: "shimmer 1.5s infinite",
        borderRadius: "6px",
        ...style,
      }}
    />
  );
}

export function ProductCardSkeleton() {
  return (
    <div
      style={{
        background: "var(--bg-card)",
        border: "0.5px solid var(--border)",
        borderRadius: "12px",
        overflow: "hidden",
      }}
    >
      <Skeleton style={{ aspectRatio: "1", borderRadius: "0" }} />
      <div
        style={{
          padding: "14px",
          display: "flex",
          flexDirection: "column",
          gap: "8px",
        }}
      >
        <Skeleton style={{ height: "10px", width: "40%" }} />
        <Skeleton style={{ height: "14px", width: "75%" }} />
        <div
          style={{
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
            marginTop: "4px",
          }}
        >
          <Skeleton style={{ height: "15px", width: "30%" }} />
          <Skeleton
            style={{ height: "28px", width: "80px", borderRadius: "6px" }}
          />
        </div>
      </div>
    </div>
  );
}

export function ProductGridSkeleton() {
  return (
    <div
      style={{
        display: "grid",
        gridTemplateColumns: "repeat(auto-fill, minmax(200px, 1fr))",
        gap: "16px",
        flex: 1,
      }}
    >
      {Array.from({ length: 6 }).map((_, i) => (
        <ProductCardSkeleton key={i} />
      ))}
    </div>
  );
}

export function FilterSidebarSkeleton() {
  return (
    <div
      style={{
        width: "200px",
        flexShrink: 0,
        display: "flex",
        flexDirection: "column",
        gap: "28px",
      }}
    >
      {Array.from({ length: 4 }).map((_, i) => (
        <div
          key={i}
          style={{ display: "flex", flexDirection: "column", gap: "8px" }}
        >
          <Skeleton style={{ height: "10px", width: "60%" }} />
          {Array.from({ length: 3 }).map((_, j) => (
            <Skeleton key={j} style={{ height: "32px", borderRadius: "6px" }} />
          ))}
        </div>
      ))}
    </div>
  );
}

export function ProductDetailSkeleton() {
  return (
    <div
      style={{
        display: "grid",
        gridTemplateColumns: "repeat(auto-fit, minmax(300px, 1fr))",
        gap: "64px",
        alignItems: "start",
      }}
    >
      {/* Imagen */}
      <Skeleton style={{ aspectRatio: "1", borderRadius: "16px" }} />

      {/* Info */}
      <div style={{ display: "flex", flexDirection: "column", gap: "24px" }}>
        <div style={{ display: "flex", flexDirection: "column", gap: "12px" }}>
          <Skeleton
            style={{ height: "24px", width: "30%", borderRadius: "20px" }}
          />
          <Skeleton style={{ height: "36px", width: "80%" }} />
          <Skeleton style={{ height: "36px", width: "60%" }} />
        </div>

        <div
          style={{
            display: "flex",
            alignItems: "center",
            gap: "16px",
            paddingBottom: "24px",
            borderBottom: "0.5px solid var(--border)",
          }}
        >
          <Skeleton style={{ height: "32px", width: "120px" }} />
          <Skeleton
            style={{ height: "24px", width: "100px", borderRadius: "20px" }}
          />
        </div>

        <div style={{ display: "flex", flexDirection: "column", gap: "8px" }}>
          <Skeleton style={{ height: "14px", width: "100%" }} />
          <Skeleton style={{ height: "14px", width: "90%" }} />
          <Skeleton style={{ height: "14px", width: "75%" }} />
        </div>

        <div style={{ display: "flex", gap: "12px" }}>
          <Skeleton style={{ flex: 1, height: "48px", borderRadius: "8px" }} />
          <Skeleton
            style={{ width: "52px", height: "48px", borderRadius: "8px" }}
          />
        </div>

        <Skeleton style={{ height: "100px", borderRadius: "10px" }} />
      </div>
    </div>
  );
}
