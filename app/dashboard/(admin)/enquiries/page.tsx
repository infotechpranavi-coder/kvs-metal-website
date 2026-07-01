'use client'

import { useEffect, useMemo, useState } from 'react'
import type { EnquiryDto } from '@/lib/serializers'

type EnquiryTab = 'all' | 'contact' | 'brochure' | 'product' | 'careers'

const tabs: Array<{ id: EnquiryTab; label: string; types?: string[] }> = [
  { id: 'all', label: 'All' },
  { id: 'contact', label: 'Contact form', types: ['general', 'bulk', 'fabrication'] },
  { id: 'brochure', label: 'Brochure', types: ['brochure'] },
  { id: 'product', label: 'Product enquiry', types: ['product-enquiry'] },
  { id: 'careers', label: 'Careers', types: ['careers'] },
]

function matchesTab(enquiry: EnquiryDto, tab: EnquiryTab) {
  const config = tabs.find((item) => item.id === tab)
  if (!config?.types) return true
  return config.types.includes(enquiry.type)
}

export default function DashboardEnquiriesPage() {
  const [enquiries, setEnquiries] = useState<EnquiryDto[]>([])
  const [loading, setLoading] = useState(true)
  const [selected, setSelected] = useState<EnquiryDto | null>(null)
  const [activeTab, setActiveTab] = useState<EnquiryTab>('all')
  const [emailConfigured, setEmailConfigured] = useState(false)
  const [notifyTo, setNotifyTo] = useState('')
  const [resending, setResending] = useState<'admin' | 'customer' | null>(null)
  const [actionMessage, setActionMessage] = useState('')

  const loadEnquiries = async () => {
    setLoading(true)
    const response = await fetch('/api/enquiries')
    const data = await response.json()
    setEnquiries(data.enquiries || [])
    setLoading(false)
  }

  const loadEmailStatus = async () => {
    const response = await fetch('/api/email')
    const data = await response.json()
    setEmailConfigured(Boolean(data.configured))
    setNotifyTo(data.notifyTo || '')
  }

  useEffect(() => {
    loadEnquiries()
    loadEmailStatus()
  }, [])

  const filteredEnquiries = useMemo(
    () => enquiries.filter((enquiry) => matchesTab(enquiry, activeTab)),
    [enquiries, activeTab],
  )

  const tabCounts = useMemo(
    () =>
      tabs.reduce<Record<EnquiryTab, number>>(
        (counts, tab) => {
          counts[tab.id] =
            tab.id === 'all'
              ? enquiries.length
              : enquiries.filter((enquiry) => matchesTab(enquiry, tab.id)).length
          return counts
        },
        { all: 0, contact: 0, brochure: 0, product: 0, careers: 0 },
      ),
    [enquiries],
  )

  const updateStatus = async (id: string, status: 'new' | 'read' | 'closed') => {
    await fetch(`/api/enquiries/${id}`, {
      method: 'PATCH',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ status }),
    })
    await loadEnquiries()
    setSelected((current) => (current?.id === id ? { ...current, status } : current))
  }

  const handleDelete = async (id: string) => {
    if (!window.confirm('Delete this enquiry?')) return
    await fetch(`/api/enquiries/${id}`, { method: 'DELETE' })
    if (selected?.id === id) setSelected(null)
    await loadEnquiries()
  }

  const handleResend = async (target: 'admin' | 'customer') => {
    if (!selected) return

    setResending(target)
    setActionMessage('')

    const response = await fetch(`/api/enquiries/${selected.id}/resend`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ target }),
    })

    const data = await response.json()
    setResending(null)

    if (!response.ok) {
      setActionMessage(data.error || 'Failed to send email')
      return
    }

    setActionMessage(
      target === 'admin'
        ? `Form details sent to ${notifyTo || 'admin inbox'}.`
        : `Email sent to ${selected.email}.`,
    )
  }

  return (
    <div className="dashPage">
      <div className="dashPageHeader">
        <div>
          <h1>Enquiries</h1>
          <p>
            Contact form, brochure requests, and product enquiries from the website.
            {emailConfigured
              ? ` Admin notifications go to ${notifyTo}.`
              : ' Add Resend settings in .env to enable email.'}
          </p>
        </div>
      </div>

      <div className="dashTabs" role="tablist" aria-label="Enquiry types">
        {tabs.map((tab) => (
          <button
            key={tab.id}
            type="button"
            role="tab"
            aria-selected={activeTab === tab.id}
            className={`dashTab${activeTab === tab.id ? ' dashTab--active' : ''}`}
            onClick={() => {
              setActiveTab(tab.id)
              setSelected(null)
              setActionMessage('')
            }}
          >
            {tab.label}
            <span className="dashTabCount">{tabCounts[tab.id]}</span>
          </button>
        ))}
      </div>

      <div className="dashSplit">
        <div className="dashCard">
          <table className="dashTable">
            <thead>
              <tr>
                <th>Name</th>
                <th>Type</th>
                <th>Status</th>
                <th>Date</th>
              </tr>
            </thead>
            <tbody>
              {loading ? (
                <tr>
                  <td colSpan={4}>Loading…</td>
                </tr>
              ) : filteredEnquiries.length === 0 ? (
                <tr>
                  <td colSpan={4}>No enquiries in this tab yet.</td>
                </tr>
              ) : (
                filteredEnquiries.map((enquiry) => (
                  <tr
                    key={enquiry.id}
                    className={selected?.id === enquiry.id ? 'dashTableRow--active' : ''}
                    onClick={() => {
                      setSelected(enquiry)
                      setActionMessage('')
                    }}
                  >
                    <td>{enquiry.name}</td>
                    <td>{enquiry.type}</td>
                    <td>
                      <span className={`dashStatus dashStatus--${enquiry.status}`}>
                        {enquiry.status}
                      </span>
                    </td>
                    <td>{new Date(enquiry.createdAt).toLocaleString()}</td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>

        <div className="dashCard dashEnquiryDetail">
          {selected ? (
            <>
              <div className="dashEnquiryDetailHead">
                <h2>{selected.subject || 'Enquiry'}</h2>
                <div className="dashEnquiryActions">
                  <button
                    type="button"
                    className="dashBtn dashBtn--small"
                    onClick={() => updateStatus(selected.id, 'read')}
                  >
                    Mark read
                  </button>
                  <button
                    type="button"
                    className="dashBtn dashBtn--small"
                    onClick={() => updateStatus(selected.id, 'closed')}
                  >
                    Close
                  </button>
                  <button
                    type="button"
                    className="dashBtn dashBtn--danger dashBtn--small"
                    onClick={() => handleDelete(selected.id)}
                  >
                    Delete
                  </button>
                </div>
              </div>
              <dl className="dashMetaList">
                <div>
                  <dt>Name</dt>
                  <dd>{selected.name}</dd>
                </div>
                <div>
                  <dt>Email</dt>
                  <dd>
                    <a href={`mailto:${selected.email}`}>{selected.email}</a>
                  </dd>
                </div>
                {selected.phone ? (
                  <div>
                    <dt>Phone</dt>
                    <dd>{selected.phone}</dd>
                  </div>
                ) : null}
                <div>
                  <dt>Type</dt>
                  <dd>{selected.type}</dd>
                </div>
                {selected.productSku ? (
                  <div>
                    <dt>{selected.type === 'careers' ? 'CV file' : 'Product SKU'}</dt>
                    <dd>{selected.productSku}</dd>
                  </div>
                ) : null}
              </dl>
              <p className="dashEnquiryMessage">{selected.message}</p>

              <div className="dashEnquiryMailActions">
                <button
                  type="button"
                  className="dashBtn dashBtn--small"
                  disabled={!emailConfigured || resending !== null}
                  onClick={() => handleResend('admin')}
                >
                  {resending === 'admin' ? 'Sending…' : 'Resend to admin'}
                </button>
                <button
                  type="button"
                  className="dashBtn dashBtn--small"
                  disabled={!emailConfigured || !selected.email || resending !== null}
                  onClick={() => handleResend('customer')}
                >
                  {resending === 'customer'
                    ? 'Sending…'
                    : selected.type === 'brochure'
                      ? 'Resend brochure email'
                      : selected.type === 'careers'
                        ? 'Resend confirmation'
                        : 'Resend to customer'}
                </button>
              </div>
              {actionMessage ? <p className="dashHint">{actionMessage}</p> : null}
            </>
          ) : (
            <p className="dashEmptyState">Select an enquiry to view details and resend emails.</p>
          )}
        </div>
      </div>
    </div>
  )
}
