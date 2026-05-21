import { motion } from 'framer-motion'
import { UserPlus, Target, TrendingUp, ArrowRight, Sparkles } from 'lucide-react'

const steps = [
  {
    id: 1,
    number: '01',
    title: 'Sign Up',
    description: 'Create your account in seconds. Basic info and you\'re ready to go.',
    icon: UserPlus,
    gradient: 'from-primary-500 to-blue-600',
    glow: 'shadow-primary-500/40',
    ring: 'ring-primary-400/50',
    pathColor: '#3B82F6',
  },
  {
    id: 2,
    number: '02',
    title: 'Set Goals',
    description: 'Pick fitness goals, activity level, and preferences — fully personalized.',
    icon: Target,
    gradient: 'from-secondary-500 to-violet-600',
    glow: 'shadow-secondary-500/40',
    ring: 'ring-secondary-400/50',
    pathColor: '#8B5CF6',
  },
  {
    id: 3,
    number: '03',
    title: 'Track Progress',
    description: 'Log workouts, track metrics, and watch your transformation with analytics.',
    icon: TrendingUp,
    gradient: 'from-success-500 to-emerald-600',
    glow: 'shadow-success-500/40',
    ring: 'ring-success-400/50',
    pathColor: '#10B981',
  },
]

function StepNode({ step, index }) {
  const Icon = step.icon
  return (
    <motion.div
      initial={{ opacity: 0, y: 40 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: '-60px' }}
      transition={{ duration: 0.55, delay: index * 0.15 }}
      className="relative flex flex-col items-center text-center z-10"
    >
      {/* Timeline node */}
      <motion.div
        whileHover={{ scale: 1.08 }}
        className={`relative w-20 h-20 md:w-24 md:h-24 rounded-2xl rotate-45 bg-gradient-to-br ${step.gradient} ${step.glow} shadow-xl flex items-center justify-center ring-4 ${step.ring}`}
      >
        <div className="-rotate-45">
          <Icon className="w-9 h-9 md:w-11 md:h-11 text-white" strokeWidth={2} />
        </div>
        <span className="absolute -top-2 -right-2 w-8 h-8 rounded-full bg-white dark:bg-neutral-900 border-2 border-neutral-200 dark:border-neutral-700 flex items-center justify-center text-xs font-black text-neutral-800 dark:text-white -rotate-45">
          {step.id}
        </span>
      </motion.div>

      {/* Step card */}
      <motion.div
        whileHover={{ y: -4 }}
        className="mt-8 w-full max-w-[280px] p-6 rounded-2xl bg-white/80 dark:bg-neutral-900/80 backdrop-blur-md border border-neutral-200/80 dark:border-neutral-700/80 shadow-lg hover:shadow-xl transition-shadow"
      >
        <span className={`text-4xl font-black bg-gradient-to-r ${step.gradient} bg-clip-text text-transparent opacity-30`}>
          {step.number}
        </span>
        <h3 className="text-xl font-bold text-neutral-900 dark:text-white -mt-2 mb-2">{step.title}</h3>
        <p className="text-sm text-neutral-600 dark:text-neutral-400 leading-relaxed">{step.description}</p>
      </motion.div>
    </motion.div>
  )
}

