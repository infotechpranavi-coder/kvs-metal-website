import Image from 'next/image'

export const KVS_LOGO_SRC = '/logo/kvs_logo-removebg-preview.png'

type KvsLogoProps = {
  className?: string
  size?: 'nav' | 'footer' | 'contact'
  priority?: boolean
}

const heights = {
  nav: 54,
  footer: 52,
  contact: 56,
} as const

export function KvsLogo({ className = '', size = 'nav', priority = false }: KvsLogoProps) {
  const height = heights[size]

  return (
    <Image
      src={KVS_LOGO_SRC}
      alt="KVS Metal"
      width={Math.round(height * 3.2)}
      height={height}
      className={`kvsLogo kvsLogo--${size}${className ? ` ${className}` : ''}`}
      priority={priority}
    />
  )
}
