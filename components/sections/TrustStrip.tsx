import { Truck, RotateCcw, ShieldCheck } from 'lucide-react'

const ITEMS = [
  { icon: Truck, title: 'Free UAE Shipping', sub: 'On all orders over AED 200' },
  { icon: RotateCcw, title: 'Easy Returns', sub: '15-day hassle-free returns' },
  { icon: ShieldCheck, title: 'Secure Payment', sub: '100% encrypted checkout' },
]

export function TrustStrip() {
  return (
    <section className="border-t border-black/10 bg-surface py-12">
      <div className="container-site grid gap-8 sm:grid-cols-3">
        {ITEMS.map((it) => (
          <div key={it.title} className="flex items-center gap-4">
            <it.icon size={28} className="shrink-0 text-gold" strokeWidth={1.5} />
            <div>
              <h3 className="font-display text-lg">{it.title}</h3>
              <p className="text-sm text-taupe">{it.sub}</p>
            </div>
          </div>
        ))}
      </div>
    </section>
  )
}
