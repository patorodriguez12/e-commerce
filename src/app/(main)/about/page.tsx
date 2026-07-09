import Link from "next/link";

export default function AboutPage() {
  return (
    <div className="max-w-[760px] mx-auto px-6 py-20">
      <div className="flex items-center gap-3 mb-4">
        <span className="text-gold text-lg">✦</span>
        <p className="text-[10px] text-gold uppercase tracking-[1px] font-medium">
          About us
        </p>
      </div>

      <h1 className="text-3xl sm:text-4xl font-medium font-sora text-text tracking-tight mb-6">
        Built for creators, designed to last.
      </h1>

      <p className="text-sm text-text-secondary leading-relaxed mb-8">
        Smartech was founded with a simple idea: the tools you use should be as
        ambitious as you are. We curate premium tech gear — from studio
        essentials to everyday carry — that earns its place in your workflow.
      </p>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-12">
        <div className="bg-surface border border-border rounded-xl p-5">
          <h2 className="text-sm font-medium text-text mb-2">Curated selection</h2>
          <p className="text-xs text-text-secondary leading-relaxed">
            Every product we carry is tested and vetted. No filler, no noise —
            just the gear that meets our standards.
          </p>
        </div>
        <div className="bg-surface border border-border rounded-xl p-5">
          <h2 className="text-sm font-medium text-text mb-2">Built to last</h2>
          <p className="text-xs text-text-secondary leading-relaxed">
            We partner with brands that prioritize craftsmanship and durability.
            Products that perform, day after day.
          </p>
        </div>
        <div className="bg-surface border border-border rounded-xl p-5">
          <h2 className="text-sm font-medium text-text mb-2">Fast & free shipping</h2>
          <p className="text-xs text-text-secondary leading-relaxed">
            Free shipping on orders over $99. We know you&apos;d rather be
            creating than waiting.
          </p>
        </div>
        <div className="bg-surface border border-border rounded-xl p-5">
          <h2 className="text-sm font-medium text-text mb-2">30-day returns</h2>
          <p className="text-xs text-text-secondary leading-relaxed">
            Not what you expected? Send it back within 30 days, no questions
            asked.
          </p>
        </div>
      </div>

      <div className="border-t border-border pt-8">
        <p className="text-sm text-text-muted leading-relaxed">
          This store is a portfolio project built by{" "}
          <a
            href="https://github.com/patorodriguez12"
            target="_blank"
            rel="noopener noreferrer"
            className="text-accent-text no-underline hover:opacity-80"
          >
            Hugo Patricio Rodriguez
          </a>
          . It demonstrates a full e-commerce workflow using Next.js, Supabase,
          and Stripe — but the products and branding are real enough to feel
          like the real thing.
        </p>
        <p className="text-sm text-text-muted mt-4">
          Interested in the stack?{" "}
          <Link
            href="/catalog"
            className="text-accent-text no-underline hover:opacity-80"
          >
            Browse the catalog
          </Link>{" "}
          or check out the{" "}
          <a
            href="https://github.com/patorodriguez12"
            target="_blank"
            rel="noopener noreferrer"
            className="text-accent-text no-underline hover:opacity-80"
          >
            source code
          </a>
          .
        </p>
      </div>
    </div>
  );
}
