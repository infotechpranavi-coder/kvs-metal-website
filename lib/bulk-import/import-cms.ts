import { linkCategoryToMaterial } from '@/lib/db/seed'
import { getNextProductSku } from '@/lib/db/products'
import { connectDB } from '@/lib/mongodb'
import { slugify } from '@/lib/slug'
import { CategoryModel } from '@/models/Category'
import { MaterialModel } from '@/models/Material'
import { ProductModel } from '@/models/Product'
import {
  cellStr,
  imageOrPlaceholder,
  normalizeRow,
  parseBool,
  parseList,
  parseOptionalNumber,
  rowIsEmpty,
} from './helpers'
import { readDataSheetRows } from './samples'
import {
  BULK_IMPORT_MAX_ERRORS,
  BULK_IMPORT_PLACEHOLDER_IMG,
  type BulkImportResult,
  type BulkImportType,
} from './types'

function pushError(errors: string[], message: string) {
  if (errors.length < BULK_IMPORT_MAX_ERRORS) {
    errors.push(message)
  }
}

async function resolveCategoryBySlug(slug: string) {
  if (!slug) return null
  return CategoryModel.findOne({ slug })
}

async function resolveMaterialBySlug(slug: string) {
  if (!slug) return null
  return MaterialModel.findOne({ slug })
}

async function importCategories(rows: Record<string, unknown>[]): Promise<BulkImportResult> {
  const result: BulkImportResult = { added: 0, updated: 0, skipped: 0, errors: [] }

  for (let index = 0; index < rows.length; index += 1) {
    const row = normalizeRow(rows[index])
    if (rowIsEmpty(row)) continue

    const title = cellStr(row.title)
    if (!title) {
      pushError(result.errors, `Row ${index + 2}: title is required`)
      result.skipped += 1
      continue
    }

    const slug = cellStr(row.slug) || slugify(title)
    if (!slug) {
      pushError(result.errors, `Row ${index + 2}: could not derive slug`)
      result.skipped += 1
      continue
    }

    const img = imageOrPlaceholder(row.img)
    const heroImg = cellStr(row.hero_img) || img
    const materialSlug = cellStr(row.material_slug)

    try {
      const existing = await CategoryModel.findOne({ slug })
      const payload = {
        title,
        img,
        heroImg,
        description: cellStr(row.description),
        headline: cellStr(row.headline),
        paragraphs: parseList(row.paragraphs),
        productSlugs: parseList(row.product_slugs),
        sortOrder: parseOptionalNumber(row.sort_order, existing?.sortOrder ?? 0),
        showOnHomepage: parseBool(row.show_on_homepage, existing?.showOnHomepage ?? false),
      }

      let categoryId: string

      if (existing) {
        Object.assign(existing, payload)
        await existing.save()
        categoryId = existing._id.toString()
        result.updated += 1
      } else {
        const created = await CategoryModel.create({ slug, ...payload })
        categoryId = created._id.toString()
        result.added += 1
      }

      if (materialSlug) {
        const material = await resolveMaterialBySlug(materialSlug)
        if (!material) {
          pushError(
            result.errors,
            `Row ${index + 2}: material_slug "${materialSlug}" not found (import materials first)`,
          )
        } else {
          await linkCategoryToMaterial(material._id.toString(), categoryId)
        }
      }
    } catch (error) {
      pushError(
        result.errors,
        `Row ${index + 2}: ${error instanceof Error ? error.message : 'Failed to save category'}`,
      )
      result.skipped += 1
    }
  }

  return result
}

async function importMaterials(rows: Record<string, unknown>[]): Promise<BulkImportResult> {
  const result: BulkImportResult = { added: 0, updated: 0, skipped: 0, errors: [] }

  for (let index = 0; index < rows.length; index += 1) {
    const row = normalizeRow(rows[index])
    if (rowIsEmpty(row)) continue

    const title = cellStr(row.title)
    if (!title) {
      pushError(result.errors, `Row ${index + 2}: title is required`)
      result.skipped += 1
      continue
    }

    const slug = cellStr(row.slug) || slugify(title)
    if (!slug) {
      pushError(result.errors, `Row ${index + 2}: could not derive slug`)
      result.skipped += 1
      continue
    }

    const categorySlugs = parseList(row.category_slugs)
    const categoryIds: string[] = []

    for (const categorySlug of categorySlugs) {
      const category = await resolveCategoryBySlug(categorySlug)
      if (!category) {
        pushError(
          result.errors,
          `Row ${index + 2}: category_slug "${categorySlug}" not found (import categories first)`,
        )
      } else {
        categoryIds.push(category._id.toString())
      }
    }

    try {
      const existing = await MaterialModel.findOne({ slug })
      const payload = {
        title,
        description: cellStr(row.description),
        img: imageOrPlaceholder(row.img),
        sortOrder: parseOptionalNumber(row.sort_order, existing?.sortOrder ?? 0),
        categoryIds: categoryIds.length > 0 ? categoryIds : existing?.categoryIds ?? [],
      }

      if (existing) {
        Object.assign(existing, payload)
        await existing.save()
        result.updated += 1
      } else {
        await MaterialModel.create({ slug, ...payload })
        result.added += 1
      }
    } catch (error) {
      pushError(
        result.errors,
        `Row ${index + 2}: ${error instanceof Error ? error.message : 'Failed to save material'}`,
      )
      result.skipped += 1
    }
  }

  return result
}

