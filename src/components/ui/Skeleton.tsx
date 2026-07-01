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

export function AuthFormSkeleton() {
  return (
    <div
      style={{
        minHeight: "100vh",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        padding: "24px",
      }}
    >
      <div
        style={{
          width: "100%",
          maxWidth: "400px",
          display: "flex",
          flexDirection: "column",
          gap: "32px",
        }}
      >
        <div style={{ textAlign: "center" }}>
          <Skeleton
            style={{ height: "20px", width: "120px", margin: "0 auto" }}
          />
        </div>
        <div style={{ textAlign: "center" }}>
          <Skeleton
            style={{ height: "32px", width: "220px", margin: "0 auto" }}
          />
          <Skeleton
            style={{
              height: "14px",
              width: "160px",
              margin: "12px auto 0",
            }}
          />
        </div>
        <div
          style={{
            background: "var(--bg-card)",
            border: "0.5px solid var(--border)",
            borderRadius: "12px",
            padding: "24px",
            display: "flex",
            flexDirection: "column",
            gap: "20px",
          }}
        >
          <Skeleton style={{ height: "44px", borderRadius: "8px" }} />
          <div style={{ textAlign: "center" }}>
            <Skeleton
              style={{ height: "13px", width: "100px", margin: "0 auto" }}
            />
          </div>
          <div style={{ display: "flex", flexDirection: "column", gap: "16px" }}>
            <div style={{ display: "flex", flexDirection: "column", gap: "6px" }}>
              <Skeleton style={{ height: "12px", width: "60px" }} />
              <Skeleton style={{ height: "44px", borderRadius: "8px" }} />
            </div>
            <div style={{ display: "flex", flexDirection: "column", gap: "6px" }}>
              <Skeleton style={{ height: "12px", width: "70px" }} />
              <Skeleton style={{ height: "44px", borderRadius: "8px" }} />
            </div>
          </div>
          <Skeleton style={{ height: "44px", borderRadius: "8px" }} />
        </div>
        <div style={{ textAlign: "center" }}>
          <Skeleton
            style={{ height: "13px", width: "140px", margin: "0 auto" }}
          />
        </div>
      </div>
    </div>
  );
}

