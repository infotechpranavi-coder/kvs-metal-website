export function UniLogoIcon({ variant = 'orange' }: { variant?: 'orange' | 'yellow' }) {
  const color = variant === 'yellow' ? '#FFD23F' : '#FF6B35'
  const steel = variant === 'yellow' ? '#E8E8E8' : '#4A5568'
  return (
    <svg width="32" height="32" viewBox="0 0 32 32" aria-hidden className="uniLogoIcon">
      <rect x="4" y="4" width="24" height="24" rx="4" fill={steel} />
      <path d="M10 22V10h4.5c2.2 0 3.5 1.2 3.5 3 0 1.4-.7 2.4-1.9 2.9L18 22h-2.4l-2.1-5.4H12.2V22H10zm2.2-7.2h2.1c1 0 1.5-.5 1.5-1.3s-.5-1.3-1.5-1.3h-2.1v2.6z" fill={color} />
      <path d="M20 10h2v12h-2V10z" fill={color} />
    </svg>
  )
}

export function ChatIcon() {
  return (
    <svg width="20" height="20" viewBox="0 0 24 24" fill="none" aria-hidden>
      <path
        d="M21 11.5a8.38 8.38 0 01-.9 3.8 8.5 8.5 0 01-7.6 4.7 8.38 8.38 0 01-3.8-.9L3 21l1.9-5.7a8.38 8.38 0 01-.9-3.8 8.5 8.5 0 014.7-7.6 8.38 8.38 0 013.8-.9h.5a8.48 8.48 0 018 8v.5z"
        fill="#fff"
      />
    </svg>
  )
}

export function CartSidebarIcon() {
  return (
    <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="#fff" strokeWidth="2" aria-hidden>
      <circle cx="9" cy="21" r="1" />
      <circle cx="20" cy="21" r="1" />
      <path d="M1 1h4l2.68 13.39a2 2 0 002 1.61h9.72a2 2 0 002-1.61L23 6H6" />
    </svg>
  )
}

export function GallerySidebarIcon() {
  return (
    <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="#fff" strokeWidth="2" aria-hidden>
      <rect x="3" y="3" width="18" height="18" rx="2" />
      <circle cx="8.5" cy="8.5" r="1.5" fill="#fff" stroke="none" />
      <path d="M21 15l-5-5L5 21" />
    </svg>
  )
}

export function LayoutSidebarIcon() {
  return (
    <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="#fff" strokeWidth="2" aria-hidden>
      <rect x="3" y="3" width="18" height="18" rx="2" />
      <path d="M3 9h18M9 21V9" />
    </svg>
  )
}

export function ChevronUpIcon() {
  return (
    <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" aria-hidden>
      <path d="M18 15l-6-6-6 6" />
    </svg>
  )
}

export function ClockIcon() {
  return (
    <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" aria-hidden>
      <circle cx="12" cy="12" r="10" />
      <path d="M12 6v6l4 2" />
    </svg>
  )
}

export function BookmarkIcon() {
  return (
    <svg width="16" height="16" viewBox="0 0 24 24" fill="#FF6B35" aria-hidden>
      <path d="M19 21l-7-5-7 5V5a2 2 0 012-2h10a2 2 0 012 2z" />
    </svg>
  )
}

export function StarIcon() {
  return (
    <svg width="14" height="14" viewBox="0 0 24 24" fill="#E8B84A" aria-hidden>
      <path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z" />
    </svg>
  )
}

export function UserIcon() {
  return (
    <svg width="28" height="28" viewBox="0 0 24 24" fill="none" aria-hidden>
      <circle cx="12" cy="8" r="4" fill="currentColor" />
      <path
        d="M5 20c0-3.314 3.134-6 7-6s7 2.686 7 6"
        stroke="currentColor"
        strokeWidth="2"
        strokeLinecap="round"
      />
    </svg>
  )
}

const skillsIconProps = {
  width: 64,
  height: 64,
  viewBox: '0 0 48 48',
  fill: 'none' as const,
  stroke: 'currentColor',
  strokeWidth: 1.5,
  strokeLinecap: 'round' as const,
  strokeLinejoin: 'round' as const,
  'aria-hidden': true,
}

