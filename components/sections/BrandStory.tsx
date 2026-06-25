import Link from 'next/link'
import { EditorialImage } from '@/components/ui/EditorialImage'
import { Reveal } from '@/components/ui/Reveal'

export function BrandStory() {
  return (
    <section id="brand-story" className="section-pad bg-ivory">
      <div className="container-site grid items-center gap-12 md:grid-cols-2">
        <Reveal>
          <EditorialImage seed="brand-atelier" className="aspect-[4/5] w-full" label="The Atelier" />
        </Reveal>
        <Reveal delay={0.1}>
          <p className="eyebrow mb-4 text-gold">Our Philosophy</p>
          <h2 className="font-display text-4xl leading-[1.05] md:text-5xl">
            Why We Do,
            <br />
            What We Do
          </h2>
          <div className="mt-6 space-y-4 text-taupe">
            <p>
              Habib Alruh — &ldquo;beloved of the soul&rdquo; — began with a simple conviction:
              that fragrance is memory made wearable. Every composition starts with a feeling,
              not a formula.
            </p>
            <p>
              We work in small batches with rare naturals, refusing shortcuts that dull a scent&apos;s
              character. The result is depth you can return to — fragrances that reveal themselves
              slowly, the way the best stories do.
            </p>
          </div>
          <Link
            href="/#brand-story"
            className="mt-6 inline-block border-b border-gold pb-1 text-sm font-medium uppercase tracking-[0.12em] text-ink transition hover:text-gold"
          >
            About Us
          </Link>
        </Reveal>
      </div>
    </section>
  )
}
