'use client'

import Link from 'next/link'
import { Heart, Plus } from 'lucide-react'
import { motion } from 'framer-motion'
import { Product, Size } from '@/lib/products'
import { Badge } from './Badge'
import { EditorialImage } from './EditorialImage'
import { useCart } from '@/lib/cart'
import { useWishlist } from '@/lib/wishlist'
import { useHydrated } from '@/lib/hooks'
import { formatAED, cn } from '@/lib/utils'

export function ProductCard({
  product,
  dark = false,
}: {
  product: Product
  dark?: boolean
}) {
  const add = useCart((s) => s.add)
  const toggle = useWishlist((s) => s.toggle)
  const ids = useWishlist((s) => s.ids)
  const hydrated = useHydrated()
  const wished = hydrated && ids.includes(product.id)

  const sizes = Object.keys(product.price) as Size[]
  const defaultSize = sizes[0]
  const price = product.price[defaultSize]!
  const compare = product.compareAt?.[defaultSize]

  const onAdd = (e: React.MouseEvent) => {
    e.preventDefault()
    add({
      productId: product.id,
      slug: product.slug,
      name: product.name,
      size: defaultSize,
      price,
    })
  }

  return (
    <Link href={`/products/${product.slug}`} className="group block">
      <div className="relative">
        <EditorialImage
          seed={product.slug}
          label={product.name}
          rounded
          className="aspect-square w-full transition-transform duration-500 group-hover:scale-[1.03]"
        />

        {/* Badges */}
        <div className="absolute left-3 top-3 flex flex-col gap-1.5">
          {product.badges.slice(0, 2).map((b) => (
            <Badge key={b} tone={b} />
          ))}
        </div>

        {/* Wishlist */}
        <button
          onClick={(e) => {
            e.preventDefault()
            toggle(product.id)
          }}
          aria-label={wished ? 'Remove from wishlist' : 'Add to wishlist'}
          className="absolute right-3 top-3 grid h-9 w-9 place-items-center rounded-full bg-white/90 text-ink shadow-sm transition hover:scale-110"
        >
          <Heart size={16} className={cn(wished && 'fill-amber text-amber')} />
        </button>

        {/* Slide-up Add to Cart */}
        <div className="absolute inset-x-0 bottom-0 translate-y-full opacity-0 transition-all duration-300 group-hover:translate-y-0 group-hover:opacity-100">
          <motion.button
            onClick={onAdd}
            whileTap={{ scale: 0.97 }}
            className="flex w-full items-center justify-center gap-2 bg-ink py-3 text-xs font-medium uppercase tracking-[0.16em] text-white hover:bg-gold hover:text-ink"
          >
            <Plus size={14} /> Add to Cart
          </motion.button>
        </div>
      </div>

      <div className={cn('pt-3', dark ? 'text-white' : 'text-ink')}>
        <h3 className="font-display text-base leading-snug">{product.name}</h3>
        <p className={cn('mt-0.5 text-[13px]', dark ? 'text-white/60' : 'text-taupe')}>
          {defaultSize} · {product.category}
        </p>
        <p className="mt-1 flex items-center gap-2 font-body text-sm font-semibold">
          {formatAED(price)}
          {compare && (
            <span className={cn('text-xs font-normal line-through', dark ? 'text-white/40' : 'text-taupe')}>
              {formatAED(compare)}
            </span>
          )}
        </p>
      </div>
    </Link>
  )
}

export function ProductCardSkeleton() {
  return (
    <div className="block">
      <div className="aspect-square w-full rounded-card skeleton" />
      <div className="mt-3 h-4 w-2/3 rounded skeleton" />
      <div className="mt-2 h-3 w-1/3 rounded skeleton" />
    </div>
  )
}