export function SteelSheetIcon() {
  return (
    <svg {...skillsIconProps}>
      <path d="M8 20h32" />
      <path d="M10 26h28" />
      <path d="M12 32h24" />
      <path d="M8 20v6" />
      <path d="M40 20v6" />
      <path d="M10 26v6" />
      <path d="M38 26v6" />
      <path d="M12 32v4" />
      <path d="M36 32v4" />
    </svg>
  )
}

export function MetalPipeIcon() {
  return (
    <svg {...skillsIconProps}>
      <ellipse cx="24" cy="14" rx="14" ry="5" />
      <path d="M10 14v20" />
      <path d="M38 14v20" />
      <ellipse cx="24" cy="34" rx="14" ry="5" />
      <ellipse cx="24" cy="24" rx="9" ry="3.5" />
    </svg>
  )
}

export function StructuralSteelIcon() {
  return (
    <svg {...skillsIconProps}>
      <path d="M12 12h24" />
      <path d="M19 12v24" />
      <path d="M29 12v24" />
      <path d="M12 36h24" />
      <path d="M12 12v3" />
      <path d="M36 12v3" />
      <path d="M12 33v3" />
      <path d="M36 33v3" />
    </svg>
  )
}

export function PrecisionFabricationIcon() {
  return (
    <svg {...skillsIconProps}>
      <path d="M14 38V12" />
      <path d="M34 38V12" />
      <path d="M14 12h20" />
      <path d="M14 22h7" />
      <path d="M34 22h-7" />
      <path d="M21 22v8" />
      <path d="M27 22v8" />
      <circle cx="24" cy="30" r="3.5" />
      <path d="M24 33.5V38" />
    </svg>
  )
}

export function CompetitivePricingIcon() {
  return (
    <svg {...skillsIconProps}>
      <path d="M8 36h32" />
      <rect x="9.5" y="22" width="5" height="14" rx="0.5" />
      <rect x="16.5" y="28" width="5" height="8" rx="0.5" />
      <rect x="23.5" y="25" width="5" height="11" rx="0.5" />
      <rect x="30.5" y="18" width="5" height="18" rx="0.5" />
      <path d="M12 18l7 9 7-5 9-11" />
      <path d="M35 11l5-5" />
      <path d="M35 11l-5-1" />
    </svg>
  )
}

export function TimelyDeliveryIcon() {
  return (
    <svg {...skillsIconProps}>
      <rect x="6" y="18" width="20" height="12" rx="1" />
      <path d="M26 22h8l4 4v4H26" />
      <circle cx="14" cy="34" r="3" />
      <circle cx="34" cy="34" r="3" />
      <circle cx="38" cy="12" r="6" />
      <path d="M38 12v4" />
      <path d="M38 12l3.5 2" />
    </svg>
  )
}

export function GlobalSourcingIcon() {
  return (
    <svg {...skillsIconProps}>
      <circle cx="24" cy="24" r="14" />
      <ellipse cx="24" cy="24" rx="6" ry="14" />
      <path d="M10 24h28" />
      <path d="M12.5 17h23" />
      <path d="M12.5 31h23" />
      <path d="M24 10v28" />
    </svg>
  )
}

export function CustomerServiceIcon() {
  return (
    <svg {...skillsIconProps}>
      <rect x="13" y="7" width="22" height="11" rx="3" />
      <path d="M22 18v2.5" />
      <path d="M19.5 20.5h5" />
      <path d="M17 11h14" />
      <path d="M17 14h9" />
      <g strokeWidth="2.25">
        <circle cx="12" cy="30" r="4.5" />
        <path d="M5 41a7 7 0 0114 0" />
        <circle cx="24" cy="27" r="5.25" />
        <path d="M13.5 41a10.5 10.5 0 0121 0" />
        <circle cx="36" cy="30" r="4.5" />
        <path d="M29 41a7 7 0 0114 0" />
      </g>
    </svg>
  )
}

export function ReliableAvailabilityIcon() {
  return (
    <svg {...skillsIconProps}>
      <path d="M24 8l13 4.5v11.5c0 8.5-5.5 14.5-13 17-7.5-2.5-13-8.5-13-17V12.5L24 8z" />
      <path d="M17 24.5l4.5 4.5L31 19.5" />
    </svg>
  )
}

