import * as React from 'react'
import { cn } from '@/lib/utils'

type Variant = 'gold' | 'outline-gold' | 'ghost' | 'dark' | 'outline-light'
type Size = 'sm' | 'md' | 'lg'

const variants: Record<Variant, string> = {
  gold: 'bg-gold text-ink hover:bg-[#b8993f]',
  'outline-gold':
    'bg-transparent border border-gold text-gold hover:bg-gold hover:text-ink',
  ghost: 'bg-transparent text-current hover:opacity-70',
  dark: 'bg-ink text-white hover:bg-[#222]',
  'outline-light':
    'bg-transparent border border-white/70 text-white hover:bg-white hover:text-ink',
}

const sizes: Record<Size, string> = {
  sm: 'h-9 px-4 text-xs',
  md: 'h-11 px-6 text-sm',
  lg: 'h-14 px-9 text-sm',
}

export interface ButtonProps
  extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: Variant
  size?: Size
}

export const Button = React.forwardRef<HTMLButtonElement, ButtonProps>(
  ({ className, variant = 'gold', size = 'md', ...props }, ref) => (
    <button
      ref={ref}
      className={cn(
        'inline-flex items-center justify-center gap-2 rounded-button font-body font-medium uppercase tracking-[0.14em] transition-colors duration-300 disabled:cursor-not-allowed disabled:opacity-50',
        variants[variant],
        sizes[size],
        className,
      )}
      {...props}
    />
  ),
)
Button.displayName = 'Button'
