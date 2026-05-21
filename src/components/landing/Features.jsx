import { motion } from 'framer-motion'
import { BarChart3, Leaf, TrendingUp, Users, ArrowUpRight } from 'lucide-react'
import * as ls from './landingStyles'

const features = [
  {
    id: 1,
    icon: BarChart3,
    title: 'Workout Tracking',
    description: 'Log exercises with sets, reps, and weights. Watch your strength climb week after week.',
    gradient: 'from-primary-500 to-blue-600',
    lightBg: 'from-primary-50 to-blue-50 dark:from-primary-950/40 dark:to-blue-950/30',
    accent: 'border-primary-400',
    layout: 'featured',
    stat: '120+ exercises',
  },
  {
    id: 2,
    icon: Leaf,
    title: 'Nutrition Plans',
    description: 'Personalized meal plans and macro tracking tailored to your goals.',
    gradient: 'from-success-500 to-emerald-600',
    lightBg: 'from-success-50 to-emerald-50 dark:from-success-950/40 dark:to-emerald-950/30',
    accent: 'border-success-400',
    layout: 'floating-icon',
    stat: '2M+ meals logged',
  },
  {
    id: 3,
    icon: TrendingUp,
    title: 'Progress Analytics',
    description: 'Beautiful charts and insights that keep you motivated and on track.',
    gradient: 'from-accent-500 to-pink-600',
    lightBg: 'from-accent-50 to-pink-50 dark:from-accent-950/40 dark:to-pink-950/30',
    accent: 'border-accent-400',
    layout: 'accent-bar',
    stat: '94% hit goals',
  },
  {
    id: 4,
    icon: Users,
    title: 'Community Support',
    description: 'Connect, compete, and celebrate wins with fitness enthusiasts worldwide.',
    gradient: 'from-primary-500 to-secondary-500',
    lightBg: 'from-primary-50/80 via-white to-secondary-50/80 dark:from-primary-950/30 dark:via-neutral-900 dark:to-secondary-950/30',
    accent: 'border-primary-300',
    layout: 'stacked',
    stat: '50K+ members',
  },
]

const containerVariants = {
  hidden: { opacity: 0 },
  visible: { opacity: 1, transition: { staggerChildren: 0.12, delayChildren: 0.1 } },
}

const cardVariants = {
  hidden: { opacity: 0, y: 28 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.55, ease: 'easeOut' } },
}