export function IndustryUnderstandingIcon() {
  return (
    <svg {...skillsIconProps}>
      <path d="M6 36h36" />
      <path d="M9 36V22h9v14" />
      <path d="M12 26h3" />
      <path d="M12 30h3" />
      <path d="M22 36V16l9-4v24" />
      <path d="M25 24h3" />
      <path d="M25 29h3" />
      <path d="M35 36V26h7v10" />
      <path d="M38 30v2" />
      <path d="M31 12v3" />
      <path d="M29 12h4" />
    </svg>
  )
}

type ProductCategoryIconName =
  | 'flats'
  | 'longs'
  | 'tubulars'
  | 'fittings'
  | 'roofing'
  | 'plates'
  | 'tmt'
  | 'fabrication'

export function ProductCategoryIcon({
  name,
  variant = 'dark',
}: {
  name: ProductCategoryIconName
  variant?: 'dark' | 'light'
}) {
  const stroke = variant === 'light' ? '#FF6B35' : '#fff'
  const fill = variant === 'light' ? '#FF6B35' : '#fff'
  const sw = 2

  switch (name) {
    case 'flats':
      return (
        <svg width="52" height="52" viewBox="0 0 52 52" fill="none" aria-hidden>
          <rect x="10" y="14" width="32" height="5" rx="1" fill={fill} opacity="0.5" />
          <rect x="10" y="24" width="32" height="5" rx="1" fill={fill} opacity="0.75" />
          <rect x="10" y="34" width="32" height="5" rx="1" fill={fill} />
        </svg>
      )
    case 'longs':
      return (
        <svg width="52" height="52" viewBox="0 0 52 52" fill="none" aria-hidden>
          <path d="M16 12h20v6H16V12zM20 18v22h12V18H20zM16 40h20v4H16v-4z" fill={fill} />
        </svg>
      )
    case 'tubulars':
      return (
        <svg width="52" height="52" viewBox="0 0 52 52" fill="none" aria-hidden>
          <rect x="14" y="10" width="24" height="32" rx="12" stroke={stroke} strokeWidth={sw} />
          <ellipse cx="26" cy="10" rx="12" ry="4" stroke={stroke} strokeWidth={sw} />
        </svg>
      )
    case 'fittings':
      return (
        <svg width="52" height="52" viewBox="0 0 52 52" fill="none" aria-hidden>
          <path d="M14 30h12v12H14V30zM26 14h12v12H26V14z" stroke={stroke} strokeWidth={sw} />
          <path d="M26 26c6 0 10 4 10 10" stroke={stroke} strokeWidth={sw} strokeLinecap="round" />
        </svg>
      )
    case 'roofing':
      return (
        <svg width="52" height="52" viewBox="0 0 52 52" fill="none" aria-hidden>
          <path d="M10 22c8-6 16-6 24 0M10 30c8-6 16-6 24 0M10 38c8-6 16-6 24 0" stroke={stroke} strokeWidth={sw} strokeLinecap="round" />
        </svg>
      )
    case 'plates':
      return (
        <svg width="52" height="52" viewBox="0 0 52 52" fill="none" aria-hidden>
          <rect x="12" y="16" width="28" height="22" rx="2" stroke={stroke} strokeWidth={sw} />
          <path d="M12 24h28M12 30h28" stroke={stroke} strokeWidth="1.2" opacity="0.6" />
        </svg>
      )
    case 'tmt':
      return (
        <svg width="52" height="52" viewBox="0 0 52 52" fill="none" aria-hidden>
          <path d="M14 12v28M22 12v28M30 12v28M38 12v28" stroke={stroke} strokeWidth={sw} strokeLinecap="round" />
          <path d="M12 18h28M12 28h28M12 38h28" stroke={stroke} strokeWidth="1.2" opacity="0.55" />
        </svg>
      )
    case 'fabrication':
      return (
        <svg width="52" height="52" viewBox="0 0 52 52" fill="none" aria-hidden>
          <circle cx="26" cy="26" r="10" stroke={stroke} strokeWidth={sw} />
          <path d="M26 16v-4M26 40v-4M16 26h-4M40 26h-4" stroke={stroke} strokeWidth={sw} strokeLinecap="round" />
        </svg>
      )
    default:
      return null
  }
}
