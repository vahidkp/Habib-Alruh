import Link from 'next/link'
import { Button } from '@/components/ui/Button'

const PHRASES = [
  'Buy 3, Pay for 2',
  'Free Delivery Across the UAE',
  'Crafted in Small Batches',
  '15-Day Easy Returns',
  'Hand-Wrapped Gifting',
]

export function PromoBanner() {
  // Duplicated once so the -50% marquee loop is seamless.
  const track = [...PHRASES, ...PHRASES]

  return (
    <section className="overflow-hidden border-y border-black/10 bg-ivory py-12 md:py-16">
      <div className="flex w-max animate-marquee whitespace-nowrap [animation-duration:40s]">
        {track.map((phrase, i) => (
          <span key={i} className="flex items-center font-display text-4xl text-ink md:text-6xl lg:text-7xl">
            {phrase}
            <span className="mx-7 text-2xl text-gold md:mx-10 md:text-4xl">✦</span>
          </span>
        ))}
      </div>

      <div className="container-site mt-8 text-center">
        <p className="text-sm text-taupe">Limited-time offers on selected fragrances</p>
        <Link href="/products?collection=offer" className="mt-5 inline-block">
          <Button variant="dark" size="md">
            Shop the Offer
          </Button>
        </Link>
      </div>
    </section>
  )
}
