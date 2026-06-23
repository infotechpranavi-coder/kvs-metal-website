'use client'

import { useEffect, useRef, useState, type CSSProperties, type ReactNode } from 'react'

type ScrollRevealProps = {
  children: ReactNode
  className?: string
  direction?: 'up' | 'left' | 'right' | 'down'
  delay?: number
  as?: 'div' | 'section' | 'article' | 'header'
  id?: string
  threshold?: number
}

export function ScrollReveal({
  children,
  className = '',
  direction = 'up',
  delay = 0,
  as: Tag = 'div',
  id,
  threshold = 0.18,
}: ScrollRevealProps) {
  const ref = useRef<HTMLElement>(null)
  const [visible, setVisible] = useState(false)

  useEffect(() => {
    const node = ref.current
    if (!node) return

    const prefersReduced =
      typeof window !== 'undefined' &&
      window.matchMedia('(prefers-reduced-motion: reduce)').matches

    if (prefersReduced) {
      setVisible(true)
      return
    }

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setVisible(true)
          observer.disconnect()
        }
      },
      { threshold, rootMargin: '0px 0px -6% 0px' },
    )

    observer.observe(node)
    return () => observer.disconnect()
  }, [threshold])

  const style = { '--reveal-delay': `${delay}s` } as CSSProperties

  return (
    <Tag
      ref={ref as never}
      id={id}
      style={style}
      className={`uniReveal uniReveal--${direction}${visible ? ' uniReveal--visible' : ''}${className ? ` ${className}` : ''}`}
    >
      {children}
    </Tag>
  )
}
