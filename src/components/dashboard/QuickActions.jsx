import React from 'react'
import { motion } from 'framer-motion'
import { Play, Apple, TrendingUp, Zap } from 'lucide-react'
import { dashboardCard, dashboardCardPadding, dashboardSectionTitle, dashboardSectionSubtitle } from './dashboardStyles'
import { dashboardItem } from './dashboardMotion'

const QuickActions = () => {
  const actions = [
    {
      id: 1,
      label: 'Start Workout',
      icon: Play,
      color: 'primary',
      bgColor: 'primary',
      description: 'Begin today\'s workout',
      onClick: () => console.log('Start Workout clicked'),
    },
    {
      id: 2,
      label: 'Log Meal',
      icon: Apple,
      color: 'success',
      bgColor: 'success',
      description: 'Track nutrition intake',
      onClick: () => console.log('Log Meal clicked'),
    },
    {
      id: 3,
      label: 'View Progress',
      icon: TrendingUp,
      color: 'secondary',
      bgColor: 'secondary',
      description: 'Check your stats',
      onClick: () => console.log('View Progress clicked'),
    },
  ]

  const itemVariants = {
    hidden: { opacity: 0, scale: 0.96, y: 8 },
    visible: {
      opacity: 1,
      scale: 1,
      y: 0,
      transition: { duration: 0.28, ease: 'easeOut' },
    },
  }

  const getColorClasses = (colorType) => {
    const colors = {
      primary: {
        bg: 'bg-primary-50/80 dark:bg-primary-950/25',
        text: 'text-primary-700 dark:text-primary-300',
        border: 'border-primary-200/80 dark:border-primary-800/60',
        icon: 'text-primary-600 dark:text-primary-400',
        iconBg: 'bg-primary-100 dark:bg-primary-950/50',
        hover: 'hover:border-primary-400 dark:hover:border-primary-600 hover:shadow-md hover:shadow-primary-500/10',
        focusRing: 'focus:ring-primary-500',
      },
      success: {
        bg: 'bg-success-50/80 dark:bg-success-950/25',
        text: 'text-success-700 dark:text-success-300',
        border: 'border-success-200/80 dark:border-success-800/60',
        icon: 'text-success-600 dark:text-success-400',
        iconBg: 'bg-success-100 dark:bg-success-950/50',
        hover: 'hover:border-success-400 dark:hover:border-success-600 hover:shadow-md hover:shadow-success-500/10',
        focusRing: 'focus:ring-success-500',
      },
      secondary: {
        bg: 'bg-secondary-50/80 dark:bg-secondary-950/25',
        text: 'text-secondary-700 dark:text-secondary-300',
        border: 'border-secondary-200/80 dark:border-secondary-800/60',
        icon: 'text-secondary-600 dark:text-secondary-400',
        iconBg: 'bg-secondary-100 dark:bg-secondary-950/50',
        hover: 'hover:border-secondary-400 dark:hover:border-secondary-600 hover:shadow-md hover:shadow-secondary-500/10',
        focusRing: 'focus:ring-secondary-500',
      },
    }
    return colors[colorType] || colors.primary
  }

  return (
    <motion.div
      variants={dashboardItem}
      initial="hidden"
      animate="visible"
      className={`${dashboardCard} ${dashboardCardPadding} overflow-hidden relative`}
    >
      <div className="absolute top-0 left-0 right-0 h-1 bg-gradient-to-r from-accent-500 via-primary-500 to-success-500 opacity-80" />

      <div className="mb-6 flex items-start gap-2">
        <span className="inline-flex p-2 rounded-lg bg-accent-100 dark:bg-accent-950/40 shrink-0">
          <Zap className="w-5 h-5 text-accent-600 dark:text-accent-400" />
        </span>
        <div>
          <h3 className={dashboardSectionTitle}>Quick Actions</h3>
          <p className={`${dashboardSectionSubtitle} mt-1`}>
            Get started with your fitness journey
          </p>
        </div>
      </div>

      <motion.div
        className="grid grid-cols-1 md:grid-cols-3 gap-4"
        initial="hidden"
        animate="visible"
        variants={{
          visible: { transition: { staggerChildren: 0.06, delayChildren: 0.08 } },
        }}
      >
        {actions.map((action) => {
          const colorClasses = getColorClasses(action.color)
          const Icon = action.icon

          return (
            <motion.button
              key={action.id}
              variants={itemVariants}
              whileHover={{ y: -3, scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
              onClick={action.onClick}
              aria-label={`${action.label}: ${action.description}`}
              className={`p-5 sm:p-6 rounded-xl border-2 text-left transition-all duration-300 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-offset-white dark:focus:ring-offset-neutral-900 ${colorClasses.focusRing} ${colorClasses.bg} ${colorClasses.border} ${colorClasses.hover}`}
            >
              <div className="flex flex-col items-center gap-3">
                <motion.div
                  className={`p-3.5 rounded-xl ${colorClasses.iconBg}`}
                  whileHover={{ rotate: 6 }}
                >
                  <Icon size={22} className={colorClasses.icon} />
                </motion.div>
                <div className="text-center">
                  <p className={`font-semibold text-sm ${colorClasses.text}`}>{action.label}</p>
                  <p className="text-xs mt-0.5 text-neutral-500 dark:text-neutral-400">{action.description}</p>
                </div>
              </div>
            </motion.button>
          )
        })}
      </motion.div>

      <motion.div
        initial={{ opacity: 0, y: 8 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.25 }}
        className="mt-6 pt-5 border-t border-neutral-200/80 dark:border-neutral-700/80"
      >
        <p className="text-xs text-neutral-600 dark:text-neutral-400">
          💡 <span className="font-medium">Tip:</span> Click any action to get started. Your progress will be saved automatically.
        </p>
      </motion.div>
    </motion.div>
  )
}

export default QuickActions
