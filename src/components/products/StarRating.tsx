"use client";

import { useState } from "react";

type Props = {
  value: number;
  onChange?: (value: number) => void;
  readonly?: boolean;
  size?: "sm" | "md" | "lg";
};

const SIZES = { sm: 14, md: 18, lg: 22 };

export default function StarRating({
  value,
  onChange,
  readonly = false,
  size = "md",
}: Props) {
  const [hovered, setHovered] = useState(0);
  const px = SIZES[size];
  const active = hovered || value;

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
          className={`inline-flex transition-transform ${
            !readonly ? "hover:scale-110 cursor-pointer" : "cursor-default"
          } disabled:cursor-default`}
        >
          <svg
            width={px}
            height={px}
            viewBox="0 0 24 24"
            fill={star <= active ? "var(--gold)" : "none"}
            stroke="var(--gold)"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
            style={{ opacity: star <= active ? 1 : 0.35 }}
          >
            <polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2" />
          </svg>
        </button>
      ))}
    </div>
  );
}
