'use client'

import { useEffect, useState } from 'react'

type DashboardImageFieldProps = {
  id: string
  label: string
  value: string
  onChange: (url: string) => void
  /** Subfolder under CLOUDINARY_FOLDER, e.g. products, categories, materials */
  folder?: string
  required?: boolean
}

export function DashboardImageField({
  id,
  label,
  value,
  onChange,
  folder = 'products',
  required = true,
}: DashboardImageFieldProps) {
  const [cloudinaryReady, setCloudinaryReady] = useState<boolean | null>(null)
  const [uploading, setUploading] = useState(false)
  const [uploadError, setUploadError] = useState('')

  useEffect(() => {
    fetch('/api/upload')
      .then((response) => response.json())
      .then((data) => setCloudinaryReady(Boolean(data.configured)))
      .catch(() => setCloudinaryReady(false))
  }, [])

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

      onChange(data.url)
    } catch {
      setUploadError('Upload failed. You can paste an image path instead.')
    } finally {
      setUploading(false)
      event.target.value = ''
    }
  }

  return (
    <div className="dashField">
      <label htmlFor={id}>{label}</label>
      <input
        id={id}
        value={value}
        onChange={(event) => onChange(event.target.value)}
        placeholder="/products/image.jpg or Cloudinary URL"
        required={required}
      />
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
              : `Uploads to your kvs-website/${folder} folder on Cloudinary`}
          </span>
        </div>
      ) : cloudinaryReady === false ? (
        <p className="dashHint">
          Cloudinary not configured yet — use a local path like /products/your-image.jpg until
          credentials are added.
        </p>
      ) : null}
      {uploadError ? <p className="dashError">{uploadError}</p> : null}
      {value ? <img src={value} alt="" className="dashImagePreview" /> : null}
    </div>
  )
}