/** Desktop curved connectors with animated flow */
function DesktopConnectors() {
  return (
    <svg
      className="absolute top-[52px] left-0 w-full h-[120px] pointer-events-none hidden lg:block"
      viewBox="0 0 1200 120"
      preserveAspectRatio="none"
      fill="none"
      aria-hidden="true"
    >
      <defs>
        <linearGradient id="flowGrad1" x1="0%" y1="0%" x2="100%" y2="0%">
          <stop offset="0%" stopColor="#3B82F6" />
          <stop offset="100%" stopColor="#8B5CF6" />
        </linearGradient>
        <linearGradient id="flowGrad2" x1="0%" y1="0%" x2="100%" y2="0%">
          <stop offset="0%" stopColor="#8B5CF6" />
          <stop offset="100%" stopColor="#10B981" />
        </linearGradient>
        <marker id="arrowhead1" markerWidth="10" markerHeight="10" refX="9" refY="5" orient="auto">
          <path d="M0,0 L10,5 L0,10 Z" fill="#8B5CF6" />
        </marker>
        <marker id="arrowhead2" markerWidth="10" markerHeight="10" refX="9" refY="5" orient="auto">
          <path d="M0,0 L10,5 L0,10 Z" fill="#10B981" />
        </marker>
      </defs>

      {/* Step 1 → 2 curved path */}
      <motion.path
        d="M 200 60 Q 400 20, 600 60"
        stroke="url(#flowGrad1)"
        strokeWidth="3"
        strokeLinecap="round"
        fill="none"
        markerEnd="url(#arrowhead1)"
        initial={{ pathLength: 0, opacity: 0 }}
        whileInView={{ pathLength: 1, opacity: 1 }}
        viewport={{ once: true }}
        transition={{ duration: 1.2, delay: 0.4, ease: 'easeInOut' }}
      />
      <motion.path
        d="M 200 60 Q 400 20, 600 60"
        stroke="url(#flowGrad1)"
        strokeWidth="3"
        strokeLinecap="round"
        fill="none"
        strokeDasharray="8 12"
        initial={{ pathLength: 0, strokeDashoffset: 0 }}
        whileInView={{ pathLength: 1, strokeDashoffset: -40 }}
        viewport={{ once: true }}
        transition={{
          pathLength: { duration: 1.2, delay: 0.4 },
          strokeDashoffset: { duration: 2, repeat: Infinity, ease: 'linear', delay: 1.6 },
        }}
        opacity={0.5}
      />

      {/* Step 2 → 3 curved path */}
      <motion.path
        d="M 600 60 Q 800 100, 1000 60"
        stroke="url(#flowGrad2)"
        strokeWidth="3"
        strokeLinecap="round"
        fill="none"
        markerEnd="url(#arrowhead2)"
        initial={{ pathLength: 0, opacity: 0 }}
        whileInView={{ pathLength: 1, opacity: 1 }}
        viewport={{ once: true }}
        transition={{ duration: 1.2, delay: 0.7, ease: 'easeInOut' }}
      />
      <motion.path
        d="M 600 60 Q 800 100, 1000 60"
        stroke="url(#flowGrad2)"
        strokeWidth="3"
        strokeLinecap="round"
        fill="none"
        strokeDasharray="8 12"
        initial={{ pathLength: 0, strokeDashoffset: 0 }}
        whileInView={{ pathLength: 1, strokeDashoffset: -40 }}
        viewport={{ once: true }}
        transition={{
          pathLength: { duration: 1.2, delay: 0.7 },
          strokeDashoffset: { duration: 2, repeat: Infinity, ease: 'linear', delay: 1.9 },
        }}
        opacity={0.5}
      />

      {/* Glow nodes at path junctions */}
      {[
        { cx: 400, cy: 20, color: '#8B5CF6', delay: 1.4 },
        { cx: 800, cy: 100, color: '#10B981', delay: 1.8 },
      ].map((dot, i) => (
        <motion.circle
          key={i}
          cx={dot.cx}
          cy={dot.cy}
          r="6"
          fill={dot.color}
          initial={{ opacity: 0, scale: 0 }}
          whileInView={{ opacity: [0.6, 1, 0.6], scale: [1, 1.3, 1] }}
          viewport={{ once: true }}
          transition={{ duration: 2, repeat: Infinity, delay: dot.delay }}
          style={{ filter: `drop-shadow(0 0 8px ${dot.color})` }}
        />
      ))}
    </svg>
  )
}

/** Tablet horizontal simple connectors */
function TabletConnectors() {
  return (
    <div className="hidden md:flex lg:hidden absolute top-[52px] left-[16.67%] right-[16.67%] items-center justify-between pointer-events-none px-4" aria-hidden="true">
      {[0, 1].map((i) => (
        <div key={i} className="flex-1 flex items-center mx-2">
          <motion.div
            className={`h-0.5 flex-1 bg-gradient-to-r ${i === 0 ? 'from-primary-500 to-secondary-500' : 'from-secondary-500 to-success-500'}`}
            initial={{ scaleX: 0 }}
            whileInView={{ scaleX: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8, delay: 0.5 + i * 0.3 }}
            style={{ originX: 0 }}
          />
          <motion.div
            initial={{ opacity: 0, x: -8 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 1 + i * 0.3 }}
          >
            <ArrowRight className={`w-6 h-6 ${i === 0 ? 'text-secondary-500' : 'text-success-500'}`} />
          </motion.div>
        </div>
      ))}
    </div>
  )
}

