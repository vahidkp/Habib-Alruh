---
name: responsive-design
description: >
  Use this skill when implementing or debugging responsive layouts for the
  Habib Alruh website. Triggers: adapting any section for mobile viewports,
  converting desktop grid layouts to mobile stacks, implementing the mobile
  filter drawer on PLP, adapting the PDP 2-column hero to single column on
  mobile, building the mobile hamburger nav, adjusting typography scaling
  with clamp(), fixing overflow/scroll issues on mobile, or verifying
  breakpoint behaviour across devices. Always use alongside the
  antigravity-theme-setup skill for correct token usage.
---

# Responsive Design — Habib Alruh

## Breakpoint System

```css
/* Breakpoints (mobile-first) */
/* xs: 0–479px      — small phones */
/* sm: 480–767px    — large phones */
/* md: 768–1023px   — tablets */
/* lg: 1024–1279px  — small desktop */
/* xl: 1280–1439px  — desktop */
/* 2xl: 1440px+     — wide */

/* In code, only three matter for most layouts: */
@media (max-width: 768px)  { /* mobile  */ }
@media (max-width: 1024px) { /* tablet  */ }
@media (min-width: 1440px) { /* wide    */ }
```

## Typography Scale (Fluid with clamp)

```css
/* Always use clamp() for display headings — avoids media query breakage */

/* Hero headline */
.hero-carousel__headline  { font-size: clamp(40px, 7vw, 96px); }

/* Page title (PLP collection hero) */
.collection-hero__title   { font-size: clamp(32px, 5vw, 64px); }

/* PDP product name */
.pdp-info__name           { font-size: clamp(28px, 3vw, 42px); }

/* Section headings */
.section__title           { font-size: clamp(24px, 3.5vw, 42px); }

/* Promo banner */
.promo-banner__text       { font-size: clamp(32px, 6vw, 72px); }

/* Body text — fixed, no fluid scaling needed */
.product-card__name       { font-size: 16px; }
.pdp-info__tagline        { font-size: 18px; }
```

---

## Mobile Layout Patterns per Section

### Navbar → Mobile
```css
/* Desktop: horizontal flex row */
.navbar { padding: 0 40px; height: 72px; }
.navbar__links { display: flex; }     /* desktop only */
.mobile-nav-trigger { display: none; } /* desktop: hide */

@media (max-width: 768px) {
  .navbar { padding: 0 20px; height: 64px; }
  .navbar__links { display: none; }           /* hide desktop nav */
  .mobile-nav-trigger { display: flex; }      /* show hamburger */
}
```

### Hero Carousel → Mobile
```css
/* Desktop: full viewport height */
.hero-carousel { height: 100vh; }
.hero-carousel__content { bottom: 15%; left: 8%; }

@media (max-width: 768px) {
  .hero-carousel { height: 85vh; }
  .hero-carousel__content {
    bottom: 10%; left: 5%; right: 5%;  /* full-width on mobile */
    text-align: center;
  }
}
```

### Bestsellers Strip → Mobile
```css
/* Desktop: scrollable row — works on mobile too, no changes needed */
/* Just ensure touch-action: pan-x on the ScrollArea */
.bestsellers__row {
  display: flex; gap: 20px;
  touch-action: pan-x;
}
.bestsellers__row .product-card {
  min-width: 220px;   /* desktop */
}

@media (max-width: 768px) {
  .bestsellers__row .product-card { min-width: 160px; }
}
```

### Signature Series → Mobile
```css
/* Desktop: 3-column grid */
.signature-series__grid { grid-template-columns: repeat(3, 1fr); gap: 24px; }

@media (max-width: 768px) {
  /* Stack to single column, each card is shorter */
  .signature-series__grid { grid-template-columns: 1fr; }
  .editorial-card { aspect-ratio: 16/9; }   /* wider, not tall portrait */
}

@media (max-width: 1024px) {
  .signature-series__grid { grid-template-columns: repeat(2, 1fr); }
}
```

