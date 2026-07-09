import Hero from "@/components/layout/Hero";
import FeaturedProducts from "@/components/home/FeaturedProducts";
import CategoryShowcase from "@/components/home/CategoryShowcase";
import PromoBanner from "@/components/home/PromoBanner";
import BestSellers from "@/components/home/BestSellers";
import TestimonialsSection from "@/components/home/TestimonialsSection";
import Link from "next/link";

export default function HomePage() {
  return (
    <>
      <Hero />
      <FeaturedProducts />
      <CategoryShowcase />
      <PromoBanner />
      <BestSellers />
      <TestimonialsSection />
      <section className="max-w-[1200px] mx-auto px-6 py-20 text-center">
        <h2 className="text-2xl font-medium font-sora text-text tracking-tight mb-3">
          Explore everything
        </h2>
        <p className="text-sm text-text-secondary mb-6 max-w-xs mx-auto">
          Browse our full catalog with filters, sorting, and search.
        </p>
        <Link
          href="/catalog"
          className="inline-flex items-center gap-2 bg-accent text-white text-sm no-underline px-7 py-2.5 rounded-lg font-medium transition-all duration-200 hover:brightness-110"
        >
          View full catalog
          <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
            <path d="M5 12h14M12 5l7 7-7 7" />
          </svg>
        </Link>
      </section>
    </>
  );
}
