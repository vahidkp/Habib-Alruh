import Link from 'next/link'
import { SectionHeader } from '@/components/ui/SectionHeader'
import { EditorialImage } from '@/components/ui/EditorialImage'
import { Reveal } from '@/components/ui/Reveal'

const CARDS = [
  { name: 'Fresh', seed: 'sig-fresh', copy: 'Crisp citrus and sea air for the everyday.', href: '/products?category=fresh' },
  { name: 'Floral', seed: 'sig-floral', copy: 'Petals, dew, and quiet romance.', href: '/products?category=floral' },
  { name: 'Woody', seed: 'sig-woody', copy: 'Smoke, cedar, and warm resin.', href: '/products?category=woody' },
]

export function SignatureSeries() {
  return (
    <section className="section-pad bg-surface">
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
              <Link href={c.href} className="group relative block aspect-[3/4] overflow-hidden rounded-card">
                <EditorialImage seed={c.seed} rounded={false} className="h-full w-full transition-transform duration-700 group-hover:scale-105" />
                <div className="absolute inset-0 bg-gradient-to-t from-ink/80 via-ink/20 to-transparent transition group-hover:from-ink/90" />
                <div className="absolute inset-x-0 bottom-0 p-7 text-white">
                  <h3 className="font-display text-4xl">{c.name}</h3>
                  <p className="mt-2 max-w-xs text-sm text-white/70">{c.copy}</p>
                  <span className="mt-4 inline-block translate-y-2 text-xs font-medium uppercase tracking-[0.16em] text-gold opacity-0 transition-all duration-300 group-hover:translate-y-0 group-hover:opacity-100">
                    Explore →
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
