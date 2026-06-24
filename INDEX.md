# Habib Alruh — Project Index

## Overview
E-commerce website for **Habib Alruh** built with **Next.js 14 (App Router)** + **Antigravity** design system. Three core pages: Homepage, Product Listing Page (PLP), Product Detail Page (PDP).

Design reference: myop.in — full-bleed editorial layout, high-contrast serif headlines, warm accent palette, horizontal scroll carousels, dark luxury sections.

---

## Documents

### 📋 PRD (Product Requirements Document)
→ `PRD.md`

Covers: brand tokens, tech stack, all page sections with full spec tables, Antigravity component mapping, product data model, milestones.

---

### 🛠 Skills (Antigravity Development Skills)

Each skill file is a self-contained reference for a specific area of the build. Always read the relevant skill before writing code.

| # | Skill File | When to Use |
|---|---|---|
| 01 | `skills/01-antigravity-theme-setup.md` | Setting up Antigravity provider, CSS token variables, brand colours/fonts, Button variants |
| 02 | `skills/02-navbar-footer-layout.md` | Building or modifying Navbar (sticky, scroll-aware), mobile hamburger drawer, Footer with newsletter signup |
| 03 | `skills/03-homepage-sections.md` | Any homepage section: HeroCarousel, BestsellersStrip, PromoBanner, FootprintCounter, SignatureSeries, LuxeCollection, and more |
| 04 | `skills/04-product-card.md` | ProductCard component (light/dark variant, image swap, hover Add to Cart, wishlist toggle, skeleton loader) |
| 05 | `skills/05-product-listing-page.md` | PLP: CollectionHero, FilterBar, ActiveFilters, ProductGrid, LoadMore, mobile FilterDrawer, URL-based filter state |
| 06 | `skills/06-product-detail-page.md` | PDP: ProductGallery, ProductInfo (size selector, qty, cart), ScentStory, NotesPyramid, ReviewsSection |
| 07 | `skills/07-cart-drawer.md` | CartDrawer (Antigravity Sheet), CartItem, CartSummary, free shipping progress, Zustand cart store |
| 08 | `skills/08-seo-performance.md` | Next.js Metadata API, JSON-LD structured data, sitemap.xml, robots.txt, LCP/CLS optimisation, accessibility |
| 09 | `skills/09-responsive-design.md` | Mobile/tablet layouts for every section, breakpoint system, fluid typography, touch patterns, useIsMobile hook |
| 10 | `skills/10-data-layer.md` | Product types, mock PRODUCTS catalogue, getProducts/getProductBySlug queries, wishlist store, useIntersection hook |

---

## Quick Architecture Map

```
app/
├── layout.tsx              ← Navbar + CartDrawer + Footer + AntigravityProvider
├── (marketing)/
│   └── page.tsx            ← Homepage
├── products/
│   ├── page.tsx            ← PLP
│   └── [slug]/
│       └── page.tsx        ← PDP
│
lib/
├── products.ts             ← Data types + mock catalogue + query functions
├── cart.ts                 ← Zustand cart store (persisted)
├── wishlist.ts             ← Zustand wishlist store (persisted)
│
components/
├── shared/
│   ├── Navbar.tsx
│   ├── Footer.tsx
│   └── CartDrawer.tsx
├── sections/               ← Homepage sections
│   ├── HeroCarousel.tsx
│   ├── BestsellersStrip.tsx
│   └── ...
└── ui/
    └── ProductCard.tsx
│
styles/
├── globals.css             ← Font-face + reset
└── tokens.css              ← CSS variable definitions
```

---

## Brand Tokens (Quick Reference)

| Token | Hex | Use |
|---|---|---|
| Primary Black | `#0A0A0A` | Backgrounds, text |
| Warm Ivory | `#F5F0E8` | Page background |
| Gold | `#C9A84C` | Primary accent, CTAs, highlights |
| Amber | `#E8853A` | Secondary accent |
| Taupe | `#8C7B6B` | Muted text, subtext |
| White | `#FFFFFF` | Cards, surfaces |

| Role | Font |
|---|---|
| Display headings | Playfair Display |
| Body / UI | Inter |
| Eyebrows / taglines | Cormorant Garamond Italic |

---

## Development Order

1. **Theme + tokens** (Skill 01) → `styles/tokens.css`, `lib/theme.ts`
2. **Shared layout** (Skill 02) → `Navbar`, `Footer`, `CartDrawer`
3. **Data layer** (Skill 10) → `lib/products.ts`, `lib/cart.ts`, `lib/wishlist.ts`
4. **Product Card** (Skill 04) → shared component used on all 3 pages
5. **Homepage** (Skill 03) → all 16 sections
6. **PLP** (Skill 05) → filters, grid, pagination
7. **PDP** (Skill 06) → gallery, purchase info, notes, reviews
8. **Responsive** (Skill 09) → mobile pass across all pages
9. **SEO + Performance** (Skill 08) → metadata, structured data, Lighthouse
