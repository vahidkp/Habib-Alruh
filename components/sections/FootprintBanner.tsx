'use client'

import { useRef } from 'react'
import { useInView } from 'framer-motion'
import Link from 'next/link'
import { useCountUp } from '@/lib/hooks'
import { Button } from '@/components/ui/Button'

export function FootprintBanner() {
  const ref = useRef<HTMLDivElement>(null)
  const inView = useInView(ref, { once: true, margin: '-100px' })
  const count = useCountUp(75, inView)

  return (
    <section id="footprint" className="section-pad scroll-mt-24 border-t border-black/[0.08] bg-surface">
      <div ref={ref} className="container-site grid items-center gap-10 md:grid-cols-2">
        <div className="flex items-baseline gap-3">
          <span className="font-geo text-[120px] leading-none text-ink md:text-[180px]">
            {count}
          </span>
          <span className="font-geo text-6xl text-gold md:text-8xl">+</span>
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
          <Link href="/#footprint" className="mt-7 inline-block">
            <Button variant="dark" size="lg">
              Locate a Boutique
            </Button>
          </Link>
        </div>
      </div>
    </section>
  )
}
