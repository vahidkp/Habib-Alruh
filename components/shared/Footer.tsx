'use client'

import Link from 'next/link'
import Image from 'next/image'
import { useState } from 'react'
import { Instagram, Facebook, Youtube, Twitter, ArrowRight } from 'lucide-react'

const COLUMNS = [
  {
    title: 'Shop',
    links: ['All Fragrances', 'Bestsellers', 'Signature Series', 'Gift Sets', 'New Arrivals'],
  },
  {
    title: 'Company',
    links: ['Our Story', 'Craftsmanship', 'Sustainability', 'Stores', 'Careers'],
  },
  {
    title: 'Help',
    links: ['Shipping & Returns', 'Track Order', 'FAQ', 'Contact Us', 'Privacy Policy'],
  },
]

export function Footer() {
  const [email, setEmail] = useState('')
  const [done, setDone] = useState(false)

  return (
    <footer className="bg-ink text-white">
      {/* Newsletter */}
      <div className="border-b border-white/10">
        <div className="container-site grid gap-8 py-14 md:grid-cols-2 md:items-center">
          <div>
            <p className="font-accent text-lg italic text-gold">Join the atelier</p>
            <h3 className="mt-1 font-display text-3xl md:text-4xl">
              Scent stories, first access, no noise.
            </h3>
          </div>
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
              placeholder="Your email address"
              aria-label="Email address"
              className="h-12 w-full rounded-button border border-white/25 bg-transparent px-4 text-sm text-white placeholder:text-white/40 focus:border-gold focus:outline-none"
            />
            <button
              type="submit"
              aria-label="Subscribe"
              className="grid h-12 w-12 shrink-0 place-items-center rounded-button bg-gold text-ink transition hover:bg-[#b8993f]"
            >
              <ArrowRight size={18} />
            </button>
          </form>
          {done && <p className="text-sm text-gold md:col-start-2">Thank you — welcome in.</p>}
        </div>
      </div>

      {/* Columns */}
      <div className="container-site grid gap-10 py-14 md:grid-cols-[1.4fr_repeat(3,1fr)]">
        <div>
          <Link href="/" aria-label="Habib Alruh home" className="inline-block">
            <Image
              src="/brand/logo-light.png"
              alt="Habib Alruh Perfumes"
              width={1359}
              height={1185}
              className="h-24 w-auto"
            />
          </Link>
          <p className="mt-4 max-w-xs text-sm text-white/55">
            Handcrafted luxury fragrances composed in small batches in the UAE. From Dubai to
            Milan, our scents travel the world.
          </p>
          <div className="mt-5 flex gap-3">
            {[Instagram, Facebook, Youtube, Twitter].map((Icon, i) => (
              <a
                key={i}
                href="#"
                aria-label="Social link"
                className="grid h-9 w-9 place-items-center rounded-full border border-white/20 transition hover:border-gold hover:text-gold"
              >
                <Icon size={16} />
              </a>
            ))}
          </div>
          <address className="mt-5 space-y-1 text-sm not-italic text-white/55">
            <p>Boutique 12, Dubai Design District, Dubai, UAE</p>
            <p>
              <a href="tel:+97140000000" className="transition hover:text-white">+971 4 000 0000</a>
              {' · '}
              <a href="mailto:hello@habibalruh.ae" className="transition hover:text-white">hello@habibalruh.ae</a>
            </p>
          </address>
        </div>

        {COLUMNS.map((col) => (
          <div key={col.title}>
            <h4 className="eyebrow text-gold">{col.title}</h4>
            <ul className="mt-4 space-y-3">
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
      </div>

      <div className="border-t border-white/10">
        <div className="container-site flex flex-col items-center justify-between gap-3 py-6 text-xs text-white/45 md:flex-row">
          <p>© {new Date().getFullYear()} Habib Alruh. All rights reserved.</p>
          <div className="flex gap-6">
            <Link href="#">Privacy Policy</Link>
            <Link href="#">Terms of Service</Link>
          </div>
        </div>
      </div>
    </footer>
  )
}
