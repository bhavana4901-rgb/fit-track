import { motion } from 'framer-motion'
import { Check, ArrowRight } from 'lucide-react'

const pricingTiers = [
  {
    id: 'free',
    name: 'Free',
    price: 0,
    period: 'Forever',
    description: 'Perfect for getting started with fitness tracking',
    color: 'neutral',
    gradient: 'from-neutral-500 to-neutral-600',
    features: [
      'Basic workout logging',
      '30-day activity history',
      'Simple progress tracking',
      'Mobile app access',
      'Community access',
      'Weekly email summary'
    ],
    cta: 'Get Started Free',
    highlighted: false
  },
  {
    id: 'pro',
    name: 'Pro',
    price: 9.99,
    period: 'per month',
    description: 'Best for dedicated fitness enthusiasts',
    color: 'primary',
    gradient: 'from-primary-500 to-primary-600',
    badge: 'Most Popular',
    features: [
      'Everything in Free',
      'Unlimited workout history',
      'Advanced analytics & insights',
      'Personalized recommendations',
      'Nutrition planning',
      'Custom goals & tracking',
      'Priority support',
      '1-on-1 coaching (limited)'
    ],
    cta: 'Start Pro Trial',
    highlighted: true
  },
  {
    id: 'elite',
    name: 'Elite',
    price: 19.99,
    period: 'per month',
    description: 'Complete fitness transformation package',
    color: 'secondary',
    gradient: 'from-secondary-500 to-secondary-600',
    features: [
      'Everything in Pro',
      'Unlimited 1-on-1 coaching',
      'Weekly check-ins with trainer',
      'Meal plan creation',
      'Advanced biomechanics analysis',
      'Video form feedback',
      'Premium content library',
      'Early access to new features'
    ],
    cta: 'Start Elite Trial',
    highlighted: false
  }
]

const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.15,
      delayChildren: 0.2
    }
  }
}

const cardVariants = {
  hidden: { opacity: 0, y: 40 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.6, ease: 'easeOut' }
  }
}

const cardHoverVariants = {
  hover: { 
    y: -12, 
    transition: { duration: 0.3 }
  }
}

const featureVariants = {
  hidden: { opacity: 0, x: -20 },
  visible: (i) => ({
    opacity: 1,
    x: 0,
    transition: {
      duration: 0.4,
      delay: i * 0.05
    }
  })
}

