/* eslint-disable @next/next/no-img-element */
import { cn } from '@/lib/utils'

const METHODS = [
  { src: '/payment/visa.svg', alt: 'Visa' },
  { src: '/payment/mastercard.svg', alt: 'Mastercard' },
  { src: '/payment/amex.svg', alt: 'American Express' },
  { src: '/payment/applepay.svg', alt: 'Apple Pay' },
  { src: '/payment/googlepay.svg', alt: 'Google Pay' },
]

/** Accepted payment methods — official brand marks (display only). */
export function PaymentIcons({ className }: { className?: string }) {
  return (
    <div className={cn('flex flex-wrap items-center gap-2', className)}>
      {METHODS.map((m) => (
        <span
          key={m.alt}
          className="inline-flex h-8 min-w-[50px] items-center justify-center rounded-md border border-black/10 bg-white px-2.5 text-ink shadow-sm"
        >
          <img src={m.src} alt={m.alt} loading="lazy" className="max-h-[18px] w-auto max-w-full object-contain" />
        </span>
      ))}
    </div>
  )
}
