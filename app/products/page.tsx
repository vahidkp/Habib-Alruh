import type { Metadata } from 'next'
import { Suspense } from 'react'
import { EditorialImage } from '@/components/ui/EditorialImage'
import { ProductsBrowser } from '@/components/plp/ProductsBrowser'
import { TOTAL_CATALOGUE } from '@/lib/products'

export const metadata: Metadata = {
  title: 'All Fragrances',
  description: `Browse ${TOTAL_CATALOGUE} premium fragrances in our collection. Free delivery across the UAE on orders over AED 200.`,
}

export default function ProductsPage() {
  return (
    <>
      {/* Collection hero */}
      <section className="relative flex h-[40vh] min-h-[320px] items-center justify-center overflow-hidden">
        <EditorialImage seed="plp-hero" rounded={false} className="absolute inset-0 h-full w-full" />
        <div className="absolute inset-0 bg-ink/55" />
        <div className="relative text-center text-white">
          <p className="eyebrow mb-3 text-gold">The Collection</p>
          <h1 className="font-display text-5xl md:text-7xl">All Fragrances</h1>
          <p className="mt-3 text-sm text-white/70">{TOTAL_CATALOGUE} Fragrances</p>
        </div>
      </section>

      {/* Breadcrumb */}
      <nav className="container-site pt-6 text-xs text-taupe" aria-label="Breadcrumb">
        Home <span className="mx-1">/</span> <span className="text-ink">All Fragrances</span>
      </nav>

      <Suspense fallback={<div className="container-site section-pad text-taupe">Loading…</div>}>
        <ProductsBrowser />
      </Suspense>
    </>
  )
}
