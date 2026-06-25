import { Quote, BadgeCheck } from 'lucide-react'
import { Stars } from '@/components/ui/Stars'
import { Reveal } from '@/components/ui/Reveal'

const REVIEWS = [
  {
    name: 'Ananya R.',
    product: 'Saffron Noir',
    rating: 5,
    text: "The first fragrance I've had strangers stop me to ask about. It lasts all day and somehow smells expensive and intimate at once.",
  },
  {
    name: 'Karan M.',
    product: 'Born from Silence',
    rating: 5,
    text: 'My everyday signature now. Warm, woody, never overpowering — and the packaging alone feels like a gift.',
  },
  {
    name: 'Sofia D.',
    product: 'Midnight Jasmine',
    rating: 4,
    text: "Bought it on a whim and I'm obsessed. The dry-down after a few hours is unreal. Worth every dirham.",
  },
]

const initials = (name: string) =>
  name
    .split(' ')
    .map((w) => w[0])
    .join('')

export function ReviewsBanner() {
  return (
    <section className="section-pad border-t border-black/[0.08] bg-ivory">
      <div className="container-site">
        <Reveal className="mb-12 text-center">
          <p className="eyebrow mb-2 text-gold">Testimonials</p>
          <h2 className="font-display text-3xl md:text-4xl">Loved by Thousands</h2>
          <div className="mt-4 flex flex-wrap items-center justify-center gap-x-3 gap-y-1">
            <Stars value={4.8} size={18} />
            <span className="font-geo text-2xl">4.8 / 5.0</span>
            <span className="text-sm text-taupe">· from 2,400+ verified reviews</span>
          </div>
        </Reveal>

        <div className="grid gap-6 md:grid-cols-3">
          {REVIEWS.map((r, i) => (
            <Reveal key={r.name} delay={i * 0.1}>
              <figure className="flex h-full flex-col rounded-card border border-black/10 bg-surface p-7 shadow-card transition duration-300 hover:-translate-y-1 hover:border-gold/30 hover:shadow-card-hover">
                <Quote size={28} className="fill-gold/20 text-gold" />
                <Stars value={r.rating} className="mt-4" />
                <blockquote className="mt-3 flex-1 text-[15px] leading-relaxed text-ink/85">
                  {`“${r.text}”`}
                </blockquote>
                <figcaption className="mt-6 flex items-center gap-3 border-t border-black/5 pt-5">
                  <span className="grid h-10 w-10 shrink-0 place-items-center rounded-full bg-gold/15 font-display text-sm text-gold">
                    {initials(r.name)}
                  </span>
                  <div>
                    <p className="text-sm font-semibold text-ink">{r.name}</p>
                    <p className="inline-flex items-center gap-1 text-xs text-gold">
                      <BadgeCheck size={13} /> Verified · {r.product}
                    </p>
                  </div>
                </figcaption>
              </figure>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  )
}
