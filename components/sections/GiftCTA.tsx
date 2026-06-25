import Link from 'next/link'
import { Button } from '@/components/ui/Button'
import { EditorialImage } from '@/components/ui/EditorialImage'

export function GiftCTA() {
  return (
    <section className="grid bg-ink text-white md:grid-cols-2">
      {/* Text panel */}
      <div className="order-2 flex flex-col justify-center px-6 py-16 md:order-1 md:px-12 md:py-24 lg:px-20">
        <div className="max-w-md">
          <p className="eyebrow mb-4 text-gold">The Art of Gifting</p>
          <h2 className="font-display text-4xl leading-tight md:text-5xl lg:text-6xl">
            A Gift That Lasts a Lifetime
          </h2>
          <p className="mt-5 text-white/70">
            Build a bespoke gift set — hand-wrapped, engraved, and composed around the people
            you love most.
          </p>
          <Link href="/products?collection=gifts" className="mt-8 inline-block">
            <Button variant="gold" size="lg">
              Build a Gift Set
            </Button>
          </Link>
        </div>
      </div>

      {/* Image */}
      <div className="relative order-1 min-h-[320px] md:order-2 md:min-h-[560px]">
        <EditorialImage
          seed="gift-box"
          rounded={false}
          sizes="(max-width: 768px) 100vw, 50vw"
          className="absolute inset-0 h-full w-full [&_img]:brightness-110"
        />
        {/* seam blend into the dark panel on desktop */}
        <div className="absolute inset-y-0 left-0 hidden w-24 bg-gradient-to-r from-ink to-transparent md:block" />
      </div>
    </section>
  )
}