### Shop by Gender → Mobile
```css
/* Desktop: 2-column side-by-side */
.gender-grid { display: grid; grid-template-columns: 1fr 1fr; }

@media (max-width: 768px) {
  /* Stack vertically */
  .gender-grid { grid-template-columns: 1fr; }
  .gender-card { height: 280px; }
}
```

### Section Spacing → Mobile
```css
.section { padding: var(--ag-spacing-section) 40px; }

@media (max-width: 1024px) { .section { padding: 72px 24px; } }
@media (max-width: 768px)  { .section { padding: var(--ag-spacing-section-sm) 20px; } }
```

### PLP Filter Bar → Mobile
```css
/* Desktop: sticky horizontal filter bar */
.filter-bar { padding: 12px 40px; }
.filter-bar__filters { display: flex; }
.filter-bar__sort { display: flex; }

@media (max-width: 768px) {
  .filter-bar { padding: 10px 16px; }
  .filter-bar__filters { display: none; }  /* hide individual filters */
  .filter-bar__sort { display: none; }      /* hide sort select */
  /* FilterDrawerTrigger button is visible on mobile only */
}
```

### PLP Product Grid → Mobile
```css
.product-grid { grid-template-columns: repeat(4, 1fr); gap: 24px; }

@media (max-width: 1280px) { .product-grid { grid-template-columns: repeat(3, 1fr); } }
@media (max-width: 1024px) { .product-grid { grid-template-columns: repeat(3, 1fr); gap: 16px; } }
@media (max-width: 768px)  { .product-grid { grid-template-columns: repeat(2, 1fr); gap: 12px; } }
```

### PDP Hero → Mobile
```css
/* Desktop: 2-column grid (gallery | info) */
.pdp-hero { grid-template-columns: 1fr 1fr; gap: 60px; }

@media (max-width: 768px) {
  .pdp-hero {
    grid-template-columns: 1fr;   /* stack gallery above info */
    gap: 24px;
  }
  /* Gallery: un-sticky on mobile */
  .pdp-gallery {
    position: static;
    grid-template-columns: 1fr;    /* hide thumbs strip, show main only */
  }
  .pdp-gallery__thumbs {
    flex-direction: row;           /* horizontal thumb strip below main */
    order: 2;                      /* thumbs go below main image */
    overflow-x: auto;
  }
  .pdp-gallery__thumb { min-width: 56px; width: 56px; height: 56px; }
}
```

### PDP Size Selector → Mobile
```css
/* Always full-width wrapping on mobile */
.pdp-info__size-buttons { display: flex; flex-wrap: wrap; gap: 10px; }

@media (max-width: 480px) {
  .size-btn { flex: 1; min-width: 80px; }
}
```

### Cart Drawer → Mobile
```css
/* Desktop: 420px wide from right */
.cart-drawer { width: 420px !important; }

@media (max-width: 480px) {
  /* Full-width on small phones */
  .cart-drawer { width: 100vw !important; }
}
```

### NotesPyramid → Mobile
```css
.notes-tier { flex-direction: column; gap: 8px; text-align: center; }

@media (min-width: 768px) {
  .notes-tier { flex-direction: row; gap: 24px; text-align: left; }
}
```

### Footer → Mobile
```css
.footer__columns { grid-template-columns: repeat(4, 1fr); gap: 40px; }

@media (max-width: 1024px) { .footer__columns { grid-template-columns: repeat(2, 1fr); } }
@media (max-width: 768px)  { .footer__columns { grid-template-columns: 1fr; gap: 24px; } }
```

---

## Touch & Scroll Patterns

