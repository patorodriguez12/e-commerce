import { ProductDetailSkeleton } from "@/components/ui/Skeleton";

export default function Loading() {
  return (
    <main
      style={{ maxWidth: "1200px", margin: "0 auto", padding: "48px 24px" }}
    >
      <ProductDetailSkeleton />

      {/* Reviews skeleton */}
      <div
        style={{
          marginTop: "48px",
          paddingTop: "48px",
          borderTop: "0.5px solid var(--border)",
          display: "flex",
          flexDirection: "column",
          gap: "20px",
        }}
      >
        <div style={{ display: "flex", alignItems: "center", gap: "16px" }}>
          <div
            style={{
              height: "20px",
              width: "80px",
              background: "#1a1a1a",
              borderRadius: "6px",
              backgroundImage:
                "linear-gradient(90deg, #1a1a1a 25%, #222 50%, #1a1a1a 75%)",
              backgroundSize: "200% 100%",
              animation: "shimmer 1.5s infinite",
            }}
          />
          <div
            style={{
              height: "16px",
              width: "120px",
              background: "#1a1a1a",
              borderRadius: "6px",
              backgroundImage:
                "linear-gradient(90deg, #1a1a1a 25%, #222 50%, #1a1a1a 75%)",
              backgroundSize: "200% 100%",
              animation: "shimmer 1.5s infinite",
            }}
          />
        </div>
        {Array.from({ length: 2 }).map((_, i) => (
          <div
            key={i}
            style={{
              padding: "20px 0",
              borderBottom: "0.5px solid var(--border)",
              display: "flex",
              flexDirection: "column",
              gap: "8px",
            }}
          >
            <div style={{ display: "flex", gap: "10px", alignItems: "center" }}>
              <div
                style={{
                  width: "28px",
                  height: "28px",
                  borderRadius: "50%",
                  background: "#1a1a1a",
                  backgroundImage:
                    "linear-gradient(90deg, #1a1a1a 25%, #222 50%, #1a1a1a 75%)",
                  backgroundSize: "200% 100%",
                  animation: "shimmer 1.5s infinite",
                }}
              />
              <div
                style={{
                  height: "13px",
                  width: "100px",
                  background: "#1a1a1a",
                  borderRadius: "6px",
                  backgroundImage:
                    "linear-gradient(90deg, #1a1a1a 25%, #222 50%, #1a1a1a 75%)",
                  backgroundSize: "200% 100%",
                  animation: "shimmer 1.5s infinite",
                }}
              />
            </div>
            <div
              style={{
                height: "14px",
                width: "80%",
                background: "#1a1a1a",
                borderRadius: "6px",
                marginLeft: "38px",
                backgroundImage:
                  "linear-gradient(90deg, #1a1a1a 25%, #222 50%, #1a1a1a 75%)",
                backgroundSize: "200% 100%",
                animation: "shimmer 1.5s infinite",
              }}
            />
          </div>
        ))}
      </div>
    </main>
  );
}
