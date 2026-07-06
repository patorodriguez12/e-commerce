"use client";

import Image from "next/image";
import Link from "next/link";
import { Product } from "@/types";
import { useCartStore } from "@/lib/store/cartStore";
import { formatPrice } from "@/lib/utils/formatPrice";
import { toast } from "sonner";

type Props = {
  product: Product;
};

function getProductBadge(product: Product) {
  if (product.stock === 0) return { label: "Sold out", type: "sold" };
  if (product.stock <= 5) return { label: "Low stock", type: "low" };
  if (
    new Date(product.created_at) >
    new Date(Date.now() - 7 * 24 * 60 * 60 * 1000)
  ) {
    return { label: "New", type: "new" };
  }
  return null;
}

const BADGE_STYLES: Record<string, React.CSSProperties> = {
  new: {
    background: "var(--accent-bg)",
    color: "var(--accent-text)",
    border: "0.5px solid var(--accent-border)",
  },
  low: {
    background: "var(--coral-bg)",
    color: "var(--coral-text)",
    border: "0.5px solid var(--coral-border)",
  },
  sold: {
    background: "#ffffff10",
    color: "#ffffff40",
    border: "0.5px solid #ffffff15",
  },
};

export default function ProductCard({ product }: Props) {
  const addItem = useCartStore((state) => state.addItem);
  const cartQuantity = useCartStore(
    (state) => state.items.find((i) => i.product.id === product.id)?.quantity ?? 0,
  );
  const badge = getProductBadge(product);

  const isOutOfStock = product.stock === 0;
  const isMaxReached = !isOutOfStock && cartQuantity >= product.stock;

  function handleAdd(e: React.MouseEvent) {
    e.preventDefault();
    if (isOutOfStock || isMaxReached) return;
    addItem(product);
    toast.success(`${product.name} added to cart`);
  }

  return (
    <Link href={`/products/${product.slug}`} style={{ textDecoration: "none" }}>
      <div
        style={{
          background: "var(--bg-card)",
          border: "0.5px solid var(--border)",
          borderRadius: "12px",
          overflow: "hidden",
          transition: "border-color 0.2s, transform 0.2s",
          cursor: "pointer",
        }}
        onMouseEnter={(e) => {
          (e.currentTarget as HTMLDivElement).style.borderColor =
            "var(--border-hover)";
          (e.currentTarget as HTMLDivElement).style.transform =
            "translateY(-2px)";
        }}
        onMouseLeave={(e) => {
          (e.currentTarget as HTMLDivElement).style.borderColor =
            "var(--border)";
          (e.currentTarget as HTMLDivElement).style.transform = "translateY(0)";
        }}
      >
        {/* Imagen */}
        <div
          style={{
            aspectRatio: "1",
            background: "var(--bg-subtle)",
            position: "relative",
            overflow: "hidden",
          }}
        >
          {product.image_url ? (
            <Image
              src={product.image_url}
              alt={product.name}
              fill
              style={{ objectFit: "cover", transition: "transform 0.3s" }}
              onMouseEnter={(e) =>
                (e.currentTarget.style.transform = "scale(1.04)")
              }
              onMouseLeave={(e) =>
                (e.currentTarget.style.transform = "scale(1)")
              }
            />
          ) : (
            <div
              style={{
                width: "100%",
                height: "100%",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                color: "var(--text-muted)",
                fontSize: "13px",
              }}
            >
              No image
            </div>
          )}

          {badge && (
            <div
              style={{
                position: "absolute",
                top: "10px",
                left: "10px",
                fontSize: "10px",
                fontWeight: "500",
                padding: "3px 9px",
                borderRadius: "4px",
                ...BADGE_STYLES[badge.type],
              }}
            >
              {badge.label}
            </div>
          )}
        </div>

        {/* Info */}
        <div style={{ padding: "14px" }}>
          {product.categories && (
            <p
              style={{
                fontSize: "10px",
                color: "var(--text-muted)",
                textTransform: "uppercase",
                letterSpacing: "0.5px",
                marginBottom: "4px",
              }}
            >
              {(product.categories as any).name}
            </p>
          )}
          <p
            style={{
              fontSize: "14px",
              fontWeight: "500",
              color: "var(--text-primary)",
              marginBottom: "12px",
              whiteSpace: "nowrap",
              overflow: "hidden",
              textOverflow: "ellipsis",
            }}
          >
            {product.name}
          </p>

          <div
            style={{
              display: "flex",
              alignItems: "center",
              justifyContent: "space-between",
            }}
          >
            <span
              style={{
                fontSize: "15px",
                fontWeight: "500",
                color: "var(--text-primary)",
              }}
            >
              {formatPrice(product.price)}
            </span>

            <button
              onClick={handleAdd}
              disabled={isOutOfStock || isMaxReached}
              style={{
                fontSize: "11px",
                color:
                  isOutOfStock || isMaxReached
                    ? "var(--text-muted)"
                    : "var(--text-secondary)",
                background: "var(--bg-subtle)",
                border: "0.5px solid var(--border)",
                borderRadius: "6px",
                padding: "5px 12px",
                cursor: isOutOfStock || isMaxReached ? "not-allowed" : "pointer",
                transition: "all 0.15s",
              }}
              onMouseEnter={(e) => {
                if (!isOutOfStock && !isMaxReached) {
                  (e.currentTarget as HTMLButtonElement).style.background =
                    "#ffffff15";
                  (e.currentTarget as HTMLButtonElement).style.color = "#fff";
                }
              }}
              onMouseLeave={(e) => {
                (e.currentTarget as HTMLButtonElement).style.background =
                  "var(--bg-subtle)";
                (e.currentTarget as HTMLButtonElement).style.color =
                  "var(--text-secondary)";
              }}
            >
              {isOutOfStock ? "Sold out" : isMaxReached ? "Max reached" : "Add to cart"}
            </button>
          </div>
        </div>
      </div>
    </Link>
  );
}
