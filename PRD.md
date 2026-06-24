# Product Requirements Document
## Habib Alruh — E-Commerce Website
**Tech Stack:** Next.js 14 (App Router) + Antigravity  
**Scope:** 3 core pages — Homepage, Product Listing (PLP), Product Detail (PDP)  
**Design Reference:** myop.in — full-bleed editorial layout, high-contrast type, warm accent palette

---

## 1. Project Overview

Habib Alruh is a premium fragrance brand seeking a web presence that communicates luxury, artisanal craft, and olfactory storytelling. The website must mirror the editorial depth and visual drama of the reference site while establishing Habib Alruh's own visual identity: deep blacks, warm gold/amber accents, and clean serif display type paired with a restrained sans-serif body.

### Brand Identity

| Token | Value |
|---|---|
| Primary Black | `#0A0A0A` |
| Warm Ivory | `#F5F0E8` |
| Gold Accent | `#C9A84C` |
| Amber Highlight | `#E8853A` |
| Muted Taupe | `#8C7B6B` |
| Pure White | `#FFFFFF` |

**Display Font:** `Playfair Display` — for hero headlines, section titles, product names  
**Body Font:** `Inter` — for descriptions, UI labels, navigation  
**Accent/Tag Font:** `Cormorant Garamond Italic` — for eyebrows, taglines, signature labels

---

## 2. Tech Stack & Architecture

### Framework
- **Next.js 14** with App Router (`/app` directory)
- **React Server Components** for static/semi-static content
- **Client Components** (`"use client"`) for interactive UI (carousels, cart drawer, filters)

### Antigravity (Design System)
- All UI primitives sourced from **Antigravity component library**
- Theming via Antigravity's token system (colors, spacing, typography mapped to Habib Alruh brand tokens)
- Motion/animation via Antigravity's built-in motion utilities

### Additional Libraries
| Purpose | Package |
|---|---|
| State management | `zustand` |
| Animation | Antigravity Motion + `framer-motion` (where Antigravity delegates) |
| Image optimization | Next.js `<Image>` |
| Form handling | `react-hook-form` + `zod` |
| Icons | `lucide-react` |
| Cart/session | `zustand` + `localStorage` |

### File Structure
```
/app
  /(marketing)
    /page.tsx              → Homepage
  /products
    /page.tsx              → PLP
    /[slug]
      /page.tsx            → PDP
  /layout.tsx              → Root layout (Navbar + Footer)

/components
  /ui                      → Antigravity overrides & custom primitives
  /sections                → Page-level section components
  /shared                  → Navbar, Footer, CartDrawer

/lib
  /products.ts             → Mock product data / API layer
  /cart.ts                 → Zustand cart store
  /utils.ts

/styles
  /globals.css             → CSS variables, font-face
  /tokens.css              → Habib Alruh brand tokens mapped to Antigravity

/public
  /images                  → Product & editorial imagery
```

---

## 3. Page 1 — Homepage

### 3.1 Purpose
Introduce Habib Alruh, drive product discovery, communicate brand story, and convert visitors to the PLP or PDP.

### 3.2 Sections (in order)

---

#### Section 1: Global Navigation Bar
**Component:** `<Navbar />`

| Element | Detail |
|---|---|
| Logo | `HABIB ALRUH` wordmark — Playfair Display, top-left |
| Nav links | Collections · Bestsellers · Signature · Gift Sets · Our Story · Stores |
| Right actions | Search icon · Wishlist icon · Cart icon (with item count badge) |
| Behaviour | Sticky on scroll; background transitions from `transparent` → `#0A0A0A` after 80px scroll |
| Mobile | Hamburger menu → full-screen drawer with same links |

---

#### Section 2: Hero Carousel (Full-Bleed)
**Component:** `<HeroCarousel />`

