'use client'

import { useEffect, useState } from 'react'
import {
  Minus,
  Plus,
  Heart,
  Share2,
  Truck,
  RotateCcw,
  ShieldCheck,
  Eye,
  Zap,
  Leaf,
  Sparkles,
  BadgeCheck,
  Star,
  Copy,
  Check,
  Search,
  Ticket,
} from 'lucide-react'
import { AnimatePresence, motion } from 'framer-motion'
import { Button } from '@/components/ui/Button'
import { Stars } from '@/components/ui/Stars'
import { EditorialImage } from '@/components/ui/EditorialImage'
import { PaymentIcons } from '@/components/shared/PaymentIcons'
import { useCart } from '@/lib/cart'
import { useWishlist } from '@/lib/wishlist'
import { useHydrated } from '@/lib/hooks'
import { formatAED, cn } from '@/lib/utils'
import { FAMILY_LABEL, type Category, type Product, type Size } from '@/lib/products'

const PERSONALITY: Record<Category, string[]> = {
  fresh: ['Crisp', 'Energetic', 'Effortless'],
  citrus: ['Bright', 'Playful', 'Uplifting'],
  floral: ['Romantic', 'Graceful', 'Luminous'],
  woody: ['Bold', 'Grounded', 'Confident'],
  oriental: ['Mysterious', 'Sensual', 'Opulent'],
}
const INTENSITY: Record<Category, number> = { fresh: 2, citrus: 2, floral: 3, woody: 4, oriental: 5 }
const INTENSITY_LABEL = ['', 'Subtle', 'Light', 'Moderate', 'Strong', 'Intense']

const COUPONS = [
  { code: 'HABIB100', amount: 'Flat AED 100 Off', note: 'On orders over AED 500' },
  { code: 'HABIB50', amount: 'Flat AED 50 Off', note: 'On orders over AED 300' },
]

function hash(s: string) {
  let h = 0
  for (let i = 0; i < s.length; i++) h = (h * 31 + s.charCodeAt(i)) | 0
  return Math.abs(h)
}

function Accordion({
  icon: Icon,
  title,
  defaultOpen = false,
  children,
}: {
  icon: typeof Zap
  title: string
  defaultOpen?: boolean
  children: React.ReactNode
}) {
  const [open, setOpen] = useState(defaultOpen)
  return (
    <div className="border-b border-black/10">
      <button onClick={() => setOpen((o) => !o)} aria-expanded={open} className="flex w-full items-center justify-between py-4">
        <span className="flex items-center gap-3">
          <Icon size={18} className="text-gold" />
          <span className="text-sm font-medium uppercase tracking-[0.12em]">{title}</span>
        </span>
        <motion.span animate={{ rotate: open ? 45 : 0 }} transition={{ duration: 0.25 }} className="text-taupe">
          <Plus size={16} />
        </motion.span>
      </button>
      <AnimatePresence initial={false}>
        {open && (
          <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: 'auto', opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.3, ease: [0.22, 1, 0.36, 1] }}
            className="overflow-hidden"
          >
            <div className="pb-5 text-sm leading-relaxed text-taupe">{children}</div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  )
}

