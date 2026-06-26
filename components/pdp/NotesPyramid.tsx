import { Reveal } from '@/components/ui/Reveal'
import { EditorialImage } from '@/components/ui/EditorialImage'
import type { Product } from '@/lib/products'

const TIERS = [
  { key: 'top', label: 'Top Notes' },
  { key: 'middle', label: 'Heart Notes' },
  { key: 'base', label: 'Base Notes' },
] as const

// note → image seed; drop public/images/note-<slug>.jpg (+ add to lib/images.ts)
// to replace the swatch with a real ingredient photo automatically.
const noteSeed = (s: string) => 'note-' + s.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/^-|-$/g, '')

export function NotesPyramid({ notes }: { notes: Product['notes'] }) {
  return (
    <section className="section-pad border-t border-black/[0.08] bg-surface">
      <div className="container-site">
        <div className="mb-12 text-center">
          <p className="eyebrow mb-2 text-gold">The Composition</p>
          <h2 className="font-display text-3xl md:text-4xl">Fragrance Notes</h2>
        </div>

        <Reveal>
          <div className="grid gap-12 md:grid-cols-3 md:divide-x md:divide-black/10">
            {TIERS.map((tier) => (
              <div key={tier.key} className="text-center md:px-4">
                <h3 className="font-display text-xl">{tier.label}</h3>

                <div className="mt-6 flex flex-wrap justify-center gap-x-8 gap-y-8">
                  {notes[tier.key].map((n) => (
                    <figure key={n} className="w-20">
                      <div className="mx-auto h-[72px] w-[72px] overflow-hidden rounded-full bg-ivory ring-1 ring-black/10 md:h-20 md:w-20">
                        <EditorialImage seed={noteSeed(n)} rounded={false} className="h-full w-full" />
                      </div>
                      <figcaption className="mt-3 text-sm text-ink">{n}</figcaption>
                    </figure>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </Reveal>
      </div>
    </section>
  )
}
