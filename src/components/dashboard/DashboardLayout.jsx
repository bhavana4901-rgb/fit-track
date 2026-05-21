import { useState, useContext, useEffect } from 'react'
import { useLocation, useNavigate } from 'react-router-dom'
import { motion, AnimatePresence } from 'framer-motion'
import { Menu, ChevronLeft, ChevronRight, LayoutDashboard, Dumbbell, Apple, TrendingUp, Settings, Moon, Sun } from 'lucide-react'
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
  const { user } = useContext(AuthContext)
  const { isDark, toggleTheme } = useTheme()
  const navigate = useNavigate()
  const location = useLocation()
  const isActive = (href) => location.pathname === href
  return (
    <div className="flex h-screen bg-neutral-50 dark:bg-neutral-950 transition-colors duration-300">
      <motion.aside
        id="main-sidebar"
        role="navigation"
        aria-label="Main navigation sidebar"
        initial={false}
        animate={{ width: sidebarOpen ? 256 : 80 }}
        transition={{ duration: 0.3, ease: 'easeInOut' }}
        className="hidden md:flex flex-col bg-white/95 dark:bg-neutral-900/95 backdrop-blur-xl border-r border-neutral-200/80 dark:border-neutral-800/80 shadow-sm relative"
      >
        <motion.div
          className="p-4 border-b border-neutral-200 dark:border-neutral-800 flex items-center"
          animate={{ justifyContent: sidebarOpen ? 'flex-start' : 'center' }}
        >
          <motion.div
            animate={{ scale: sidebarOpen ? 1 : 0.9 }}
            className="flex items-center gap-3"
          >
            <div className="w-10 h-10 bg-gradient-to-br from-primary-600 to-secondary-600 rounded-xl flex items-center justify-center shadow-md shadow-primary-500/20">
              <span className="text-white font-bold text-sm">F</span>
            </div>
            <AnimatePresence>
              {sidebarOpen && (
                <motion.h1
                  initial={{ opacity: 0, width: 0 }}
                  animate={{ opacity: 1, width: 'auto' }}
                  exit={{ opacity: 0, width: 0 }}
                  transition={{ duration: 0.2 }}
                  className="font-bold text-lg text-neutral-900 dark:text-white whitespace-nowrap overflow-hidden"
                >
                  FitTrack
                </motion.h1>
              )}
            </AnimatePresence>
          </motion.div>
        </motion.div>
        <nav className="flex-1 p-4 space-y-2 overflow-y-auto">
          {navigationItems.map((item) => {
            const Icon = item.icon
            const active = isActive(item.href)
            return (
              <motion.button
                key={item.id}
                onClick={() => navigate(item.href)}
                whileHover={{ x: sidebarOpen ? 4 : 0, scale: sidebarOpen ? 1 : 1.05 }}
                whileTap={{ scale: 0.98 }}
                aria-label={`Navigate to ${item.label}`}
                aria-current={active ? 'page' : undefined}
                title={!sidebarOpen ? item.label : ''}
                className={`w-full flex items-center ${sidebarOpen ? 'gap-3 px-4' : 'justify-center px-0'} py-3 rounded-xl transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-primary-500 focus:ring-offset-2 dark:focus:ring-offset-neutral-900 ${
                  active
                    ? 'bg-gradient-to-r from-primary-50 to-primary-100/80 dark:from-primary-950/40 dark:to-primary-900/20 text-primary-700 dark:text-primary-300 shadow-sm border border-primary-100 dark:border-primary-900/50'
                    : 'text-neutral-600 dark:text-neutral-400 hover:bg-neutral-100/80 dark:hover:bg-neutral-800/80'
                }`}
              >
                <Icon className="w-5 h-5 flex-shrink-0" />
                <AnimatePresence>
                  {sidebarOpen && (
                    <motion.span
                      initial={{ opacity: 0, width: 0 }}
                      animate={{ opacity: 1, width: 'auto' }}
                      exit={{ opacity: 0, width: 0 }}
                      transition={{ duration: 0.2 }}
                      className="font-medium text-sm whitespace-nowrap overflow-hidden"
                    >
                      {item.label}
                    </motion.span>
                  )}
                </AnimatePresence>
              </motion.button>
            )
          })}
        </nav>
        <motion.div
          className="p-4 border-t border-neutral-200 dark:border-neutral-800"
          animate={{ justifyContent: sidebarOpen ? 'flex-start' : 'center' }}
        >
          <div className="relative group">
            <motion.div
              whileHover={{ scale: 1.02 }}
              className={`flex items-center ${sidebarOpen ? 'gap-3 px-4' : 'justify-center px-0'} py-3 rounded-lg bg-neutral-50 dark:bg-neutral-800/50 border border-neutral-200 dark:border-neutral-700`}
            >
              <div className="w-8 h-8 rounded-full flex items-center justify-center flex-shrink-0 overflow-hidden ring-2 ring-white/50 dark:ring-neutral-700/50">
                {user?.avatar ? (
                  <img 
                    src={user.avatar} 
                    alt={user.name || 'User'} 
                    className="w-full h-full object-cover"
                  />
                ) : (
                  <div className="w-full h-full bg-gradient-to-br from-primary-400 to-secondary-400 flex items-center justify-center">
                    <span className="text-white font-bold text-sm">{user?.name?.charAt(0) || 'U'}</span>
                  </div>
                )}
              </div>
              <AnimatePresence>
                {sidebarOpen && (
                  <motion.div
                    initial={{ opacity: 0, width: 0 }}
                    animate={{ opacity: 1, width: 'auto' }}
                    exit={{ opacity: 0, width: 0 }}
                    transition={{ duration: 0.2 }}
                    className="flex-1 text-left overflow-hidden"
                  >
                    <p className="font-medium text-sm text-neutral-900 dark:text-white truncate">
                      {user?.name || 'User'}
                    </p>
                    <p className="text-xs text-neutral-500 dark:text-neutral-400 truncate" title={user?.email || 'user@example.com'}>
                      {user?.email || 'user@example.com'}
                    </p>
                  </motion.div>
                )}
              </AnimatePresence>
            </motion.div>
            {!sidebarOpen && (
              <div className="absolute left-full ml-2 top-1/2 -translate-y-1/2 px-3 py-2 bg-neutral-900 dark:bg-neutral-800 text-white text-xs rounded-lg shadow-lg opacity-0 group-hover:opacity-100 pointer-events-none transition-opacity duration-200 whitespace-nowrap z-50">
                <div className="font-medium">{user?.name || 'User'}</div>
                <div className="text-neutral-300 dark:text-neutral-400">{user?.email || 'user@example.com'}</div>
                <div className="absolute right-full top-1/2 -translate-y-1/2 border-4 border-transparent border-r-neutral-900 dark:border-r-neutral-800"></div>
              </div>
            )}
          </div>
        </motion.div>
        <motion.div className="p-4 border-t border-neutral-200 dark:border-neutral-800">
          <motion.button
            onClick={toggleTheme}
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            aria-label={isDark ? 'Switch to light mode' : 'Switch to dark mode'}
            className={`w-full flex items-center ${sidebarOpen ? 'gap-2 justify-start px-4' : 'justify-center px-0'} py-2.5 hover:bg-neutral-100 dark:hover:bg-neutral-800 rounded-lg transition-colors duration-300 focus:outline-none focus:ring-2 focus:ring-primary-500 focus:ring-offset-2 dark:focus:ring-offset-neutral-900`}
            title={isDark ? 'Light mode' : 'Dark mode'}
          >
            {isDark ? (
              <Sun className="w-5 h-5 text-yellow-500" />
            ) : (
              <Moon className="w-5 h-5 text-neutral-600 dark:text-neutral-400" />
            )}
            <AnimatePresence>
              {sidebarOpen && (
                <motion.span
                  initial={{ opacity: 0, width: 0 }}
                  animate={{ opacity: 1, width: 'auto' }}
                  exit={{ opacity: 0, width: 0 }}
                  transition={{ duration: 0.2 }}
                  className="text-sm font-medium text-neutral-600 dark:text-neutral-400 whitespace-nowrap overflow-hidden"
                >
                  {isDark ? 'Light mode' : 'Dark mode'}
                </motion.span>
              )}
            </AnimatePresence>
          </motion.button>
        </motion.div>
        <motion.button
          onClick={() => setSidebarOpen(!sidebarOpen)}
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          aria-label={sidebarOpen ? 'Collapse sidebar' : 'Expand sidebar'}
          aria-controls="main-sidebar"
          className="absolute -right-3 top-20 w-6 h-6 bg-white dark:bg-neutral-800 border-2 border-neutral-200 dark:border-neutral-700 rounded-full flex items-center justify-center shadow-md hover:shadow-lg hover:border-primary-400 dark:hover:border-primary-600 transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-primary-500 focus:ring-offset-2 dark:focus:ring-offset-neutral-950 z-10"
          title={sidebarOpen ? 'Collapse sidebar' : 'Expand sidebar'}
        >
          {sidebarOpen ? (
            <ChevronLeft className="w-3.5 h-3.5 text-neutral-600 dark:text-neutral-400" />
          ) : (
            <ChevronRight className="w-3.5 h-3.5 text-neutral-600 dark:text-neutral-400" />
          )}
        </motion.button>
      </motion.aside>
      <main className="flex-1 flex flex-col overflow-hidden">
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
          </div>
        </motion.header>
        <div className="relative flex-1 overflow-y-auto bg-gradient-to-br from-neutral-50 via-white to-primary-50/25 dark:from-neutral-950 dark:via-neutral-950 dark:to-primary-950/15">
          <DashboardAmbientBackground />
          <div className="relative z-[1]">{children}</div>
        </div>
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
