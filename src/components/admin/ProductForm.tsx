"use client";

import { useState, useRef } from "react";
import { useRouter } from "next/navigation";
import Image from "next/image";
import { Category, Product } from "@/types";
import { uploadProductImage } from "@/lib/supabase/storage";
import { createProduct, updateProduct } from "@/lib/supabase/admin-actions";

type Props = {
  categories: Category[];
  product?: Product;
};

const inputStyle: React.CSSProperties = {
  width: "100%",
  background: "var(--bg-subtle)",
  padding: "9px 12px",
  fontSize: "13px",
  color: "var(--text-primary)",
};

const labelStyle: React.CSSProperties = {
  display: "block",
  fontSize: "11px",
  color: "var(--text-muted)",
  textTransform: "uppercase",
  letterSpacing: "0.5px",
  marginBottom: "6px",
};

export default function ProductForm({ categories, product }: Props) {
  const router = useRouter();
  const slugRef = useRef<HTMLInputElement>(null);
  const [imageUrl, setImageUrl] = useState(product?.image_url ?? "");
  const [uploading, setUploading] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  function generateSlug(name: string) {
    return name
      .toLowerCase()
      .replace(/[^a-z0-9]+/g, "-")
      .replace(/(^-|-$)/g, "");
  }

  async function handleImageUpload(e: React.ChangeEvent<HTMLInputElement>) {
    const file = e.target.files?.[0];
    if (!file) return;
    setUploading(true);
    try {
      const url = await uploadProductImage(file);
      setImageUrl(url);
    } catch {
      setError("Error uploading image");
    } finally {
      setUploading(false);
    }
  }

  async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setLoading(true);
    setError(null);
    const formData = new FormData(e.currentTarget);
    formData.set("image_url", imageUrl);
    const result = product
      ? await updateProduct(product.id, formData)
      : await createProduct(formData);
    if (result?.error) {
      setError(result.error);
      setLoading(false);
    }
  }

  return (
    <form
      onSubmit={handleSubmit}
      className="w-full max-w-xl"
      style={{
        display: "flex",
        flexDirection: "column",
        gap: "24px",
      }}
    >
      {/* Image */}
      <div>
        <label style={labelStyle}>Product image</label>
        <div style={{ display: "flex", alignItems: "flex-start", gap: "16px" }}>
          <div
            style={{
              position: "relative",
              width: "100px",
              height: "100px",
              flexShrink: 0,
              borderRadius: "10px",
              overflow: "hidden",
              background: "var(--bg-subtle)",
              border: "0.5px solid var(--border)",
            }}
          >
            {imageUrl ? (
              <Image
                src={imageUrl}
                alt="Preview"
                fill
                style={{ objectFit: "cover" }}
              />
            ) : (
              <div
                style={{
                  width: "100%",
                  height: "100%",
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  fontSize: "11px",
                  color: "var(--text-muted)",
                }}
              >
                No image
              </div>
            )}
          </div>
          <div style={{ flex: 1 }}>
            <input
              type="file"
              accept="image/*"
              onChange={handleImageUpload}
              className="hidden"
              id="image-upload"
            />
            <label
              htmlFor="image-upload"
              style={{
                display: "inline-block",
                cursor: uploading ? "not-allowed" : "pointer",
                background: "var(--bg-subtle)",
                border: "0.5px solid var(--border)",
                borderRadius: "6px",
                padding: "7px 14px",
                fontSize: "12px",
                color: "var(--text-secondary)",
                opacity: uploading ? 0.5 : 1,
                transition: "all 0.15s",
              }}
            >
              {uploading ? "Uploading..." : "Upload image"}
            </label>
            {imageUrl && (
              <button
                type="button"
                onClick={() => setImageUrl("")}
                style={{
                  display: "block",
                  marginTop: "8px",
                  background: "transparent",
                  border: "none",
                  fontSize: "12px",
                  color: "var(--coral-text)",
                  cursor: "pointer",
                  padding: 0,
                }}
              >
                Remove image
              </button>
            )}
            <p
              style={{
                fontSize: "11px",
                color: "var(--text-muted)",
                marginTop: "8px",
              }}
            >
              PNG, JPG or WEBP. Max 5MB.
            </p>
          </div>
        </div>
      </div>

      {/* Name & Slug */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div>
          <label style={labelStyle}>Name</label>
          <input
            className="admin-input"
            name="name"
            type="text"
            required
            defaultValue={product?.name}
            style={inputStyle}
            onChange={(e) => {
              if (slugRef.current && !product)
                slugRef.current.value = generateSlug(e.target.value);
            }}
          />
        </div>
        <div>
          <label style={labelStyle}>Slug</label>
          <input
            className="admin-input"
            ref={slugRef}
            name="slug"
            type="text"
            required
            defaultValue={product?.slug}
            style={inputStyle}
          />
        </div>
      </div>

      {/* Description */}
      <div>
        <label style={labelStyle}>Description</label>
        <textarea
          className="admin-input"
          name="description"
          rows={4}
          defaultValue={product?.description ?? ""}
          style={{ resize: "none", fontFamily: "inherit" }}
        />
      </div>

      {/* Price, Stock, Category */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <div>
          <label style={labelStyle}>Price (USD)</label>
          <input
            className="admin-input"
            name="price"
            type="number"
            step="0.01"
            min="0"
            required
            defaultValue={product ? product.price / 100 : ""}
            style={inputStyle}
          />
        </div>
        <div>
          <label style={labelStyle}>Stock</label>
          <input
            className="admin-input"
            name="stock"
            type="number"
            min="0"
            required
            defaultValue={product?.stock ?? 0}
            style={inputStyle}
          />
        </div>
        <div>
          <label style={labelStyle}>Category</label>
          <select
            className="admin-input"
            name="category_id"
            defaultValue={product?.category_id ?? ""}
            style={{ cursor: "pointer" }}
          >
            <option value="">No category</option>
            {categories.map((cat) => (
              <option
                key={cat.id}
                value={cat.id}
                style={{ background: "#111" }}
              >
                {cat.name}
              </option>
            ))}
          </select>
        </div>
      </div>

      {error && (
        <div
          style={{
            background: "var(--coral-bg)",
            border: "0.5px solid var(--coral-border)",
            borderRadius: "8px",
            padding: "10px 14px",
            fontSize: "13px",
            color: "var(--coral-text)",
          }}
        >
          {error}
        </div>
      )}

      <div style={{ display: "flex", gap: "10px" }}>
        <button
          type="submit"
          disabled={loading || uploading}
          style={{
            background: "var(--accent)",
            color: "#fff",
            border: "none",
            borderRadius: "8px",
            padding: "9px 24px",
            fontSize: "13px",
            fontWeight: "500",
            cursor: loading || uploading ? "not-allowed" : "pointer",
            opacity: loading || uploading ? 0.6 : 1,
            transition: "opacity 0.15s",
          }}
        >
          {loading ? "Saving..." : product ? "Save changes" : "Create product"}
        </button>
        <button
          type="button"
          onClick={() => router.back()}
          style={{
            background: "transparent",
            border: "0.5px solid var(--border)",
            borderRadius: "8px",
            padding: "9px 20px",
            fontSize: "13px",
            color: "var(--text-secondary)",
            cursor: "pointer",
            transition: "border-color 0.15s",
          }}
        >
          Cancel
        </button>
      </div>
    </form>
  );
}
