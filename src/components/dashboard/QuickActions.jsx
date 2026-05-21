import React from 'react'
import { motion } from 'framer-motion'
import { Play, Apple, TrendingUp } from 'lucide-react'

const QuickActions = () => {
  // Quick action buttons configuration
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

  // Container animation variants
  const containerVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.4,
        ease: 'easeOut',
        staggerChildren: 0.1,
        delayChildren: 0.1,
      },
    },
  }

  // Item animation variants
  const itemVariants = {
    hidden: { opacity: 0, scale: 0.9, y: 10 },
    visible: {
      opacity: 1,
      scale: 1,
      y: 0,
      transition: {
        duration: 0.3,
        ease: 'easeOut',
      },
    },
  }

  // Get color classes based on color prop
  const getColorClasses = (colorType) => {
    const colors = {
      primary: {
        bg: 'bg-primary-100 dark:bg-primary-950/30',
        text: 'text-primary-600 dark:text-primary-400',
        border: 'border-primary-200 dark:border-primary-800',
        icon: 'text-primary-600 dark:text-primary-400',
        hover: 'hover:bg-primary-600',
        focusRing: 'focus:ring-primary-500',
      },
      success: {
        bg: 'bg-success-100 dark:bg-success-950/30',
        text: 'text-success-600 dark:text-success-400',
        border: 'border-success-200 dark:border-success-800',
        icon: 'text-success-600 dark:text-success-400',
        hover: 'hover:bg-success-600',
        focusRing: 'focus:ring-success-500',
      },
      secondary: {
        bg: 'bg-secondary-100 dark:bg-secondary-950/30',
        text: 'text-secondary-600 dark:text-secondary-400',
        border: 'border-secondary-200 dark:border-secondary-800',
        icon: 'text-secondary-600 dark:text-secondary-400',
        hover: 'hover:bg-secondary-600',
        focusRing: 'focus:ring-secondary-500',
      },
    }
    return colors[colorType] || colors.primary
  }

  return (
    <motion.div
      variants={containerVariants}
      initial="hidden"
      animate="visible"
      className="bg-white dark:bg-neutral-800 rounded-xl shadow-sm border border-neutral-200 dark:border-neutral-700 p-6"
    >
      {/* Header */}
      <div className="mb-6">
        <h3 className="text-xl font-bold text-neutral-900 dark:text-white mb-1">
          Quick Actions
        </h3>
        <p className="text-sm text-neutral-600 dark:text-neutral-400">
          Get started with your fitness journey
        </p>
      </div>

      {/* Action buttons grid */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        {actions.map((action) => {
          const colorClasses = getColorClasses(action.color)
          const Icon = action.icon

          return (
            <motion.button
              key={action.id}
              variants={itemVariants}
              whileHover={{
                scale: 1.05,
                transition: { duration: 0.2 },
              }}
              whileTap={{ scale: 0.95 }}
              onClick={action.onClick}
              aria-label={`${action.label}: ${action.description}`}
              className={`relative overflow-hidden group p-6 rounded-lg border-2 transition-all duration-300 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-offset-white dark:focus:ring-offset-neutral-950 ${colorClasses.focusRing} ${colorClasses.bg} ${colorClasses.border} ${colorClasses.text}`}
            >
              {/* Background gradient on hover */}
              <motion.div
                className="absolute inset-0 -translate-x-full group-hover:translate-x-0 transition-transform duration-500 ease-out"
                style={{
                  background: `linear-gradient(135deg, ${action.color === 'primary' ? '#3B82F6' : action.color === 'success' ? '#10B981' : '#8B5CF6'} 0%, ${action.color === 'primary' ? '#1F2937' : action.color === 'success' ? '#065F46' : '#5B21B6'} 100%)`,
                }}
              />

              {/* Content */}
              <div className="relative z-10 flex flex-col items-center gap-3">
                {/* Icon container */}
                <motion.div
                  whileHover={{ rotate: 10 }}
                  whileTap={{ scale: 0.9 }}
                  className={`p-4 rounded-full ${colorClasses.bg} group-hover:bg-white/20 transition-colors duration-300`}
                >
                  <Icon size={24} className={`${colorClasses.icon} group-hover:text-white transition-colors duration-300`} />
                </motion.div>

                {/* Label */}
                <div>
                  <p className={`font-semibold text-sm group-hover:text-white transition-colors duration-300 ${colorClasses.text}`}>
                    {action.label}
                  </p>
                  <p className={`text-xs mt-0.5 opacity-75 group-hover:text-white/80 transition-colors duration-300`}>
                    {action.description}
                  </p>
                </div>

                {/* Arrow indicator */}
                <motion.div
                  initial={{ opacity: 0, x: -10 }}
                  whileHover={{ opacity: 1, x: 0 }}
                  transition={{ duration: 0.3 }}
                  className={`text-xs font-medium group-hover:text-white transition-colors duration-300 mt-2`}
                >
                  →
                </motion.div>
              </div>
            </motion.button>
          )
        })}
      </div>

      {/* Footer note */}
      <motion.div
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.4 }}
        className="mt-6 pt-6 border-t border-neutral-200 dark:border-neutral-700"
      >
        <p className="text-xs text-neutral-600 dark:text-neutral-400">
          💡 <span className="font-medium">Tip:</span> Click any action to get started. Your progress will be saved automatically.
        </p>
      </motion.div>
    </motion.div>
  )
}

export default QuickActions
