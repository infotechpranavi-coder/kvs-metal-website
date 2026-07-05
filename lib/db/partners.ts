import { connectDB } from '@/lib/mongodb'
import { PartnerModel } from '@/models/Partner'
import { serializePartner, type PartnerDto } from '@/lib/serializers'

export async function getPartnersForApi(): Promise<PartnerDto[]> {
  try {
    await connectDB()
    const rows = await PartnerModel.find().sort({ sortOrder: 1, name: 1 })
    return rows.map(serializePartner)
  } catch {
    return []
  }
}
