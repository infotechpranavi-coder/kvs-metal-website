import { NextResponse } from 'next/server'
import { requireDashboardAuth } from '@/lib/api-auth'
import { fetchCareerCvBuffer, getCareerCvFilename } from '@/lib/career-cv'
import { connectDB } from '@/lib/mongodb'
import { EnquiryModel } from '@/models/Enquiry'

type RouteContext = { params: { id: string } }

export async function GET(_request: Request, { params }: RouteContext) {
  const auth = requireDashboardAuth()
  if (!auth.ok) {
    return NextResponse.json({ error: auth.error }, { status: auth.status })
  }

  try {
    await connectDB()
    const enquiry = await EnquiryModel.findById(params.id)
    if (!enquiry || enquiry.type !== 'careers') {
      return NextResponse.json({ error: 'Career application not found' }, { status: 404 })
    }

    if (!enquiry.cvUrl) {
      return NextResponse.json({ error: 'No CV file stored for this application' }, { status: 404 })
    }

    const buffer = await fetchCareerCvBuffer(enquiry)
    const filename = getCareerCvFilename(enquiry)
    const contentType = enquiry.cvMimeType || 'application/octet-stream'

    return new NextResponse(buffer, {
      headers: {
        'Content-Type': contentType,
        'Content-Disposition': `attachment; filename="${filename.replace(/"/g, '')}"`,
        'Cache-Control': 'private, no-store',
      },
    })
  } catch (error) {
    if (error instanceof Error && error.message === 'CV_DOWNLOAD_FAILED') {
      return NextResponse.json({ error: 'Could not download CV from cloud storage' }, { status: 502 })
    }
    console.error('Career CV download failed:', error)
    return NextResponse.json({ error: 'Failed to download CV' }, { status: 500 })
  }
}
