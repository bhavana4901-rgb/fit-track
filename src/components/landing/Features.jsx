import { motion } from 'framer-motion'
import { BarChart3, Leaf, TrendingUp, Users } from 'lucide-react'

/**
 * Premium Features section with 4 feature cards
 * - 4 premium cards with icons and descriptions
 * - Hover glow and lift effects
 * - Staggered entrance animations on scroll
 * - Responsive grid layout (1-2-4 columns)
 * - Full dark mode support
 */
export default function Features() {
  const features = [
    {
      id: 1,
      icon: BarChart3,
      title: 'Workout Tracking',
      description: 'Log and monitor all your exercises with detailed stats. Track sets, reps, weights, and progress over time.',
      color: 'from-primary-600 to-primary-400',
      iconBg: 'bg-primary-100 dark:bg-primary-900/30',
      iconColor: 'text-primary-600 dark:text-primary-400',
    },
    {
      id: 2,
      icon: Leaf,
      title: 'Nutrition Plans',
      description: 'Get personalized meal plans based on your goals. Track macros, calories, and stay on top of your diet.',
      color: 'from-success-600 to-success-400',
      iconBg: 'bg-success-100 dark:bg-success-900/30',
      iconColor: 'text-success-600 dark:text-success-400',
    },
    {
      id: 3,
      icon: TrendingUp,
      title: 'Progress Analytics',
      description: 'Visual charts and insights into your fitness journey. See trends, celebrate wins, and stay motivated.',
      color: 'from-accent-600 to-accent-400',
      iconBg: 'bg-accent-100 dark:bg-accent-900/30',
      iconColor: 'text-accent-600 dark:text-accent-400',
    },
    {
      id: 4,
      icon: Users,
      title: 'Community Support',
      description: 'Connect with other fitness enthusiasts. Share progress, get motivation, and build lasting friendships.',
      color: 'from-secondary-600 to-secondary-400',
      iconBg: 'bg-secondary-100 dark:bg-secondary-900/30',
      iconColor: 'text-secondary-600 dark:text-secondary-400',
    },
  ]

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.15,
        delayChildren: 0.2,
      },
    },
  }

  const cardVariants = {
    hidden: { opacity: 0, y: 30 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.6, ease: 'easeOut' },
    },
  }

  return (
    <section id="features" className="w-full py-16 md:py-24 bg-white dark:bg-neutral-950">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-100px' }}
          transition={{ duration: 0.6 }}
          className="text-center mb-12 md:mb-16"
        >
          <h2 className="text-3xl md:text-4xl font-bold text-neutral-900 dark:text-white mb-4">
            Powerful Features for <span className="bg-gradient-to-r from-primary-600 to-secondary-600 bg-clip-text text-transparent">Your Success</span>
          </h2>
          <p className="text-neutral-600 dark:text-neutral-400 max-w-2xl mx-auto text-lg">
            Everything you need to transform your fitness journey, all in one intuitive platform
          </p>
        </motion.div>

        <motion.div
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: '-100px' }}
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 md:gap-8"
        >
          {features.map((feature) => {
            const Icon = feature.icon
            return (
              <motion.div
                key={feature.id}
                variants={cardVariants}
                whileHover={{ y: -8 }}
                className="group relative"
              >
                {/* Glow effect on hover */}
                <div className={`absolute inset-0 bg-gradient-to-br ${feature.color} rounded-2xl opacity-0 group-hover:opacity-10 blur-xl transition-opacity duration-300`}></div>

                {/* Card */}
                <div className="relative h-full p-6 md:p-8 rounded-2xl border border-neutral-200 dark:border-neutral-800 bg-white dark:bg-neutral-900 shadow-lg hover:shadow-xl transition-all duration-300">
                  {/* Icon Container */}
                  <div className={`flex items-center justify-center w-14 h-14 rounded-xl ${feature.iconBg} mb-5 group-hover:scale-110 transition-transform duration-300`}>
                    <Icon className={`w-7 h-7 ${feature.iconColor}`} />
                  </div>

                  {/* Content */}
                  <h3 className="text-xl font-bold text-neutral-900 dark:text-white mb-3 group-hover:text-transparent group-hover:bg-gradient-to-r group-hover:from-primary-600 group-hover:to-secondary-600 group-hover:bg-clip-text transition-all duration-300">
                    {feature.title}
                  </h3>

                  <p className="text-neutral-600 dark:text-neutral-400 leading-relaxed mb-4">
                    {feature.description}
                  </p>

                  {/* Animated accent line */}
                  <div className="absolute bottom-0 left-0 h-1 bg-gradient-to-r from-transparent to-transparent group-hover:from-primary-500 group-hover:to-transparent rounded-full w-0 group-hover:w-full transition-all duration-500"></div>
                </div>
              </motion.div>
            )
          })}
        </motion.div>

        {/* Bottom CTA Section */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-50px' }}
          transition={{ duration: 0.6, delay: 0.5 }}
          className="mt-12 md:mt-16 text-center"
        >
          <p className="text-neutral-600 dark:text-neutral-400 mb-4">
            Ready to start your transformation?
          </p>
          <div className="flex flex-wrap justify-center gap-4">
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className="px-8 py-3 bg-gradient-to-r from-primary-600 to-primary-700 text-white font-semibold rounded-lg shadow-lg hover:shadow-xl transition-all duration-300"
            >
              Get Started Free
            </motion.button>
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className="px-8 py-3 border-2 border-primary-600 dark:border-primary-400 text-primary-600 dark:text-primary-400 font-semibold rounded-lg hover:bg-primary-50 dark:hover:bg-primary-950 transition-all duration-300"
            >
              Learn More
            </motion.button>
          </div>
        </motion.div>
      </div>
    </section>
  )
}
