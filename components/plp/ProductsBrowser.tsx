'use client'

import { useMemo, useState } from 'react'
import { useSearchParams } from 'next/navigation'
import { SlidersHorizontal, X } from 'lucide-react'
import { AnimatePresence, motion } from 'framer-motion'
import { ProductCard } from '@/components/ui/ProductCard'
import { Button } from '@/components/ui/Button'
import {
  PRODUCTS,
  CATEGORIES,
  GENDERS,
  type Category,
  type Gender,
} from '@/lib/products'
import { cn } from '@/lib/utils'

type Sort = 'bestsellers' | 'new' | 'price-asc' | 'price-desc'

const SORTS: { value: Sort; label: string }[] = [
  { value: 'bestsellers', label: 'Bestsellers' },
  { value: 'new', label: 'New Arrivals' },
  { value: 'price-asc', label: 'Price: Low–High' },
  { value: 'price-desc', label: 'Price: High–Low' },
]

const PAGE = 8

export function ProductsBrowser() {
  const params = useSearchParams()
  const [category, setCategory] = useState<Category | null>(
    (params.get('category') as Category) || null,
  )
  const [gender, setGender] = useState<Gender | null>((params.get('gender') as Gender) || null)
  const [sort, setSort] = useState<Sort>((params.get('sort') as Sort) || 'bestsellers')
  const [visible, setVisible] = useState(PAGE)
  const [drawerOpen, setDrawerOpen] = useState(false)

  const filtered = useMemo(() => {
    let list = PRODUCTS.filter(
      (p) => (!category || p.category === category) && (!gender || p.gender === gender),
    )
    const min = (p: (typeof PRODUCTS)[number]) => Math.min(...Object.values(p.price))
    const sorted = [...list]
    if (sort === 'new') sorted.sort((a, b) => Number(b.badges.includes('new')) - Number(a.badges.includes('new')))
    else if (sort === 'price-asc') sorted.sort((a, b) => min(a) - min(b))
    else if (sort === 'price-desc') sorted.sort((a, b) => min(b) - min(a))
    else sorted.sort((a, b) => b.reviewCount - a.reviewCount)
    return sorted
  }, [category, gender, sort])

  const shown = filtered.slice(0, visible)
  const activeFilters = [
    category && { type: 'category', label: CATEGORIES.find((c) => c.value === category)!.label, clear: () => setCategory(null) },
    gender && { type: 'gender', label: GENDERS.find((g) => g.value === gender)!.label, clear: () => setGender(null) },
  ].filter(Boolean) as { type: string; label: string; clear: () => void }[]

  const FilterControls = () => (
    <>
      <FilterGroup
        title="Category"
        options={CATEGORIES}
        active={category}
        onSelect={(v) => {
          setCategory(category === v ? null : (v as Category))
          setVisible(PAGE)
        }}
      />
      <FilterGroup
        title="Gender"
        options={GENDERS}
        active={gender}
        onSelect={(v) => {
          setGender(gender === v ? null : (v as Gender))
          setVisible(PAGE)
        }}
      />
    </>
  )

  return (
    <div className="container-site section-pad">
      {/* Sticky filter/sort bar */}
      <div className="sticky top-16 z-30 -mx-5 mb-6 border-y border-black/10 bg-ivory/95 px-5 py-3 backdrop-blur md:top-20">
        <div className="flex items-center justify-between gap-4">
          <div className="hidden flex-wrap items-center gap-2 md:flex">
            <FilterPills
              options={CATEGORIES}
              active={category}
              onSelect={(v) => {
                setCategory(category === v ? null : (v as Category))
                setVisible(PAGE)
              }}
            />
          </div>
          <button
            onClick={() => setDrawerOpen(true)}
            className="inline-flex items-center gap-2 text-sm font-medium md:hidden"
          >
            <SlidersHorizontal size={16} /> Filters
          </button>

          <label className="ml-auto flex items-center gap-2 text-sm">
            <span className="hidden text-taupe sm:inline">Sort</span>
            <select
              value={sort}
              onChange={(e) => setSort(e.target.value as Sort)}
              className="rounded-button border border-black/15 bg-transparent px-3 py-2 text-sm focus:border-gold focus:outline-none"
            >
              {SORTS.map((s) => (
                <option key={s.value} value={s.value}>
                  {s.label}
                </option>
              ))}
            </select>
          </label>
        </div>

        {/* Active filter chips */}
        {activeFilters.length > 0 && (
          <div className="mt-3 flex flex-wrap gap-2">
            {activeFilters.map((f) => (
              <button
                key={f.type}
                onClick={f.clear}
                className="inline-flex items-center gap-1 rounded-full bg-ink px-3 py-1 text-xs text-white"
              >
                {f.label} <X size={12} />
              </button>
            ))}
          </div>
        )}
      </div>

      <p className="mb-6 text-sm text-taupe">
        Showing {shown.length} of {filtered.length} products
      </p>

      {/* Grid */}
      <div className="grid grid-cols-2 gap-x-4 gap-y-10 md:grid-cols-3 lg:grid-cols-4">
        {shown.map((p) => (
          <ProductCard key={p.id} product={p} />
        ))}
      </div>

      {visible < filtered.length && (
        <div className="mt-12 flex justify-center">
          <Button variant="dark" size="lg" onClick={() => setVisible((v) => v + PAGE)}>
            Load More
          </Button>
        </div>
      )}

      {/* Mobile filter drawer */}
      <AnimatePresence>
        {drawerOpen && (
          <>
            <motion.div
              className="fixed inset-0 z-50 bg-black/50 md:hidden"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setDrawerOpen(false)}
            />
            <motion.div
              className="fixed inset-x-0 bottom-0 z-50 max-h-[80vh] overflow-y-auto rounded-t-modal bg-surface p-6 md:hidden"
              initial={{ y: '100%' }}
              animate={{ y: 0 }}
              exit={{ y: '100%' }}
              transition={{ type: 'tween', duration: 0.3 }}
            >
              <div className="mb-4 flex items-center justify-between">
                <h3 className="font-display text-2xl">Filters</h3>
                <button onClick={() => setDrawerOpen(false)} aria-label="Close filters">
                  <X size={22} />
                </button>
              </div>
              <FilterControls />
              <Button variant="gold" size="lg" className="mt-6 w-full" onClick={() => setDrawerOpen(false)}>
                Show {filtered.length} Results
              </Button>
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </div>
  )
}

function FilterPills({
  options,
  active,
  onSelect,
}: {
  options: { value: string; label: string }[]
  active: string | null
  onSelect: (v: string) => void
}) {
  return (
    <>
      {options.map((o) => (
        <button
          key={o.value}
          onClick={() => onSelect(o.value)}
          className={cn(
            'rounded-full border px-4 py-1.5 text-xs font-medium uppercase tracking-[0.1em] transition',
            active === o.value
              ? 'border-ink bg-ink text-white'
              : 'border-black/15 text-ink hover:border-gold',
          )}
        >
          {o.label}
        </button>
      ))}
    </>
  )
}

function FilterGroup({
  title,
  options,
  active,
  onSelect,
}: {
  title: string
  options: { value: string; label: string }[]
  active: string | null
  onSelect: (v: string) => void
}) {
  return (
    <div className="mb-6">
      <h4 className="eyebrow mb-3 text-taupe">{title}</h4>
      <div className="flex flex-wrap gap-2">
        <FilterPills options={options} active={active} onSelect={onSelect} />
      </div>
    </div>
  )
}