function FeatureCard({ feature }) {
  const Icon = feature.icon
  const num = String(feature.id).padStart(2, '0')

  if (feature.layout === 'featured') {
    return (
      <motion.article
        variants={cardVariants}
        whileHover={{ y: -6 }}
        className={`md:col-span-2 lg:col-span-2 lg:row-span-2 group relative overflow-hidden rounded-xl min-h-[280px] border border-neutral-200 dark:border-neutral-800 shadow-sm ${ls.cardHover}`}
      >
        <div className={`absolute inset-0 bg-gradient-to-br ${feature.lightBg}`} />
        <div className={`absolute top-0 left-0 right-0 h-1 bg-gradient-to-r ${feature.gradient}`} />
        <div className="relative h-full p-8 md:p-10 flex flex-col justify-between">
          <div className="flex justify-between items-start">
            <span className="text-5xl font-bold text-primary-200/60 dark:text-primary-800/60 leading-none">{num}</span>
            <motion.div
              whileHover={{ rotate: 12 }}
              className={`p-3.5 rounded-xl bg-gradient-to-br ${feature.gradient}`}
            >
              <Icon className="w-8 h-8 text-white" />
            </motion.div>
          </div>
          <div>
            <span className="inline-block px-3 py-1 rounded-full text-xs font-semibold bg-primary-100 dark:bg-primary-900/50 text-primary-700 dark:text-primary-300 mb-3">
              {feature.stat}
            </span>
            <h3 className="text-2xl md:text-3xl font-bold text-neutral-900 dark:text-white mb-3">{feature.title}</h3>
            <p className="text-neutral-600 dark:text-neutral-400 max-w-md leading-relaxed">{feature.description}</p>
            <div className="mt-6 flex items-center gap-2 text-primary-600 dark:text-primary-400 font-semibold text-sm opacity-0 group-hover:opacity-100 transition-opacity">
              Explore feature <ArrowUpRight className="w-4 h-4" />
            </div>
          </div>
          {/* Mini chart decoration */}
          <div className="absolute bottom-8 right-8 flex items-end gap-1.5 opacity-40 group-hover:opacity-70 transition-opacity">
            {[40, 65, 45, 80, 55, 90, 70].map((h, i) => (
              <motion.div
                key={i}
                className={`w-2 rounded-full bg-gradient-to-t ${feature.gradient}`}
                initial={{ height: 0 }}
                whileInView={{ height: h * 0.5 }}
                viewport={{ once: true }}
                transition={{ delay: 0.3 + i * 0.05, duration: 0.4 }}
              />
            ))}
          </div>
        </div>
      </motion.article>
    )
  }

  if (feature.layout === 'floating-icon') {
    return (
      <motion.article variants={cardVariants} whileHover={{ y: -8 }} className="group relative pt-8">
        <motion.div
          whileHover={{ scale: 1.1, rotate: -8 }}
          className={`absolute -top-2 left-6 z-20 p-3.5 rounded-xl bg-gradient-to-br ${feature.gradient}`}
        >
          <Icon className="w-7 h-7 text-white" />
        </motion.div>
        <div className={`relative h-full p-6 pt-12 rounded-xl bg-gradient-to-br ${feature.lightBg} border border-neutral-200 dark:border-neutral-800 shadow-sm overflow-hidden`}>
          <span className="absolute top-2 right-4 text-5xl font-bold text-success-200/60 dark:text-success-900/40 leading-none select-none">
            {num}
          </span>
          <span className="text-xs font-bold text-success-600 dark:text-success-400 uppercase tracking-wider">{feature.stat}</span>
          <h3 className="text-xl font-bold text-neutral-900 dark:text-white mt-2 mb-2">{feature.title}</h3>
          <p className="text-sm text-neutral-600 dark:text-neutral-400 leading-relaxed">{feature.description}</p>
        </div>
      </motion.article>
    )
  }

  if (feature.layout === 'accent-bar') {
    return (
      <motion.article
        variants={cardVariants}
        whileHover={{ x: 4 }}
        className={`group relative flex overflow-hidden rounded-xl bg-white dark:bg-neutral-900 border border-neutral-200 dark:border-neutral-800 shadow-sm ${ls.cardHover}`}
      >
        <div className={`w-1.5 flex-shrink-0 bg-gradient-to-b ${feature.gradient}`} />
        <div className="flex-1 p-6 relative min-h-[200px]">
          <span className="absolute top-3 right-4 text-5xl font-bold text-accent-200/70 dark:text-accent-900/50 leading-none select-none">
            {num}
          </span>
          <div className="flex items-center gap-3 mb-3 relative z-10">
            <div className={`p-2.5 rounded-lg bg-gradient-to-br ${feature.gradient}`}>
              <Icon className="w-5 h-5 text-white" />
            </div>
          </div>
          <h3 className="text-lg font-bold text-neutral-900 dark:text-white mb-2 relative z-10">{feature.title}</h3>
          <p className="text-sm text-neutral-600 dark:text-neutral-400 relative z-10">{feature.description}</p>
          <p className={`mt-4 text-sm font-bold bg-gradient-to-r ${feature.gradient} bg-clip-text text-transparent relative z-10`}>
            {feature.stat}
          </p>
          <svg className="absolute bottom-4 right-4 w-20 h-10 opacity-30 group-hover:opacity-60 transition-opacity" viewBox="0 0 80 40" aria-hidden="true">
            <path d="M0 35 L15 25 L30 30 L45 15 L60 20 L80 5" fill="none" stroke="currentColor" strokeWidth="2" className="text-accent-500" />
          </svg>
        </div>
      </motion.article>
    )
  }

  // stacked — community (full-width, light card)
  return (
    <motion.article
      variants={cardVariants}
      whileHover={{ scale: 1.01 }}
      className={`group relative overflow-hidden rounded-xl min-h-[180px] md:col-span-2 lg:col-span-3 border border-neutral-200 dark:border-neutral-800 shadow-sm ${ls.cardHover}`}
    >
      <div className={`absolute inset-0 bg-gradient-to-br ${feature.lightBg}`} />
      <div className={`absolute top-0 left-0 right-0 h-1 bg-gradient-to-r ${feature.gradient}`} />
      <div className="relative flex flex-col md:flex-row md:items-center gap-6 p-6 md:p-8">
        <div className="flex-shrink-0 flex items-start gap-4">
          <span className="text-5xl md:text-6xl font-bold text-primary-200/70 dark:text-primary-800/50 leading-none">
            {num}
          </span>
          <motion.div
            whileHover={{ scale: 1.03 }}
            className={`p-3.5 rounded-xl bg-gradient-to-br ${feature.gradient}`}
          >
            <Icon className="w-8 h-8 text-white" />
          </motion.div>
        </div>
        <div className="flex-1 min-w-0">
          <span className="inline-block px-3 py-1 rounded-full text-xs font-semibold bg-primary-100 dark:bg-primary-900/40 text-primary-700 dark:text-primary-300 mb-2">
            {feature.stat}
          </span>
          <h3 className="text-xl md:text-2xl font-bold text-neutral-900 dark:text-white mb-2">{feature.title}</h3>
          <p className="text-sm md:text-base text-neutral-600 dark:text-neutral-400 leading-relaxed max-w-2xl">
            {feature.description}
          </p>
          <div className="flex items-center gap-2 mt-5">
            {['A', 'B', 'C', 'D', '+'].map((letter, i) => (
              <div
                key={letter}
                className={`w-9 h-9 rounded-full flex items-center justify-center text-xs font-bold text-white bg-gradient-to-br ${feature.gradient} border-2 border-white dark:border-neutral-800 shadow-sm`}
                style={{ marginLeft: i > 0 ? -10 : 0 }}
              >
                {letter}
              </div>
            ))}
          </div>
        </div>
      </div>
    </motion.article>
  )
}

