---
name: cart-drawer
description: >
  Use this skill when building or modifying the Cart Drawer for Habib Alruh,
  or when working with the Zustand cart store. Triggers: building the slide-in
  cart sheet, rendering cart line items, implementing qty controls inside cart,
  remove item, order summary calculation, free shipping progress bar, or the
  "Proceed to Checkout" CTA. Also use when wiring the cart icon in Navbar to
  open the drawer, or when debugging cart state persistence, cart item count
  badge, or cart total calculation. Reference antigravity-theme-setup skill
  for Sheet/Button component tokens.
---

# Cart Drawer — Habib Alruh

## File Structure
```
/lib/cart.ts                        ← Zustand store
/components/shared/CartDrawer.tsx   ← Drawer UI
/components/shared/CartItem.tsx     ← Single line item
/components/shared/CartSummary.tsx  ← Totals + CTA
```

---

## Cart Store (lib/cart.ts)

```typescript
import { create } from 'zustand'
import { persist } from 'zustand/middleware'

export interface CartItem {
  productId: string
  slug: string
  name: string
  size: string
  price: number          // price for this size
  image: string
  quantity: number
}

interface CartState {
  items: CartItem[]
  isOpen: boolean

  // Actions
  addItem: (item: CartItem) => void
  removeItem: (productId: string, size: string) => void
  updateQuantity: (productId: string, size: string, quantity: number) => void
  clearCart: () => void
  openCart: () => void
  closeCart: () => void
}

export const useCartStore = create<CartState>()(
  persist(
    (set, get) => ({
      items: [],
      isOpen: false,

      addItem(newItem) {
        const existing = get().items.find(
          i => i.productId === newItem.productId && i.size === newItem.size
        )
        if (existing) {
          set(state => ({
            items: state.items.map(i =>
              i.productId === newItem.productId && i.size === newItem.size
                ? { ...i, quantity: i.quantity + newItem.quantity }
                : i
            ),
            isOpen: true,
          }))
        } else {
          set(state => ({
            items: [...state.items, newItem],
            isOpen: true,     // open drawer on add
          }))
        }
      },

      removeItem(productId, size) {
        set(state => ({
          items: state.items.filter(
            i => !(i.productId === productId && i.size === size)
          ),
        }))
      },

      updateQuantity(productId, size, quantity) {
        if (quantity <= 0) {
          get().removeItem(productId, size)
          return
        }
        set(state => ({
          items: state.items.map(i =>
            i.productId === productId && i.size === size
              ? { ...i, quantity }
              : i
          ),
        }))
      },

      clearCart() { set({ items: [] }) },
      openCart() { set({ isOpen: true }) },
      closeCart() { set({ isOpen: false }) },
    }),
    {
      name: 'habibalruh-cart',           // localStorage key
      partialize: state => ({ items: state.items }),  // don't persist isOpen
    }
  )
)

// Derived selectors (use outside store to avoid re-renders)
export const selectItemCount = (state: CartState) =>
  state.items.reduce((sum, i) => sum + i.quantity, 0)

export const selectSubtotal = (state: CartState) =>
  state.items.reduce((sum, i) => sum + i.price * i.quantity, 0)
```

---

## CartDrawer Component
```tsx
'use client'
import { Sheet, SheetContent, SheetHeader, SheetTitle } from '@antigravity/react'
import { useCartStore, selectItemCount } from '@/lib/cart'
import { CartItem } from './CartItem'
import { CartSummary } from './CartSummary'
import { ShoppingBag } from 'lucide-react'

export function CartDrawer() {
  const { items, isOpen, closeCart } = useCartStore()
  const itemCount = useCartStore(selectItemCount)

  return (
    <Sheet open={isOpen} onOpenChange={open => !open && closeCart()}>
      <SheetContent side="right" className="cart-drawer">
        <SheetHeader className="cart-drawer__header">
          <SheetTitle className="cart-drawer__title">
            <ShoppingBag size={20} />
            Your Cart
            {itemCount > 0 && (
              <span className="cart-drawer__count">({itemCount} item{itemCount !== 1 ? 's' : ''})</span>
            )}
          </SheetTitle>
        </SheetHeader>

        {items.length === 0 ? (
          <CartEmpty />
        ) : (
          <>
            <div className="cart-drawer__items">
              {items.map(item => (
                <CartItem key={`${item.productId}-${item.size}`} item={item} />
              ))}
            </div>
            <CartSummary />
          </>
        )}
      </SheetContent>
    </Sheet>
  )
}

function CartEmpty() {
  return (
    <div className="cart-empty">
      <ShoppingBag size={48} strokeWidth={1} />
      <p>Your cart is empty</p>
      <a href="/products" className="btn btn--gold cart-empty__cta">
        Discover Fragrances
      </a>
    </div>
  )
}
```

