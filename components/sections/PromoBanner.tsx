import Link from 'next/link'
import { Button } from '@/components/ui/Button'

export function PromoBanner() {
  return (
    <section className="overflow-hidden bg-ink py-16 text-center text-white md:py-20">
      <div className="relative flex whitespace-nowrap">
        <div className="flex animate-marquee">
          {Array.from({ length: 6 }).map((_, i) => (
            <span
              key={i}
              className="mx-8 font-display text-5xl text-white/90 md:text-7xl"
            >
              BUY 3 PAY FOR 2 <span className="text-gold">·</span>
            </span>
          ))}
        </div>
        <div className="absolute top-0 flex animate-marquee" aria-hidden>
          {Array.from({ length: 6 }).map((_, i) => (
            <span key={i} className="mx-8 font-display text-5xl text-white/90 md:text-7xl">
              BUY 3 PAY FOR 2 <span className="text-gold">·</span>
            </span>
          ))}
        </div>
      </div>
      <div className="container-site mt-8">
        <p className="text-sm text-white/60">On selected fragrances — limited time</p>
        <Link href="/products?collection=offer" className="mt-5 inline-block">
          <Button variant="outline-light" size="md">
            Shop the Offer
          </Button>
        </Link>
      </div>
    </section>
  )
}
