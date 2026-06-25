import type { MetadataRoute } from 'next'
import { PRODUCTS } from '@/lib/products'

const BASE = 'https://habibalruh.ae'

export default function sitemap(): MetadataRoute.Sitemap {
  const staticRoutes = ['', '/products'].map((path) => ({
    url: `${BASE}${path}`,
    changeFrequency: 'weekly' as const,
    priority: path === '' ? 1 : 0.8,
  }))

  const productRoutes = PRODUCTS.map((p) => ({
    url: `${BASE}/products/${p.slug}`,
    changeFrequency: 'monthly' as const,
    priority: 0.6,
  }))

  return [...staticRoutes, ...productRoutes]
}
