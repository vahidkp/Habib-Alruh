'use client'

import { useState } from 'react'
import { Stars } from '@/components/ui/Stars'
import { Button } from '@/components/ui/Button'
import { BadgeCheck, X } from 'lucide-react'
import { AnimatePresence, motion } from 'framer-motion'
import type { Product } from '@/lib/products'

const SAMPLE = [
  { name: 'Priya N.', rating: 5, date: '2 weeks ago', text: 'Absolutely stunning. Longevity is incredible and the bottle is a work of art.', helpful: 24 },
  { name: 'Rahul S.', rating: 4, date: '1 month ago', text: 'Beautiful scent, very unique. Took a moment to grow on me but now I reach for it daily.', helpful: 11 },
  { name: 'Meera J.', rating: 5, date: '1 month ago', text: 'Compliments every single time I wear this. Worth every rupee.', helpful: 32 },
]

const BREAKDOWN = [
  { stars: 5, pct: 78 },
  { stars: 4, pct: 15 },
  { stars: 3, pct: 4 },
  { stars: 2, pct: 2 },
  { stars: 1, pct: 1 },
]

export function ReviewsSection({ product }: { product: Product }) {
  const [sort, setSort] = useState<'recent' | 'helpful'>('helpful')
  const [open, setOpen] = useState(false)

  const reviews = [...SAMPLE].sort((a, b) =>
    sort === 'helpful' ? b.helpful - a.helpful : 0,
  )

  return (
    <section className="section-pad bg-ivory">
      <div className="container-site">
        <h2 className="font-display text-3xl md:text-4xl">Customer Reviews</h2>

        <div className="mt-8 grid gap-10 md:grid-cols-[280px_1fr]">
          {/* Aggregate */}
          <div>
            <div className="flex items-end gap-2">
              <span className="font-display text-6xl">{product.rating.toFixed(1)}</span>
              <span className="pb-2 text-taupe">/ 5</span>
            </div>
            <Stars value={product.rating} size={18} />
            <p className="mt-1 text-sm text-taupe">{product.reviewCount} reviews</p>

            <div className="mt-5 space-y-2">
              {BREAKDOWN.map((b) => (
                <div key={b.stars} className="flex items-center gap-2 text-xs">
                  <span className="w-6 text-taupe">{b.stars}★</span>
                  <div className="h-2 flex-1 overflow-hidden rounded-full bg-black/10">
                    <div className="h-full rounded-full bg-gold" style={{ width: `${b.pct}%` }} />
                  </div>
                  <span className="w-8 text-right text-taupe">{b.pct}%</span>
                </div>
              ))}
            </div>

            <Button variant="dark" className="mt-6 w-full" onClick={() => setOpen(true)}>
              Write a Review
            </Button>
          </div>

          {/* List */}
          <div>
            <div className="mb-4 flex items-center gap-4 text-sm">
              <span className="text-taupe">Sort by</span>
              {(['helpful', 'recent'] as const).map((s) => (
                <button
                  key={s}
                  onClick={() => setSort(s)}
                  className={sort === s ? 'font-semibold text-ink' : 'text-taupe'}
                >
                  {s === 'helpful' ? 'Most Helpful' : 'Most Recent'}
                </button>
              ))}
            </div>

            <div className="divide-y divide-black/10">
              {reviews.map((r) => (
                <article key={r.name} className="py-5">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-2">
                      <span className="font-semibold">{r.name}</span>
                      <span className="inline-flex items-center gap-1 text-xs text-gold">
                        <BadgeCheck size={14} /> Verified
                      </span>
                    </div>
                    <span className="text-xs text-taupe">{r.date}</span>
                  </div>
                  <Stars value={r.rating} className="mt-1" />
                  <p className="mt-2 text-sm text-ink/80">{r.text}</p>
                  <p className="mt-2 text-xs text-taupe">{r.helpful} found this helpful</p>
                </article>
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* Write review modal */}
      <AnimatePresence>
        {open && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
            <motion.div
              className="absolute inset-0 bg-black/60"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setOpen(false)}
            />
            <motion.div
              role="dialog"
              aria-modal="true"
              className="relative z-10 w-full max-w-md rounded-modal bg-surface p-6"
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.95 }}
            >
              <div className="mb-4 flex items-center justify-between">
                <h3 className="font-display text-2xl">Write a Review</h3>
                <button onClick={() => setOpen(false)} aria-label="Close">
                  <X size={20} />
                </button>
              </div>
              <form
                onSubmit={(e) => {
                  e.preventDefault()
                  setOpen(false)
                }}
                className="space-y-4"
              >
                <input
                  required
                  placeholder="Your name"
                  className="h-11 w-full rounded-button border border-black/15 px-3 text-sm focus:border-gold focus:outline-none"
                />
                <textarea
                  required
                  rows={4}
                  placeholder="Share your experience…"
                  className="w-full rounded-button border border-black/15 p-3 text-sm focus:border-gold focus:outline-none"
                />
                <Button variant="gold" size="lg" className="w-full" type="submit">
                  Submit Review
                </Button>
              </form>
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </section>
  )
}