export function ProductHero({ product }: { product: Product }) {
  const sizes = Object.keys(product.price) as Size[]
  const popularSize = sizes[sizes.length - 1]
  const [size, setSize] = useState<Size>(popularSize)
  const [qty, setQty] = useState(1)
  const [activeImg, setActiveImg] = useState(0)
  const [descOpen, setDescOpen] = useState(false)
  const [copied, setCopied] = useState<string | null>(null)
  const [delivery, setDelivery] = useState<string | null>(null)

  const add = useCart((s) => s.add)
  const openCart = useCart((s) => s.open)
  const toggle = useWishlist((s) => s.toggle)
  const ids = useWishlist((s) => s.ids)
  const hydrated = useHydrated()
  const wished = hydrated && ids.includes(product.id)

  // Delivery estimate (client-only to avoid hydration mismatch).
  useEffect(() => {
    const fmt = (d: Date) => d.toLocaleDateString('en-AE', { day: 'numeric', month: 'short' })
    const a = new Date()
    a.setDate(a.getDate() + 2)
    const b = new Date()
    b.setDate(b.getDate() + 4)
    setDelivery(`${fmt(a)} – ${fmt(b)}`)
  }, [])

  const price = product.price[size]!
  const compare = product.compareAt?.[size]
  const off = compare ? Math.round((1 - price / compare) * 100) : 0
  const gallery = [product.slug, `${product.slug}-2`, `${product.slug}-3`, `${product.slug}-4`]
  const viewers = 8 + (hash(product.slug) % 22)
  const intensity = INTENSITY[product.category]
  const traits = PERSONALITY[product.category]
  const noteLabels: Record<string, string> = { top: 'Top Notes', middle: 'Heart Notes', base: 'Base Notes' }

  const copyCode = (code: string) => {
    navigator.clipboard?.writeText(code).catch(() => {})
    setCopied(code)
    setTimeout(() => setCopied(null), 1600)
  }

  const addToCart = () =>
    add({ productId: product.id, slug: product.slug, name: product.name, size, price }, qty)

  return (
    <section className="bg-surface text-ink">
      <div className="container-site grid gap-10 py-8 lg:grid-cols-2 lg:items-start lg:gap-14">
        {/* Gallery — sticky on desktop */}
        <div className="flex gap-3 md:gap-4 lg:sticky lg:top-24">
          <div className="flex flex-col gap-3">
            {gallery.map((seed, i) => (
              <button
                key={seed}
                onClick={() => setActiveImg(i)}
                aria-label={`View image ${i + 1}`}
                className={cn(
                  'h-16 w-16 overflow-hidden rounded-xl border-2 bg-[#f4f3f1] transition md:h-20 md:w-20',
                  activeImg === i ? 'border-gold' : 'border-transparent opacity-70 hover:opacity-100',
                )}
              >
                <EditorialImage seed={seed} rounded={false} className="h-full w-full" />
              </button>
            ))}
          </div>

          <div className="relative flex-1 overflow-hidden rounded-2xl bg-[#f4f3f1]">
            <EditorialImage seed={gallery[activeImg]} label={product.name} rounded={false} className="aspect-square w-full" />
            {/* Floating actions */}
            <div className="absolute right-4 top-4 flex flex-col gap-2">
              <button aria-label="Share" className="grid h-10 w-10 place-items-center rounded-full bg-white text-ink shadow-md transition hover:text-gold">
                <Share2 size={16} />
              </button>
              <button
                onClick={() => toggle(product.id)}
                aria-label="Add to wishlist"
                className="grid h-10 w-10 place-items-center rounded-full bg-white text-ink shadow-md transition hover:scale-110"
              >
                <Heart size={16} className={cn(wished && 'fill-amber text-amber')} />
              </button>
            </div>
            <span className="absolute bottom-4 right-4 grid h-9 w-9 place-items-center rounded-full bg-white/90 text-taupe shadow-md">
              <Search size={15} />
            </span>
          </div>
        </div>

        {/* Details — scrolls */}
        <div>
          {/* Brand pill */}
          <span className="inline-flex rounded-md bg-black/[0.06] px-3 py-1.5 text-xs font-semibold capitalize tracking-wide">
            {product.category} Collection
          </span>

          {/* Name + verified */}
          <h1 className="mt-4 flex items-start gap-2 font-display text-3xl leading-tight tracking-wide md:text-4xl">
            {product.name} · {size}
            <BadgeCheck size={20} className="mt-1 shrink-0 fill-green-500 text-white" />
          </h1>

          {/* Description + read more */}
          <p className={cn('mt-2 text-sm leading-relaxed text-taupe', !descOpen && 'line-clamp-2')}>
            {product.description} {product.story}
          </p>
          <button onClick={() => setDescOpen((o) => !o)} className="mt-1 text-sm font-semibold text-ink hover:text-gold">
            {descOpen ? 'Read Less' : 'Read More'}
          </button>

          {/* Price */}
          <div className="mt-4 flex flex-wrap items-center gap-3">
            <span className="font-geo text-4xl tracking-wide">{formatAED(price)}</span>
            {compare && <span className="text-base text-taupe line-through">{formatAED(compare)}</span>}
            {off > 0 && <span className="text-sm font-semibold text-green-600">{off}% Off</span>}
            <span className="inline-flex items-center gap-1 rounded-md bg-green-500/10 px-2.5 py-1 text-sm font-medium text-green-700">
              <Star size={13} className="fill-green-600 text-green-600" /> {product.rating.toFixed(1)}
            </span>
          </div>
          <p className="mt-1 text-xs text-taupe">{product.concentration} · Inclusive of VAT · {product.reviewCount} reviews</p>

          {/* Urgency */}
          <p className="mt-4 flex items-center gap-2 text-sm text-taupe">
            <Eye size={15} className="text-gold" />
            <span className="relative flex h-2 w-2">
              <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-green-500 opacity-60" />
              <span className="relative inline-flex h-2 w-2 rounded-full bg-green-500" />
            </span>
            <span><span className="font-semibold text-ink">{viewers}</span> people are viewing right now</span>
          </p>

          {/* Scent profile */}
          <div className="mt-5 grid grid-cols-3 divide-x divide-black/10 rounded-card border border-black/10 text-center">
            <div className="px-2 py-3">
              <p className="text-[10px] font-semibold uppercase tracking-[0.14em] text-taupe">Family</p>
              <p className="mt-1 text-sm font-medium capitalize">{FAMILY_LABEL[product.category]}</p>
            </div>
            <div className="px-2 py-3">
              <p className="text-[10px] font-semibold uppercase tracking-[0.14em] text-taupe">Strength</p>
              <p className="mt-1 text-sm font-medium">{product.concentration}</p>
            </div>
            <div className="px-2 py-3">
              <p className="text-[10px] font-semibold uppercase tracking-[0.14em] text-taupe">Sillage</p>
              <p className="mt-1 text-sm font-medium">{INTENSITY_LABEL[intensity]}</p>
            </div>
          </div>

          {/* Size */}
          <div className="mt-6">
            <p className="eyebrow mb-3 text-taupe">Select Size</p>
            <div className="flex flex-wrap gap-3">
              {sizes.map((s) => {
                const popular = s === popularSize
                return (
                  <div key={s} className="relative pt-2">
                    {popular && (
                      <span className="absolute -top-0.5 left-1/2 -translate-x-1/2 whitespace-nowrap rounded-full bg-gold px-2 py-0.5 text-[9px] font-bold uppercase tracking-wide text-ink">
                        Most Popular
                      </span>
                    )}
                    <button
                      onClick={() => setSize(s)}
                      className={cn(
                        'h-12 min-w-[84px] rounded-card border px-4 text-sm font-medium transition',
                        size === s ? 'border-gold bg-gold/10 text-ink' : 'border-black/20 text-ink/80 hover:border-black/50',
                      )}
                    >
                      {s}
                    </button>
                  </div>
                )
              })}
            </div>
          </div>

          {/* Quantity + Add to cart */}
          <div className="mt-6 flex items-stretch gap-3">
            <div className="flex items-center rounded-card border border-black/20">
              <button onClick={() => setQty((q) => Math.max(1, q - 1))} aria-label="Decrease quantity" className="grid h-12 w-12 place-items-center hover:text-gold">
                <Minus size={16} />
              </button>
              <span className="w-10 text-center">{qty}</span>
              <button onClick={() => setQty((q) => q + 1)} aria-label="Increase quantity" className="grid h-12 w-12 place-items-center hover:text-gold">
                <Plus size={16} />
              </button>
            </div>
            <Button variant="gold" size="lg" className="flex-1" onClick={addToCart}>
              Add to Cart · {formatAED(price * qty)}
            </Button>
          </div>
          <Button variant="dark" size="lg" className="mt-3 w-full" onClick={() => { addToCart(); openCart() }}>
            Buy It Now
          </Button>
          <p className="mt-3 text-xs text-taupe">
            or 4 interest-free payments of <span className="font-semibold text-ink">{formatAED(Math.round(price / 4))}</span> with Tabby &amp; Tamara
          </p>

          {/* Delivery estimate */}
          <div className="mt-6 rounded-card border border-black/10 p-4">
            <div className="flex items-center gap-3">
              <Truck size={20} className="text-gold" />
              <div>
                <p className="text-sm font-medium">Standard Delivery across the UAE</p>
                <p className="text-xs text-taupe">
                  {delivery ? <>Delivered between <span className="font-medium text-ink">{delivery}</span></> : 'Delivered in 2–4 business days'}
                  {' · Free over AED 200'}
                </p>
              </div>
            </div>
          </div>

          {/* Coupons */}
          <div className="mt-4">
            <p className="eyebrow mb-3 flex items-center gap-2 text-taupe">
              <Ticket size={14} className="text-gold" /> Save Extra with Coupons
            </p>
            <div className="grid gap-3 sm:grid-cols-2">
              {COUPONS.map((c) => (
                <div key={c.code} className="flex items-center justify-between gap-3 rounded-card border border-dashed border-gold/50 bg-gold/[0.06] p-3">
                  <div>
                    <p className="text-sm font-semibold">{c.amount}</p>
                    <p className="text-[11px] text-taupe">{c.note} · Code {c.code}</p>
                  </div>
                  <button
                    onClick={() => copyCode(c.code)}
                    className="inline-flex shrink-0 items-center gap-1 text-xs font-semibold text-gold"
                  >
                    {copied === c.code ? <><Check size={13} /> Copied</> : <><Copy size={13} /> Copy</>}
                  </button>
                </div>
              ))}
            </div>
          </div>

          {/* Payment methods */}
          <div className="mt-6">
            <p className="eyebrow mb-3 text-taupe">Secure Payment Options</p>
            <PaymentIcons />
          </div>

          {/* Accordions */}
          <div className="mt-7">
            <Accordion icon={Zap} title="Intensity" defaultOpen>
              <div className="flex items-center gap-1.5">
                {[1, 2, 3, 4, 5].map((n) => (
                  <span key={n} className={cn('h-1.5 w-8 rounded-full', n <= intensity ? 'bg-gold' : 'bg-black/10')} />
                ))}
                <span className="ml-3 font-medium text-ink">{INTENSITY_LABEL[intensity]}</span>
              </div>
              <p className="mt-3">
                A {INTENSITY_LABEL[intensity].toLowerCase()} {product.category} sillage — projecting close to the skin
                early on, then settling into a warm, lasting trail.
              </p>
            </Accordion>

            <Accordion icon={Leaf} title="Notes &amp; Composition">
              <div className="mb-3 space-y-2 border-b border-black/10 pb-3">
                <div className="flex justify-between gap-6">
                  <span className="shrink-0 text-xs uppercase tracking-[0.12em] text-taupe">Olfactory Family</span>
                  <span className="text-right capitalize text-ink/85">{FAMILY_LABEL[product.category]}</span>
                </div>
                <div className="flex justify-between gap-6">
                  <span className="shrink-0 text-xs uppercase tracking-[0.12em] text-taupe">Concentration</span>
                  <span className="text-right text-ink/85">{product.concentration}</span>
                </div>
              </div>
              <div className="space-y-2">
                {(['top', 'middle', 'base'] as const).map((t) => (
                  <div key={t} className="flex justify-between gap-6 border-b border-black/5 pb-2 last:border-0">
                    <span className="shrink-0 text-xs uppercase tracking-[0.12em] text-taupe">{noteLabels[t]}</span>
                    <span className="text-right text-ink/85">{product.notes[t].join(', ')}</span>
                  </div>
                ))}
              </div>
            </Accordion>

            <Accordion icon={Sparkles} title="Personality">
              <div className="flex flex-wrap gap-2">
                {traits.map((tr) => (
                  <span key={tr} className="rounded-full border border-black/15 px-3 py-1 text-xs text-ink/85">{tr}</span>
                ))}
              </div>
              <p className="mt-3">{product.description}</p>
            </Accordion>
          </div>

          {/* Trust */}
          <div className="mt-7 grid grid-cols-3 gap-3 border-t border-black/10 pt-6 text-center text-[11px] text-taupe">
            <div className="flex flex-col items-center gap-1.5"><Truck size={20} className="text-gold" /> Free UAE Delivery</div>
            <div className="flex flex-col items-center gap-1.5"><RotateCcw size={20} className="text-gold" /> 15-Day Returns</div>
            <div className="flex flex-col items-center gap-1.5"><ShieldCheck size={20} className="text-gold" /> Secure Checkout</div>
          </div>
        </div>
      </div>
    </section>
  )
}
