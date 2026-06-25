export type Category = 'fresh' | 'floral' | 'woody' | 'oriental' | 'citrus'
export type Gender = 'him' | 'her' | 'unisex'
export type BadgeKind = 'new' | 'bestseller' | 'limited' | 'sale'
export type Size = '30ml' | '50ml' | '100ml'

export interface Product {
  id: string
  slug: string
  name: string
  tagline: string
  description: string
  story: string
  price: Partial<Record<Size, number>>
  compareAt?: Partial<Record<Size, number>>
  images: string[]
  category: Category
  gender: Gender
  badges: BadgeKind[]
  notes: { top: string[]; middle: string[]; base: string[] }
  rating: number
  reviewCount: number
  inStock: boolean
}

const base = (over: Partial<Product> & Pick<Product, 'slug' | 'name' | 'category' | 'gender'>): Product => ({
  tagline: 'An ode to the senses',
  description:
    'A meticulously composed fragrance built around rare naturals and a long, warm dry-down. Crafted in small batches for depth and longevity.',
  story:
    'Born in our atelier from a single memory, this scent travels through layers of light and shadow — opening bright, settling into something intimate and unmistakably yours.',
  price: { '30ml': 149, '50ml': 249, '100ml': 399 },
  images: [],
  badges: [],
  notes: {
    top: ['Bergamot', 'Pink Pepper'],
    middle: ['Saffron', 'Rose'],
    base: ['Amber', 'Sandalwood', 'Musk'],
  },
  rating: 4.7,
  reviewCount: 184,
  inStock: true,
  ...over,
  id: over.slug!,
})

export const PRODUCTS: Product[] = [
  base({
    slug: 'saffron-noir-100ml',
    name: 'Saffron Noir',
    tagline: 'Smoke, saffron, and gold',
    category: 'oriental',
    gender: 'unisex',
    badges: ['bestseller', 'new'],
    rating: 4.9,
    reviewCount: 412,
    notes: { top: ['Saffron', 'Nutmeg'], middle: ['Leather', 'Rose'], base: ['Oud', 'Amber'] },
  }),
  base({
    slug: 'born-from-silence-50ml',
    name: 'Born from Silence',
    tagline: 'Golden dunes at dusk',
    category: 'woody',
    gender: 'him',
    badges: ['bestseller'],
    rating: 4.8,
    reviewCount: 301,
    notes: { top: ['Bergamot', 'Cardamom'], middle: ['Cedar', 'Vetiver'], base: ['Sandalwood', 'Musk'] },
  }),
  base({
    slug: 'desert-rose-50ml',
    name: 'Desert Rose',
    tagline: 'Petals on warm sand',
    category: 'floral',
    gender: 'her',
    badges: ['new'],
    rating: 4.7,
    reviewCount: 156,
    notes: { top: ['Lychee', 'Pink Pepper'], middle: ['Damask Rose', 'Peony'], base: ['Amber', 'Patchouli'] },
  }),
  base({
    slug: 'citrus-veil-30ml',
    name: 'Citrus Veil',
    tagline: 'Sunlight, bottled',
    category: 'citrus',
    gender: 'unisex',
    badges: ['sale'],
    price: { '30ml': 129, '50ml': 219, '100ml': 339 },
    compareAt: { '30ml': 169, '50ml': 279, '100ml': 419 },
    rating: 4.5,
    reviewCount: 98,
    notes: { top: ['Lemon', 'Grapefruit'], middle: ['Neroli', 'Petitgrain'], base: ['White Musk', 'Cedar'] },
  }),
  base({
    slug: 'velvet-oud-100ml',
    name: 'Velvet Oud',
    tagline: 'Resin and quiet luxury',
    category: 'woody',
    gender: 'him',
    badges: ['limited'],
    price: { '50ml': 349, '100ml': 549 },
    rating: 4.9,
    reviewCount: 220,
    notes: { top: ['Saffron', 'Plum'], middle: ['Oud', 'Rose'], base: ['Leather', 'Amber'] },
  }),
  base({
    slug: 'morning-bloom-50ml',
    name: 'Morning Bloom',
    tagline: 'Dew on white petals',
    category: 'floral',
    gender: 'her',
    badges: ['bestseller'],
    rating: 4.6,
    reviewCount: 174,
    notes: { top: ['Mandarin', 'Green Leaves'], middle: ['Jasmine', 'Lily'], base: ['Musk', 'Cedar'] },
  }),
  base({
    slug: 'cedar-haze-100ml',
    name: 'Cedar Haze',
    tagline: 'Woodsmoke and calm',
    category: 'woody',
    gender: 'unisex',
    rating: 4.6,
    reviewCount: 142,
    notes: { top: ['Juniper', 'Bergamot'], middle: ['Cedar', 'Cypress'], base: ['Vetiver', 'Amber'] },
  }),
  base({
    slug: 'amber-reverie-50ml',
    name: 'Amber Reverie',
    tagline: 'Warmth that lingers',
    category: 'oriental',
    gender: 'her',
    badges: ['new'],
    rating: 4.8,
    reviewCount: 211,
    notes: { top: ['Bergamot', 'Pink Pepper'], middle: ['Amber', 'Orris'], base: ['Vanilla', 'Tonka'] },
  }),
  base({
    slug: 'sea-salt-aria-30ml',
    name: 'Sea Salt Aria',
    tagline: 'Cool spray, clean air',
    category: 'fresh',
    gender: 'unisex',
    rating: 4.4,
    reviewCount: 76,
    notes: { top: ['Sea Salt', 'Bergamot'], middle: ['Sage', 'Lavender'], base: ['Driftwood', 'Musk'] },
  }),
  base({
    slug: 'midnight-jasmine-100ml',
    name: 'Midnight Jasmine',
    tagline: 'Night-blooming intensity',
    category: 'floral',
    gender: 'her',
    badges: ['bestseller', 'limited'],
    rating: 4.9,
    reviewCount: 268,
    notes: { top: ['Black Currant', 'Pear'], middle: ['Jasmine Sambac', 'Tuberose'], base: ['Amber', 'Sandalwood'] },
  }),
  base({
    slug: 'green-fig-30ml',
    name: 'Green Fig',
    tagline: 'Orchard light',
    category: 'fresh',
    gender: 'unisex',
    rating: 4.5,
    reviewCount: 89,
    notes: { top: ['Fig Leaf', 'Lemon'], middle: ['Fig', 'Coconut Milk'], base: ['Cedar', 'Musk'] },
  }),
  base({
    slug: 'royal-tobacco-100ml',
    name: 'Royal Tobacco',
    tagline: 'Spiced, smoky, regal',
    category: 'oriental',
    gender: 'him',
    badges: ['limited'],
    price: { '50ml': 329, '100ml': 499 },
    rating: 4.8,
    reviewCount: 198,
    notes: { top: ['Cinnamon', 'Saffron'], middle: ['Tobacco Leaf', 'Honey'], base: ['Tonka', 'Patchouli'] },
  }),
]

