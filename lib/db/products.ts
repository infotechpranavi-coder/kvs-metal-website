import { connectDB } from '@/lib/mongodb'
import { sortProductsBySku } from '@/lib/product-sku'
import { ProductModel } from '@/models/Product'
import { serializeProduct, type ProductDto } from '@/lib/serializers'

export async function getProductsForApi(): Promise<ProductDto[]> {
  await connectDB()
  const rows = await ProductModel.find().lean()
  return sortProductsBySku(rows.map((row) => serializeProduct(row as never)))
}

export async function getFooterProductsForApi(): Promise<ProductDto[]> {
  await connectDB()
  const rows = await ProductModel.find({ showInFooter: true })
    .sort({ sortOrder: 1, title: 1 })
    .lean()
  return rows.map((row) => serializeProduct(row as never))
}

export async function getProductBySlugForApi(slug: string): Promise<ProductDto | null> {
  await connectDB()
  const row = await ProductModel.findOne({ slug }).lean()
  return row ? serializeProduct(row as never) : null
}

export async function getNextProductSku(): Promise<string> {
  await connectDB()
  const count = await ProductModel.countDocuments()
  return String(count + 1)
}

export async function renumberProductSkus() {
  await connectDB()
  const rows = await ProductModel.find().sort({ sortOrder: 1, createdAt: 1 })
  for (let index = 0; index < rows.length; index += 1) {
    rows[index].sku = String(index + 1)
    await rows[index].save()
  }
}
