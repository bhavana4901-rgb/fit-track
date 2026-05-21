import { motion } from 'framer-motion'
import { Users, Star, PlayCircle } from 'lucide-react'
import Button from '../ui/Button'
import HeroFitnessIllustration from './HeroFitnessIllustration'
import HeroAnimatedBackground from './HeroAnimatedBackground'

export default function Hero() {
  return (
    <section className="relative isolate w-full overflow-hidden bg-white dark:bg-neutral-950 pt-24 sm:pt-28 md:pt-32 pb-12 sm:pb-16 md:pb-24 min-h-[calc(100dvh-4rem)] sm:min-h-[calc(100dvh-5rem)]">
      <HeroAnimatedBackground />

      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex flex-col justify-center min-h-[inherit] py-6 sm:py-8">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 sm:gap-10 lg:gap-16 items-center">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.35, delay: 0.05 }}
            className="space-y-5 sm:space-y-6 md:space-y-8 text-center lg:text-left order-2 lg:order-1"
          >
            <h1 className="text-3xl min-[480px]:text-4xl sm:text-5xl lg:text-6xl font-bold leading-[1.15] sm:leading-tight">
              <span className="bg-clip-text text-transparent bg-gradient-to-r from-primary-600 via-secondary-600 to-accent-600">
                Transform Your
              </span>
              <br />
              <span className="text-neutral-900 dark:text-white">Fitness Journey</span>
            </h1>

            <motion.p
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.35, delay: 0.08 }}
              className="text-base sm:text-lg md:text-xl text-neutral-600 dark:text-neutral-300 max-w-lg mx-auto lg:mx-0 leading-relaxed px-1 sm:px-0"
            >
              Get personalized workouts, track your progress, and connect with a community of fitness enthusiasts. Start achieving your goals today.
            </motion.p>

            <motion.div
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.35, delay: 0.1 }}
              className="flex flex-col min-[480px]:flex-row gap-3 sm:gap-4 pt-2 sm:pt-4 justify-center lg:justify-start w-full max-w-md mx-auto lg:mx-0 lg:max-w-none"
            >
              <Button size="lg" className="w-full min-[480px]:flex-1 sm:w-auto sm:flex-initial">
                Get Started Free
              </Button>
              <Button
                variant="outline"
                size="lg"
                className="w-full min-[480px]:flex-1 sm:w-auto sm:flex-initial flex items-center justify-center gap-2"
              >
                <PlayCircle className="w-5 h-5 shrink-0" />
                Watch Demo
              </Button>
            </motion.div>

            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.35, delay: 0.12 }}
              className="flex flex-col min-[480px]:flex-row gap-4 sm:gap-6 pt-6 sm:pt-8 border-t border-neutral-200 dark:border-neutral-800 justify-center lg:justify-start"
            >
              <div className="flex items-center gap-3 justify-center lg:justify-start">
                <div className="w-10 h-10 shrink-0 rounded-full bg-primary-100 dark:bg-primary-900/30 flex items-center justify-center">
                  <Users className="w-5 h-5 text-primary-600 dark:text-primary-400" />
                </div>
                <div className="text-left">
                  <p className="font-semibold text-neutral-900 dark:text-white">50K+</p>
                  <p className="text-sm text-neutral-600 dark:text-neutral-400">Active Users</p>
                </div>
              </div>

              <div className="flex items-center gap-3 justify-center lg:justify-start">
                <div className="w-10 h-10 shrink-0 rounded-full bg-accent-100 dark:bg-accent-900/30 flex items-center justify-center">
                  <Star className="w-5 h-5 text-accent-600 dark:text-accent-400 fill-current" />
                </div>
                <div className="text-left">
                  <p className="font-semibold text-neutral-900 dark:text-white">4.9/5.0</p>
                  <p className="text-sm text-neutral-600 dark:text-neutral-400">App Rating</p>
                </div>
              </div>
            </motion.div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.4, delay: 0.1 }}
            className="relative flex justify-center lg:justify-end order-1 lg:order-2 w-full"
          >
            <motion.div
              animate={{ y: [0, -10, 0] }}
              transition={{ duration: 5, repeat: Infinity, ease: 'easeInOut' }}
              className="w-full max-w-[min(100%,320px)] sm:max-w-md lg:max-w-lg mx-auto"
            >
              <HeroFitnessIllustration />
            </motion.div>
          </motion.div>
        </div>
      </div>
    </section>
  )
}
