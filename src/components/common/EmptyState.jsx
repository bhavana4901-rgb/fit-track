import { motion } from 'framer-motion'
import { Button } from '../ui'

export default function EmptyState({
  icon: Icon,
  emoji,
  title,
  description,
  actionLabel,
  onAction,
  illustration,
  className = '',
}) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
      className={`flex flex-col items-center justify-center text-center p-8 sm:p-12 ${className}`}
      role="status"
      aria-live="polite"
    >
      {/* Illustration or Icon */}
      <motion.div
        initial={{ scale: 0.8, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        transition={{ delay: 0.1, type: 'spring', stiffness: 200 }}
        className="mb-6"
      >
        {illustration ? (
          <div className="w-48 h-48 sm:w-64 sm:h-64">{illustration}</div>
        ) : emoji ? (
          <div className="text-6xl sm:text-7xl mb-4" role="img" aria-label={title}>
            {emoji}
          </div>
        ) : Icon ? (
          <div className="w-20 h-20 sm:w-24 sm:h-24 rounded-full bg-neutral-100 dark:bg-neutral-800 flex items-center justify-center">
            <Icon className="w-10 h-10 sm:w-12 sm:h-12 text-neutral-400 dark:text-neutral-500" />
          </div>
        ) : null}
      </motion.div>

      {/* Title */}
      <motion.h3
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.2 }}
        className="text-xl sm:text-2xl font-bold text-neutral-900 dark:text-white mb-3"
      >
        {title}
      </motion.h3>

      {/* Description */}
      <motion.p
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.3 }}
        className="text-sm sm:text-base text-neutral-600 dark:text-neutral-400 max-w-md mb-6"
      >
        {description}
      </motion.p>

      {/* Action Button */}
      {actionLabel && onAction && (
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.4 }}
        >
          <Button onClick={onAction} size="lg">
            {actionLabel}
          </Button>
        </motion.div>
      )}
    </motion.div>
  )
}
