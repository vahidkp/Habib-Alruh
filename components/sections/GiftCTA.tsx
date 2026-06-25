import Link from 'next/link'
import { Button } from '@/components/ui/Button'
import { EditorialImage } from '@/components/ui/EditorialImage'

export function GiftCTA() {
  return (
    <section className="relative h-[70vh] min-h-[480px] w-full overflow-hidden">
      <EditorialImage seed="gift-box" rounded={false} className="absolute inset-0 h-full w-full" />
      <div className="absolute inset-0 bg-gradient-to-r from-ink/85 via-ink/40 to-transparent" />
      <div className="container-site relative flex h-full items-center">
        <div className="max-w-lg text-white">
          <p className="eyebrow mb-4 text-gold">The Art of Gifting</p>
          <h2 className="font-display text-5xl leading-tight md:text-6xl">
            A Gift That Lasts a Lifetime
          </h2>
          <p className="mt-5 max-w-md text-white/75">
            Build a bespoke gift set — hand-wrapped, engraved, and composed around the people
            you love most.
          </p>
          <Link href="/products?collection=gifts" className="mt-7 inline-block">
            <Button variant="gold" size="lg">
              Build a Gift Set
            </Button>
          </Link>
        </div>
      </div>
    </section>
  )
}
