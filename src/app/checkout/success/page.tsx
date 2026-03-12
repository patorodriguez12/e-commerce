"use client";

import { useEffect } from "react";
import { useCartStore } from "@/lib/store/cartStore";
import Link from "next/link";

export default function SuccessPage() {
  const clearCart = useCartStore((state) => state.clearCart);

  useEffect(() => {
    clearCart();
  }, [clearCart]);

  return (
    <div className="min-h-screen flex items-center justify-center px-4">
      <div className="text-center max-w-md">
        <div className="text-6xl mb-4">✅</div>
        <h1 className="text-2xl font-bold mb-2">¡Pago exitoso!</h1>
        <p className="text-gray-600 mb-8">
          Tu pedido fue registrado correctamente. Podés verlo en tu panel de
          usuario.
        </p>
        <div className="flex gap-3 justify-center">
          <Link
            href="/dashboard/orders"
            className="bg-black text-white px-6 py-2 rounded-lg hover:bg-gray-800 transition-colors"
          >
            Ver mis órdenes
          </Link>
          <Link
            href="/"
            className="border px-6 py-2 rounded-lg hover:bg-gray-50 transition-colors"
          >
            Seguir comprando
          </Link>
        </div>
      </div>
    </div>
  );
}
