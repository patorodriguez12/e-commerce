import type { Metadata } from "next";
import { Geist } from "next/font/google";
import "./globals.css";
import { Toaster } from "sonner";
import Navbar from "@/components/layout/Navbar";

const geist = Geist({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: {
    default: "Smartech — Modern E-commerce",
    template: "%s | Smartech",
  },
  description:
    "A modern e-commerce store built with Next.js, Supabase and Stripe.",
  openGraph: {
    title: "Smartech",
    description:
      "A modern e-commerce store built with Next.js, Supabase and Stripe.",
    type: "website",
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body className={geist.className}>
        <Navbar />
        <Toaster position="bottom-right" richColors />
        {children}
      </body>
    </html>
  );
}
