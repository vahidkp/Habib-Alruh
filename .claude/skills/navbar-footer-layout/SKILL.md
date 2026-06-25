---
name: navbar-footer-layout
description: >
  Use this skill when building or modifying the Navbar or Footer shared layout
  components for the Habib Alruh website. Triggers: creating the sticky
  navigation bar with scroll-aware background, building the mobile hamburger
  drawer, wiring up cart icon with item count badge, building the multi-column
  footer with newsletter signup, or updating navigation links. Also use when
  debugging layout shift issues caused by the sticky navbar.
---

# Navbar & Footer — Habib Alruh

## Navbar Spec

### Behaviour
- Default: transparent background, white text (for hero-overlay usage)
- After 80px scroll: transitions to `#0A0A0A` background with white text (0.3s ease)
- Sticky (`position: sticky; top: 0; z-index: 100`)
- Height: 72px desktop, 64px mobile

### Structure
```
[LOGO]          [NAV LINKS — center]          [ACTIONS — right]
HABIB ALRUH           Collections  Bestsellers       🔍  ♡  🛒(3)
                Signature  Gift Sets
                Our Story  Stores
```

### Implementation (components/shared/Navbar.tsx)
```tsx
'use client'
import { useState, useEffect } from 'react'
import Link from 'next/link'
import { NavigationMenu, NavigationMenuItem, NavigationMenuLink } from '@antigravity/react'
import { Search, Heart, ShoppingBag } from 'lucide-react'
import { useCartStore } from '@/lib/cart'

export function Navbar() {
  const [scrolled, setScrolled] = useState(false)
  const itemCount = useCartStore(s => s.items.reduce((n, i) => n + i.quantity, 0))

  useEffect(() => {
    const handler = () => setScrolled(window.scrollY > 80)
    window.addEventListener('scroll', handler, { passive: true })
    return () => window.removeEventListener('scroll', handler)
  }, [])

  return (
    <header
      className={`navbar ${scrolled ? 'navbar--scrolled' : 'navbar--transparent'}`}
    >
      {/* Logo */}
      <Link href="/" className="navbar__logo">HABIB ALRUH</Link>

      {/* Desktop nav */}
      <NavigationMenu className="navbar__links">
        {NAV_LINKS.map(link => (
          <NavigationMenuItem key={link.href}>
            <NavigationMenuLink href={link.href}>{link.label}</NavigationMenuLink>
          </NavigationMenuItem>
        ))}
      </NavigationMenu>

      {/* Actions */}
      <div className="navbar__actions">
        <button aria-label="Search"><Search size={20} /></button>
        <button aria-label="Wishlist"><Heart size={20} /></button>
        <button aria-label={`Cart, ${itemCount} items`} className="cart-trigger">
          <ShoppingBag size={20} />
          {itemCount > 0 && <span className="cart-badge">{itemCount}</span>}
        </button>
      </div>

      {/* Mobile hamburger */}
      <MobileNavDrawer links={NAV_LINKS} />
    </header>
  )
}

const NAV_LINKS = [
  { label: 'Collections', href: '/products' },
  { label: 'Bestsellers', href: '/products?sort=bestsellers' },
  { label: 'Signature', href: '/products?collection=signature' },
  { label: 'Gift Sets', href: '/products?collection=gifts' },
  { label: 'Our Story', href: '/about' },
  { label: 'Stores', href: '/stores' },
]
```

### CSS (navbar)
```css
.navbar {
  position: sticky;
  top: 0;
  z-index: 100;
  display: flex;
  align-items: center;
  justify-content: space-between;
  height: 72px;
  padding: 0 40px;
  transition: background 0.3s ease, box-shadow 0.3s ease;
}

.navbar--transparent {
  background: transparent;
  color: white;
}

.navbar--scrolled {
  background: var(--color-primary-black);
  color: white;
  box-shadow: 0 2px 20px rgba(0,0,0,0.3);
}

.navbar__logo {
  font-family: var(--font-display);
  font-size: 24px;
  font-weight: 700;
  letter-spacing: 0.2em;
  color: inherit;
  text-decoration: none;
}

.cart-badge {
  position: absolute;
  top: -6px; right: -6px;
  width: 18px; height: 18px;
  background: var(--color-gold);
  color: var(--color-primary-black);
  border-radius: 50%;
  font-size: 10px;
  font-weight: 700;
  display: grid;
  place-items: center;
}
```

### Mobile Drawer (Antigravity Sheet)
```tsx
import { Sheet, SheetTrigger, SheetContent } from '@antigravity/react'
import { Menu } from 'lucide-react'

function MobileNavDrawer({ links }) {
  return (
    <Sheet>
      <SheetTrigger className="md:hidden" aria-label="Open menu">
        <Menu size={24} />
      </SheetTrigger>
      <SheetContent side="left" className="mobile-nav-drawer">
        <Link href="/" className="mobile-nav__logo">HABIB ALRUH</Link>
        <nav>
          {links.map(link => (
            <Link key={link.href} href={link.href} className="mobile-nav__link">
              {link.label}
            </Link>
          ))}
        </nav>
      </SheetContent>
    </Sheet>
  )
}
```

---

## Footer Spec

### Structure
```
[NEWSLETTER SIGNUP — full width]
──────────────────────────────────────
[Shop]    [Company]    [Help]    [Follow Us]
Links     Links        Links     Social icons
──────────────────────────────────────
© 2025 Habib Alruh · Privacy · Terms
```

### Implementation (components/shared/Footer.tsx)
```tsx
import { Input, Button } from '@antigravity/react'

export function Footer() {
  return (
    <footer className="footer">
      {/* Newsletter */}
      <div className="footer__newsletter">
        <p className="footer__newsletter-eyebrow">Stay in the Loop</p>
        <h3 className="footer__newsletter-heading">
          Exciting Offers, Coupons & Much More
        </h3>
        <div className="footer__newsletter-form">
          <Input
            type="email"
            placeholder="Your email address"
            className="footer__email-input"
          />
          <Button variant="gold">Subscribe</Button>
        </div>
      </div>

      {/* Columns */}
      <div className="footer__columns">
        {FOOTER_COLUMNS.map(col => (
          <div key={col.heading} className="footer__col">
            <h4>{col.heading}</h4>
            {col.links.map(link => (
              <a key={link.href} href={link.href}>{link.label}</a>
            ))}
          </div>
        ))}
        <div className="footer__col">
          <h4>Follow Us</h4>
          <SocialIcons />
        </div>
      </div>

      {/* Bottom bar */}
      <div className="footer__bottom">
        <span>© 2025 Habib Alruh. All rights reserved.</span>
        <a href="/privacy">Privacy Policy</a>
        <a href="/terms">Terms of Service</a>
      </div>
    </footer>
  )
}
```

### CSS Highlights
```css
.footer {
  background: var(--color-primary-black);
  color: var(--color-ivory);
  padding: 80px 40px 40px;
}

.footer__columns {
  display: grid;
  grid-template-columns: repeat(4, 1fr);
  gap: 40px;
  padding: 60px 0;
  border-top: 1px solid rgba(255,255,255,0.1);
}
```

## Common Mistakes
- Always open CartDrawer from the cart icon click — never navigate to /cart
- The navbar must be rendered in `app/layout.tsx`, not on individual pages
- On pages with a hero that starts at the very top (homepage), the navbar must be `transparent` class initially so it overlays the hero image
- The footer newsletter form must NOT use `<form>` element — use `onClick` handler on the Button
