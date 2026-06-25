---
name: product-listing-page
description: >
  Use this skill when building or modifying the Product Listing Page (PLP) for
  Habib Alruh at /products. Triggers: building the collection hero banner,
  implementing the sticky filter bar, constructing the product grid, adding
  filter/sort logic, implementing active filter pills, building the mobile
  filter drawer, or adding load-more pagination. Also use when debugging
  filter state management, URL query param sync, or grid responsive layout
  issues. Reference product-card skill for the card component and
  antigravity-theme-setup skill for tokens.
---

# Product Listing Page (PLP) — Habib Alruh

## Route
`/products` — Next.js App Router page with Server Component + URL-based filtering

## File Structure
```
/app/products/
  page.tsx          ← Server Component (reads searchParams, fetches filtered products)
  loading.tsx       ← Skeleton grid shown during navigation
  /components/
    CollectionHero.tsx
    FilterBar.tsx
    FilterDrawer.tsx   (mobile)
    ActiveFilters.tsx
    ProductGrid.tsx
    LoadMore.tsx
```

---

## page.tsx (Server Component)
```tsx
import { getProducts } from '@/lib/products'
import { CollectionHero } from './components/CollectionHero'
import { FilterBar } from './components/FilterBar'
import { ProductGrid } from './components/ProductGrid'
import { LoadMore } from './components/LoadMore'

interface PageProps {
  searchParams: {
    collection?: string
    gender?: string
    category?: string
    sort?: string
    price?: string
    size?: string
    page?: string
  }
}

export default async function ProductsPage({ searchParams }: PageProps) {
  const { products, total } = await getProducts({
    collection: searchParams.collection,
    gender: searchParams.gender,
    category: searchParams.category,
    sort: searchParams.sort ?? 'bestsellers',
    price: searchParams.price,
    size: searchParams.size,
    page: Number(searchParams.page ?? 1),
    perPage: 24,
  })

  const collectionLabel = searchParams.collection
    ? COLLECTION_LABELS[searchParams.collection] ?? 'All Fragrances'
    : 'All Fragrances'

  return (
    <main>
      <CollectionHero label={collectionLabel} count={total} />
      <FilterBar activeFilters={searchParams} totalCount={total} />
      <section className="plp__body section">
        <ActiveFilters activeFilters={searchParams} />
        <ProductGrid products={products} />
        <LoadMore total={total} loaded={products.length} currentPage={Number(searchParams.page ?? 1)} />
      </section>
    </main>
  )
}

const COLLECTION_LABELS: Record<string, string> = {
  signature: 'Signature Series',
  gifts: 'Gift Sets',
  new: 'New Arrivals',
  sale: 'Sale',
}
```

---

## CollectionHero
```tsx
import Image from 'next/image'

export function CollectionHero({ label, count }: { label: string; count: number }) {
  return (
    <section className="collection-hero">
      <Image
        src="/images/plp-hero.jpg"
        alt={label}
        fill
        priority
        className="collection-hero__bg"
      />
      <div className="collection-hero__overlay" />
      <div className="collection-hero__content">
        <h1 className="collection-hero__title">{label}</h1>
        <span className="collection-hero__count">{count} Fragrances</span>
      </div>
    </section>
  )
}
```
```css
.collection-hero {
  position: relative;
  height: 40vh;
  min-height: 280px;
  display: flex; align-items: flex-end;
  padding: 40px;
  overflow: hidden;
}
.collection-hero__bg { object-fit: cover; }
.collection-hero__overlay {
  position: absolute; inset: 0;
  background: linear-gradient(to top, rgba(0,0,0,0.7) 0%, rgba(0,0,0,0.2) 100%);
}
.collection-hero__content { position: relative; z-index: 1; color: white; }
.collection-hero__title {
  font-family: var(--font-display);
  font-size: clamp(32px, 5vw, 64px);
  margin: 0 0 8px;
}
.collection-hero__count {
  font-family: var(--font-body);
  font-size: 14px;
  opacity: 0.7;
  border: 1px solid rgba(255,255,255,0.4);
  padding: 4px 12px;
  border-radius: 20px;
}
```

---

