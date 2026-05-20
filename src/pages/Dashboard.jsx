import { useContext } from 'react'
import { motion } from 'framer-motion'
import { DashboardLayout } from '../components/dashboard'
import { AuthContext } from '../contexts/AuthContext'

export default function Dashboard() {
  const { user } = useContext(AuthContext)

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
        delayChildren: 0.2,
      },
    },
  }

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.4, ease: 'easeOut' },
    },
  }

  return (
    <DashboardLayout>
      <motion.div
        className="p-6 space-y-6"
        initial="hidden"
        animate="visible"
        variants={containerVariants}
      >
        {/* Welcome Section */}
        <motion.div variants={itemVariants}>
          <h2 className="text-3xl font-bold text-neutral-900 dark:text-white">
            Welcome, {user?.name}! 🎉
          </h2>
          <p className="text-neutral-600 dark:text-neutral-400 mt-2">
            Here's your fitness overview for today
          </p>
        </motion.div>

        {/* Stats Cards */}
        <motion.div
          variants={itemVariants}
          className="grid grid-cols-1 md:grid-cols-3 gap-4"
        >
          <div className="p-6 bg-white dark:bg-neutral-800 rounded-lg border border-neutral-200 dark:border-neutral-700 shadow-sm hover:shadow-md transition-shadow">
            <div className="flex items-start justify-between">
              <div>
                <p className="text-sm font-medium text-neutral-600 dark:text-neutral-400">Workouts</p>
                <p className="text-3xl font-bold text-primary-600 dark:text-primary-400 mt-2">0</p>
                <p className="text-xs text-neutral-500 dark:text-neutral-500 mt-2">This week</p>
              </div>
              <div className="w-12 h-12 bg-primary-100 dark:bg-primary-950/30 rounded-lg flex items-center justify-center">
                <span className="text-xl">💪</span>
              </div>
            </div>
          </div>

          <div className="p-6 bg-white dark:bg-neutral-800 rounded-lg border border-neutral-200 dark:border-neutral-700 shadow-sm hover:shadow-md transition-shadow">
            <div className="flex items-start justify-between">
              <div>
                <p className="text-sm font-medium text-neutral-600 dark:text-neutral-400">Calories Burned</p>
                <p className="text-3xl font-bold text-secondary-600 dark:text-secondary-400 mt-2">0</p>
                <p className="text-xs text-neutral-500 dark:text-neutral-500 mt-2">kcal today</p>
              </div>
              <div className="w-12 h-12 bg-secondary-100 dark:bg-secondary-950/30 rounded-lg flex items-center justify-center">
                <span className="text-xl">🔥</span>
              </div>
            </div>
          </div>

          <div className="p-6 bg-white dark:bg-neutral-800 rounded-lg border border-neutral-200 dark:border-neutral-700 shadow-sm hover:shadow-md transition-shadow">
            <div className="flex items-start justify-between">
              <div>
                <p className="text-sm font-medium text-neutral-600 dark:text-neutral-400">Streak</p>
                <p className="text-3xl font-bold text-accent-600 dark:text-accent-400 mt-2">0</p>
                <p className="text-xs text-neutral-500 dark:text-neutral-500 mt-2">days active</p>
              </div>
              <div className="w-12 h-12 bg-accent-100 dark:bg-accent-950/30 rounded-lg flex items-center justify-center">
                <span className="text-xl">🔥</span>
              </div>
            </div>
          </div>
        </motion.div>

        {/* Coming Soon Section */}
        <motion.div
          variants={itemVariants}
          className="p-6 bg-gradient-to-br from-primary-50 to-secondary-50 dark:from-primary-950/20 dark:to-secondary-950/20 rounded-lg border border-primary-200 dark:border-primary-800"
        >
          <h3 className="font-semibold text-primary-900 dark:text-primary-100 mb-4">
            Coming Soon 🚀
          </h3>
          <ul className="space-y-2 text-primary-800 dark:text-primary-200 text-sm">
            <li className="flex items-center gap-2">
              <span className="text-lg">✓</span>
              <span>Complete dashboard with analytics</span>
            </li>
            <li className="flex items-center gap-2">
              <span className="text-lg">✓</span>
              <span>Workout tracking & progress charts</span>
            </li>
            <li className="flex items-center gap-2">
              <span className="text-lg">✓</span>
              <span>Nutrition planning & meal tracking</span>
            </li>
            <li className="flex items-center gap-2">
              <span className="text-lg">✓</span>
              <span>Achievement & rewards system</span>
            </li>
            <li className="flex items-center gap-2">
              <span className="text-lg">✓</span>
              <span>Social features & challenges</span>
            </li>
          </ul>
        </motion.div>
      </motion.div>
    </DashboardLayout>
  )
}