| Element | Detail |
|---|---|
| Layout | Full viewport height (`100vh`) full-bleed images |
| Content | 3–4 slides; each has: background image, eyebrow text (e.g. "New Arrival"), headline in Playfair Display 72–96px, subtitle in Inter, CTA button |
| Example Slide 1 | Image: moody dark red/gold studio shot · Headline: "Introducing Saffron Noir" · CTA: "Discover Now" |
| Example Slide 2 | Image: golden desert dunes · Headline: "Born from Silence" · CTA: "Shop Collection" |
| Controls | Left/right arrows (custom styled) + dot indicators at bottom center |
| Animation | Ken Burns subtle zoom on active slide; slide transition: cross-fade 0.6s |
| Antigravity | `<Carousel>` primitive with custom slide renderer |

---

#### Section 3: Bestsellers Strip
**Component:** `<BestsellersStrip />`

| Element | Detail |
|---|---|
| Eyebrow | `DISCOVER` in Gold + `OUR BESTSELLERS` in Black — mixed colour headline style |
| Layout | Horizontal scrollable row of product cards (5–6 cards visible on desktop) |
| Product Card | Square product image · "New Arrival" badge (conditional) · Product name · Volume + Price · "Add to Cart" on hover |
| Card hover | Subtle scale(1.03) + shadow lift, "Add to Cart" slides up from bottom |
| Antigravity | `<ScrollArea horizontal>` + `<ProductCard>` |

---

#### Section 4: Promo Banner (Full-Width Text)
**Component:** `<PromoBanner />`

| Element | Detail |
|---|---|
| Layout | Dark (`#0A0A0A`) full-width band, centered text |
| Headline | Large marquee-style text: `BUY 3 PAY FOR 2` — Playfair Display, white, 60–72px |
| Subtext | "On selected fragrances — limited time" in Inter, muted |
| CTA | Outlined button: "Shop the Offer" |
| Animation | Headline text slowly scrolls horizontally (marquee) on loop |

---

#### Section 5: Global Footprint Counter
**Component:** `<FootprintBanner />`

| Element | Detail |
|---|---|
| Layout | Two-column: left = large animated counter number (`75+`), right = paragraph copy |
| Counter | Animated count-up when scrolls into view |
| Copy | "Stores in our global footprint — from Mumbai to Milan, our scents travel the world." |
| CTA | Gold underline link: "Locate a Store" |

---

#### Section 6: Signature Series
**Component:** `<SignatureSeries />`

| Element | Detail |
|---|---|
| Eyebrow | `SIGNATURE` (gold) + `SERIES` (black) |
| Layout | 3-column grid of editorial cards with light pastel background per card |
| Categories | Fresh · Floral · Woody |
| Card | Full-height image background · category name in Playfair Display · description in Inter |
| Hover | Overlay darkens slightly, "Explore" CTA appears |
| Antigravity | `<Grid cols={3}>` + `<EditorialCard>` |

---

#### Section 7: Cosmopolitan Luxe Collection (Dark Section)
**Component:** `<LuxeCollection />`

| Element | Detail |
|---|---|
| Background | `#0A0A0A` full-width dark section |
| Eyebrow | "COSMOPOLITAN LUXE" in Gold, spaced caps |
| Description | Short italic brand copy in Cormorant Garamond |
| Product Row | Horizontally scrollable dark product cards (dark card variant) |
| Bottom | Large stylised `HABIB ALRUH` wordmark watermark centred |
| CTA | Outlined gold button: "Shop the Collection" |

---

#### Section 8: Gift CTA (Full Bleed Image)
**Component:** `<GiftCTA />`

| Element | Detail |
|---|---|
| Layout | Full-bleed background image (wrapped perfume, dark moody) |
| Overlay | Dark gradient left-to-right |
| Headline | "A Gift That Lasts a Lifetime" — Playfair Display, white, large |
| CTA | "Build a Gift Set" button |

---

#### Section 9: Shop by Gender
**Component:** `<ShopByGender />`

| Element | Detail |
|---|---|
| Layout | Two equal full-width columns: Him · Her |
| Each column | Full-bleed B&W portrait photo + label in Playfair Display + "Shop Now" CTA |
| Hover | Subtle warm tint overlay on the photo |

