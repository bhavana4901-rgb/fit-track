import { useContext, useMemo } from 'react'
import { useNavigate } from 'react-router-dom'
import { motion } from 'framer-motion'
import { LogOut, Settings } from 'lucide-react'
import { AuthContext } from '../../contexts/AuthContext'

export default function DashboardHeader() {
  const { user, logout } = useContext(AuthContext)
  const navigate = useNavigate()

  const handleLogout = () => {
    const confirmed = window.confirm('Are you sure you want to logout?')
    if (confirmed) {
      logout()
      navigate('/login')
    }
  }

  const handleSettings = () => {
    navigate('/settings')
  }

  // Get current date and greeting
  const currentDate = useMemo(() => {
    const today = new Date()
    const options = { weekday: 'long', month: 'long', day: 'numeric' }
    return today.toLocaleDateString('en-US', options)
  }, [])

  // Get greeting based on time of day
  const getGreeting = () => {
    const hour = new Date().getHours()
    if (hour < 12) return 'Good morning'
    if (hour < 18) return 'Good afternoon'
    return 'Good evening'
  }

  // Get user's first initial for avatar
  const userInitial = user?.name?.charAt(0).toUpperCase() || 'U'

  const containerVariants = {
    hidden: { opacity: 0, y: -20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.4, ease: 'easeOut' },
    },
  }

  const itemVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: { duration: 0.3, ease: 'easeOut' },
    },
  }

  return (
    <motion.div
      className="flex flex-col gap-6 pb-6 border-b border-neutral-200 dark:border-neutral-700"
      initial="hidden"
      animate="visible"
      variants={containerVariants}
    >
      {/* Top row: Greeting and Action Buttons */}
      <div className="flex items-start justify-between">
        {/* Left side: Greeting and Date */}
        <motion.div
          className="flex-1"
          variants={itemVariants}
        >
          <div className="flex items-center gap-3">
            {/* User Avatar */}
            <motion.div
              className="w-14 h-14 bg-gradient-to-br from-primary-500 to-secondary-500 rounded-full flex items-center justify-center flex-shrink-0"
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              <span className="text-lg font-bold text-white">{userInitial}</span>
            </motion.div>

            {/* Greeting Text */}
            <div>
              <motion.h2
                className="text-2xl md:text-3xl font-bold text-neutral-900 dark:text-white"
                variants={itemVariants}
              >
                {getGreeting()}, {user?.name?.split(' ')[0]}! 👋
              </motion.h2>
              <motion.p
                className="text-sm md:text-base text-neutral-600 dark:text-neutral-400 mt-1"
                variants={itemVariants}
              >
                {currentDate}
              </motion.p>
            </div>
          </div>
        </motion.div>

        {/* Right side: Action Buttons */}
        <motion.div
          className="flex items-center gap-3"
          variants={itemVariants}
        >
          {/* Settings Button */}
          <motion.button
            onClick={handleSettings}
            aria-label="Go to settings"
            className="p-3 rounded-lg bg-neutral-100 hover:bg-neutral-200 dark:bg-neutral-800 dark:hover:bg-neutral-700 text-neutral-700 dark:text-neutral-300 transition-colors duration-200 focus:outline-none focus:ring-2 focus:ring-primary-500 focus:ring-offset-2 dark:focus:ring-offset-neutral-950"
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            title="Settings"
          >
            <Settings className="w-5 h-5" />
          </motion.button>

          {/* Logout Button */}
          <motion.button
            onClick={handleLogout}
            aria-label="Logout from your account"
            className="p-3 rounded-lg bg-error-100 hover:bg-error-200 dark:bg-error-950/30 dark:hover:bg-error-950/50 text-error-600 dark:text-error-400 transition-colors duration-200 focus:outline-none focus:ring-2 focus:ring-error-500 focus:ring-offset-2 dark:focus:ring-offset-neutral-950"
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            title="Logout"
          >
            <LogOut className="w-5 h-5" />
          </motion.button>
        </motion.div>
      </div>

      {/* User Info Card */}
      <motion.div
        className="p-4 bg-primary-50 dark:bg-primary-950/20 rounded-lg border border-primary-200 dark:border-primary-800"
        variants={itemVariants}
      >
        <div className="flex items-center justify-between">
          <div>
            <p className="text-sm font-medium text-primary-900 dark:text-primary-100">
              {user?.email}
            </p>
            <p className="text-xs text-primary-700 dark:text-primary-300 mt-1">
              Member since {new Date(user?.createdAt || Date.now()).toLocaleDateString('en-US', { year: 'numeric', month: 'short' })}
            </p>
          </div>
          <motion.div
            className="text-right"
            whileHover={{ scale: 1.05 }}
          >
            <p className="text-xs font-semibold text-primary-600 dark:text-primary-400 uppercase tracking-wide">
              Level {Math.floor(Math.random() * 50) + 1}
            </p>
            <p className="text-xs text-primary-600 dark:text-primary-400 mt-1">
              {Math.floor(Math.random() * 100) + 50}% to next
            </p>
          </motion.div>
        </div>
      </motion.div>

      {/* Quick Stats Row */}
      <motion.div
        className="grid grid-cols-3 gap-3 md:gap-4"
        variants={itemVariants}
      >
        {/* Stat: Current Streak */}
        <motion.div
          className="p-3 md:p-4 bg-white dark:bg-neutral-800 rounded-lg border border-neutral-200 dark:border-neutral-700 text-center hover:shadow-md transition-shadow"
          whileHover={{ y: -2 }}
        >
          <p className="text-2xl md:text-3xl font-bold text-accent-600 dark:text-accent-400">
            0
          </p>
          <p className="text-xs md:text-sm text-neutral-600 dark:text-neutral-400 mt-1">
            Streak
          </p>
        </motion.div>

        {/* Stat: Weekly Goal */}
        <motion.div
          className="p-3 md:p-4 bg-white dark:bg-neutral-800 rounded-lg border border-neutral-200 dark:border-neutral-700 text-center hover:shadow-md transition-shadow"
          whileHover={{ y: -2 }}
        >
          <p className="text-2xl md:text-3xl font-bold text-primary-600 dark:text-primary-400">
            0%
          </p>
          <p className="text-xs md:text-sm text-neutral-600 dark:text-neutral-400 mt-1">
            Goal
          </p>
        </motion.div>

        {/* Stat: Total Points */}
        <motion.div
          className="p-3 md:p-4 bg-white dark:bg-neutral-800 rounded-lg border border-neutral-200 dark:border-neutral-700 text-center hover:shadow-md transition-shadow"
          whileHover={{ y: -2 }}
        >
          <p className="text-2xl md:text-3xl font-bold text-secondary-600 dark:text-secondary-400">
            0
          </p>
          <p className="text-xs md:text-sm text-neutral-600 dark:text-neutral-400 mt-1">
            Points
          </p>
        </motion.div>
      </motion.div>
    </motion.div>
  )
}