/** Mobile vertical timeline */
function MobileTimeline() {
  return (
    <div className="md:hidden relative pl-4">
      <motion.div
        className="absolute left-[39px] top-10 bottom-16 w-1 rounded-full bg-gradient-to-b from-primary-500 via-secondary-500 to-success-500"
        initial={{ scaleY: 0 }}
        whileInView={{ scaleY: 1 }}
        viewport={{ once: true }}
        transition={{ duration: 1.2, ease: 'easeInOut' }}
        style={{ originY: 0 }}
        aria-hidden="true"
      />

      <div className="space-y-0">
        {steps.map((step, index) => {
          const Icon = step.icon
          const isLast = index === steps.length - 1
          return (
            <motion.div
              key={step.id}
              initial={{ opacity: 0, x: -20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true, margin: '-40px' }}
              transition={{ duration: 0.5, delay: index * 0.15 }}
              className="relative flex gap-6 pb-12 last:pb-0"
            >
              {/* Node on rail */}
              <div className="relative z-10 flex-shrink-0">
                <motion.div
                  whileHover={{ scale: 1.05 }}
                  className={`w-[72px] h-[72px] rounded-2xl rotate-45 bg-gradient-to-br ${step.gradient} shadow-lg flex items-center justify-center`}
                >
                  <div className="-rotate-45">
                    <Icon className="w-8 h-8 text-white" />
                  </div>
                </motion.div>
                {!isLast && (
                  <motion.div
                    initial={{ opacity: 0 }}
                    whileInView={{ opacity: 1 }}
                    transition={{ delay: 0.3 + index * 0.2 }}
                    className="absolute -bottom-8 left-1/2 -translate-x-1/2"
                  >
                    <ArrowRight className="w-5 h-5 text-secondary-500 rotate-90" />
                  </motion.div>
                )}
              </div>

              {/* Card */}
              <div className="flex-1 pt-2">
                <div className="p-5 rounded-2xl bg-white dark:bg-neutral-900 border border-neutral-200 dark:border-neutral-800 shadow-md">
                  <span className={`text-3xl font-black bg-gradient-to-r ${step.gradient} bg-clip-text text-transparent`}>
                    {step.number}
                  </span>
                  <h3 className="text-lg font-bold text-neutral-900 dark:text-white mt-1 mb-2">{step.title}</h3>
                  <p className="text-sm text-neutral-600 dark:text-neutral-400">{step.description}</p>
                </div>
              </div>
            </motion.div>
          )
        })}
      </div>
    </div>
  )
}

export default function HowItWorks() {
  return (
    <section className="w-full py-16 md:py-24 relative overflow-hidden bg-gradient-to-b from-neutral-50 via-primary-50/30 to-white dark:from-neutral-950 dark:via-primary-950/20 dark:to-neutral-950">
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[400px] bg-gradient-to-r from-primary-200/20 via-secondary-200/15 to-success-200/20 dark:from-primary-900/10 dark:via-secondary-900/10 dark:to-success-900/10 rounded-full blur-3xl" />
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.55 }}
          className="text-center mb-14 md:mb-20"
        >
          <span className="inline-flex items-center gap-2 px-4 py-1.5 mb-4 rounded-full bg-primary-100 dark:bg-primary-950/50 text-primary-700 dark:text-primary-300 text-sm font-semibold border border-primary-200 dark:border-primary-800">
            <Sparkles className="w-4 h-4" />
            Simple process
          </span>
          <h2 className="text-3xl md:text-4xl font-bold text-neutral-900 dark:text-white mb-4">
            How It{' '}
            <span className="bg-gradient-to-r from-primary-600 via-secondary-600 to-success-600 bg-clip-text text-transparent">
              Works
            </span>
          </h2>
          <p className="text-neutral-600 dark:text-neutral-400 max-w-2xl mx-auto text-lg">
            Three steps from sign-up to transformation — follow the path below
          </p>
        </motion.div>

        {/* Desktop + tablet timeline */}
        <div className="hidden md:block relative">
          <DesktopConnectors />
          <TabletConnectors />
          <div className="grid grid-cols-3 gap-6 lg:gap-10 pt-4">
            {steps.map((step, index) => (
              <StepNode key={step.id} step={step} index={index} />
            ))}
          </div>
        </div>

        {/* Mobile vertical flow */}
        <MobileTimeline />

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5, delay: 0.4 }}
          className="mt-14 text-center"
        >
          <p className="text-neutral-600 dark:text-neutral-400 mb-6 text-lg">
            It&apos;s that simple. Start your transformation today.
          </p>
          <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            className="px-8 py-4 bg-gradient-to-r from-primary-600 via-secondary-600 to-success-600 text-white font-semibold rounded-2xl shadow-lg shadow-primary-500/25 inline-flex items-center gap-2"
          >
            Begin Your Journey
            <ArrowRight className="w-5 h-5" />
          </motion.button>
        </motion.div>
      </div>
    </section>
  )
}
