'use client'

import { useEffect, useState } from 'react'
import {
  Minus,
  Plus,
  Heart,
  Share2,
  Truck,
  Eye,
  BadgeCheck,
  Star,
  Copy,
  Check,
  Ticket,
} from 'lucide-react'
import { Button } from '@/components/ui/Button'
import { Stars } from '@/components/ui/Stars'
import { EditorialImage } from '@/components/ui/EditorialImage'
import { PaymentIcons } from '@/components/shared/PaymentIcons'
import { useCart } from '@/lib/cart'
import { useWishlist } from '@/lib/wishlist'
import { useHydrated } from '@/lib/hooks'
import { formatAED, cn } from '@/lib/utils'
import { FAMILY_LABEL, type Category, type Product, type Size } from '@/lib/products'

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
            <div className="flex items-center self-stretch rounded-card border border-black/20">
              <button onClick={() => setQty((q) => Math.max(1, q - 1))} aria-label="Decrease quantity" className="grid h-full w-9 place-items-center hover:text-gold">
                <Minus size={15} />
              </button>
              <span className="w-7 text-center text-sm">{qty}</span>
              <button onClick={() => setQty((q) => q + 1)} aria-label="Increase quantity" className="grid h-full w-9 place-items-center hover:text-gold">
                <Plus size={15} />
              </button>
            </div>
            <Button variant="gold" size="lg" className="flex-1 whitespace-nowrap" onClick={addToCart}>
              Add to Cart
            </Button>
          </div>
          <Button variant="dark" size="lg" className="mt-3 w-full" onClick={() => { addToCart(); openCart() }}>
            Buy It Now
          </Button>
          <p className="mt-3 flex items-center gap-x-1.5 whitespace-nowrap text-xs text-taupe">
            Pay in 4 interest-free with
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img src="/payment/tabby.svg" alt="Tabby" className="h-4 w-auto" />
            &amp;
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img src="/payment/tamara.svg" alt="Tamara" className="h-2.5 w-auto" />
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

        </div>
      </div>
    </section>
  )
}
