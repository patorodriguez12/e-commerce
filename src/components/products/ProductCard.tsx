'use client'

import Image from 'next/image'
import Link from 'next/link'
import { Product } from '@/types'
import { useCartStore } from '@/lib/store/cartStore'

type Props = {
  product: Product
}

export default function ProductCard({ product }: Props) {
  const addItem = useCartStore(state => state.addItem)

  const formattedPrice = new Intl.NumberFormat('es-AR', {
    style: 'currency',
    currency: 'ARS',
  }).format(product.price)

  return (
    <div className="group border rounded-xl overflow-hidden hover:shadow-lg transition-shadow duration-200">
      <Link href={`/products/${product.slug}`}>
        <div className="relative aspect-square bg-gray-100">
          {product.image_url ? (
            <Image
              src={product.image_url}
              alt={product.name}
              fill
              className="object-cover group-hover:scale-105 transition-transform duration-200"
            />
          ) : (
            <div className="w-full h-full flex items-center justify-center text-gray-400">
              Sin imagen
            </div>
          )}
        </div>
        <div className="p-4">
          {product.categories && (
            <span className="text-xs text-gray-500 uppercase tracking-wide">
              {product.categories.name}
            </span>
          )}
          <h2 className="font-semibold mt-1 text-gray-900">{product.name}</h2>
          <p className="text-lg font-bold mt-2">{formattedPrice}</p>
          <p className="text-sm text-gray-500 mt-1">
            {product.stock > 0 ? `${product.stock} disponibles` : 'Sin stock'}
          </p>
        </div>
      </Link>

      {/* Botón fuera del Link para evitar navegación al hacer click */}
      <div className="px-4 pb-4">
        <button
          onClick={() => addItem(product)}
          disabled={product.stock === 0}
          className="w-full bg-black text-white py-2 rounded-lg text-sm hover:bg-gray-800 disabled:opacity-40 disabled:cursor-not-allowed transition-colors"
        >
          {product.stock === 0 ? 'Sin stock' : 'Agregar al carrito'}
        </button>
      </div>
    </div>
  )
}