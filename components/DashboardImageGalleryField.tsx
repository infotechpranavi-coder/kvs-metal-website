'use client'

import { useEffect, useState } from 'react'

type DashboardImageGalleryFieldProps = {
  id: string
  label: string
  values: string[]
  onChange: (urls: string[]) => void
  folder?: string
}

export function DashboardImageGalleryField({
  id,
  label,
  values,
  onChange,
  folder = 'products',
}: DashboardImageGalleryFieldProps) {
  const [cloudinaryReady, setCloudinaryReady] = useState<boolean | null>(null)
  const [uploading, setUploading] = useState(false)
  const [uploadError, setUploadError] = useState('')
  const [draft, setDraft] = useState('')

  useEffect(() => {
    fetch('/api/upload')
      .then((response) => response.json())
      .then((data) => setCloudinaryReady(Boolean(data.configured)))
      .catch(() => setCloudinaryReady(false))
  }, [])

  const appendImage = (url: string) => {
    const next = url.trim()
    if (!next || values.includes(next)) return
    onChange([...values, next])
  }

  const handleFileChange = async (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0]
    if (!file) return

    setUploading(true)
    setUploadError('')

    try {
      const formData = new FormData()
      formData.append('file', file)
      formData.append('folder', folder)

      const response = await fetch('/api/upload', {
        method: 'POST',
        body: formData,
      })
      const data = await response.json()

      if (!response.ok) {
        setUploadError(data.error || 'Upload failed')
        return
      }

      appendImage(data.url)
    } catch {
      setUploadError('Upload failed. You can paste an image URL instead.')
    } finally {
      setUploading(false)
      event.target.value = ''
    }
  }

  const addDraft = () => {
    appendImage(draft)
    setDraft('')
  }

  const removeImage = (index: number) => {
    onChange(values.filter((_, itemIndex) => itemIndex !== index))
  }

  const setAsMain = (index: number) => {
    if (index === 0) return
    const next = [...values]
    const [selected] = next.splice(index, 1)
    onChange([selected, ...next])
  }

  return (
    <div className="dashField">
      <label htmlFor={id}>{label}</label>
      <div className="dashInlineFieldRow">
        <input
          id={id}
          value={draft}
          onChange={(event) => setDraft(event.target.value)}
          onKeyDown={(event) => {
            if (event.key === 'Enter') {
              event.preventDefault()
              addDraft()
            }
          }}
          placeholder="/products/image.jpg or Cloudinary URL"
        />
        <button type="button" className="dashBtn dashBtn--small" onClick={addDraft}>
          Add
        </button>
      </div>
      {cloudinaryReady ? (
        <div className="dashUploadRow">
          <input
            type="file"
            accept="image/*"
            onChange={handleFileChange}
            disabled={uploading}
          />
          <span className="dashHint">
            {uploading
              ? 'Uploading to Cloudinary…'
              : `Upload adds to gallery — kvs-website/${folder}`}
          </span>
        </div>
      ) : cloudinaryReady === false ? (
        <p className="dashHint">
          Cloudinary not configured — paste a local path like /products/your-image.jpg.
        </p>
      ) : null}
      {uploadError ? <p className="dashError">{uploadError}</p> : null}
      <p className="dashHint">First image is the main cover. Add more for the product gallery.</p>
      {values.length > 0 ? (
        <ul className="dashImageGallery">
          {values.map((url, index) => (
            <li key={`${url}-${index}`} className="dashImageGalleryItem">
              <img src={url} alt="" className="dashImageGalleryThumb" />
              <div className="dashImageGalleryMeta">
                {index === 0 ? (
                  <span className="dashBadge dashBadge--sm dashBadge--on">Main</span>
                ) : (
                  <button
                    type="button"
                    className="dashBtn dashBtn--ghost dashBtn--small"
                    onClick={() => setAsMain(index)}
                  >
                    Set as main
                  </button>
                )}
                <button
                  type="button"
                  className="dashBtn dashBtn--ghost dashBtn--small"
                  onClick={() => removeImage(index)}
                >
                  Remove
                </button>
              </div>
            </li>
          ))}
        </ul>
      ) : null}
    </div>
  )
}