export default function Features() {
  return (
    <section id="features" className={`${ls.section} bg-white dark:bg-neutral-950`}>
      <div className={ls.container}>
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-80px' }}
          transition={{ duration: 0.55 }}
          className="text-center mb-12 md:mb-14"
        >
          <span className={ls.eyebrow}>Features</span>
          <h2 className={`${ls.heading} mb-4`}>
            Powerful tools for <span className={ls.headingAccent}>your success</span>
          </h2>
          <p className={`${ls.subheading} mx-auto`}>
            Everything you need to transform your fitness journey — one intuitive platform
          </p>
        </motion.div>

        {/* Bento grid — each card a different layout */}
        <motion.div
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: '-80px' }}
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5 md:gap-6 auto-rows-fr"
        >
          {features.map((feature) => (
            <FeatureCard key={feature.id} feature={feature} />
          ))}
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5, delay: 0.3 }}
          className="mt-14 flex flex-col sm:flex-row items-center justify-center gap-4"
        >
          <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            className="px-8 py-3.5 bg-primary-600 hover:bg-primary-700 text-white font-semibold rounded-lg shadow-sm transition-colors"
          >
            Get Started Free
          </motion.button>
          <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            className="px-8 py-3.5 rounded-lg border border-neutral-300 dark:border-neutral-600 text-neutral-700 dark:text-neutral-300 font-semibold hover:bg-neutral-50 dark:hover:bg-neutral-900 transition-colors"
          >
            Learn More
          </motion.button>
        </motion.div>
      </div>
    </section>
  )
}
