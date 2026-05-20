import { useState, useEffect } from 'react'
import { motion } from 'framer-motion'
import { ChevronDown, Users, Star, PlayCircle } from 'lucide-react'
import Button from '../ui/Button'

/**
 * Premium Hero section with animations and parallax
 * - Gradient headline text
 * - 2 CTA buttons
 * - Animated background blobs
 * - Trust indicators
 * - Scroll-down indicator
 * - Responsive layout
 */
export default function Hero() {
  const [offsetY, setOffsetY] = useState(0)

  useEffect(() => {
    const handleScroll = () => {
      setOffsetY(window.scrollY)
    }

    window.addEventListener('scroll', handleScroll)
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  return (
    <section className="relative min-h-screen w-full overflow-hidden bg-gradient-to-b from-white dark:from-neutral-950 to-neutral-50 dark:to-neutral-900 pt-32 md:pt-40 pb-20 md:pb-32">
      {/* Animated Background Blobs */}
      <div className="absolute inset-0 -z-10 overflow-hidden">
        {/* Blob 1 - Top Left */}
        <motion.div
          initial={{ opacity: 0.5 }}
          animate={{ 
            y: [0, 40, 0],
            opacity: [0.3, 0.6, 0.3]
          }}
          transition={{ 
            duration: 8,
            repeat: Infinity,
            ease: 'easeInOut'
          }}
          className="absolute -top-40 -left-40 w-80 h-80 bg-gradient-to-r from-primary-500/30 to-primary-600/20 rounded-full blur-3xl"
        />

        {/* Blob 2 - Top Right */}
        <motion.div
          initial={{ opacity: 0.5 }}
          animate={{ 
            y: [40, 0, 40],
            opacity: [0.6, 0.3, 0.6]
          }}
          transition={{ 
            duration: 10,
            repeat: Infinity,
            ease: 'easeInOut'
          }}
          className="absolute -top-60 -right-40 w-96 h-96 bg-gradient-to-l from-secondary-500/30 to-secondary-600/20 rounded-full blur-3xl"
        />

        {/* Blob 3 - Bottom Center */}
        <motion.div
          initial={{ opacity: 0.4 }}
          animate={{ 
            y: [-40, 40, -40],
            opacity: [0.4, 0.5, 0.4]
          }}
          transition={{ 
            duration: 12,
            repeat: Infinity,
            ease: 'easeInOut'
          }}
          className="absolute -bottom-40 left-1/2 -translate-x-1/2 w-96 h-96 bg-gradient-to-t from-accent-500/20 to-accent-600/10 rounded-full blur-3xl"
        />
      </div>

      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-16 items-center">
          {/* Left Content */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.1 }}
            className="space-y-6 md:space-y-8"
          >
            {/* Gradient Headline */}
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

            {/* Subheading */}
            <motion.p
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.6, delay: 0.2 }}
              className="text-lg sm:text-xl text-neutral-600 dark:text-neutral-300 max-w-lg leading-relaxed"
            >
              Get personalized workouts, track your progress, and connect with a community of fitness enthusiasts. Start achieving your goals today.
            </motion.p>

            {/* CTA Buttons */}
            <motion.div
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.3 }}
              className="flex flex-col sm:flex-row gap-4 pt-4"
            >
              <Button size="lg" className="w-full sm:w-auto">
                Get Started Free
              </Button>
              <Button variant="outline" size="lg" className="w-full sm:w-auto flex items-center justify-center gap-2">
                <PlayCircle className="w-5 h-5" />
                Watch Demo
              </Button>
            </motion.div>

            {/* Trust Indicators */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.6, delay: 0.4 }}
              className="flex flex-col sm:flex-row gap-6 pt-4 border-t border-neutral-200 dark:border-neutral-800 mt-8 pt-8"
            >
              {/* Users Indicator */}
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-full bg-primary-100 dark:bg-primary-900/30 flex items-center justify-center">
                  <Users className="w-5 h-5 text-primary-600 dark:text-primary-400" />
                </div>
                <div>
                  <p className="font-semibold text-neutral-900 dark:text-white">50K+</p>
                  <p className="text-sm text-neutral-600 dark:text-neutral-400">Active Users</p>
                </div>
              </div>

              {/* Rating Indicator */}
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

          {/* Right Content - Dashboard Mockup */}
          <motion.div
            initial={{ opacity: 0, x: 40 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            style={{
              y: offsetY * 0.5 // Parallax effect
            }}
            className="hidden lg:block relative"
          >
            {/* Dashboard Mockup Card */}
            <div className="relative">
              {/* Glow Effect */}
              <div className="absolute -inset-0.5 bg-gradient-to-r from-primary-600 to-secondary-600 rounded-2xl blur opacity-25 group-hover:opacity-100 transition duration-1000 group-hover:duration-200 -z-10" />

              {/* Card */}
              <div className="relative bg-white dark:bg-neutral-900 rounded-2xl shadow-2xl overflow-hidden border border-neutral-200 dark:border-neutral-800">
                {/* Header */}
                <div className="bg-gradient-to-r from-primary-50 to-secondary-50 dark:from-neutral-800 dark:to-neutral-900 px-6 py-4 border-b border-neutral-200 dark:border-neutral-800">
                  <p className="text-sm font-semibold text-neutral-900 dark:text-white">Your Dashboard</p>
                </div>

                {/* Content */}
                <div className="p-6 space-y-6">
                  {/* Stats Row */}
                  <div className="grid grid-cols-3 gap-4">
                    {[
                      { label: 'Calories', value: '620', unit: 'kcal' },
                      { label: 'Duration', value: '45', unit: 'min' },
                      { label: 'Streak', value: '12', unit: 'days' },
                    ].map((stat, idx) => (
                      <motion.div
                        key={idx}
                        initial={{ opacity: 0, y: 10 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: 0.4 + idx * 0.1 }}
                        className="bg-neutral-50 dark:bg-neutral-800 rounded-lg p-3"
                      >
                        <p className="text-xs text-neutral-600 dark:text-neutral-400 font-medium">{stat.label}</p>
                        <p className="text-lg font-bold text-neutral-900 dark:text-white mt-1">{stat.value}</p>
                        <p className="text-xs text-neutral-500 dark:text-neutral-400">{stat.unit}</p>
                      </motion.div>
                    ))}
                  </div>

                  {/* Progress Bar */}
                  <div className="space-y-2">
                    <div className="flex justify-between items-center">
                      <p className="text-sm font-medium text-neutral-700 dark:text-neutral-300">Weekly Goal</p>
                      <p className="text-sm text-primary-600 dark:text-primary-400 font-semibold">75%</p>
                    </div>
                    <div className="w-full h-2 bg-neutral-200 dark:bg-neutral-700 rounded-full overflow-hidden">
                      <motion.div
                        initial={{ width: 0 }}
                        animate={{ width: '75%' }}
                        transition={{ duration: 1, delay: 0.5 }}
                        className="h-full bg-gradient-to-r from-primary-500 to-primary-600"
                      />
                    </div>
                  </div>

                  {/* Activity List */}
                  <div className="space-y-3">
                    {['Running', 'Strength', 'Yoga'].map((activity, idx) => (
                      <motion.div
                        key={idx}
                        initial={{ opacity: 0, x: -10 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ delay: 0.6 + idx * 0.1 }}
                        className="flex items-center justify-between p-3 bg-neutral-50 dark:bg-neutral-800 rounded-lg"
                      >
                        <p className="text-sm font-medium text-neutral-900 dark:text-white">{activity}</p>
                        <div className="w-2 h-2 rounded-full bg-primary-500" />
                      </motion.div>
                    ))}
                  </div>
                </div>
              </div>
            </div>
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
