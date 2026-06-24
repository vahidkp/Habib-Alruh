---
name: seo-performance
description: >
  Use this skill when working on SEO, metadata, structured data, performance
  optimization, or accessibility for the Habib Alruh website. Triggers:
  setting up Next.js Metadata API for any page, adding JSON-LD structured data
  (Product, BreadcrumbList, Organization), configuring sitemap.xml or robots.txt,
  optimizing Core Web Vitals (LCP, CLS, FID), setting up next/font, optimizing
  Next.js Image components, implementing skip-to-content links, or auditing
  with Lighthouse. Also use when debugging layout shift from font loading,
  hero image LCP, or sticky navbar z-index conflicts.
---

# SEO & Performance — Habib Alruh

## Metadata API (Next.js 14 App Router)

### Root Layout Metadata (app/layout.tsx)
```tsx
import { Metadata } from 'next'

export const metadata: Metadata = {
  metadataBase: new URL('https://habibalruh.com'),
  title: {
    default: 'Habib Alruh — Luxury Fragrances for Him & Her',
    template: '%s — Habib Alruh',
  },
  description: 'Discover handcrafted luxury perfumes by Habib Alruh. Shop our signature, fresh, floral, and woody collections. Free shipping on orders over ₹999.',
  keywords: ['luxury perfume', 'Indian fragrance', 'oud', 'attar', 'perfume online India'],
  openGraph: {
    type: 'website',
    locale: 'en_IN',
    siteName: 'Habib Alruh',
    images: [{ url: '/og-default.jpg', width: 1200, height: 630, alt: 'Habib Alruh' }],
  },
  twitter: {
    card: 'summary_large_image',
    site: '@habibalruh',
  },
  robots: {
    index: true, follow: true,
    googleBot: { index: true, follow: true, 'max-image-preview': 'large' },
  },
}
```

### PLP Metadata (app/products/page.tsx)
```tsx
export async function generateMetadata({ searchParams }): Promise<Metadata> {
  const collection = searchParams.collection
  const label = COLLECTION_LABELS[collection] ?? 'All Fragrances'
  const { total } = await getProducts({ collection })
  return {
    title: `${label} Fragrances`,
    description: `Browse ${total} premium fragrances in our ${label} range. Free shipping on orders over ₹999.`,
    openGraph: {
      title: `${label} — Habib Alruh`,
      images: [{ url: `/og/collection-${collection ?? 'all'}.jpg`, width: 1200, height: 630 }],
    },
    alternates: {
      canonical: collection ? `/products?collection=${collection}` : '/products',
    },
  }
}
```

### PDP Metadata (app/products/[slug]/page.tsx)
```tsx
export async function generateMetadata({ params }): Promise<Metadata> {
  const product = await getProductBySlug(params.slug)
  if (!product) return { title: 'Product Not Found' }
  return {
    title: `${product.name}`,
    description: product.description.slice(0, 160),
    openGraph: {
      title: `${product.name} — Habib Alruh`,
      description: product.tagline,
      images: [{ url: product.images[0], width: 800, height: 800, alt: product.name }],
      type: 'website',
    },
    alternates: { canonical: `/products/${product.slug}` },
  }
}
```

---

## JSON-LD Structured Data

### Organization Schema (app/layout.tsx)
```tsx
export default function RootLayout({ children }) {
  const organizationSchema = {
    '@context': 'https://schema.org',
    '@type': 'Organization',
    name: 'Habib Alruh',
    url: 'https://habibalruh.com',
    logo: 'https://habibalruh.com/logo.png',
    sameAs: [
      'https://instagram.com/habibalruh',
      'https://facebook.com/habibalruh',
    ],
    contactPoint: {
      '@type': 'ContactPoint',
      contactType: 'customer service',
      availableLanguage: ['English', 'Hindi'],
    },
  }

  return (
    <html lang="en">
      <head>
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(organizationSchema) }}
        />
      </head>
      <body>{children}</body>
    </html>
  )
}
```

### Product Schema (app/products/[slug]/page.tsx)
```tsx
function ProductSchema({ product }) {
  const basePrice = Math.min(...Object.values(product.price))
  const schema = {
    '@context': 'https://schema.org',
    '@type': 'Product',
    name: product.name,
    description: product.description,
    image: product.images,
    brand: { '@type': 'Brand', name: 'Habib Alruh' },
    offers: {
      '@type': 'AggregateOffer',
      lowPrice: basePrice,
      highPrice: Math.max(...Object.values(product.price)),
      priceCurrency: 'INR',
      availability: product.inStock
        ? 'https://schema.org/InStock'
        : 'https://schema.org/OutOfStock',
    },
    aggregateRating: {
      '@type': 'AggregateRating',
      ratingValue: product.rating,
      reviewCount: product.reviewCount,
    },
  }

  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }}
    />
  )
}
```

### Breadcrumb Schema
```tsx
function BreadcrumbSchema({ items }: { items: { name: string; url: string }[] }) {
  const schema = {
    '@context': 'https://schema.org',
    '@type': 'BreadcrumbList',
    itemListElement: items.map((item, i) => ({
      '@type': 'ListItem',
      position: i + 1,
      name: item.name,
      item: `https://habibalruh.com${item.url}`,
    })),
  }
  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }}
    />
  )
}
// Usage on PDP:
// <BreadcrumbSchema items={[
//   { name: 'Home', url: '/' },
//   { name: 'Fragrances', url: '/products' },
//   { name: product.name, url: `/products/${product.slug}` },
// ]} />
```

---

## Sitemap (app/sitemap.ts)
```typescript
import { MetadataRoute } from 'next'
import { getAllProducts } from '@/lib/products'

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const products = await getAllProducts()

  const productUrls = products.map(p => ({
    url: `https://habibalruh.com/products/${p.slug}`,
    lastModified: new Date(),
    changeFrequency: 'weekly' as const,
    priority: 0.8,
  }))

  return [
    { url: 'https://habibalruh.com', lastModified: new Date(), changeFrequency: 'daily', priority: 1 },
    { url: 'https://habibalruh.com/products', lastModified: new Date(), changeFrequency: 'daily', priority: 0.9 },
    ...productUrls,
    { url: 'https://habibalruh.com/about', changeFrequency: 'monthly', priority: 0.5 },
    { url: 'https://habibalruh.com/stores', changeFrequency: 'monthly', priority: 0.5 },
  ]
}
```

## robots.txt (app/robots.ts)
```typescript
import { MetadataRoute } from 'next'

