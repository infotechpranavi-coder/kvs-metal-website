'use client'

import { useRouter } from 'next/navigation'

export function DashboardLogout() {
  const router = useRouter()

  const handleLogout = async () => {
    await fetch('/api/auth/logout', { method: 'POST' })
    router.push('/dashboard/login')
    router.refresh()
  }

  return (
    <button type="button" className="dashSidebarLogout" onClick={handleLogout}>
      Log out
    </button>
  )
}
