import { motion } from 'framer-motion'
export default function DashboardAmbientBackground() {
  return (
    <div className="pointer-events-none absolute inset-0 overflow-hidden" aria-hidden="true">
      <motion.div
        className="absolute -top-24 -right-24 w-[500px] h-[500px] rounded-full bg-gradient-to-br from-primary-400/15 via-primary-500/10 to-transparent dark:from-primary-500/12 dark:via-primary-600/8 dark:to-transparent blur-3xl"
        animate={{ 
          x: [0, 30, 0], 
          y: [0, 20, 0],
          scale: [1, 1.05, 1]
        }}
        transition={{ duration: 18, repeat: Infinity, ease: 'easeInOut' }}
      />
      <motion.div
        className="absolute top-1/3 -left-40 w-[450px] h-[450px] rounded-full bg-gradient-to-tr from-secondary-400/12 via-secondary-500/8 to-transparent dark:from-secondary-500/10 dark:via-secondary-600/6 dark:to-transparent blur-3xl"
        animate={{ 
          x: [0, -25, 0], 
          y: [0, 15, 0],
          scale: [1, 1.08, 1]
        }}
        transition={{ duration: 20, repeat: Infinity, ease: 'easeInOut', delay: 1.5 }}
      />
      <motion.div
        className="absolute bottom-0 right-1/4 w-[380px] h-[380px] rounded-full bg-gradient-to-tl from-accent-400/10 via-accent-500/6 to-transparent dark:from-accent-500/8 dark:via-accent-600/5 dark:to-transparent blur-3xl"
        animate={{ 
          scale: [1, 1.1, 1],
          x: [0, 20, 0],
          y: [0, -15, 0]
        }}
        transition={{ duration: 16, repeat: Infinity, ease: 'easeInOut', delay: 0.8 }}
      />
      <motion.div
        className="absolute bottom-1/4 -left-20 w-[320px] h-[320px] rounded-full bg-gradient-to-br from-success-400/8 via-success-500/5 to-transparent dark:from-success-500/6 dark:via-success-600/4 dark:to-transparent blur-3xl"
        animate={{ 
          x: [0, -15, 0], 
          y: [0, 20, 0],
          scale: [1, 1.06, 1]
        }}
        transition={{ duration: 22, repeat: Infinity, ease: 'easeInOut', delay: 2 }}
      />
      <motion.div
        className="absolute -top-32 left-1/3 w-[280px] h-[280px] rounded-full bg-gradient-to-b from-warning-400/6 via-warning-500/4 to-transparent dark:from-warning-500/5 dark:via-warning-600/3 dark:to-transparent blur-3xl"
        animate={{ 
          x: [0, 10, 0], 
          y: [0, 25, 0],
          scale: [1, 1.12, 1]
        }}
        transition={{ duration: 24, repeat: Infinity, ease: 'easeInOut', delay: 3 }}
      />
      <div className="absolute inset-0 bg-[linear-gradient(to_right,#80808008_1px,transparent_1px),linear-gradient(to_bottom,#80808008_1px,transparent_1px)] bg-[size:64px_64px] dark:bg-[linear-gradient(to_right,#ffffff05_1px,transparent_1px),linear-gradient(to_bottom,#ffffff05_1px,transparent_1px)]" />
    </div>
  )
}