export default function robots(): MetadataRoute.Robots {
  return {
    rules: { userAgent: '*', allow: '/', disallow: ['/api/', '/checkout/'] },
    sitemap: 'https://habibalruh.com/sitemap.xml',
  }
}
```

---

## Performance: Core Web Vitals

### LCP — Hero Image
```tsx
// Always add priority to above-fold images
<Image
  src="/images/hero/slide-1.jpg"
  alt="Introducing Saffron Noir"
  fill
  priority           // ← adds <link rel="preload"> in <head>
  sizes="100vw"
  quality={85}
/>
```

### CLS — Font Loading
```tsx
// In app/layout.tsx: use next/font — eliminates FOUT and CLS
import { Playfair_Display, Inter } from 'next/font/google'
const playfair = Playfair_Display({ subsets: ['latin'], variable: '--font-display', display: 'swap' })
// display: 'swap' prevents invisible text during font load
```

### CLS — Image Placeholders
```tsx
// For non-priority images (product cards), always set width+height or fill+sizes
// Never use unsized images

// Option A: fixed size
<Image src={img} alt={name} width={400} height={400} />

// Option B: fill (parent must have position: relative + dimensions)
<div style={{ position: 'relative', aspectRatio: '1/1' }}>
  <Image src={img} alt={name} fill sizes="25vw" />
</div>
```

### Bundle Size
```javascript
// next.config.js
/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    formats: ['image/avif', 'image/webp'],
    remotePatterns: [{ hostname: 'cdn.habibalruh.com' }],
  },
  experimental: {
    optimizePackageImports: ['lucide-react', '@antigravity/react'],
  },
}
module.exports = nextConfig
```

---

## Accessibility Checklist

### Skip to Content Link (app/layout.tsx)
```tsx
// Must be the first focusable element in the DOM
<a href="#main-content" className="skip-link">
  Skip to main content
</a>

// Target on each page:
<main id="main-content" tabIndex={-1}>
```
```css
.skip-link {
  position: absolute;
  top: -100%;
  left: 16px;
  background: var(--color-gold);
  color: var(--color-primary-black);
  padding: 8px 16px;
  border-radius: 0 0 4px 4px;
  font-weight: 600;
  z-index: 9999;
  transition: top 0.2s;
}
.skip-link:focus { top: 0; }
```

### Focus Rings
```css
/* Global — override browser default with branded focus ring */
:focus-visible {
  outline: 2px solid var(--color-gold);
  outline-offset: 3px;
  border-radius: 2px;
}
/* Remove outline for mouse users */
:focus:not(:focus-visible) { outline: none; }
```

### Reduced Motion
```css
@media (prefers-reduced-motion: reduce) {
  *, *::before, *::after {
    animation-duration: 0.01ms !important;
    animation-iteration-count: 1 !important;
    transition-duration: 0.01ms !important;
  }
  .hero-carousel { /* disable Ken Burns */ }
  .promo-banner__track { animation: none; }
}
```

### ARIA Patterns for Custom UI
| Component | ARIA |
|---|---|
| Hero carousel | `role="region"`, `aria-label="Featured collections"`, `aria-live="polite"` on slide counter |
| Filter bar | `role="group"` per filter group, `aria-label` on each Select |
| Size buttons | `role="group"`, `aria-pressed` on each button |
| Qty stepper | `aria-label="Quantity"`, `aria-live="polite"` on count |
| Cart badge | `aria-label="Cart, N items"` on trigger button |
| Product card wishlist | `aria-label`, `aria-pressed` |
| Review stars | `aria-label="N out of 5 stars"` on the star group |

---

## Lighthouse Targets

| Metric | Target | Tips |
|---|---|---|
| LCP | < 2.5s | `priority` on hero, preconnect to CDN, AVIF format |
| CLS | < 0.1 | `next/font`, sized images, no layout-shifting ads |
| FID/INP | < 100ms | Avoid long tasks, code-split heavy components |
| First Load JS | < 200KB gz | `optimizePackageImports`, dynamic imports for Lightbox/ReviewForm |
| Accessibility | > 95 | Skip link, focus rings, ARIA, colour contrast ≥ 4.5:1 |

## Dynamic Imports for Heavy Components
```tsx
// Don't import Lightbox/ReviewForm eagerly — only load on demand
import dynamic from 'next/dynamic'

const ReviewForm = dynamic(() => import('./ReviewForm'), { ssr: false })
const Lightbox = dynamic(() => import('./Lightbox'), { ssr: false })
```

## Common Mistakes
- Never add `<script>` tags manually in `<head>` — use Next.js `<Script>` component with `strategy="lazyOnload"` for third-party scripts
- `generateMetadata` must be async if it fetches data — missing `await` causes silent empty metadata
- Structured data: always validate at https://search.google.com/test/rich-results before shipping
- `canonical` URLs on filtered PLP pages — always point to the base `/products` path without filter params to avoid duplicate content penalties
- `robots.txt` must disallow `/api/` routes — these are crawled by bots and count against crawl budget
