---
name: homepage-sections
description: >
  Use this skill when building, editing, or debugging any section on the Habib Alruh
  Perfume homepage. Triggers: HeroCarousel, BestsellersStrip, PromoBanner,
  FootprintCounter, SignatureSeries, LuxeCollection, GiftCTA, ShopByGender,
  MYOPSection, PressBanner, BrandStory, JournalStrip, ReviewsBanner, TrustStrip.
  Also use when working on section scroll animations, marquee effects, or
  count-up animations. Reference this alongside the antigravity-theme-setup
  skill for all token/styling decisions.
---

# Homepage Sections — Habib Alruh

## File Structure
```
/app/(marketing)/page.tsx          ← assembles all sections
/components/sections/
  HeroCarousel.tsx
  BestsellersStrip.tsx
  PromoBanner.tsx
  FootprintBanner.tsx
  SignatureSeries.tsx
  LuxeCollection.tsx
  GiftCTA.tsx
  ShopByGender.tsx
  MYOPSection.tsx
  PressBanner.tsx
  BrandStory.tsx
  JournalStrip.tsx
  ReviewsBanner.tsx
  TrustStrip.tsx
```

## Section Assembly (app/(marketing)/page.tsx)
```tsx
import { HeroCarousel } from '@/components/sections/HeroCarousel'
// ... import all sections

export default function HomePage() {
  return (
    <main>
      <HeroCarousel />
      <BestsellersStrip />
      <PromoBanner />
      <FootprintBanner />
      <SignatureSeries />
      <LuxeCollection />
      <GiftCTA />
      <ShopByGender />
      <MYOPSection />
      <PressBanner />
      <BrandStory />
      <JournalStrip />
      <ReviewsBanner />
      <TrustStrip />
    </main>
  )
}
```

---

## Section 1: HeroCarousel

### Slides Data
```typescript
const SLIDES = [
  {
    id: 1,
    image: '/images/hero/saffron-noir.jpg',
    eyebrow: 'New Arrival',
    headline: 'Introducing Saffron Noir',
    subtitle: 'A journey through ancient spice routes',
    cta: { label: 'Discover Now', href: '/products/saffron-noir-100ml' },
  },
  {
    id: 2,
    image: '/images/hero/desert-oud.jpg',
    eyebrow: 'Signature Series',
    headline: 'Born from Silence',
    subtitle: 'The scent of a golden desert at dusk',
    cta: { label: 'Shop Collection', href: '/products?collection=signature' },
  },
]
```

### Component
```tsx
'use client'
import { Carousel, CarouselItem } from '@antigravity/react'
import Image from 'next/image'

export function HeroCarousel() {
  return (
    <section className="hero-carousel" aria-label="Featured collections">
      <Carousel autoPlay interval={5000} loop>
        {SLIDES.map(slide => (
          <CarouselItem key={slide.id} className="hero-carousel__slide">
            <Image
              src={slide.image}
              alt={slide.headline}
              fill
              priority
              className="hero-carousel__bg"
            />
            <div className="hero-carousel__overlay" />
            <div className="hero-carousel__content">
              <span className="hero-carousel__eyebrow">{slide.eyebrow}</span>
              <h1 className="hero-carousel__headline">{slide.headline}</h1>
              <p className="hero-carousel__subtitle">{slide.subtitle}</p>
              <a href={slide.cta.href} className="btn btn--gold">
                {slide.cta.label}
              </a>
            </div>
          </CarouselItem>
        ))}
      </Carousel>
    </section>
  )
}
```

### CSS
```css
.hero-carousel { position: relative; height: 100vh; overflow: hidden; }
.hero-carousel__slide { position: relative; height: 100vh; }
.hero-carousel__bg { object-fit: cover; }
.hero-carousel__overlay {
  position: absolute; inset: 0;
  background: linear-gradient(135deg, rgba(0,0,0,0.6) 0%, rgba(0,0,0,0.2) 100%);
}
.hero-carousel__content {
  position: absolute; bottom: 15%; left: 8%;
  color: white; max-width: 560px;
}
.hero-carousel__eyebrow {
  font-family: var(--font-accent); font-style: italic;
  color: var(--color-gold); font-size: 16px; letter-spacing: 0.15em;
  display: block; margin-bottom: 12px;
}
.hero-carousel__headline {
  font-family: var(--font-display); font-size: clamp(48px, 7vw, 96px);
  line-height: 1.05; margin-bottom: 16px; font-weight: 700;
}
```

---

## Section 2: BestsellersStrip

```tsx
import { ScrollArea } from '@antigravity/react'
import { ProductCard } from '@/components/ui/ProductCard'

export function BestsellersStrip({ products }) {
  return (
    <section className="section bestsellers">
      <div className="section__header">
        <h2>
          <span className="text-muted">DISCOVER</span>{' '}
          <span className="text-gold">OUR BESTSELLERS</span>
        </h2>
      </div>
      <ScrollArea orientation="horizontal">
        <div className="bestsellers__row">
          {products.map(p => <ProductCard key={p.id} product={p} />)}
        </div>
      </ScrollArea>
    </section>
  )
}
```

---

## Section 3: PromoBanner (Marquee)

