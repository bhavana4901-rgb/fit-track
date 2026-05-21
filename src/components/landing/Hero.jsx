import { motion } from 'framer-motion'
import { ChevronDown, Users, Star, PlayCircle } from 'lucide-react'
import Button from '../ui/Button'
import HeroFitnessIllustration from './HeroFitnessIllustration'
import HeroAnimatedBackground from './HeroAnimatedBackground'

/**
 * Premium Hero section with animated fitness illustration
 * - Gradient background with subtle motion
 * - Animated fitness illustration (SVG + Framer Motion)
 * - 2 CTA buttons, trust indicators, scroll indicator
 */
export default function Hero() {
  return (
    <section className="relative isolate min-h-screen w-full overflow-hidden bg-white dark:bg-neutral-950 pt-32 md:pt-30 pb-20 md:pb-32">
      <HeroAnimatedBackground />

      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 min-h-[calc(100vh-8rem)] flex flex-col justify-center">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-16 items-center">
          {/* Left Content */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.1 }}
            className="space-y-6 md:space-y-8 text-center lg:text-left"
          >
            <div>
              <h1 className="text-4xl sm:text-5xl lg:text-6xl font-bold leading-tight">
                <span className="bg-clip-text text-transparent bg-gradient-to-r from-primary-600 via-secondary-600 to-accent-600">
                  Transform Your
                </span>
                <br />
                <span className="text-neutral-900 dark:text-white">
                  Fitness Journey
                </span>
              </h1>
            </div>

            <motion.p
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.6, delay: 0.2 }}
              className="text-lg sm:text-xl text-neutral-600 dark:text-neutral-300 max-w-lg mx-auto lg:mx-0 leading-relaxed"
            >
              Get personalized workouts, track your progress, and connect with a community of fitness enthusiasts. Start achieving your goals today.
            </motion.p>

            <motion.div
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.3 }}
              className="flex flex-col sm:flex-row gap-4 pt-4 justify-center lg:justify-start"
            >
              <Button size="lg" className="w-full sm:w-auto">
                Get Started Free
              </Button>
              <Button variant="outline" size="lg" className="w-full sm:w-auto flex items-center justify-center gap-2">
                <PlayCircle className="w-5 h-5" />
                Watch Demo
              </Button>
            </motion.div>

            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.6, delay: 0.4 }}
              className="flex flex-col sm:flex-row gap-6 pt-4 border-t border-neutral-200 dark:border-neutral-800 mt-8 pt-8 justify-center lg:justify-start"
            >
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-full bg-primary-100 dark:bg-primary-900/30 flex items-center justify-center">
                  <Users className="w-5 h-5 text-primary-600 dark:text-primary-400" />
                </div>
                <div>
                  <p className="font-semibold text-neutral-900 dark:text-white">50K+</p>
                  <p className="text-sm text-neutral-600 dark:text-neutral-400">Active Users</p>
                </div>
              </div>

              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-full bg-accent-100 dark:bg-accent-900/30 flex items-center justify-center">
                  <Star className="w-5 h-5 text-accent-600 dark:text-accent-400 fill-current" />
                </div>
                <div>
                  <p className="font-semibold text-neutral-900 dark:text-white">4.9/5.0</p>
                  <p className="text-sm text-neutral-600 dark:text-neutral-400">App Rating</p>
                </div>
              </div>
            </motion.div>
          </motion.div>

          {/* Right — Animated fitness illustration */}
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.7, delay: 0.25 }}
            className="relative flex justify-center lg:justify-end"
          >
            <motion.div
              animate={{ y: [0, -14, 0] }}
              transition={{ duration: 5, repeat: Infinity, ease: 'easeInOut' }}
              className="w-full max-w-md lg:max-w-lg"
            >
              <HeroFitnessIllustration />
            </motion.div>
          </motion.div>
        </div>
      </div>

      {/* Scroll Down Indicator */}
      <motion.div
        initial={{ opacity: 0, y: -10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.6 }}
        className="absolute bottom-8 left-1/2 -translate-x-1/2"
      >
        <motion.div
          animate={{ y: [0, 8, 0] }}
          transition={{ duration: 2, repeat: Infinity }}
          className="flex flex-col items-center gap-2"
        >
          <p className="text-xs sm:text-sm text-neutral-600 dark:text-neutral-400 font-medium">Scroll to explore</p>
          <ChevronDown className="w-5 h-5 text-neutral-600 dark:text-neutral-400" />
        </motion.div>
      </motion.div>
    </section>
  )
}
