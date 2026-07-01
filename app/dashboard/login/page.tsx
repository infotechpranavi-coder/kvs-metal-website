'use client'

import { useRouter } from 'next/navigation'
import { useState } from 'react'

export default function DashboardLoginPage() {
  const router = useRouter()
  const [username, setUsername] = useState('admin')
  const [password, setPassword] = useState('')
  const [error, setError] = useState('')
  const [loading, setLoading] = useState(false)

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault()
    setLoading(true)
    setError('')

    try {
      const response = await fetch('/api/auth/login', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ username, password }),
      })

      if (!response.ok) {
        const data = await response.json()
        setError(data.error || 'Login failed')
        return
      }

      router.push('/dashboard')
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
        <h1>KVS Dashboard</h1>
        <p>Sign in with your admin credentials.</p>
        <div className="dashField">
          <label htmlFor="dashboard-username">Username</label>
          <input
            id="dashboard-username"
            type="text"
            value={username}
            onChange={(event) => setUsername(event.target.value)}
            required
            autoComplete="username"
          />
        </div>
        <div className="dashField">
          <label htmlFor="dashboard-password">Password</label>
          <input
            id="dashboard-password"
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
