import { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { Mail, ArrowRight, CheckCircle } from 'lucide-react'

const containerVariants = {
  hidden: { opacity: 0, y: 40 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.7, ease: 'easeOut' }
  }
}

const floatingVariants = {
  float: {
    y: [0, -20, 0],
    transition: { duration: 4, repeat: Infinity, ease: 'easeInOut' }
  }
}

const decorativeVariants = {
  rotate: {
    rotate: 360,
    transition: { duration: 20, repeat: Infinity, linear: true }
  }
}

export default function CTASection() {
  const [email, setEmail] = useState('')
  const [isSubmitted, setIsSubmitted] = useState(false)
  const [error, setError] = useState('')

  const validateEmail = (email) => {
    const regex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
    return regex.test(email)
  }

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
    setTimeout(() => setIsSubmitted(false), 3000)
  }

  return (
    <section className="py-20 md:py-32 px-4 md:px-8 lg:px-16 relative overflow-hidden bg-gradient-to-r from-primary-600 via-secondary-600 to-accent-600">
      {/* Overlay Gradient for Depth */}
      <div className="absolute inset-0 bg-gradient-to-br from-primary-600/70 to-secondary-700/70 pointer-events-none" />

      {/* Decorative Elements */}
      <motion.div
        className="absolute top-10 right-10 w-40 h-40 bg-white/10 rounded-full blur-3xl pointer-events-none"
        variants={floatingVariants}
        animate="float"
      />
      <motion.div
        className="absolute bottom-20 left-10 w-32 h-32 bg-white/5 rounded-full blur-3xl pointer-events-none"
        variants={floatingVariants}
        animate="float"
        style={{ animationDelay: '2s' }}
      />

      {/* Rotating Shape */}
      <motion.div
        className="absolute bottom-0 right-0 w-96 h-96 opacity-10 pointer-events-none"
        variants={decorativeVariants}
        animate="rotate"
      >
        <svg
          viewBox="0 0 200 200"
          className="w-full h-full"
          fill="none"
          stroke="white"
          strokeWidth="1"
        >
          <circle cx="100" cy="100" r="80" />
          <circle cx="100" cy="100" r="60" />
          <circle cx="100" cy="100" r="40" />
          <path d="M100 20 L180 100 L100 180 L20 100 Z" />
        </svg>
      </motion.div>

      {/* Main Content */}
      <motion.div
        className="max-w-2xl mx-auto text-center relative z-10"
        variants={containerVariants}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, margin: '-100px' }}
      >
        {/* Headline */}
        <motion.h2
          className="text-4xl md:text-5xl lg:text-6xl font-bold text-white mb-4"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: true, margin: '-100px' }}
        >
          Ready to Transform Your Fitness?
        </motion.h2>

        {/* Subheading */}
        <motion.p
          className="text-lg md:text-xl text-white/90 mb-8"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.1 }}
          viewport={{ once: true, margin: '-100px' }}
        >
          Join thousands of people achieving their fitness goals. Start your free 14-day trial today.
        </motion.p>

        {/* Email Form */}
        <motion.form
          onSubmit={handleSubmit}
          className="relative mb-6"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.2 }}
          viewport={{ once: true, margin: '-100px' }}
        >
          <div className="flex flex-col md:flex-row gap-4 md:gap-0">
            {/* Email Input */}
            <div className="flex-1 relative">
              <Mail className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-neutral-500" />
              <input
                type="email"
                placeholder="Enter your email"
                value={email}
                onChange={(e) => {
                  setEmail(e.target.value)
                  setError('')
                }}
                className={`w-full pl-12 pr-4 py-4 rounded-lg md:rounded-l-lg md:rounded-r-none bg-white text-neutral-900 placeholder-neutral-500 focus:outline-none focus:ring-2 focus:ring-primary-400 focus:ring-offset-2 focus:ring-offset-primary-600 transition-all ${
                  error ? 'ring-2 ring-red-400' : ''
                }`}
              />
            </div>

            {/* Submit Button */}
            <motion.button
              type="submit"
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className="bg-white hover:bg-neutral-100 text-primary-600 font-bold py-4 px-6 md:px-8 rounded-lg md:rounded-l-none md:rounded-r-lg transition-colors flex items-center justify-center gap-2"
            >
              Get Started
              <ArrowRight className="w-5 h-5" />
            </motion.button>
          </div>

          {/* Error Message */}
          <AnimatePresence mode="wait">
            {error && (
              <motion.div
                className="mt-3 text-red-200 text-sm font-medium"
                initial={{ opacity: 0, y: -10 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -10 }}
                transition={{ duration: 0.2 }}
              >
                {error}
              </motion.div>
            )}
          </AnimatePresence>
        </motion.form>

        {/* Success Message */}
        <AnimatePresence mode="wait">
          {isSubmitted && (
            <motion.div
              className="bg-white/20 backdrop-blur-sm border border-white/30 rounded-lg p-4 flex items-center justify-center gap-3"
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.9 }}
              transition={{ duration: 0.3 }}
            >
              <CheckCircle className="w-5 h-5 text-white flex-shrink-0" />
              <p className="text-white font-medium">
                Great! Check your email to start your free trial.
              </p>
            </motion.div>
          )}
        </AnimatePresence>

        {/* Privacy Notice */}
        <motion.p
          className="text-white/70 text-sm mt-6"
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          transition={{ duration: 0.6, delay: 0.3 }}
          viewport={{ once: true, margin: '-100px' }}
        >
          We respect your privacy. No spam, unsubscribe at any time.
        </motion.p>
      </motion.div>
    </section>
  )
}
