import { motion } from 'framer-motion'
import { Star, Users, Globe, Activity, TrendingUp } from 'lucide-react'
import { useState, useEffect } from 'react'
import { PARTNER_LOGOS, TRUST_BADGES } from './PartnerLogos'
import * as ls from './landingStyles'
import { fadeUpProps } from './landingMotion'

const STATS = [
  {
    key: 'users',
    label: 'Active members',
    suffix: '+',
    icon: Users,
    layout: 'featured',
    gradient: 'from-primary-500 to-blue-600',
    surface: 'from-primary-50/90 via-white to-blue-50/60 dark:from-primary-950/50 dark:via-neutral-900 dark:to-blue-950/30',
    iconBg: 'bg-gradient-to-br from-primary-500 to-blue-600',
    col: 'md:col-span-6',
  },
  {
    key: 'rating',
    label: 'App Store rating',
    suffix: '',
    icon: Star,
    layout: 'rating',
    gradient: 'from-warning-500 to-amber-500',
    surface: 'from-warning-50/80 to-amber-50/40 dark:from-warning-950/30 dark:to-neutral-900',
    iconBg: 'bg-gradient-to-br from-warning-500 to-amber-500',
    col: 'md:col-span-6',
    isRating: true,
  },
  {
    key: 'countries',
    label: 'Countries worldwide',
    suffix: '+',
    icon: Globe,
    layout: 'accent',
    gradient: 'from-secondary-500 to-violet-600',
    surface: 'bg-white dark:bg-neutral-900',
    iconBg: 'bg-gradient-to-br from-secondary-500 to-violet-600',
    col: 'md:col-span-4',
    staticValue: 40,
  },
  {
    key: 'workouts',
    label: 'Workouts logged',
    suffix: '+',
    icon: Activity,
    layout: 'chart',
    gradient: 'from-success-500 to-emerald-600',
    surface: 'bg-white dark:bg-neutral-900',
    iconBg: 'bg-gradient-to-br from-success-500 to-emerald-600',
    col: 'md:col-span-4',
    staticValue: 12,
    staticUnit: 'M',
  },
]

const MEMBER_AVATARS = ['SC', 'MJ', 'ER', 'DK', 'JW']
const CHART_BARS = [35, 55, 42, 70, 58, 85, 68]

function useCountUp(target, duration = 650, enabled = true) {
  const [value, setValue] = useState(0)
  useEffect(() => {
    if (!enabled) return
    const start = performance.now()
    const tick = (now) => {
      const t = Math.min((now - start) / duration, 1)
      const eased = 1 - (1 - t) ** 3
      setValue(target * eased)
      if (t < 1) requestAnimationFrame(tick)
    }
    requestAnimationFrame(tick)
  }, [target, duration, enabled])
  return value
}

function formatStatValue(stat, users, rating) {
  if (stat.key === 'users') return `${Math.round(users).toLocaleString()}${stat.suffix}`
  if (stat.key === 'rating') return rating.toFixed(1)
  if (stat.staticUnit) return `${stat.staticValue}${stat.staticUnit}${stat.suffix}`
  return `${stat.staticValue}${stat.suffix}`
}

