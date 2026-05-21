import { motion } from 'framer-motion'
import { Star, Users } from 'lucide-react'
import { useState, useEffect } from 'react'
import { PARTNER_LOGOS, TRUST_BADGES } from './PartnerLogos'

/**
 * Premium Social Proof section with animated counters
 * - Animated user count counter
 * - Star rating display
 * - Partner/company logos with hover effects
 * - Smooth entrance animations
 * - Responsive grid layout
 */
export default function SocialProof() {
  const [userCount, setUserCount] = useState(0)
  const [rating, setRating] = useState(0)
  const finalUserCount = 50000
  const finalRating = 4.9

  // Animate counters on component mount
  useEffect(() => {
    // User count animation
    const userInterval = setInterval(() => {
      setUserCount(prev => {
        if (prev < finalUserCount) {
          return Math.min(prev + finalUserCount / 60, finalUserCount)
        }
        return prev
      })
    }, 30)

    // Rating animation
    const ratingInterval = setInterval(() => {
      setRating(prev => {
        if (prev < finalRating) {
          return Math.min(prev + finalRating / 60, finalRating)
        }
        return prev
      })
    }, 30)

    return () => {
      clearInterval(userInterval)
      clearInterval(ratingInterval)
    }
  }, [])

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
        delayChildren: 0.2,
      },
    },
  }

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.6, ease: 'easeOut' },
    },
  }

  const logoVariants = {
    hidden: { opacity: 0, scale: 0.8 },
    visible: {
      opacity: 1,
      scale: 1,
      transition: { duration: 0.5, ease: 'easeOut' },
    },
    hover: {
      scale: 1.1,
      y: -4,
      transition: { duration: 0.3 },
    },
  }

  return (
    <section className="w-full py-16 md:py-24 bg-gradient-to-b from-neutral-50/50 via-blue-50/30 to-white dark:from-neutral-900/50 dark:via-blue-950/20 dark:to-neutral-950 relative overflow-hidden">
      {/* Decorative background elements */}
      <div className="absolute inset-0 -z-10 overflow-hidden">
        <motion.div 
          animate={{ x: [0, 20, 0], y: [0, 10, 0] }}
          transition={{ duration: 8, repeat: Infinity }}
          className="absolute -top-40 -right-40 w-80 h-80 bg-gradient-to-br from-blue-200/20 to-primary-200/10 rounded-full blur-3xl dark:from-blue-900/10 dark:to-primary-900/5"
        />
        <motion.div 
          animate={{ x: [0, -20, 0], y: [0, -10, 0] }}
          transition={{ duration: 10, repeat: Infinity }}
          className="absolute -bottom-40 -left-40 w-80 h-80 bg-gradient-to-tr from-secondary-200/20 to-accent-200/10 rounded-full blur-3xl dark:from-secondary-900/10 dark:to-accent-900/5"
        />
      </div>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <motion.div
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: '-100px' }}
          className="space-y-12 md:space-y-16"
        >
          {/* Headline */}
          <motion.div variants={itemVariants} className="text-center space-y-2">
            <h2 className="text-3xl md:text-4xl font-bold text-neutral-900 dark:text-white">
              Trusted by <span className="bg-gradient-to-r from-primary-600 to-secondary-600 bg-clip-text text-transparent">thousands</span>
            </h2>
            <p className="text-neutral-600 dark:text-neutral-400 max-w-2xl mx-auto">
              Join our growing community of fitness enthusiasts achieving their goals every day
            </p>
          </motion.div>

          {/* Stats Grid */}
          <motion.div
            variants={itemVariants}
            className="grid grid-cols-1 md:grid-cols-2 gap-8 md:gap-12"
          >
            {/* User Count Card */}
            <motion.div
              whileHover={{ scale: 1.02 }}
              className="flex flex-col items-center justify-center p-8 rounded-2xl bg-white dark:bg-neutral-900 border border-neutral-200 dark:border-neutral-800 shadow-lg hover:shadow-xl transition-all duration-300"
            >
              <div className="flex items-center justify-center w-16 h-16 rounded-full bg-gradient-to-br from-primary-100 to-primary-50 dark:from-primary-900/30 dark:to-primary-800/20 mb-4">
                <Users className="w-8 h-8 text-primary-600 dark:text-primary-400" />
              </div>
              <div className="text-4xl md:text-5xl font-bold text-neutral-900 dark:text-white">
                {Math.round(userCount).toLocaleString()}
                <span className="text-2xl md:text-3xl">+</span>
              </div>
              <p className="text-neutral-600 dark:text-neutral-400 mt-2 font-medium">
                Active Users
              </p>
              <p className="text-sm text-neutral-500 dark:text-neutral-500 mt-1">
                Growing every day
              </p>
            </motion.div>

            {/* Rating Card */}
            <motion.div
              whileHover={{ scale: 1.02 }}
              className="flex flex-col items-center justify-center p-8 rounded-2xl bg-white dark:bg-neutral-900 border border-neutral-200 dark:border-neutral-800 shadow-lg hover:shadow-xl transition-all duration-300"
            >
              <div className="flex gap-1 mb-4">
                {[...Array(5)].map((_, i) => (
                  <motion.div
                    key={i}
                    initial={{ opacity: 0, rotate: -180 }}
                    animate={{ opacity: 1, rotate: 0 }}
                    transition={{ delay: 0.1 * i, duration: 0.5 }}
                  >
                    <Star
                      className="w-6 h-6 text-warning-400 fill-warning-400"
                      key={i}
                    />
                  </motion.div>
                ))}
              </div>
              <div className="text-4xl md:text-5xl font-bold text-neutral-900 dark:text-white">
                {rating.toFixed(1)}
              </div>
              <p className="text-neutral-600 dark:text-neutral-400 mt-2 font-medium">
                App Store Rating
              </p>
              <p className="text-sm text-neutral-500 dark:text-neutral-500 mt-1">
                Based on 10K+ reviews
              </p>
            </motion.div>
          </motion.div>

          {/* Partner Logos */}
          <motion.div variants={itemVariants} className="space-y-6">
            <div className="text-center">
              <p className="text-neutral-600 dark:text-neutral-400 font-medium">
                Trusted by leading companies
              </p>
            </div>

            <motion.div
              variants={containerVariants}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true, margin: '-100px' }}
              className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4 md:gap-6"
            >
              {PARTNER_LOGOS.map((partner) => {
                const Logo = partner.Logo
                return (
                  <motion.div
                    key={partner.name}
                    variants={logoVariants}
                    whileHover="hover"
                    className="h-20 md:h-24 flex items-center justify-center"
                  >
                    <div
                      className="w-full max-w-[140px] h-14 md:h-16 px-4 py-3 rounded-xl bg-white dark:bg-neutral-900 border border-neutral-200 dark:border-neutral-800 shadow-sm hover:shadow-md transition-all duration-300 flex items-center justify-center grayscale hover:grayscale-0 opacity-80 hover:opacity-100"
                      title={partner.name}
                      aria-label={`${partner.name} logo`}
                    >
                      <Logo className={`h-8 md:h-9 ${partner.color}`} />
                    </div>
                  </motion.div>
                )
              })}
            </motion.div>

            {/* App & review trust badges */}
            <motion.div
              variants={containerVariants}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true, margin: '-50px' }}
              className="grid grid-cols-1 sm:grid-cols-3 gap-4 max-w-3xl mx-auto pt-4"
            >
              {TRUST_BADGES.map((badge) => {
                const Logo = badge.Logo
                return (
                  <motion.div
                    key={badge.name}
                    variants={logoVariants}
                    whileHover="hover"
                    className="flex items-center justify-center"
                  >
                    <div
                      className="w-full h-14 px-4 rounded-xl bg-white dark:bg-neutral-900 border border-neutral-200 dark:border-neutral-800 shadow-sm hover:shadow-md transition-all duration-300 flex items-center justify-center text-neutral-700 dark:text-neutral-300 hover:text-neutral-900 dark:hover:text-white"
                      title={badge.name}
                      aria-label={`${badge.name} badge`}
                    >
                      <Logo className="h-10 w-full max-w-[160px]" />
                    </div>
                  </motion.div>
                )
              })}
            </motion.div>
          </motion.div>

          {/* Social Proof Text */}
          <motion.div
            variants={itemVariants}
            className="text-center space-y-4 mt-8 md:mt-12"
          >
            <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-primary-100 dark:bg-primary-900/30 border border-primary-200 dark:border-primary-800">
              <div className="w-2 h-2 rounded-full bg-primary-600 dark:bg-primary-400 animate-pulse"></div>
              <p className="text-sm font-medium text-primary-700 dark:text-primary-300">
                Join 50,000+ members transforming their lives
              </p>
            </div>
          </motion.div>
        </motion.div>
      </div>
    </section>
  )
}
