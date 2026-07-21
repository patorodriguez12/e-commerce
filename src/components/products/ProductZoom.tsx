"use client";

import { useRef, useState } from "react";
import Image from "next/image";

type Props = {
  src: string;
  alt: string;
};

const ZOOM = 2;
const PANEL_SIZE = 600;

export default function ProductZoom({ src, alt }: Props) {
  const containerRef = useRef<HTMLDivElement>(null);
  const [active, setActive] = useState(false);
  const [position, setPosition] = useState({ x: 0, y: 0 });
  const [size, setSize] = useState({ w: 0, h: 0 });

  function handleMouseEnter() {
    const el = containerRef.current;
    if (el) setSize({ w: el.offsetWidth, h: el.offsetHeight });
    setActive(true);
  }

  function handleMouseMove(e: React.MouseEvent<HTMLDivElement>) {
    const rect = containerRef.current?.getBoundingClientRect();
    if (!rect) return;

    const x = ((e.clientX - rect.left) / rect.width) * 100;
    const y = ((e.clientY - rect.top) / rect.height) * 100;
    setPosition({ x, y });
  }

  return (
    <div className="relative">
      {/* Main image */}
      <div
        ref={containerRef}
        className="relative aspect-square rounded-2xl overflow-hidden bg-bg-subtle border border-border cursor-crosshair select-none"
        onMouseEnter={handleMouseEnter}
        onMouseLeave={() => setActive(false)}
        onMouseMove={handleMouseMove}
      >
        <Image
          src={src}
          alt={alt}
          fill
          sizes="(max-width: 768px) 100vw, 50vw"
          className="object-cover"
          priority
        />

        {/* Selection rectangle */}
        <div
          className="pointer-events-none absolute z-10 border-2 border-white/40 bg-white/10 transition-opacity duration-150"
          style={{
            width: `${100 / ZOOM}%`,
            height: `${100 / ZOOM}%`,
            left: `${position.x - 50 / ZOOM}%`,
            top: `${position.y - 50 / ZOOM}%`,
            opacity: active ? 1 : 0,
          }}
        />
      </div>

      {/* Zoom panel */}
      <div
        className="absolute top-0 left-[calc(100%+16px)] z-20 rounded-2xl border border-border bg-surface overflow-hidden shadow-2xl pointer-events-none transition-opacity duration-150"
        style={{
          width: PANEL_SIZE,
          height: PANEL_SIZE,
          opacity: active ? 1 : 0,
          backgroundImage: `url(${src})`,
          backgroundSize: `${size.w * ZOOM}px ${size.h * ZOOM}px`,
          backgroundPosition: `${position.x}% ${position.y}%`,
        }}
      />
    </div>
  );
}
