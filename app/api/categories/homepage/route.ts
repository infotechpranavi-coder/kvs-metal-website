import { NextResponse } from 'next/server'
import { getHomepageCategoriesBundle } from '@/lib/db/catalog-bundle'

export const revalidate = 30

export async function GET() {
  try {
    const categories = await getHomepageCategoriesBundle()
    return Response.json(
      { categories },
      {
        headers: {
          'Cache-Control': 'public, s-maxage=30, stale-while-revalidate=120',
        },
      },
    )
  } catch {
    return NextResponse.json({ error: 'Failed to load homepage categories' }, { status: 500 })
  }
}
