import { getProductsCatalogBundle } from '@/lib/db/catalog-bundle'

export const revalidate = 30

export async function GET() {
  try {
    const { categories, materials } = await getProductsCatalogBundle()
    return Response.json({ categories, materials })
  } catch {
    return Response.json({ error: 'Failed to load catalog' }, { status: 500 })
  }
}
