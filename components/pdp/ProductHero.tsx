'use client'

import { useState } from 'react'
import Link from 'next/link'
import { Minus, Plus, Heart, Share2, Truck, RotateCcw } from 'lucide-react'
import { Button } from '@/components/ui/Button'
import { Badge } from '@/components/ui/Badge'
import { Stars } from '@/components/ui/Stars'
import { EditorialImage } from '@/components/ui/EditorialImage'
import { useCart } from '@/lib/cart'
import { useWishlist } from '@/lib/wishlist'
import { useHydrated } from '@/lib/hooks'
import { formatAED, cn } from '@/lib/utils'
import type { Product, Size } from '@/lib/products'

export function ProductHero({ product }: { product: Product }) {
  const sizes = Object.keys(product.price) as Size[]
  const [size, setSize] = useState<Size>(sizes[0])
  const [qty, setQty] = useState(1)
  const [activeImg, setActiveImg] = useState(0)

  const add = useCart((s) => s.add)
  const toggle = useWishlist((s) => s.toggle)
  const ids = useWishlist((s) => s.ids)
  const hydrated = useHydrated()
  const wished = hydrated && ids.includes(product.id)

  const price = product.price[size]!
  const compare = product.compareAt?.[size]
  const gallery = [product.slug, `${product.slug}-2`, `${product.slug}-3`, `${product.slug}-4`]

  return (
    <section className="container-site grid gap-10 pt-8 md:grid-cols-2 md:gap-14">
      {/* Gallery */}
      <div className="flex gap-3 md:gap-4">
        <div className="flex flex-col gap-3">
          {gallery.map((seed, i) => (
            <button
              key={seed}
              onClick={() => setActiveImg(i)}
              aria-label={`View image ${i + 1}`}
              className={cn(
                'h-16 w-16 overflow-hidden rounded-card border-2 transition md:h-20 md:w-20',
                activeImg === i ? 'border-gold' : 'border-transparent opacity-60',
              )}
            >
              <EditorialImage seed={seed} rounded={false} className="h-full w-full" />
            </button>
          ))}
        </div>
        <EditorialImage
          seed={gallery[activeImg]}
          label={product.name}
          className="aspect-[4/5] flex-1"
        />
      </div>

      {/* Purchase info — sticky on desktop */}
      <div className="md:sticky md:top-24 md:self-start">
        <nav className="text-xs capitalize text-taupe" aria-label="Breadcrumb">
          {product.gender === 'her' ? 'Women' : product.gender === 'him' ? 'Men' : 'Unisex'}{' '}
          <span className="mx-1">/</span> {product.category}
        </nav>

        {product.badges[0] && (
          <div className="mt-3">
            <Badge tone={product.badges[0]} />
          </div>
        )}

        <h1 className="mt-3 font-display text-4xl leading-tight md:text-5xl">{product.name}</h1>
        <p className="mt-2 font-accent text-xl italic text-taupe">{product.tagline}</p>

        <div className="mt-3 flex items-center gap-2 text-sm">
          <Stars value={product.rating} />
          <span className="text-taupe">
            {product.rating.toFixed(1)} · {product.reviewCount} reviews
          </span>
        </div>

        <p className="mt-5 flex items-center gap-3 font-display text-3xl">
          {formatAED(price)}
          {compare && <span className="text-lg text-taupe line-through">{formatAED(compare)}</span>}
        </p>

        {/* Size selector */}
        <div className="mt-6">
          <p className="eyebrow mb-2 text-taupe">Size</p>
          <div className="flex gap-2">
            {sizes.map((s) => (
              <button
                key={s}
                onClick={() => setSize(s)}
                className={cn(
                  'h-11 min-w-[72px] rounded-button border text-sm font-medium transition',
                  size === s ? 'border-ink bg-ink text-white' : 'border-black/20 hover:border-gold',
                )}
              >
                {s}
              </button>
            ))}
          </div>
        </div>

        {/* Quantity + Add */}
        <div className="mt-6 flex items-stretch gap-3">
          <div className="flex items-center rounded-button border border-black/20">
            <button onClick={() => setQty((q) => Math.max(1, q - 1))} aria-label="Decrease quantity" className="grid h-12 w-12 place-items-center">
              <Minus size={16} />
            </button>
            <span className="w-10 text-center">{qty}</span>
            <button onClick={() => setQty((q) => q + 1)} aria-label="Increase quantity" className="grid h-12 w-12 place-items-center">
              <Plus size={16} />
            </button>
          </div>
          <Button
            variant="gold"
            size="lg"
            className="flex-1"
            onClick={() =>
              add(
                {
                  productId: product.id,
                  slug: product.slug,
                  name: product.name,
                  size,
                  price,
                },
                qty,
              )
            }
          >
            Add to Cart
          </Button>
        </div>

        <div className="mt-3 flex gap-3">
          <Button variant="ghost" className="flex-1 border border-black/15" onClick={() => toggle(product.id)}>
            <Heart size={16} className={cn(wished && 'fill-amber text-amber')} />
            {wished ? 'Saved' : 'Wishlist'}
          </Button>
          <Button variant="ghost" className="border border-black/15" aria-label="Share">
            <Share2 size={16} />
          </Button>
        </div>

        {/* Trust micro-copy */}
        <div className="mt-6 space-y-2 border-t border-black/10 pt-5 text-sm text-taupe">
          <p className="flex items-center gap-2">
            <Truck size={16} className="text-gold" /> Free delivery across the UAE on orders over AED 200
          </p>
          <p className="flex items-center gap-2">
            <RotateCcw size={16} className="text-gold" /> Easy 15-day returns
          </p>
        </div>

        <p className="mt-6 max-w-prose text-sm leading-relaxed text-ink/80">{product.description}</p>
        <Link href="/products" className="mt-4 inline-block text-xs uppercase tracking-[0.12em] text-gold">
          ← Back to all fragrances
        </Link>
      </div>
    </section>
  )
}
