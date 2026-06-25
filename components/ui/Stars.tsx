import { Star } from 'lucide-react'
import { cn } from '@/lib/utils'

export function Stars({
  value,
  size = 14,
  className,
}: {
  value: number
  size?: number
  className?: string
}) {
  return (
    <span className={cn('inline-flex items-center gap-0.5', className)} aria-label={`${value} out of 5 stars`}>
      {[1, 2, 3, 4, 5].map((i) => (
        <Star
          key={i}
          size={size}
          className={i <= Math.round(value) ? 'fill-gold text-gold' : 'fill-transparent text-taupe/50'}
        />
      ))}
    </span>
  )
}
