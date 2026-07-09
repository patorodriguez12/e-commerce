export default function ContactPage() {
  return (
    <div className="max-w-[640px] mx-auto px-6 py-20">
      <div className="flex items-center gap-3 mb-4">
        <div className="w-6 h-px bg-accent" />
        <p className="text-[10px] text-accent-text uppercase tracking-[1px] font-medium">
          Contact
        </p>
      </div>

      <h1 className="text-3xl sm:text-4xl font-medium font-sora text-text tracking-tight mb-6">
        Get in touch.
      </h1>

      <p className="text-sm text-text-secondary leading-relaxed mb-10">
        Have a question about a product, your order, or just want to say hello?
        We&apos;d love to hear from you.
      </p>

      <div className="flex flex-col gap-5">
        <div className="bg-surface border border-border rounded-xl p-5 flex items-start gap-4">
          <div className="w-9 h-9 rounded-lg bg-bg-subtle border border-border flex items-center justify-center shrink-0 mt-0.5">
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" className="text-text-muted">
              <rect x="2" y="4" width="20" height="16" rx="2" />
              <path d="M22 7l-10 7L2 7" />
            </svg>
          </div>
          <div>
            <h2 className="text-sm font-medium text-text mb-1">Email</h2>
            <p className="text-xs text-text-muted">
              <a
                href="mailto:hello@smartech.dev"
                className="text-accent-text no-underline hover:opacity-80"
              >
                hello@smartech.dev
              </a>
            </p>
            <p className="text-xs text-text-muted mt-1">
              We respond within 24 hours on business days.
            </p>
          </div>
        </div>

        <div className="bg-surface border border-border rounded-xl p-5 flex items-start gap-4">
          <div className="w-9 h-9 rounded-lg bg-bg-subtle border border-border flex items-center justify-center shrink-0 mt-0.5">
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" className="text-text-muted">
              <path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z" />
              <circle cx="12" cy="10" r="3" />
            </svg>
          </div>
          <div>
            <h2 className="text-sm font-medium text-text mb-1">Location</h2>
            <p className="text-xs text-text-muted">
              Buenos Aires, Argentina
            </p>
          </div>
        </div>

        <div className="bg-surface border border-border rounded-xl p-5 flex items-start gap-4">
          <div className="w-9 h-9 rounded-lg bg-bg-subtle border border-border flex items-center justify-center shrink-0 mt-0.5">
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" className="text-text-muted">
              <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z" />
            </svg>
          </div>
          <div>
            <h2 className="text-sm font-medium text-text mb-1">Support</h2>
            <p className="text-xs text-text-muted">
              For order inquiries, visit your{" "}
              <a
                href="/dashboard/orders"
                className="text-accent-text no-underline hover:opacity-80"
              >
                order dashboard
              </a>{" "}
              or email us directly.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
