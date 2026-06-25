import { EditorialImage } from '@/components/ui/EditorialImage'
import { Reveal } from '@/components/ui/Reveal'
import { cn } from '@/lib/utils'
import type { Product } from '@/lib/products'

/** Alternating image/text storytelling blocks (myop/Naseem-style). */
export function FragranceStory({ product }: { product: Product }) {
  const blocks = [
    { seed: `${product.slug}-story`, text: product.story },
    { seed: `${product.slug}-3`, text: product.description },
    {
      seed: `${product.slug}-4`,
      text: `Built on ${product.notes.base.join(', ').toLowerCase()} at the base and lifted by ${product.notes.top
        .join(' and ')
        .toLowerCase()} at the top — ${product.tagline.toLowerCase()}, composed to evolve with you through the day.`,
    },
  ]

  return (
    <section className="section-pad border-t border-black/[0.08] bg-surface">
      <div className="container-site">
        <div className="mb-14 text-center">
          <p className="eyebrow mb-2 text-gold">The Story</p>
          <h2 className="font-display text-3xl md:text-4xl">The Fragrance Story</h2>
        </div>

        <div className="space-y-12 md:space-y-20">
          {blocks.map((b, i) => (
            <Reveal key={i}>
              <div className="grid items-center gap-8 md:grid-cols-2 md:gap-16">
                <p
                  className={cn(
                    'text-taupe md:text-lg md:leading-relaxed',
                    i % 2 === 0 ? 'md:order-1 md:text-right' : 'md:order-2 md:text-left',
                  )}
                >
                  {b.text}
                </p>
                <EditorialImage
                  seed={b.seed}
                  label={product.name}
                  className={cn('aspect-[4/3] w-full', i % 2 === 0 ? 'md:order-2' : 'md:order-1')}
                />
              </div>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  )
}
