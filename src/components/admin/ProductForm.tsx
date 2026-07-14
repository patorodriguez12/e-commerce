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

const labelClass = "block text-[11px] text-text-muted uppercase tracking-[0.5px] mb-1.5";

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
      className="w-full max-w-xl flex flex-col gap-6"
    >
      {/* Image */}
      <div>
        <label htmlFor="image-upload" className={labelClass}>Product image</label>
        <div className="flex items-start gap-4">
          <div className="relative w-25 h-25 shrink-0 rounded-xl overflow-hidden bg-bg-subtle border border-border">
            {imageUrl ? (
              <Image
                src={imageUrl}
                alt="Preview"
                fill
                className="object-cover"
              />
            ) : (
              <div className="w-full h-full flex items-center justify-center text-[11px] text-text-muted">
                No image
              </div>
            )}
          </div>
          <div className="flex-1">
            <input
              type="file"
              accept="image/*"
              onChange={handleImageUpload}
              className="hidden"
              id="image-upload"
            />
            <label
              htmlFor="image-upload"
              className={`inline-block cursor-pointer bg-bg-subtle border border-border rounded-md px-3.5 py-1.5 text-xs text-text-secondary transition-all duration-150 ${
                uploading ? "opacity-50 cursor-not-allowed" : "hover:bg-bg-subtle"
              }`}
            >
              {uploading ? "Uploading..." : "Upload image"}
            </label>
            {imageUrl && (
              <button
                type="button"
                onClick={() => setImageUrl("")}
                className="block mt-2 bg-transparent border-none text-xs text-coral-text cursor-pointer p-0"
              >
                Remove image
              </button>
            )}
            <p className="text-[11px] text-text-muted mt-2">
              PNG, JPG or WEBP. Max 5MB.
            </p>
          </div>
        </div>
      </div>

      {/* Name & Slug */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div>
          <label htmlFor="product-name" className={labelClass}>Name</label>
          <input
            id="product-name"
            className="admin-input"
            name="name"
            type="text"
            required
            defaultValue={product?.name}
            onChange={(e) => {
              if (slugRef.current && !product)
                slugRef.current.value = generateSlug(e.target.value);
            }}
          />
        </div>
        <div>
          <label htmlFor="product-slug" className={labelClass}>Slug</label>
          <input
            id="product-slug"
            className="admin-input"
            ref={slugRef}
            name="slug"
            type="text"
            required
            defaultValue={product?.slug}
          />
        </div>
      </div>

      {/* Description */}
      <div>
        <label htmlFor="product-description" className={labelClass}>Description</label>
        <textarea
          id="product-description"
          className="admin-input resize-none"
          name="description"
          rows={4}
          defaultValue={product?.description ?? ""}
        />
      </div>

      {/* Featured toggle */}
      <div className="flex items-center gap-3">
        <label className="relative inline-flex items-center cursor-pointer">
          <input
            type="checkbox"
            name="is_featured"
            defaultChecked={product?.is_featured ?? false}
            className="sr-only peer"
          />
          <div className="w-9 h-5 bg-bg-subtle border border-border rounded-full peer-checked:bg-accent peer-checked:border-accent transition-all duration-200 after:content-[''] after:absolute after:top-0.75 after:left-0.75 after:w-3.5 after:h-3.5 after:rounded-full after:bg-white after:transition-all peer-checked:after:translate-x-4" />
        </label>
        <span className="text-xs text-text-secondary">Feature this product</span>
      </div>

      {/* Price, Stock, Category */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <div>
          <label htmlFor="product-price" className={labelClass}>Price (USD)</label>
          <input
            id="product-price"
            className="admin-input"
            name="price"
            type="number"
            step="0.01"
            min="0"
            required
            defaultValue={product ? product.price / 100 : ""}
          />
        </div>
        <div>
          <label htmlFor="product-stock" className={labelClass}>Stock</label>
          <input
            id="product-stock"
            className="admin-input"
            name="stock"
            type="number"
            min="0"
            required
            defaultValue={product?.stock ?? 0}
          />
        </div>
        <div>
          <label htmlFor="product-category" className={labelClass}>Category</label>
          <select
            id="product-category"
            className="admin-input cursor-pointer"
            name="category_id"
            defaultValue={product?.category_id ?? ""}
          >
            <option value="">No category</option>
            {categories.map((cat) => (
              <option
                key={cat.id}
                value={cat.id}
                className="bg-[#111]"
              >
                {cat.name}
              </option>
            ))}
          </select>
        </div>
      </div>

      {error && (
        <div className="bg-coral-bg border border-coral-border rounded-lg px-3.5 py-2.5 text-sm text-coral-text">
          {error}
        </div>
      )}

      <div className="flex gap-2.5">
        <button
          type="submit"
          disabled={loading || uploading}
          className={`bg-accent text-white border-none rounded-lg px-6 py-2 text-sm font-medium transition-opacity duration-150 ${
            loading || uploading ? "opacity-60 cursor-not-allowed" : "cursor-pointer"
          }`}
        >
          {loading ? "Saving..." : product ? "Save changes" : "Create product"}
        </button>
        <button
          type="button"
          onClick={() => router.back()}
          className="bg-transparent border border-border rounded-lg px-5 py-2 text-sm text-text-secondary cursor-pointer transition-colors duration-150 hover:border-border-hover"
        >
          Cancel
        </button>
      </div>
    </form>
  );
}
