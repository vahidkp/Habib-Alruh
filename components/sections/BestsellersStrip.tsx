import Link from 'next/link'
import { ArrowRight } from 'lucide-react'
import { SectionHeader } from '@/components/ui/SectionHeader'
import { ProductCard } from '@/components/ui/ProductCard'
import { Reveal } from '@/components/ui/Reveal'
import { getBestsellers } from '@/lib/products'

export function BestsellersStrip() {
  const products = getBestsellers(6)
  return (
    <section className="section-pad bg-ivory">
      <div className="container-site">
        <Reveal className="mb-8 flex items-end justify-between">
          <div>
            <p className="eyebrow mb-2 text-gold">Discover</p>
            <SectionHeader lead="Our" trail="Bestsellers" />
          </div>
          <Link
            href="/products?sort=bestsellers"
            className="hidden items-center gap-1 text-sm font-medium uppercase tracking-[0.12em] text-ink transition hover:text-gold md:flex"
          >
            View All <ArrowRight size={16} />
          </Link>
        </Reveal>

        <div className="no-scrollbar -mx-5 flex snap-x snap-mandatory gap-5 overflow-x-auto px-5 md:mx-0 md:px-0">
          {products.map((p) => (
            <div key={p.id} className="w-[68%] shrink-0 snap-start sm:w-[42%] md:w-[31%] lg:w-[22%]">
              <ProductCard product={p} />
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
