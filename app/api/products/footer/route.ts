import { NextResponse } from 'next/server'
import { getFooterProductsForApi } from '@/lib/db/products'

export const revalidate = 30

export async function GET() {
  try {
    const products = await getFooterProductsForApi()
    return NextResponse.json(
      { products },
      {
        headers: {
          'Cache-Control': 'public, s-maxage=30, stale-while-revalidate=120',
        },
      },
    )
  } catch {
    return NextResponse.json({ products: [] })
  }
}
