'use client'

import { useRef } from 'react'
import Link from 'next/link'
import { ChevronLeft, ChevronRight } from 'lucide-react'
import { Button } from '@/components/ui/Button'
import { ProductCard } from '@/components/ui/ProductCard'
import { Reveal } from '@/components/ui/Reveal'
import { getProductBySlug, type Product } from '@/lib/products'

// Light-bottled scents — they pop against the dark section.
const LIGHT_SLUGS = [
  'born-from-silence-50ml',
  'morning-bloom-50ml',
  'citrus-veil-30ml',
  'sea-salt-aria-30ml',
  'green-fig-30ml',
]

export function LuxeCollection() {
  const products = LIGHT_SLUGS.map((s) => getProductBySlug(s)).filter(Boolean) as Product[]
  const scroller = useRef<HTMLDivElement>(null)
  const scroll = (dir: number) => {
    scroller.current?.scrollBy({ left: dir * (scroller.current.clientWidth * 0.8), behavior: 'smooth' })
  }
  return (
    <section
      className="relative overflow-hidden py-20 text-white md:py-28"
      style={{
        background:
          'radial-gradient(90% 70% at 50% -10%, #241a10 0%, transparent 60%), radial-gradient(70% 50% at 100% 100%, #1a130b 0%, transparent 55%), #0b0b0b',
      }}
    >
      <div className="container-site">
        <div className="mb-10 flex items-end justify-between gap-4">
          <Reveal className="max-w-xl">
            <p className="eyebrow text-gold">Cosmopolitan Luxe</p>
            <p className="mt-4 font-accent text-2xl italic text-white/80 md:text-3xl">
              For the cosmopolitan soul — scents that move between cities, seasons, and selves.
            </p>
          </Reveal>
          <div className="flex shrink-0 gap-2">
            <button onClick={() => scroll(-1)} aria-label="Scroll left" className="grid h-10 w-10 place-items-center rounded-full border border-white/25 text-white transition hover:border-gold hover:text-gold">
              <ChevronLeft size={18} />
            </button>
            <button onClick={() => scroll(1)} aria-label="Scroll right" className="grid h-10 w-10 place-items-center rounded-full border border-white/25 text-white transition hover:border-gold hover:text-gold">
              <ChevronRight size={18} />
            </button>
          </div>
        </div>

        <div ref={scroller} className="no-scrollbar flex snap-x snap-mandatory gap-5 overflow-x-auto">
          {products.map((p) => (
            <div
              key={p.id}
              className="w-full shrink-0 snap-start sm:w-[calc((100%-1.25rem)/2)] md:w-[calc((100%-2.5rem)/3)] lg:w-[calc((100%-3.75rem)/4)]"
            >
              <div className="rounded-2xl border border-white/15 p-3 transition duration-300 hover:border-gold/40 [&_img]:brightness-110">
                <ProductCard product={p} dark />
              </div>
            </div>
          ))}
        </div>

        <div className="mt-10 flex justify-center">
          <Link href="/products?collection=luxe">
            <Button variant="outline-gold" size="lg">
              Shop the Collection
            </Button>
          </Link>
        </div>
      </div>

    </section>
  )
}
