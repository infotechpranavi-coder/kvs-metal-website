import { getProductsCatalogBundle } from '@/lib/db/catalog-bundle'

export const revalidate = 30

export async function GET() {
  try {
    const { categories, materials } = await getProductsCatalogBundle()
    return Response.json(
      { categories, materials },
      {
        headers: {
          'Cache-Control': 'public, s-maxage=30, stale-while-revalidate=120',
        },
      },
    )
  } catch {
    return Response.json({ error: 'Failed to load catalog' }, { status: 500 })
  }
}
