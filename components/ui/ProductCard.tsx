'use client'

import Link from 'next/link'
import { Product, Size } from '@/lib/products'
import { EditorialImage } from './EditorialImage'
import { formatAED, cn } from '@/lib/utils'

export function ProductCard({
  product,
  dark = false,
}: {
  product: Product
  dark?: boolean
}) {
  const sizes = Object.keys(product.price) as Size[]
  const defaultSize = sizes[0]
  const price = product.price[defaultSize]!
  const compare = product.compareAt?.[defaultSize]
  const off = compare ? Math.round((1 - price / compare) * 100) : 0
  const isNew = product.badges.includes('new')

  return (
    <Link href={`/products/${product.slug}`} className="group block">
      <div className={cn('relative overflow-hidden rounded-2xl', dark ? 'bg-white/[0.04]' : 'bg-[#f1ede6]')}>
        <div className="relative aspect-square overflow-hidden rounded-2xl">
          <EditorialImage
            seed={product.slug}
            label={product.name}
            rounded={false}
            className="absolute inset-0 h-full w-full transition-transform duration-[900ms] ease-out will-change-transform group-hover:scale-105"
          />
        </div>

        {off > 0 ? (
          <span className="absolute right-3 top-3 rounded-full bg-ink/85 px-2.5 py-1 text-[11px] font-medium text-white">
            {off}% OFF
          </span>
        ) : isNew ? (
          <span className="absolute left-3 top-3 inline-flex items-center gap-1.5 rounded-full bg-white px-2.5 py-1 text-[11px] font-medium text-ink shadow-sm">
            <span className="h-1.5 w-1.5 rounded-full bg-amber" /> New
          </span>
        ) : null}
      </div>

      <div className="px-0.5 pt-4">
        <h3 className={cn('text-[15px] font-medium', dark ? 'text-white' : 'text-ink')}>
          {product.name}
        </h3>
        <p className={cn('mt-1 line-clamp-1 text-[13px]', dark ? 'text-white/55' : 'text-taupe')}>
          {product.tagline}
        </p>
        <p className="mt-2 flex items-center gap-2 font-geo text-base tracking-wide text-amber">
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
      <div className="aspect-square w-full rounded-2xl skeleton" />
      <div className="mt-4 h-4 w-2/3 rounded skeleton" />
      <div className="mt-2 h-3 w-1/2 rounded skeleton" />
      <div className="mt-2 h-3 w-1/4 rounded skeleton" />
    </div>
  )
}
