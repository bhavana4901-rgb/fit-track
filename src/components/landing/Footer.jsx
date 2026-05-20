import { useState } from 'react'
import { motion } from 'framer-motion'
import { Mail, Share2, Heart, Globe, ArrowRight } from 'lucide-react'

const navigationLinks = {
  product: [
    { name: 'Features', href: '#features' },
    { name: 'Pricing', href: '#pricing' },
    { name: 'Security', href: '#' },
    { name: 'Updates', href: '#' }
  ],
  company: [
    { name: 'About', href: '#' },
    { name: 'Blog', href: '#' },
    { name: 'Careers', href: '#' },
    { name: 'Contact', href: '#' }
  ],
  resources: [
    { name: 'Documentation', href: '#' },
    { name: 'Help Center', href: '#' },
    { name: 'Community', href: '#' },
    { name: 'API', href: '#' }
  ],
  legal: [
    { name: 'Privacy', href: '#' },
    { name: 'Terms', href: '#' },
    { name: 'Cookies', href: '#' },
    { name: 'Compliance', href: '#' }
  ]
}

const socialLinks = [
  { icon: Share2, label: 'Twitter', href: '#' },
  { icon: Heart, label: 'Instagram', href: '#' },
  { icon: Globe, label: 'Website', href: '#' },
  { icon: Mail, label: 'Email', href: '#' }
]

const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.1,
      delayChildren: 0.2
    }
  }
}

const itemVariants = {
  hidden: { opacity: 0, y: 20 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.6, ease: 'easeOut' }
  }
}

const linkHoverVariants = {
  hover: { x: 4, transition: { duration: 0.2 } }
}

const iconHoverVariants = {
  hover: { 
    scale: 1.2, 
    y: -4,
    transition: { duration: 0.2 } 
  }
}

