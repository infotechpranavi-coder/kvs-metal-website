import { connectDB } from '@/lib/mongodb'
import { CategoryModel } from '@/models/Category'
import { ProductModel } from '@/models/Product'
import { serializeCategory, serializeMaterial, type CategoryDto, type MaterialDto } from '@/lib/serializers'
import { MaterialModel } from '@/models/Material'

export async function syncProductsForCategoryUpdate(
  categoryId: string,
  nextTitle: string,
  previousTitle?: string,
) {
  await connectDB()

  await ProductModel.updateMany({ categoryId }, { $set: { category: nextTitle } })

  if (previousTitle && previousTitle !== nextTitle) {
    await ProductModel.updateMany(
      {
        category: previousTitle,
        $or: [{ categoryId: null }, { categoryId: { $exists: false } }],
      },
      { $set: { category: nextTitle, categoryId } },
    )
  }
}

/** Keep denormalized product.category labels aligned with linked category documents. */
export async function repairStaleProductCategoryLabels() {
  await connectDB()
  const categories = await CategoryModel.find().lean()

  await Promise.all(
    categories.map((category) =>
      ProductModel.updateMany(
        { categoryId: category._id },
        { $set: { category: category.title } },
      ),
    ),
  )
}

export async function getMaterialsForApi(): Promise<MaterialDto[]> {
  try {
    await connectDB()
    const rows = await MaterialModel.find()
      .sort({ sortOrder: 1, title: 1 })
      .populate('categoryIds', 'slug')

    return rows.map(serializeMaterial)
  } catch {
    return []
  }
}

export async function getHomepageCategoriesForApi(): Promise<CategoryDto[]> {
  try {
    await connectDB()
    const rows = await CategoryModel.find({ showOnHomepage: true })
      .sort({ sortOrder: 1, title: 1 })
    return rows.map(serializeCategory)
  } catch {
    return []
  }
}

export async function getCategoriesForApi(): Promise<CategoryDto[]> {
  try {
    await connectDB()
    const rows = await CategoryModel.find().sort({ sortOrder: 1, title: 1 })
    return rows.map(serializeCategory)
  } catch {
    return []
  }
}

export async function getLiveMaterials() {
  const materials = await getMaterialsForApi()
  return materials.map((material) => ({
    slug: material.slug,
    title: material.title,
    description: material.description,
    img: material.img,
    categorySlugs: material.categorySlugs,
  }))
}

export async function getMaterialIdForCategory(categoryId: string): Promise<string | null> {
  try {
    await connectDB()
    if (categoryId.startsWith('seed:')) return null

    const material = await MaterialModel.findOne({ categoryIds: categoryId })
    if (!material) return null
    return material._id.toString()
  } catch {
    return null
  }
}

export async function enrichCategoriesWithMaterial(
  categories: CategoryDto[],
): Promise<Array<CategoryDto & { materialId: string | null; materialTitle: string | null }>> {
  try {
    await connectDB()
    const materials = await MaterialModel.find().populate('categoryIds', 'slug')

    return categories.map((category) => {
      const linked = materials.find((material) =>
        (material.categoryIds || []).some((item) => {
          const id =
            typeof item === 'object' && item !== null && '_id' in item
              ? item._id.toString()
              : String(item)
          return id === category.id
        }),
      )

      return {
        ...category,
        materialId: linked?._id.toString() ?? null,
        materialTitle: linked?.title ?? null,
      }
    })
  } catch {
    return categories.map((category) => ({ ...category, materialId: null, materialTitle: null }))
  }
}
