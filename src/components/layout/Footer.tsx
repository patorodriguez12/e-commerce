"use client";

import Link from "next/link";
import { CiLinkedin, CiInstagram } from "react-icons/ci";
import { FaGithub } from "react-icons/fa";

const STORE_LINKS = [
  { href: "/", label: "Catalog" },
  { href: "/login", label: "Sign in" },
  { href: "/register", label: "Sign up" },
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
    <footer
      style={{
        borderTop: "0.5px solid var(--border)",
        marginTop: "auto",
        padding: "48px 24px 32px",
      }}
    >
      <div
        style={{
          maxWidth: "1200px",
          margin: "0 auto",
          display: "grid",
          gridTemplateColumns: "repeat(auto-fit, minmax(200px, 1fr))",
          gap: "40px",
          marginBottom: "48px",
        }}
      >
        {/* Columna 1 — Brand */}
        <div style={{ display: "flex", flexDirection: "column", gap: "12px" }}>
          <Link
            href="/"
            style={{
              fontSize: "16px",
              fontWeight: "500",
              letterSpacing: "-0.5px",
              color: "var(--text-primary)",
              textDecoration: "none",
            }}
          >
            Smartech
          </Link>
          <p
            style={{
              fontSize: "13px",
              color: "var(--text-muted)",
              lineHeight: "1.7",
              maxWidth: "220px",
            }}
          >
            Premium tech gear curated for creators and builders.
          </p>
          {/* Social links */}
          <div style={{ display: "flex", gap: "10px", marginTop: "4px" }}>
            {SOCIAL_LINKS.map((social) => (
              <a
                key={social.label}
                href={social.href}
                target="_blank"
                rel="noopener noreferrer"
                title={social.label}
                style={{
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  width: "32px",
                  height: "32px",
                  borderRadius: "8px",
                  background: "var(--bg-card)",
                  border: "0.5px solid var(--border)",
                  color: "var(--text-muted)",
                  transition: "all 0.15s",
                  textDecoration: "none",
                }}
                onMouseEnter={(e: React.MouseEvent<HTMLAnchorElement>) => {
                  (e.currentTarget as HTMLAnchorElement).style.borderColor =
                    "var(--border-hover)";
                  (e.currentTarget as HTMLAnchorElement).style.color =
                    "var(--text-primary)";
                  (e.currentTarget as HTMLAnchorElement).style.background =
                    "var(--bg-subtle)";
                }}
                onMouseLeave={(e: React.MouseEvent<HTMLAnchorElement>) => {
                  (e.currentTarget as HTMLAnchorElement).style.borderColor =
                    "var(--border)";
                  (e.currentTarget as HTMLAnchorElement).style.color =
                    "var(--text-muted)";
                  (e.currentTarget as HTMLAnchorElement).style.background =
                    "var(--bg-card)";
                }}
              >
                <social.icon size={14} />
              </a>
            ))}
          </div>
        </div>

        {/* Columna 2 — Store */}
        <div style={{ display: "flex", flexDirection: "column", gap: "12px" }}>
          <p
            style={{
              fontSize: "11px",
              color: "var(--text-muted)",
              textTransform: "uppercase",
              letterSpacing: "1px",
              fontWeight: "500",
            }}
          >
            Store
          </p>
          {STORE_LINKS.map((link) => (
            <Link
              key={link.href}
              href={link.href}
              style={{
                fontSize: "13px",
                color: "var(--text-secondary)",
                textDecoration: "none",
                transition: "color 0.15s",
                width: "fit-content",
              }}
            >
              {link.label}
            </Link>
          ))}
        </div>

        {/* Columna 3 — Developer */}
        <div style={{ display: "flex", flexDirection: "column", gap: "12px" }}>
          <p
            style={{
              fontSize: "11px",
              color: "var(--text-muted)",
              textTransform: "uppercase",
              letterSpacing: "1px",
              fontWeight: "500",
            }}
          >
            Developer
          </p>
          <p
            style={{
              fontSize: "13px",
              color: "var(--text-secondary)",
              lineHeight: "1.7",
            }}
          >
            Designed and built by{" "}
            <a
              href="https://github.com/patorodriguez12"
              target="_blank"
              rel="noopener noreferrer"
              style={{
                color: "var(--accent-text)",
                textDecoration: "none",
                transition: "opacity 0.15s",
              }}
            >
              Hugo Patricio Rodriguez
            </a>{" "}
            as a portfolio project.
          </p>
          <div style={{ display: "flex", flexDirection: "column", gap: "6px" }}>
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
                style={{
                  fontSize: "12px",
                  color: "var(--text-muted)",
                  textDecoration: "none",
                  width: "fit-content",
                  transition: "color 0.15s",
                }}
              >
                {tech.label} ↗
              </a>
            ))}
          </div>
        </div>
      </div>

      {/* Bottom bar */}
      <div
        style={{
          maxWidth: "1200px",
          margin: "0 auto",
          paddingTop: "24px",
          borderTop: "0.5px solid var(--border)",
          display: "flex",
          alignItems: "center",
          justifyContent: "space-between",
          flexWrap: "wrap",
          gap: "12px",
        }}
      >
        <p style={{ fontSize: "12px", color: "var(--text-muted)" }}>
          © {currentYear} Smartech. All rights reserved.
        </p>
        <p style={{ fontSize: "12px", color: "var(--text-muted)" }}>
          Built with ❤️ for learning purposes
        </p>
      </div>
    </footer>
  );
}
