import { useEffect, useState, useMemo } from 'react'
import { motion } from 'framer-motion'
import { TrendingUp, TrendingDown } from 'lucide-react'

/**
 * StatsCard Component
 * Reusable card for displaying statistics with animated counters
 *
 * @param {Object} props
 * @param {number} props.value - The statistic value to display
 * @param {string} props.label - Card label (e.g., "Workouts")
 * @param {string} props.subtitle - Subtitle (e.g., "This week")
 * @param {string} props.icon - Emoji or icon to display
 * @param {string} props.color - Color theme: 'primary', 'secondary', 'accent'
 * @param {boolean} props.trend - Positive trend if true, negative if false, null for no trend
 * @param {string} props.unit - Optional unit suffix (e.g., "%" or "kcal")
 * @param {number} props.delay - Optional animation delay in seconds
 */
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

  // Determine color classes based on color prop
  const colorClasses = useMemo(() => {
    const colorMap = {
      primary: {
        text: 'text-primary-600 dark:text-primary-400',
        bg: 'bg-primary-100 dark:bg-primary-950/30',
      },
      secondary: {
        text: 'text-secondary-600 dark:text-secondary-400',
        bg: 'bg-secondary-100 dark:bg-secondary-950/30',
      },
      accent: {
        text: 'text-accent-600 dark:text-accent-400',
        bg: 'bg-accent-100 dark:bg-accent-950/30',
      },
      success: {
        text: 'text-success-600 dark:text-success-400',
        bg: 'bg-success-100 dark:bg-success-950/30',
      },
      error: {
        text: 'text-error-600 dark:text-error-400',
        bg: 'bg-error-100 dark:bg-error-950/30',
      },
      warning: {
        text: 'text-warning-600 dark:text-warning-400',
        bg: 'bg-warning-100 dark:bg-warning-950/30',
      },
    }
    return colorMap[color] || colorMap.primary
  }, [color])

  // Animated counter effect
  useEffect(() => {
    const duration = 1.2 // Animation duration in seconds
    const steps = 60 // Number of animation frames
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

  const cardVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.4,
        ease: 'easeOut',
        delay,
      },
    },
  }

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
      variants={cardVariants}
      initial="hidden"
      animate="visible"
      className="p-6 bg-white dark:bg-neutral-800 rounded-lg border border-neutral-200 dark:border-neutral-700 shadow-sm hover:shadow-md transition-shadow"
      whileHover={{ y: -4 }}
    >
      <div className="flex items-start justify-between">
        <div className="flex-1">
          {/* Label */}
          <p className="text-sm font-medium text-neutral-600 dark:text-neutral-400">
            {label}
          </p>

          {/* Animated Value */}
          <motion.p
            className={`text-3xl md:text-4xl font-bold ${colorClasses.text} mt-2`}
            key={value}
            initial={{ scale: 0.9, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            transition={{ duration: 0.3 }}
          >
            {displayValue}
            {unit && <span className="text-lg ml-1">{unit}</span>}
          </motion.p>

          {/* Subtitle & Trend */}
          <div className="flex items-center justify-between mt-3">
            <p className="text-xs text-neutral-500 dark:text-neutral-500">
              {subtitle}
            </p>
            {trendIndicator}
          </div>
        </div>

        {/* Icon Badge */}
        <motion.div
          className={`w-14 h-14 ${colorClasses.bg} rounded-lg flex items-center justify-center flex-shrink-0`}
          whileHover={{ rotate: 10, scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
        >
          <span className="text-2xl">{icon}</span>
        </motion.div>
      </div>
    </motion.div>
  )
}
