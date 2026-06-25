export function KvsSkillsBrandMark() {
  return (
    <div className="uniSkillsBrand" aria-hidden>
      <svg className="uniSkillsBrandSvg" viewBox="0 0 420 420" fill="none">
        <defs>
          <radialGradient id="kvsBrandGlow" cx="72%" cy="28%" r="62%">
            <stop offset="0%" stopColor="#ffe8d6" />
            <stop offset="45%" stopColor="#ffd4b0" stopOpacity="0.7" />
            <stop offset="100%" stopColor="#fff8f2" stopOpacity="0" />
          </radialGradient>
          <linearGradient id="kvsBrandShape" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stopColor="#ffc49a" stopOpacity="0.85" />
            <stop offset="100%" stopColor="#ff8f55" stopOpacity="0.55" />
          </linearGradient>
          <linearGradient id="kvsBrandOutline" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stopColor="#ffc49a" />
            <stop offset="100%" stopColor="#ff8f55" />
          </linearGradient>
        </defs>

        <circle cx="300" cy="118" r="168" fill="url(#kvsBrandGlow)" />
        <ellipse cx="338" cy="208" rx="108" ry="96" fill="#ffe4cc" fillOpacity="0.42" />
        <ellipse cx="268" cy="152" rx="72" ry="64" fill="#fff0e4" fillOpacity="0.55" />

        <g className="uniSkillsBrandShapes" stroke="url(#kvsBrandShape)" fill="none">
          <ellipse
            cx="292"
            cy="248"
            rx="138"
            ry="58"
            strokeWidth="1.4"
            opacity="0.42"
            transform="rotate(-14 292 248)"
          />
          <ellipse
            cx="292"
            cy="248"
            rx="112"
            ry="46"
            strokeWidth="1.2"
            opacity="0.55"
            transform="rotate(10 292 248)"
          />
          <path
            d="M148 188 A 96 96 0 0 1 228 118"
            strokeWidth="1.8"
            strokeLinecap="round"
            opacity="0.5"
          />
          <path
            d="M356 168 A 78 78 0 0 0 292 96"
            strokeWidth="1.8"
            strokeLinecap="round"
            opacity="0.45"
          />
          <path
            d="M168 308 A 88 88 0 0 0 248 352"
            strokeWidth="1.6"
            strokeLinecap="round"
            opacity="0.38"
          />

          <path d="M188 196 L188 168 L216 168" strokeWidth="2" strokeLinecap="round" opacity="0.62" />
          <path d="M396 214 L396 242 L368 242" strokeWidth="2" strokeLinecap="round" opacity="0.62" />
          <path d="M204 318 L204 346 L232 346" strokeWidth="2" strokeLinecap="round" opacity="0.5" />
          <path d="M378 128 L378 100 L350 100" strokeWidth="2" strokeLinecap="round" opacity="0.5" />

          <rect
            x="154"
            y="262"
            width="16"
            height="16"
            rx="2"
            strokeWidth="1.5"
            opacity="0.55"
            transform="rotate(45 162 270)"
          />
          <path
            d="M348 292 L360 280 L372 292 L360 304 Z"
            strokeWidth="1.4"
            opacity="0.5"
          />
          <path
            d="M128 156 L140 148 L152 156 L140 164 Z"
            fill="#ffb07a"
            fillOpacity="0.22"
            strokeWidth="1.2"
            opacity="0.65"
          />

          <path
            d="M318 118 L318 134 M310 126 L326 126"
            strokeWidth="1.6"
            strokeLinecap="round"
            opacity="0.45"
          />
          <path
            d="M168 248 L184 248 M176 240 L176 256"
            strokeWidth="1.4"
            strokeLinecap="round"
            opacity="0.4"
          />
          <circle cx="228" cy="118" r="3.5" fill="#ffb07a" fillOpacity="0.55" stroke="none" />
          <circle cx="356" cy="168" r="3" fill="#ff9a5c" fillOpacity="0.5" stroke="none" />
          <circle cx="248" cy="352" r="3" fill="#ffb07a" fillOpacity="0.45" stroke="none" />
          <circle cx="372" cy="292" r="2.5" fill="#ff8f55" fillOpacity="0.5" stroke="none" />
        </g>

        <text
          x="294"
          y="255"
          textAnchor="middle"
          className="uniSkillsBrandText uniSkillsBrandText--shadow"
        >
          KVS
        </text>
        <text
          x="292"
          y="252"
          textAnchor="middle"
          className="uniSkillsBrandText"
        >
          KVS
        </text>
        <text
          x="292"
          y="286"
          textAnchor="middle"
          className="uniSkillsBrandSubtext"
        >
          METAL
        </text>
      </svg>
    </div>
  )
}