export default function Footer() {
  const [email, setEmail] = useState('')
  const [subscribeStatus, setSubscribeStatus] = useState('idle') // idle, loading, success, error

  const handleSubscribe = (e) => {
    e.preventDefault()
    if (!email) return

    setSubscribeStatus('loading')
    setTimeout(() => {
      setSubscribeStatus('success')
      setEmail('')
      setTimeout(() => setSubscribeStatus('idle'), 3000)
    }, 1000)
  }

  return (
    <footer className="bg-neutral-950 text-neutral-300 dark:bg-black dark:text-neutral-400 pt-20 pb-8 px-4 md:px-8 lg:px-16 border-t border-neutral-800">
      <div className="max-w-7xl mx-auto">
        {/* Main Footer Content */}
        <motion.div
          className="grid grid-cols-2 md:grid-cols-4 gap-8 md:gap-12 mb-16"
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: '-100px' }}
        >
          {/* Brand Section */}
          <motion.div variants={itemVariants} className="col-span-2 md:col-span-1">
            <div className="flex items-center gap-2 mb-6">
              <div className="w-10 h-10 rounded-lg bg-gradient-to-br from-primary-600 to-secondary-600 flex items-center justify-center text-white font-bold text-lg">
                F
              </div>
              <span className="text-xl font-bold text-white">FitTrack</span>
            </div>
            <p className="text-sm text-neutral-400 dark:text-neutral-500 mb-6 max-w-xs">
              Transform your fitness journey with AI-powered analytics and community support.
            </p>
            <div className="flex gap-4">
              {socialLinks.map(({ icon: Icon, label, href }) => (
                <motion.a
                  key={label}
                  href={href}
                  aria-label={label}
                  className="w-9 h-9 rounded-lg bg-neutral-800 dark:bg-neutral-900 flex items-center justify-center hover:bg-primary-600 transition-colors"
                  whileHover="hover"
                  variants={iconHoverVariants}
                >
                  <Icon className="w-4 h-4" />
                </motion.a>
              ))}
            </div>
          </motion.div>

          {/* Product Links */}
          <motion.div variants={itemVariants}>
            <h3 className="text-white font-semibold mb-4">Product</h3>
            <ul className="space-y-3">
              {navigationLinks.product.map((link) => (
                <li key={link.name}>
                  <motion.a
                    href={link.href}
                    className="text-sm hover:text-white transition-colors flex items-center gap-2"
                    whileHover="hover"
                    variants={linkHoverVariants}
                  >
                    <span>{link.name}</span>
                  </motion.a>
                </li>
              ))}
            </ul>
          </motion.div>

          {/* Company Links */}
          <motion.div variants={itemVariants}>
            <h3 className="text-white font-semibold mb-4">Company</h3>
            <ul className="space-y-3">
              {navigationLinks.company.map((link) => (
                <li key={link.name}>
                  <motion.a
                    href={link.href}
                    className="text-sm hover:text-white transition-colors flex items-center gap-2"
                    whileHover="hover"
                    variants={linkHoverVariants}
                  >
                    <span>{link.name}</span>
                  </motion.a>
                </li>
              ))}
            </ul>
          </motion.div>

          {/* Resources Links */}
          <motion.div variants={itemVariants}>
            <h3 className="text-white font-semibold mb-4">Resources</h3>
            <ul className="space-y-3">
              {navigationLinks.resources.map((link) => (
                <li key={link.name}>
                  <motion.a
                    href={link.href}
                    className="text-sm hover:text-white transition-colors flex items-center gap-2"
                    whileHover="hover"
                    variants={linkHoverVariants}
                  >
                    <span>{link.name}</span>
                  </motion.a>
                </li>
              ))}
            </ul>
          </motion.div>

          {/* Legal Links */}
          <motion.div variants={itemVariants} className="col-span-2 md:col-span-1">
            <h3 className="text-white font-semibold mb-4">Legal</h3>
            <ul className="space-y-3">
              {navigationLinks.legal.map((link) => (
                <li key={link.name}>
                  <motion.a
                    href={link.href}
                    className="text-sm hover:text-white transition-colors flex items-center gap-2"
                    whileHover="hover"
                    variants={linkHoverVariants}
                  >
                    <span>{link.name}</span>
                  </motion.a>
                </li>
              ))}
            </ul>
          </motion.div>
        </motion.div>

        {/* Newsletter Section */}
        <motion.div
          className="bg-gradient-to-r from-neutral-900 to-neutral-800 dark:from-neutral-900 dark:to-black border border-neutral-800 rounded-xl p-8 md:p-12 mb-16"
          variants={itemVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: '-100px' }}
        >
          <div className="grid md:grid-cols-2 gap-8 items-center">
            <div>
              <h3 className="text-white text-xl md:text-2xl font-bold mb-2">
                Stay Updated
              </h3>
              <p className="text-neutral-400">
                Get weekly tips, fitness insights, and exclusive offers delivered to your inbox.
              </p>
            </div>
            <form onSubmit={handleSubscribe} className="flex gap-2">
              <div className="flex-1 relative">
                <Mail className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-neutral-500" />
                <input
                  type="email"
                  placeholder="Enter your email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="w-full pl-10 pr-4 py-3 rounded-lg bg-neutral-800 dark:bg-neutral-900 text-white placeholder-neutral-500 focus:outline-none focus:ring-2 focus:ring-primary-500 transition-all"
                />
              </div>
              <motion.button
                type="submit"
                disabled={subscribeStatus === 'loading'}
                className="px-6 py-3 bg-gradient-to-r from-primary-600 to-secondary-600 text-white rounded-lg font-semibold hover:from-primary-700 hover:to-secondary-700 disabled:opacity-50 transition-all flex items-center gap-2 whitespace-nowrap"
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
              >
                {subscribeStatus === 'loading' ? (
                  'Subscribing...'
                ) : subscribeStatus === 'success' ? (
                  'Subscribed!'
                ) : (
                  <>
                    Subscribe
                    <ArrowRight className="w-4 h-4" />
                  </>
                )}
              </motion.button>
            </form>
          </div>
        </motion.div>

        {/* Bottom Section */}
        <motion.div
          className="border-t border-neutral-800 pt-8 flex flex-col md:flex-row items-center justify-between gap-4"
          variants={itemVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: '-100px' }}
        >
          <p className="text-sm text-neutral-500">
            © {new Date().getFullYear()} FitTrack. All rights reserved.
          </p>
          <div className="flex items-center gap-6 text-sm">
            <motion.a
              href="#"
              className="text-neutral-400 hover:text-neutral-200 transition-colors"
              whileHover={{ x: 2 }}
            >
              Terms of Service
            </motion.a>
            <motion.a
              href="#"
              className="text-neutral-400 hover:text-neutral-200 transition-colors"
              whileHover={{ x: 2 }}
            >
              Privacy Policy
            </motion.a>
            <motion.a
              href="#"
              className="text-neutral-400 hover:text-neutral-200 transition-colors"
              whileHover={{ x: 2 }}
            >
              Cookie Settings
            </motion.a>
          </div>
        </motion.div>
      </div>
    </footer>
  )
}
