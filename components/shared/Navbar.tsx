'use client'

import Link from 'next/link'
import Image from 'next/image'
import { useState } from 'react'
import { Search, Heart, ShoppingBag, Menu, X } from 'lucide-react'
import { AnimatePresence, motion } from 'framer-motion'
import { useCart, cartCount } from '@/lib/cart'
import { useScrolled, useHydrated } from '@/lib/hooks'
import { cn } from '@/lib/utils'

const LINKS = [
  { href: '/products?collection=all', label: 'Collections' },
  { href: '/products?sort=bestsellers', label: 'Bestsellers' },
  { href: '/products?category=oriental', label: 'Signature' },
  { href: '/products?collection=gifts', label: 'Gift Sets' },
  { href: '/#brand-story', label: 'Our Story' },
  { href: '/#footprint', label: 'Stores' },
]

export function Navbar() {
  const scrolled = useScrolled(80)
  const [mobileOpen, setMobileOpen] = useState(false)
  const openCart = useCart((s) => s.open)
  const items = useCart((s) => s.items)
  const hydrated = useHydrated()
  const count = hydrated ? cartCount(items) : 0

  return (
    <>
      <header
        className={cn(
          'fixed inset-x-0 top-0 z-40 transition-colors duration-500',
          scrolled || mobileOpen ? 'bg-ink text-white shadow-card' : 'bg-transparent text-white',
        )}
      >
        <div className="container-site flex h-16 items-center justify-between md:h-20">
          <button
            className="md:hidden"
            aria-label="Open menu"
            onClick={() => setMobileOpen(true)}
          >
            <Menu size={22} />
          </button>

          <Link href="/" aria-label="Habib Alruh home" className="flex items-center gap-2.5">
            <Image
              src="/brand/mark-light.png"
              alt="Habib Alruh"
              width={497}
              height={483}
              priority
              className="h-9 w-auto md:h-10"
            />
            <span className="font-display text-lg tracking-[0.18em] md:text-2xl">HABIB ALRUH</span>
          </Link>

          <nav className="hidden items-center gap-7 lg:flex">
            {LINKS.map((l) => (
              <Link
                key={l.label}
                href={l.href}
                className="text-xs font-medium uppercase tracking-[0.14em] text-white/80 transition hover:text-gold"
              >
                {l.label}
              </Link>
            ))}
          </nav>

          <div className="flex items-center gap-4 md:gap-5">
            <button aria-label="Search" className="hover:text-gold">
              <Search size={19} />
            </button>
            <Link href="/products?wishlist=1" aria-label="Wishlist" className="hidden hover:text-gold sm:block">
              <Heart size={19} />
            </Link>
            <button aria-label="Open cart" onClick={openCart} className="relative hover:text-gold">
              <ShoppingBag size={19} />
              {count > 0 && (
                <span className="absolute -right-2 -top-2 grid h-4 min-w-4 place-items-center rounded-full bg-gold px-1 text-[10px] font-bold text-ink">
                  {count}
                </span>
              )}
            </button>
          </div>
        </div>
      </header>

      {/* Mobile full-screen drawer */}
      <AnimatePresence>
        {mobileOpen && (
          <motion.div
            className="fixed inset-0 z-50 flex flex-col bg-ink text-white md:hidden"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
          >
            <div className="container-site flex h-16 items-center justify-between">
              <span className="flex items-center gap-2.5">
                <Image src="/brand/mark-light.png" alt="" width={497} height={483} className="h-9 w-auto" />
                <span className="font-display text-lg tracking-[0.18em]">HABIB ALRUH</span>
              </span>
              <button aria-label="Close menu" onClick={() => setMobileOpen(false)}>
                <X size={24} />
              </button>
            </div>
            <nav className="container-site mt-8 flex flex-col gap-6">
              {LINKS.map((l, i) => (
                <motion.div
                  key={l.label}
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: 0.05 * i }}
                >
                  <Link
                    href={l.href}
                    onClick={() => setMobileOpen(false)}
                    className="font-display text-3xl"
                  >
                    {l.label}
                  </Link>
                </motion.div>
              ))}
            </nav>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  )
}
