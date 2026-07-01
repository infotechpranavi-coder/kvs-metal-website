import { NextResponse } from 'next/server'
import { requireDashboardAuth } from '@/lib/api-auth'
import { getCloudinaryFolder } from '@/lib/cloudinary-folder'
import { isCloudinaryConfigured, uploadImageBuffer } from '@/lib/cloudinary'

export async function POST(request: Request) {
  const auth = requireDashboardAuth()
  if (!auth.ok) {
    return NextResponse.json({ error: auth.error }, { status: auth.status })
  }

  if (!isCloudinaryConfigured()) {
    return NextResponse.json(
      {
        error: 'Cloudinary is not configured yet. Add CLOUDINARY_CLOUD_NAME, CLOUDINARY_API_KEY, and CLOUDINARY_API_SECRET to .env',
        configured: false,
      },
      { status: 503 },
    )
  }

  try {
    const formData = await request.formData()
    const file = formData.get('file')

    if (!file || !(file instanceof File)) {
      return NextResponse.json({ error: 'Image file is required' }, { status: 400 })
    }

    const buffer = Buffer.from(await file.arrayBuffer())
    const folderInput = String(formData.get('folder') || '').trim()
    const folder = folderInput ? getCloudinaryFolder(folderInput) : getCloudinaryFolder()
    const filename = file.name.replace(/\.[^.]+$/, '').replace(/[^\w-]+/g, '-')

    const result = await uploadImageBuffer(buffer, { folder, filename })

    return NextResponse.json({
      url: result.url,
      publicId: result.publicId,
      configured: true,
    })
  } catch (error) {
    const message = error instanceof Error ? error.message : 'Upload failed'
    return NextResponse.json({ error: message }, { status: 500 })
  }
}

export async function GET() {
  return NextResponse.json({ configured: isCloudinaryConfigured() })
}