---

## CartItem Component
```tsx
'use client'
import Image from 'next/image'
import Link from 'next/link'
import { Trash2 } from 'lucide-react'
import { useCartStore } from '@/lib/cart'

export function CartItem({ item }) {
  const { updateQuantity, removeItem } = useCartStore()

  return (
    <div className="cart-item">
      {/* Image */}
      <Link href={`/products/${item.slug}`} className="cart-item__image-wrap">
        <Image
          src={item.image}
          alt={item.name}
          fill
          className="object-cover"
          sizes="80px"
        />
      </Link>

      {/* Info */}
      <div className="cart-item__info">
        <Link href={`/products/${item.slug}`} className="cart-item__name">
          {item.name}
        </Link>
        <p className="cart-item__size">{item.size}</p>
        <p className="cart-item__price">₹{(item.price * item.quantity).toLocaleString('en-IN')}</p>

        <div className="cart-item__controls">
          {/* Qty stepper */}
          <div className="cart-qty">
            <button
              onClick={() => updateQuantity(item.productId, item.size, item.quantity - 1)}
              aria-label="Decrease quantity"
              disabled={item.quantity <= 1}
            >−</button>
            <span>{item.quantity}</span>
            <button
              onClick={() => updateQuantity(item.productId, item.size, item.quantity + 1)}
              aria-label="Increase quantity"
            >+</button>
          </div>

          {/* Remove */}
          <button
            className="cart-item__remove"
            onClick={() => removeItem(item.productId, item.size)}
            aria-label={`Remove ${item.name} from cart`}
          >
            <Trash2 size={14} />
          </button>
        </div>
      </div>
    </div>
  )
}
```

---

## CartSummary Component
```tsx
'use client'
import { useCartStore, selectSubtotal } from '@/lib/cart'
import { Button } from '@antigravity/react'

const FREE_SHIPPING_THRESHOLD = 999
const SHIPPING_FEE = 99

export function CartSummary() {
  const subtotal = useCartStore(selectSubtotal)
  const freeShipping = subtotal >= FREE_SHIPPING_THRESHOLD
  const shipping = freeShipping ? 0 : SHIPPING_FEE
  const total = subtotal + shipping
  const progressPct = Math.min((subtotal / FREE_SHIPPING_THRESHOLD) * 100, 100)

  return (
    <div className="cart-summary">
      {/* Free shipping progress */}
      {!freeShipping && (
        <div className="cart-shipping-progress">
          <p className="cart-shipping-progress__label">
            Add <strong>₹{(FREE_SHIPPING_THRESHOLD - subtotal).toLocaleString('en-IN')}</strong> more for free shipping!
          </p>
          <div className="cart-shipping-progress__bar">
            <div
              className="cart-shipping-progress__fill"
              style={{ width: `${progressPct}%` }}
            />
          </div>
        </div>
      )}
      {freeShipping && (
        <p className="cart-shipping-free">✓ You've unlocked free shipping!</p>
      )}

      {/* Totals */}
      <div className="cart-summary__rows">
        <div className="cart-summary__row">
          <span>Subtotal</span>
          <span>₹{subtotal.toLocaleString('en-IN')}</span>
        </div>
        <div className="cart-summary__row">
          <span>Shipping</span>
          <span>{freeShipping ? 'Free' : `₹${SHIPPING_FEE}`}</span>
        </div>
        <div className="cart-summary__row cart-summary__row--total">
          <span>Total</span>
          <span>₹{total.toLocaleString('en-IN')}</span>
        </div>
      </div>

      {/* CTA */}
      <Button
        variant="gold"
        className="cart-summary__checkout"
        onClick={() => window.location.href = '/checkout'}
      >
        Proceed to Checkout
      </Button>

      <p className="cart-summary__note">Taxes calculated at checkout</p>
    </div>
  )
}
```

---

