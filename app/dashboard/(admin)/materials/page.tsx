'use client'

import { useEffect, useState } from 'react'
import { DashboardDrawer } from '@/components/DashboardDrawer'
import { DashboardImageField } from '@/components/DashboardImageField'
import type { MaterialDto } from '@/lib/serializers'

const emptyForm = {
  title: '',
  slug: '',
  img: '',
  description: '',
}

export default function DashboardMaterialsPage() {
  const [materials, setMaterials] = useState<MaterialDto[]>([])
  const [form, setForm] = useState(emptyForm)
  const [editingId, setEditingId] = useState<string | null>(null)
  const [loading, setLoading] = useState(true)
  const [saving, setSaving] = useState(false)
  const [error, setError] = useState('')
  const [drawerOpen, setDrawerOpen] = useState(false)

  const loadMaterials = async () => {
    setLoading(true)
    const response = await fetch('/api/materials')
    const data = await response.json()
    setMaterials(data.materials || [])
    setLoading(false)
  }

  useEffect(() => {
    loadMaterials()
  }, [])

  const openAddDrawer = () => {
    setEditingId(null)
    setForm(emptyForm)
    setError('')
    setDrawerOpen(true)
  }

  const openEditDrawer = (material: MaterialDto) => {
    setEditingId(material.id)
    setForm({
      title: material.title,
      slug: material.slug,
      img: material.img,
      description: material.description,
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
    }

    const response = editingId
      ? await fetch(`/api/materials/${editingId}`, {
          method: 'PATCH',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify(payload),
        })
      : await fetch('/api/materials', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify(payload),
        })

    if (!response.ok) {
      const data = await response.json()
      setError(typeof data.error === 'string' ? data.error : 'Failed to save material')
      setSaving(false)
      return
    }

    closeDrawer()
    await loadMaterials()
    setSaving(false)
  }

  const handleDelete = async (material: MaterialDto) => {
    if (!window.confirm(`Delete material "${material.title}"?`)) return
    await fetch(`/api/materials/${material.id}`, { method: 'DELETE' })
    await loadMaterials()
  }

  return (
    <div className="dashPage">
      <div className="dashPageHeader">
        <div>
          <h1>Materials</h1>
          <p>
            Homepage materials start from the built-in seed list. Add, edit, or delete here to
            update what visitors see.
          </p>
        </div>
        <button type="button" className="dashBtn" onClick={openAddDrawer}>
          Add material
        </button>
      </div>

      <div className="dashCard">
        <table className="dashTable">
          <thead>
            <tr>
              <th>Material</th>
              <th>Slug</th>
              <th>Description</th>
              <th />
            </tr>
          </thead>
          <tbody>
            {loading ? (
              <tr>
                <td colSpan={4}>Loading…</td>
              </tr>
            ) : materials.length === 0 ? (
              <tr>
                <td colSpan={4}>No materials yet.</td>
              </tr>
            ) : (
              materials.map((material) => (
                <tr key={material.id}>
                  <td>{material.title}</td>
                  <td>{material.slug}</td>
                  <td>{material.description || '—'}</td>
                  <td>
                    <div className="dashTableActions">
                      <button
                        type="button"
                        className="dashBtn dashBtn--small"
                        onClick={() => openEditDrawer(material)}
                      >
                        Edit
                      </button>
                      <button
                        type="button"
                        className="dashBtn dashBtn--danger dashBtn--small"
                        onClick={() => handleDelete(material)}
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
        title={editingId ? 'Edit material' : 'Add material'}
        onClose={closeDrawer}
      >
        <form className="dashDrawerForm" onSubmit={handleSave}>
          <div className="dashField">
            <label htmlFor="material-title">Title</label>
            <input
              id="material-title"
              value={form.title}
              onChange={(event) => setForm((current) => ({ ...current, title: event.target.value }))}
              required
            />
          </div>
          <div className="dashField">
            <label htmlFor="material-slug">Slug (optional)</label>
            <input
              id="material-slug"
              value={form.slug}
              onChange={(event) => setForm((current) => ({ ...current, slug: event.target.value }))}
            />
          </div>
          <DashboardImageField
            id="material-img"
            label="Image"
            value={form.img}
            onChange={(img) => setForm((current) => ({ ...current, img }))}
            folder="materials"
          />
          <div className="dashField">
            <label htmlFor="material-description">Description</label>
            <textarea
              id="material-description"
              value={form.description}
              onChange={(event) =>
                setForm((current) => ({ ...current, description: event.target.value }))
              }
            />
          </div>
          {error ? <p className="dashError">{error}</p> : null}
          <div className="dashDrawerActions">
            <button type="submit" className="dashBtn" disabled={saving || !form.img.trim()}>
              {saving ? 'Saving…' : editingId ? 'Update material' : 'Save material'}
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
