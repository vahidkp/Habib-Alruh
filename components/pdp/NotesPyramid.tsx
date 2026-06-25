import { Sparkles, Flower2, TreePine } from 'lucide-react'
import { Reveal } from '@/components/ui/Reveal'
import type { Product } from '@/lib/products'

const TIERS = [
  {
    key: 'top',
    label: 'Top Notes',
    blurb: 'The first impression — bright and fleeting.',
    icon: Sparkles,
    width: 'max-w-[300px]',
  },
  {
    key: 'middle',
    label: 'Heart Notes',
    blurb: 'The character that unfolds after a while.',
    icon: Flower2,
    width: 'max-w-[460px]',
  },
  {
    key: 'base',
    label: 'Base Notes',
    blurb: 'The lasting trail that lingers on skin.',
    icon: TreePine,
    width: 'max-w-[620px]',
  },
] as const

export function NotesPyramid({ notes }: { notes: Product['notes'] }) {
  return (
    <section className="section-pad bg-surface">
      <div className="container-site text-center">
        <p className="eyebrow mb-2 text-gold">The Composition</p>
        <h2 className="font-display text-3xl md:text-4xl">Notes Pyramid</h2>

        <div className="mt-14 flex flex-col items-center gap-4">
          {TIERS.map((tier, i) => (
            <Reveal key={tier.key} delay={i * 0.15} className={`w-full ${tier.width}`}>
              <div className="group relative rounded-card border border-black/10 bg-ivory px-6 pb-6 pt-9 transition-colors hover:border-gold/40">
                {/* Animated icon medallion */}
                <span
                  className="absolute -top-6 left-1/2 grid h-12 w-12 -translate-x-1/2 place-items-center rounded-full border border-gold/30 bg-surface text-gold shadow-card animate-float"
                  style={{ animationDelay: `${i * 0.4}s` }}
                >
                  <tier.icon size={22} className="transition-transform duration-500 group-hover:scale-110" />
                </span>

                <p className="eyebrow mb-1 text-taupe">{tier.label}</p>
                <p className="mb-4 text-xs text-taupe/80">{tier.blurb}</p>
                <div className="flex flex-wrap justify-center gap-2">
                  {notes[tier.key].map((n) => (
                    <span key={n} className="rounded-full bg-surface px-3.5 py-1.5 text-sm shadow-sm ring-1 ring-black/5">
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