## FilterBar (Sticky)
```tsx
'use client'
import { useRouter, useSearchParams, usePathname } from 'next/navigation'
import { Select } from '@antigravity/react'

const FILTER_CONFIG = {
  category: {
    label: 'Category',
    options: ['Fresh', 'Floral', 'Woody', 'Oriental', 'Citrus'],
  },
  gender: {
    label: 'Gender',
    options: ['Him', 'Her', 'Unisex'],
  },
  price: {
    label: 'Price',
    options: ['Under ₹1,000', '₹1,000–₹3,000', '₹3,000+'],
    values: ['under-1000', '1000-3000', 'over-3000'],
  },
  size: {
    label: 'Size',
    options: ['30ml', '50ml', '100ml'],
  },
}

const SORT_OPTIONS = [
  { label: 'Bestsellers', value: 'bestsellers' },
  { label: 'New Arrivals', value: 'new' },
  { label: 'Price: Low to High', value: 'price-asc' },
  { label: 'Price: High to Low', value: 'price-desc' },
]

export function FilterBar({ activeFilters, totalCount }) {
  const router = useRouter()
  const pathname = usePathname()
  const searchParams = useSearchParams()

  function updateFilter(key: string, value: string) {
    const params = new URLSearchParams(searchParams.toString())
    if (value === '') {
      params.delete(key)
    } else {
      params.set(key, value)
    }
    params.delete('page') // reset pagination on filter change
    router.push(`${pathname}?${params.toString()}`)
  }

  return (
    <div className="filter-bar">
      <div className="filter-bar__inner">
        {/* Desktop filters */}
        <div className="filter-bar__filters">
          {Object.entries(FILTER_CONFIG).map(([key, config]) => (
            <Select
              key={key}
              value={activeFilters[key] ?? ''}
              onValueChange={(v) => updateFilter(key, v)}
              placeholder={config.label}
              className="filter-bar__select"
            >
              <option value="">All {config.label}</option>
              {config.options.map((opt, i) => (
                <option key={opt} value={config.values?.[i] ?? opt.toLowerCase()}>
                  {opt}
                </option>
              ))}
            </Select>
          ))}
        </div>

        {/* Count + Sort */}
        <div className="filter-bar__right">
          <span className="filter-bar__count">{totalCount} products</span>
          <Select
            value={activeFilters.sort ?? 'bestsellers'}
            onValueChange={(v) => updateFilter('sort', v)}
            className="filter-bar__sort"
          >
            {SORT_OPTIONS.map(opt => (
              <option key={opt.value} value={opt.value}>{opt.label}</option>
            ))}
          </Select>
        </div>

        {/* Mobile: Filter button (opens drawer) */}
        <FilterDrawerTrigger activeFilters={activeFilters} />
      </div>
    </div>
  )
}
```
```css
.filter-bar {
  position: sticky;
  top: 72px; /* height of navbar */
  z-index: 50;
  background: var(--color-ivory);
  border-bottom: 1px solid rgba(0,0,0,0.08);
  padding: 12px 40px;
}
.filter-bar__inner {
  display: flex; align-items: center; gap: 12px;
}
.filter-bar__filters { display: flex; gap: 10px; flex: 1; }
.filter-bar__right { display: flex; align-items: center; gap: 16px; margin-left: auto; }
.filter-bar__count { font-size: 13px; color: var(--color-taupe); white-space: nowrap; }

@media (max-width: 768px) {
  .filter-bar__filters { display: none; }
  .filter-bar__sort { display: none; }
}
```

---

## ActiveFilters (Pills)
```tsx
'use client'
import { useRouter, useSearchParams, usePathname } from 'next/navigation'
import { X } from 'lucide-react'

const FILTER_DISPLAY_NAMES: Record<string, string> = {
  category: 'Category', gender: 'Gender', price: 'Price', size: 'Size', collection: 'Collection',
}

export function ActiveFilters({ activeFilters }) {
  const router = useRouter()
  const pathname = usePathname()
  const searchParams = useSearchParams()

  const EXCLUDED = ['sort', 'page']
  const active = Object.entries(activeFilters).filter(([k, v]) => v && !EXCLUDED.includes(k))

  if (active.length === 0) return null

  function removeFilter(key: string) {
    const params = new URLSearchParams(searchParams.toString())
    params.delete(key)
    params.delete('page')
    router.push(`${pathname}?${params.toString()}`)
  }

  function clearAll() {
    router.push(pathname)
  }

  return (
    <div className="active-filters">
      {active.map(([key, value]) => (
        <button
          key={key}
          className="active-filter-pill"
          onClick={() => removeFilter(key)}
          aria-label={`Remove ${FILTER_DISPLAY_NAMES[key]} filter`}
        >
          {FILTER_DISPLAY_NAMES[key]}: {value}
          <X size={12} />
        </button>
      ))}
      {active.length > 1 && (
        <button className="active-filter-clear" onClick={clearAll}>
          Clear all
        </button>
      )}
    </div>
  )
}
```
```css
.active-filters {
  display: flex; flex-wrap: wrap; gap: 8px;
  margin-bottom: 24px;
}
.active-filter-pill {
  display: flex; align-items: center; gap: 6px;
  padding: 6px 12px;
  background: var(--color-primary-black);
  color: white;
  border-radius: 20px;
  font-size: 12px;
  border: none; cursor: pointer;
  transition: background 0.2s;
}
.active-filter-pill:hover { background: var(--color-taupe); }
.active-filter-clear {
  padding: 6px 12px;
  background: none;
  border: 1px solid var(--color-taupe);
  border-radius: 20px;
  font-size: 12px;
  color: var(--color-taupe);
  cursor: pointer;
}
```

---

