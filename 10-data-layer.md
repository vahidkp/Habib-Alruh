---
name: data-layer
description: >
  Use this skill when working with the product data layer, mock product
  catalogue, or wishlist store for Habib Alruh. Triggers: creating or
  modifying the PRODUCTS mock array, implementing getProducts() or
  getProductBySlug() functions, adding new product fields, setting up the
  Zustand wishlist store, or wiring server-side data fetching to page components.
  Also use when transitioning from mock data to a real API/CMS endpoint.
  Reference the product-card skill and product-listing-page skill for how
  this data is consumed.
---

# Data Layer — Habib Alruh

## File Structure
```
/lib/
  products.ts        ← Product type, PRODUCTS array, query functions
  cart.ts            ← Zustand cart store (see cart-drawer skill)
  wishlist.ts        ← Zustand wishlist store
  hooks/
    useIsMobile.ts
    useIntersection.ts
```

---

## Product Types (lib/products.ts)

```typescript
export type ProductCategory = 'fresh' | 'floral' | 'woody' | 'oriental' | 'citrus'
export type ProductGender = 'him' | 'her' | 'unisex'
export type ProductBadge = 'new' | 'bestseller' | 'limited' | 'sale'

export interface FragranceNotes {
  top: string[]
  middle: string[]
  base: string[]
}

export interface Product {
  id: string
  slug: string
  name: string
  tagline: string
  description: string         // 2–3 sentences for PLP/meta
  story: string               // longer editorial copy for PDP scent story section
  price: Record<string, number>  // e.g. { "30ml": 799, "50ml": 1299, "100ml": 1999 }
  images: string[]            // [primary, hover, alt1, alt2, ...]
  category: ProductCategory
  gender: ProductGender
  badges: ProductBadge[]
  notes: FragranceNotes
  rating: number              // 0–5, one decimal place
  reviewCount: number
  inStock: boolean
  complementaryIds?: string[] // IDs of related products shown on PDP
}
```

---

## Mock Product Catalogue (lib/products.ts)

