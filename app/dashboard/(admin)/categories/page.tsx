'use client'

import { useEffect, useState } from 'react'
import { DashboardDrawer } from '@/components/DashboardDrawer'
import { DashboardImageField } from '@/components/DashboardImageField'
import type { CategoryDto, MaterialDto } from '@/lib/serializers'

type CategoryRow = CategoryDto & { materialId?: string | null; materialTitle?: string | null }

const emptyForm = {
  title: '',
  slug: '',
  img: '',
  description: '',
  headline: '',
  materialId: '',
  showOnHomepage: false,
}

export default function DashboardCategoriesPage() {
  const [categories, setCategories] = useState<CategoryRow[]>([])
  const [materials, setMaterials] = useState<MaterialDto[]>([])
  const [form, setForm] = useState(emptyForm)
  const [editingId, setEditingId] = useState<string | null>(null)
  const [loading, setLoading] = useState(true)
  const [saving, setSaving] = useState(false)
  const [error, setError] = useState('')
  const [drawerOpen, setDrawerOpen] = useState(false)

  const loadData = async () => {
    setLoading(true)
    const [categoriesRes, materialsRes] = await Promise.all([
      fetch('/api/categories'),
      fetch('/api/materials'),
    ])
    const categoriesData = await categoriesRes.json()
    const materialsData = await materialsRes.json()
    setCategories(categoriesData.categories || [])
    setMaterials(materialsData.materials || [])
    setLoading(false)
  }

  useEffect(() => {
    loadData()
  }, [])

  const openAddDrawer = () => {
    setEditingId(null)
    setForm({ ...emptyForm })
    setError('')
    setDrawerOpen(true)
  }

  const openEditDrawer = (category: CategoryRow) => {
    setEditingId(category.id)
    setForm({
      title: category.title,
      slug: category.slug,
      img: category.img,
      description: category.description,
      headline: category.headline,
      materialId: category.materialId ?? '',
      showOnHomepage: category.showOnHomepage ?? false,
    })
    setError('')
    setDrawerOpen(true)
  }

  const closeDrawer = () => {
    setDrawerOpen(false)
    setEditingId(null)
    setForm(emptyForm)
    setError('')
  }

  const handleSave = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault()
    setSaving(true)
    setError('')

    const payload = {
      title: form.title,
      slug: form.slug || undefined,
      img: form.img,
      description: form.description,
      headline: form.headline,
      materialId: form.materialId.trim() ? form.materialId : editingId ? null : undefined,
      showOnHomepage: form.showOnHomepage,
    }

    const response = editingId
      ? await fetch(`/api/categories/${editingId}`, {
          method: 'PATCH',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify(payload),
        })
      : await fetch('/api/categories', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify(payload),
        })

    if (!response.ok) {
      const data = await response.json()
      setError(typeof data.error === 'string' ? data.error : 'Failed to save category')
      setSaving(false)
      return
    }

    closeDrawer()
    await loadData()
    setSaving(false)
  }

  const handleDelete = async (category: CategoryRow) => {
    if (!window.confirm(`Delete category "${category.title}"?`)) return
    await fetch(`/api/categories/${category.id}`, { method: 'DELETE' })
    await loadData()
  }

  return (
    <div className="dashPage">
      <div className="dashPageHeader">
        <div>
          <h1>Product categories</h1>
          <p>
            Create categories for your products. Use &quot;Show on homepage&quot; when adding or
            editing a category to feature it in the Our Products section.
          </p>
        </div>
        <button type="button" className="dashBtn" onClick={openAddDrawer}>
          Add category
        </button>
      </div>

      <div className="dashCard">
        <table className="dashTable">
          <thead>
            <tr>
              <th>Image</th>
              <th>Category</th>
              <th>Material</th>
              <th>Slug</th>
              <th>Description</th>
              <th />
            </tr>
          </thead>
          <tbody>
            {loading ? (
              <tr>
                <td colSpan={6}>Loading…</td>
              </tr>
            ) : categories.length === 0 ? (
              <tr>
                <td colSpan={6}>No categories yet.</td>
              </tr>
            ) : (
              categories.map((category) => (
                <tr key={category.id}>
                  <td>
                    {category.img ? (
                      <img
                        src={category.img}
                        alt={category.title}
                        className="dashTableThumb"
                      />
                    ) : (
                      <span className="dashTableThumb dashTableThumb--empty">—</span>
                    )}
                  </td>
                  <td>
                    <div className="dashTableCategoryCell">
                      <strong>{category.title}</strong>
                      <span
                        className={
                          category.showOnHomepage
                            ? 'dashBadge dashBadge--sm dashBadge--on'
                            : 'dashBadge dashBadge--sm dashBadge--off'
                        }
                      >
                        {category.showOnHomepage ? 'Homepage' : 'Sidebar only'}
                      </span>
                    </div>
                  </td>
                  <td>{category.materialTitle || '—'}</td>
                  <td>{category.slug}</td>
                  <td>{category.description || '—'}</td>
                  <td>
                    <div className="dashTableActions">
                      <button
                        type="button"
                        className="dashBtn dashBtn--small"
                        onClick={() => openEditDrawer(category)}
                      >
                        Edit
                      </button>
                      <button
                        type="button"
                        className="dashBtn dashBtn--danger dashBtn--small"
                        onClick={() => handleDelete(category)}
                      >
                        Delete
                      </button>
                    </div>
                  </td>
                </tr>
              ))
            )}
          </tbody>
        </table>
      </div>

      <DashboardDrawer
        open={drawerOpen}
        title={editingId ? 'Edit category' : 'Add category'}
        onClose={closeDrawer}
      >
        <form className="dashDrawerForm" onSubmit={handleSave}>
          <div className="dashField">
            <label htmlFor="category-title">Title</label>
            <input
              id="category-title"
              value={form.title}
              onChange={(event) => setForm((current) => ({ ...current, title: event.target.value }))}
              required
            />
          </div>
          <div className="dashField">
            <label htmlFor="category-slug">Slug (optional)</label>
            <input
              id="category-slug"
              value={form.slug}
              onChange={(event) => setForm((current) => ({ ...current, slug: event.target.value }))}
              placeholder="auto-generated from title"
            />
          </div>
          <DashboardImageField
            id="category-img"
            label="Image"
            value={form.img}
            onChange={(img) => setForm((current) => ({ ...current, img }))}
            folder="categories"
          />
          <div className="dashField">
            <label htmlFor="category-description">Short description</label>
            <input
              id="category-description"
              value={form.description}
              onChange={(event) =>
                setForm((current) => ({ ...current, description: event.target.value }))
              }
            />
          </div>
          <div className="dashField">
            <label htmlFor="category-headline">Headline</label>
            <textarea
              id="category-headline"
              value={form.headline}
              onChange={(event) => setForm((current) => ({ ...current, headline: event.target.value }))}
            />
          </div>
          <div className="dashField">
            <label htmlFor="category-material">Material (optional)</label>
            <select
              id="category-material"
              value={form.materialId}
              onChange={(event) =>
                setForm((current) => ({ ...current, materialId: event.target.value }))
              }
            >
              <option value="">None — category only</option>
              {materials.map((material) => (
                <option key={material.id} value={material.id}>
                  {material.title}
                </option>
              ))}
            </select>
            <p className="dashHint">
              Leave unset if this category is not tied to a material. Products link to categories
              directly.
            </p>
          </div>
          <label className="dashCheckboxLabel">
            <input
              type="checkbox"
              checked={form.showOnHomepage}
              onChange={(event) =>
                setForm((current) => ({ ...current, showOnHomepage: event.target.checked }))
              }
            />
            <span>Show on homepage (Our Products section)</span>
          </label>
          <p className="dashHint">
            Only checked categories appear on the homepage. All categories remain on the products
            page sidebar.
          </p>
          {error ? <p className="dashError">{error}</p> : null}
          <div className="dashDrawerActions">
            <button type="submit" className="dashBtn" disabled={saving || !form.img.trim()}>
              {saving ? 'Saving…' : editingId ? 'Update category' : 'Save category'}
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
