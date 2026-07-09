"use client";

import Link from "next/link";
import { CiLinkedin, CiInstagram } from "react-icons/ci";
import { FaGithub } from "react-icons/fa";

const STORE_LINKS = [
  { href: "/catalog", label: "Catalog" },
  { href: "/about", label: "About" },
  { href: "/contact", label: "Contact" },
];

const SOCIAL_LINKS = [
  { href: "https://github.com/patorodriguez12", label: "GitHub", icon: FaGithub },
  {
    href: "https://www.instagram.com/pato.rodriguez",
    label: "Instagram",
    icon: CiInstagram,
  },
  {
    href: "https://www.linkedin.com/in/hugo-patricio-rodriguez-a361a7108/",
    label: "LinkedIn",
    icon: CiLinkedin,
  },
];

export default function Footer() {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="border-t border-border mt-auto px-6 pb-8 pt-12">
      <div className="max-w-[1200px] mx-auto grid grid-cols-[repeat(auto-fit,minmax(200px,1fr))] gap-10 mb-12">
        {/* Column 1 — Brand */}
        <div className="flex flex-col gap-3">
          <Link
            href="/"
            className="text-base font-medium tracking-tight text-text no-underline"
          >
            Smartech
          </Link>
          <p className="text-sm text-text-muted leading-relaxed max-w-[220px]">
            Premium tech gear curated for creators and builders.
          </p>
          {/* Social links */}
          <div className="flex gap-2.5 mt-1">
            {SOCIAL_LINKS.map((social) => (
              <a
                key={social.label}
                href={social.href}
                target="_blank"
                rel="noopener noreferrer"
                title={social.label}
                className="flex items-center justify-center w-8 h-8 rounded-lg bg-surface border border-border text-text-muted transition-all duration-150 no-underline hover:border-border-hover hover:text-text hover:bg-bg-subtle"
              >
                <social.icon size={14} />
              </a>
            ))}
          </div>
        </div>

        {/* Column 2 — Store */}
        <div className="flex flex-col gap-3">
          <p className="text-[11px] text-text-muted uppercase tracking-[1px] font-medium">
            Store
          </p>
          {STORE_LINKS.map((link) => (
            <Link
              key={link.href}
              href={link.href}
              className="text-sm text-text-secondary no-underline transition-colors duration-150 w-fit hover:text-text"
            >
              {link.label}
            </Link>
          ))}
        </div>

        {/* Column 3 — Developer */}
        <div className="flex flex-col gap-3">
          <p className="text-[11px] text-text-muted uppercase tracking-[1px] font-medium">
            Developer
          </p>
          <p className="text-sm text-text-secondary leading-relaxed">
            Designed and built by{" "}
            <a
              href="https://github.com/patorodriguez12"
              target="_blank"
              rel="noopener noreferrer"
              className="text-accent-text no-underline transition-opacity duration-150 hover:opacity-80"
            >
              Hugo Patricio Rodriguez
            </a>{" "}
            as a portfolio project.
          </p>
          <div className="flex flex-col gap-1.5">
            {[
              { label: "Next.js 14", href: "https://nextjs.org" },
              { label: "Supabase", href: "https://supabase.com" },
              { label: "Stripe", href: "https://stripe.com" },
              { label: "Vercel", href: "https://vercel.com" },
            ].map((tech) => (
              <a
                key={tech.label}
                href={tech.href}
                target="_blank"
                rel="noopener noreferrer"
                className="text-xs text-text-muted no-underline w-fit transition-colors duration-150 hover:text-text"
              >
                {tech.label} ↗
              </a>
            ))}
          </div>
        </div>
      </div>

      {/* Bottom bar */}
      <div className="max-w-[1200px] mx-auto pt-6 border-t border-border flex items-center justify-between flex-wrap gap-3">
        <p className="text-xs text-text-muted">
          © {currentYear} Smartech. All rights reserved.
        </p>
        <p className="text-xs text-text-muted">
          Built with ❤️ for learning purposes
        </p>
      </div>
    </footer>
  );
}
