import Link from 'next/link'
import { ArrowRight } from 'lucide-react'
import { SectionHeader } from '@/components/ui/SectionHeader'
import { EditorialImage } from '@/components/ui/EditorialImage'
import { Reveal } from '@/components/ui/Reveal'

const CARDS = [
  { name: 'Fresh', seed: 'sig-fresh', copy: 'Crisp citrus and sea air for every day.', href: '/products?category=fresh' },
  { name: 'Floral', seed: 'sig-floral', copy: 'Petals, dew, and quiet romance.', href: '/products?category=floral' },
  { name: 'Woody', seed: 'sig-woody', copy: 'Smoke, cedar, and warm resin.', href: '/products?category=woody' },
]

export function SignatureSeries() {
  return (
    <section className="section-pad border-t border-black/[0.08] bg-ivory">
      <div className="container-site">
        <Reveal className="mb-10 text-center">
          <SectionHeader lead="Signature" trail="Series" align="center" />
          <p className="mx-auto mt-3 max-w-md text-taupe">
            Three olfactory families, each composed to be unmistakably ours.
          </p>
        </Reveal>

        <div className="grid gap-5 md:grid-cols-3">
          {CARDS.map((c, i) => (
            <Reveal key={c.name} delay={i * 0.1}>
              <Link href={c.href} className="group relative block aspect-[5/6] overflow-hidden rounded-card bg-surface shadow-card">
                <EditorialImage seed={c.seed} rounded={false} className="h-full w-full transition-transform duration-700 group-hover:scale-105" />
                <div className="absolute inset-0 bg-gradient-to-t from-ink/55 via-transparent to-transparent" />
                <div className="absolute inset-x-0 bottom-0 flex items-end justify-between gap-3 p-6 text-white">
                  <div>
                    <h3 className="font-display text-3xl">{c.name}</h3>
                    <p className="mt-1 max-w-[200px] text-xs text-white/80">{c.copy}</p>
                  </div>
                  <span className="grid h-10 w-10 shrink-0 place-items-center rounded-full border border-white/60 transition group-hover:border-gold group-hover:bg-gold group-hover:text-ink">
                    <ArrowRight size={18} />
                  </span>
                </div>
              </Link>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  )
}
