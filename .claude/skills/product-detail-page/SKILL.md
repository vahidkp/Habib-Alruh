---
name: product-detail-page
description: >
  Use this skill when building or modifying the Product Detail Page (PDP) for
  Habib Alruh at /products/[slug]. Triggers: building the 2-column product
  hero (image gallery + purchase info), size selector with price update,
  quantity stepper, Add to Cart integration, scent story section, fragrance
  notes pyramid, how-to-wear strip, complementary products carousel, reviews
  section with rating breakdown, or the write-a-review modal. Also use when
  debugging gallery lightbox, sticky purchase sidebar on scroll, or reviews
  sort/pagination. Reference product-card skill and cart-drawer skill for
  those sub-components.
---

# Product Detail Page (PDP) — Habib Alruh

## Route
`/products/[slug]` — Next.js App Router dynamic page

## File Structure
```
/app/products/[slug]/
  page.tsx                ← Server Component (fetches product by slug)
  loading.tsx             ← Skeleton layout
  /components/
    ProductGallery.tsx    ← Image gallery + lightbox
    ProductInfo.tsx       ← Name, price, size, qty, CTA (Client)
    ScentStory.tsx        ← Editorial copy section
    NotesPyramid.tsx      ← Top/Middle/Base notes visual
    HowToWear.tsx         ← 3-step strip
    ComplementaryProducts.tsx
    ReviewsSection.tsx    ← Aggregate + list + write form
    ReviewForm.tsx        ← Modal form
```

---

## page.tsx (Server Component)
```tsx
import { getProductBySlug } from '@/lib/products'
import { notFound } from 'next/navigation'
import { ProductGallery } from './components/ProductGallery'
import { ProductInfo } from './components/ProductInfo'
import { ScentStory } from './components/ScentStory'
import { NotesPyramid } from './components/NotesPyramid'
import { HowToWear } from './components/HowToWear'
import { ComplementaryProducts } from './components/ComplementaryProducts'
import { ReviewsSection } from './components/ReviewsSection'

export async function generateMetadata({ params }) {
  const product = await getProductBySlug(params.slug)
  if (!product) return {}
  return {
    title: `${product.name} — Habib Alruh`,
    description: product.description.slice(0, 160),
    openGraph: { images: [product.images[0]] },
  }
}

export default async function ProductPage({ params }) {
  const product = await getProductBySlug(params.slug)
  if (!product) notFound()

  return (
    <main>
      {/* Hero: 2-col */}
      <section className="pdp-hero section">
        <ProductGallery images={product.images} name={product.name} />
        <ProductInfo product={product} />
      </section>

      <ScentStory name={product.name} story={product.story} image={product.images[0]} />
      <NotesPyramid notes={product.notes} />
      <HowToWear />
      <ComplementaryProducts currentSlug={product.slug} category={product.category} />
      <ReviewsSection productId={product.id} rating={product.rating} reviewCount={product.reviewCount} />
    </main>
  )
}
```

---

