import Link from 'next/link'
import { Button } from '@/components/ui/Button'

export default function NotFound() {
  return (
    <section className="grid min-h-[70vh] place-items-center bg-ivory">
      <div className="text-center">
        <p className="font-accent text-2xl italic text-gold">Lost in the dry-down</p>
        <h1 className="mt-2 font-display text-6xl">404</h1>
        <p className="mt-3 text-taupe">We couldn&apos;t find that fragrance.</p>
        <Link href="/" className="mt-6 inline-block">
          <Button variant="dark" size="lg">Back Home</Button>
        </Link>
      </div>
    </section>
  )
}