export default function Pricing() {
  return (
    <section className="py-20 md:py-32 px-4 md:px-8 lg:px-16 bg-gradient-to-b from-neutral-50 to-white dark:from-neutral-900 dark:to-neutral-950">
      <div className="max-w-7xl mx-auto">
        {/* Section Header */}
        <motion.div
          className="text-center mb-20"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: true, margin: '-100px' }}
        >
          <h2 className="text-3xl md:text-5xl font-bold mb-4">
            <span className="bg-gradient-to-r from-primary-600 via-secondary-600 to-accent-600 bg-clip-text text-transparent">
              Simple, Transparent Pricing
            </span>
          </h2>
          <p className="text-neutral-600 dark:text-neutral-400 text-lg max-w-2xl mx-auto">
            Choose the perfect plan for your fitness journey. Upgrade or downgrade anytime with no commitment.
          </p>
        </motion.div>

        {/* Pricing Cards */}
        <motion.div
          className="grid md:grid-cols-3 gap-8 lg:gap-6"
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: '-100px' }}
        >
          {pricingTiers.map((tier) => (
            <motion.div
              key={tier.id}
              variants={cardVariants}
              whileHover={cardHoverVariants.hover}
              className={`relative rounded-2xl transition-all duration-300 ${
                tier.highlighted
                  ? 'md:scale-105 bg-white dark:bg-neutral-800 shadow-2xl shadow-primary-500/20 dark:shadow-primary-900/30'
                  : 'bg-white dark:bg-neutral-900 shadow-lg hover:shadow-xl'
              } border ${
                tier.highlighted
                  ? `border-transparent bg-gradient-to-br ${tier.gradient} p-1`
                  : 'border-neutral-200 dark:border-neutral-800'
              }`}
            >
              {/* Gradient border inner container for highlighted tier */}
              {tier.highlighted && (
                <div className="bg-white dark:bg-neutral-800 rounded-2xl p-8 h-full">
                  {/* Badge */}
                  <div className="absolute -top-4 left-1/2 -translate-x-1/2 z-10">
                    <div className={`bg-gradient-to-r ${tier.gradient} text-white px-4 py-1.5 rounded-full text-sm font-semibold`}>
                      {tier.badge}
                    </div>
                  </div>

                  {/* Tier Info */}
                  <div className="mb-8">
                    <h3 className="text-2xl font-bold text-neutral-900 dark:text-white mb-2">
                      {tier.name}
                    </h3>
                    <p className="text-sm text-neutral-600 dark:text-neutral-400 mb-6">
                      {tier.description}
                    </p>

                    {/* Price */}
                    <div className="mb-8">
                      <span className="text-5xl font-bold text-neutral-900 dark:text-white">
                        ${tier.price}
                      </span>
                      <span className="text-neutral-600 dark:text-neutral-400 ml-2">
                        {tier.period}
                      </span>
                    </div>

                    {/* CTA Button */}
                    <motion.button
                      whileHover={{ scale: 1.05 }}
                      whileTap={{ scale: 0.95 }}
                      className={`w-full bg-gradient-to-r ${tier.gradient} text-white font-semibold py-3 px-6 rounded-lg flex items-center justify-center gap-2 transition-all duration-300`}
                    >
                      {tier.cta}
                      <ArrowRight className="w-4 h-4" />
                    </motion.button>
                  </div>

                  {/* Features */}
                  <div className="border-t border-neutral-200 dark:border-neutral-700 pt-8">
                    <ul className="space-y-4">
                      {tier.features.map((feature, i) => (
                        <motion.li
                          key={i}
                          custom={i}
                          variants={featureVariants}
                          initial="hidden"
                          whileInView="visible"
                          viewport={{ once: true, margin: '-50px' }}
                          className="flex items-start gap-3"
                        >
                          <motion.div
                            initial={{ scale: 0, rotate: -180 }}
                            whileInView={{ scale: 1, rotate: 0 }}
                            transition={{ duration: 0.4, delay: i * 0.05 }}
                            viewport={{ once: true }}
                            className={`mt-1 flex-shrink-0 w-5 h-5 rounded-full bg-gradient-to-r ${tier.gradient} flex items-center justify-center`}
                          >
                            <Check className="w-3 h-3 text-white" strokeWidth={3} />
                          </motion.div>
                          <span className="text-neutral-700 dark:text-neutral-300">
                            {feature}
                          </span>
                        </motion.li>
                      ))}
                    </ul>
                  </div>
                </div>
              )}

              {/* Non-highlighted tier content */}
              {!tier.highlighted && (
                <div className="p-8 h-full flex flex-col">
                  {/* Tier Info */}
                  <div className="mb-8">
                    <h3 className="text-2xl font-bold text-neutral-900 dark:text-white mb-2">
                      {tier.name}
                    </h3>
                    <p className="text-sm text-neutral-600 dark:text-neutral-400 mb-6">
                      {tier.description}
                    </p>

                    {/* Price */}
                    <div className="mb-8">
                      <span className="text-5xl font-bold text-neutral-900 dark:text-white">
                        ${tier.price}
                      </span>
                      <span className="text-neutral-600 dark:text-neutral-400 ml-2">
                        {tier.period}
                      </span>
                    </div>

                    {/* CTA Button */}
                    <motion.button
                      whileHover={{ scale: 1.05 }}
                      whileTap={{ scale: 0.95 }}
                      className={`w-full border-2 border-neutral-300 dark:border-neutral-700 text-neutral-900 dark:text-white font-semibold py-3 px-6 rounded-lg flex items-center justify-center gap-2 hover:bg-neutral-100 dark:hover:bg-neutral-800 transition-all duration-300`}
                    >
                      {tier.cta}
                      <ArrowRight className="w-4 h-4" />
                    </motion.button>
                  </div>

                  {/* Features */}
                  <div className="border-t border-neutral-200 dark:border-neutral-800 pt-8 flex-1">
                    <ul className="space-y-4">
                      {tier.features.map((feature, i) => (
                        <motion.li
                          key={i}
                          custom={i}
                          variants={featureVariants}
                          initial="hidden"
                          whileInView="visible"
                          viewport={{ once: true, margin: '-50px' }}
                          className="flex items-start gap-3"
                        >
                          <motion.div
                            initial={{ scale: 0, rotate: -180 }}
                            whileInView={{ scale: 1, rotate: 0 }}
                            transition={{ duration: 0.4, delay: i * 0.05 }}
                            viewport={{ once: true }}
                            className="mt-1 flex-shrink-0 w-5 h-5 rounded-full bg-neutral-300 dark:bg-neutral-700 flex items-center justify-center"
                          >
                            <Check className="w-3 h-3 text-neutral-600 dark:text-neutral-400" strokeWidth={3} />
                          </motion.div>
                          <span className="text-neutral-700 dark:text-neutral-300">
                            {feature}
                          </span>
                        </motion.li>
                      ))}
                    </ul>
                  </div>
                </div>
              )}
            </motion.div>
          ))}
        </motion.div>

        {/* Bottom CTA */}
        <motion.div
          className="text-center mt-20"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.3 }}
          viewport={{ once: true, margin: '-100px' }}
        >
          <p className="text-neutral-600 dark:text-neutral-400 mb-6">
            All plans include a 14-day free trial. No credit card required.
          </p>
          <motion.a
            href="#"
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            className="inline-flex items-center gap-2 text-primary-600 dark:text-primary-400 font-semibold hover:text-primary-700 dark:hover:text-primary-300 transition-colors"
          >
            View detailed feature comparison
            <ArrowRight className="w-4 h-4" />
          </motion.a>
        </motion.div>
      </div>
    </section>
  )
}
