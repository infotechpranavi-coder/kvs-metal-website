import { NextResponse } from 'next/server'
import { revalidatePath } from 'next/cache'
import { requireSuperAdminAuth } from '@/lib/api-auth'
import { getSiteSettings, updateSiteSettings } from '@/lib/db/site-settings'
import { siteSettingsInputSchema } from '@/lib/validation'

export const dynamic = 'force-dynamic'

export async function GET() {
  try {
    const settings = await getSiteSettings()
    return NextResponse.json({ settings })
  } catch {
    return NextResponse.json({ error: 'Failed to load site settings' }, { status: 500 })
  }
}

export async function PATCH(request: Request) {
  const auth = requireSuperAdminAuth()
  if (!auth.ok) {
    return NextResponse.json({ error: auth.error }, { status: auth.status })
  }

  try {
    const body = await request.json()
    const parsed = siteSettingsInputSchema.safeParse(body)
    if (!parsed.success) {
      return NextResponse.json({ error: parsed.error.flatten() }, { status: 400 })
    }

    const settings = await updateSiteSettings(parsed.data)
    revalidatePath('/', 'layout')
    return NextResponse.json({ settings })
  } catch {
    return NextResponse.json({ error: 'Failed to update site settings' }, { status: 500 })
  }
}
