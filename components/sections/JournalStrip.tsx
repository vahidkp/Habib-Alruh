import Link from 'next/link'
import { SectionHeader } from '@/components/ui/SectionHeader'
import { EditorialImage } from '@/components/ui/EditorialImage'
import { Reveal } from '@/components/ui/Reveal'

const ARTICLES = [
  {
    seed: 'journal-saffron',
    tag: 'Ingredient',
    title: 'Why Saffron Is the Most Coveted Note in Perfumery',
  },
  {
    seed: 'journal-layering',
    tag: 'How To',
    title: 'The Art of Layering: Building a Signature Scent',
  },
]

export function JournalStrip() {
  return (
    <section className="section-pad bg-surface">
      <div className="container-site">
        <Reveal className="mb-10">
          <p className="eyebrow mb-2 text-taupe">From the</p>
          <SectionHeader lead="Journal" trail="" />
        </Reveal>

        <div className="grid gap-6 md:grid-cols-2">
          {ARTICLES.map((a, i) => (
            <Reveal key={a.title} delay={i * 0.1}>
              <Link href="/#journal" className="group block">
                <div className="relative aspect-[16/10] overflow-hidden rounded-card">
                  <EditorialImage seed={a.seed} rounded={false} className="h-full w-full transition-transform duration-700 group-hover:scale-105" />
                </div>
                <p className="eyebrow mt-4 text-gold">{a.tag}</p>
                <h3 className="mt-2 font-display text-2xl leading-snug transition group-hover:text-gold">
                  {a.title}
                </h3>
                <span className="mt-3 inline-block text-sm font-medium uppercase tracking-[0.12em] text-ink">
                  Read More →
                </span>
              </Link>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  )
}
