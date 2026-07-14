"use client";

import { useRef, type MouseEvent } from "react";
import Link from "next/link";
import {
  Headphones,
  Laptop,
  Keyboard,
  Music,
  Smartphone,
  Package,
  Monitor,
  Mouse,
} from "lucide-react";

const ICON_MAP: Record<string, typeof Package> = {
  headphones: Headphones,
  laptops: Laptop,
  accessories: Keyboard,
  audio: Music,
  smartphones: Smartphone,
  monitors: Monitor,
  peripherals: Mouse,
};

type Props = {
  href: string;
  name: string;
  slug: string;
};

export default function CategoryCard({ href, name, slug }: Props) {
  const cardRef = useRef<HTMLAnchorElement>(null);
  const Icon = ICON_MAP[slug] ?? Package;

  function handleMouseMove(e: MouseEvent<HTMLAnchorElement>) {
    const card = cardRef.current;
    if (!card) return;
    const rect = card.getBoundingClientRect();
    const x = ((e.clientX - rect.left) / rect.width) * 100;
    const y = ((e.clientY - rect.top) / rect.height) * 100;
    card.style.setProperty("--x", `${x}%`);
    card.style.setProperty("--y", `${y}%`);
  }

  function handleMouseLeave() {
    const card = cardRef.current;
    if (!card) return;
    card.style.setProperty("--x", "50%");
    card.style.setProperty("--y", "50%");
  }

  return (
    <Link
      ref={cardRef}
      href={href}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      className="group relative flex flex-col items-center gap-3 bg-surface border border-border rounded-xl px-4 py-6 no-underline transition-all duration-200 hover:border-accent-border hover:-translate-y-0.5 overflow-hidden"
    >
      <div
        className="pointer-events-none absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-300"
        style={{
          background:
            "radial-gradient(600px circle at var(--x, 50%) var(--y, 50%), rgba(180,140,100,0.08) 0%, transparent 60%)",
        }}
      />
      <span className="relative">
        <Icon size={22} strokeWidth={1.5} className="text-text-secondary" />
      </span>
      <span className="relative text-xs text-text-secondary font-medium text-center">
        {name}
      </span>
    </Link>
  );
}
