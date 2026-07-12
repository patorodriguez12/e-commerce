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

export function HeroSkeleton() {
  return (
    <div className="border-b border-border px-6 pt-20 pb-18 max-w-300 mx-auto flex flex-col gap-5">
      <div className="h-6 w-35 rounded-full bg-[linear-gradient(90deg,#1a1a1a_25%,#222_50%,#1a1a1a_75%)] bg-size-[200%_100%] animate-[shimmer_1.5s_infinite]" />
      <div className="flex flex-col gap-2.5">
        <div className="h-12 w-[55%] rounded-md bg-[linear-gradient(90deg,#1a1a1a_25%,#222_50%,#1a1a1a_75%)] bg-size-[200%_100%] animate-[shimmer_1.5s_infinite]" />
        <div className="h-12 w-[40%] rounded-md bg-[linear-gradient(90deg,#1a1a1a_25%,#222_50%,#1a1a1a_75%)] bg-size-[200%_100%] animate-[shimmer_1.5s_infinite]" />
      </div>
      <div className="h-3.5 w-[320px] rounded-md bg-[linear-gradient(90deg,#1a1a1a_25%,#222_50%,#1a1a1a_75%)] bg-size-[200%_100%] animate-[shimmer_1.5s_infinite]" />
      <div className="flex gap-2.5">
        <div className="h-10 w-25 rounded-lg bg-[linear-gradient(90deg,#1a1a1a_25%,#222_50%,#1a1a1a_75%)] bg-size-[200%_100%] animate-[shimmer_1.5s_infinite]" />
        <div className="h-10 w-25 rounded-lg bg-[linear-gradient(90deg,#1a1a1a_25%,#222_50%,#1a1a1a_75%)] bg-size-[200%_100%] animate-[shimmer_1.5s_infinite]" />
      </div>
    </div>
  );
}

export function FeaturedSkeleton() {
  return (
    <div className="max-w-300 mx-auto px-6 py-16">
      <div className="h-5 w-50 rounded-md bg-[linear-gradient(90deg,#1a1a1a_25%,#222_50%,#1a1a1a_75%)] bg-size-[200%_100%] animate-[shimmer_1.5s_infinite] mb-8" />
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        {Array.from({ length: 4 }).map((_, i) => (
          <ProductCardSkeleton key={i} />
        ))}
      </div>
    </div>
  );
}

export function CategorySkeleton() {
  return (
    <div className="max-w-300 mx-auto px-6 py-16">
      <div className="h-5 w-45 rounded-md bg-[linear-gradient(90deg,#1a1a1a_25%,#222_50%,#1a1a1a_75%)] bg-size-[200%_100%] animate-[shimmer_1.5s_infinite] mb-8" />
      <div className="grid grid-cols-3 md:grid-cols-6 gap-3">
        {Array.from({ length: 6 }).map((_, i) => (
          <div
            key={i}
            className="bg-surface border border-border rounded-xl p-6 flex flex-col items-center gap-3"
          >
            <div className="w-8 h-8 rounded-full bg-[linear-gradient(90deg,#1a1a1a_25%,#222_50%,#1a1a1a_75%)] bg-size-[200%_100%] animate-[shimmer_1.5s_infinite]" />
            <div className="h-3 w-16 rounded-md bg-[linear-gradient(90deg,#1a1a1a_25%,#222_50%,#1a1a1a_75%)] bg-size-[200%_100%] animate-[shimmer_1.5s_infinite]" />
          </div>
        ))}
      </div>
    </div>
  );
}

export function ProductCardSkeleton() {
  return (
    <div className="bg-surface border border-border rounded-xl overflow-hidden">
      <Skeleton style={{ aspectRatio: "1", borderRadius: "0" }} />
      <div className="p-3.5 flex flex-col gap-2">
        <Skeleton style={{ height: "10px", width: "40%" }} />
        <Skeleton style={{ height: "14px", width: "75%" }} />
        <div className="flex justify-between items-center mt-1">
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
    <div className="grid grid-cols-[repeat(auto-fill,minmax(200px,1fr))] gap-4 flex-1">
      {Array.from({ length: 8 }).map((_, i) => (
        <ProductCardSkeleton key={i} />
      ))}
    </div>
  );
}

