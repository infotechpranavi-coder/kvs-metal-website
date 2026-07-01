import { NextResponse } from 'next/server'
import { getProductBySlugForApi } from '@/lib/db/products'

export const dynamic = 'force-dynamic'

type RouteContext = { params: { slug: string } }

export async function GET(_request: Request, context: RouteContext) {
  try {
    const product = await getProductBySlugForApi(context.params.slug)
    if (!product) {
      return NextResponse.json({ error: 'Product not found' }, { status: 404 })
    }
    return NextResponse.json({ product })
  } catch {
    return NextResponse.json({ error: 'Failed to load product' }, { status: 500 })
  }
}