### Horizontal Scroll Areas (Carousels, Bestsellers)
```css
/* Ensure smooth momentum scrolling on iOS */
.scroll-area-horizontal {
  overflow-x: auto;
  -webkit-overflow-scrolling: touch;
  scrollbar-width: none;         /* Firefox */
  touch-action: pan-x;
}
.scroll-area-horizontal::-webkit-scrollbar { display: none; }  /* Chrome/Safari */
```

### Preventing Body Scroll When Drawer Is Open
```tsx
// Antigravity Sheet handles this automatically via aria-modal + body scroll lock
// But if building custom overlays:
useEffect(() => {
  if (isOpen) {
    document.body.style.overflow = 'hidden'
  } else {
    document.body.style.overflow = ''
  }
  return () => { document.body.style.overflow = '' }
}, [isOpen])
```

### Tap Target Sizes
```css
/* All interactive elements must have min 44×44px tap area */
.product-card__wishlist,
.cart-item__remove,
.size-btn,
.qty-stepper button,
.pdp-gallery__nav,
.pdp-gallery__zoom {
  min-width: 44px;
  min-height: 44px;
}
```

---

## Mobile-Specific Antigravity Components

| Need | Antigravity Component | Mobile Notes |
|---|---|---|
| Filter drawer | `<Sheet side="bottom">` | Bottom sheet on mobile (not right) |
| Cart drawer | `<Sheet side="right">` | Full-width on < 480px |
| Mobile nav | `<Sheet side="left">` | Full-screen |
| Image lightbox | `<Dialog>` | Full-screen on mobile (`width: 100vw`, `height: 100dvh`) |
| Write review | `<Dialog>` | Full-screen on mobile |

```tsx
// Bottom sheet for mobile filter drawer:
<SheetContent
  side={isMobile ? 'bottom' : 'right'}
  className={`filter-drawer ${isMobile ? 'filter-drawer--bottom' : ''}`}
>
```

---

## Utility Hook: useIsMobile
```tsx
// /lib/hooks/useIsMobile.ts
'use client'
import { useEffect, useState } from 'react'

export function useIsMobile(breakpoint = 768) {
  const [isMobile, setIsMobile] = useState(false)

  useEffect(() => {
    const mq = window.matchMedia(`(max-width: ${breakpoint}px)`)
    setIsMobile(mq.matches)
    const handler = (e: MediaQueryListEvent) => setIsMobile(e.matches)
    mq.addEventListener('change', handler)
    return () => mq.removeEventListener('change', handler)
  }, [breakpoint])

  return isMobile
}

// Usage:
const isMobile = useIsMobile()
<Sheet side={isMobile ? 'bottom' : 'right'}>
```

---

## Testing Checklist
- [ ] iPhone SE (375px) — smallest common viewport
- [ ] iPhone 14 Pro (390px)
- [ ] iPad (768px) — grid should be 2 or 3 col
- [ ] iPad Pro (1024px) — transition to desktop layout
- [ ] Desktop 1280px
- [ ] Wide 1440px+
- [ ] All carousels: touch swipe works
- [ ] All drawers: full-screen on mobile, no horizontal overflow
- [ ] No text truncation on mobile cards (ensure `min-width: 0` on flex children)
- [ ] Font sizes: minimum 14px body, 12px captions on mobile
- [ ] Cart drawer: items scrollable, summary always visible at bottom

## Common Mistakes
- Never use `width: 100%` on a flex child without also setting `min-width: 0` — text will overflow
- The PDP gallery `position: sticky` MUST be `position: static` on mobile or it creates scroll jank
- Filter `Sheet side="bottom"` needs `max-height: 80vh; overflow-y: auto` to not cover full screen
- Horizontal scroll areas: always hide scrollbars with `::-webkit-scrollbar { display: none }` AND `scrollbar-width: none` for cross-browser
- `100vh` in mobile browsers includes the browser chrome — use `100dvh` (dynamic viewport height) for full-screen overlays/modals
- Don't rely on `:hover` alone for interactive states (tap = no hover) — pair all hover effects with `:focus-visible` too
