import type { Metadata } from "next";
import { Geist, Sora } from "next/font/google";
import "./globals.css";
import Navbar from "@/components/layout/Navbar";
import Footer from "@/components/layout/Footer";
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
      <body
        className={`${geist.className} ${sora.variable}`}
      >
        <Navbar />
        {children}
        <Footer />
        <CartSync />
        <CartDrawer />
        <Toaster
          position="bottom-right"
          toastOptions={{
            style: {
              background: "#151412",
              border: "0.5px solid #262522",
              color: "#ece9e2",
            },
          }}
        />
      </body>
    </html>
  );
}
