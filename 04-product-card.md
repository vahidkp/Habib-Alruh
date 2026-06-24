---
name: product-card
description: >
  Use this skill when building or modifying the ProductCard component used across
  the Habib Alruh website — on the homepage bestsellers strip, PLP grid, PDP
  complementary products, and any other product display context. Triggers:
  creating the card UI, implementing hover states (image swap, Add to Cart
  slide-up), wishlist toggle, badge display, or adapting the card for dark
  vs light background contexts. Also use when debugging card layout issues in
  grid or horizontal scroll containers.
---

# ProductCard Component — Habib Alruh

## File Location
```
/components/ui/ProductCard.tsx
/components/ui/ProductCard.css   (or co-located module)
```

## Data Shape
```typescript
// From /lib/products.ts
interface Product {
  id: string
  slug: string
  name: string
  tagline: string
  price: Record<string, number>   // { "30ml": 799, "50ml": 1299, "100ml": 1999 }
  images: string[]                 // [primary, hover, ...]
  category: 'fresh' | 'floral' | 'woody' | 'oriental' | 'citrus'
  gender: 'him' | 'her' | 'unisex'
  badges: ('new' | 'bestseller' | 'limited' | 'sale')[]
  rating: number
  reviewCount: number
  inStock: boolean
}
```

## Component Implementation
```tsx
'use client'
import { useState } from 'react'
import Link from 'next/link'
import Image from 'next/image'
import { Heart } from 'lucide-react'
import { Badge, Button } from '@antigravity/react'
import { useCartStore } from '@/lib/cart'
import { useWishlistStore } from '@/lib/wishlist'

interface ProductCardProps {
  product: Product
  variant?: 'light' | 'dark'   // light = ivory bg, dark = black bg
}

export function ProductCard({ product, variant = 'light' }: ProductCardProps) {
  const [hovered, setHovered] = useState(false)
  const [addedToCart, setAddedToCart] = useState(false)
  const addItem = useCartStore(s => s.addItem)
  const { toggle, isWishlisted } = useWishlistStore()

  const basePrice = Math.min(...Object.values(product.price))
  const primaryImage = product.images[0]
  const hoverImage = product.images[1] ?? product.images[0]
  const wishlisted = isWishlisted(product.id)

  function handleAddToCart(e: React.MouseEvent) {
    e.preventDefault() // prevent Link navigation
    const defaultSize = Object.keys(product.price)[1] ?? Object.keys(product.price)[0]
    addItem({
      productId: product.id,
      slug: product.slug,
      name: product.name,
      size: defaultSize,
      price: product.price[defaultSize],
      image: primaryImage,
      quantity: 1,
    })
    setAddedToCart(true)
    setTimeout(() => setAddedToCart(false), 1500)
  }

  function handleWishlist(e: React.MouseEvent) {
    e.preventDefault()
    toggle(product.id)
  }

  return (
    <Link
      href={`/products/${product.slug}`}
      className={`product-card product-card--${variant}`}
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
    >
      {/* Badges */}
      <div className="product-card__badges">
        {product.badges.map(badge => (
          <Badge key={badge} className={`badge--${badge}`}>
            {BADGE_LABELS[badge]}
          </Badge>
        ))}
      </div>

      {/* Wishlist */}
      <button
        className={`product-card__wishlist ${wishlisted ? 'is-wishlisted' : ''}`}
        onClick={handleWishlist}
        aria-label={wishlisted ? 'Remove from wishlist' : 'Add to wishlist'}
        aria-pressed={wishlisted}
      >
        <Heart size={18} fill={wishlisted ? 'currentColor' : 'none'} />
      </button>

      {/* Image */}
      <div className="product-card__image-wrap">
        <Image
          src={primaryImage}
          alt={product.name}
          fill
          className={`product-card__img product-card__img--primary ${hovered ? 'is-hidden' : ''}`}
          sizes="(max-width: 768px) 50vw, 25vw"
        />
        <Image
          src={hoverImage}
          alt=""
          aria-hidden="true"
          fill
          className={`product-card__img product-card__img--hover ${hovered ? 'is-visible' : ''}`}
          sizes="(max-width: 768px) 50vw, 25vw"
        />
      </div>

      {/* Info */}
      <div className="product-card__info">
        <h3 className="product-card__name">{product.name}</h3>
        <p className="product-card__meta">{product.tagline}</p>
        <p className="product-card__price">
          From ₹{basePrice.toLocaleString('en-IN')}
        </p>
      </div>

      {/* Add to Cart — slides up on hover */}
      <div className={`product-card__add ${hovered ? 'is-visible' : ''}`}>
        <Button
          variant="dark"
          className="product-card__add-btn"
          onClick={handleAddToCart}
          disabled={!product.inStock}
        >
          {!product.inStock ? 'Out of Stock' : addedToCart ? '✓ Added' : 'Add to Cart'}
        </Button>
      </div>
    </Link>
  )
}

const BADGE_LABELS = {
  new: 'New',
  bestseller: 'Bestseller',
  limited: 'Limited',
  sale: 'Sale',
}
```

