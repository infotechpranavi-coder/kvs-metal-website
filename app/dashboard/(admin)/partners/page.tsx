'use client'

import { useEffect, useMemo, useState } from 'react'
import { DashboardDrawer } from '@/components/DashboardDrawer'
import { DashboardImageField } from '@/components/DashboardImageField'
import type { PartnerDto } from '@/lib/serializers'

const emptyForm = {
  name: '',
  img: '',
}

export default function DashboardPartnersPage() {
  const [partners, setPartners] = useState<PartnerDto[]>([])
  const [form, setForm] = useState(emptyForm)
  const [editingId, setEditingId] = useState<string | null>(null)
  const [loading, setLoading] = useState(true)
  const [saving, setSaving] = useState(false)
  const [error, setError] = useState('')
  const [drawerOpen, setDrawerOpen] = useState(false)

  const loadPartners = async () => {
    setLoading(true)
    const response = await fetch('/api/partners')
    const data = await response.json()
    setPartners(data.partners || [])
    setLoading(false)
  }

  useEffect(() => {
    loadPartners()
  }, [])

  const sortedPartners = useMemo(
    () => [...partners].sort((a, b) => a.sortOrder - b.sortOrder || a.name.localeCompare(b.name)),
    [partners],
  )

  const openAddDrawer = () => {
    setEditingId(null)
    setForm(emptyForm)
    setError('')
    setDrawerOpen(true)
  }

  const openEditDrawer = (partner: PartnerDto) => {
    setEditingId(partner.id)
    setForm({
      name: partner.name,
      img: partner.img,
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
      name: form.name.trim(),
      img: form.img.trim(),
      sortOrder: editingId
        ? sortedPartners.find((item) => item.id === editingId)?.sortOrder
        : sortedPartners.length,
    }

    const response = editingId
      ? await fetch(`/api/partners/${editingId}`, {
          method: 'PATCH',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify(payload),
        })
      : await fetch('/api/partners', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify(payload),
        })

    if (!response.ok) {
      const data = await response.json()
      setError(typeof data.error === 'string' ? data.error : 'Failed to save logo')
      setSaving(false)
      return
    }

    closeDrawer()
    await loadPartners()
    setSaving(false)
  }

  const handleDelete = async (partner: PartnerDto) => {
    if (!window.confirm(`Remove "${partner.name}" from the homepage slider?`)) return
    await fetch(`/api/partners/${partner.id}`, { method: 'DELETE' })
    await loadPartners()
  }

  const movePartner = async (partner: PartnerDto, direction: -1 | 1) => {
    const index = sortedPartners.findIndex((item) => item.id === partner.id)
    const swap = sortedPartners[index + direction]
    if (!swap) return

    await Promise.all([
      fetch(`/api/partners/${partner.id}`, {
        method: 'PATCH',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ sortOrder: swap.sortOrder }),
      }),
      fetch(`/api/partners/${swap.id}`, {
        method: 'PATCH',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ sortOrder: partner.sortOrder }),
      }),
    ])

    await loadPartners()
  }

  return (
    <div className="dashPage">
      <div className="dashPageHeader">
        <div>
          <h1>Client &amp; supplier logos</h1>
          <p>
            Manage the scrolling logo strip on the homepage — just above the Our Products section.
            Upload logo images for clients or suppliers. If none are added, the default text names
            are shown.
          </p>
        </div>
        <button type="button" className="dashBtn" onClick={openAddDrawer}>
          Add logo
        </button>
      </div>

      <div className="dashCard">
        <table className="dashTable">
          <thead>
            <tr>
              <th>Logo</th>
              <th>Name</th>
              <th>Order</th>
              <th />
            </tr>
          </thead>
          <tbody>
            {loading ? (
              <tr>
                <td colSpan={4}>Loading…</td>
              </tr>
            ) : sortedPartners.length === 0 ? (
              <tr>
                <td colSpan={4}>
                  No logos yet. Add client or supplier logos to replace the default homepage names.
                </td>
              </tr>
            ) : (
              sortedPartners.map((partner, index) => (
                <tr key={partner.id}>
                  <td>
                    {partner.img ? (
                      <img
                        src={partner.img}
                        alt={partner.name}
                        className="dashTableThumb dashTableThumb--logo"
                      />
                    ) : (
                      <span className="dashTableThumb dashTableThumb--empty">—</span>
                    )}
                  </td>
                  <td>{partner.name}</td>
                  <td>{index + 1}</td>
                  <td>
                    <div className="dashTableActions">
                      <button
                        type="button"
                        className="dashBtn dashBtn--small dashBtn--ghost"
                        disabled={index === 0}
                        onClick={() => movePartner(partner, -1)}
                      >
                        Up
                      </button>
                      <button
                        type="button"
                        className="dashBtn dashBtn--small dashBtn--ghost"
                        disabled={index === sortedPartners.length - 1}
                        onClick={() => movePartner(partner, 1)}
                      >
                        Down
                      </button>
                      <button
                        type="button"
                        className="dashBtn dashBtn--small"
                        onClick={() => openEditDrawer(partner)}
                      >
                        Edit
                      </button>
                      <button
                        type="button"
                        className="dashBtn dashBtn--danger dashBtn--small"
                        onClick={() => handleDelete(partner)}
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
        title={editingId ? 'Edit logo' : 'Add logo'}
        onClose={closeDrawer}
      >
        <form className="dashDrawerForm" onSubmit={handleSave}>
          <div className="dashField">
            <label htmlFor="partner-name">Company name</label>
            <input
              id="partner-name"
              value={form.name}
              onChange={(event) => setForm((current) => ({ ...current, name: event.target.value }))}
              placeholder="e.g. TATA, JSW, Essar"
              required
            />
          </div>
          <DashboardImageField
            id="partner-img"
            label="Logo image"
            value={form.img}
            onChange={(img) => setForm((current) => ({ ...current, img }))}
            folder="partners"
          />
          <p className="dashFieldHint">
            Use a wide logo on a transparent or white background. Recommended height: about 48–80px.
          </p>
          {error ? <p className="dashError">{error}</p> : null}
          <div className="dashDrawerActions">
            <button type="submit" className="dashBtn" disabled={saving || !form.name.trim()}>
              {saving ? 'Saving…' : editingId ? 'Update logo' : 'Save logo'}
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
