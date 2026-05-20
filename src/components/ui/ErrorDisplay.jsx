import { motion, AnimatePresence } from 'framer-motion'
import { AlertCircle, X } from 'lucide-react'

/**
 * Error Display component for form validation errors
 * - Animated error message display
 * - Icon support (AlertCircle by default)
 * - Close button for dismissible errors
 * - Multiple error support (array or single)
 * - Variants: inline, block, toast
 * - Accessibility: role="alert", aria-live
 */
export default function ErrorDisplay({
  errors,
  onDismiss,
  variant = 'block', // 'inline', 'block', 'toast'
  icon: Icon = AlertCircle,
  className = '',
}) {
  // Normalize errors to array
  const errorList = Array.isArray(errors) ? errors : [errors].filter(Boolean)

  if (errorList.length === 0) return null

  const variants = {
    inline: {
      container: 'text-sm text-error-600 dark:text-error-400',
      wrapper: 'flex items-start gap-2',
    },
    block: {
      container:
        'p-3.5 rounded-lg bg-error-50 dark:bg-error-950/30 border border-error-200 dark:border-error-800',
      wrapper: 'flex items-start gap-3',
    },
    toast: {
      container:
        'px-4 py-3 rounded-lg bg-error-600 dark:bg-error-700 border border-error-700 dark:border-error-600 shadow-lg',
      wrapper: 'flex items-start gap-3',
    },
  }

  const textColor = {
    inline: 'text-error-600 dark:text-error-400',
    block: 'text-error-800 dark:text-error-200',
    toast: 'text-white',
  }

  const iconColor = {
    inline: 'text-error-500 dark:text-error-400',
    block: 'text-error-600 dark:text-error-400',
    toast: 'text-white',
  }

  return (
    <AnimatePresence>
      <motion.div
        className={`${variants[variant].container} ${className}`}
        initial={{ opacity: 0, y: -10 }}
        animate={{ opacity: 1, y: 0 }}
        exit={{ opacity: 0, y: -10 }}
        transition={{ duration: 0.2 }}
        role="alert"
        aria-live="polite"
      >
        <div className={variants[variant].wrapper}>
          <Icon className={`w-5 h-5 flex-shrink-0 mt-0.5 ${iconColor[variant]}`} />

          <div className="flex-1">
            {errorList.length === 1 ? (
              <p className={`font-medium ${textColor[variant]}`}>
                {errorList[0]}
              </p>
            ) : (
              <ul className={`space-y-1 ${textColor[variant]}`}>
                {errorList.map((error, idx) => (
                  <li key={idx} className="font-medium">
                    {error}
                  </li>
                ))}
              </ul>
            )}
          </div>

          {onDismiss && (
            <button
              onClick={onDismiss}
              className={`flex-shrink-0 p-1 rounded transition-colors ${
                variant === 'toast'
                  ? 'hover:bg-error-700 dark:hover:bg-error-600 text-white'
                  : variant === 'block'
                  ? 'hover:bg-error-100 dark:hover:bg-error-900/50 text-error-600 dark:text-error-400'
                  : 'hover:bg-error-100 dark:hover:bg-error-900/50 text-error-500 dark:text-error-400'
              }`}
              aria-label="Dismiss error"
            >
              <X className="w-4 h-4" />
            </button>
          )}
        </div>
      </motion.div>
    </AnimatePresence>
  )
}
