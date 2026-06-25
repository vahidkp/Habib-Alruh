'use client'

import { useRef } from 'react'
import { useInView } from 'framer-motion'
import Link from 'next/link'
import { useCountUp } from '@/lib/hooks'

export function FootprintBanner() {
  const ref = useRef<HTMLDivElement>(null)
  const inView = useInView(ref, { once: true, margin: '-100px' })
  const count = useCountUp(75, inView)

  return (
    <section id="footprint" className="section-pad bg-ivory">
      <div ref={ref} className="container-site grid items-center gap-10 md:grid-cols-2">
        <div className="flex items-baseline gap-3">
          <span className="font-display text-[120px] leading-none text-ink md:text-[180px]">
            {count}
          </span>
          <span className="font-display text-6xl text-gold md:text-8xl">+</span>
        </div>
        <div>
          <p className="eyebrow mb-3 text-gold">Global Footprint</p>
          <h2 className="font-display text-3xl leading-snug md:text-4xl">
            Stores in our global footprint
          </h2>
          <p className="mt-4 max-w-md text-taupe">
            From Dubai to Milan, our scents travel the world — carried in boutiques,
            ateliers, and the homes of those who notice the details.
          </p>
          <Link
            href="/#footprint"
            className="mt-5 inline-block border-b border-gold pb-1 text-sm font-medium uppercase tracking-[0.12em] text-ink transition hover:text-gold"
          >
            Locate a Store
          </Link>
        </div>
      </div>
    </section>
  )
}
