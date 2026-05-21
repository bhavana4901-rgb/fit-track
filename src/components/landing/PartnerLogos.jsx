/** Inline SVG partner & trust logos (no letter-only placeholders) */

export function TechFlowLogo({ className = 'w-full h-full' }) {
  return (
    <svg viewBox="0 0 120 40" className={className} fill="none" aria-hidden="true">
      <path d="M8 32V8h6l8 14 8-14h6v24h-5V18l-9 14h-4L10 18v14H8z" fill="currentColor" />
      <path d="M44 32V8h14c4 0 7 1 9 3s3 5 3 9-1 7-3 9-5 3-9 3H44zm5-4h9c2 0 3.5-.5 4.5-1.5S64 24 64 22s-.5-3.5-1.5-4.5S60 16 58 16h-9v12z" fill="currentColor" />
      <circle cx="88" cy="20" r="10" stroke="currentColor" strokeWidth="2.5" />
      <path d="M88 14v12M82 20h12" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
    </svg>
  )
}

export function FitnessHubLogo({ className = 'w-full h-full' }) {
  return (
    <svg viewBox="0 0 120 40" className={className} fill="none" aria-hidden="true">
      <circle cx="20" cy="20" r="12" stroke="currentColor" strokeWidth="2.5" />
      <circle cx="20" cy="20" r="4" fill="currentColor" />
      <path d="M20 8v6M20 26v6M8 20h6M26 20h6" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
      <path d="M44 32V8h5l11 16V8h5v24h-5l-11-16v16h-5z" fill="currentColor" />
    </svg>
  )
}

export function WellnessXLogo({ className = 'w-full h-full' }) {
  return (
    <svg viewBox="0 0 120 40" className={className} fill="none" aria-hidden="true">
      <path d="M12 28c0-8 4-14 10-14 4 0 7 3 8 7l-5 1c-.5-2-2-3-3-3-2 0-4 2-4 9s2 9 4 9c1 0 2.5-1 3-3l5 1c-1 4-4 7-8 7-6 0-10-6-10-14z" fill="currentColor" />
      <path d="M36 8h6l4 10 4-10h6l-8 24h-4L36 8z" fill="currentColor" />
      <path d="M68 8l8 12V8h5v24h-5l-8-12v12h-5V8h5z" fill="currentColor" />
      <path d="M92 14h8l2 4h-8l2 4h8v4H92l-4-8 4-8z" fill="currentColor" />
    </svg>
  )
}

export function ActiveLifeLogo({ className = 'w-full h-full' }) {
  return (
    <svg viewBox="0 0 120 40" className={className} fill="none" aria-hidden="true">
      <path d="M8 20h8l4-12 4 24 4-16 4 4h8" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" />
      <path d="M52 32V8h6c5 0 8 3 8 8s-3 8-8 8h-3v8h-5zm5-12h1c2 0 3-1 3-3s-1-3-3-3h-1v6z" fill="currentColor" />
      <path d="M76 32V8h14v4h-9v6h8v4H76z" fill="currentColor" />
    </svg>
  )
}

export function TrackProLogo({ className = 'w-full h-full' }) {
  return (
    <svg viewBox="0 0 120 40" className={className} fill="none" aria-hidden="true">
      <rect x="8" y="22" width="6" height="10" rx="1" fill="currentColor" opacity="0.5" />
      <rect x="18" y="16" width="6" height="16" rx="1" fill="currentColor" opacity="0.7" />
      <rect x="28" y="10" width="6" height="22" rx="1" fill="currentColor" />
      <path d="M44 32V8h5l7 12 7-12h5v24h-5V18l-7 10-7-10v14h-5z" fill="currentColor" />
    </svg>
  )
}

export function HealthSyncLogo({ className = 'w-full h-full' }) {
  return (
    <svg viewBox="0 0 120 40" className={className} fill="none" aria-hidden="true">
      <path d="M14 22c-4-4-4-10 0-14 4-4 10-4 14 0 4 0 10-4 14-4 4-10 4-14 0-4-4-10 0-14z" stroke="currentColor" strokeWidth="2" />
      <path d="M10 18h8v8h-8z" fill="currentColor" />
      <path d="M44 32V8h6l6 10 6-10h6v24h-5V18l-5 8-5-8v14h-5z" fill="currentColor" />
      <path d="M88 14a6 6 0 110 12 6 6 0 010-12zm0 3a3 3 0 100 6 3 3 0 000-6z" fill="currentColor" />
      <path d="M100 26l4-4 4 4" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  )
}

