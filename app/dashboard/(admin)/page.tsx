'use client'

import { useEffect, useMemo, useState } from 'react'
import { DashboardDrawer } from '@/components/DashboardDrawer'
import { DashboardImageGalleryField } from '@/components/DashboardImageGalleryField'
import { getAllCatalogProducts, type Product } from '@/lib/products'
import type { CategoryDto } from '@/lib/serializers'
import {
  addCustomDashboardProduct,
  getNextCustomProductSku,
  readDashboardStore,
  removeCustomDashboardProduct,
  slugifyProductTitle,
  subscribeDashboardStore,
  updateCustomDashboardProduct,
} from '@/lib/dashboard-store'

type DashboardRow = Product & { source: 'catalog' | 'custom'; showInFooter: boolean }

const emptyProductForm = {
  title: '',
  sku: '',
  categoryId: '',
  shortDescription: '',
  description: '',
  typeGrade: '',
  size: '',
  standard: '',
  thickness: '',
  warranty: '',
  features: [] as string[],
  featureDraft: '',
  images: [] as string[],
  badge: '',
  inStock: true,
  showInFooter: false,
}

function parseTagValues(value: string) {
  return value
    .split('/')
    .map((part) => part.trim())
    .filter(Boolean)
}

function buildRows(catalogProducts: Product[]): DashboardRow[] {
  const store = readDashboardStore()

  const catalogRows = catalogProducts.map((product) => ({
    ...product,
    source: 'catalog' as const,
    showInFooter: false,
  }))

  const customRows = store.customProducts.map((product) => ({
    ...product,
    source: 'custom' as const,
    showInFooter: product.showInFooter,
  }))

  return [...customRows, ...catalogRows]
}

function TagPreview({ value }: { value: string }) {
  const tags = parseTagValues(value)
  if (tags.length === 0) return null

  return (
    <div className="dashTagRow" aria-hidden>
      {tags.map((tag) => (
        <span key={tag} className="dashBadge dashBadge--sm dashBadge--off">
          {tag}
        </span>
      ))}
    </div>
  )
}