```typescript
export const PRODUCTS: Product[] = [
  {
    id: 'p001',
    slug: 'saffron-noir-100ml',
    name: 'Saffron Noir',
    tagline: 'A journey through ancient spice routes',
    description: 'Deep, warm, and intoxicating — Saffron Noir opens with golden saffron before softening into dark rose and a base of smoky oud.',
    story: `In the heart of ancient Persia, where spice traders gathered at dusk, this fragrance was born. Saffron Noir captures the intensity of a golden saffron harvest — the world's rarest spice rendered in liquid form. As the scent unfolds, the initial intensity gives way to a soft dark rose at the heart, before settling into a base of smoky oud that lingers on the skin for hours. It is a fragrance of journeys, of destinations both real and imagined.`,
    price: { '30ml': 1299, '50ml': 1899, '100ml': 2999 },
    images: [
      '/images/products/saffron-noir-1.jpg',
      '/images/products/saffron-noir-2.jpg',
      '/images/products/saffron-noir-3.jpg',
    ],
    category: 'oriental',
    gender: 'unisex',
    badges: ['bestseller'],
    notes: {
      top: ['Saffron', 'Black Pepper', 'Bergamot'],
      middle: ['Dark Rose', 'Patchouli', 'Jasmine'],
      base: ['Oud', 'Sandalwood', 'Ambergris'],
    },
    rating: 4.8,
    reviewCount: 312,
    inStock: true,
    complementaryIds: ['p002', 'p005', 'p007'],
  },
  {
    id: 'p002',
    slug: 'ivory-bloom-50ml',
    name: 'Ivory Bloom',
    tagline: 'The first light of a garden morning',
    description: 'Ivory Bloom is a delicate floral for her — fresh white florals warmed by soft musk and sandalwood.',
    story: `Imagine stepping into a private garden just as the sun rises. The dew still clings to ivory petals — gardenia, white rose, and magnolia — before the warmth of the day transforms them into something more intimate. Ivory Bloom is that suspended moment; fresh, feminine, and quietly luminous.`,
    price: { '30ml': 899, '50ml': 1499 },
    images: [
      '/images/products/ivory-bloom-1.jpg',
      '/images/products/ivory-bloom-2.jpg',
    ],
    category: 'floral',
    gender: 'her',
    badges: ['new', 'bestseller'],
    notes: {
      top: ['White Rose', 'Magnolia', 'Bergamot'],
      middle: ['Gardenia', 'Peony', 'Lily of the Valley'],
      base: ['Sandalwood', 'White Musk', 'Cedarwood'],
    },
    rating: 4.7,
    reviewCount: 187,
    inStock: true,
    complementaryIds: ['p001', 'p003'],
  },
  {
    id: 'p003',
    slug: 'cedar-dusk-100ml',
    name: 'Cedar Dusk',
    tagline: 'For the man who commands a room',
    description: 'Cedar Dusk is a bold woody fragrance for him — smoky cedar, vetiver, and leather with a citrus opening.',
    story: `As evening settles over the city and the last meetings of the day end, Cedar Dusk steps in. A confident man's companion — it opens bright with Italian bergamot and grapefruit before revealing the character underneath: aged cedarwood, smoky vetiver, and a subtle leather accord that wears like confidence itself.`,
    price: { '50ml': 1599, '100ml': 2499 },
    images: [
      '/images/products/cedar-dusk-1.jpg',
      '/images/products/cedar-dusk-2.jpg',
    ],
    category: 'woody',
    gender: 'him',
    badges: ['bestseller'],
    notes: {
      top: ['Bergamot', 'Grapefruit', 'Pink Pepper'],
      middle: ['Cedarwood', 'Vetiver', 'Cardamom'],
      base: ['Leather', 'Oakmoss', 'Amber'],
    },
    rating: 4.9,
    reviewCount: 428,
    inStock: true,
    complementaryIds: ['p004', 'p006'],
  },
  {
    id: 'p004',
    slug: 'aqua-libre-30ml',
    name: 'Aqua Libre',
    tagline: 'Breathe in the open sea',
    description: 'A liberating aquatic citrus fragrance — Aqua Libre is clean, fresh, and endlessly wearable.',
    story: `Standing at the edge of the sea, where salt and citrus fill the air and the horizon promises freedom — that is Aqua Libre. Light enough for morning, lasting enough for evening. The kind of fragrance that people notice without knowing why.`,
    price: { '30ml': 699, '50ml': 1099, '100ml': 1799 },
    images: [
      '/images/products/aqua-libre-1.jpg',
      '/images/products/aqua-libre-2.jpg',
    ],
    category: 'fresh',
    gender: 'unisex',
    badges: ['new'],
    notes: {
      top: ['Sea Salt', 'Lime', 'Neroli'],
      middle: ['Aquatic Accord', 'Jasmine', 'Cucumber'],
      base: ['Driftwood', 'Musk', 'Ambergris'],
    },
    rating: 4.5,
    reviewCount: 94,
    inStock: true,
  },
  {
    id: 'p005',
    slug: 'oud-royale-100ml',
    name: 'Oud Royale',
    tagline: 'A throne of smoke and silk',
    description: 'Oud Royale is Habib Alruh\'s most opulent fragrance — pure Hindi oud layered with rose and warm amber.',
    story: `Some fragrances whisper. Oud Royale speaks. This is a composition built for those who understand that true luxury is not subtle — it is definitive. Pure Hindi oud forms the core, surrounded by Damascene rose and a throne of warm amber that holds the entire composition in place for hours.`,
    price: { '50ml': 3499, '100ml': 5999 },
    images: [
      '/images/products/oud-royale-1.jpg',
      '/images/products/oud-royale-2.jpg',
    ],
    category: 'oriental',
    gender: 'unisex',
    badges: ['limited'],
    notes: {
      top: ['Oud', 'Saffron', 'Incense'],
      middle: ['Damascene Rose', 'Orris', 'Geranium'],
      base: ['Amber', 'Benzoin', 'Vanilla'],
    },
    rating: 4.9,
    reviewCount: 201,
    inStock: true,
    complementaryIds: ['p001', 'p003'],
  },
  {
    id: 'p006',
    slug: 'citrus-soleil-30ml',
    name: 'Citrus Soleil',
    tagline: 'Sunshine in a bottle',
    description: 'Bright, cheerful, and effortless — Citrus Soleil is the perfect everyday fragrance.',
    story: `Not every fragrance needs a story. Some just need to make you smile. Citrus Soleil is exactly that — a burst of Sicilian lemon and mandarin that makes Tuesday feel like a holiday. Wear it like sunscreen: generously and without thinking about it.`,
    price: { '30ml': 599, '50ml': 899 },
    images: [
      '/images/products/citrus-soleil-1.jpg',
      '/images/products/citrus-soleil-2.jpg',
    ],
    category: 'citrus',
    gender: 'unisex',
    badges: ['sale'],
    notes: {
      top: ['Sicilian Lemon', 'Mandarin', 'Grapefruit'],
      middle: ['Neroli', 'Petitgrain', 'Basil'],
      base: ['White Musk', 'Vetiver', 'Cedarwood'],
    },
    rating: 4.4,
    reviewCount: 156,
    inStock: true,
  },
]
```

---

## Query Functions

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

export async function getProducts(params: GetProductsParams = {}) {
  // Simulate async (replace with real API call in production)
  await new Promise(r => setTimeout(r, 0))

  let results = [...PRODUCTS]

  // --- Filters ---
  if (params.gender && params.gender !== 'unisex') {
    results = results.filter(
      p => p.gender === params.gender || p.gender === 'unisex'
    )
  }
  if (params.category) {
    results = results.filter(p => p.category === params.category)
  }
  if (params.collection) {
    results = results.filter(p => p.badges.includes(params.collection as ProductBadge))
  }
  if (params.price === 'under-1000') {
    results = results.filter(p => Math.min(...Object.values(p.price)) < 1000)
  } else if (params.price === '1000-3000') {
    results = results.filter(p => {
      const min = Math.min(...Object.values(p.price))
      return min >= 1000 && min <= 3000
    })
  } else if (params.price === 'over-3000') {
    results = results.filter(p => Math.min(...Object.values(p.price)) > 3000)
  }
  if (params.size) {
    results = results.filter(p => params.size! in p.price)
  }

  // --- Sort ---
  const sort = params.sort ?? 'bestsellers'
  if (sort === 'price-asc') {
    results.sort((a, b) =>
      Math.min(...Object.values(a.price)) - Math.min(...Object.values(b.price))
    )
  } else if (sort === 'price-desc') {
    results.sort((a, b) =>
      Math.min(...Object.values(b.price)) - Math.min(...Object.values(a.price))
    )
  } else if (sort === 'new') {
    results.sort((a, b) => {
      const aIsNew = a.badges.includes('new') ? -1 : 0
      const bIsNew = b.badges.includes('new') ? -1 : 0
      return aIsNew - bIsNew
    })
  } else {
    // bestsellers: sort by reviewCount as proxy
    results.sort((a, b) => b.reviewCount - a.reviewCount)
  }

  // --- Pagination ---
  const total = results.length
  const page = params.page ?? 1
  const perPage = params.perPage ?? 24
  const paginated = results.slice((page - 1) * perPage, page * perPage)

  return { products: paginated, total }
}

export async function getProductBySlug(slug: string): Promise<Product | null> {
  await new Promise(r => setTimeout(r, 0))
  return PRODUCTS.find(p => p.slug === slug) ?? null
}

export async function getAllProducts(): Promise<Product[]> {
  return PRODUCTS
}

export async function getComplementaryProducts(ids: string[]): Promise<Product[]> {
  return PRODUCTS.filter(p => ids.includes(p.id))
}

export async function getBestsellers(limit = 6): Promise<Product[]> {
  return PRODUCTS
    .filter(p => p.badges.includes('bestseller'))
    .sort((a, b) => b.reviewCount - a.reviewCount)
    .slice(0, limit)
}
```

