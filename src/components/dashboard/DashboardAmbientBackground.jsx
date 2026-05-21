import { motion } from 'framer-motion'

/** Subtle ambient orbs for the main dashboard scroll area */
export default function DashboardAmbientBackground() {
  return (
    <div className="pointer-events-none absolute inset-0 overflow-hidden" aria-hidden>
      <motion.div
        className="absolute -top-24 right-0 w-[420px] h-[420px] rounded-full bg-primary-400/10 dark:bg-primary-500/10 blur-3xl"
        animate={{ x: [0, 24, 0], y: [0, 16, 0] }}
        transition={{ duration: 14, repeat: Infinity, ease: 'easeInOut' }}
      />
      <motion.div
        className="absolute top-1/3 -left-32 w-[360px] h-[360px] rounded-full bg-secondary-400/10 dark:bg-secondary-500/10 blur-3xl"
        animate={{ x: [0, -20, 0], y: [0, 12, 0] }}
        transition={{ duration: 16, repeat: Infinity, ease: 'easeInOut', delay: 1 }}
      />
      <motion.div
        className="absolute bottom-0 right-1/4 w-[300px] h-[300px] rounded-full bg-accent-400/8 dark:bg-accent-500/8 blur-3xl"
        animate={{ scale: [1, 1.06, 1] }}
        transition={{ duration: 12, repeat: Infinity, ease: 'easeInOut', delay: 0.5 }}
      />
    </div>
  )
}