export const TOTAL_CATALOGUE = 78 // marketing count shown in hero badges

/* ---- Query layer (swap for CMS/API later — see data-layer skill) ---- */

export interface ProductQuery {
  category?: Category | 'all'
  gender?: Gender
  sort?: 'bestsellers' | 'new' | 'price-asc' | 'price-desc'
}

export function getProducts(query: ProductQuery = {}): Product[] {
  let list = [...PRODUCTS]
  if (query.category && query.category !== 'all')
    list = list.filter((p) => p.category === query.category)
  if (query.gender) list = list.filter((p) => p.gender === query.gender)

  const minPrice = (p: Product) => Math.min(...Object.values(p.price))
  switch (query.sort) {
    case 'new':
      list.sort((a, b) => Number(b.badges.includes('new')) - Number(a.badges.includes('new')))
      break
    case 'price-asc':
      list.sort((a, b) => minPrice(a) - minPrice(b))
      break
    case 'price-desc':
      list.sort((a, b) => minPrice(b) - minPrice(a))
      break
    default:
      list.sort((a, b) => b.reviewCount - a.reviewCount)
  }
  return list
}

export function getProductBySlug(slug: string): Product | undefined {
  return PRODUCTS.find((p) => p.slug === slug)
}

export function getBestsellers(limit = 6): Product[] {
  return PRODUCTS.filter((p) => p.badges.includes('bestseller')).slice(0, limit)
}

export function getRelated(slug: string, limit = 4): Product[] {
  const current = getProductBySlug(slug)
  if (!current) return PRODUCTS.slice(0, limit)
  return PRODUCTS.filter((p) => p.slug !== slug && p.category === current.category)
    .concat(PRODUCTS.filter((p) => p.slug !== slug && p.category !== current.category))
    .slice(0, limit)
}

export const CATEGORIES: { value: Category; label: string }[] = [
  { value: 'fresh', label: 'Fresh' },
  { value: 'floral', label: 'Floral' },
  { value: 'woody', label: 'Woody' },
  { value: 'oriental', label: 'Oriental' },
  { value: 'citrus', label: 'Citrus' },
]

export const GENDERS: { value: Gender; label: string }[] = [
  { value: 'him', label: 'Him' },
  { value: 'her', label: 'Her' },
  { value: 'unisex', label: 'Unisex' },
]
