import Link from "next/link";

export default function PromoBanner() {
  return (
    <section className="max-w-300 mx-auto px-6 py-8">
      <div className="relative rounded-2xl overflow-hidden bg-linear-to-r from-accent/10 via-accent/5 to-transparent border border-accent-border/30 px-8 py-12 md:py-14">
        <div className="relative z-10">
          <p className="text-[10px] text-gold uppercase tracking-[1px] font-medium mb-3">
            Limited offer
          </p>
          <h3 className="text-2xl md:text-3xl font-medium font-sora text-text tracking-tight max-w-md mb-3">
            Free shipping on orders over $99
          </h3>
          <p className="text-sm text-text-secondary max-w-sm mb-6">
            Plus easy 30-day returns on all items. No questions asked.
          </p>
          <Link
            href="/catalog"
            className="inline-block bg-accent text-white text-sm no-underline px-6 py-2.5 rounded-lg font-medium transition-all duration-200 hover:brightness-110"
          >
            Shop now
          </Link>
        </div>
        <div className="absolute right-0 top-0 bottom-0 w-1/3 hidden md:block">
          <div className="w-full h-full bg-linear-to-l from-accent/5 to-transparent" />
        </div>
      </div>
    </section>
  );
}
