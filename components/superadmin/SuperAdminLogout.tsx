'use client'

import { useRouter } from 'next/navigation'
import { logoutSuperAdminAction } from '@/app/superadmin/actions'

export function SuperAdminLogout() {
  const router = useRouter()

  const handleLogout = async () => {
    await logoutSuperAdminAction()
    router.push('/superadmin/login')
    router.refresh()
  }

  return (
    <button type="button" className="dashSidebarLogout" onClick={handleLogout}>
      Log out
    </button>
  )
}
