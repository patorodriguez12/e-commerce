import {
  FilterSidebarSkeleton,
  ProductGridSkeleton,
} from "@/components/ui/Skeleton";

export default function Loading() {
  return (
    <>
      {/* Hero skeleton */}
      <div
        style={{
          borderBottom: "0.5px solid var(--border)",
          padding: "80px 24px 72px",
          maxWidth: "1200px",
          margin: "0 auto",
          display: "flex",
          flexDirection: "column",
          gap: "20px",
        }}
      >
        <div
          style={{
            height: "24px",
            width: "140px",
            background: "#1a1a1a",
            borderRadius: "20px",
            animation: "shimmer 1.5s infinite",
            backgroundSize: "200% 100%",
            backgroundImage:
              "linear-gradient(90deg, #1a1a1a 25%, #222 50%, #1a1a1a 75%)",
          }}
        />
        <div style={{ display: "flex", flexDirection: "column", gap: "10px" }}>
          <div
            style={{
              height: "48px",
              width: "55%",
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
              height: "48px",
              width: "40%",
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
            width: "320px",
            background: "#1a1a1a",
            borderRadius: "6px",
            backgroundImage:
              "linear-gradient(90deg, #1a1a1a 25%, #222 50%, #1a1a1a 75%)",
            backgroundSize: "200% 100%",
            animation: "shimmer 1.5s infinite",
          }}
        />
        <div style={{ display: "flex", gap: "10px" }}>
          <div
            style={{
              height: "40px",
              width: "100px",
              background: "#1a1a1a",
              borderRadius: "8px",
              backgroundImage:
                "linear-gradient(90deg, #1a1a1a 25%, #222 50%, #1a1a1a 75%)",
              backgroundSize: "200% 100%",
              animation: "shimmer 1.5s infinite",
            }}
          />
          <div
            style={{
              height: "40px",
              width: "100px",
              background: "#1a1a1a",
              borderRadius: "8px",
              backgroundImage:
                "linear-gradient(90deg, #1a1a1a 25%, #222 50%, #1a1a1a 75%)",
              backgroundSize: "200% 100%",
              animation: "shimmer 1.5s infinite",
            }}
          />
        </div>
      </div>

      {/* Catalog skeleton */}
      <div
        style={{ maxWidth: "1200px", margin: "0 auto", padding: "48px 24px" }}
      >
        <div style={{ display: "flex", gap: "48px", alignItems: "flex-start" }}>
          <FilterSidebarSkeleton />
          <ProductGridSkeleton />
        </div>
      </div>
    </>
  );
}