## ProductGrid
```tsx
import { ProductCard } from '@/components/ui/ProductCard'
import { ProductCardSkeleton } from '@/components/ui/ProductCard'

export function ProductGrid({ products }) {
  if (products.length === 0) {
    return (
      <div className="plp__empty">
        <p>No fragrances match your filters.</p>
        <a href="/products" className="btn btn--outline-gold">Clear Filters</a>
      </div>
    )
  }

  return (
    <div className="product-grid">
      {products.map(p => (
        <ProductCard key={p.id} product={p} variant="light" />
      ))}
    </div>
  )
}
```
```css
.product-grid {
  display: grid;
  grid-template-columns: repeat(4, 1fr);
  gap: 24px;
}
@media (max-width: 1024px) {
  .product-grid { grid-template-columns: repeat(3, 1fr); }
}
@media (max-width: 768px) {
  .product-grid { grid-template-columns: repeat(2, 1fr); gap: 16px; }
}
```

---

## LoadMore
```tsx
'use client'
import { useRouter, useSearchParams, usePathname } from 'next/navigation'
import { Button } from '@antigravity/react'

export function LoadMore({ total, loaded, currentPage }) {
  const router = useRouter()
  const pathname = usePathname()
  const searchParams = useSearchParams()

  if (loaded >= total) return null

  function handleLoadMore() {
    const params = new URLSearchParams(searchParams.toString())
    params.set('page', String(currentPage + 1))
    router.push(`${pathname}?${params.toString()}`, { scroll: false })
  }

  return (
    <div className="load-more">
      <p className="load-more__status">
        Showing {loaded} of {total} fragrances
      </p>
      <Button variant="outline-gold" onClick={handleLoadMore}>
        Load More
      </Button>
    </div>
  )
}
```
```css
.load-more { text-align: center; padding: 48px 0; }
.load-more__status { font-size: 14px; color: var(--color-taupe); margin-bottom: 20px; }
```

---

## loading.tsx (Skeleton)
```tsx
import { ProductCardSkeleton } from '@/components/ui/ProductCard'

export default function PLPLoading() {
  return (
    <main>
      <div className="collection-hero collection-hero--skeleton" />
      <div className="filter-bar filter-bar--skeleton" />
      <section className="plp__body section">
        <div className="product-grid">
          {Array(12).fill(0).map((_, i) => <ProductCardSkeleton key={i} />)}
        </div>
      </section>
    </main>
  )
}
```

---

## Mobile Filter Drawer
```tsx
import { Sheet, SheetTrigger, SheetContent, SheetHeader } from '@antigravity/react'
import { SlidersHorizontal } from 'lucide-react'

export function FilterDrawerTrigger({ activeFilters }) {
  const activeCount = Object.entries(activeFilters)
    .filter(([k, v]) => v && !['sort', 'page'].includes(k)).length

  return (
    <Sheet>
      <SheetTrigger className="filter-drawer-trigger md:hidden">
        <SlidersHorizontal size={16} />
        Filters {activeCount > 0 && <span className="filter-count-badge">{activeCount}</span>}
      </SheetTrigger>
      <SheetContent side="bottom" className="filter-drawer">
        <SheetHeader>Filters</SheetHeader>
        {/* Render all filter groups vertically */}
        <FilterDrawerContent activeFilters={activeFilters} />
      </SheetContent>
    </Sheet>
  )
}
```

---

## lib/products.ts (Data Layer)
```typescript
export interface GetProductsParams {
  collection?: string
  gender?: string
  category?: string
  sort?: string
  price?: string
  size?: string
  page?: number
  perPage?: number
}

export async function getProducts(params: GetProductsParams) {
  // In production: fetch from your headless CMS / API
  // For development: filter the PRODUCTS mock array

  let results = [...PRODUCTS]

  if (params.category) {
    results = results.filter(p => p.category === params.category)
  }
  if (params.gender) {
    results = results.filter(p => p.gender === params.gender || p.gender === 'unisex')
  }
  if (params.collection) {
    results = results.filter(p => p.badges.includes(params.collection as any))
  }
  if (params.price === 'under-1000') {
    results = results.filter(p => Math.min(...Object.values(p.price)) < 1000)
  }

  // Sort
  if (params.sort === 'price-asc') {
    results.sort((a, b) => Math.min(...Object.values(a.price)) - Math.min(...Object.values(b.price)))
  } else if (params.sort === 'price-desc') {
    results.sort((a, b) => Math.min(...Object.values(b.price)) - Math.min(...Object.values(a.price)))
  } else if (params.sort === 'new') {
    results = results.filter(p => p.badges.includes('new')).concat(results.filter(p => !p.badges.includes('new')))
  }

  const total = results.length
  const page = params.page ?? 1
  const perPage = params.perPage ?? 24
  const paginated = results.slice((page - 1) * perPage, page * perPage)

  return { products: paginated, total }
}
```

## Common Mistakes
- Filter changes must use `router.push`, NOT `router.replace` — back button should work correctly
- Always delete `page` param when changing filters — avoid showing page 3 of a 1-page filtered result
- `position: sticky` on FilterBar requires `top` equal to navbar height (72px) — if navbar height changes, update this too
- LoadMore must use `{ scroll: false }` to prevent jumping to top of page
- Server Component `searchParams` are always strings — always coerce `page` to `Number()`
- The empty state must offer a "Clear Filters" action, never a dead end
