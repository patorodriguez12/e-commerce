"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import Image from "next/image";
import { Category, Product } from "@/types";
import { uploadProductImage } from "@/lib/supabase/storage";
import { createProduct, updateProduct } from "@/lib/supabase/admin-actions";

type Props = {
  categories: Category[];
  product?: Product;
};

export default function ProductForm({ categories, product }: Props) {
  const router = useRouter();
  const [imageUrl, setImageUrl] = useState(product?.image_url ?? "");
  const [uploading, setUploading] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  // auto slug generator
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
    } catch (err) {
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
    <form onSubmit={handleSubmit} className="max-w-2xl space-y-6">
      {/* Image */}
      <div>
        <label className="block text-sm font-medium mb-2">Product image</label>
        <div className="flex items-start gap-4">
          <div className="relative w-32 h-32 rounded-xl overflow-hidden bg-gray-100 flex-shrink-0">
            {imageUrl ? (
              <Image
                src={imageUrl}
                alt="Product preview"
                fill
                className="object-cover"
              />
            ) : (
              <div className="w-full h-full flex items-center justify-center text-gray-400 text-xs">
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
              className={`inline-block cursor-pointer border rounded-lg px-4 py-2 text-sm hover:bg-gray-50 transition-colors ${
                uploading ? "opacity-50 cursor-not-allowed" : ""
              }`}
            >
              {uploading ? "Uploading..." : "Upload image"}
            </label>
            {imageUrl && (
              <button
                type="button"
                onClick={() => setImageUrl("")}
                className="block mt-2 text-xs text-red-500 hover:text-red-700"
              >
                Remove image
              </button>
            )}
            <p className="text-xs text-gray-400 mt-2">
              PNG, JPG or WEBP. Max 5MB.
            </p>
          </div>
        </div>
      </div>

      {/* Name and slug */}
      <div className="grid grid-cols-2 gap-4">
        <div>
          <label className="block text-sm font-medium mb-1">Name</label>
          <input
            name="name"
            type="text"
            required
            defaultValue={product?.name}
            onChange={(e) => {
              const slugInput =
                document.querySelector<HTMLInputElement>('[name="slug"]');
              if (slugInput && !product) {
                slugInput.value = generateSlug(e.target.value);
              }
            }}
            className="w-full border rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-black"
          />
        </div>
        <div>
          <label className="block text-sm font-medium mb-1">Slug</label>
          <input
            name="slug"
            type="text"
            required
            defaultValue={product?.slug}
            className="w-full border rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-black"
          />
        </div>
      </div>

      {/* Description */}
      <div>
        <label className="block text-sm font-medium mb-1">Description</label>
        <textarea
          name="description"
          rows={4}
          defaultValue={product?.description ?? ""}
          className="w-full border rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-black resize-none"
        />
      </div>

      {/* Price, stock and category */}
      <div className="grid grid-cols-3 gap-4">
        <div>
          <label className="block text-sm font-medium mb-1">Price (USD)</label>
          <input
            name="price"
            type="number"
            step="0.01"
            min="0"
            required
            defaultValue={product ? product.price / 100 : ""}
            className="w-full border rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-black"
          />
        </div>
        <div>
          <label className="block text-sm font-medium mb-1">Stock</label>
          <input
            name="stock"
            type="number"
            min="0"
            required
            defaultValue={product?.stock ?? 0}
            className="w-full border rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-black"
          />
        </div>
        <div>
          <label className="block text-sm font-medium mb-1">Category</label>
          <select
            name="category_id"
            defaultValue={product?.category_id ?? ""}
            className="w-full border rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-black"
          >
            <option value="">No category</option>
            {categories.map((cat) => (
              <option key={cat.id} value={cat.id}>
                {cat.name}
              </option>
            ))}
          </select>
        </div>
      </div>

      {error && <p className="text-red-500 text-sm">{error}</p>}

      <div className="flex gap-3">
        <button
          type="submit"
          disabled={loading || uploading}
          className="bg-black text-white px-6 py-2 rounded-lg text-sm hover:bg-gray-800 disabled:opacity-50 transition-colors"
        >
          {loading ? "Saving..." : product ? "Save changes" : "Create product"}
        </button>
        <button
          type="button"
          onClick={() => router.back()}
          className="border px-6 py-2 rounded-lg text-sm hover:bg-gray-50 transition-colors"
        >
          Cancel
        </button>
      </div>
    </form>
  );
}
