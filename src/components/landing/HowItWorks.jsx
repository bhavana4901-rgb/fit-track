import { motion } from 'framer-motion'
import { UserPlus, Target, TrendingUp, ArrowRight } from 'lucide-react'

/**
 * Premium How It Works section with 3-step visual flow
 * - 3-step process with icons and descriptions
 * - Connecting lines/arrows between steps
 * - Scroll-triggered entrance animations
 * - Responsive layout (vertical mobile, horizontal desktop)
 * - Animated step numbers and progress indicators
 */
export default function HowItWorks() {
  const steps = [
    {
      id: 1,
      number: '01',
      title: 'Sign Up',
      description: 'Create your account in seconds. Provide basic info and you\'re ready to go!',
      icon: UserPlus,
      color: 'from-primary-600 to-primary-400',
      iconBg: 'bg-primary-100 dark:bg-primary-900/30',
      iconColor: 'text-primary-600 dark:text-primary-400',
    },
    {
      id: 2,
      number: '02',
      title: 'Set Goals',
      description: 'Choose your fitness goals, activity level, and personal preferences. Customize your experience.',
      icon: Target,
      color: 'from-secondary-600 to-secondary-400',
      iconBg: 'bg-secondary-100 dark:bg-secondary-900/30',
      iconColor: 'text-secondary-600 dark:text-secondary-400',
    },
    {
      id: 3,
      number: '03',
      title: 'Track Progress',
      description: 'Log workouts, track metrics, and watch your transformation unfold with beautiful analytics.',
      icon: TrendingUp,
      color: 'from-success-600 to-success-400',
      iconBg: 'bg-success-100 dark:bg-success-900/30',
      iconColor: 'text-success-600 dark:text-success-400',
    },
  ]

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.2,
        delayChildren: 0.2,
      },
    },
  }

  const stepVariants = {
    hidden: { opacity: 0, y: 30 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.6, ease: 'easeOut' },
    },
  }

  const lineVariants = {
    hidden: { scaleX: 0 },
    visible: {
      scaleX: 1,
      transition: { duration: 0.8, ease: 'easeInOut' },
    },
  }

  return (
    <section className="w-full py-16 md:py-24 bg-gradient-to-b from-white dark:from-neutral-950 to-neutral-50 dark:to-neutral-900">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-100px' }}
          transition={{ duration: 0.6 }}
          className="text-center mb-12 md:mb-16"
        >
          <h2 className="text-3xl md:text-4xl font-bold text-neutral-900 dark:text-white mb-4">
            How It <span className="bg-gradient-to-r from-primary-600 to-secondary-600 bg-clip-text text-transparent">Works</span>
          </h2>
          <p className="text-neutral-600 dark:text-neutral-400 max-w-2xl mx-auto text-lg">
            Get started in three simple steps. Join thousands who are already transforming their fitness
          </p>
        </motion.div>

        {/* Desktop Layout - Horizontal */}
        <motion.div
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: '-100px' }}
          className="hidden md:grid md:grid-cols-3 gap-8 relative"
        >
          {/* Connecting Lines - Desktop */}
          <svg className="absolute top-24 left-0 w-full h-8 pointer-events-none" preserveAspectRatio="none">
            {/* Line between step 1 and 2 */}
            <motion.line
              x1="20%"
              y1="32"
              x2="50%"
              y2="32"
              stroke="url(#gradient1)"
              strokeWidth="3"
              strokeLinecap="round"
              initial={{ pathLength: 0 }}
              whileInView={{ pathLength: 1 }}
              viewport={{ once: true, margin: '-100px' }}
              transition={{ duration: 0.8, delay: 0.5 }}
            />
            {/* Arrow at middle point */}
            <defs>
              <linearGradient id="gradient1" x1="0%" y1="0%" x2="100%" y2="0%">
                <stop offset="0%" stopColor="rgb(59, 130, 246)" />
                <stop offset="100%" stopColor="rgb(147, 197, 253)" />
              </linearGradient>
              <linearGradient id="gradient2" x1="0%" y1="0%" x2="100%" y2="0%">
                <stop offset="0%" stopColor="rgb(147, 197, 253)" />
                <stop offset="100%" stopColor="rgb(34, 197, 94)" />
              </linearGradient>
            </defs>
            {/* Line between step 2 and 3 */}
            <motion.line
              x1="50%"
              y1="32"
              x2="80%"
              y2="32"
              stroke="url(#gradient2)"
              strokeWidth="3"
              strokeLinecap="round"
              initial={{ pathLength: 0 }}
              whileInView={{ pathLength: 1 }}
              viewport={{ once: true, margin: '-100px' }}
              transition={{ duration: 0.8, delay: 0.7 }}
            />
          </svg>

          {/* Steps */}
          {steps.map((step, index) => {
            const Icon = step.icon
            return (
              <motion.div
                key={step.id}
                variants={stepVariants}
                className="relative"
              >
                <div className="text-center">
                  {/* Step Number */}
                  <motion.div
                    initial={{ scale: 0, rotate: -180 }}
                    whileInView={{ scale: 1, rotate: 0 }}
                    viewport={{ once: true, margin: '-100px' }}
                    transition={{ duration: 0.6, delay: 0.1 * index }}
                    className="absolute"
                  >
                    <div className={`w-24 h-24 rounded-full bg-gradient-to-br ${step.color} shadow-xl flex items-center justify-center`}>
                      <Icon className="w-12 h-12 text-white" />
                    </div>
                  </motion.div>

                  {/* Number Badge */}
                  <motion.div
                    initial={{ opacity: 0 }}
                    whileInView={{ opacity: 1 }}
                    viewport={{ once: true, margin: '-100px' }}
                    transition={{ duration: 0.6, delay: 0.3 * index }}
                    className="text-5xl font-bold text-neutral-200 dark:text-neutral-800 mb-4"
                  >
                    {step.number}
                  </motion.div>

                  {/* Title */}
                  <h3 className="text-2xl font-bold text-neutral-900 dark:text-white mb-3">
                    {step.title}
                  </h3>

                  {/* Description */}
                  <p className="text-neutral-600 dark:text-neutral-400 leading-relaxed">
                    {step.description}
                  </p>
                </div>
              </motion.div>
            )
          })}
        </motion.div>

        {/* Mobile Layout - Vertical */}
        <motion.div
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: '-100px' }}
          className="md:hidden space-y-12 relative"
        >
          {/* Vertical connecting line for mobile */}
          <div className="absolute left-12 top-20 bottom-0 w-1 bg-gradient-to-b from-primary-600 via-secondary-600 to-success-600"></div>

          {steps.map((step, index) => {
            const Icon = step.icon
            return (
              <motion.div
                key={step.id}
                variants={stepVariants}
                className="relative pl-32 flex items-start"
              >
                {/* Step Icon */}
                <motion.div
                  initial={{ scale: 0, rotate: -180 }}
                  whileInView={{ scale: 1, rotate: 0 }}
                  viewport={{ once: true, margin: '-100px' }}
                  transition={{ duration: 0.6, delay: 0.1 * index }}
                  className="absolute left-0 w-24 h-24 rounded-full bg-gradient-to-br from-white to-neutral-50 dark:from-neutral-900 dark:to-neutral-800 shadow-lg flex items-center justify-center"
                >
                  <div className={`w-16 h-16 rounded-full ${step.iconBg} flex items-center justify-center`}>
                    <Icon className={`w-8 h-8 ${step.iconColor}`} />
                  </div>
                </motion.div>

                {/* Content */}
                <div className="pt-2">
                  <motion.div
                    initial={{ opacity: 0, scale: 0.8 }}
                    whileInView={{ opacity: 1, scale: 1 }}
                    viewport={{ once: true, margin: '-100px' }}
                    transition={{ duration: 0.5, delay: 0.2 * index }}
                    className="text-4xl font-bold text-neutral-200 dark:text-neutral-800 mb-2"
                  >
                    {step.number}
                  </motion.div>

                  <h3 className="text-xl font-bold text-neutral-900 dark:text-white mb-2">
                    {step.title}
                  </h3>

                  <p className="text-neutral-600 dark:text-neutral-400 leading-relaxed">
                    {step.description}
                  </p>
                </div>
              </motion.div>
            )
          })}
        </motion.div>

        {/* Bottom CTA */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-50px' }}
          transition={{ duration: 0.6, delay: 0.6 }}
          className="mt-12 md:mt-16 text-center"
        >
          <p className="text-neutral-600 dark:text-neutral-400 mb-6 text-lg">
            It's that simple. Start your transformation today.
          </p>
          <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            className="px-8 py-3 bg-gradient-to-r from-primary-600 to-primary-700 text-white font-semibold rounded-lg shadow-lg hover:shadow-xl transition-all duration-300 inline-flex items-center gap-2"
          >
            Begin Your Journey
            <ArrowRight className="w-5 h-5" />
          </motion.button>
        </motion.div>
      </div>
    </section>
  )
}
