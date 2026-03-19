import type { Metadata } from "next";
import { Geist } from "next/font/google";
import "./globals.css";
import Navbar from "@/components/layout/Navbar";
import CartDrawer from "@/components/cart/CartDrawer";
import LoadingSpinner from "@/components/ui/LoadingSpinner";
import NavigationProvider from "@/components/ui/NavigationProvider";
import { Toaster } from "sonner";
import { Suspense } from "react";

const geist = Geist({ subsets: ["latin"] });

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
      <body className={geist.className}>
        <Suspense>
          <NavigationProvider />
        </Suspense>
        <Navbar />
        {children}
        <CartDrawer />
        <LoadingSpinner />
        <Toaster
          position="bottom-right"
          toastOptions={{
            style: {
              background: "#111111",
              border: "0.5px solid #ffffff20",
              color: "#fff",
            },
          }}
        />
      </body>
    </html>
  );
}
