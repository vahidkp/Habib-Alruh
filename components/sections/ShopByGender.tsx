import Link from 'next/link'
import { ArrowUpRight } from 'lucide-react'
import { EditorialImage } from '@/components/ui/EditorialImage'
import { SectionHeader } from '@/components/ui/SectionHeader'
import { Reveal } from '@/components/ui/Reveal'

const COLS = [
  { label: 'For Him', seed: 'gender-him-bw', copy: 'Bold, woody, and quietly commanding.', href: '/products?gender=him' },
  { label: 'For Her', seed: 'gender-her-bw', copy: 'Luminous florals and warm amber depth.', href: '/products?gender=her' },
]

export function ShopByGender() {
  return (
    <section className="section-pad border-t border-black/[0.08] bg-surface">
      <div className="container-site">
        <Reveal className="mb-10 text-center">
          <p className="eyebrow mb-2 text-taupe">Find Your Match</p>
          <SectionHeader lead="Shop by" trail="Gender" align="center" />
        </Reveal>

        <div className="grid gap-6 md:grid-cols-2 md:gap-8">
          {COLS.map((c, i) => (
            <Reveal key={c.label} delay={i * 0.1}>
              <Link
                href={c.href}
                className="group relative block aspect-[5/6] overflow-hidden rounded-card ring-1 ring-black/5 transition duration-500 hover:ring-gold/40 hover:ring-2"
              >
                <EditorialImage
                  seed={c.seed}
                  rounded={false}
                  sizes="(max-width: 768px) 100vw, 50vw"
                  className="h-full w-full grayscale transition duration-[1100ms] ease-out will-change-transform group-hover:scale-105 group-hover:grayscale-0"
                />
                {/* base + hover-deepening gradient for drama and legibility */}
                <div className="absolute inset-0 bg-gradient-to-t from-ink/85 via-ink/20 to-transparent" />
                <div className="absolute inset-0 bg-ink/0 transition-colors duration-500 group-hover:bg-ink/15" />

                <span className="absolute right-5 top-5 grid h-11 w-11 place-items-center rounded-full bg-white/90 text-ink transition duration-300 group-hover:scale-110 group-hover:bg-gold">
                  <ArrowUpRight size={20} className="transition-transform duration-300 group-hover:-translate-y-0.5 group-hover:translate-x-0.5" />
                </span>

                <div className="absolute inset-x-0 bottom-0 p-6 text-white transition-transform duration-500 ease-out group-hover:-translate-y-1 md:p-8">
                  <h3 className="font-display text-4xl md:text-5xl">{c.label}</h3>
                  <p className="mt-1 text-sm text-white/75">{c.copy}</p>
                  <span className="relative mt-3 inline-block text-[11px] font-semibold uppercase tracking-[0.2em] text-gold">
                    Shop Now
                    <span className="absolute -bottom-1 left-0 h-px w-full origin-right scale-x-0 bg-gold transition-transform duration-300 ease-out group-hover:origin-left group-hover:scale-x-100" />
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
