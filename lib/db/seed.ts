import { connectDB } from '@/lib/mongodb'
import { kvsProductCategories } from '@/lib/kvs-catalog'
import { materialSupplies } from '@/lib/materials'
import { CategoryModel } from '@/models/Category'
import { MaterialModel } from '@/models/Material'

export async function seedCatalogIfEmpty() {
  await connectDB()

  const existing = await CategoryModel.countDocuments()
  if (existing > 0) {
    return { seeded: false, categories: existing, materials: await MaterialModel.countDocuments() }
  }

  const categoryIds = new Map<string, string>()

  for (let index = 0; index < kvsProductCategories.length; index += 1) {
    const category = kvsProductCategories[index]
    const row = await CategoryModel.create({
      slug: category.slug,
      title: category.title,
      img: category.img,
      heroImg: category.heroImg,
      description: category.description,
      headline: category.headline,
      paragraphs: category.paragraphs,
      productSlugs: category.productSlugs,
      sortOrder: index,
    })
    categoryIds.set(category.slug, row._id.toString())
  }

  for (let index = 0; index < materialSupplies.length; index += 1) {
    const material = materialSupplies[index]
    await MaterialModel.create({
      slug: material.slug,
      title: material.title,
      description: material.description,
      img: material.img,
      sortOrder: index,
      categoryIds: material.categorySlugs
        .map((slug) => categoryIds.get(slug))
        .filter(Boolean),
    })
  }

  return {
    seeded: true,
    categories: categoryIds.size,
    materials: materialSupplies.length,
  }
}

export async function resolveMaterialId(materialId: string) {
  await connectDB()

  if (!materialId.startsWith('seed:')) {
    const existing = await MaterialModel.findById(materialId)
    if (!existing) throw new Error('MATERIAL_NOT_FOUND')
    return existing._id.toString()
  }

  const slug = materialId.replace(/^seed:/, '')
  let material = await MaterialModel.findOne({ slug })
  if (material) return material._id.toString()

  const seed = materialSupplies.find((item) => item.slug === slug)
  if (!seed) throw new Error('MATERIAL_NOT_FOUND')

  await seedCatalogIfEmpty()
  material = await MaterialModel.findOne({ slug })
  if (!material) throw new Error('MATERIAL_NOT_FOUND')
  return material._id.toString()
}

export async function linkCategoryToMaterial(materialId: string, categoryId: string) {
  await connectDB()
  const resolvedId = await resolveMaterialId(materialId)
  await MaterialModel.findByIdAndUpdate(resolvedId, {
    $addToSet: { categoryIds: categoryId },
  })
}

export async function unlinkCategoryFromMaterials(categoryId: string) {
  await connectDB()
  await MaterialModel.updateMany({}, { $pull: { categoryIds: categoryId } })
}

export async function setCategoryMaterial(
  categoryId: string,
  materialId: string | null | undefined,
  previousMaterialId?: string | null,
) {
  await connectDB()

  if (previousMaterialId) {
    const previousResolved = await resolveMaterialId(previousMaterialId).catch(() => null)
    if (previousResolved) {
      await MaterialModel.findByIdAndUpdate(previousResolved, {
        $pull: { categoryIds: categoryId },
      })
    }
  }

  if (materialId) {
    await linkCategoryToMaterial(materialId, categoryId)
  }
}

export async function findMaterialDocument(id: string) {
  await connectDB()
  if (id.startsWith('seed:')) {
    await seedCatalogIfEmpty()
    return MaterialModel.findOne({ slug: id.replace(/^seed:/, '') }).populate('categoryIds', 'slug')
  }
  return MaterialModel.findById(id).populate('categoryIds', 'slug')
}

export async function findCategoryDocument(id: string) {
  await connectDB()
  if (id.startsWith('seed:')) {
    await seedCatalogIfEmpty()
    return CategoryModel.findOne({ slug: id.replace(/^seed:/, '') })
  }
  return CategoryModel.findById(id)
}
