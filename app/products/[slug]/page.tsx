import type { Metadata } from 'next'
import { notFound } from 'next/navigation'
import Link from 'next/link'
import { Droplet, Layers, Snowflake } from 'lucide-react'
import { ProductHero } from '@/components/pdp/ProductHero'
import { NotesPyramid } from '@/components/pdp/NotesPyramid'
import { ReviewsSection } from '@/components/pdp/ReviewsSection'
import { ProductCard } from '@/components/ui/ProductCard'
import { EditorialImage } from '@/components/ui/EditorialImage'
import { SectionHeader } from '@/components/ui/SectionHeader'
import { PRODUCTS, getProductBySlug, getRelated } from '@/lib/products'

export function generateStaticParams() {
  return PRODUCTS.map((p) => ({ slug: p.slug }))
}

export function generateMetadata({ params }: { params: { slug: string } }): Metadata {
  const product = getProductBySlug(params.slug)
  if (!product) return { title: 'Not Found' }
  return {
    title: `${product.name} ${Object.keys(product.price)[0]}`,
    description: product.description.slice(0, 150),
    openGraph: { title: product.name, description: product.tagline },
  }
}

const HOW_TO_WEAR = [
  { icon: Droplet, title: 'Apply to pulse points', sub: 'Wrists, neck, behind the ears.' },
  { icon: Layers, title: 'Layer for longevity', sub: 'Pair with the matching body oil.' },
  { icon: Snowflake, title: 'Store cool & dark', sub: 'Away from heat and direct light.' },
]

export default function ProductPage({ params }: { params: { slug: string } }) {
  const product = getProductBySlug(params.slug)
  if (!product) notFound()
  const related = getRelated(product.slug, 4)
  const firstSize = Object.keys(product.price)[0]

  const jsonLd = {
    '@context': 'https://schema.org',
    '@type': 'Product',
    name: product.name,
    description: product.description,
    category: product.category,
    brand: { '@type': 'Brand', name: 'Habib Alruh' },
    aggregateRating: {
      '@type': 'AggregateRating',
      ratingValue: product.rating,
      reviewCount: product.reviewCount,
    },
    offers: {
      '@type': 'Offer',
      priceCurrency: 'AED',
      price: product.price[firstSize as keyof typeof product.price],
      availability: product.inStock
        ? 'https://schema.org/InStock'
        : 'https://schema.org/OutOfStock',
    },
  }

  const breadcrumbLd = {
    '@context': 'https://schema.org',
    '@type': 'BreadcrumbList',
    itemListElement: [
      { '@type': 'ListItem', position: 1, name: 'Home', item: 'https://habibalruh.ae' },
      { '@type': 'ListItem', position: 2, name: 'Fragrances', item: 'https://habibalruh.ae/products' },
      { '@type': 'ListItem', position: 3, name: product.name },
    ],
  }

  return (
    <>
      <nav className="container-site pt-6 text-xs text-taupe" aria-label="Breadcrumb">
        <Link href="/">Home</Link> <span className="mx-1">/</span>{' '}
        <Link href="/products">Fragrances</Link> <span className="mx-1">/</span>{' '}
        <span className="text-ink">{product.name}</span>
      </nav>

      <ProductHero product={product} />

      {/* Scent story */}
      <section className="relative mt-20 overflow-hidden py-24 text-white md:py-32">
        <EditorialImage seed={`${product.slug}-story`} rounded={false} className="absolute inset-0 h-full w-full" />
        <div className="absolute inset-0 bg-ink/75" />
        <div className="container-site relative max-w-2xl text-center">
          <p className="eyebrow mb-3 text-gold">The Story</p>
          <h2 className="font-display text-3xl md:text-4xl">The Story Behind {product.name}</h2>
          <p className="mt-6 text-lg leading-relaxed text-white/80">{product.story}</p>
        </div>
      </section>

      <NotesPyramid notes={product.notes} />

      {/* How to wear */}
      <section className="section-pad bg-ivory">
        <div className="container-site">
          <h2 className="mb-10 text-center font-display text-3xl md:text-4xl">How to Wear</h2>
          <div className="grid gap-6 md:grid-cols-3">
            {HOW_TO_WEAR.map((s) => (
              <div key={s.title} className="rounded-card bg-surface p-7 text-center shadow-card">
                <s.icon size={28} className="mx-auto text-gold" strokeWidth={1.5} />
                <h3 className="mt-4 font-display text-xl">{s.title}</h3>
                <p className="mt-2 text-sm text-taupe">{s.sub}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Complementary products */}
      <section className="section-pad bg-surface">
        <div className="container-site">
          <SectionHeader lead="Pair It" trail="With" className="mb-8" />
          <div className="grid grid-cols-2 gap-4 md:grid-cols-4">
            {related.map((p) => (
              <ProductCard key={p.id} product={p} />
            ))}
          </div>
        </div>
      </section>

      <ReviewsSection product={product} />

      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbLd) }} />
    </>
  )
}