---

## Wishlist Store (lib/wishlist.ts)

```typescript
import { create } from 'zustand'
import { persist } from 'zustand/middleware'

interface WishlistState {
  ids: string[]
  toggle: (productId: string) => void
  isWishlisted: (productId: string) => boolean
  clear: () => void
}

export const useWishlistStore = create<WishlistState>()(
  persist(
    (set, get) => ({
      ids: [],

      toggle(productId) {
        const current = get().ids
        set({
          ids: current.includes(productId)
            ? current.filter(id => id !== productId)
            : [...current, productId],
        })
      },

      isWishlisted(productId) {
        return get().ids.includes(productId)
      },

      clear() { set({ ids: [] }) },
    }),
    { name: 'habibalruh-wishlist' }
  )
)
```

---

## Utility Hook: useIntersection (lib/hooks/useIntersection.ts)

```typescript
// Reusable hook used by NotesPyramid, FootprintBanner, etc.
import { useEffect, useRef, useState } from 'react'

export function useIntersection(threshold = 0.3) {
  const ref = useRef<HTMLElement>(null)
  const [visible, setVisible] = useState(false)

  useEffect(() => {
    const obs = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setVisible(true)
          obs.disconnect()  // fire once
        }
      },
      { threshold }
    )
    if (ref.current) obs.observe(ref.current)
    return () => obs.disconnect()
  }, [threshold])

  return { ref, visible }
}

// Usage:
// const { ref, visible } = useIntersection(0.4)
// <section ref={ref} className={visible ? 'is-visible' : ''}>
```

---

## Transitioning to a Real API

When replacing mock data with a real CMS/API (e.g. Shopify, Contentful, custom backend):
1. Keep the `Product` interface exactly as-is — adapt the API response to this shape in a transform function
2. Replace `await new Promise(r => setTimeout(r, 0))` with `fetch()`
3. Add `cache: 'revalidate'` or `next: { revalidate: 60 }` to `fetch()` calls for ISR
4. Move `PRODUCTS` constant to a seed script for development

```typescript
// Future API shape example:
export async function getProducts(params: GetProductsParams) {
  const url = new URL('/api/products', process.env.API_BASE_URL)
  Object.entries(params).forEach(([k, v]) => v && url.searchParams.set(k, String(v)))

  const res = await fetch(url, { next: { revalidate: 60 } })
  if (!res.ok) throw new Error('Failed to fetch products')

  const data = await res.json()
  return {
    products: data.items.map(transformProduct),
    total: data.total,
  }
}
```

## Common Mistakes
- Never mutate the `PRODUCTS` array directly in filter functions — always spread: `let results = [...PRODUCTS]`
- `isWishlisted` in Zustand must read from `get()` not from closure to always return current state
- `complementaryIds` should be optional (`?`) — not all products have related products
- Price values are per-size numbers in INR — never store as formatted strings like "₹1,299"
- `getProductBySlug` returns `null` (not `undefined`) when not found — calling code must handle `null` explicitly
- In mock async functions, `await new Promise(...)` is a no-op delay — replace with real fetch before production; don't ship delay timers to prod
