import Link from 'next/link'
import { Button } from '@/components/ui/Button'
import { ProductCard } from '@/components/ui/ProductCard'
import { Reveal } from '@/components/ui/Reveal'
import { getProducts } from '@/lib/products'

export function LuxeCollection() {
  const products = getProducts({ category: 'oriental' }).concat(getProducts({ category: 'woody' })).slice(0, 5)
  return (
    <section className="relative overflow-hidden bg-ink py-20 text-white md:py-28">
      <div className="container-site">
        <Reveal className="mb-10 max-w-xl">
          <p className="eyebrow text-gold">Cosmopolitan Luxe</p>
          <p className="mt-4 font-accent text-2xl italic text-white/80 md:text-3xl">
            For the cosmopolitan soul — scents that move between cities, seasons, and selves.
          </p>
        </Reveal>

        <div className="no-scrollbar -mx-5 flex gap-5 overflow-x-auto px-5 md:mx-0 md:px-0">
          {products.map((p) => (
            <div key={p.id} className="w-[68%] shrink-0 sm:w-[42%] md:w-[28%] lg:w-[22%]">
              <ProductCard product={p} dark />
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

      {/* Watermark wordmark */}
      <p className="pointer-events-none mt-16 select-none text-center font-display text-[16vw] leading-none text-white/[0.04]">
        HABIB ALRUH
      </p>
    </section>
  )
}
