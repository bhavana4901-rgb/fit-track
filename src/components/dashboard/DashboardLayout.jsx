import { useState, useContext, useEffect } from 'react'
import { useLocation, useNavigate } from 'react-router-dom'
import { motion, AnimatePresence } from 'framer-motion'
import { Menu, X, LayoutDashboard, Dumbbell, Apple, TrendingUp, Settings, LogOut, ChevronDown, Moon, Sun } from 'lucide-react'
import { AuthContext } from '../../contexts/AuthContext'
import { useTheme } from '../../hooks/useTheme'
import DashboardAmbientBackground from './DashboardAmbientBackground'

const navigationItems = [
  { id: 'dashboard', label: 'Dashboard', icon: LayoutDashboard, href: '/dashboard' },
  { id: 'workouts', label: 'Workouts', icon: Dumbbell, href: '/workouts' },
  { id: 'nutrition', label: 'Nutrition', icon: Apple, href: '/nutrition' },
  { id: 'progress', label: 'Progress', icon: TrendingUp, href: '/progress' },
  { id: 'settings', label: 'Settings', icon: Settings, href: '/settings' },
]

export default function DashboardLayout({ children }) {
  const [sidebarOpen, setSidebarOpen] = useState(true)
  const [profileMenuOpen, setProfileMenuOpen] = useState(false)
  const { user, logout } = useContext(AuthContext)
  const { isDark, toggleTheme } = useTheme()
  const navigate = useNavigate()
  const location = useLocation()

  useEffect(() => {
    const handleEscape = (e) => {
      if (e.key === 'Escape') setProfileMenuOpen(false)
    }
    if (profileMenuOpen) {
      document.addEventListener('keydown', handleEscape)
      return () => document.removeEventListener('keydown', handleEscape)
    }
  }, [profileMenuOpen])

  const handleLogout = () => {
    const confirmed = window.confirm('Are you sure you want to logout?')
    if (confirmed) {
      logout()
      navigate('/login')
    }
  }

  const isActive = (href) => location.pathname === href

  return (
    <div className="flex h-screen bg-neutral-50 dark:bg-neutral-950 transition-colors duration-300">
      {/* Desktop Sidebar */}
      <motion.aside
        id="main-sidebar"
        role="navigation"
        aria-label="Main navigation sidebar"
        initial={false}
        animate={{ width: sidebarOpen ? 256 : 80 }}
        transition={{ duration: 0.3, ease: 'easeInOut' }}
        className="hidden md:flex flex-col bg-white/95 dark:bg-neutral-900/95 backdrop-blur-xl border-r border-neutral-200/80 dark:border-neutral-800/80 shadow-sm"
      >
        {/* Logo Section */}
        <motion.div
          className="p-4 border-b border-neutral-200 dark:border-neutral-800"
          animate={{ justifyContent: sidebarOpen ? 'flex-start' : 'center' }}
        >
          <motion.div
            animate={{ scale: sidebarOpen ? 1 : 0.8 }}
            className="flex items-center gap-3"
          >
            <div className="w-9 h-9 bg-gradient-to-br from-primary-600 to-secondary-600 rounded-xl flex items-center justify-center shadow-md shadow-primary-500/20">
              <span className="text-white font-bold text-sm">F</span>
            </div>
            {sidebarOpen && (
              <motion.h1
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                transition={{ delay: 0.1 }}
                className="font-bold text-lg text-neutral-900 dark:text-white whitespace-nowrap"
              >
                FitTrack
              </motion.h1>
            )}
          </motion.div>
        </motion.div>

        {/* Navigation */}
        <nav className="flex-1 p-4 space-y-2 overflow-y-auto">
          {navigationItems.map((item) => {
            const Icon = item.icon
            const active = isActive(item.href)
            return (
              <motion.button
                key={item.id}
                onClick={() => navigate(item.href)}
                whileHover={{ x: 4 }}
                whileTap={{ scale: 0.98 }}
                aria-label={`Navigate to ${item.label}`}
                aria-current={active ? 'page' : undefined}
                className={`w-full flex items-center gap-3 px-4 py-3 rounded-xl transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-primary-500 focus:ring-offset-2 dark:focus:ring-offset-neutral-900 ${
                  active
                    ? 'bg-gradient-to-r from-primary-50 to-primary-100/80 dark:from-primary-950/40 dark:to-primary-900/20 text-primary-700 dark:text-primary-300 shadow-sm border border-primary-100 dark:border-primary-900/50'
                    : 'text-neutral-600 dark:text-neutral-400 hover:bg-neutral-100/80 dark:hover:bg-neutral-800/80'
                }`}
              >
                <Icon className="w-5 h-5 flex-shrink-0" />
                {sidebarOpen && (
                  <motion.span
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    exit={{ opacity: 0 }}
                    transition={{ delay: 0.1 }}
                    className="font-medium text-sm whitespace-nowrap"
                  >
                    {item.label}
                  </motion.span>
                )}
              </motion.button>
            )
          })}
        </nav>

        {/* User Profile Section */}
        <motion.div
          className="p-4 border-t border-neutral-200 dark:border-neutral-800 space-y-2"
          animate={{ justifyContent: sidebarOpen ? 'flex-start' : 'center' }}
        >
          <div className="relative">
            <motion.button
              onClick={() => setProfileMenuOpen(!profileMenuOpen)}
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
              aria-label="User profile menu"
              aria-expanded={profileMenuOpen}
              className="w-full flex items-center gap-3 px-4 py-3 rounded-lg hover:bg-neutral-100 dark:hover:bg-neutral-800 transition-colors focus:outline-none focus:ring-2 focus:ring-primary-500 focus:ring-offset-2 dark:focus:ring-offset-neutral-900"
            >
              <div className="w-8 h-8 bg-gradient-to-br from-primary-400 to-secondary-400 rounded-full flex items-center justify-center text-white font-bold text-sm flex-shrink-0">
                {user?.name?.charAt(0) || 'U'}
              </div>
              {sidebarOpen && (
                <motion.div
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  exit={{ opacity: 0 }}
                  transition={{ delay: 0.1 }}
                  className="flex-1 text-left"
                >
                  <p className="font-medium text-sm text-neutral-900 dark:text-white truncate">
                    {user?.name || 'User'}
                  </p>
                  <p className="text-xs text-neutral-500 dark:text-neutral-400 truncate">
                    {user?.email || 'user@example.com'}
                  </p>
                </motion.div>
              )}
              {sidebarOpen && (
                <motion.div
                  animate={{ rotate: profileMenuOpen ? 180 : 0 }}
                  transition={{ duration: 0.2 }}
                >
                  <ChevronDown className="w-4 h-4 text-neutral-400" />
                </motion.div>
              )}
            </motion.button>

            {/* Profile Dropdown Menu */}
            <AnimatePresence>
              {profileMenuOpen && sidebarOpen && (
                <motion.div
                  initial={{ opacity: 0, y: -10 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -10 }}
                  transition={{ duration: 0.2 }}
                  className="absolute bottom-full left-0 right-0 mb-2 bg-white dark:bg-neutral-800 rounded-lg shadow-lg border border-neutral-200 dark:border-neutral-700 z-50"
                >
                  <button
                    onClick={handleLogout}
                    aria-label="Logout from your account"
                    className="w-full flex items-center gap-3 px-4 py-3 text-error-600 dark:text-error-400 hover:bg-error-50 dark:hover:bg-error-950/20 rounded-lg transition-colors focus:outline-none focus:ring-2 focus:ring-error-500 focus:ring-offset-2 dark:focus:ring-offset-neutral-800"
                  >
                    <LogOut className="w-4 h-4" />
                    <span className="text-sm font-medium">Logout</span>
                  </button>
                </motion.div>
              )}
            </AnimatePresence>
          </div>

          {sidebarOpen && (
            <motion.button
              onClick={handleLogout}
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
              aria-label="Logout from your account"
              className="w-full flex items-center justify-center gap-2 px-4 py-2 bg-error-50 dark:bg-error-950/20 text-error-600 dark:text-error-400 rounded-lg hover:bg-error-100 dark:hover:bg-error-950/40 transition-colors text-sm font-medium focus:outline-none focus:ring-2 focus:ring-error-500 focus:ring-offset-2 dark:focus:ring-offset-neutral-900"
            >
              <LogOut className="w-4 h-4" />
              <span>Logout</span>
            </motion.button>
          )}
        </motion.div>

        {/* Theme Toggle & Collapse */}
        <motion.div className="p-4 border-t border-neutral-200 dark:border-neutral-800 space-y-2">
          <motion.button
            onClick={toggleTheme}
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            aria-label={isDark ? 'Switch to light mode' : 'Switch to dark mode'}
            className="w-full flex items-center justify-center gap-2 p-2 hover:bg-neutral-100 dark:hover:bg-neutral-800 rounded-lg transition-colors duration-300 focus:outline-none focus:ring-2 focus:ring-primary-500 focus:ring-offset-2 dark:focus:ring-offset-neutral-900"
            title={isDark ? 'Light mode' : 'Dark mode'}
          >
            {isDark ? (
              <Sun className="w-5 h-5 text-yellow-500" />
            ) : (
              <Moon className="w-5 h-5 text-neutral-600 dark:text-neutral-400" />
            )}
            {sidebarOpen && (
              <span className="text-sm font-medium text-neutral-600 dark:text-neutral-400">
                {isDark ? 'Light mode' : 'Dark mode'}
              </span>
            )}
          </motion.button>
          <motion.button
            onClick={() => setSidebarOpen(!sidebarOpen)}
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            aria-label={sidebarOpen ? 'Collapse sidebar' : 'Expand sidebar'}
            aria-controls="main-sidebar"
            className="w-full flex items-center justify-center p-2 hover:bg-neutral-100 dark:hover:bg-neutral-800 rounded-lg transition-colors focus:outline-none focus:ring-2 focus:ring-primary-500 focus:ring-offset-2 dark:focus:ring-offset-neutral-900"
            title={sidebarOpen ? 'Collapse sidebar' : 'Expand sidebar'}
          >
            {sidebarOpen ? (
              <X className="w-5 h-5 text-neutral-600 dark:text-neutral-400" />
            ) : (
              <Menu className="w-5 h-5 text-neutral-600 dark:text-neutral-400" />
            )}
          </motion.button>
        </motion.div>
      </motion.aside>

      {/* Main Content */}
      <main className="flex-1 flex flex-col overflow-hidden">
        {/* Mobile Header with Sidebar Toggle */}
        <motion.header className="md:hidden flex items-center justify-between p-4 bg-white dark:bg-neutral-900 border-b border-neutral-200 dark:border-neutral-800 shadow-sm">
          <h1 className="font-bold text-lg text-neutral-900 dark:text-white">FitTrack</h1>
          <div className="flex items-center gap-2">
            <button
              onClick={toggleTheme}
              aria-label={isDark ? 'Switch to light mode' : 'Switch to dark mode'}
              className="p-2 min-w-[44px] min-h-[44px] flex items-center justify-center hover:bg-neutral-100 dark:hover:bg-neutral-800 rounded-lg transition-colors duration-300 focus:outline-none focus:ring-2 focus:ring-primary-500 focus:ring-offset-2 dark:focus:ring-offset-neutral-900"
              title={isDark ? 'Light mode' : 'Dark mode'}
            >
              {isDark ? (
                <Sun className="w-5 h-5 text-yellow-500" />
              ) : (
                <Moon className="w-5 h-5 text-neutral-600 dark:text-neutral-400" />
              )}
            </button>
            <button
              onClick={handleLogout}
              aria-label="Logout from your account"
              className="p-2 min-w-[44px] min-h-[44px] flex items-center justify-center hover:bg-neutral-100 dark:hover:bg-neutral-800 rounded-lg transition-colors focus:outline-none focus:ring-2 focus:ring-error-500 focus:ring-offset-2 dark:focus:ring-offset-neutral-900"
              title="Logout"
            >
              <LogOut className="w-5 h-5 text-neutral-600 dark:text-neutral-400" />
            </button>
          </div>
        </motion.header>

        {/* Content Scroll Area */}
        <div className="relative flex-1 overflow-y-auto bg-gradient-to-br from-neutral-50 via-white to-primary-50/25 dark:from-neutral-950 dark:via-neutral-950 dark:to-primary-950/15">
          <DashboardAmbientBackground />
          <div className="relative z-[1]">{children}</div>
        </div>

        {/* Mobile Bottom Tab Bar */}
        <motion.nav role="navigation" aria-label="Mobile navigation" className="md:hidden flex items-center justify-around bg-white/95 dark:bg-neutral-900/95 backdrop-blur-xl border-t border-neutral-200/80 dark:border-neutral-800/80 shadow-lg">
          {navigationItems.map((item) => {
            const Icon = item.icon
            const active = isActive(item.href)
            return (
              <motion.button
                key={item.id}
                onClick={() => navigate(item.href)}
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                aria-label={`Navigate to ${item.label}`}
                aria-current={active ? 'page' : undefined}
                className={`flex-1 flex flex-col items-center justify-center gap-1 py-3 transition-colors focus:outline-none focus:ring-2 focus:ring-primary-500 focus:ring-inset relative ${
                  active
                    ? 'text-primary-600 dark:text-primary-400'
                    : 'text-neutral-600 dark:text-neutral-400 hover:text-neutral-900 dark:hover:text-neutral-200'
                }`}
              >
                <span className="relative">
                  <Icon className="w-6 h-6" />
                  {active && (
                    <motion.span
                      layoutId="mobile-tab-indicator"
                      className="absolute -bottom-1 left-1/2 -translate-x-1/2 w-1 h-1 rounded-full bg-primary-500"
                    />
                  )}
                </span>
                <span className="text-xs font-medium">{item.label}</span>
              </motion.button>
            )
          })}
        </motion.nav>
      </main>
    </div>
  )
}