export function AppStoreBadge({ className = 'w-full h-full' }) {
  return (
    <svg viewBox="0 0 120 40" className={className} fill="none" aria-hidden="true">
      <rect x="1" y="1" width="118" height="38" rx="8" stroke="currentColor" strokeWidth="1.5" />
      <path d="M24 12l4 20 4-12h3l-5 14h-4L21 12h3z" fill="currentColor" />
      <path d="M48 14h-2v14h2c4 0 6-2 6-7s-2-7-6-7zm0 2c2 0 3 1.5 3 5s-1 5-3 5v-10z" fill="currentColor" />
      <text x="68" y="17" fill="currentColor" fontSize="7" fontFamily="system-ui,sans-serif">Download on the</text>
      <text x="68" y="30" fill="currentColor" fontSize="11" fontWeight="600" fontFamily="system-ui,sans-serif">App Store</text>
    </svg>
  )
}

export function GooglePlayBadge({ className = 'w-full h-full' }) {
  return (
    <svg viewBox="0 0 120 40" className={className} fill="none" aria-hidden="true">
      <rect x="1" y="1" width="118" height="38" rx="8" stroke="currentColor" strokeWidth="1.5" />
      <path d="M18 10l12 10-12 10V10z" fill="currentColor" opacity="0.9" />
      <path d="M30 20L18 10v20l12-10z" fill="currentColor" opacity="0.6" />
      <path d="M30 20l8-6v12l-8-6z" fill="currentColor" opacity="0.8" />
      <text x="48" y="17" fill="currentColor" fontSize="7" fontFamily="system-ui,sans-serif">GET IT ON</text>
      <text x="48" y="30" fill="currentColor" fontSize="11" fontWeight="600" fontFamily="system-ui,sans-serif">Google Play</text>
    </svg>
  )
}

export function TrustpilotBadge({ className = 'w-full h-full' }) {
  return (
    <svg viewBox="0 0 120 40" className={className} fill="none" aria-hidden="true">
      <rect x="1" y="1" width="118" height="38" rx="8" stroke="currentColor" strokeWidth="1.5" />
      <path d="M16 28l4-10 4 10H16z" fill="currentColor" />
      <path d="M20 14l1.5 4.5h4.7l-3.8 2.8 1.5 4.5L20 23l-3.9 2.8 1.5-4.5-3.8-2.8h4.7L20 14z" fill="currentColor" opacity="0.3" />
      <text x="44" y="18" fill="currentColor" fontSize="8" fontWeight="600" fontFamily="system-ui,sans-serif">Trustpilot</text>
      <text x="44" y="30" fill="currentColor" fontSize="10" fontFamily="system-ui,sans-serif">★★★★★ 4.9</text>
    </svg>
  )
}

export const PARTNER_LOGOS = [
  { name: 'TechFlow', Logo: TechFlowLogo, color: 'text-primary-600 dark:text-primary-400' },
  { name: 'FitnessHub', Logo: FitnessHubLogo, color: 'text-secondary-600 dark:text-secondary-400' },
  { name: 'WellnessX', Logo: WellnessXLogo, color: 'text-accent-600 dark:text-accent-400' },
  { name: 'ActiveLife', Logo: ActiveLifeLogo, color: 'text-success-600 dark:text-success-400' },
  { name: 'TrackPro', Logo: TrackProLogo, color: 'text-warning-600 dark:text-warning-500' },
  { name: 'HealthSync', Logo: HealthSyncLogo, color: 'text-primary-600 dark:text-primary-400' },
]

export const TRUST_BADGES = [
  { name: 'App Store', Logo: AppStoreBadge },
  { name: 'Google Play', Logo: GooglePlayBadge },
  { name: 'Trustpilot', Logo: TrustpilotBadge },
]