---

#### Section 10: Make Your Own Perfume (Bento-style)
**Component:** `<MYOPSection />`

| Element | Detail |
|---|---|
| Layout | Full-width section with store/lab imagery |
| Eyebrow | `AWAKEN` (gold) + `YOUR OLFACTORY SENSES` |
| Sub-layout | Left: editorial store image · Right: isolated product image with `STORE` badge |
| CTA | "Visit Our Studio" |

---

#### Section 11: Press / As Seen In
**Component:** `<PressBanner />`

| Element | Detail |
|---|---|
| Layout | Full-width white band with label "AS SEEN IN —" |
| Content | Horizontally scrolling logos: Fashion TV, LBB, Elle, Telangana Today, etc. |
| Style | Greyscale logos that warm on hover |

---

#### Section 12: Why We Do What We Do
**Component:** `<BrandStory />`

| Element | Detail |
|---|---|
| Layout | Two-column: left = brand image · right = headline + copy + CTA |
| Headline | "WHY WE DO,\nWHAT WE DO" — Playfair Display, large, black |
| Body | 2–3 paragraph brand mission copy |
| CTA | Underline link: "About Us" |

---

#### Section 13: Journal / Blog Strip
**Component:** `<JournalStrip />`

| Element | Detail |
|---|---|
| Eyebrow | `FROM THE` (muted) + `JOURNAL` (gold) |
| Layout | 2 featured article cards side-by-side |
| Card | Article image + category tag + headline + "Read More" link |

---

#### Section 14: Customer Reviews
**Component:** `<ReviewsBanner />`

| Element | Detail |
|---|---|
| Layout | Centered, light background |
| Rating | Stars + aggregate score (e.g. 4.8 / 5.0 from 2,400+ reviews) |
| Testimonials | 3-card carousel of individual reviews with name + verified badge |
| Antigravity | `<RatingStars>` + `<Carousel>` |

---

#### Section 15: Trust Strip
**Component:** `<TrustStrip />`

| Element | Detail |
|---|---|
| Layout | 3-column icon row |
| Items | Free Shipping · Easy Returns · Secure Payment |
| Style | Icon + bold label + subtext |

---

#### Section 16: Footer
**Component:** `<Footer />`

| Element | Detail |
|---|---|
| Top | Newsletter signup with email input + submit button |
| Columns | Shop · Company · Help · Follow Us (social icons) |
| Bottom | Copyright · Privacy Policy · Terms |
| Background | `#0A0A0A` dark |

---

## 4. Page 2 — Product Listing Page (PLP)

### 4.1 Purpose
Enable efficient product browsing, filtering, and discovery across the full Habib Alruh catalogue.

### 4.2 URL
`/products?collection=all&gender=&category=&sort=bestsellers`

### 4.3 Layout

```
[NAVBAR]
[HERO BANNER — collection name + editorial image]
[BREADCRUMB]
[FILTER BAR — sticky]
[PRODUCT GRID]
[PAGINATION / LOAD MORE]
[FOOTER]
```

### 4.4 Sections

#### Collection Hero Banner
- Full-width short hero (40vh) with editorial image background
- Collection name in Playfair Display (e.g. "All Fragrances")
- Product count badge: "78 Fragrances"

#### Filter & Sort Bar (Sticky)
| Filter | Options |
|---|---|
| Category | Fresh · Floral · Woody · Oriental · Citrus |
| Gender | Him · Her · Unisex |
| Price | Under ₹1,000 · ₹1,000–₹3,000 · ₹3,000+ |
| Size | 30ml · 50ml · 100ml |
| Sort | Bestsellers · New Arrivals · Price: Low–High · Price: High–Low |

- Filter pills display active filters with `×` dismiss
- On mobile: "Filters" button opens bottom drawer with all filters

#### Product Grid
- **Desktop:** 4-column grid
- **Tablet:** 3-column grid
- **Mobile:** 2-column grid

