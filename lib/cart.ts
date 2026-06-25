'use client'

import { create } from 'zustand'
import { persist } from 'zustand/middleware'

export interface CartItem {
  productId: string
  slug: string
  name: string
  size: string
  price: number
  image?: string
  quantity: number
}

export const FREE_SHIPPING_THRESHOLD = 200

interface CartState {
  items: CartItem[]
  isOpen: boolean
  open: () => void
  close: () => void
  add: (item: Omit<CartItem, 'quantity'>, qty?: number) => void
  remove: (productId: string, size: string) => void
  setQty: (productId: string, size: string, qty: number) => void
  clear: () => void
}

const key = (id: string, size: string) => `${id}__${size}`

export const useCart = create<CartState>()(
  persist(
    (set) => ({
      items: [],
      isOpen: false,
      open: () => set({ isOpen: true }),
      close: () => set({ isOpen: false }),
      add: (item, qty = 1) =>
        set((state) => {
          const idx = state.items.findIndex(
            (i) => key(i.productId, i.size) === key(item.productId, item.size),
          )
          if (idx > -1) {
            const items = [...state.items]
            items[idx] = { ...items[idx], quantity: items[idx].quantity + qty }
            return { items, isOpen: true }
          }
          return { items: [...state.items, { ...item, quantity: qty }], isOpen: true }
        }),
      remove: (productId, size) =>
        set((state) => ({
          items: state.items.filter((i) => key(i.productId, i.size) !== key(productId, size)),
        })),
      setQty: (productId, size, qty) =>
        set((state) => ({
          items: state.items
            .map((i) =>
              key(i.productId, i.size) === key(productId, size)
                ? { ...i, quantity: Math.max(1, qty) }
                : i,
            )
            .filter((i) => i.quantity > 0),
        })),
      clear: () => set({ items: [] }),
    }),
    { name: 'habib-cart' },
  ),
)

export const cartCount = (items: CartItem[]) =>
  items.reduce((n, i) => n + i.quantity, 0)

export const cartSubtotal = (items: CartItem[]) =>
  items.reduce((n, i) => n + i.price * i.quantity, 0)
