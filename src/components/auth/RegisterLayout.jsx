import { Link } from 'react-router-dom'
import { motion, AnimatePresence } from 'framer-motion'
import { ArrowLeft } from 'lucide-react'
import LoginAnimatedBackground from './LoginAnimatedBackground'
import AuthPageHeader from './AuthPageHeader'
import RegisterIllustration from './RegisterIllustration'
import RegisterStepper from './RegisterStepper'
import { viewTransitionFast } from '../landing/landingMotion'

const REGISTER_STEPS = [
  { label: 'Account', description: 'Create your account' },
  { label: 'Details', description: 'Personal information' },
  { label: 'Goals', description: 'Fitness goals' },
  { label: 'Activity', description: 'Activity level' },
  { label: 'Profile', description: 'Complete profile' },
]

export default function RegisterLayout({ step, children }) {
  return (
    <div className="min-h-screen min-h-[100dvh] relative overflow-x-hidden bg-white dark:bg-neutral-950">
      <LoginAnimatedBackground />
      <AuthPageHeader />

      <div className="relative z-10 px-4 sm:px-6 lg:px-8 pt-2 sm:pt-4 pb-10 sm:pb-12">
        <div className="w-full max-w-6xl mx-auto grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-12 xl:gap-14 items-start">
          <RegisterIllustration currentStep={step} />

          <div className="w-full max-w-xl mx-auto lg:max-w-none lg:mx-0 lg:justify-self-end">
            <div className="rounded-2xl border border-neutral-200/80 dark:border-neutral-800 bg-white/90 dark:bg-neutral-900/95 backdrop-blur-xl shadow-sm overflow-hidden">
              <div className="h-1 bg-gradient-to-r from-primary-500 via-secondary-500 to-accent-500" />

              <div className="px-5 sm:px-7 pt-5 sm:pt-6 pb-4 border-b border-neutral-200/80 dark:border-neutral-800/80">
                <RegisterStepper currentStep={step} steps={REGISTER_STEPS} />
              </div>

              <div className="p-5 sm:p-7 md:p-8">
                <AnimatePresence mode="wait">
                  <motion.div
                    key={step}
                    initial={{ opacity: 0, y: 12 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -8 }}
                    transition={viewTransitionFast}
                  >
                    {children}
                  </motion.div>
                </AnimatePresence>
              </div>
            </div>

            <p className="text-center text-sm text-neutral-600 dark:text-neutral-400 mt-5">
              Already have an account?{' '}
              <Link
                to="/login"
                className="font-semibold text-primary-600 dark:text-primary-400 hover:text-primary-700 dark:hover:text-primary-300 transition-colors"
              >
                Sign in
              </Link>
            </p>

            <p className="sm:hidden text-center mt-3">
              <Link
                to="/"
                className="inline-flex items-center gap-1.5 text-sm font-medium text-neutral-500 hover:text-primary-600 dark:hover:text-primary-400 transition-colors"
              >
                <ArrowLeft className="w-4 h-4" />
                Back to home
              </Link>
            </p>
          </div>
        </div>
      </div>
    </div>
  )
}
