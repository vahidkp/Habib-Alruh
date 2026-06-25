import Link from 'next/link'
import { EditorialImage } from '@/components/ui/EditorialImage'

const COLS = [
  { label: 'For Him', seed: 'gender-him-bw', href: '/products?gender=him' },
  { label: 'For Her', seed: 'gender-her-bw', href: '/products?gender=her' },
]

export function ShopByGender() {
  return (
    <section className="grid md:grid-cols-2">
      {COLS.map((c) => (
        <Link
          key={c.label}
          href={c.href}
          className="group relative block h-[60vh] min-h-[420px] overflow-hidden"
        >
          <EditorialImage
            seed={c.seed}
            rounded={false}
            className="h-full w-full grayscale transition-all duration-700 group-hover:grayscale-0 group-hover:scale-105"
          />
          <div className="absolute inset-0 bg-ink/30 transition group-hover:bg-amber/10" />
          <div className="absolute inset-0 flex flex-col items-center justify-center text-white">
            <h3 className="font-display text-5xl md:text-6xl">{c.label}</h3>
            <span className="mt-4 border-b border-gold pb-1 text-xs font-medium uppercase tracking-[0.18em] text-gold">
              Shop Now
            </span>
          </div>
        </Link>
      ))}
    </section>
  )
}