function StatCard({ stat, display, index }) {
  const Icon = stat.icon

  if (stat.layout === 'featured') {
    return (
      <motion.div
        {...fadeUpProps(index * 0.03)}
        whileHover={{ y: -4 }}
        className={`${stat.col} relative overflow-hidden rounded-2xl border border-primary-200/60 dark:border-primary-800/50 p-6 md:p-8 min-h-[160px] flex flex-col justify-between`}
      >
        <div className={`absolute inset-0 bg-gradient-to-br ${stat.surface}`} />
        <div className={`absolute top-0 left-0 right-0 h-1 bg-gradient-to-r ${stat.gradient}`} />
        <div className="relative flex items-start justify-between gap-4">
          <div>
            <p className="text-3xl sm:text-4xl md:text-5xl font-bold text-neutral-900 dark:text-white tabular-nums tracking-tight">
              {display}
            </p>
            <p className="text-sm font-medium text-neutral-600 dark:text-neutral-400 mt-2">{stat.label}</p>
            <p className="text-xs text-primary-600 dark:text-primary-400 mt-3 flex items-center gap-1.5">
              <TrendingUp className="w-3.5 h-3.5" />
              +18% this quarter
            </p>
          </div>
          <div className={`p-4 rounded-xl ${stat.iconBg} shrink-0`}>
            <Icon className="w-7 h-7 text-white" />
          </div>
        </div>
      </motion.div>
    )
  }

  if (stat.layout === 'rating') {
    return (
      <motion.div
        {...fadeUpProps(index * 0.03)}
        whileHover={{ y: -4 }}
        className={`${stat.col} relative overflow-hidden rounded-2xl border border-warning-200/50 dark:border-warning-900/40 p-6 md:p-8 min-h-[160px]`}
      >
        <div className={`absolute inset-0 bg-gradient-to-br ${stat.surface}`} />
        <div className={`absolute top-0 left-0 right-0 h-1 bg-gradient-to-r ${stat.gradient}`} />
        <div className="relative h-full flex flex-col items-center justify-center text-center">
          <div className="flex gap-1 mb-3">
            {[...Array(5)].map((_, i) => (
              <Star key={i} className="w-5 h-5 text-warning-500 fill-warning-500" />
            ))}
          </div>
          <p className="text-3xl sm:text-4xl md:text-5xl font-bold text-neutral-900 dark:text-white tabular-nums">{display}</p>
          <p className="text-sm text-neutral-600 dark:text-neutral-400 mt-2">{stat.label}</p>
          <p className="text-xs text-neutral-500 mt-1">10,000+ verified reviews</p>
        </div>
      </motion.div>
    )
  }

  if (stat.layout === 'chart') {
    return (
      <motion.div
        {...fadeUpProps(index * 0.03)}
        whileHover={{ y: -4 }}
        className={`${stat.col} relative overflow-hidden rounded-2xl border border-neutral-200 dark:border-neutral-800 p-6 min-h-[140px]`}
      >
        <div className={`absolute inset-0 bg-gradient-to-br ${stat.surface}`} />
        <div className={`absolute top-0 left-0 w-1.5 h-full bg-gradient-to-b ${stat.gradient}`} />
        <div className="relative flex items-end justify-between gap-3 h-full">
          <div>
            <div className={`inline-flex p-2.5 rounded-lg ${stat.iconBg} mb-3`}>
              <Icon className="w-5 h-5 text-white" />
            </div>
            <p className="text-2xl md:text-3xl font-bold text-neutral-900 dark:text-white tabular-nums">{display}</p>
            <p className="text-sm text-neutral-500 dark:text-neutral-400 mt-1">{stat.label}</p>
          </div>
          <div className="flex items-end gap-1 h-16 opacity-50">
            {CHART_BARS.map((h, i) => (
              <motion.div
                key={i}
                className={`w-1.5 rounded-full bg-gradient-to-t ${stat.gradient}`}
                initial={{ height: 0 }}
                whileInView={{ height: `${h}%` }}
                viewport={{ once: true }}
                transition={{ delay: 0.05 + i * 0.02, duration: 0.22 }}
              />
            ))}
          </div>
        </div>
      </motion.div>
    )
  }

  // accent — countries
  return (
    <motion.div
      {...fadeUpProps(index * 0.03)}
      whileHover={{ y: -4 }}
      className={`${stat.col} relative overflow-hidden rounded-2xl border border-neutral-200 dark:border-neutral-800 p-6 min-h-[140px]`}
    >
      <div className={`absolute inset-0 bg-gradient-to-br ${stat.surface}`} />
      <div className={`absolute top-0 left-0 w-1.5 h-full bg-gradient-to-b ${stat.gradient}`} />
      <div className="relative flex items-center gap-4 h-full">
        <div className={`p-3 rounded-xl ${stat.iconBg}`}>
          <Icon className="w-6 h-6 text-white" />
        </div>
        <div>
          <p className="text-2xl md:text-3xl font-bold text-neutral-900 dark:text-white tabular-nums">{display}</p>
          <p className="text-sm text-neutral-500 dark:text-neutral-400 mt-1">{stat.label}</p>
        </div>
      </div>
    </motion.div>
  )
}

function LogoMarquee() {
  const track = [...PARTNER_LOGOS, ...PARTNER_LOGOS]

  return (
    <div className="relative overflow-hidden py-8 group/marquee">
      <div className="absolute left-0 top-0 bottom-0 w-16 md:w-28 bg-gradient-to-r from-primary-50/90 dark:from-neutral-900 to-transparent z-10 pointer-events-none" />
      <div className="absolute right-0 top-0 bottom-0 w-16 md:w-28 bg-gradient-to-l from-primary-50/90 dark:from-neutral-900 to-transparent z-10 pointer-events-none" />
      <div className="flex w-max gap-14 md:gap-20 animate-logo-marquee group-hover/marquee:[animation-play-state:paused]">
        {track.map((partner, i) => {
          const Logo = partner.Logo
          return (
            <div
              key={`${partner.name}-${i}`}
              className="flex-shrink-0 px-3 py-2 rounded-xl bg-white/60 dark:bg-neutral-800/40 border border-neutral-200/50 dark:border-neutral-700/50 backdrop-blur-sm"
              title={partner.name}
            >
              <Logo className={`h-6 sm:h-7 w-[100px] sm:w-[120px] ${partner.color}`} />
            </div>
          )
        })}
      </div>
    </div>
  )
}

