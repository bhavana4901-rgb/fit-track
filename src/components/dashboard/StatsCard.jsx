import { useEffect, useState, useMemo } from 'react'
import { motion } from 'framer-motion'
import { TrendingUp, TrendingDown } from 'lucide-react'
import { dashboardCard, dashboardCardPadding } from './dashboardStyles'
import { dashboardItem } from './dashboardMotion'

export default function StatsCard({
  value = 0,
  label = 'Stat',
  subtitle = 'Status',
  icon = '📊',
  color = 'primary',
  trend = null,
  unit = '',
  delay = 0,
}) {
  const [displayValue, setDisplayValue] = useState(0)

  const colorClasses = useMemo(() => {
    const colorMap = {
      primary: {
        text: 'text-primary-600 dark:text-primary-400',
        bg: 'bg-primary-100 dark:bg-primary-950/40',
        glow: 'from-primary-500/15 to-transparent',
        accent: 'bg-primary-500',
      },
      secondary: {
        text: 'text-secondary-600 dark:text-secondary-400',
        bg: 'bg-secondary-100 dark:bg-secondary-950/40',
        glow: 'from-secondary-500/15 to-transparent',
        accent: 'bg-secondary-500',
      },
      accent: {
        text: 'text-accent-600 dark:text-accent-400',
        bg: 'bg-accent-100 dark:bg-accent-950/40',
        glow: 'from-accent-500/15 to-transparent',
        accent: 'bg-accent-500',
      },
      success: {
        text: 'text-success-600 dark:text-success-400',
        bg: 'bg-success-100 dark:bg-success-950/40',
        glow: 'from-success-500/15 to-transparent',
        accent: 'bg-success-500',
      },
      error: {
        text: 'text-error-600 dark:text-error-400',
        bg: 'bg-error-100 dark:bg-error-950/40',
        glow: 'from-error-500/15 to-transparent',
        accent: 'bg-error-500',
      },
      warning: {
        text: 'text-warning-600 dark:text-warning-400',
        bg: 'bg-warning-100 dark:bg-warning-950/40',
        glow: 'from-warning-500/15 to-transparent',
        accent: 'bg-warning-500',
      },
    }
    return colorMap[color] || colorMap.primary
  }, [color])

  useEffect(() => {
    const duration = 1.2
    const steps = 60
    const stepValue = value / steps
    let currentStep = 0

    const interval = setInterval(() => {
      currentStep++
      setDisplayValue(Math.round(stepValue * currentStep))
      if (currentStep >= steps) {
        setDisplayValue(value)
        clearInterval(interval)
      }
    }, (duration * 1000) / steps)

    return () => clearInterval(interval)
  }, [value])

  const trendIndicator = trend !== null && (
    <div className="flex items-center gap-1">
      {trend ? (
        <>
          <TrendingUp className="w-4 h-4 text-success-600 dark:text-success-400" />
          <span className="text-xs font-semibold text-success-600 dark:text-success-400">+2.4%</span>
        </>
      ) : (
        <>
          <TrendingDown className="w-4 h-4 text-error-600 dark:text-error-400" />
          <span className="text-xs font-semibold text-error-600 dark:text-error-400">-1.2%</span>
        </>
      )}
    </div>
  )

  return (
    <motion.div
      role="region"
      aria-label={`${label}: ${displayValue}${unit} ${subtitle}`}
      variants={dashboardItem}
      initial="hidden"
      animate="visible"
      transition={{ delay }}
      className={`${dashboardCard} ${dashboardCardPadding} relative overflow-hidden group`}
      whileHover={{ y: -3 }}
    >
      <div className={`absolute -top-8 -right-8 w-24 h-24 rounded-full bg-gradient-to-br ${colorClasses.glow} blur-2xl pointer-events-none`} />
      <div className={`absolute top-0 left-0 right-0 h-0.5 ${colorClasses.accent} opacity-60`} />

      <div className="flex items-start justify-between relative">
        <div className="flex-1 min-w-0">
          <p className="text-sm font-medium text-neutral-600 dark:text-neutral-400">{label}</p>
          <motion.p
            className={`text-3xl font-bold ${colorClasses.text} mt-2 tabular-nums`}
            key={value}
            initial={{ scale: 0.92, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            transition={{ duration: 0.25 }}
          >
            {displayValue}
            {unit && <span className="text-lg ml-0.5">{unit}</span>}
          </motion.p>
          <div className="flex items-center justify-between mt-3 gap-2">
            <p className="text-xs text-neutral-500 dark:text-neutral-500">{subtitle}</p>
            {trendIndicator}
          </div>
        </div>

        <motion.div
          className={`w-12 h-12 sm:w-14 sm:h-14 ${colorClasses.bg} rounded-xl flex items-center justify-center flex-shrink-0 border border-white/50 dark:border-neutral-700/50`}
          whileHover={{ rotate: 8, scale: 1.06 }}
          whileTap={{ scale: 0.95 }}
        >
          <span className="text-xl sm:text-2xl">{icon}</span>
        </motion.div>
      </div>
    </motion.div>
  )
}
