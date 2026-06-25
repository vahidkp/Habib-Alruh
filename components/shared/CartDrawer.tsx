'use client'

import { Minus, Plus, Trash2, ShoppingBag } from 'lucide-react'
import { Sheet } from '@/components/ui/Sheet'
import { Button } from '@/components/ui/Button'
import { EditorialImage } from '@/components/ui/EditorialImage'
import { useCart, cartSubtotal, FREE_SHIPPING_THRESHOLD } from '@/lib/cart'
import { useHydrated } from '@/lib/hooks'
import { formatAED } from '@/lib/utils'

export function CartDrawer() {
  const { isOpen, close, items, setQty, remove } = useCart()
  const hydrated = useHydrated()
  const subtotal = cartSubtotal(items)
  const remaining = Math.max(0, FREE_SHIPPING_THRESHOLD - subtotal)
  const progress = Math.min(100, (subtotal / FREE_SHIPPING_THRESHOLD) * 100)

  return (
    <Sheet open={isOpen} onClose={close} title="Your Cart">
      {!hydrated || items.length === 0 ? (
        <div className="flex h-full flex-col items-center justify-center gap-4 px-6 text-center">
          <ShoppingBag size={40} className="text-taupe" />
          <p className="font-display text-xl">Your cart is empty</p>
          <p className="text-sm text-taupe">Discover a scent worth carrying.</p>
          <Button variant="dark" onClick={close}>
            Continue Shopping
          </Button>
        </div>
      ) : (
        <div className="flex h-full flex-col">
          {/* Free shipping progress */}
          <div className="border-b border-black/10 px-6 py-4">
            <p className="text-xs text-taupe">
              {remaining > 0 ? (
                <>
                  Add <span className="font-semibold text-ink">{formatAED(remaining)}</span> more for
                  free shipping!
                </>
              ) : (
                <span className="font-semibold text-gold">You&apos;ve unlocked free shipping 🎉</span>
              )}
            </p>
            <div className="mt-2 h-1.5 w-full overflow-hidden rounded-full bg-black/10">
              <div className="h-full rounded-full bg-gold transition-all" style={{ width: `${progress}%` }} />
            </div>
          </div>

          {/* Line items */}
          <div className="flex-1 divide-y divide-black/5 overflow-y-auto px-6">
            {items.map((item) => (
              <div key={`${item.productId}-${item.size}`} className="flex gap-4 py-4">
                <EditorialImage seed={item.slug} className="h-20 w-20 shrink-0" rounded />
                <div className="flex flex-1 flex-col">
                  <div className="flex justify-between">
                    <div>
                      <h3 className="font-display text-base">{item.name}</h3>
                      <p className="text-xs text-taupe">{item.size}</p>
                    </div>
                    <button
                      onClick={() => remove(item.productId, item.size)}
                      aria-label="Remove item"
                      className="text-taupe transition hover:text-[#b4453a]"
                    >
                      <Trash2 size={16} />
                    </button>
                  </div>
                  <div className="mt-auto flex items-center justify-between">
                    <div className="flex items-center rounded-button border border-black/15">
                      <button
                        onClick={() => setQty(item.productId, item.size, item.quantity - 1)}
                        aria-label="Decrease quantity"
                        className="grid h-8 w-8 place-items-center"
                      >
                        <Minus size={14} />
                      </button>
                      <span className="w-8 text-center text-sm">{item.quantity}</span>
                      <button
                        onClick={() => setQty(item.productId, item.size, item.quantity + 1)}
                        aria-label="Increase quantity"
                        className="grid h-8 w-8 place-items-center"
                      >
                        <Plus size={14} />
                      </button>
                    </div>
                    <span className="font-semibold">{formatAED(item.price * item.quantity)}</span>
                  </div>
                </div>
              </div>
            ))}
          </div>

          {/* Summary */}
          <div className="border-t border-black/10 px-6 py-5">
            <div className="flex justify-between text-sm">
              <span className="text-taupe">Subtotal</span>
              <span className="font-semibold">{formatAED(subtotal)}</span>
            </div>
            <div className="mt-1 flex justify-between text-sm">
              <span className="text-taupe">Delivery</span>
              <span>{remaining > 0 ? 'Calculated at checkout' : 'Free'}</span>
            </div>
            <div className="mt-3 flex justify-between border-t border-black/10 pt-3 font-display text-lg">
              <span>Total</span>
              <span>{formatAED(subtotal)}</span>
            </div>
            <Button variant="gold" size="lg" className="mt-4 w-full">
              Proceed to Checkout
            </Button>
          </div>
        </div>
      )}
    </Sheet>
  )
}
