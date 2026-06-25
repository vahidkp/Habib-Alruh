import { Reveal } from '@/components/ui/Reveal'
import type { Product } from '@/lib/products'

const TIERS = [
  { key: 'top', label: 'Top Notes', width: 'max-w-[280px]' },
  { key: 'middle', label: 'Heart Notes', width: 'max-w-[420px]' },
  { key: 'base', label: 'Base Notes', width: 'max-w-[560px]' },
] as const

export function NotesPyramid({ notes }: { notes: Product['notes'] }) {
  return (
    <section className="section-pad bg-surface">
      <div className="container-site text-center">
        <p className="eyebrow mb-2 text-gold">The Composition</p>
        <h2 className="font-display text-3xl md:text-4xl">Notes Pyramid</h2>

        <div className="mt-12 flex flex-col items-center gap-4">
          {TIERS.map((tier, i) => (
            <Reveal key={tier.key} delay={i * 0.15} className={`w-full ${tier.width}`}>
              <div className="rounded-card border border-black/10 bg-ivory px-6 py-5">
                <p className="eyebrow mb-2 text-taupe">{tier.label}</p>
                <div className="flex flex-wrap justify-center gap-2">
                  {notes[tier.key].map((n) => (
                    <span
                      key={n}
                      className="rounded-full bg-surface px-3 py-1 text-sm shadow-sm"
                    >
                      {n}
                    </span>
                  ))}
                </div>
              </div>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  )
}
