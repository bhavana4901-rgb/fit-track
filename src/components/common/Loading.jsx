import { motion } from 'framer-motion'

export default function Loading({ fullScreen = true, size = 'md', text = '' }) {
  const sizes = {
    sm: 'h-6 w-6 border-2',
    md: 'h-12 w-12 border-4',
    lg: 'h-16 w-16 border-4',
  }

  const spinner = (
    <div className="flex flex-col items-center gap-4">
      <motion.div
        className={`${sizes[size]} border-primary-600 border-t-transparent rounded-full`}
        animate={{ rotate: 360 }}
        transition={{ duration: 1, repeat: Infinity, ease: 'linear' }}
        role="status"
        aria-label="Loading"
      />
      {text && (
        <motion.p
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.2 }}
          className="text-sm text-neutral-600 dark:text-neutral-400 font-medium"
        >
          {text}
        </motion.p>
      )}
    </div>
  )

  if (fullScreen) {
    return (
      <div className="flex items-center justify-center min-h-screen bg-white dark:bg-neutral-950">
        {spinner}
      </div>
    )
  }

  return spinner
}
