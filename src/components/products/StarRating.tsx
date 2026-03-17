"use client";

import { useState } from "react";

type Props = {
  value: number;
  onChange?: (value: number) => void;
  readonly?: boolean;
  size?: "sm" | "md" | "lg";
};

const SIZES = {
  sm: "text-sm",
  md: "text-xl",
  lg: "text-2xl",
};

export default function StarRating({
  value,
  onChange,
  readonly = false,
  size = "md",
}: Props) {
  const [hovered, setHovered] = useState(0);

  return (
    <div className="flex gap-0.5">
      {[1, 2, 3, 4, 5].map((star) => (
        <button
          key={star}
          type="button"
          disabled={readonly}
          onClick={() => onChange?.(star)}
          onMouseEnter={() => !readonly && setHovered(star)}
          onMouseLeave={() => !readonly && setHovered(0)}
          className={`${SIZES[size]} transition-transform ${
            !readonly ? "hover:scale-110 cursor-pointer" : "cursor-default"
          } disabled:cursor-default`}
        >
          {star <= (hovered || value) ? "⭐" : "☆"}
        </button>
      ))}
    </div>
  );
}