export function AdminDashboardSkeleton() {
  return (
    <div style={{ display: "flex", flexDirection: "column", gap: "32px" }}>
      <Skeleton style={{ height: "32px", width: "200px" }} />
      <div
        style={{
          display: "grid",
          gridTemplateColumns: "repeat(auto-fill, minmax(180px, 1fr))",
          gap: "16px",
        }}
      >
        {Array.from({ length: 5 }).map((_, i) => (
          <div
            key={i}
            style={{
              background: "var(--bg-card)",
              border: "0.5px solid var(--border)",
              borderRadius: "12px",
              padding: "20px",
              display: "flex",
              flexDirection: "column",
              gap: "8px",
            }}
          >
            <Skeleton style={{ height: "12px", width: "60%" }} />
            <Skeleton style={{ height: "28px", width: "40%" }} />
          </div>
        ))}
      </div>
      <div style={{ display: "flex", flexDirection: "column", gap: "16px" }}>
        <Skeleton style={{ height: "20px", width: "160px" }} />
        <div
          style={{
            background: "var(--bg-card)",
            border: "0.5px solid var(--border)",
            borderRadius: "12px",
            overflow: "hidden",
          }}
        >
          {Array.from({ length: 5 }).map((_, i) => (
            <div
              key={i}
              style={{
                display: "flex",
                gap: "16px",
                padding: "12px 16px",
                borderBottom:
                  i < 4 ? "0.5px solid var(--border)" : "none",
              }}
            >
              <Skeleton style={{ flex: 2, height: "14px" }} />
              <Skeleton style={{ flex: 1, height: "14px" }} />
              <Skeleton style={{ flex: 1, height: "14px" }} />
              <Skeleton style={{ flex: 1, height: "14px" }} />
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

export function AdminTableSkeleton() {
  return (
    <div style={{ display: "flex", flexDirection: "column", gap: "24px" }}>
      <div
        style={{
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
        }}
      >
        <Skeleton style={{ height: "28px", width: "160px" }} />
        <Skeleton style={{ height: "36px", width: "120px", borderRadius: "8px" }} />
      </div>
      <div
        style={{
          background: "var(--bg-card)",
          border: "0.5px solid var(--border)",
          borderRadius: "12px",
          overflow: "hidden",
        }}
      >
        <div
          style={{
            display: "flex",
            gap: "16px",
            padding: "14px 16px",
            borderBottom: "0.5px solid var(--border)",
            background: "var(--bg-muted)",
          }}
        >
          <Skeleton style={{ flex: 2, height: "12px" }} />
          <Skeleton style={{ flex: 1, height: "12px" }} />
          <Skeleton style={{ flex: 1, height: "12px" }} />
          <Skeleton style={{ flex: 1, height: "12px" }} />
        </div>
        {Array.from({ length: 6 }).map((_, i) => (
          <div
            key={i}
            style={{
              display: "flex",
              gap: "16px",
              padding: "14px 16px",
              borderBottom:
                i < 5 ? "0.5px solid var(--border)" : "none",
              alignItems: "center",
            }}
          >
            <Skeleton style={{ flex: 2, height: "14px" }} />
            <Skeleton style={{ flex: 1, height: "14px" }} />
            <Skeleton style={{ flex: 1, height: "14px" }} />
            <Skeleton style={{ flex: 1, height: "14px" }} />
          </div>
        ))}
      </div>
    </div>
  );
}

export function CheckoutSkeleton() {
  return (
    <div
      style={{
        maxWidth: "560px",
        margin: "0 auto",
        padding: "48px 24px",
        display: "flex",
        flexDirection: "column",
        gap: "24px",
      }}
    >
      <Skeleton style={{ height: "28px", width: "180px" }} />
      <div style={{ display: "flex", flexDirection: "column", gap: "16px" }}>
        {Array.from({ length: 3 }).map((_, i) => (
          <div
            key={i}
            style={{
              display: "flex",
              gap: "12px",
              paddingBottom: "16px",
              borderBottom: "0.5px solid var(--border)",
            }}
          >
            <Skeleton
              style={{ width: "64px", height: "64px", borderRadius: "8px", flexShrink: 0 }}
            />
            <div
              style={{
                flex: 1,
                display: "flex",
                flexDirection: "column",
                gap: "6px",
              }}
            >
              <Skeleton style={{ height: "14px", width: "70%" }} />
              <Skeleton style={{ height: "12px", width: "40%" }} />
              <Skeleton style={{ height: "14px", width: "30%" }} />
            </div>
            <Skeleton style={{ height: "16px", width: "60px" }} />
          </div>
        ))}
      </div>
      <div
        style={{
          background: "var(--bg-card)",
          border: "0.5px solid var(--border)",
          borderRadius: "12px",
          padding: "20px",
          display: "flex",
          flexDirection: "column",
          gap: "12px",
        }}
      >
        <div
          style={{
            display: "flex",
            justifyContent: "space-between",
          }}
        >
          <Skeleton style={{ height: "14px", width: "80px" }} />
          <Skeleton style={{ height: "14px", width: "60px" }} />
        </div>
        <div
          style={{
            display: "flex",
            justifyContent: "space-between",
            paddingTop: "12px",
            borderTop: "0.5px solid var(--border)",
          }}
        >
          <Skeleton style={{ height: "18px", width: "60px" }} />
          <Skeleton style={{ height: "18px", width: "80px" }} />
        </div>
      </div>
      <div
        style={{
          background: "var(--bg-card)",
          border: "0.5px solid var(--border)",
          borderRadius: "12px",
          padding: "16px",
          display: "flex",
          flexDirection: "column",
          gap: "10px",
        }}
      >
        {Array.from({ length: 3 }).map((_, i) => (
          <div
            key={i}
            style={{ display: "flex", alignItems: "center", gap: "8px" }}
          >
            <Skeleton
              style={{ width: "16px", height: "16px", borderRadius: "50%" }}
            />
            <Skeleton style={{ height: "12px", width: "140px" }} />
          </div>
        ))}
      </div>
      <Skeleton style={{ height: "48px", borderRadius: "8px" }} />
    </div>
  );
}

export function CheckoutSuccessSkeleton() {
  return (
    <div
      style={{
        minHeight: "60vh",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        padding: "24px",
      }}
    >
      <div
        style={{
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          gap: "24px",
          textAlign: "center",
        }}
      >
        <Skeleton
          style={{
            width: "64px",
            height: "64px",
            borderRadius: "50%",
          }}
        />
        <Skeleton style={{ height: "32px", width: "240px" }} />
        <Skeleton style={{ height: "14px", width: "180px" }} />
        <div style={{ display: "flex", gap: "12px", marginTop: "8px" }}>
          <Skeleton
            style={{ height: "44px", width: "140px", borderRadius: "8px" }}
          />
          <Skeleton
            style={{ height: "44px", width: "160px", borderRadius: "8px" }}
          />
        </div>
      </div>
    </div>
  );
}

export function DashboardAccountSkeleton() {
  return (
    <div style={{ display: "flex", flexDirection: "column", gap: "24px" }}>
      <Skeleton style={{ height: "28px", width: "160px" }} />
      <div
        style={{
          background: "var(--bg-card)",
          border: "0.5px solid var(--border)",
          borderRadius: "12px",
          padding: "24px",
          display: "flex",
          flexDirection: "column",
          gap: "20px",
        }}
      >
        <div style={{ display: "flex", flexDirection: "column", gap: "6px" }}>
          <Skeleton style={{ height: "12px", width: "80px" }} />
          <Skeleton style={{ height: "44px", borderRadius: "8px" }} />
        </div>
        <div style={{ display: "flex", flexDirection: "column", gap: "6px" }}>
          <Skeleton style={{ height: "12px", width: "60px" }} />
          <Skeleton style={{ height: "44px", borderRadius: "8px" }} />
        </div>
        <Skeleton style={{ height: "44px", width: "160px", borderRadius: "8px" }} />
      </div>
    </div>
  );
}

export function DashboardOrdersSkeleton() {
  return (
    <div style={{ display: "flex", flexDirection: "column", gap: "24px" }}>
      <Skeleton style={{ height: "28px", width: "160px" }} />
      <div style={{ display: "flex", flexDirection: "column", gap: "12px" }}>
        {Array.from({ length: 4 }).map((_, i) => (
          <div
            key={i}
            style={{
              background: "var(--bg-card)",
              border: "0.5px solid var(--border)",
              borderRadius: "10px",
              padding: "16px",
              display: "flex",
              justifyContent: "space-between",
              alignItems: "center",
            }}
          >
            <div
              style={{
                display: "flex",
                flexDirection: "column",
                gap: "6px",
                flex: 1,
              }}
            >
              <Skeleton style={{ height: "14px", width: "120px" }} />
              <Skeleton style={{ height: "12px", width: "80px" }} />
            </div>
            <div
              style={{
                display: "flex",
                alignItems: "center",
                gap: "16px",
              }}
            >
              <Skeleton
                style={{ height: "24px", width: "70px", borderRadius: "20px" }}
              />
              <Skeleton style={{ height: "16px", width: "70px" }} />
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

export function DashboardOrderDetailSkeleton() {
  return (
    <div style={{ display: "flex", flexDirection: "column", gap: "24px" }}>
      <Skeleton style={{ height: "14px", width: "100px" }} />
      <Skeleton style={{ height: "24px", width: "200px" }} />
      <div
        style={{
          background: "var(--bg-card)",
          border: "0.5px solid var(--border)",
          borderRadius: "10px",
          padding: "20px",
          display: "flex",
          gap: "40px",
        }}
      >
        <div style={{ display: "flex", flexDirection: "column", gap: "6px" }}>
          <Skeleton style={{ height: "12px", width: "50px" }} />
          <Skeleton style={{ height: "16px", width: "120px" }} />
        </div>
        <div style={{ display: "flex", flexDirection: "column", gap: "6px" }}>
          <Skeleton style={{ height: "12px", width: "50px" }} />
          <Skeleton
            style={{ height: "24px", width: "80px", borderRadius: "20px" }}
          />
        </div>
      </div>
      <div style={{ display: "flex", flexDirection: "column", gap: "12px" }}>
        {Array.from({ length: 3 }).map((_, i) => (
          <div
            key={i}
            style={{
              display: "flex",
              gap: "12px",
              padding: "12px 0",
              borderBottom: "0.5px solid var(--border)",
            }}
          >
            <Skeleton
              style={{
                width: "80px",
                height: "80px",
                borderRadius: "8px",
                flexShrink: 0,
              }}
            />
            <div
              style={{
                flex: 1,
                display: "flex",
                flexDirection: "column",
                gap: "6px",
              }}
            >
              <Skeleton style={{ height: "14px", width: "60%" }} />
              <Skeleton style={{ height: "12px", width: "30%" }} />
            </div>
            <Skeleton style={{ height: "16px", width: "70px" }} />
          </div>
        ))}
      </div>
      <div
        style={{
          background: "var(--bg-card)",
          border: "0.5px solid var(--border)",
          borderRadius: "10px",
          padding: "16px",
          display: "flex",
          justifyContent: "space-between",
        }}
      >
        <Skeleton style={{ height: "16px", width: "80px" }} />
        <Skeleton style={{ height: "16px", width: "100px" }} />
      </div>
    </div>
  );
}

export function DashboardWishlistSkeleton() {
  return (
    <div style={{ display: "flex", flexDirection: "column", gap: "24px" }}>
      <Skeleton style={{ height: "28px", width: "180px" }} />
      <div
        style={{
          display: "grid",
          gridTemplateColumns: "repeat(auto-fill, minmax(280px, 1fr))",
          gap: "12px",
        }}
      >
        {Array.from({ length: 4 }).map((_, i) => (
          <div
            key={i}
            style={{
              display: "flex",
              gap: "12px",
              background: "var(--bg-card)",
              border: "0.5px solid var(--border)",
              borderRadius: "10px",
              padding: "12px",
            }}
          >
            <Skeleton
              style={{
                width: "80px",
                height: "80px",
                borderRadius: "8px",
                flexShrink: 0,
              }}
            />
            <div
              style={{
                flex: 1,
                display: "flex",
                flexDirection: "column",
                gap: "6px",
              }}
            >
              <Skeleton style={{ height: "14px", width: "70%" }} />
              <Skeleton style={{ height: "12px", width: "40%" }} />
              <Skeleton style={{ height: "14px", width: "30%" }} />
              <div style={{ display: "flex", gap: "8px", marginTop: "4px" }}>
                <Skeleton
                  style={{
                    height: "28px",
                    width: "80px",
                    borderRadius: "6px",
                  }}
                />
                <Skeleton
                  style={{
                    height: "28px",
                    width: "60px",
                    borderRadius: "6px",
                  }}
                />
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
