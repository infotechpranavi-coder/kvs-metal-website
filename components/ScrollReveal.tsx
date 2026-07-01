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
  style?: CSSProperties
}

export function ScrollReveal({
  children,
  className = '',
  direction = 'up',
  delay = 0,
  as: Tag = 'div',
  id,
  threshold = 0.18,
  style: styleProp,
}: ScrollRevealProps) {
  const ref = useRef<HTMLElement>(null)
  const [visible, setVisible] = useState(false)

  useEffect(() => {
    const node = ref.current
    if (!node) return

    const show = () => setVisible(true)

    const prefersReduced =
      typeof window !== 'undefined' &&
      window.matchMedia('(prefers-reduced-motion: reduce)').matches

    if (prefersReduced) {
      show()
      return
    }

    const revealIfInView = () => {
      const rect = node.getBoundingClientRect()
      if (rect.top < window.innerHeight * 0.92 && rect.bottom > 0) {
        show()
        return true
      }
      return false
    }

    if (revealIfInView()) return

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          show()
          observer.disconnect()
        }
      },
      { threshold, rootMargin: '0px 0px -4% 0px' },
    )

    observer.observe(node)
    return () => observer.disconnect()
  }, [threshold])

  const style = { ...styleProp, '--reveal-delay': `${delay}s` } as CSSProperties

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