export function FilterSidebarSkeleton() {
  return (
    <div className="w-[200px] shrink-0 flex flex-col gap-7">
      {Array.from({ length: 4 }).map((_, i) => (
        <div key={i} className="flex flex-col gap-2">
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
    <div className="grid grid-cols-[repeat(auto-fit,minmax(300px,1fr))] gap-16 items-start">
      <Skeleton style={{ aspectRatio: "1", borderRadius: "16px" }} />
      <div className="flex flex-col gap-6">
        <div className="flex flex-col gap-3">
          <Skeleton
            style={{ height: "24px", width: "30%", borderRadius: "20px" }}
          />
          <Skeleton style={{ height: "36px", width: "80%" }} />
          <Skeleton style={{ height: "36px", width: "60%" }} />
        </div>
        <div className="flex items-center gap-4 pb-6 border-b border-border">
          <Skeleton style={{ height: "32px", width: "120px" }} />
          <Skeleton
            style={{ height: "24px", width: "100px", borderRadius: "20px" }}
          />
        </div>
        <div className="flex flex-col gap-2">
          <Skeleton style={{ height: "14px", width: "100%" }} />
          <Skeleton style={{ height: "14px", width: "90%" }} />
          <Skeleton style={{ height: "14px", width: "75%" }} />
        </div>
        <div className="flex gap-3">
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

export function ReviewsSkeleton() {
  return (
    <div className="mt-12 pt-12 border-t border-border flex flex-col gap-5">
      <div className="flex items-center gap-4">
        <div className="h-5 w-20 rounded-md bg-[linear-gradient(90deg,#1a1a1a_25%,#222_50%,#1a1a1a_75%)] bg-size-[200%_100%] animate-[shimmer_1.5s_infinite]" />
        <div className="h-4 w-30 rounded-md bg-[linear-gradient(90deg,#1a1a1a_25%,#222_50%,#1a1a1a_75%)] bg-size-[200%_100%] animate-[shimmer_1.5s_infinite]" />
      </div>
      {Array.from({ length: 2 }).map((_, i) => (
        <div
          key={i}
          className="py-5 border-b border-border flex flex-col gap-2"
        >
          <div className="flex gap-2.5 items-center">
            <div className="size-7 rounded-full bg-[linear-gradient(90deg,#1a1a1a_25%,#222_50%,#1a1a1a_75%)] bg-size-[200%_100%] animate-[shimmer_1.5s_infinite]" />
            <div className="h-3.25 w-25 rounded-md bg-[linear-gradient(90deg,#1a1a1a_25%,#222_50%,#1a1a1a_75%)] bg-size-[200%_100%] animate-[shimmer_1.5s_infinite]" />
          </div>
          <div className="h-3.5 w-[80%] rounded-md ml-9.5 bg-[linear-gradient(90deg,#1a1a1a_25%,#222_50%,#1a1a1a_75%)] bg-size-[200%_100%] animate-[shimmer_1.5s_infinite]" />
        </div>
      ))}
    </div>
  );
}

export function AuthFormSkeleton() {
  return (
    <div className="min-h-screen flex items-center justify-center p-6">
      <div className="w-full max-w-[400px] flex flex-col gap-8">
        <div className="text-center">
          <Skeleton
            style={{ height: "20px", width: "120px", margin: "0 auto" }}
          />
        </div>
        <div className="text-center">
          <Skeleton
            style={{ height: "32px", width: "220px", margin: "0 auto" }}
          />
          <Skeleton
            style={{ height: "14px", width: "160px", margin: "12px auto 0" }}
          />
        </div>
        <div className="bg-surface border border-border rounded-xl p-6 flex flex-col gap-5">
          <Skeleton style={{ height: "44px", borderRadius: "8px" }} />
          <div className="text-center">
            <Skeleton
              style={{ height: "13px", width: "100px", margin: "0 auto" }}
            />
          </div>
          <div className="flex flex-col gap-4">
            <div className="flex flex-col gap-1.5">
              <Skeleton style={{ height: "12px", width: "60px" }} />
              <Skeleton style={{ height: "44px", borderRadius: "8px" }} />
            </div>
            <div className="flex flex-col gap-1.5">
              <Skeleton style={{ height: "12px", width: "70px" }} />
              <Skeleton style={{ height: "44px", borderRadius: "8px" }} />
            </div>
          </div>
          <Skeleton style={{ height: "44px", borderRadius: "8px" }} />
        </div>
        <div className="text-center">
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
    <div className="flex flex-col gap-8">
      <Skeleton style={{ height: "32px", width: "200px" }} />
      <div className="grid grid-cols-[repeat(auto-fill,minmax(180px,1fr))] gap-4">
        {Array.from({ length: 5 }).map((_, i) => (
          <div
            key={i}
            className="bg-surface border border-border rounded-xl p-5 flex flex-col gap-2"
          >
            <Skeleton style={{ height: "12px", width: "60%" }} />
            <Skeleton style={{ height: "28px", width: "40%" }} />
          </div>
        ))}
      </div>
      <div className="flex flex-col gap-4">
        <Skeleton style={{ height: "20px", width: "160px" }} />
        <div className="bg-surface border border-border rounded-xl overflow-hidden">
          {Array.from({ length: 5 }).map((_, i) => (
            <div
              key={i}
              className={`flex gap-4 px-4 py-3 ${i < 4 ? "border-b border-border" : ""}`}
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
    <div className="flex flex-col gap-6">
      <div className="flex justify-between items-center">
        <Skeleton style={{ height: "28px", width: "160px" }} />
        <Skeleton
          style={{ height: "36px", width: "120px", borderRadius: "8px" }}
        />
      </div>
      <div className="bg-surface border border-border rounded-xl overflow-hidden">
        <div className="flex gap-4 px-4 py-3.5 border-b border-border bg-bg-subtle">
          <Skeleton style={{ flex: 2, height: "12px" }} />
          <Skeleton style={{ flex: 1, height: "12px" }} />
          <Skeleton style={{ flex: 1, height: "12px" }} />
          <Skeleton style={{ flex: 1, height: "12px" }} />
        </div>
        {Array.from({ length: 6 }).map((_, i) => (
          <div
            key={i}
            className={`flex gap-4 px-4 py-3.5 items-center ${i < 5 ? "border-b border-border" : ""}`}
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
    <div className="max-w-[560px] mx-auto px-6 py-12 flex flex-col gap-6">
      <Skeleton style={{ height: "28px", width: "180px" }} />
      <div className="flex flex-col gap-4">
        {Array.from({ length: 3 }).map((_, i) => (
          <div key={i} className="flex gap-3 pb-4 border-b border-border">
            <Skeleton
              style={{
                width: "64px",
                height: "64px",
                borderRadius: "8px",
                flexShrink: 0,
              }}
            />
            <div className="flex-1 flex flex-col gap-1.5">
              <Skeleton style={{ height: "14px", width: "70%" }} />
              <Skeleton style={{ height: "12px", width: "40%" }} />
              <Skeleton style={{ height: "14px", width: "30%" }} />
            </div>
            <Skeleton style={{ height: "16px", width: "60px" }} />
          </div>
        ))}
      </div>
      <div className="bg-surface border border-border rounded-xl p-5 flex flex-col gap-3">
        <div className="flex justify-between">
          <Skeleton style={{ height: "14px", width: "80px" }} />
          <Skeleton style={{ height: "14px", width: "60px" }} />
        </div>
        <div className="flex justify-between pt-3 border-t border-border">
          <Skeleton style={{ height: "18px", width: "60px" }} />
          <Skeleton style={{ height: "18px", width: "80px" }} />
        </div>
      </div>
      <div className="bg-surface border border-border rounded-xl p-4 flex flex-col gap-2.5">
        {Array.from({ length: 3 }).map((_, i) => (
          <div key={i} className="flex items-center gap-2">
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
    <div className="min-h-[60vh] flex items-center justify-center p-6">
      <div className="flex flex-col items-center gap-6 text-center">
        <Skeleton
          style={{ width: "64px", height: "64px", borderRadius: "50%" }}
        />
        <Skeleton style={{ height: "32px", width: "240px" }} />
        <Skeleton style={{ height: "14px", width: "180px" }} />
        <div className="flex gap-3 mt-2">
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
    <div className="flex flex-col gap-6">
      <Skeleton style={{ height: "28px", width: "160px" }} />
      <div className="bg-surface border border-border rounded-xl p-6 flex flex-col gap-5">
        <div className="flex flex-col gap-1.5">
          <Skeleton style={{ height: "12px", width: "80px" }} />
          <Skeleton style={{ height: "44px", borderRadius: "8px" }} />
        </div>
        <div className="flex flex-col gap-1.5">
          <Skeleton style={{ height: "12px", width: "60px" }} />
          <Skeleton style={{ height: "44px", borderRadius: "8px" }} />
        </div>
        <Skeleton
          style={{ height: "44px", width: "160px", borderRadius: "8px" }}
        />
      </div>
    </div>
  );
}

export function DashboardOrdersSkeleton() {
  return (
    <div className="flex flex-col gap-6">
      <Skeleton style={{ height: "28px", width: "160px" }} />
      <div className="flex flex-col gap-3">
        {Array.from({ length: 4 }).map((_, i) => (
          <div
            key={i}
            className="bg-surface border border-border rounded-xl p-4 flex justify-between items-center"
          >
            <div className="flex flex-col gap-1.5 flex-1">
              <Skeleton style={{ height: "14px", width: "120px" }} />
              <Skeleton style={{ height: "12px", width: "80px" }} />
            </div>
            <div className="flex items-center gap-4">
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
    <div className="flex flex-col gap-6">
      <Skeleton style={{ height: "14px", width: "100px" }} />
      <Skeleton style={{ height: "24px", width: "200px" }} />
      <div className="bg-surface border border-border rounded-xl p-5 flex gap-10">
        <div className="flex flex-col gap-1.5">
          <Skeleton style={{ height: "12px", width: "50px" }} />
          <Skeleton style={{ height: "16px", width: "120px" }} />
        </div>
        <div className="flex flex-col gap-1.5">
          <Skeleton style={{ height: "12px", width: "50px" }} />
          <Skeleton
            style={{ height: "24px", width: "80px", borderRadius: "20px" }}
          />
        </div>
      </div>
      <div className="flex flex-col gap-3">
        {Array.from({ length: 3 }).map((_, i) => (
          <div key={i} className="flex gap-3 py-3 border-b border-border">
            <Skeleton
              style={{
                width: "80px",
                height: "80px",
                borderRadius: "8px",
                flexShrink: 0,
              }}
            />
            <div className="flex-1 flex flex-col gap-1.5">
              <Skeleton style={{ height: "14px", width: "60%" }} />
              <Skeleton style={{ height: "12px", width: "30%" }} />
            </div>
            <Skeleton style={{ height: "16px", width: "70px" }} />
          </div>
        ))}
      </div>
      <div className="bg-surface border border-border rounded-xl p-4 flex justify-between">
        <Skeleton style={{ height: "16px", width: "80px" }} />
        <Skeleton style={{ height: "16px", width: "100px" }} />
      </div>
    </div>
  );
}

export function DashboardWishlistSkeleton() {
  return (
    <div className="flex flex-col gap-6">
      <Skeleton style={{ height: "28px", width: "180px" }} />
      <div className="grid grid-cols-[repeat(auto-fill,minmax(280px,1fr))] gap-3">
        {Array.from({ length: 4 }).map((_, i) => (
          <div
            key={i}
            className="flex gap-3 bg-surface border border-border rounded-xl p-3"
          >
            <Skeleton
              style={{
                width: "80px",
                height: "80px",
                borderRadius: "8px",
                flexShrink: 0,
              }}
            />
            <div className="flex-1 flex flex-col gap-1.5">
              <Skeleton style={{ height: "14px", width: "70%" }} />
              <Skeleton style={{ height: "12px", width: "40%" }} />
              <Skeleton style={{ height: "14px", width: "30%" }} />
              <div className="flex gap-2 mt-1">
                <Skeleton
                  style={{ height: "28px", width: "80px", borderRadius: "6px" }}
                />
                <Skeleton
                  style={{ height: "28px", width: "60px", borderRadius: "6px" }}
                />
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
