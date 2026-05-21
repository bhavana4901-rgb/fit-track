import { motion } from 'framer-motion'
import { Dumbbell, TrendingUp, Target, Lock } from 'lucide-react'
import HeroFitnessIllustration from '../landing/HeroFitnessIllustration'
import { viewTransitionFast } from '../landing/landingMotion'
const HIGHLIGHTS = [
  { icon: Target, text: 'Personalized workout plans', color: 'text-primary-600 dark:text-primary-400', bg: 'bg-primary-100 dark:bg-primary-950' },
  { icon: TrendingUp, text: 'Track progress in real time', color: 'text-success-600 dark:text-success-400', bg: 'bg-success-100 dark:bg-success-950' },
  { icon: Dumbbell, text: '120+ exercises in your library', color: 'text-secondary-600 dark:text-secondary-400', bg: 'bg-secondary-100 dark:bg-secondary-950' },
]
const panelVariants = {
  hidden: { opacity: 0, x: -24 },
  visible: {
    opacity: 1,
    x: 0,
    transition: { duration: 0.45, ease: [0.25, 0.1, 0.25, 1], staggerChildren: 0.08, delayChildren: 0.12 },
  },
}
const childVariants = {
  hidden: { opacity: 0, y: 12 },
  visible: { opacity: 1, y: 0, transition: viewTransitionFast },
}
export default function LoginIllustration() {
  return (
    <motion.aside
      className="hidden lg:flex flex-col justify-start pr-4 xl:pr-8 pt-0"
      variants={panelVariants}
      initial="hidden"
      animate="visible"
      aria-hidden="true"
    >
      <motion.div variants={childVariants} className="mb-6">
        <span className="inline-flex items-center gap-2 px-3 py-1 rounded-full text-xs font-semibold text-primary-700 dark:text-primary-300 bg-primary-50/80 dark:bg-primary-950/50 border border-primary-100 dark:border-primary-900 backdrop-blur-sm">
          <Lock className="w-3.5 h-3.5" />
          Secure access
        </span>
        <h2 className="mt-4 text-3xl xl:text-4xl font-bold text-neutral-900 dark:text-white leading-tight tracking-tight">
          Your fitness hub,{' '}
          <span className="bg-gradient-to-r from-primary-600 via-secondary-600 to-accent-600 bg-clip-text text-transparent">
            one sign-in away
          </span>
        </h2>
        <p className="mt-3 text-base text-neutral-600 dark:text-neutral-400 max-w-md leading-relaxed">
          Pick up where you left off — workouts, nutrition, and analytics synced across every device.
        </p>
      </motion.div>
      <motion.div variants={childVariants} className="relative w-full max-w-md mx-auto xl:max-w-lg mb-8">
        <motion.div
          animate={{ y: [0, -10, 0] }}
          transition={{ duration: 5, repeat: Infinity, ease: 'easeInOut' }}
        >
          <HeroFitnessIllustration />
        </motion.div>
      </motion.div>
      <motion.ul variants={childVariants} className="space-y-3 max-w-md">
        {HIGHLIGHTS.map(({ icon: Icon, text, color, bg }) => (
          <motion.li
            key={text}
            whileHover={{ x: 4 }}
            className="flex items-center gap-3 p-3 rounded-xl border border-neutral-200/60 dark:border-neutral-800 bg-white/50 dark:bg-neutral-900/50 backdrop-blur-sm"
          >
            <div className={`w-10 h-10 rounded-lg ${bg} flex items-center justify-center shrink-0`}>
              <Icon className={`w-5 h-5 ${color}`} />
            </div>
            <span className="text-sm font-medium text-neutral-700 dark:text-neutral-300">{text}</span>
          </motion.li>
        ))}
      </motion.ul>
      <motion.div
        variants={childVariants}
        className="mt-8 flex items-center gap-6 text-sm text-neutral-600 dark:text-neutral-400"
      >
        <div>
          <p className="text-2xl font-bold text-neutral-900 dark:text-white">50K+</p>
          <p className="text-xs uppercase tracking-wider">Active members</p>
        </div>
        <div className="w-px h-10 bg-neutral-200 dark:bg-neutral-700" />
        <div>
          <p className="text-2xl font-bold text-neutral-900 dark:text-white">4.9</p>
          <p className="text-xs uppercase tracking-wider">App rating</p>
        </div>
      </motion.div>
    </motion.aside>
  )
}
