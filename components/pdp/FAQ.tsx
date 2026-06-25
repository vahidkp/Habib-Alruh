'use client'

import { useState } from 'react'
import { Plus } from 'lucide-react'
import { AnimatePresence, motion } from 'framer-motion'
import type { Product } from '@/lib/products'

export function FAQ({ product }: { product: Product }) {
  const faqs = [
    {
      q: `How long does ${product.name} last?`,
      a: 'Crafted as an eau de parfum concentration, it typically lasts 6–8 hours on skin and longer on clothing. The base notes reveal themselves slowly, so the scent matures beautifully through the day.',
    },
    {
      q: 'How should I apply and store it?',
      a: 'Spray onto pulse points — wrists, neck, and behind the ears — from roughly 15cm away. Store the bottle upright in a cool, dark place, away from direct sunlight and heat, to preserve the composition.',
    },
    {
      q: 'Is it suitable for sensitive skin?',
      a: 'Our fragrances are crafted with carefully selected naturals and skin-friendly bases. If you have sensitive skin, we recommend a small patch test on the inner forearm before regular use.',
    },
    {
      q: 'Do you ship across the UAE?',
      a: 'Yes — we deliver to all seven Emirates. Orders over AED 200 ship free, and most orders arrive within 1–3 business days, beautifully packaged and ready to gift.',
    },
    {
      q: 'What is your return policy?',
      a: 'Unopened items can be returned within 15 days for a full refund or exchange. For hygiene reasons, opened fragrances are non-returnable unless the product is faulty.',
    },
  ]

  const [open, setOpen] = useState<number | null>(0)

  return (
    <section className="section-pad bg-surface">
      <div className="container-site max-w-3xl">
        <div className="mb-10 text-center">
          <p className="eyebrow mb-2 text-gold">Good to Know</p>
          <h2 className="font-display text-3xl md:text-4xl">Frequently Asked Questions</h2>
        </div>

        <div className="divide-y divide-black/10 border-y border-black/10">
          {faqs.map((item, i) => {
            const isOpen = open === i
            return (
              <div key={item.q}>
                <button
                  onClick={() => setOpen(isOpen ? null : i)}
                  aria-expanded={isOpen}
                  className="flex w-full items-center justify-between gap-6 py-5 text-left"
                >
                  <span className="font-display text-lg md:text-xl">{item.q}</span>
                  <motion.span
                    animate={{ rotate: isOpen ? 45 : 0 }}
                    transition={{ duration: 0.25 }}
                    className="grid h-8 w-8 shrink-0 place-items-center rounded-full border border-black/15 text-gold"
                  >
                    <Plus size={16} />
                  </motion.span>
                </button>
                <AnimatePresence initial={false}>
                  {isOpen && (
                    <motion.div
                      initial={{ height: 0, opacity: 0 }}
                      animate={{ height: 'auto', opacity: 1 }}
                      exit={{ height: 0, opacity: 0 }}
                      transition={{ duration: 0.3, ease: [0.22, 1, 0.36, 1] }}
                      className="overflow-hidden"
                    >
                      <p className="max-w-2xl pb-6 text-sm leading-relaxed text-taupe">{item.a}</p>
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>
            )
          })}
        </div>
      </div>
    </section>
  )
}
