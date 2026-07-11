import { connectDB } from '@/lib/mongodb'
import { CategoryModel } from '@/models/Category'
import { MaterialModel } from '@/models/Material'
import { ProductModel } from '@/models/Product'
import { repairStaleProductCategoryLabels } from '@/lib/db/catalog'
import { serializeCategory, serializeMaterial } from '@/lib/serializers'

/** One DB connection, parallel queries — used by /api/catalog */
export async function getProductsCatalogBundle() {
  try {
    await connectDB()
    await repairStaleProductCategoryLabels()

    const [categoryRows, materialRows] = await Promise.all([
      CategoryModel.find().sort({ sortOrder: 1, title: 1 }).lean(),
      MaterialModel.find()
        .sort({ sortOrder: 1, title: 1 })
        .populate('categoryIds', 'slug')
        .lean(),
    ])

    return {
      categories: categoryRows.map((row) => serializeCategory(row as never)),
      materials: materialRows.map((row) => serializeMaterial(row as never)),
    }
  } catch {
    return { categories: [], materials: [] }
  }
}

export async function getHomepageCategoriesBundle() {
  try {
    await connectDB()
    const rows = await CategoryModel.find({ showOnHomepage: true })
      .sort({ sortOrder: 1, title: 1 })
      .lean()
    return rows.map((row) => serializeCategory(row as never))
  } catch {
    return []
  }
}
