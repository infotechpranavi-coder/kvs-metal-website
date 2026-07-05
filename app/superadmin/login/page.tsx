'use client'

import { useRouter } from 'next/navigation'
import { useState } from 'react'
import { loginSuperAdminAction } from '@/app/superadmin/actions'

export default function SuperAdminLoginPage() {
  const router = useRouter()
  const [username, setUsername] = useState('superadmin')
  const [password, setPassword] = useState('')
  const [error, setError] = useState('')
  const [loading, setLoading] = useState(false)

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault()
    setLoading(true)
    setError('')

    try {
      const result = await loginSuperAdminAction(username, password)
      if (!result.ok) {
        setError(result.error)
        return
      }

      router.push('/superadmin')
      router.refresh()
    } catch {
      setError('Login failed. Please try again.')
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="dashLoginPage">
      <form className="dashLoginCard" onSubmit={handleSubmit}>
        <h1>KVS Superadmin</h1>
        <p>Sign in for bulk Excel import and full CMS access.</p>
        <div className="dashField">
          <label htmlFor="superadmin-username">Username</label>
          <input
            id="superadmin-username"
            type="text"
            value={username}
            onChange={(event) => setUsername(event.target.value)}
            required
            autoComplete="username"
          />
        </div>
        <div className="dashField">
          <label htmlFor="superadmin-password">Password</label>
          <input
            id="superadmin-password"
            type="password"
            value={password}
            onChange={(event) => setPassword(event.target.value)}
            required
            autoComplete="current-password"
          />
        </div>
        {error ? <p className="dashError">{error}</p> : null}
        <button type="submit" className="dashBtn" disabled={loading}>
          {loading ? 'Signing in…' : 'Sign in'}
        </button>
      </form>
    </div>
  )
}
