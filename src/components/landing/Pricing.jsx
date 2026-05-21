import { useState } from 'react'
import { motion } from 'framer-motion'
import { Check, ArrowRight, Sparkles, Zap, Crown } from 'lucide-react'
import * as ls from './landingStyles'
import { fadeUpProps, viewTransitionFast } from './landingMotion'
const pricingTiers = [
  {
    id: 'free',
    name: 'Free',
    price: 0,
    period: 'forever',
    description: 'Perfect for getting started',
    gradient: 'from-neutral-500 to-neutral-600',
    icon: Zap,
    layout: 'minimal',
    features: ['Basic workout logging', '30-day history', 'Progress tracking', 'Mobile app', 'Community access'],
    cta: 'Get Started Free',
    highlighted: false,
  },
  {
    id: 'pro',
    name: 'Pro',
    price: 9.99,
    period: '/month',
    description: 'For dedicated enthusiasts',
    gradient: 'from-primary-500 to-blue-600',
    icon: Sparkles,
    layout: 'featured',
    badge: 'Most Popular',
    features: ['Everything in Free', 'Unlimited history', 'Advanced analytics', 'Nutrition planning', 'Custom goals', 'Priority support'],
    cta: 'Start Pro Trial',
    highlighted: true,
  },
  {
    id: 'elite',
    name: 'Elite',
    price: 19.99,
    period: '/month',
    description: 'Full transformation package',
    gradient: 'from-secondary-500 to-violet-600',
    icon: Crown,
    layout: 'premium',
    features: ['Everything in Pro', '1-on-1 coaching', 'Weekly check-ins', 'Meal plans', 'Form feedback', 'Premium library'],
    cta: 'Start Elite Trial',
    highlighted: false,
  },
]
function PricingCard({ tier, index }) {
  const Icon = tier.icon
  const isFeatured = tier.layout === 'featured'
  const isPremium = tier.layout === 'premium'
  const isMinimal = tier.layout === 'minimal'
  
  return (
    <motion.div
      {...fadeUpProps(index * 0.04)}
      whileHover={{ y: -4 }}
      className="relative w-full"
    >
      {/* Badge */}
      {tier.badge && (
        <div className="absolute -top-4 left-1/2 -translate-x-1/2 z-10">
          <span className={`px-4 py-1.5 rounded-full text-xs font-bold text-white bg-gradient-to-r ${tier.gradient} shadow-lg`}>
            {tier.badge}
          </span>
        </div>
      )}
      
      {/* Card */}
      <div
        className={`relative flex flex-col h-full rounded-2xl overflow-hidden border transition-all ${
          isFeatured
            ? 'bg-neutral-950 text-white border-primary-500/40 shadow-xl shadow-primary-500/20'
            : isPremium
              ? 'bg-gradient-to-br from-secondary-50/80 to-violet-50/80 dark:from-secondary-950/50 dark:to-violet-950/40 border-secondary-200 dark:border-secondary-800/80 shadow-lg'
              : 'bg-white dark:bg-neutral-900 border-neutral-200 dark:border-neutral-800 shadow-md hover:shadow-lg hover:border-neutral-300 dark:hover:border-neutral-700'
        }`}
      >
        <div className={`p-6 md:p-8 ${isFeatured ? 'bg-gradient-to-br from-primary-600/20 to-blue-600/10' : ''}`}>
          <div className="flex items-start justify-between mb-6">
            <div
              className={`p-3 rounded-2xl ${
                isFeatured
                  ? `bg-gradient-to-br ${tier.gradient}`
                  : isPremium
                    ? `bg-gradient-to-br ${tier.gradient} text-white`
                    : 'bg-neutral-100 dark:bg-neutral-800'
              }`}
            >
              <Icon className={`w-6 h-6 ${isFeatured || isPremium ? 'text-white' : 'text-neutral-600 dark:text-neutral-400'}`} />
            </div>
            {isMinimal && (
              <span className="text-xs font-semibold uppercase tracking-widest text-neutral-500">Starter</span>
            )}
            {isPremium && (
              <span className="text-xs font-semibold uppercase tracking-widest text-secondary-600 dark:text-secondary-400">
                Premium
              </span>
            )}
          </div>
          <h3 className={`text-2xl font-bold mb-1 ${isFeatured ? 'text-white' : 'text-neutral-900 dark:text-white'}`}>
            {tier.name}
          </h3>
          <p className={`text-sm mb-6 ${isFeatured ? 'text-neutral-400' : 'text-neutral-600 dark:text-neutral-400'}`}>
            {tier.description}
          </p>
          <div className="flex items-baseline gap-1 mb-6">
            <span className={`text-4xl sm:text-5xl font-bold tracking-tight ${isFeatured ? 'text-white' : 'text-neutral-900 dark:text-white'}`}>
              ${tier.price}
            </span>
            <span className={`text-sm ${isFeatured ? 'text-neutral-400' : 'text-neutral-500'}`}>{tier.period}</span>
          </div>
          <motion.button
            whileHover={{ scale: 1.03 }}
            whileTap={{ scale: 0.97 }}
            className={`w-full py-4 px-6 rounded-xl font-semibold flex items-center justify-center gap-2 transition-all ${
              isFeatured
                ? 'bg-primary-600 hover:bg-primary-700 text-white shadow-lg'
                : isPremium
                  ? 'bg-secondary-600 hover:bg-secondary-700 text-white shadow-lg'
                  : 'bg-neutral-900 dark:bg-white text-white dark:text-neutral-900 hover:bg-neutral-800 dark:hover:bg-neutral-100 shadow-md'
            }`}
          >
            {tier.cta}
            <ArrowRight className="w-4 h-4" />
          </motion.button>
        </div>
        <div
          className={`flex-1 p-6 md:px-8 md:pb-8 border-t ${
            isFeatured ? 'border-white/10' : 'border-neutral-200/80 dark:border-neutral-700/80'
          }`}
        >
          <ul className="space-y-3">
            {tier.features.map((feature, i) => (
              <motion.li
                key={feature}
                initial={{ opacity: 0, x: -10 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ ...viewTransitionFast, delay: 0.04 + i * 0.02 }}
                className="flex items-start gap-3 text-sm"
              >
                <span
                  className={`mt-0.5 flex-shrink-0 w-5 h-5 rounded-full flex items-center justify-center ${
                    isFeatured || isPremium
                      ? `bg-gradient-to-r ${tier.gradient}`
                      : 'bg-neutral-200 dark:bg-neutral-700'
                  }`}
                >
                  <Check className={`w-3 h-3 ${isFeatured || isPremium ? 'text-white' : 'text-neutral-600 dark:text-neutral-400'}`} strokeWidth={3} />
                </span>
                <span className={isFeatured ? 'text-neutral-300' : 'text-neutral-700 dark:text-neutral-300'}>
                  {feature}
                </span>
              </motion.li>
            ))}
          </ul>
        </div>
      </div>
    </motion.div>
  )
}
export default function Pricing() {
  const [annual, setAnnual] = useState(false)
  return (
    <section id="pricing" className={`${ls.section} bg-neutral-50 dark:bg-neutral-900/50 border-y border-neutral-200 dark:border-neutral-800`}>
      <div className={ls.container}>
        <motion.div {...fadeUpProps(0)} className="text-center mb-12">
          <span className={ls.eyebrow}>Pricing</span>
          <h2 className={`${ls.heading} mb-4`}>
            Simple, <span className={ls.headingAccent}>transparent</span> pricing
          </h2>
          <p className={`${ls.subheading} mx-auto mb-8`}>
            Choose your plan. Upgrade or downgrade anytime — no commitment.
          </p>
          <div className="inline-flex items-center gap-3 p-1.5 rounded-full bg-neutral-100 dark:bg-neutral-900 border border-neutral-200 dark:border-neutral-800">
            <button
              type="button"
              onClick={() => setAnnual(false)}
              className={`px-5 py-2 rounded-full text-sm font-semibold transition-all ${
                !annual ? 'bg-white dark:bg-neutral-800 text-neutral-900 dark:text-white shadow-sm' : 'text-neutral-500'
              }`}
            >
              Monthly
            </button>
            <button
              type="button"
              onClick={() => setAnnual(true)}
              className={`px-5 py-2 rounded-full text-sm font-semibold transition-all flex items-center gap-2 ${
                annual ? 'bg-white dark:bg-neutral-800 text-neutral-900 dark:text-white shadow-sm' : 'text-neutral-500'
              }`}
            >
              Annual
              <span className="text-xs px-2 py-0.5 rounded-full bg-success-100 dark:bg-success-950 text-success-700 dark:text-success-400 font-bold">
                -20%
              </span>
            </button>
          </div>
        </motion.div>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 lg:gap-8 mt-16 w-full max-w-[90%] mx-auto">
          {pricingTiers.map((tier, index) => (
            <PricingCard
              key={tier.id}
              tier={{
                ...tier,
                price: annual && tier.price > 0 ? +(tier.price * 0.8).toFixed(2) : tier.price,
                period: tier.price === 0 ? 'forever' : annual ? '/mo billed yearly' : '/month',
              }}
              index={index}
            />
          ))}
        </div>
        <motion.p
          className="text-center mt-12 text-neutral-500 dark:text-neutral-400 text-sm"
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
        >
          All paid plans include a <span className="font-semibold text-primary-600 dark:text-primary-400">14-day free trial</span> — no credit card required
        </motion.p>
      </div>
    </section>
  )
}
