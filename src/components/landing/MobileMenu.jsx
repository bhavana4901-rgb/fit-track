import { Link } from 'react-router-dom'
import { AnimatePresence, motion } from 'framer-motion'
import Button from '../ui/Button'

/**
 * Premium mobile menu drawer with Framer Motion animations
 * - Smooth slide-in animation
 * - Backdrop overlay with blur
 * - Navigation links and auth buttons
 * - Mobile-only component
 */
export default function MobileMenu({ isOpen, onClose }) {
  const navLinks = [
    { label: 'Features', href: '#features' },
    { label: 'Testimonials', href: '#testimonials' },
    { label: 'Pricing', href: '#pricing' },
  ]

  return (
    <AnimatePresence>
      {isOpen && (
        <>
          {/* Backdrop Overlay */}
          <motion.div
            key="backdrop"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.2 }}
            onClick={onClose}
            className="fixed inset-0 bg-black/40 backdrop-blur-sm z-40 md:hidden"
          />

          {/* Menu Drawer */}
          <motion.div
            key="menu"
            initial={{ x: '100%', opacity: 0 }}
            animate={{ x: 0, opacity: 1 }}
            exit={{ x: '100%', opacity: 0 }}
            transition={{ duration: 0.3, ease: 'easeInOut' }}
            className="fixed right-0 top-0 h-full w-full max-w-[min(100%,20rem)] sm:w-72 bg-white dark:bg-neutral-950 z-50 md:hidden border-l border-neutral-200 dark:border-neutral-800 shadow-sm"
          >
            {/* Menu Content */}
            <div className="h-full flex flex-col">
              {/* Header */}
              <div className="px-6 py-6 border-b border-neutral-200 dark:border-neutral-800">
                <h2 className="text-lg font-bold text-neutral-900 dark:text-white">
                  Menu
                </h2>
              </div>

              {/* Navigation Links */}
              <div className="flex-1 overflow-y-auto px-6 py-4">
                <nav className="space-y-1">
                  {navLinks.map((link, index) => (
                    <motion.a
                      key={link.label}
                      href={link.href}
                      initial={{ opacity: 0, x: 20 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ delay: index * 0.05, duration: 0.2 }}
                      onClick={onClose}
                      className="block px-4 py-3 text-base font-medium text-neutral-700 dark:text-neutral-300 hover:text-primary-600 dark:hover:text-primary-400 hover:bg-neutral-50 dark:hover:bg-neutral-900 rounded-lg transition-all duration-200"
                    >
                      {link.label}
                    </motion.a>
                  ))}
                </nav>
              </div>

              {/* Auth Buttons */}
              <div className="border-t border-neutral-200 dark:border-neutral-800 px-6 py-4 space-y-3">
                <motion.div
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.15, duration: 0.2 }}
                >
                  <Link to="/login" onClick={onClose} className="block">
                    <Button variant="outline" size="md" className="w-full">
                      Login
                    </Button>
                  </Link>
                </motion.div>

                <motion.div
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.2, duration: 0.2 }}
                >
                  <Link to="/register" onClick={onClose} className="block">
                    <Button variant="primary" size="md" className="w-full">
                      Get Started
                    </Button>
                  </Link>
                </motion.div>
              </div>
            </div>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  )
}
