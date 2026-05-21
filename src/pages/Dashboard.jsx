import { motion } from 'framer-motion'
import { Sparkles } from 'lucide-react'
import { DashboardLayout, DashboardHeader, StatsCard, TodaysWorkout, WeeklyActivityChart, QuickActions } from '../components/dashboard'
import { dashboardContainer, dashboardItem } from '../components/dashboard/dashboardMotion'
import { dashboardCard, dashboardCardPadding } from '../components/dashboard/dashboardStyles'

export default function Dashboard() {

  return (
    <DashboardLayout>
      <motion.div
        role="main"
        aria-label="Dashboard main content"
        className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6 sm:py-8 space-y-6 sm:space-y-8"
        initial="hidden"
        animate="visible"
        variants={dashboardContainer}
      >
        <DashboardHeader />

        <motion.div variants={dashboardItem} className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-4 gap-4">
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
            delay={0.05}
          />
          <StatsCard
            value={0}
            label="Streak"
            subtitle="days active"
            icon="🔥"
            color="accent"
            trend={null}
            delay={0.1}
          />
          <StatsCard
            value={0}
            label="Goal Progress"
            subtitle="% complete"
            icon="🎯"
            color="success"
            trend={true}
            unit="%"
            delay={0.15}
          />
        </motion.div>

        <motion.div variants={dashboardItem}>
          <TodaysWorkout />
        </motion.div>

        <motion.div variants={dashboardItem}>
          <WeeklyActivityChart />
        </motion.div>

        <motion.div variants={dashboardItem}>
          <QuickActions />
        </motion.div>

        <motion.div
          variants={dashboardItem}
          className={`${dashboardCard} ${dashboardCardPadding} overflow-hidden relative`}
        >
          <div className="absolute top-0 left-0 right-0 h-1 bg-gradient-to-r from-primary-500 via-secondary-500 to-accent-500" />
          <div className="flex items-center gap-2 mb-4">
            <span className="inline-flex p-2 rounded-lg bg-primary-100 dark:bg-primary-950/50 text-primary-600 dark:text-primary-400">
              <Sparkles className="w-4 h-4" />
            </span>
            <h3 className="font-semibold text-primary-900 dark:text-primary-100">
              Coming Soon 🚀
            </h3>
          </div>
          <ul className="space-y-2.5 text-primary-800 dark:text-primary-200 text-sm">
            <li className="flex items-center gap-2.5">
              <span className="flex h-5 w-5 shrink-0 items-center justify-center rounded-full bg-primary-200/80 dark:bg-primary-800/80 text-xs font-bold text-primary-700 dark:text-primary-300">
                ✓
              </span>
              <span>Complete dashboard with analytics</span>
            </li>
            <li className="flex items-center gap-2.5">
              <span className="flex h-5 w-5 shrink-0 items-center justify-center rounded-full bg-primary-200/80 dark:bg-primary-800/80 text-xs font-bold text-primary-700 dark:text-primary-300">
                ✓
              </span>
              <span>Workout tracking & progress charts</span>
            </li>
            <li className="flex items-center gap-2.5">
              <span className="flex h-5 w-5 shrink-0 items-center justify-center rounded-full bg-primary-200/80 dark:bg-primary-800/80 text-xs font-bold text-primary-700 dark:text-primary-300">
                ✓
              </span>
              <span>Nutrition planning & meal tracking</span>
            </li>
            <li className="flex items-center gap-2.5">
              <span className="flex h-5 w-5 shrink-0 items-center justify-center rounded-full bg-primary-200/80 dark:bg-primary-800/80 text-xs font-bold text-primary-700 dark:text-primary-300">
                ✓
              </span>
              <span>Achievement & rewards system</span>
            </li>
            <li className="flex items-center gap-2.5">
              <span className="flex h-5 w-5 shrink-0 items-center justify-center rounded-full bg-primary-200/80 dark:bg-primary-800/80 text-xs font-bold text-primary-700 dark:text-primary-300">
                ✓
              </span>
              <span>Social features & challenges</span>
            </li>
          </ul>
        </motion.div>
      </motion.div>
    </DashboardLayout>
  )
}