**Product Card Elements:**
| Element | Detail |
|---|---|
| Image | Square, lazy-loaded, hover swaps to alternate product shot |
| Badges | "New" · "Bestseller" · "Limited" · "Sale" |
| Wishlist | Heart icon top-right (toggles with animation) |
| Name | Playfair Display, 16px |
| Volume | Inter, muted, 13px |
| Price | Bold Inter; crossed-out original if on sale |
| Quick Add | "Add to Cart" button slides up on card hover |

#### Load More / Pagination
- "Load More" button (not infinite scroll — better for SEO)
- Shows "Showing 24 of 78 products"

---

## 5. Page 3 — Product Detail Page (PDP)

### 5.1 Purpose
Communicate everything needed to make a confident purchase: scent story, notes, size, and trust signals.

### 5.2 URL
`/products/[slug]` — e.g. `/products/saffron-noir-100ml`

### 5.3 Layout

```
[NAVBAR]
[BREADCRUMB]
[PRODUCT HERO — 2-col: gallery left | info right]
[SCENT STORY SECTION]
[NOTES PYRAMID]
[HOW TO WEAR]
[COMPLEMENTARY PRODUCTS]
[REVIEWS]
[FOOTER]
```

### 5.4 Sections

#### Product Hero (2-Column)

**Left — Image Gallery**
| Element | Detail |
|---|---|
| Main image | Large, square, zoomable on click |
| Thumbnail strip | Vertical strip of 4–5 images on the left of main |
| Zoom | Click-to-expand modal / lightbox |
| Antigravity | `<ImageGallery>` + `<Lightbox>` |

**Right — Product Info**
| Element | Detail |
|---|---|
| Breadcrumb | Women > Floral |
| Badge | "Bestseller" pill |
| Product name | Playfair Display, 36px |
| Tagline | Cormorant Garamond Italic, muted |
| Rating | Stars + review count link |
| Price | Large, bold; size-dependent |
| Size selector | Button group: 30ml · 50ml · 100ml (price updates on selection) |
| Quantity selector | `−` `1` `+` |
| Add to Cart | Full-width gold CTA button |
| Wishlist | Secondary ghost button |
| Trust micro-copy | "Free delivery on orders over ₹999" · "Easy 15-day returns" |
| Share | Social share icons |

#### Scent Story
- Full-width dark section
- Headline: "The Story Behind [Product Name]"
- 2–3 paragraph editorial copy
- Background: subtle dark editorial image with overlay

#### Notes Pyramid (Fragrance Notes)
| Element | Detail |
|---|---|
| Layout | Centred pyramid diagram: Top · Middle · Base |
| Top Notes | Listed with small ingredient icons |
| Middle Notes | — |
| Base Notes | — |
| Animation | Notes appear staggered on scroll into view |

#### How to Wear
- 3-step horizontal strip with icons: Apply to pulse points · Layer for longevity · Store in cool, dark place

#### Complementary Products
- "Pair It With" section
- Horizontally scrollable row of 4 product cards

#### Reviews Section
| Element | Detail |
|---|---|
| Aggregate | Star rating summary with bar chart breakdown (5★ → 1★) |
| Individual reviews | Verified badge · star rating · date · review text |
| Sort reviews | Most Recent · Most Helpful |
| Write a review | CTA that opens modal form |
| Antigravity | `<ReviewList>` + `<ReviewForm>` in `<Modal>` |

---

## 6. Shared Components

### Cart Drawer
- Right-side slide-in drawer (Antigravity `<Sheet>`)
- Line items with image, name, size, qty controls, subtotal
- Order summary: Subtotal · Delivery · Total
- "Proceed to Checkout" CTA (links to external checkout)
- Free shipping progress bar ("Add ₹250 more for free shipping!")

### Search Modal
- Full-screen overlay (Antigravity `<Dialog>`)
- Instant search results as user types
- Results grouped: Products · Collections · Journal

---

## 7. Responsive Breakpoints

