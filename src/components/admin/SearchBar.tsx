"use client";

type Props = {
  value: string;
  onChange: (value: string) => void;
  placeholder?: string;
};

export default function SearchBar({
  value,
  onChange,
  placeholder = "Search...",
}: Props) {
  return (
    <div className="relative mb-4">
      <svg
        width="14"
        height="14"
        viewBox="0 0 14 14"
        fill="none"
        className="absolute left-3 top-1/2 -translate-y-1/2 text-text-muted pointer-events-none"
      >
        <circle
          cx="6"
          cy="6"
          r="4.5"
          stroke="currentColor"
          strokeWidth="1.5"
        />
        <path
          d="M9.5 9.5L13 13"
          stroke="currentColor"
          strokeWidth="1.5"
          strokeLinecap="round"
        />
      </svg>
      <input
        type="text"
        value={value}
        onChange={(e) => onChange(e.target.value)}
        placeholder={placeholder}
        className="w-full bg-surface border border-border rounded-lg px-3 py-2.25 pl-8.5 text-sm text-text outline-none transition-colors duration-150 focus:border-accent"
      />
    </div>
  );
}
