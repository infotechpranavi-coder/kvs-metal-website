import { v2 as cloudinary } from 'cloudinary'
import { getCloudinaryFolder } from '@/lib/cloudinary-folder'

export function isCloudinaryConfigured() {
  return Boolean(
    process.env.CLOUDINARY_CLOUD_NAME &&
      process.env.CLOUDINARY_API_KEY &&
      process.env.CLOUDINARY_API_SECRET,
  )
}

export function configureCloudinary() {
  if (!isCloudinaryConfigured()) return false

  cloudinary.config({
    cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
    api_key: process.env.CLOUDINARY_API_KEY,
    api_secret: process.env.CLOUDINARY_API_SECRET,
    secure: true,
  })

  return true
}

export async function uploadImageBuffer(
  buffer: Buffer,
  options?: { folder?: string; filename?: string },
) {
  if (!configureCloudinary()) {
    throw new Error('Cloudinary is not configured')
  }

  const folder = options?.folder || getCloudinaryFolder()

  return new Promise<{ url: string; publicId: string }>((resolve, reject) => {
    const stream = cloudinary.uploader.upload_stream(
      {
        folder,
        public_id: options?.filename,
        resource_type: 'image',
      },
      (error, result) => {
        if (error || !result?.secure_url) {
          reject(error || new Error('Upload failed'))
          return
        }
        resolve({
          url: result.secure_url,
          publicId: result.public_id,
        })
      },
    )

    stream.end(buffer)
  })
}

function getRawFileFormat(filename: string) {
  const ext = filename.split('.').pop()?.toLowerCase()
  if (ext === 'pdf' || ext === 'doc' || ext === 'docx') return ext
  return 'pdf'
}

function buildRawPublicId(filename: string) {
  const ext = getRawFileFormat(filename)
  const base = filename
    .replace(/\.[^.]+$/, '')
    .replace(/[^a-zA-Z0-9_-]/g, '_')
    .slice(0, 72)
  return `${base || 'cv'}_${Date.now()}.${ext}`
}

export async function uploadRawBuffer(
  buffer: Buffer,
  options?: { folder?: string; filename?: string },
) {
  if (!configureCloudinary()) {
    throw new Error('Cloudinary is not configured')
  }

  const folder = options?.folder || getCloudinaryFolder('careers-cvs')
  const originalName = options?.filename || 'cv.pdf'
  const publicId = buildRawPublicId(originalName)

  return new Promise<{ url: string; publicId: string }>((resolve, reject) => {
    const stream = cloudinary.uploader.upload_stream(
      {
        folder,
        public_id: publicId,
        resource_type: 'raw',
      },
      (error, result) => {
        if (error || !result?.secure_url) {
          reject(error || new Error('Upload failed'))
          return
        }
        resolve({
          url: result.secure_url,
          publicId: result.public_id,
        })
      },
    )

    stream.end(buffer)
  })
}

export { cloudinary }
