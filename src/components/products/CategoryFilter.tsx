"use client";

import { useRouter, useSearchParams } from "next/navigation";
import { Category } from "@/types";

type Props = {
  categories: Category[];
  active: string | null;
};

export default function CategoryFilter({ categories, active }: Props) {
  const router = useRouter();
  const searchParams = useSearchParams();

  function handleSelect(slug: string | null) {
    const params = new URLSearchParams(searchParams.toString());
    if (slug) {
      params.set("category", slug);
    } else {
      params.delete("category");
    }
    router.push(`/?${params.toString()}`);
  }

  return (
    <div className="flex flex-wrap gap-2 mb-8">
      <button
        onClick={() => handleSelect(null)}
        className={`px-4 py-1.5 rounded-full text-sm border transition-colors ${
          !active
            ? "bg-black text-white border-black"
            : "text-gray-600 hover:border-gray-400"
        }`}
      >
        All
      </button>
      {categories.map((cat) => (
        <button
          key={cat.id}
          onClick={() => handleSelect(cat.slug)}
          className={`px-4 py-1.5 rounded-full text-sm border transition-colors ${
            active === cat.slug
              ? "bg-black text-white border-black"
              : "text-gray-600 hover:border-gray-400"
          }`}
        >
          {cat.name}
        </button>
      ))}
    </div>
  );
}