export default function SocialProof() {
  const [inView, setInView] = useState(false)
  const users = useCountUp(50000, 650, inView)
  const rating = useCountUp(4.9, 550, inView)

  return (
    <section className={`${ls.section} relative overflow-hidden bg-white dark:bg-neutral-950`}>
      {/* Ambient depth — not a box */}
      <div className="absolute inset-0 pointer-events-none" aria-hidden="true">
        <div className="absolute -top-24 right-0 w-48 sm:w-[420px] h-48 sm:h-[420px] rounded-full bg-primary-400/10 dark:bg-primary-600/5 blur-3xl" />
        <div className="absolute bottom-0 -left-24 w-48 sm:w-[360px] h-48 sm:h-[360px] rounded-full bg-secondary-400/10 dark:bg-secondary-600/5 blur-3xl" />
      </div>

      <div className={`${ls.container} relative z-10`}>
        <motion.div
          {...fadeUpProps(0)}
          onViewportEnter={() => setInView(true)}
          className="text-center mb-12 md:mb-14"
        >
          <span className={ls.eyebrow}>Trusted worldwide</span>
          <h2 className={ls.heading}>
            The numbers <span className={ls.headingAccent}>speak for themselves</span>
          </h2>
          <p className={`${ls.subheading} mx-auto mt-4`}>
            Real growth, real reviews, and partnerships with teams that take fitness seriously.
          </p>
        </motion.div>

        {/* Bento stats — separate cards, varied layouts */}
        <div className="grid grid-cols-1 md:grid-cols-12 gap-4 md:gap-5 mb-16 md:mb-20">
          {STATS.map((stat, index) => (
            <StatCard
              key={stat.key}
              stat={stat}
              display={formatStatValue(stat, users, rating)}
              index={index}
            />
          ))}

          {/* Live community pill — fills remaining column on md+ */}
          <motion.div
            {...fadeUpProps(0.12)}
            className="md:col-span-4 relative overflow-hidden rounded-2xl border border-neutral-200 dark:border-neutral-800 p-6 min-h-[140px] flex flex-col justify-center"
          >
            <div className="absolute inset-0 bg-gradient-to-br from-neutral-50 to-primary-50/30 dark:from-neutral-900 dark:to-primary-950/20" />
            <div className="relative">
              <div className="flex items-center gap-2 mb-4">
                <span className="relative flex h-2.5 w-2.5">
                  <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-success-400 opacity-75" />
                  <span className="relative inline-flex rounded-full h-2.5 w-2.5 bg-success-500" />
                </span>
                <span className="text-xs font-semibold uppercase tracking-wider text-success-700 dark:text-success-400">
                  Growing now
                </span>
              </div>
              <div className="flex -space-x-2.5 mb-3">
                {MEMBER_AVATARS.map((initials, i) => (
                  <div
                    key={initials}
                    className="w-9 h-9 rounded-full bg-gradient-to-br from-primary-500 to-secondary-500 border-2 border-white dark:border-neutral-900 flex items-center justify-center text-[10px] font-bold text-white"
                    style={{ zIndex: MEMBER_AVATARS.length - i }}
                  >
                    {initials}
                  </div>
                ))}
                <div className="w-9 h-9 rounded-full bg-neutral-800 dark:bg-neutral-700 border-2 border-white dark:border-neutral-900 flex items-center justify-center text-[10px] font-semibold text-white">
                  +50K
                </div>
              </div>
              <p className="text-sm font-medium text-neutral-800 dark:text-neutral-200">Members active today</p>
            </div>
          </motion.div>
        </div>
      </div>

      {/* Full-width logo band — tinted strip, not a card */}
      <div className="relative w-full bg-gradient-to-r from-primary-50/80 via-white to-secondary-50/80 dark:from-primary-950/30 dark:via-neutral-950 dark:to-secondary-950/30 border-y border-neutral-200/60 dark:border-neutral-800">
        <p className="text-center text-xs font-semibold uppercase tracking-widest text-neutral-500 dark:text-neutral-400 pt-8">
          Trusted by industry leaders
        </p>
        <LogoMarquee />
      </div>

      {/* Trust footer — horizontal flow */}
      <div className={`${ls.container} relative z-10 pt-10 md:pt-12`}>
        <div className="flex flex-col lg:flex-row items-center justify-center gap-8 lg:gap-12">
          <div className="flex flex-wrap items-center justify-center gap-8">
            {TRUST_BADGES.map((badge) => {
              const Logo = badge.Logo
              return (
                <motion.div
                  key={badge.name}
                  whileHover={{ y: -2 }}
                  className="opacity-75 hover:opacity-100 transition-opacity"
                  title={badge.name}
                >
                  <Logo className="h-8 w-[115px] text-neutral-700 dark:text-neutral-300" />
                </motion.div>
              )
            })}
          </div>
          <div className="hidden lg:block w-px h-10 bg-neutral-200 dark:bg-neutral-700" />
          <p className="text-sm text-neutral-600 dark:text-neutral-400 text-center lg:text-left max-w-xs">
            Rated highly on every major platform — start free and see why athletes and coaches choose FitTrack.
          </p>
        </div>
      </div>
    </section>
  )
}