## ProductGallery (Client Component)
```tsx
'use client'
import { useState } from 'react'
import Image from 'next/image'
import { Dialog, DialogContent } from '@antigravity/react'
import { ChevronLeft, ChevronRight, ZoomIn } from 'lucide-react'

export function ProductGallery({ images, name }) {
  const [activeIndex, setActiveIndex] = useState(0)
  const [lightboxOpen, setLightboxOpen] = useState(false)

  return (
    <div className="pdp-gallery">
      {/* Thumbnail strip */}
      <div className="pdp-gallery__thumbs">
        {images.map((img, i) => (
          <button
            key={i}
            className={`pdp-gallery__thumb ${i === activeIndex ? 'is-active' : ''}`}
            onClick={() => setActiveIndex(i)}
            aria-label={`View image ${i + 1}`}
          >
            <Image src={img} alt="" fill className="object-cover" />
          </button>
        ))}
      </div>

      {/* Main image */}
      <div className="pdp-gallery__main">
        <Image
          src={images[activeIndex]}
          alt={`${name} — image ${activeIndex + 1}`}
          fill
          priority={activeIndex === 0}
          className="object-cover"
          sizes="(max-width: 768px) 100vw, 50vw"
        />
        <button
          className="pdp-gallery__zoom"
          onClick={() => setLightboxOpen(true)}
          aria-label="Zoom image"
        >
          <ZoomIn size={20} />
        </button>

        {/* Prev / Next */}
        {images.length > 1 && (
          <>
            <button
              className="pdp-gallery__nav pdp-gallery__nav--prev"
              onClick={() => setActiveIndex(i => (i - 1 + images.length) % images.length)}
              aria-label="Previous image"
            >
              <ChevronLeft size={20} />
            </button>
            <button
              className="pdp-gallery__nav pdp-gallery__nav--next"
              onClick={() => setActiveIndex(i => (i + 1) % images.length)}
              aria-label="Next image"
            >
              <ChevronRight size={20} />
            </button>
          </>
        )}
      </div>

      {/* Lightbox */}
      <Dialog open={lightboxOpen} onOpenChange={setLightboxOpen}>
        <DialogContent className="pdp-lightbox">
          <Image
            src={images[activeIndex]}
            alt={name}
            fill
            className="object-contain"
          />
        </DialogContent>
      </Dialog>
    </div>
  )
}
```
```css
.pdp-gallery {
  display: grid;
  grid-template-columns: 80px 1fr;
  gap: 16px;
  position: sticky;
  top: 88px; /* navbar + offset */
  align-self: start;
}
.pdp-gallery__thumbs {
  display: flex; flex-direction: column; gap: 10px;
}
.pdp-gallery__thumb {
  position: relative; width: 80px; height: 80px;
  border: 2px solid transparent; border-radius: var(--ag-radius-card);
  overflow: hidden; cursor: pointer;
  transition: border-color 0.2s;
}
.pdp-gallery__thumb.is-active { border-color: var(--color-gold); }
.pdp-gallery__main {
  position: relative; aspect-ratio: 1/1;
  border-radius: var(--ag-radius-card); overflow: hidden;
  background: #f0ece4;
}
.pdp-gallery__zoom {
  position: absolute; bottom: 12px; right: 12px;
  background: rgba(255,255,255,0.85); border: none;
  border-radius: 50%; width: 36px; height: 36px;
  display: grid; place-items: center; cursor: pointer;
}
.pdp-gallery__nav {
  position: absolute; top: 50%; transform: translateY(-50%);
  background: rgba(255,255,255,0.85); border: none;
  border-radius: 50%; width: 36px; height: 36px;
  display: grid; place-items: center; cursor: pointer;
}
.pdp-gallery__nav--prev { left: 12px; }
.pdp-gallery__nav--next { right: 12px; }
```

---