| Breakpoint | Width |
|---|---|
| Mobile | < 768px |
| Tablet | 768px – 1024px |
| Desktop | 1025px – 1440px |
| Wide | > 1440px |

---

## 8. Performance Requirements

| Metric | Target |
|---|---|
| LCP | < 2.5s |
| CLS | < 0.1 |
| FID | < 100ms |
| First Load JS | < 200kb (gzip) |

- All images: WebP format, Next.js `<Image>` with `priority` on above-fold
- Fonts: `next/font` with `display: swap`
- Hero images: preloaded
- Product grid: virtualized on mobile

---

## 9. SEO Requirements

| Page | Meta Title | Meta Description |
|---|---|---|
| Homepage | Habib Alruh — Luxury Fragrances for Him & Her | Discover handcrafted luxury perfumes by Habib Alruh. Shop our signature, fresh, floral, and woody collections. |
| PLP | [Collection] Fragrances — Habib Alruh | Browse [N] premium fragrances in our [Collection] range. Free shipping on orders over ₹999. |
| PDP | [Product Name] [Volume] — Habib Alruh | [First 150 chars of product description] |

- Structured data: `Product`, `BreadcrumbList`, `Organization`
- Canonical URLs on all pages
- `sitemap.xml` + `robots.txt` generated via Next.js

---

## 10. Accessibility

- WCAG 2.1 AA compliance
- All interactive elements keyboard accessible
- ARIA labels on icons and carousels
- Focus rings visible
- Skip-to-content link
- `prefers-reduced-motion` respected — all animations disabled

---

## 11. Antigravity Component Mapping

| UI Need | Antigravity Component |
|---|---|
| Product carousel | `<Carousel>` |
| Filter sidebar/drawer | `<Sheet>` |
| Cart drawer | `<Sheet>` |
| Search overlay | `<Dialog>` |
| Product image lightbox | `<Lightbox>` |
| Toasts (add to cart) | `<Toast>` / `<Toaster>` |
| Rating stars | `<RatingStars>` |
| Quantity stepper | `<NumberInput>` |
| Button variants | `<Button variant="gold" \| "outline" \| "ghost">` |
| Badge/pill | `<Badge>` |
| Horizontal scroll area | `<ScrollArea>` |
| Tabs (on PDP) | `<Tabs>` |
| Accordion (FAQ) | `<Accordion>` |
| Form inputs | `<Input>`, `<Select>`, `<Checkbox>` |
| Grid layouts | `<Grid cols={N}>` |
| Skeleton loaders | `<Skeleton>` |
| Navigation | `<NavigationMenu>` |

---

## 12. Data Model (Mock / API Contract)

### Product
```typescript
interface Product {
  id: string;
  slug: string;
  name: string;
  tagline: string;
  description: string;
  story: string;
  price: Record<string, number>; // { "30ml": 799, "50ml": 1299, "100ml": 1999 }
  images: string[];
  category: "fresh" | "floral" | "woody" | "oriental" | "citrus";
  gender: "him" | "her" | "unisex";
  badges: ("new" | "bestseller" | "limited" | "sale")[];
  notes: {
    top: string[];
    middle: string[];
    base: string[];
  };
  rating: number;
  reviewCount: number;
  inStock: boolean;
}
```

### Cart Item
```typescript
interface CartItem {
  productId: string;
  slug: string;
  name: string;
  size: string;
  price: number;
  image: string;
  quantity: number;
}
```

---

## 13. Milestones

| Phase | Deliverable | Estimate |
|---|---|---|
| 1 | Design tokens + Antigravity theme setup | 1 day |
| 2 | Shared layout: Navbar + Footer + CartDrawer | 1 day |
| 3 | Homepage — all 16 sections | 4 days |
| 4 | PLP — grid + filters + responsive | 2 days |
| 5 | PDP — gallery + notes + reviews | 3 days |
| 6 | Polish: animation, accessibility, SEO | 2 days |
| 7 | QA + Lighthouse audit | 1 day |
| **Total** | | **~14 days** |
