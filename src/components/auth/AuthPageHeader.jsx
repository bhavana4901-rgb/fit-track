import { Link } from 'react-router-dom'
import { motion } from 'framer-motion'
import { ArrowLeft, Moon, Sun } from 'lucide-react'
import { useTheme } from '../../hooks/useTheme'
import { viewTransitionFast } from '../landing/landingMotion'

export default function AuthPageHeader({ backHref = '/', backLabel = 'Back to home' }) {
  const { isDark, toggleTheme } = useTheme()

  return (
    <motion.header
      initial={{ opacity: 0, y: -12 }}
      animate={{ opacity: 1, y: 0 }}
      transition={viewTransitionFast}
      className="relative z-10 flex items-center justify-between px-4 sm:px-6 lg:px-8 py-4 sm:py-5"
    >
      <Link to="/" className="flex items-center gap-2.5 group">
        <div className="w-9 h-9 sm:w-10 sm:h-10 bg-gradient-to-br from-primary-600 to-primary-700 rounded-lg flex items-center justify-center transition-opacity group-hover:opacity-90">
          <span className="text-white font-bold text-lg">F</span>
        </div>
        <span className="font-bold text-lg text-neutral-900 dark:text-white">FitTrack</span>
      </Link>

      <div className="flex items-center gap-2 sm:gap-3">
        <button
          type="button"
          onClick={toggleTheme}
          className="p-2 rounded-lg border border-neutral-200 dark:border-neutral-800 bg-white/70 dark:bg-neutral-900/70 backdrop-blur-sm hover:bg-neutral-50 dark:hover:bg-neutral-800 transition-colors"
          aria-label="Toggle dark mode"
        >
          {isDark ? <Sun className="w-5 h-5 text-warning-500" /> : <Moon className="w-5 h-5 text-neutral-600" />}
        </button>
        <Link
          to={backHref}
          className="hidden sm:inline-flex items-center gap-1.5 text-sm font-medium text-neutral-600 dark:text-neutral-400 hover:text-primary-600 dark:hover:text-primary-400 transition-colors"
        >
          <ArrowLeft className="w-4 h-4" />
          {backLabel}
        </Link>
      </div>
    </motion.header>
  )
}