## CSS
```css
.product-card {
  position: relative;
  display: flex;
  flex-direction: column;
  text-decoration: none;
  color: inherit;
  cursor: pointer;
  border-radius: var(--ag-radius-card);
  overflow: hidden;
  transition: box-shadow 0.3s ease;
}

.product-card:hover {
  box-shadow: var(--ag-shadow-card-hover);
}

/* Variants */
.product-card--light { background: var(--color-white); }
.product-card--dark  { background: #1A1A1A; color: var(--color-ivory); }

/* Image area */
.product-card__image-wrap {
  position: relative;
  aspect-ratio: 1 / 1;
  overflow: hidden;
  background: #f0ece4;
}

.product-card__img {
  object-fit: cover;
  transition: opacity 0.4s ease, transform 0.6s ease;
}

.product-card__img--primary { opacity: 1; }
.product-card__img--primary.is-hidden { opacity: 0; }
.product-card__img--hover { opacity: 0; }
.product-card__img--hover.is-visible { opacity: 1; }

.product-card:hover .product-card__img--primary { transform: scale(1.04); }

/* Badges */
.product-card__badges {
  position: absolute;
  top: 12px; left: 12px;
  display: flex; gap: 6px;
  z-index: 2;
}

.badge--new        { background: var(--color-gold); color: #000; }
.badge--bestseller { background: var(--color-primary-black); color: #fff; }
.badge--limited    { background: var(--color-amber); color: #fff; }
.badge--sale       { background: #e53935; color: #fff; }

/* Wishlist */
.product-card__wishlist {
  position: absolute;
  top: 12px; right: 12px;
  z-index: 2;
  background: rgba(255,255,255,0.85);
  border: none;
  border-radius: 50%;
  width: 34px; height: 34px;
  display: grid; place-items: center;
  cursor: pointer;
  transition: background 0.2s, color 0.2s;
  color: var(--color-taupe);
}

.product-card__wishlist.is-wishlisted { color: #e53935; background: white; }

/* Info */
.product-card__info { padding: 14px 16px 8px; }
.product-card__name {
  font-family: var(--font-display);
  font-size: 16px;
  font-weight: 600;
  margin: 0 0 4px;
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
}
.product-card__meta {
  font-size: 12px;
  color: var(--color-taupe);
  margin: 0 0 6px;
}
.product-card__price {
  font-size: 14px;
  font-weight: 600;
  color: var(--color-primary-black);
}
.product-card--dark .product-card__price { color: var(--color-gold); }

/* Add to Cart slide-up */
.product-card__add {
  padding: 0 16px;
  max-height: 0;
  overflow: hidden;
  transition: max-height 0.35s ease, padding 0.35s ease;
}
.product-card__add.is-visible {
  max-height: 60px;
  padding: 8px 16px 16px;
}
.product-card__add-btn { width: 100%; }
```

## Skeleton Loader (for loading states)
```tsx
import { Skeleton } from '@antigravity/react'

export function ProductCardSkeleton() {
  return (
    <div className="product-card product-card--light">
      <Skeleton className="product-card__image-wrap" />
      <div className="product-card__info">
        <Skeleton style={{ height: 16, width: '70%', marginBottom: 8 }} />
        <Skeleton style={{ height: 12, width: '50%', marginBottom: 6 }} />
        <Skeleton style={{ height: 14, width: '30%' }} />
      </div>
    </div>
  )
}
```

## Usage Examples
```tsx
// In BestsellersStrip (light variant, horizontal scroll)
<ProductCard product={p} variant="light" />

// In LuxeCollection (dark variant, dark section)
<ProductCard product={p} variant="dark" />

// Loading state
{isLoading
  ? Array(8).fill(0).map((_, i) => <ProductCardSkeleton key={i} />)
  : products.map(p => <ProductCard key={p.id} product={p} />)
}
```

## Common Mistakes
- Never put `<a>` or `<button>` inside the `<Link>` wrapper without `e.preventDefault()` on their click handlers — both the wishlist and Add to Cart buttons must stop propagation
- Image swap: always load both images; use opacity transition not `display:none` (prevents layout shift)
- The `product-card__add` slide-up uses `max-height` trick — don't use `height: auto` in the transition as it won't animate
- Always provide `sizes` to `<Image>` for correct responsive image loading
- Dark variant: override `color` explicitly, don't rely on CSS variable inheritance through the card boundary