## CSS
```css
/* Drawer shell */
.cart-drawer {
  width: 420px !important;
  max-width: 100vw;
  display: flex;
  flex-direction: column;
  padding: 0;
  background: var(--color-white);
}
.cart-drawer__header {
  padding: 24px;
  border-bottom: 1px solid rgba(0,0,0,0.08);
}
.cart-drawer__title {
  display: flex; align-items: center; gap: 10px;
  font-family: var(--font-display); font-size: 20px;
}
.cart-drawer__count { font-size: 14px; color: var(--color-taupe); font-family: var(--font-body); }

/* Items scroll area */
.cart-drawer__items {
  flex: 1; overflow-y: auto; padding: 16px 24px;
  display: flex; flex-direction: column; gap: 20px;
}

/* Individual cart item */
.cart-item {
  display: grid;
  grid-template-columns: 80px 1fr;
  gap: 16px;
}
.cart-item__image-wrap {
  position: relative; width: 80px; height: 80px;
  border-radius: var(--ag-radius-card); overflow: hidden;
  background: #f0ece4;
}
.cart-item__name {
  font-family: var(--font-display); font-size: 14px; font-weight: 600;
  text-decoration: none; color: inherit;
  display: -webkit-box; -webkit-line-clamp: 2; -webkit-box-orient: vertical; overflow: hidden;
}
.cart-item__size { font-size: 12px; color: var(--color-taupe); margin: 2px 0; }
.cart-item__price { font-size: 14px; font-weight: 600; }
.cart-item__controls { display: flex; align-items: center; gap: 12px; margin-top: 8px; }

.cart-qty {
  display: flex; align-items: center;
  border: 1px solid rgba(0,0,0,0.15); border-radius: var(--ag-radius-button);
}
.cart-qty button {
  width: 28px; height: 28px; border: none; background: none; cursor: pointer; font-size: 16px;
}
.cart-qty button:disabled { opacity: 0.4; cursor: default; }
.cart-qty span { width: 32px; text-align: center; font-size: 13px; font-weight: 600; }

.cart-item__remove {
  color: var(--color-taupe); border: none; background: none; cursor: pointer;
  padding: 4px; transition: color 0.2s;
}
.cart-item__remove:hover { color: #e53935; }

/* Summary */
.cart-summary {
  padding: 20px 24px 32px;
  border-top: 1px solid rgba(0,0,0,0.08);
}
.cart-shipping-progress__label { font-size: 13px; margin-bottom: 8px; }
.cart-shipping-progress__bar {
  height: 4px; background: rgba(0,0,0,0.08); border-radius: 2px; overflow: hidden; margin-bottom: 16px;
}
.cart-shipping-progress__fill {
  height: 100%; background: var(--color-gold);
  border-radius: 2px; transition: width 0.4s ease;
}
.cart-shipping-free { color: #2e7d32; font-size: 13px; margin-bottom: 16px; }

.cart-summary__rows { display: flex; flex-direction: column; gap: 10px; margin-bottom: 20px; }
.cart-summary__row {
  display: flex; justify-content: space-between; font-size: 14px;
}
.cart-summary__row--total { font-size: 18px; font-weight: 700; padding-top: 10px; border-top: 1px solid rgba(0,0,0,0.08); }
.cart-summary__checkout { width: 100%; height: 52px; font-size: 16px; }
.cart-summary__note { text-align: center; font-size: 12px; color: var(--color-taupe); margin-top: 10px; }

/* Empty state */
.cart-empty {
  flex: 1; display: flex; flex-direction: column;
  align-items: center; justify-content: center; gap: 16px;
  color: var(--color-taupe); text-align: center; padding: 40px;
}
```

## Wiring CartDrawer into app/layout.tsx
```tsx
// The drawer must be in the root layout so it's available on all pages
import { CartDrawer } from '@/components/shared/CartDrawer'

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body>
        <AntigravityProvider theme={habibAlruhTheme}>
          <Navbar />
          {children}
          <Footer />
          <CartDrawer />   {/* ← Always rendered, controlled by Zustand isOpen */}
        </AntigravityProvider>
      </body>
    </html>
  )
}
```

## Opening Cart from Navbar
```tsx
// In Navbar:
const openCart = useCartStore(s => s.openCart)

<button onClick={openCart} aria-label={`Cart, ${itemCount} items`}>
  <ShoppingBag size={20} />
  {itemCount > 0 && <span className="cart-badge">{itemCount}</span>}
</button>
```

## Common Mistakes
- `CartDrawer` MUST be in `app/layout.tsx`, not in individual pages — it needs to persist across navigation
- `persist` middleware: only persist `items`, NOT `isOpen` — otherwise drawer stays open on page refresh
- The `Sheet` `onOpenChange` callback fires with `false` when user clicks overlay or presses Escape — handle this with `!open && closeCart()` not just `closeCart()` to avoid double-calls
- Always use `selectSubtotal` and `selectItemCount` as external selectors to prevent unnecessary re-renders
- The free shipping progress bar width must use inline `style={{ width }}` not a CSS class (dynamic value)
- Cart item `key` must be `productId-size` combination, not just `productId` — same product in different sizes are separate line items
