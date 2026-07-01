import { NextResponse } from 'next/server'
import { requireDashboardAuth } from '@/lib/api-auth'
import { seedCatalogIfEmpty } from '@/lib/db/seed'
import { connectDB, isMongoConfigured } from '@/lib/mongodb'
import { CategoryModel } from '@/models/Category'
import { EnquiryModel } from '@/models/Enquiry'
import { MaterialModel } from '@/models/Material'

export async function GET() {
  const auth = requireDashboardAuth()
  if (!auth.ok) {
    return NextResponse.json({ error: auth.error }, { status: auth.status })
  }

  try {
    if (!isMongoConfigured()) {
      return NextResponse.json({
        mongoConfigured: false,
        connected: false,
        categories: 0,
        materials: 0,
        enquiries: 0,
      })
    }

    await connectDB()
    const [categories, materials] = await Promise.all([
      CategoryModel.countDocuments(),
      MaterialModel.countDocuments(),
    ])
    let enquiries = 0
    try {
      enquiries = await EnquiryModel.countDocuments()
    } catch {
      enquiries = 0
    }

    return NextResponse.json({
      mongoConfigured: true,
      connected: true,
      categories,
      materials,
      enquiries,
    })
  } catch (error) {
    const message = error instanceof Error ? error.message : 'Database connection failed'
    return NextResponse.json(
      {
        mongoConfigured: isMongoConfigured(),
        connected: false,
        error: message,
        categories: 0,
        materials: 0,
        enquiries: 0,
      },
      { status: 503 },
    )
  }
}

export async function POST() {
  const auth = requireDashboardAuth()
  if (!auth.ok) {
    return NextResponse.json({ error: auth.error }, { status: auth.status })
  }

  try {
    await connectDB()
    const result = await seedCatalogIfEmpty()
    const [categories, materials] = await Promise.all([
      CategoryModel.countDocuments(),
      MaterialModel.countDocuments(),
    ])

    return NextResponse.json({
      ok: true,
      seeded: result.seeded,
      categories,
      materials,
    })
  } catch (error) {
    const message = error instanceof Error ? error.message : 'Failed to initialize database'
    return NextResponse.json({ error: message }, { status: 500 })
  }
}
