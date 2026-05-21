import { useState } from 'react'
import { motion } from 'framer-motion'
import { Mail, ArrowRight, Share2, Heart, Globe, Link2, Home } from 'lucide-react'
import { Link } from 'react-router-dom'
import { fadeUpProps, viewTransitionFast } from './landingMotion'
const navigationLinks = {
  product: [
    { name: 'Features', href: '#features' },
    { name: 'Pricing', href: '#pricing' },
    { name: 'Security', href: '#' },
    { name: 'Updates', href: '#' },
  ],
  company: [
    { name: 'About', href: '#' },
    { name: 'Blog', href: '#' },
    { name: 'Careers', href: '#' },
    { name: 'Contact', href: '#' },
  ],
  resources: [
    { name: 'Documentation', href: '#' },
    { name: 'Help Center', href: '#' },
    { name: 'Community', href: '#' },
    { name: 'API', href: '#' },
  ],
  legal: [
    { name: 'Privacy', href: '#' },
    { name: 'Terms', href: '#' },
    { name: 'Cookies', href: '#' },
  ],
}
const socialLinks = [
  { icon: Share2, label: 'Twitter', href: '#', color: 'hover:text-sky-400' },
  { icon: Heart, label: 'Instagram', href: '#', color: 'hover:text-pink-400' },
  { icon: Link2, label: 'LinkedIn', href: '#', color: 'hover:text-blue-400' },
  { icon: Globe, label: 'Website', href: '#', color: 'hover:text-primary-400' },
]
function FooterLinkColumn({ title, links }) {
  return (
    <div>
      <h3 className="text-white font-semibold mb-4 text-sm uppercase tracking-wider">{title}</h3>
      <ul className="space-y-2.5">
        {links.map((link) => (
          <li key={link.name}>
            <a
              href={link.href}
              className="group text-sm text-neutral-400 hover:text-white transition-colors inline-flex items-center gap-2"
            >
              <span className="w-0 group-hover:w-2 h-px bg-primary-400 transition-all duration-200" />
              {link.name}
            </a>
          </li>
        ))}
      </ul>
    </div>
  )
}
export default function Footer() {
  const [email, setEmail] = useState('')
  const [subscribeStatus, setSubscribeStatus] = useState('idle')
  const handleSubscribe = (e) => {
    e.preventDefault()
    if (!email) return
    setSubscribeStatus('loading')
    setTimeout(() => {
      setSubscribeStatus('success')
      setEmail('')
      setTimeout(() => setSubscribeStatus('idle'), 3000)
    }, 800)
  }
  return (
    <footer className="relative bg-neutral-950 text-neutral-400 overflow-hidden">
      <div className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-primary-500/50 to-transparent" />
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-1/2 h-24 bg-gradient-to-b from-primary-500/5 to-transparent pointer-events-none" />
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-16 md:pt-20 pb-8 relative z-10">
        <motion.div {...fadeUpProps(0)} className="relative -mt-2 mb-16 md:mb-20">
          <div className="relative rounded-xl bg-neutral-900 border border-neutral-800 p-6 md:p-10 overflow-hidden shadow-sm">
            <div className="absolute top-0 right-0 w-48 h-48 bg-primary-500/5 rounded-full blur-2xl pointer-events-none" />
            <div className="relative grid md:grid-cols-2 gap-8 items-center">
              <div>
                <p className="text-primary-400 text-sm font-semibold uppercase tracking-wider mb-2">Newsletter</p>
                <h3 className="text-2xl md:text-3xl font-bold text-white mb-2">Stay in the loop</h3>
                <p className="text-neutral-500 text-sm md:text-base">
                  Weekly fitness tips, product updates, and exclusive offers.
                </p>
              </div>
              <form onSubmit={handleSubscribe} className="flex flex-col sm:flex-row gap-3">
                <div className="flex-1 relative">
                  <Mail className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-neutral-500" />
                  <input
                    type="email"
                    placeholder="your@email.com"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    className="w-full pl-11 pr-4 py-3.5 rounded-xl bg-neutral-950 border border-neutral-700 text-white placeholder-neutral-600 focus:outline-none focus:border-primary-500 focus:ring-1 focus:ring-primary-500 transition-all"
                  />
                </div>
                <motion.button
                  type="submit"
                  disabled={subscribeStatus === 'loading'}
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                  className="px-6 py-3.5 rounded-lg bg-gradient-to-r from-primary-600 to-secondary-600 text-white font-semibold flex items-center justify-center gap-2 whitespace-nowrap disabled:opacity-60 hover:opacity-95 transition-opacity"
                >
                  {subscribeStatus === 'loading' ? '...' : subscribeStatus === 'success' ? 'Subscribed!' : 'Subscribe'}
                  {subscribeStatus === 'idle' && <ArrowRight className="w-4 h-4" />}
                </motion.button>
              </form>
            </div>
          </div>
        </motion.div>
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-6 gap-8 sm:gap-10 md:gap-8 mb-14">
          <motion.div className="sm:col-span-2 md:col-span-2" {...fadeUpProps(0)}>
            <Link to="/" className="inline-flex items-center gap-3 mb-5 group">
              <div className="w-11 h-11 rounded-lg bg-gradient-to-br from-primary-500 to-secondary-500 flex items-center justify-center group-hover:opacity-90 transition-opacity">
                <Home className="w-5 h-5 text-white" />
              </div>
              <span className="text-2xl font-bold text-white">FitTrack</span>
            </Link>
            <p className="text-sm text-neutral-500 max-w-xs leading-relaxed mb-6">
              AI-powered fitness tracking and a community that keeps you accountable.
            </p>
            <div className="flex gap-3">
              {socialLinks.map(({ icon: Icon, label, href, color }) => (
                <motion.a
                  key={label}
                  href={href}
                  aria-label={label}
                  whileHover={{ y: -3, scale: 1.08 }}
                  className={`w-10 h-10 rounded-xl bg-neutral-900 border border-neutral-800 flex items-center justify-center text-neutral-500 ${color} transition-colors`}
                >
                  <Icon className="w-4 h-4" />
                </motion.a>
              ))}
            </div>
          </motion.div>
          <motion.div {...fadeUpProps(0.02)}>
            <FooterLinkColumn title="Product" links={navigationLinks.product} />
          </motion.div>
          <motion.div {...fadeUpProps(0.04)}>
            <FooterLinkColumn title="Company" links={navigationLinks.company} />
          </motion.div>
          <motion.div {...fadeUpProps(0.06)}>
            <FooterLinkColumn title="Resources" links={navigationLinks.resources} />
          </motion.div>
          <motion.div {...fadeUpProps(0.08)}>
            <FooterLinkColumn title="Legal" links={navigationLinks.legal} />
          </motion.div>
        </div>
        <div className="pt-8 border-t border-neutral-800/80 flex flex-col md:flex-row items-center justify-between gap-4">
          <p className="text-sm text-neutral-600">
            © {new Date().getFullYear()} FitTrack. All rights reserved.
          </p>
          <div className="flex flex-wrap items-center justify-center gap-6 text-sm">
            {['Terms', 'Privacy', 'Cookies'].map((item) => (
              <a key={item} href="#" className="text-neutral-500 hover:text-primary-400 transition-colors">
                {item}
              </a>
            ))}
            <span className="flex items-center gap-1.5 px-3 py-1 rounded-full bg-neutral-900 border border-neutral-800 text-xs text-neutral-500">
              <span className="w-1.5 h-1.5 rounded-full bg-success-500" />
              All systems operational
            </span>
          </div>
        </div>
      </div>
    </footer>
  )
}
