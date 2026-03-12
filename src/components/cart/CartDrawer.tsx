'use client'

import { useCartStore } from '@/lib/store/cartStore'
import CartItem from '@/components/cart/CartItem'
import Link from 'next/link'

type Props = {
  isOpen: boolean
  onClose: () => void
}

export default function CartDrawer({ isOpen, onClose }: Props) {
  const { items, getTotalPrice, clearCart } = useCartStore()

  const formattedTotal = new Intl.NumberFormat('es-AR', {
    style: 'currency',
    currency: 'ARS',
  }).format(getTotalPrice())

  return (
    <>
      {/* Overlay */}
      {isOpen && (
        <div
          className="fixed inset-0 bg-black/40 z-40"
          onClick={onClose}
        />
      )}

      {/* Panel */}
      <div
        className={`fixed top-0 right-0 h-full w-full max-w-md bg-white z-50 shadow-xl flex flex-col transition-transform duration-300 ${
          isOpen ? 'translate-x-0' : 'translate-x-full'
        }`}
      >
        {/* Header */}
        <div className="flex items-center justify-between px-6 py-4 border-b">
          <h2 className="text-lg font-bold">Tu carrito</h2>
          <button
            onClick={onClose}
            className="text-gray-500 hover:text-black text-2xl leading-none"
          >
            ×
          </button>
        </div>

        {/* Items */}
        <div className="flex-1 overflow-y-auto px-6 py-4">
          {items.length === 0 ? (
            <p className="text-gray-500 text-center mt-10">
              Tu carrito está vacío
            </p>
          ) : (
            <div className="space-y-4">
              {items.map(item => (
                <CartItem key={item.product.id} item={item} />
              ))}
            </div>
          )}
        </div>

        {/* Footer */}
        {items.length > 0 && (
          <div className="border-t px-6 py-4 space-y-3">
            <div className="flex justify-between font-bold text-lg">
              <span>Total</span>
              <span>{formattedTotal}</span>
            </div>
            <Link
              href="/checkout"
              onClick={onClose}
              className="block w-full bg-black text-white text-center py-3 rounded-lg hover:bg-gray-800 transition-colors"
            >
              Ir al checkout
            </Link>
            <button
              onClick={clearCart}
              className="w-full text-sm text-gray-500 hover:text-red-500 transition-colors"
            >
              Vaciar carrito
            </button>
          </div>
        )}
      </div>
    </>
  )
}