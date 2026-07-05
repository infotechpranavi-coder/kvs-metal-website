'use client'

import { useEffect, useState } from 'react'

export function useMaxWidthMedia(maxWidth: number) {
  const [matches, setMatches] = useState(false)

  useEffect(() => {
    const mq = window.matchMedia(`(max-width: ${maxWidth}px)`)
    const update = () => setMatches(mq.matches)
    update()
    mq.addEventListener('change', update)
    return () => mq.removeEventListener('change', update)
  }, [maxWidth])

  return matches
}
