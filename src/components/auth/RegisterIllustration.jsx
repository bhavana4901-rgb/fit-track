import { motion } from 'framer-motion'
import { UserPlus, Target, Activity, Sparkles, ClipboardList } from 'lucide-react'
import HeroFitnessIllustration from '../landing/HeroFitnessIllustration'
import { viewTransitionFast } from '../landing/landingMotion'
const STEP_HINTS = {
  1: { title: 'Create your account', desc: 'Secure sign-up with email or Google — takes under a minute.' },
  2: { title: 'Your body metrics', desc: 'Height, weight, and age help us personalize your plan.' },
  3: { title: 'Set your goals', desc: 'Pick what matters most so workouts match your ambitions.' },
  4: { title: 'Activity level', desc: 'We calibrate intensity based on how active you are today.' },
  5: { title: 'Finish your profile', desc: 'Avatar and preferences — then you are ready to train.' },
}
const STEPS = [
  { icon: UserPlus, label: 'Account' },
  { icon: ClipboardList, label: 'Details' },
  { icon: Target, label: 'Goals' },
  { icon: Activity, label: 'Activity' },
  { icon: Sparkles, label: 'Profile' },
]
const panelVariants = {
  hidden: { opacity: 0, x: -20 },
  visible: {
    opacity: 1,
    x: 0,
    transition: { duration: 0.4, staggerChildren: 0.06, delayChildren: 0.1 },
  },
}
const childVariants = {
  hidden: { opacity: 0, y: 10 },
  visible: { opacity: 1, y: 0, transition: viewTransitionFast },
}
export default function RegisterIllustration({ currentStep = 1 }) {
  const hint = STEP_HINTS[currentStep] || STEP_HINTS[1]
  return (
    <motion.aside
      className="hidden lg:flex flex-col justify-start pr-4 xl:pr-8 sticky top-28"
      variants={panelVariants}
      initial="hidden"
      animate="visible"
      aria-hidden="true"
    >
      <motion.div variants={childVariants} className="mb-5">
        <h2 className="text-2xl xl:text-3xl font-bold text-neutral-900 dark:text-white leading-tight">
          {hint.title}
        </h2>
        <p className="mt-2 text-sm text-neutral-600 dark:text-neutral-400 max-w-sm leading-relaxed">
          {hint.desc}
        </p>
      </motion.div>
      <motion.div variants={childVariants} className="relative w-full max-w-sm mx-auto xl:max-w-md mb-6">
        <motion.div
          animate={{ y: [0, -8, 0] }}
          transition={{ duration: 5, repeat: Infinity, ease: 'easeInOut' }}
        >
          <HeroFitnessIllustration />
        </motion.div>
      </motion.div>
      <motion.ul variants={childVariants} className="grid grid-cols-2 gap-2 max-w-md">
        {STEPS.map(({ icon: Icon, label }, i) => {
          const done = i + 1 < currentStep
          const active = i + 1 === currentStep
          return (
            <li
              key={label}
              className={`flex items-center gap-2 px-3 py-3 rounded-lg border text-sm font-medium transition-colors ${
                active
                  ? 'border-primary-300 dark:border-primary-700 bg-primary-50/80 dark:bg-primary-950/40 text-primary-700 dark:text-primary-300'
                  : done
                    ? 'border-success-200 dark:border-success-900 bg-success-50/50 dark:bg-success-950/30 text-success-700 dark:text-success-400'
                    : 'border-neutral-200/60 dark:border-neutral-800 bg-white/40 dark:bg-neutral-900/40 text-neutral-500'
              }`}
            >
              <Icon className="w-4 h-4 shrink-0" />
              {label}
            </li>
          )
        })}
      </motion.ul>
    </motion.aside>
  )
}