## ProductInfo (Client Component)
```tsx
'use client'
import { useState } from 'react'
import { Button, Badge } from '@antigravity/react'
import { Heart, Share2, Star } from 'lucide-react'
import { useCartStore } from '@/lib/cart'
import { useWishlistStore } from '@/lib/wishlist'

export function ProductInfo({ product }) {
  const sizes = Object.keys(product.price)
  const [selectedSize, setSelectedSize] = useState(sizes[1] ?? sizes[0])
  const [qty, setQty] = useState(1)
  const [added, setAdded] = useState(false)
  const addItem = useCartStore(s => s.addItem)
  const { toggle, isWishlisted } = useWishlistStore()

  const price = product.price[selectedSize]

  function handleAddToCart() {
    addItem({
      productId: product.id, slug: product.slug, name: product.name,
      size: selectedSize, price, image: product.images[0], quantity: qty,
    })
    setAdded(true)
    setTimeout(() => setAdded(false), 2000)
  }

  return (
    <div className="pdp-info">
      {/* Breadcrumb */}
      <nav className="pdp-info__breadcrumb" aria-label="Breadcrumb">
        <a href="/products">All Fragrances</a>
        <span aria-hidden="true"> / </span>
        <span>{product.category}</span>
      </nav>

      {/* Badges */}
      <div className="pdp-info__badges">
        {product.badges.map(b => (
          <Badge key={b} className={`badge--${b}`}>{b}</Badge>
        ))}
      </div>

      {/* Name + tagline */}
      <h1 className="pdp-info__name">{product.name}</h1>
      <p className="pdp-info__tagline">{product.tagline}</p>

      {/* Rating */}
      <div className="pdp-info__rating">
        <div className="stars" aria-label={`${product.rating} out of 5 stars`}>
          {Array(5).fill(0).map((_, i) => (
            <Star
              key={i}
              size={16}
              fill={i < Math.round(product.rating) ? 'var(--color-gold)' : 'none'}
              color="var(--color-gold)"
            />
          ))}
        </div>
        <a href="#reviews" className="pdp-info__review-count">
          {product.reviewCount} reviews
        </a>
      </div>

      {/* Price */}
      <p className="pdp-info__price">₹{price.toLocaleString('en-IN')}</p>

      {/* Size selector */}
      <div className="pdp-info__sizes" role="group" aria-label="Select size">
        <p className="pdp-info__label">Size: <strong>{selectedSize}</strong></p>
        <div className="pdp-info__size-buttons">
          {sizes.map(size => (
            <button
              key={size}
              className={`size-btn ${selectedSize === size ? 'is-active' : ''}`}
              onClick={() => setSelectedSize(size)}
              aria-pressed={selectedSize === size}
            >
              {size}
              <span className="size-btn__price">₹{product.price[size].toLocaleString('en-IN')}</span>
            </button>
          ))}
        </div>
      </div>

      {/* Quantity */}
      <div className="pdp-info__qty" role="group" aria-label="Quantity">
        <p className="pdp-info__label">Quantity</p>
        <div className="qty-stepper">
          <button
            onClick={() => setQty(q => Math.max(1, q - 1))}
            aria-label="Decrease quantity"
            disabled={qty <= 1}
          >−</button>
          <span aria-live="polite">{qty}</span>
          <button
            onClick={() => setQty(q => q + 1)}
            aria-label="Increase quantity"
          >+</button>
        </div>
      </div>

      {/* CTAs */}
      <div className="pdp-info__ctas">
        <Button
          variant="gold"
          className="pdp-info__add-btn"
          onClick={handleAddToCart}
          disabled={!product.inStock}
        >
          {!product.inStock ? 'Out of Stock' : added ? '✓ Added to Cart' : 'Add to Cart'}
        </Button>
        <Button
          variant="outline"
          className="pdp-info__wishlist-btn"
          onClick={() => toggle(product.id)}
          aria-label={isWishlisted(product.id) ? 'Remove from wishlist' : 'Save to wishlist'}
        >
          <Heart size={18} fill={isWishlisted(product.id) ? 'currentColor' : 'none'} />
          {isWishlisted(product.id) ? 'Saved' : 'Save'}
        </Button>
      </div>

      {/* Trust signals */}
      <ul className="pdp-info__trust">
        <li>✓ Free delivery on orders over ₹999</li>
        <li>✓ Easy 15-day returns</li>
        <li>✓ 100% authentic fragrances</li>
      </ul>

      {/* Share */}
      <button className="pdp-info__share" aria-label="Share this product">
        <Share2 size={16} /> Share
      </button>
    </div>
  )
}
```
```css
.pdp-hero {
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 60px;
  align-items: start;
}
.pdp-info__name {
  font-family: var(--font-display); font-size: clamp(28px, 3vw, 42px);
  font-weight: 700; margin: 8px 0 4px;
}
.pdp-info__tagline {
  font-family: var(--font-accent); font-style: italic;
  font-size: 18px; color: var(--color-taupe); margin-bottom: 16px;
}
.pdp-info__price {
  font-size: 32px; font-weight: 700; margin: 16px 0;
}
.size-btn {
  display: flex; flex-direction: column; align-items: center;
  padding: 10px 20px; border: 1px solid rgba(0,0,0,0.2);
  border-radius: var(--ag-radius-button); cursor: pointer;
  background: transparent; transition: all 0.2s;
}
.size-btn.is-active {
  border-color: var(--color-gold);
  background: rgba(201,168,76,0.08);
}
.qty-stepper {
  display: flex; align-items: center; gap: 0;
  border: 1px solid rgba(0,0,0,0.2); border-radius: var(--ag-radius-button);
  width: fit-content;
}
.qty-stepper button {
  width: 40px; height: 40px; border: none; background: none; cursor: pointer; font-size: 18px;
}
.qty-stepper span { width: 48px; text-align: center; font-weight: 600; }
.pdp-info__ctas { display: flex; gap: 12px; margin: 24px 0; }
.pdp-info__add-btn { flex: 1; height: 52px; font-size: 16px; }
.pdp-info__wishlist-btn { width: 52px; height: 52px; padding: 0; display: grid; place-items: center; }
.pdp-info__trust { list-style: none; padding: 0; display: flex; flex-direction: column; gap: 6px; font-size: 13px; color: var(--color-taupe); }

@media (max-width: 768px) {
  .pdp-hero { grid-template-columns: 1fr; gap: 32px; }
  .pdp-gallery { grid-template-columns: 1fr; position: static; }
  .pdp-gallery__thumbs { flex-direction: row; }
  .pdp-gallery__thumb { width: 64px; height: 64px; }
}
```

---

