'use client'

import { useRef } from 'react'
import Link from 'next/link'
import { ArrowRight, ChevronLeft, ChevronRight } from 'lucide-react'
import { ProductCard } from '@/components/ui/ProductCard'
import { Reveal } from '@/components/ui/Reveal'
import { getBestsellers } from '@/lib/products'

export function BestsellersStrip() {
  const products = getBestsellers(6)
  const scroller = useRef<HTMLDivElement>(null)

  const scroll = (dir: number) => {
    scroller.current?.scrollBy({ left: dir * (scroller.current.clientWidth * 0.8), behavior: 'smooth' })
  }

  return (
    <section className="section-pad border-t border-black/[0.08] bg-surface">
      <div className="container-site">
        <Reveal className="mb-8 flex items-end justify-between gap-4">
          <div>
            <p className="eyebrow mb-2 text-taupe">Discover</p>
            <h2 className="font-display text-3xl leading-tight md:text-[42px]">
              <span className="text-ink">Our </span>
              <span className="text-gold">Bestsellers</span>
            </h2>
          </div>
          <div className="flex items-center gap-2">
            <Link
              href="/products?sort=bestsellers"
              className="hidden items-center gap-1 text-sm font-medium uppercase tracking-[0.12em] text-ink transition hover:text-gold md:flex"
            >
              View All <ArrowRight size={16} />
            </Link>
            <button onClick={() => scroll(-1)} aria-label="Scroll left" className="grid h-10 w-10 place-items-center rounded-full border border-black/15 transition hover:border-gold hover:text-gold">
              <ChevronLeft size={18} />
            </button>
            <button onClick={() => scroll(1)} aria-label="Scroll right" className="grid h-10 w-10 place-items-center rounded-full border border-black/15 transition hover:border-gold hover:text-gold">
              <ChevronRight size={18} />
            </button>
          </div>
        </Reveal>

        <div ref={scroller} className="no-scrollbar flex snap-x snap-mandatory gap-5 overflow-x-auto">
          {products.map((p) => (
            <div
              key={p.id}
              className="w-full shrink-0 snap-start sm:w-[calc((100%-1.25rem)/2)] md:w-[calc((100%-2.5rem)/3)] lg:w-[calc((100%-3.75rem)/4)]"
            >
              <div className="rounded-2xl border border-ink/15 p-3 transition duration-300 hover:border-gold/50">
                <ProductCard product={p} />
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
