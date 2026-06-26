'use client'

import { useEffect, useState, useCallback } from 'react'
import { AnimatePresence, motion } from 'framer-motion'
import { ChevronLeft, ChevronRight } from 'lucide-react'
import Link from 'next/link'
import { Button } from '@/components/ui/Button'
import { EditorialImage } from '@/components/ui/EditorialImage'

const SLIDES = [
  {
    seed: 'hero-silence',
    eyebrow: 'Signature Series',
    title: 'Born from\nSilence',
    subtitle: 'Golden desert dunes captured in a single, lingering breath.',
    cta: 'Shop Collection',
    href: '/products?category=woody',
    obj: 'object-[70%_center] md:object-center',
  },
  {
    seed: 'hero-bloom',
    eyebrow: 'Floral Edit',
    title: 'Midnight\nJasmine',
    subtitle: 'Night-blooming intensity for those who own the dark.',
    cta: 'Explore',
    href: '/products/midnight-jasmine-100ml',
    obj: 'object-center',
  },
  {
    seed: 'saffron-noir-100ml-2',
    eyebrow: 'New Arrival',
    title: 'Introducing\nSaffron Noir',
    subtitle: 'Smoke, saffron, and gold — a fragrance that arrives before you do.',
    cta: 'Discover Now',
    href: '/products/saffron-noir-100ml',
    obj: 'object-[55%_center] md:object-center',
  },
]

export function HeroCarousel() {
  const [index, setIndex] = useState(0)
  const go = useCallback((dir: number) => setIndex((i) => (i + dir + SLIDES.length) % SLIDES.length), [])

  useEffect(() => {
    const t = setInterval(() => go(1), 6000)
    return () => clearInterval(t)
  }, [go])

  const slide = SLIDES[index]

  return (
    <section className="relative h-[88svh] min-h-[600px] w-full overflow-hidden bg-ink md:h-[90vh]">
      <AnimatePresence mode="sync">
        <motion.div
          key={slide.seed}
          className="absolute inset-0"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.6 }}
        >
          <EditorialImage
            seed={slide.seed}
            rounded={false}
            priority
            sizes="100vw"
            className="h-full w-full"
            imgClassName={slide.obj}
          >
            <div className="absolute inset-0 animate-kenburns bg-transparent" />
          </EditorialImage>
          <div className="absolute inset-0 bg-gradient-to-t from-ink/85 via-ink/20 to-transparent" />
        </motion.div>
      </AnimatePresence>

      <div className="container-site relative flex h-full flex-col justify-end pb-24 md:justify-center md:pb-0">
        <AnimatePresence mode="wait">
          <motion.div
            key={slide.title}
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
            className="max-w-2xl text-white"
          >
            <p className="eyebrow mb-4 text-gold">{slide.eyebrow}</p>
            <h1 className="whitespace-pre-line font-display text-5xl leading-[0.95] md:text-7xl lg:text-8xl">
              {slide.title}
            </h1>
            <p className="mt-6 max-w-md font-body text-base text-white/75 md:text-lg">
              {slide.subtitle}
            </p>
            <Link href={slide.href} className="mt-8 inline-block">
              <Button variant="gold" size="lg">
                {slide.cta}
              </Button>
            </Link>
          </motion.div>
        </AnimatePresence>
      </div>

      {/* Arrows */}
      <div className="absolute bottom-8 right-6 z-10 flex gap-2 md:right-10">
        <button
          onClick={() => go(-1)}
          aria-label="Previous slide"
          className="grid h-11 w-11 place-items-center rounded-full border border-white/30 text-white transition hover:border-gold hover:text-gold"
        >
          <ChevronLeft size={20} />
        </button>
        <button
          onClick={() => go(1)}
          aria-label="Next slide"
          className="grid h-11 w-11 place-items-center rounded-full border border-white/30 text-white transition hover:border-gold hover:text-gold"
        >
          <ChevronRight size={20} />
        </button>
      </div>

      {/* Dots */}
      <div className="absolute bottom-8 left-1/2 z-10 flex -translate-x-1/2 gap-2">
        {SLIDES.map((_, i) => (
          <button
            key={i}
            onClick={() => setIndex(i)}
            aria-label={`Go to slide ${i + 1}`}
            className={`h-1.5 rounded-full transition-all ${
              i === index ? 'w-8 bg-gold' : 'w-2 bg-white/40'
            }`}
          />
        ))}
      </div>
    </section>
  )
}