## NotesPyramid
```tsx
'use client'
import { useEffect, useRef, useState } from 'react'

export function NotesPyramid({ notes }) {
  const ref = useRef(null)
  const [visible, setVisible] = useState(false)

  useEffect(() => {
    const obs = new IntersectionObserver(([e]) => {
      if (e.isIntersecting) { setVisible(true); obs.disconnect() }
    }, { threshold: 0.3 })
    if (ref.current) obs.observe(ref.current)
    return () => obs.disconnect()
  }, [])

  return (
    <section ref={ref} className="notes-pyramid section">
      <h2 className="section__title">Fragrance Notes</h2>
      <div className="notes-pyramid__diagram">
        {[
          { tier: 'Top Notes', notes: notes.top, delay: 0 },
          { tier: 'Heart Notes', notes: notes.middle, delay: 150 },
          { tier: 'Base Notes', notes: notes.base, delay: 300 },
        ].map(({ tier, notes: tierNotes, delay }) => (
          <div
            key={tier}
            className={`notes-tier ${visible ? 'is-visible' : ''}`}
            style={{ transitionDelay: `${delay}ms` }}
          >
            <span className="notes-tier__label">{tier}</span>
            <div className="notes-tier__items">
              {tierNotes.map(note => (
                <span key={note} className="notes-tier__note">{note}</span>
              ))}
            </div>
          </div>
        ))}
      </div>
    </section>
  )
}
```
```css
.notes-pyramid { background: var(--color-ivory); }
.notes-pyramid__diagram { max-width: 560px; margin: 0 auto; }
.notes-tier {
  display: flex; align-items: center; gap: 24px;
  padding: 20px 0; border-bottom: 1px solid rgba(0,0,0,0.08);
  opacity: 0; transform: translateY(20px);
  transition: opacity 0.5s ease, transform 0.5s ease;
}
.notes-tier.is-visible { opacity: 1; transform: translateY(0); }
.notes-tier__label {
  font-family: var(--font-display); font-size: 14px; font-weight: 600;
  min-width: 120px; color: var(--color-taupe);
}
.notes-tier__items { display: flex; flex-wrap: wrap; gap: 8px; }
.notes-tier__note {
  background: var(--color-white); border: 1px solid rgba(0,0,0,0.1);
  padding: 4px 14px; border-radius: 20px; font-size: 13px;
}
```

---

## ReviewsSection
```tsx
'use client'
import { useState } from 'react'
import { Star } from 'lucide-react'
import { Button } from '@antigravity/react'
import { ReviewForm } from './ReviewForm'

export function ReviewsSection({ productId, rating, reviewCount }) {
  const [showForm, setShowForm] = useState(false)
  const [sort, setSort] = useState<'recent' | 'helpful'>('recent')

  return (
    <section id="reviews" className="reviews-section section">
      <div className="reviews-section__header">
        <h2 className="section__title">Customer Reviews</h2>
        <Button variant="outline-gold" onClick={() => setShowForm(true)}>
          Write a Review
        </Button>
      </div>

      {/* Aggregate */}
      <div className="reviews-aggregate">
        <div className="reviews-aggregate__score">
          <span className="reviews-aggregate__number">{rating.toFixed(1)}</span>
          <StarRow rating={rating} size={24} />
          <span className="reviews-aggregate__count">{reviewCount} reviews</span>
        </div>
        <RatingBreakdown />
      </div>

      {/* Sort */}
      <div className="reviews-sort">
        <button
          className={sort === 'recent' ? 'is-active' : ''}
          onClick={() => setSort('recent')}
        >Most Recent</button>
        <button
          className={sort === 'helpful' ? 'is-active' : ''}
          onClick={() => setSort('helpful')}
        >Most Helpful</button>
      </div>

      {/* Review list */}
      <ReviewList productId={productId} sort={sort} />

      {/* Write Review Modal */}
      {showForm && (
        <ReviewForm productId={productId} onClose={() => setShowForm(false)} />
      )}
    </section>
  )
}
```

---

## Common Mistakes
- `ProductGallery` must be `'use client'` — it uses `useState` for active image index
- `ProductInfo` must be `'use client'` — size selection and cart interaction
- Gallery `position: sticky` needs `align-self: start` on the grid item to work correctly
- Size selector buttons must use `aria-pressed` for accessibility, not just visual styling
- The price must update reactively when size changes — always derive from `product.price[selectedSize]`
- `NotesPyramid` animation uses `transitionDelay` inline style — this must be in a `style` prop, NOT a CSS class (CSS classes can't express variable delays per item)
- `ReviewsSection` scroll target: use `id="reviews"` on the section so `href="#reviews"` from the rating link in ProductInfo works
- Never use `<form>` element in ReviewForm — use button onClick handlers
