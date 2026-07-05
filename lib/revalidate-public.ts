import { revalidatePath } from 'next/cache'

export function revalidatePublicPages() {
  revalidatePath('/')
  revalidatePath('/products')
  revalidatePath('/about')
  revalidatePath('/contact')
  revalidatePath('/api/catalog')
  revalidatePath('/api/products')
  revalidatePath('/api/categories/homepage')
  revalidatePath('/api/products/footer')
  revalidatePath('/api/partners')
}
