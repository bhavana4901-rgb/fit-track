import { motion } from 'framer-motion'
import { Dumbbell, Heart, Flame, Activity, Zap } from 'lucide-react'
const floatVariants = {
  animate: (i) => ({
    y: [0, -12, 0],
    rotate: [0, i % 2 === 0 ? 6 : -6, 0],
    transition: {
      duration: 3 + i * 0.4,
      repeat: Infinity,
      ease: 'easeInOut',
    },
  }),
}
const pulseRing = {
  animate: {
    scale: [1, 1.15, 1],
    opacity: [0.4, 0.15, 0.4],
    transition: { duration: 3, repeat: Infinity, ease: 'easeInOut' },
  },
}
export default function HeroFitnessIllustration() {
  const badges = [
    { Icon: Dumbbell, color: 'text-primary-500', pos: 'top-6 left-2 sm:top-8 sm:left-4 md:top-12 md:left-8', delay: 0, hideOnMobile: false },
    { Icon: Heart, color: 'text-accent-500', pos: 'top-12 right-2 sm:top-16 sm:right-4 md:top-20 md:right-10', delay: 0.3, hideOnMobile: false },
    { Icon: Flame, color: 'text-error-500', pos: 'bottom-24 left-3 sm:bottom-20 sm:left-6 md:bottom-24 md:left-12', delay: 0.6, hideOnMobile: false },
    { Icon: Activity, color: 'text-success-500', pos: 'bottom-14 right-3 sm:bottom-12 sm:right-6 md:bottom-16 md:right-8', delay: 0.9, hideOnMobile: false },
    { Icon: Zap, color: 'text-secondary-500', pos: 'top-1/2 -translate-y-1/2 right-0 md:right-2', delay: 1.2, hideOnMobile: true },
  ]
  return (
    <div className="relative w-full max-w-[min(100%,20rem)] sm:max-w-md lg:max-w-lg mx-auto aspect-square" aria-hidden="true">
      {}
      <motion.div
        className="absolute inset-8 rounded-full bg-gradient-to-br from-primary-400/30 via-secondary-400/25 to-accent-400/20 blur-2xl"
        animate={{ scale: [1, 1.08, 1], opacity: [0.6, 0.85, 0.6] }}
        transition={{ duration: 5, repeat: Infinity, ease: 'easeInOut' }}
      />
      {}
      {[0, 1, 2].map((i) => (
        <motion.div
          key={i}
          variants={pulseRing}
          animate="animate"
          transition={{ delay: i * 0.8 }}
          className="absolute inset-12 md:inset-10 rounded-full border-2 border-primary-400/30 dark:border-primary-500/25"
        />
      ))}
      {}
      <motion.div
        initial={{ opacity: 0, scale: 0.9 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.7, delay: 0.2 }}
        className="absolute inset-16 md:inset-14 flex items-center justify-center"
      >
        <svg
          viewBox="0 0 320 320"
          className="w-full h-full"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          <defs>
            <linearGradient id="heroBodyGrad" x1="0%" y1="0%" x2="100%" y2="100%">
              <stop offset="0%" stopColor="#3B82F6" />
              <stop offset="50%" stopColor="#8B5CF6" />
              <stop offset="100%" stopColor="#EC4899" />
            </linearGradient>
            <linearGradient id="heroFloorGrad" x1="0%" y1="0%" x2="100%" y2="0%">
              <stop offset="0%" stopColor="#3B82F6" stopOpacity="0.2" />
              <stop offset="100%" stopColor="#8B5CF6" stopOpacity="0.1" />
            </linearGradient>
          </defs>
          {}
          <ellipse cx="160" cy="268" rx="90" ry="12" fill="url(#heroFloorGrad)" />
          {}
          <motion.g
            animate={{ y: [0, -6, 0] }}
            transition={{ duration: 1.2, repeat: Infinity, ease: 'easeInOut' }}
          >
            {}
            <circle cx="160" cy="72" r="22" fill="url(#heroBodyGrad)" opacity="0.9" />
            {}
            <path
              d="M160 94 L160 168"
              stroke="url(#heroBodyGrad)"
              strokeWidth="14"
              strokeLinecap="round"
            />
            {}
            <motion.path
              d="M160 110 L120 140"
              stroke="url(#heroBodyGrad)"
              strokeWidth="10"
              strokeLinecap="round"
              animate={{ d: ['M160 110 L120 140', 'M160 110 L200 130', 'M160 110 L120 140'] }}
              transition={{ duration: 0.6, repeat: Infinity, ease: 'easeInOut' }}
            />
            <motion.path
              d="M160 110 L200 130"
              stroke="url(#heroBodyGrad)"
              strokeWidth="10"
              strokeLinecap="round"
              animate={{ d: ['M160 110 L200 130', 'M160 110 L120 140', 'M160 110 L200 130'] }}
              transition={{ duration: 0.6, repeat: Infinity, ease: 'easeInOut' }}
            />
            {}
            <motion.path
              d="M160 168 L130 220"
              stroke="url(#heroBodyGrad)"
              strokeWidth="12"
              strokeLinecap="round"
              animate={{ d: ['M160 168 L130 220', 'M160 168 L190 210', 'M160 168 L130 220'] }}
              transition={{ duration: 0.6, repeat: Infinity, ease: 'easeInOut' }}
            />
            <motion.path
              d="M160 168 L190 210"
              stroke="url(#heroBodyGrad)"
              strokeWidth="12"
              strokeLinecap="round"
              animate={{ d: ['M160 168 L190 210', 'M160 168 L130 220', 'M160 168 L190 210'] }}
              transition={{ duration: 0.6, repeat: Infinity, ease: 'easeInOut' }}
            />
          </motion.g>
          {}
          <motion.path
            d="M40 200 L70 200 L85 170 L100 230 L115 190 L130 200 L160 200"
            stroke="#10B981"
            strokeWidth="3"
            strokeLinecap="round"
            strokeLinejoin="round"
            fill="none"
            initial={{ pathLength: 0, opacity: 0 }}
            animate={{ pathLength: 1, opacity: 1 }}
            transition={{ duration: 1.5, delay: 0.5 }}
          />
          <motion.path
            d="M160 200 L190 200 L205 175 L220 225 L235 195 L250 200 L280 200"
            stroke="#3B82F6"
            strokeWidth="3"
            strokeLinecap="round"
            strokeLinejoin="round"
            fill="none"
            initial={{ pathLength: 0, opacity: 0 }}
            animate={{ pathLength: 1, opacity: 1 }}
            transition={{ duration: 1.5, delay: 0.7 }}
          />
          {}
          <motion.g
            animate={{ rotate: [0, 8, 0, -8, 0] }}
            transition={{ duration: 4, repeat: Infinity, ease: 'easeInOut' }}
            style={{ transformOrigin: '260px 100px' }}
          >
            <rect x="248" y="92" width="24" height="16" rx="4" fill="#8B5CF6" opacity="0.8" />
            <rect x="236" y="88" width="12" height="24" rx="3" fill="#8B5CF6" />
            <rect x="272" y="88" width="12" height="24" rx="3" fill="#8B5CF6" />
          </motion.g>
        </svg>
      </motion.div>
      {}
      {badges.map(({ Icon, color, pos, delay, hideOnMobile }, i) => (
        <motion.div
          key={i}
          custom={i}
          variants={floatVariants}
          animate="animate"
          transition={{ delay }}
          className={`absolute ${pos} w-9 h-9 sm:w-11 sm:h-11 md:w-12 md:h-12 rounded-lg border border-neutral-200 dark:border-neutral-700 bg-white dark:bg-neutral-900 shadow-sm flex items-center justify-center ${hideOnMobile ? 'hidden sm:flex' : ''}`}
        >
          <Icon className={`w-4 h-4 sm:w-5 sm:h-5 md:w-6 md:h-6 ${color}`} strokeWidth={2.5} />
        </motion.div>
      ))}
      {}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.8 }}
        className="absolute bottom-2 sm:bottom-4 left-1/2 -translate-x-1/2 w-[calc(100%-1.5rem)] max-w-[240px] sm:max-w-none sm:w-auto px-3 sm:px-5 py-2 sm:py-2.5 rounded-full bg-white dark:bg-neutral-900 border border-neutral-200 dark:border-neutral-700 shadow-sm flex items-center justify-center gap-2 sm:gap-4"
      >
        <div className="text-center flex-1 min-w-0">
          <p className="text-sm sm:text-lg font-bold text-primary-600 dark:text-primary-400">2.4k</p>
          <p className="text-[9px] sm:text-[10px] uppercase tracking-wide text-neutral-500 dark:text-neutral-400">Calories</p>
        </div>
        <div className="w-px h-6 sm:h-8 bg-neutral-200 dark:bg-neutral-700 shrink-0" />
        <div className="text-center flex-1 min-w-0">
          <p className="text-sm sm:text-lg font-bold text-secondary-600 dark:text-secondary-400">45m</p>
          <p className="text-[9px] sm:text-[10px] uppercase tracking-wide text-neutral-500 dark:text-neutral-400">Active</p>
        </div>
        <div className="w-px h-6 sm:h-8 bg-neutral-200 dark:bg-neutral-700 shrink-0" />
        <div className="text-center flex-1 min-w-0">
          <p className="text-sm sm:text-lg font-bold text-accent-600 dark:text-accent-400">12</p>
          <p className="text-[9px] sm:text-[10px] uppercase tracking-wide text-neutral-500 dark:text-neutral-400">Streak</p>
        </div>
      </motion.div>
    </div>
  )
}