async function importProducts(rows: Record<string, unknown>[]): Promise<BulkImportResult> {
  const result: BulkImportResult = { added: 0, updated: 0, skipped: 0, errors: [] }

  for (let index = 0; index < rows.length; index += 1) {
    const row = normalizeRow(rows[index])
    if (rowIsEmpty(row)) continue

    const title = cellStr(row.title)
    if (!title) {
      pushError(result.errors, `Row ${index + 2}: title is required`)
      result.skipped += 1
      continue
    }

    const slug = cellStr(row.slug) || slugify(title)
    if (!slug) {
      pushError(result.errors, `Row ${index + 2}: could not derive slug`)
      result.skipped += 1
      continue
    }

    const categorySlug = cellStr(row.category_slug)
    let categoryTitle = cellStr(row.category)
    let categoryDoc = null as Awaited<ReturnType<typeof resolveCategoryBySlug>>

    if (categorySlug) {
      categoryDoc = await resolveCategoryBySlug(categorySlug)
      if (!categoryDoc) {
        pushError(
          result.errors,
          `Row ${index + 2}: category_slug "${categorySlug}" not found (import categories first)`,
        )
        result.skipped += 1
        continue
      }
      categoryTitle = categoryTitle || categoryDoc.title
    }

    if (!categoryTitle) {
      pushError(result.errors, `Row ${index + 2}: category or category_slug is required`)
      result.skipped += 1
      continue
    }

    const img = imageOrPlaceholder(row.img)
    const images = parseList(row.images)
    const normalizedImages = images.length > 0 ? images : img !== BULK_IMPORT_PLACEHOLDER_IMG ? [img] : []

    try {
      const existing = await ProductModel.findOne({ slug })
      const payload = {
        title,
        category: categoryTitle,
        categoryId: categoryDoc?._id ?? existing?.categoryId ?? null,
        img,
        images: normalizedImages.length > 0 ? normalizedImages : [img],
        shortDescription: cellStr(row.short_description),
        description: cellStr(row.description) || cellStr(row.short_description),
        features: parseList(row.features),
        material: cellStr(row.material),
        dimensions: cellStr(row.dimensions),
        standard: cellStr(row.standard),
        thickness: cellStr(row.thickness),
        warranty: cellStr(row.warranty),
        badge: cellStr(row.badge),
        inStock: parseBool(row.in_stock, existing?.inStock ?? true),
        showInFooter: parseBool(row.show_in_footer, existing?.showInFooter ?? false),
        sortOrder: parseOptionalNumber(row.sort_order, existing?.sortOrder ?? 0),
      }

      if (existing) {
        const sku = cellStr(row.sku)
        if (sku) existing.sku = sku
        Object.assign(existing, payload)
        await existing.save()
        result.updated += 1
      } else {
        const sku = cellStr(row.sku) || (await getNextProductSku())
        await ProductModel.create({ slug, sku, ...payload })
        result.added += 1
      }
    } catch (error) {
      pushError(
        result.errors,
        `Row ${index + 2}: ${error instanceof Error ? error.message : 'Failed to save product'}`,
      )
      result.skipped += 1
    }
  }

  return result
}

export async function importCmsFromExcel(
  type: BulkImportType,
  buffer: Buffer,
): Promise<BulkImportResult> {
  await connectDB()
  const rows = readDataSheetRows(buffer)

  if (rows.length === 0) {
    return {
      added: 0,
      updated: 0,
      skipped: 0,
      errors: ['No rows found. Use the Data sheet with column headers.'],
    }
  }

  switch (type) {
    case 'categories':
      return importCategories(rows)
    case 'materials':
      return importMaterials(rows)
    case 'products':
      return importProducts(rows)
    default:
      return { added: 0, updated: 0, skipped: 0, errors: ['Unknown import type'] }
  }
}
