'use client'

import { useEffect, useState } from 'react'

type BootstrapState = {
  status: 'loading' | 'ready' | 'error'
  message: string
}

export function DashboardBootstrap() {
  const [state, setState] = useState<BootstrapState>({ status: 'loading', message: '' })

  useEffect(() => {
    let cancelled = false

    async function bootstrap() {
      try {
        const statusResponse = await fetch('/api/admin/bootstrap')
        const statusData = await statusResponse.json()

        if (cancelled) return

        if (!statusData.mongoConfigured) {
          setState({
            status: 'error',
            message: 'Add MONGODB_PASSWORD to .env with your Atlas database user password.',
          })
          return
        }

        if (!statusData.connected) {
          setState({
            status: 'error',
            message:
              statusData.error ||
              'Could not connect to MongoDB. Check MONGODB_PASSWORD and Atlas network access.',
          })
          return
        }

        setState({ status: 'ready', message: '' })
      } catch {
        if (!cancelled) {
          setState({
            status: 'error',
            message: 'Dashboard could not reach the database API.',
          })
        }
      }
    }

    bootstrap()
    return () => {
      cancelled = true
    }
  }, [])

  if (state.status === 'loading' || state.status === 'ready') {
    return null
  }

  return (
    <div className="dashBootstrapBanner" role="status">
      <strong>Database setup needed</strong>
      <p>{state.message}</p>
      <p className="dashHint">
        MongoDB collections (categories, materials, enquiries) are created automatically on first
        use — you only need a valid Atlas password and IP allowlist.
      </p>
    </div>
  )
}