export default function DashboardProductsPage() {
  const catalogProducts = useMemo(() => getAllCatalogProducts(), [])
  const [rows, setRows] = useState<DashboardRow[]>([])
  const [categories, setCategories] = useState<CategoryDto[]>([])
  const [drawerOpen, setDrawerOpen] = useState(false)
  const [editingSlug, setEditingSlug] = useState<string | null>(null)
  const [form, setForm] = useState(emptyProductForm)

  useEffect(() => {
    const refresh = () => setRows(buildRows(catalogProducts))
    refresh()
    return subscribeDashboardStore(refresh)
  }, [catalogProducts])

  useEffect(() => {
    fetch('/api/categories')
      .then((response) => response.json())
      .then((data) => {
        const nextCategories = data.categories || []
        setCategories(nextCategories)
        setForm((current) => ({
          ...current,
          categoryId: current.categoryId || nextCategories[0]?.id || '',
        }))
      })
      .catch(() => undefined)
  }, [])

  const openAddDrawer = () => {
    setEditingSlug(null)
    setForm({
      ...emptyProductForm,
      categoryId: categories[0]?.id ?? '',
      sku: getNextCustomProductSku(),
    })
    setDrawerOpen(true)
  }

  const openEditDrawer = (row: DashboardRow) => {
    if (row.source !== 'custom') return

    const category = categories.find((item) => item.title === row.category)
    setEditingSlug(row.slug)
    setForm({
      title: row.title,
      sku: row.sku,
      categoryId: category?.id ?? categories[0]?.id ?? '',
      shortDescription: row.shortDescription,
      description: row.description,
      typeGrade: row.material ?? '',
      size: row.dimensions ?? '',
      standard: row.standard ?? '',
      thickness: row.thickness ?? '',
      warranty: row.warranty ?? '',
      features: [...row.features],
      featureDraft: '',
      images: row.images.length > 0 ? [...row.images] : row.img ? [row.img] : [],
      badge: row.badge ?? '',
      inStock: row.inStock,
      showInFooter: row.showInFooter,
    })
    setDrawerOpen(true)
  }

  const closeDrawer = () => {
    setDrawerOpen(false)
    setEditingSlug(null)
    setForm({
      ...emptyProductForm,
      categoryId: categories[0]?.id ?? '',
    })
  }

  const handleDeleteCustom = (slug: string) => {
    if (!window.confirm('Delete this product? SKU numbers will renumber automatically.')) return
    removeCustomDashboardProduct(slug)
  }

  const addFeature = () => {
    const next = form.featureDraft.trim()
    if (!next) return
    setForm((current) => ({
      ...current,
      features: [...current.features, next],
      featureDraft: '',
    }))
  }

  const removeFeature = (index: number) => {
    setForm((current) => ({
      ...current,
      features: current.features.filter((_, itemIndex) => itemIndex !== index),
    }))
  }

  const handleSave = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault()

    const category = categories.find((item) => item.id === form.categoryId)
    if (!category) return

    const images = form.images.map((url) => url.trim()).filter(Boolean)
    if (images.length === 0) return

    const features = form.features
    const payload = {
      title: form.title.trim(),
      price: '',
      rating: '4.8',
      img: images[0],
      images,
      category: category.title,
      badge: form.badge.trim() || undefined,
      shortDescription: form.shortDescription.trim(),
      description: form.description.trim() || form.shortDescription.trim(),
      features,
      material: form.typeGrade.trim() || undefined,
      dimensions: form.size.trim() || undefined,
      standard: form.standard.trim() || undefined,
      thickness: form.thickness.trim() || undefined,
      warranty: form.warranty.trim() || undefined,
      reviewCount: 0,
      inStock: form.inStock,
      showInFooter: form.showInFooter,
    }

    if (editingSlug) {
      updateCustomDashboardProduct(editingSlug, payload)
      closeDrawer()
      return
    }

    const slug = slugifyProductTitle(form.title)
    if (!slug) return

    addCustomDashboardProduct({
      id: `custom-${slug}`,
      slug,
      sku: getNextCustomProductSku(),
      ...payload,
    })

    closeDrawer()
  }

  return (
    <div className="dashPage">
      <div className="dashPageHeader">
        <div>
          <h1>Products</h1>
          <p>
            Add products with category, type/grade, size, standard, overview, features, and images —
            matching the product listing layout on the website.
          </p>
        </div>
        <button type="button" className="dashBtn" onClick={openAddDrawer}>
          Add product
        </button>
      </div>

      <div className="dashCard">
        <table className="dashTable">
          <thead>
            <tr>
              <th>Image</th>
              <th>Product</th>
              <th>SKU</th>
              <th>Category</th>
              <th>Source</th>
              <th />
            </tr>
          </thead>
          <tbody>
            {rows.length === 0 ? (
              <tr>
                <td colSpan={6}>No products yet.</td>
              </tr>
            ) : (
              rows.map((row) => (
                <tr key={`${row.source}-${row.slug}`}>
                  <td>
                    {row.img ? (
                      <img src={row.img} alt={row.title} className="dashTableThumb" />
                    ) : (
                      <span className="dashTableThumb dashTableThumb--empty">—</span>
                    )}
                  </td>
                  <td>
                    <div className="dashTableCategoryCell">
                      <strong>{row.title}</strong>
                      {row.material ? (
                        <div className="dashTagRow">
                          {parseTagValues(row.material).map((tag) => (
                            <span key={tag} className="dashBadge dashBadge--sm dashBadge--off">
                              {tag}
                            </span>
                          ))}
                        </div>
                      ) : null}
                    </div>
                  </td>
                  <td>{row.sku}</td>
                  <td>
                    <span className="dashBadge dashBadge--sm dashBadge--on">{row.category}</span>
                  </td>
                  <td>{row.source === 'custom' ? 'Dashboard' : 'Catalog'}</td>
                  <td>
                    {row.source === 'custom' ? (
                      <div className="dashTableActions">
                        <button
                          type="button"
                          className="dashBtn dashBtn--small"
                          onClick={() => openEditDrawer(row)}
                        >
                          Edit
                        </button>
                        <button
                          type="button"
                          className="dashBtn dashBtn--danger dashBtn--small"
                          onClick={() => handleDeleteCustom(row.slug)}
                        >
                          Delete
                        </button>
                      </div>
                    ) : null}
                  </td>
                </tr>
              ))
            )}
          </tbody>
        </table>
      </div>

      <DashboardDrawer
        open={drawerOpen}
        title={editingSlug ? 'Edit product' : 'Add product'}
        onClose={closeDrawer}
      >
        <form className="dashDrawerForm" onSubmit={handleSave}>
          <div className="dashField">
            <label htmlFor="product-title">Product title</label>
            <input
              id="product-title"
              value={form.title}
              onChange={(event) => setForm((current) => ({ ...current, title: event.target.value }))}
              placeholder="e.g. MS Channels"
              required
            />
          </div>

          <div className="dashField">
            <label htmlFor="product-sku">SKU</label>
            <input
              id="product-sku"
              value={form.sku}
              readOnly
              className="dashInputReadonly"
            />
            <p className="dashHint">
              Auto-assigned from 1. Renumbers when dashboard products are deleted.
            </p>
          </div>

          <div className="dashField">
            <label htmlFor="product-category">Category</label>
            <select
              id="product-category"
              value={form.categoryId}
              onChange={(event) =>
                setForm((current) => ({ ...current, categoryId: event.target.value }))
              }
              required
            >
              <option value="" disabled>
                Select category
              </option>
              {categories.map((category) => (
                <option key={category.id} value={category.id}>
                  {category.title}
                </option>
              ))}
            </select>
          </div>

          <DashboardImageGalleryField
            id="product-images"
            label="Product images"
            values={form.images}
            onChange={(images) => setForm((current) => ({ ...current, images }))}
            folder="products"
          />

          <div className="dashField">
            <label htmlFor="product-type-grade">Type / Grade</label>
            <input
              id="product-type-grade"
              value={form.typeGrade}
              onChange={(event) =>
                setForm((current) => ({ ...current, typeGrade: event.target.value }))
              }
              placeholder="e.g. MS Channels / PFC / UPN / UPE"
            />
            <p className="dashHint">Separate options with / — shown as tags on the product listing.</p>
            <TagPreview value={form.typeGrade} />
          </div>

          <div className="dashField">
            <label htmlFor="product-size">Size</label>
            <input
              id="product-size"
              value={form.size}
              onChange={(event) => setForm((current) => ({ ...current, size: event.target.value }))}
              placeholder="e.g. 50 mm to 400 mm"
            />
          </div>

          <div className="dashField">
            <label htmlFor="product-standard">Standard (optional)</label>
            <input
              id="product-standard"
              value={form.standard}
              onChange={(event) =>
                setForm((current) => ({ ...current, standard: event.target.value }))
              }
              placeholder="e.g. ASTM A36 / S275JR / S355JR / EN Standards"
            />
            <p className="dashHint">Separate standards with / — only shown on the website if filled in.</p>
            <TagPreview value={form.standard} />
          </div>

          <div className="dashField">
            <label htmlFor="product-thickness">Thickness (optional)</label>
            <input
              id="product-thickness"
              value={form.thickness}
              onChange={(event) =>
                setForm((current) => ({ ...current, thickness: event.target.value }))
              }
              placeholder="e.g. 2 mm / 3 mm / 5 mm"
            />
            <p className="dashHint">Separate values with / — only shown on the website if filled in.</p>
            <TagPreview value={form.thickness} />
          </div>

          <div className="dashField">
            <label htmlFor="product-badge">Badge (optional)</label>
            <input
              id="product-badge"
              value={form.badge}
              onChange={(event) => setForm((current) => ({ ...current, badge: event.target.value }))}
              placeholder="e.g. Popular, New"
            />
          </div>

          <div className="dashField">
            <label htmlFor="product-short-description">Short description</label>
            <textarea
              id="product-short-description"
              value={form.shortDescription}
              onChange={(event) =>
                setForm((current) => ({ ...current, shortDescription: event.target.value }))
              }
              placeholder="Shown under the product title on the detail page"
              required
            />
          </div>

          <div className="dashField">
            <label htmlFor="product-description">Product overview</label>
            <textarea
              id="product-description"
              value={form.description}
              onChange={(event) =>
                setForm((current) => ({ ...current, description: event.target.value }))
              }
              placeholder="Full overview text for the product details section"
            />
          </div>

          <div className="dashField">
            <label htmlFor="product-warranty">Warranty (optional)</label>
            <input
              id="product-warranty"
              value={form.warranty}
              onChange={(event) =>
                setForm((current) => ({ ...current, warranty: event.target.value }))
              }
              placeholder="Optional"
            />
          </div>

          <div className="dashField">
            <label htmlFor="product-features">Key features</label>
            <div className="dashInlineFieldRow">
              <input
                id="product-features"
                value={form.featureDraft}
                onChange={(event) =>
                  setForm((current) => ({ ...current, featureDraft: event.target.value }))
                }
                onKeyDown={(event) => {
                  if (event.key === 'Enter') {
                    event.preventDefault()
                    addFeature()
                  }
                }}
                placeholder="Type a feature, then click Add"
              />
              <button type="button" className="dashBtn dashBtn--small" onClick={addFeature}>
                Add
              </button>
            </div>
            {form.features.length > 0 ? (
              <ul className="dashFeatureList">
                {form.features.map((feature, index) => (
                  <li key={`${feature}-${index}`}>
                    <span>{feature}</span>
                    <button
                      type="button"
                      className="dashBtn dashBtn--ghost dashBtn--small"
                      onClick={() => removeFeature(index)}
                    >
                      Remove
                    </button>
                  </li>
                ))}
              </ul>
            ) : (
              <p className="dashHint">Add features one at a time — each appears as a bullet on the product page.</p>
            )}
          </div>

          <label className="dashCheckboxLabel">
            <input
              type="checkbox"
              checked={form.inStock}
              onChange={(event) =>
                setForm((current) => ({ ...current, inStock: event.target.checked }))
              }
            />
            <span>In stock — ready to supply</span>
          </label>

          <label className="dashCheckboxLabel">
            <input
              type="checkbox"
              checked={form.showInFooter}
              onChange={(event) =>
                setForm((current) => ({ ...current, showInFooter: event.target.checked }))
              }
            />
            <span>Show in footer</span>
          </label>
          <p className="dashHint">
            When checked, this product will appear in the footer Products column on the website.
          </p>

          <div className="dashDrawerActions">
            <button type="submit" className="dashBtn" disabled={!form.categoryId || form.images.length === 0}>
              {editingSlug ? 'Save changes' : 'Save product'}
            </button>
            <button type="button" className="dashBtn dashBtn--ghost" onClick={closeDrawer}>
              Cancel
            </button>
          </div>
        </form>
      </DashboardDrawer>
    </div>
  )
}
