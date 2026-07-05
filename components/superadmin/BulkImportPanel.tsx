'use client'

import { useRef, useState } from 'react'
import {
  bulkImportAction,
  downloadSampleExcelAction,
} from '@/app/superadmin/actions'
import type { BulkImportType } from '@/lib/bulk-import/types'
import { useBulkImportEnabled } from './BulkImportContext'

const LABELS: Record<BulkImportType, string> = {
  categories: 'categories',
  products: 'products',
  materials: 'materials',
}

type ImportReport = {
  added: number
  updated: number
  skipped: number
  errors: string[]
}

function triggerBase64Download(filename: string, base64: string) {
  const bytes = Uint8Array.from(atob(base64), (char) => char.charCodeAt(0))
  const blob = new Blob([bytes], {
    type: 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet',
  })
  const url = URL.createObjectURL(blob)
  const anchor = document.createElement('a')
  anchor.href = url
  anchor.download = filename
  anchor.click()
  URL.revokeObjectURL(url)
}

export function BulkImportPanel({
  type,
  onComplete,
}: {
  type: BulkImportType
  onComplete?: () => void
}) {
  const enabled = useBulkImportEnabled()
  const inputRef = useRef<HTMLInputElement>(null)
  const [downloading, setDownloading] = useState(false)
  const [importing, setImporting] = useState(false)
  const [message, setMessage] = useState('')
  const [report, setReport] = useState<ImportReport | null>(null)
  const [error, setError] = useState('')

  if (!enabled) return null

  const label = LABELS[type]

  const handleDownloadSample = async () => {
    setDownloading(true)
    setError('')
    setMessage('')
    setReport(null)

    try {
      const response = await downloadSampleExcelAction(type)
      if (!response.ok) {
        setError(response.error)
        return
      }
      triggerBase64Download(response.filename, response.data)
      setMessage(`Sample ${label} Excel downloaded.`)
    } catch {
      setError('Could not download sample file.')
    } finally {
      setDownloading(false)
    }
  }

  const handleImport = async (file: File) => {
    setImporting(true)
    setError('')
    setMessage('')
    setReport(null)

    try {
      const formData = new FormData()
      formData.set('file', file)
      const response = await bulkImportAction(type, formData)

      if (!response.ok) {
        setError(response.error)
        return
      }

      setReport(response.result)
      setMessage(
        `Import complete — ${response.result.added} added, ${response.result.updated} updated, ${response.result.skipped} skipped.`,
      )
      onComplete?.()
    } catch {
      setError('Import failed. Please try again.')
    } finally {
      setImporting(false)
      if (inputRef.current) inputRef.current.value = ''
    }
  }

  return (
    <section className="dashBulkImport" aria-label={`Bulk import ${label}`}>
      <div className="dashBulkImportHead">
        <strong>Bulk Excel import</strong>
        <p>
          Download the sample template, fill the <code>Data</code> sheet, then import. Recommended
          order: categories → materials → products.
        </p>
      </div>
      <div className="dashBulkImportActions">
        <button
          type="button"
          className="dashBtn dashBtn--ghost"
          onClick={handleDownloadSample}
          disabled={downloading || importing}
        >
          {downloading ? 'Preparing…' : 'Sample Excel'}
        </button>
        <button
          type="button"
          className="dashBtn"
          onClick={() => inputRef.current?.click()}
          disabled={downloading || importing}
        >
          {importing ? 'Importing…' : `Import ${label}`}
        </button>
        <input
          ref={inputRef}
          type="file"
          accept=".xlsx,.xls,application/vnd.openxmlformats-officedocument.spreadsheetml.sheet,application/vnd.ms-excel"
          hidden
          onChange={(event) => {
            const file = event.target.files?.[0]
            if (file) void handleImport(file)
          }}
        />
      </div>
      {message ? <p className="dashBulkImportMessage">{message}</p> : null}
      {error ? <p className="dashError">{error}</p> : null}
      {report && report.errors.length > 0 ? (
        <ul className="dashBulkImportErrors">
          {report.errors.map((item) => (
            <li key={item}>{item}</li>
          ))}
        </ul>
      ) : null}
    </section>
  )
}
