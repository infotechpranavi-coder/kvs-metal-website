'use client'

import { useEffect } from 'react'

type DashboardDrawerProps = {
  open: boolean
  title: string
  onClose: () => void
  children: React.ReactNode
}

export function DashboardDrawer({ open, title, onClose, children }: DashboardDrawerProps) {
  useEffect(() => {
    if (!open) return

    const onKeyDown = (event: KeyboardEvent) => {
      if (event.key === 'Escape') onClose()
    }

    const previousOverflow = document.body.style.overflow
    document.body.style.overflow = 'hidden'
    window.addEventListener('keydown', onKeyDown)

    return () => {
      document.body.style.overflow = previousOverflow
      window.removeEventListener('keydown', onKeyDown)
    }
  }, [open, onClose])

  if (!open) return null

  return (
    <div className="dashDrawerRoot">
      <button
        type="button"
        className="dashDrawerBackdrop"
        onClick={onClose}
        aria-label="Close panel"
      />
      <aside className="dashDrawer" role="dialog" aria-modal="true" aria-labelledby="dash-drawer-title">
        <div className="dashDrawerHead">
          <h2 id="dash-drawer-title">{title}</h2>
          <button type="button" className="dashDrawerClose" onClick={onClose} aria-label="Close">
            ×
          </button>
        </div>
        <div className="dashDrawerBody">{children}</div>
      </aside>
    </div>
  )
}
