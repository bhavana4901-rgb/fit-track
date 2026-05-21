import { useContext, useMemo } from 'react'
import { useNavigate } from 'react-router-dom'
import { motion } from 'framer-motion'
import { LogOut, Settings, Home } from 'lucide-react'
import { AuthContext } from '../../contexts/AuthContext'
import { dashboardCard, dashboardCardPadding } from './dashboardStyles'
import { dashboardItem } from './dashboardMotion'

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

  const handleGoHome = () => {
    navigate('/')
  }

  const currentDate = useMemo(() => {
    const today = new Date()
    const options = { weekday: 'long', month: 'long', day: 'numeric' }
    return today.toLocaleDateString('en-US', options)
  }, [])

  const getGreeting = () => {
    const hour = new Date().getHours()
    if (hour < 12) return 'Good morning'
    if (hour < 18) return 'Good afternoon'
    return 'Good evening'
  }

  const userInitial = user?.name?.charAt(0).toUpperCase() || 'U'

  return (
    <motion.div
      variants={dashboardItem}
      className={`${dashboardCard} ${dashboardCardPadding} overflow-hidden relative`}
    >
      <div className="absolute top-0 left-0 right-0 h-1 bg-gradient-to-r from-primary-500 via-secondary-500 to-accent-500" />

      <div className="flex flex-col gap-6">
        <div className="flex items-start justify-between gap-4">
          <div className="flex items-center gap-3 sm:gap-4 min-w-0">
            <motion.div
              className="w-12 h-12 sm:w-14 sm:h-14 rounded-2xl flex items-center justify-center flex-shrink-0 shadow-lg ring-2 ring-white/50 dark:ring-neutral-800/50 overflow-hidden"
              whileHover={{ scale: 1.04, rotate: 2 }}
              whileTap={{ scale: 0.98 }}
            >
              {user?.avatar ? (
                <img 
                  src={user.avatar} 
                  alt={user.name || 'User'} 
                  className="w-full h-full object-cover"
                />
              ) : (
                <div className="w-full h-full bg-gradient-to-br from-primary-500 to-secondary-500 flex items-center justify-center">
                  <span className="text-lg font-bold text-white">{userInitial}</span>
                </div>
              )}
            </motion.div>

            <div className="min-w-0">
              <h2 className="text-xl sm:text-2xl md:text-3xl font-bold text-neutral-900 dark:text-white tracking-tight truncate">
                {getGreeting()}, {user?.name?.split(' ')[0]}! 👋
              </h2>
              <p className="text-sm text-neutral-600 dark:text-neutral-400 mt-1">
                {currentDate}
              </p>
            </div>
          </div>

          <div className="flex items-center gap-2 shrink-0">
            <motion.button
              onClick={handleGoHome}
              aria-label="Go to home page"
              className="p-2.5 sm:p-3 rounded-xl border border-neutral-200/80 dark:border-neutral-700 bg-neutral-50/80 dark:bg-neutral-800/80 text-neutral-700 dark:text-neutral-300 hover:border-primary-200 dark:hover:border-primary-800 hover:bg-primary-50/50 dark:hover:bg-primary-950/30 transition-colors duration-200 focus:outline-none focus:ring-2 focus:ring-primary-500 focus:ring-offset-2 dark:focus:ring-offset-neutral-950"
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              title="Go to Home"
            >
              <Home className="w-5 h-5" />
            </motion.button>

            <motion.button
              onClick={handleSettings}
              aria-label="Go to settings"
              className="p-2.5 sm:p-3 rounded-xl border border-neutral-200/80 dark:border-neutral-700 bg-neutral-50/80 dark:bg-neutral-800/80 text-neutral-700 dark:text-neutral-300 hover:border-primary-200 dark:hover:border-primary-800 hover:bg-primary-50/50 dark:hover:bg-primary-950/30 transition-colors duration-200 focus:outline-none focus:ring-2 focus:ring-primary-500 focus:ring-offset-2 dark:focus:ring-offset-neutral-950"
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              title="Settings"
            >
              <Settings className="w-5 h-5" />
            </motion.button>

            <motion.button
              onClick={handleLogout}
              aria-label="Logout from your account"
              className="p-2.5 sm:p-3 rounded-xl border border-error-200/80 dark:border-error-900/50 bg-error-50/80 dark:bg-error-950/30 text-error-600 dark:text-error-400 hover:bg-error-100/80 dark:hover:bg-error-950/50 transition-colors duration-200 focus:outline-none focus:ring-2 focus:ring-error-500 focus:ring-offset-2 dark:focus:ring-offset-neutral-950"
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              title="Logout"
            >
              <LogOut className="w-5 h-5" />
            </motion.button>
          </div>
        </div>

        <motion.div
          className="p-4 rounded-xl bg-gradient-to-r from-primary-50/90 to-secondary-50/50 dark:from-primary-950/30 dark:to-secondary-950/20 border border-primary-100 dark:border-primary-900/50"
          whileHover={{ y: -1 }}
          transition={{ duration: 0.2 }}
        >
          <div className="flex items-center justify-between gap-4">
            <div className="min-w-0">
              <p className="text-sm font-medium text-primary-900 dark:text-primary-100 truncate">
                {user?.email}
              </p>
              <p className="text-xs text-primary-700 dark:text-primary-300 mt-1">
                Member since {new Date(user?.createdAt || Date.now()).toLocaleDateString('en-US', { year: 'numeric', month: 'short' })}
              </p>
            </div>
            <div className="text-right shrink-0">
              <p className="text-xs font-semibold text-primary-600 dark:text-primary-400 uppercase tracking-wide">
                Level {Math.floor(Math.random() * 50) + 1}
              </p>
              <p className="text-xs text-primary-600 dark:text-primary-400 mt-1">
                {Math.floor(Math.random() * 100) + 50}% to next
              </p>
            </div>
          </div>
        </motion.div>

        <div className="grid grid-cols-3 gap-3">
          <motion.div
            className="p-3 md:p-4 rounded-xl border border-neutral-200/80 dark:border-neutral-700/80 bg-neutral-50/50 dark:bg-neutral-800/50 text-center"
            whileHover={{ y: -2, scale: 1.01 }}
            transition={{ duration: 0.2 }}
          >
            <p className="text-2xl md:text-3xl font-bold text-accent-600 dark:text-accent-400">0</p>
            <p className="text-xs md:text-sm text-neutral-600 dark:text-neutral-400 mt-1">Streak</p>
          </motion.div>
          <motion.div
            className="p-3 md:p-4 rounded-xl border border-neutral-200/80 dark:border-neutral-700/80 bg-neutral-50/50 dark:bg-neutral-800/50 text-center"
            whileHover={{ y: -2, scale: 1.01 }}
            transition={{ duration: 0.2 }}
          >
            <p className="text-2xl md:text-3xl font-bold text-primary-600 dark:text-primary-400">0%</p>
            <p className="text-xs md:text-sm text-neutral-600 dark:text-neutral-400 mt-1">Goal</p>
          </motion.div>
          <motion.div
            className="p-3 md:p-4 rounded-xl border border-neutral-200/80 dark:border-neutral-700/80 bg-neutral-50/50 dark:bg-neutral-800/50 text-center"
            whileHover={{ y: -2, scale: 1.01 }}
            transition={{ duration: 0.2 }}
          >
            <p className="text-2xl md:text-3xl font-bold text-secondary-600 dark:text-secondary-400">0</p>
            <p className="text-xs md:text-sm text-neutral-600 dark:text-neutral-400 mt-1">Points</p>
          </motion.div>
        </div>
      </div>
    </motion.div>
  )
}
