import { redirect } from 'next/navigation'
import { getProductCategoryBySlug } from '@/lib/products'

type Props = { params: { slug: string } }

export default function Page({ params }: Props) {
  const category = getProductCategoryBySlug(params.slug)
  if (!category) redirect('/products')
  redirect(`/products?category=${params.slug}`)
}
