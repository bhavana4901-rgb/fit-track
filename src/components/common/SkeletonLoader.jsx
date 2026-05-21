import { motion } from 'framer-motion'

const shimmer = {
  hidden: { x: '-100%' },
  visible: {
    x: '100%',
    transition: {
      repeat: Infinity,
      duration: 1.5,
      ease: 'linear',
    },
  },
}

export function SkeletonCard({ className = '' }) {
  return (
    <div
      className={`relative overflow-hidden rounded-xl bg-neutral-200 dark:bg-neutral-800 ${className}`}
      role="status"
      aria-label="Loading content"
    >
      <motion.div
        className="absolute inset-0 bg-gradient-to-r from-transparent via-white/40 dark:via-neutral-700/40 to-transparent"
        variants={shimmer}
        initial="hidden"
        animate="visible"
      />
    </div>
  )
}

export function SkeletonText({ lines = 3, className = '' }) {
  return (
    <div className={`space-y-3 ${className}`} role="status" aria-label="Loading text">
      {Array.from({ length: lines }).map((_, i) => (
        <div
          key={i}
          className="relative overflow-hidden h-4 rounded bg-neutral-200 dark:bg-neutral-800"
          style={{ width: i === lines - 1 ? '70%' : '100%' }}
        >
          <motion.div
            className="absolute inset-0 bg-gradient-to-r from-transparent via-white/40 dark:via-neutral-700/40 to-transparent"
            variants={shimmer}
            initial="hidden"
            animate="visible"
          />
        </div>
      ))}
    </div>
  )
}

export function SkeletonAvatar({ size = 'md', className = '' }) {
  const sizes = {
    sm: 'w-8 h-8',
    md: 'w-12 h-12',
    lg: 'w-16 h-16',
    xl: 'w-24 h-24',
  }

  return (
    <div
      className={`relative overflow-hidden rounded-full bg-neutral-200 dark:bg-neutral-800 ${sizes[size]} ${className}`}
      role="status"
      aria-label="Loading avatar"
    >
      <motion.div
        className="absolute inset-0 bg-gradient-to-r from-transparent via-white/40 dark:via-neutral-700/40 to-transparent"
        variants={shimmer}
        initial="hidden"
        animate="visible"
      />
    </div>
  )
}

export function SkeletonDashboard() {
  return (
    <div className="space-y-6 p-6" role="status" aria-label="Loading dashboard">
      {/* Header Skeleton */}
      <div className="flex items-center justify-between">
        <div className="space-y-2">
          <SkeletonCard className="h-8 w-48" />
          <SkeletonCard className="h-4 w-32" />
        </div>
        <SkeletonAvatar size="lg" />
      </div>

      {/* Stats Cards Skeleton */}
      <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-4 gap-4">
        {Array.from({ length: 4 }).map((_, i) => (
          <SkeletonCard key={i} className="h-32" />
        ))}
      </div>

      {/* Main Content Skeleton */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <div className="lg:col-span-2 space-y-6">
          <SkeletonCard className="h-96" />
          <SkeletonCard className="h-80" />
        </div>
        <div className="space-y-6">
          <SkeletonCard className="h-64" />
          <SkeletonCard className="h-64" />
        </div>
      </div>
    </div>
  )
}

export default SkeletonCard
