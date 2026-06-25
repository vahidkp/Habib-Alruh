'use client'

import Link from 'next/link'
import Image from 'next/image'
import { useState } from 'react'
import { Instagram, Facebook, Youtube, Twitter, ArrowRight } from 'lucide-react'
import { PaymentIcons } from '@/components/shared/PaymentIcons'

const COLUMNS = [
  {
    title: 'Company Info',
    links: ['About Us', 'Our Story', 'Craftsmanship', 'Stores', 'Careers'],
  },
  {
    title: 'Support',
    links: ['Shipping & Returns', 'Track Order', 'FAQ', 'Contact Us', 'Privacy Policy'],
  },
]

export function Footer() {
  const [email, setEmail] = useState('')
  const [done, setDone] = useState(false)

  return (
    <footer className="bg-ink font-body text-white">
      <div className="container-site grid gap-12 py-16 lg:grid-cols-[1.6fr_1fr_1fr_1.4fr]">
        {/* Brand + address */}
        <div>
          <Link href="/" aria-label="Habib Alruh home" className="inline-block">
            <Image src="/brand/logo-light.png" alt="Habib Alruh Perfumes" width={1359} height={1185} className="h-24 w-auto" />
          </Link>
          <p className="mt-4 max-w-xs text-sm text-white/55">
            Handcrafted luxury fragrances composed in small batches in the UAE. From Dubai to
            Milan, our scents travel the world.
          </p>

          <address className="mt-5 space-y-1 text-sm not-italic text-white/60">
            <p>Boutique 12, Dubai Design District, Dubai, UAE</p>
            <p>
              <a href="tel:+97140000000" className="transition hover:text-white">+971 4 000 0000</a>
              {' · '}
              <a href="mailto:hello@habibalruh.ae" className="transition hover:text-white">hello@habibalruh.ae</a>
            </p>
          </address>

          <div className="mt-5 flex gap-3">
            {[Instagram, Facebook, Youtube, Twitter].map((Icon, i) => (
              <a key={i} href="#" aria-label="Social link" className="grid h-9 w-9 place-items-center rounded-full border border-white/20 transition hover:border-gold hover:text-gold">
                <Icon size={16} />
              </a>
            ))}
          </div>
        </div>

        {/* Link columns */}
        {COLUMNS.map((col) => (
          <div key={col.title}>
            <h4 className="mb-4 font-geo text-lg tracking-wide text-white">{col.title}</h4>
            <ul className="space-y-3">
              {col.links.map((l) => (
                <li key={l}>
                  <Link href="/products" className="text-sm text-white/60 transition hover:text-white">
                    {l}
                  </Link>
                </li>
              ))}
            </ul>
          </div>
        ))}

        {/* Newsletter */}
        <div>
          <h4 className="mb-1 font-geo text-lg tracking-wide text-white">Subscribe to Newsletter</h4>
          <p className="mb-4 text-sm text-white/55">First access, offers, and scent stories.</p>
          <form
            onSubmit={(e) => {
              e.preventDefault()
              if (email) setDone(true)
            }}
            className="flex items-center gap-3"
          >
            <input
              type="email"
              required
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="Enter your email address"
              aria-label="Email address"
              className="h-12 w-full rounded-button border border-white/25 bg-transparent px-4 text-sm text-white placeholder:text-white/40 focus:border-gold focus:outline-none"
            />
            <button type="submit" aria-label="Subscribe" className="grid h-12 w-12 shrink-0 place-items-center rounded-button bg-gold text-ink transition hover:bg-[#b8993f]">
              <ArrowRight size={18} />
            </button>
          </form>
          {done && <p className="mt-3 text-sm text-gold">Thank you — welcome in.</p>}
        </div>
      </div>

      <div className="border-t border-white/10">
        <div className="container-site flex flex-col items-center justify-between gap-4 py-6 md:flex-row">
          <p className="text-xs text-white/45">© {new Date().getFullYear()} Habib Alruh. All rights reserved.</p>
          <PaymentIcons />
        </div>
      </div>
    </footer>
  )
}
