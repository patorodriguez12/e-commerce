import type { Metadata } from "next";
import { Geist, Sora } from "next/font/google";
import "./globals.css";
import CartDrawer from "@/components/cart/CartDrawer";
import CartSync from "@/components/cart/CartSync";
import { Toaster } from "sonner";

const geist = Geist({ subsets: ["latin"] });
const sora = Sora({
  subsets: ["latin"],
  variable: "--font-sora",
  display: "swap",
});

export const metadata: Metadata = {
  title: {
    default: "Smartech — Premium Tech Store",
    template: "%s | Smartech",
  },
  description: "Premium tech gear curated for creators and builders.",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body className={`${geist.className} ${sora.variable}`}>
        <a
          href="#main-content"
          className="sr-only focus:not-sr-only focus:fixed focus:top-2 focus:left-2 focus:z-50 focus:px-4 focus:py-2 focus:rounded-lg focus:bg-accent focus:text-white focus:outline-none"
        >
          Skip to content
        </a>
        {children}
        <CartSync />
        <CartDrawer />
        <Toaster
          position="bottom-right"
          toastOptions={{
            className: "!bg-surface !border !border-border !text-text",
          }}
        />
      </body>
    </html>
  );
}
