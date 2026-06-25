'use client'

import { useState } from 'react'
import { AnimatePresence, motion } from 'framer-motion'
import { ChevronLeft, ChevronRight, BadgeCheck } from 'lucide-react'
import { Stars } from '@/components/ui/Stars'

const REVIEWS = [
  {
    name: 'Ananya R.',
    text: 'Saffron Noir is the first fragrance I&apos;ve had strangers stop me to ask about. It lasts all day and somehow smells expensive and intimate at once.',
    rating: 5,
  },
  {
    name: 'Karan M.',
    text: 'Born from Silence is my everyday signature now. Warm, woody, never overpowering. The packaging alone feels like a gift.',
    rating: 5,
  },
  {
    name: 'Sofia D.',
    text: 'I bought Midnight Jasmine on a whim and I&apos;m obsessed. The dry-down after a few hours is unreal. Worth every rupee.',
    rating: 4,
  },
]

export function ReviewsBanner() {
  const [i, setI] = useState(0)
  const go = (d: number) => setI((p) => (p + d + REVIEWS.length) % REVIEWS.length)
  const r = REVIEWS[i]

  return (
    <section className="section-pad bg-ivory">
      <div className="container-site max-w-3xl text-center">
        <div className="flex items-center justify-center gap-3">
          <Stars value={4.8} size={20} />
          <span className="font-display text-2xl">4.8 / 5.0</span>
        </div>
        <p className="mt-2 text-sm text-taupe">from 2,400+ verified reviews</p>

        <div className="relative mt-10 min-h-[180px]">
          <AnimatePresence mode="wait">
            <motion.figure
              key={i}
              initial={{ opacity: 0, y: 16 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -16 }}
              transition={{ duration: 0.4 }}
            >
              <blockquote
                className="font-display text-2xl leading-relaxed text-ink md:text-3xl"
                dangerouslySetInnerHTML={{ __html: `&ldquo;${r.text}&rdquo;` }}
              />
              <figcaption className="mt-6 flex items-center justify-center gap-2 text-sm">
                <Stars value={r.rating} />
                <span className="font-semibold">{r.name}</span>
                <span className="inline-flex items-center gap-1 text-gold">
                  <BadgeCheck size={15} /> Verified
                </span>
              </figcaption>
            </motion.figure>
          </AnimatePresence>
        </div>

        <div className="mt-8 flex items-center justify-center gap-3">
          <button onClick={() => go(-1)} aria-label="Previous review" className="grid h-10 w-10 place-items-center rounded-full border border-black/15 transition hover:border-gold hover:text-gold">
            <ChevronLeft size={18} />
          </button>
          <button onClick={() => go(1)} aria-label="Next review" className="grid h-10 w-10 place-items-center rounded-full border border-black/15 transition hover:border-gold hover:text-gold">
            <ChevronRight size={18} />
          </button>
        </div>
      </div>
    </section>
  )
}
