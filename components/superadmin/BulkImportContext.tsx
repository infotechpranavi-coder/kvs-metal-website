'use client'

import { createContext, useContext } from 'react'

const BulkImportContext = createContext(false)

export function BulkImportProvider({
  enabled,
  children,
}: {
  enabled: boolean
  children: React.ReactNode
}) {
  return <BulkImportContext.Provider value={enabled}>{children}</BulkImportContext.Provider>
}

export function useBulkImportEnabled() {
  return useContext(BulkImportContext)
}
