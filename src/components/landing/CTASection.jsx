import { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { Mail, ArrowRight, CheckCircle, Dumbbell, Flame, Trophy } from 'lucide-react'
import { Link } from 'react-router-dom'
import * as ls from './landingStyles'
import { fadeUpProps, viewTransitionFast } from './landingMotion'
const perks = [
  { icon: Dumbbell, label: 'Unlimited workouts' },
  { icon: Flame, label: '14-day free trial' },
  { icon: Trophy, label: '50K+ members' },
]
export default function CTASection() {
  const [email, setEmail] = useState('')
  const [isSubmitted, setIsSubmitted] = useState(false)
  const [error, setError] = useState('')
  const validateEmail = (value) => /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value)
  const handleSubmit = (e) => {
    e.preventDefault()
    setError('')
    if (!email) {
      setError('Please enter your email')
      return
    }
    if (!validateEmail(email)) {
      setError('Please enter a valid email address')
      return
    }
    setIsSubmitted(true)
    setEmail('')
    setTimeout(() => setIsSubmitted(false), 4000)
  }
  return (
    <section className={`${ls.section} bg-white dark:bg-neutral-950`}>
      <div className={`${ls.container} max-w-6xl`}>
        <div className="relative rounded-2xl overflow-hidden bg-neutral-950 border border-neutral-800 shadow-sm">
          <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_0%_0%,rgba(59,130,246,0.12),transparent_50%),radial-gradient(ellipse_at_100%_100%,rgba(139,92,246,0.1),transparent_50%)]" />
          <div className="relative z-10 grid lg:grid-cols-2 gap-8 sm:gap-10 lg:gap-16 p-5 sm:p-8 md:p-12 lg:p-16 items-center">
            <motion.div
              initial={{ opacity: 0, x: -16 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true, margin: '-48px 0px' }}
              transition={viewTransitionFast}
            >
              <span className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-white/10 border border-white/20 text-primary-300 text-sm font-medium mb-6">
                <span className="w-2 h-2 rounded-full bg-success-400 animate-pulse" />
                Limited time — free trial
              </span>
              <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold text-white leading-tight mb-4">
                Ready to transform{' '}
                <span className="bg-gradient-to-r from-primary-400 via-secondary-400 to-accent-400 bg-clip-text text-transparent">
                  your fitness?
                </span>
              </h2>
              <p className="text-neutral-400 text-base sm:text-lg mb-6 sm:mb-8 max-w-md">
                Join thousands crushing their goals. Start free — upgrade when you&apos;re ready.
              </p>
              <div className="flex flex-wrap gap-3">
                {perks.map(({ icon: Icon, label }, i) => (
                  <motion.div
                    key={label}
                    initial={{ opacity: 0, y: 10 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    transition={{ ...viewTransitionFast, delay: 0.04 + i * 0.03 }}
                    viewport={{ once: true }}
                    className="flex items-center gap-2 px-4 py-2 rounded-xl bg-white/5 border border-white/10 text-sm text-neutral-300"
                  >
                    <Icon className="w-4 h-4 text-primary-400" />
                    {label}
                  </motion.div>
                ))}
              </div>
            </motion.div>
            <motion.div
              initial={{ opacity: 0, x: 16 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true, margin: '-48px 0px' }}
              transition={{ ...viewTransitionFast, delay: 0.04 }}
              className="relative"
            >
              <div className="relative p-6 md:p-8 rounded-xl bg-white/5 backdrop-blur-sm border border-white/10">
                <h3 className="text-xl font-bold text-white mb-2">Get started today</h3>
                <p className="text-neutral-400 text-sm mb-6">Enter your email for instant access</p>
                <form onSubmit={handleSubmit} className="space-y-4">
                  <div className="relative">
                    <Mail className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-neutral-500" />
                    <input
                      type="email"
                      placeholder="you@example.com"
                      value={email}
                      onChange={(e) => {
                        setEmail(e.target.value)
                        setError('')
                      }}
                      className={`w-full pl-12 pr-4 py-4 rounded-xl bg-white text-neutral-900 placeholder-neutral-400 focus:outline-none focus:ring-2 focus:ring-primary-400 transition-all ${
                        error ? 'ring-2 ring-error-400' : ''
                      }`}
                    />
                  </div>
                  <AnimatePresence>
                    {error && (
                      <motion.p
                        initial={{ opacity: 0, y: -5 }}
                        animate={{ opacity: 1, y: 0 }}
                        exit={{ opacity: 0 }}
                        className="text-error-300 text-sm"
                      >
                        {error}
                      </motion.p>
                    )}
                  </AnimatePresence>
                  <motion.button
                    type="submit"
                    whileHover={{ scale: 1.02 }}
                    whileTap={{ scale: 0.98 }}
                    className="w-full py-4 rounded-xl bg-gradient-to-r from-primary-500 via-secondary-500 to-accent-500 text-white font-semibold flex items-center justify-center gap-2 hover:opacity-95 transition-opacity"
                  >
                    Get Started Free
                    <ArrowRight className="w-5 h-5" />
                  </motion.button>
                  <Link
                    to="/register"
                    className="block text-center text-sm text-neutral-400 hover:text-white transition-colors"
                  >
                    Or create a full account →
                  </Link>
                </form>
                <AnimatePresence>
                  {isSubmitted && (
                    <motion.div
                      initial={{ opacity: 0, y: 10 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={{ opacity: 0 }}
                      className="mt-4 p-4 rounded-xl bg-success-500/20 border border-success-500/30 flex items-center gap-3"
                    >
                      <CheckCircle className="w-5 h-5 text-success-400 flex-shrink-0" />
                      <p className="text-success-200 text-sm">Check your inbox to start your trial!</p>
                    </motion.div>
                  )}
                </AnimatePresence>
                <p className="text-neutral-500 text-xs mt-4 text-center">
                  No spam. Unsubscribe anytime.
                </p>
              </div>
            </motion.div>
          </div>
        </div>
      </div>
    </section>
  )
}
