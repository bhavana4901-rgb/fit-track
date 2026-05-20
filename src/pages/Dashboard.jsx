import { useContext } from 'react'
import { motion } from 'framer-motion'
import { DashboardLayout, DashboardHeader, StatsCard, TodaysWorkout } from '../components/dashboard'
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
        {/* Dashboard Header with Greeting and User Info */}
        <DashboardHeader />

        {/* Stats Cards */}
        <motion.div
          variants={itemVariants}
          className="grid grid-cols-1 md:grid-cols-4 gap-4"
        >
          <StatsCard
            value={0}
            label="Workouts"
            subtitle="This week"
            icon="💪"
            color="primary"
            trend={null}
            delay={0}
          />
          <StatsCard
            value={0}
            label="Calories Burned"
            subtitle="kcal today"
            icon="🔥"
            color="secondary"
            trend={null}
            delay={0.1}
          />
          <StatsCard
            value={0}
            label="Streak"
            subtitle="days active"
            icon="🔥"
            color="accent"
            trend={null}
            delay={0.2}
          />
          <StatsCard
            value={0}
            label="Goal Progress"
            subtitle="% complete"
            icon="🎯"
            color="success"
            trend={true}
            unit="%"
            delay={0.3}
          />
        </motion.div>

        {/* Today's Workout Card */}
        <motion.div variants={itemVariants}>
          <TodaysWorkout />
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