```tsx
'use client'
export function PromoBanner() {
  return (
    <section className="promo-banner" aria-label="Current promotion">
      <div className="promo-banner__track" aria-hidden="true">
        {Array(4).fill('BUY 3 PAY FOR 2').map((text, i) => (
          <span key={i} className="promo-banner__text">{text} &nbsp;·&nbsp; </span>
        ))}
      </div>
      <p className="promo-banner__sub">On selected fragrances — limited time</p>
      <a href="/products?promo=b3p2" className="btn btn--outline-gold">
        Shop the Offer
      </a>
    </section>
  )
}
```
```css
.promo-banner { background: var(--color-primary-black); color: white; padding: 60px 0; text-align: center; }
.promo-banner__track {
  display: flex; overflow: hidden; white-space: nowrap;
  animation: marquee 20s linear infinite;
}
.promo-banner__text {
  font-family: var(--font-display); font-size: clamp(36px, 6vw, 72px); font-weight: 700;
}
@keyframes marquee {
  0% { transform: translateX(0); }
  100% { transform: translateX(-50%); }
}
```

---

## Section 4: FootprintBanner (Count-Up Animation)

```tsx
'use client'
import { useEffect, useRef, useState } from 'react'

function useCountUp(target: number, duration = 2000, trigger: boolean) {
  const [count, setCount] = useState(0)
  useEffect(() => {
    if (!trigger) return
    let start = 0
    const step = target / (duration / 16)
    const timer = setInterval(() => {
      start = Math.min(start + step, target)
      setCount(Math.floor(start))
      if (start >= target) clearInterval(timer)
    }, 16)
    return () => clearInterval(timer)
  }, [trigger, target, duration])
  return count
}

export function FootprintBanner() {
  const ref = useRef(null)
  const [visible, setVisible] = useState(false)
  const count = useCountUp(75, 2000, visible)

  useEffect(() => {
    const obs = new IntersectionObserver(([e]) => {
      if (e.isIntersecting) { setVisible(true); obs.disconnect() }
    }, { threshold: 0.4 })
    if (ref.current) obs.observe(ref.current)
    return () => obs.disconnect()
  }, [])

  return (
    <section ref={ref} className="footprint section">
      <div className="footprint__number">{count}+</div>
      <div className="footprint__copy">
        <h2>Stores in Our Global Footprint</h2>
        <p>From Mumbai to Milan, our scents travel the world across {count}+ carefully chosen locations.</p>
        <a href="/stores" className="link-gold">Locate a Store →</a>
      </div>
    </section>
  )
}
```

---

## Section 5: SignatureSeries (Editorial Cards)

```tsx
export function SignatureSeries() {
  return (
    <section className="section signature-series">
      <div className="section__header">
        <h2>
          <span className="text-gold">SIGNATURE</span>{' '}
          <span>SERIES</span>
        </h2>
      </div>
      <div className="signature-series__grid">
        {SERIES.map(s => (
          <a key={s.slug} href={`/products?category=${s.slug}`} className="editorial-card">
            <div className="editorial-card__image" style={{ backgroundImage: `url(${s.image})` }} />
            <div className="editorial-card__content">
              <h3>{s.name}</h3>
              <p>{s.description}</p>
              <span className="editorial-card__cta">Explore →</span>
            </div>
          </a>
        ))}
      </div>
    </section>
  )
}

const SERIES = [
  { name: 'Fresh', slug: 'fresh', image: '/images/series/fresh.jpg', description: 'Crisp citrus · Aquatic · Herbal' },
  { name: 'Floral', slug: 'floral', image: '/images/series/floral.jpg', description: 'Rose · Jasmine · Gardenia' },
  { name: 'Woody', slug: 'woody', image: '/images/series/woody.jpg', description: 'Sandalwood · Oud · Amber' },
]
```
```css
.signature-series__grid { display: grid; grid-template-columns: repeat(3, 1fr); gap: 24px; }
.editorial-card { position: relative; overflow: hidden; border-radius: var(--ag-radius-card); aspect-ratio: 3/4; }
.editorial-card__image { position: absolute; inset: 0; background-size: cover; background-position: center; transition: transform 0.6s ease; }
.editorial-card:hover .editorial-card__image { transform: scale(1.05); }
.editorial-card__cta { opacity: 0; transition: opacity 0.3s; }
.editorial-card:hover .editorial-card__cta { opacity: 1; }
```

---

## Section Spacing Standard
All sections follow this pattern:
```css
.section {
  padding: var(--ag-spacing-section) 40px;
}
.section__header {
  text-align: center;
  margin-bottom: 48px;
}
@media (max-width: 768px) {
  .section { padding: var(--ag-spacing-section-sm) 20px; }
}
```

## Animation Guidelines
- Use `IntersectionObserver` for scroll-triggered animations, not scroll event listeners
- Apply `will-change: transform` only on actively animating elements, remove after animation
- Always respect `prefers-reduced-motion`:
```css
@media (prefers-reduced-motion: reduce) {
  *, *::before, *::after { animation-duration: 0.01ms !important; transition-duration: 0.01ms !important; }
}
```

## Common Mistakes
- Don't nest `<a>` inside `<a>` — product cards that are links should not have inner CTA `<a>` tags, use `<span>` styled as button
- Marquee animation: duplicate content at least 2× to avoid visible gap at loop point
- Count-up: always disconnect IntersectionObserver after triggering to avoid re-running on re-entry
- Dark sections: always set `color: white` explicitly — CSS variable inheritance can be interrupted
