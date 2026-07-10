import Image from "next/image";
import Link from "next/link";

export default function Hero() {
  return (
    <section className="px-6 pt-8 pb-8 md:pt-20 md:pb-16 md:px-8 lg:pt-28 lg:pb-24 lg:px-8 max-w-7xl mx-auto flex flex-col md:flex-row items-center gap-8 md:gap-12">
      {/* Left column: text content */}
      <div className="flex-1">

        <h1 className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-medium leading-tight tracking-tight mb-6 max-w-2xl font-sora">
          The gear that{" "}
          <span className="text-text-muted">moves you forward.</span>
        </h1>

        <p className="text-sm sm:text-base text-text-secondary leading-relaxed max-w-md mb-10">
          Premium tech, curated for creators and builders. Free shipping on
          orders over $99.
        </p>

        <div className="flex gap-2.5 flex-wrap">
          <Link
            href="/catalog"
            className="text-sm text-white bg-accent no-underline px-7 py-2.5 rounded-lg font-medium transition-all duration-200"
          >
            Shop now
          </Link>
          <Link
            href="/catalog"
            className="text-sm text-text-secondary no-underline px-7 py-2.5 rounded-lg border border-border-hover transition-all duration-200"
          >
            View deals
          </Link>
        </div>
      </div>

      {/* Right column: image */}
      <div className="flex-1 flex justify-center relative pt-8">
        {/* Soft glow behind the product */}
        <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
          <div className="w-40 h-40 rounded-full bg-accent opacity-10 blur-3xl" />
        </div>
        <Image
          src="/hero-image.png"
          alt="Hero"
          width={436}
          height={572}
          priority
          className="relative z-10 w-40 md:w-64 lg-w-72 h-auto max-w-md object-contain"
        />
      </div>
    </section>
  );
}
