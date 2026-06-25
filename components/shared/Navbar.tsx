'use client'

import Link from 'next/link'
import Image from 'next/image'
import { useEffect, useState } from 'react'
import { Search, Heart, ShoppingBag, Menu, X } from 'lucide-react'
import { AnimatePresence, motion } from 'framer-motion'
import { useCart, cartCount } from '@/lib/cart'
import { useHydrated } from '@/lib/hooks'

const LINKS = [
  { href: '/', label: 'Home' },
  { href: '/products?category=oriental', label: 'Signature' },
  { href: '/products?collection=gifts', label: 'Gift Sets' },
  { href: '/products?collection=luxe', label: 'Cosmopolitan' },
  { href: '/products?sort=bestsellers', label: 'Bestsellers' },
  { href: '/#brand-story', label: 'Our Story' },
]

export function Navbar() {
  const [mobileOpen, setMobileOpen] = useState(false)
  const openCart = useCart((s) => s.open)
  const items = useCart((s) => s.items)
  const hydrated = useHydrated()
  const count = hydrated ? cartCount(items) : 0

  // Lock body scroll while the mobile menu is open.
  useEffect(() => {
    document.body.style.overflow = mobileOpen ? 'hidden' : ''
    return () => {
      document.body.style.overflow = ''
    }
  }, [mobileOpen])

  return (
    <>
      <header className="sticky top-0 z-40 border-b border-black/10 bg-ivory/95 text-ink backdrop-blur">
        <div className="container-site grid h-16 grid-cols-[1fr_auto_1fr] items-center md:h-20">
          {/* Left: logo (mobile: hamburger) */}
          <div className="flex items-center">
            <button className="md:hidden" aria-label="Open menu" onClick={() => setMobileOpen(true)}>
              <Menu size={22} />
            </button>
            <Link href="/" aria-label="Habib Alruh home" className="hidden items-center gap-2.5 md:flex">
              <Image src="/brand/mark-dark.png" alt="Habib Alruh" width={497} height={483} priority className="h-9 w-auto md:h-10" />
              <span className="font-display text-lg tracking-[0.16em] md:text-xl">HABIB ALRUH</span>
            </Link>
          </div>

          {/* Center: logo on mobile, menu on desktop */}
          <Link href="/" aria-label="Habib Alruh home" className="flex items-center gap-2 md:hidden">
            <Image src="/brand/mark-dark.png" alt="Habib Alruh" width={497} height={483} priority className="h-8 w-auto" />
          </Link>
          <nav className="hidden items-center justify-center gap-7 md:flex">
            {LINKS.map((l) => (
              <Link key={l.label} href={l.href} className="text-[11px] font-medium uppercase tracking-[0.16em] text-ink/80 transition hover:text-gold">
                {l.label}
              </Link>
            ))}
          </nav>

          {/* Right: icons */}
          <div className="flex items-center justify-end gap-4 md:gap-5">
            <button aria-label="Search" className="transition hover:text-gold">
              <Search size={19} />
            </button>
            <Link href="/products?wishlist=1" aria-label="Wishlist" className="hidden transition hover:text-gold sm:block">
              <Heart size={19} />
            </Link>
            <button aria-label="Open cart" onClick={openCart} className="relative transition hover:text-gold">
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

      {/* Mobile full-screen drawer — rendered OUTSIDE the blurred header so it
          covers the whole viewport (backdrop-filter would otherwise trap it). */}
      <AnimatePresence>
        {mobileOpen && (
          <motion.div
            className="fixed inset-0 z-[60] flex flex-col bg-ink text-white md:hidden"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.25 }}
          >
            <div className="container-site flex h-16 items-center justify-between border-b border-white/10">
              <span className="flex items-center gap-2.5">
                <Image src="/brand/mark-light.png" alt="" width={497} height={483} className="h-9 w-auto" />
                <span className="font-display text-lg tracking-[0.18em]">HABIB ALRUH</span>
              </span>
              <button aria-label="Close menu" onClick={() => setMobileOpen(false)}>
                <X size={24} />
              </button>
            </div>
            <nav className="container-site mt-10 flex flex-col gap-6">
              {LINKS.map((l, i) => (
                <motion.div
                  key={l.label}
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: 0.04 * i }}
                >
                  <Link href={l.href} onClick={() => setMobileOpen(false)} className="font-display text-4xl">
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
