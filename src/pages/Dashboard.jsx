import { motion } from 'framer-motion'
import { Sparkles, Trophy, Target, Zap } from 'lucide-react'
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
            icon="⚡"
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
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          <div className="lg:col-span-2 space-y-6">
            <motion.div variants={dashboardItem}>
              <TodaysWorkout />
            </motion.div>
            <motion.div variants={dashboardItem}>
              <WeeklyActivityChart />
            </motion.div>
          </div>
          <div className="space-y-6">
            <motion.div variants={dashboardItem}>
              <QuickActions />
            </motion.div>
            <motion.div
              variants={dashboardItem}
              className={`${dashboardCard} ${dashboardCardPadding} overflow-hidden relative`}
            >
              <div className="absolute top-0 left-0 right-0 h-1 bg-gradient-to-r from-warning-500 via-accent-500 to-secondary-500" />
              <div className="flex items-center gap-2 mb-4">
                <span className="inline-flex p-2 rounded-lg bg-warning-100 dark:bg-warning-950/40 text-warning-600 dark:text-warning-400">
                  <Trophy className="w-5 h-5" />
                </span>
                <h3 className="font-semibold text-neutral-900 dark:text-neutral-100">
                  Achievements
                </h3>
              </div>
              <div className="space-y-3">
                <motion.div 
                  className="flex items-center gap-3 p-3 rounded-lg bg-neutral-50 dark:bg-neutral-800/50 border border-neutral-200 dark:border-neutral-700"
                  whileHover={{ x: 4 }}
                >
                  <span className="text-2xl">🏆</span>
                  <div className="flex-1 min-w-0">
                    <p className="text-sm font-medium text-neutral-900 dark:text-white">First Workout</p>
                    <p className="text-xs text-neutral-500 dark:text-neutral-400">Complete your first session</p>
                  </div>
                  <span className="text-xs font-semibold text-neutral-400 dark:text-neutral-500">Locked</span>
                </motion.div>
                <motion.div 
                  className="flex items-center gap-3 p-3 rounded-lg bg-neutral-50 dark:bg-neutral-800/50 border border-neutral-200 dark:border-neutral-700"
                  whileHover={{ x: 4 }}
                >
                  <span className="text-2xl">🔥</span>
                  <div className="flex-1 min-w-0">
                    <p className="text-sm font-medium text-neutral-900 dark:text-white">7 Day Streak</p>
                    <p className="text-xs text-neutral-500 dark:text-neutral-400">Stay active for a week</p>
                  </div>
                  <span className="text-xs font-semibold text-neutral-400 dark:text-neutral-500">Locked</span>
                </motion.div>
                <motion.div 
                  className="flex items-center gap-3 p-3 rounded-lg bg-neutral-50 dark:bg-neutral-800/50 border border-neutral-200 dark:border-neutral-700"
                  whileHover={{ x: 4 }}
                >
                  <span className="text-2xl">💯</span>
                  <div className="flex-1 min-w-0">
                    <p className="text-sm font-medium text-neutral-900 dark:text-white">Goal Crusher</p>
                    <p className="text-xs text-neutral-500 dark:text-neutral-400">Reach 100% goal progress</p>
                  </div>
                  <span className="text-xs font-semibold text-neutral-400 dark:text-neutral-500">Locked</span>
                </motion.div>
              </div>
            </motion.div>
            <motion.div
              variants={dashboardItem}
              className={`${dashboardCard} ${dashboardCardPadding} overflow-hidden relative`}
            >
              <div className="absolute top-0 left-0 right-0 h-1 bg-gradient-to-r from-success-500 to-primary-500" />
              <div className="flex items-center gap-2 mb-4">
                <span className="inline-flex p-2 rounded-lg bg-success-100 dark:bg-success-950/40 text-success-600 dark:text-success-400">
                  <Target className="w-5 h-5" />
                </span>
                <h3 className="font-semibold text-neutral-900 dark:text-neutral-100">
                  Daily Goal
                </h3>
              </div>
              <div className="space-y-4">
                <div>
                  <div className="flex items-center justify-between mb-2">
                    <span className="text-sm text-neutral-600 dark:text-neutral-400">Calories</span>
                    <span className="text-sm font-semibold text-neutral-900 dark:text-white">0 / 500 kcal</span>
                  </div>
                  <div className="w-full bg-neutral-200 dark:bg-neutral-700 rounded-full h-2">
                    <motion.div 
                      className="h-full bg-gradient-to-r from-success-500 to-success-400 rounded-full"
                      initial={{ width: 0 }}
                      animate={{ width: '0%' }}
                      transition={{ duration: 1, ease: 'easeOut' }}
                    />
                  </div>
                </div>
                <div>
                  <div className="flex items-center justify-between mb-2">
                    <span className="text-sm text-neutral-600 dark:text-neutral-400">Active Minutes</span>
                    <span className="text-sm font-semibold text-neutral-900 dark:text-white">0 / 30 min</span>
                  </div>
                  <div className="w-full bg-neutral-200 dark:bg-neutral-700 rounded-full h-2">
                    <motion.div 
                      className="h-full bg-gradient-to-r from-primary-500 to-primary-400 rounded-full"
                      initial={{ width: 0 }}
                      animate={{ width: '0%' }}
                      transition={{ duration: 1, ease: 'easeOut', delay: 0.1 }}
                    />
                  </div>
                </div>
                <div>
                  <div className="flex items-center justify-between mb-2">
                    <span className="text-sm text-neutral-600 dark:text-neutral-400">Water Intake</span>
                    <span className="text-sm font-semibold text-neutral-900 dark:text-white">0 / 8 glasses</span>
                  </div>
                  <div className="w-full bg-neutral-200 dark:bg-neutral-700 rounded-full h-2">
                    <motion.div 
                      className="h-full bg-gradient-to-r from-secondary-500 to-secondary-400 rounded-full"
                      initial={{ width: 0 }}
                      animate={{ width: '0%' }}
                      transition={{ duration: 1, ease: 'easeOut', delay: 0.2 }}
                    />
                  </div>
                </div>
              </div>
            </motion.div>
          </div>
        </div>
        <motion.div
          variants={dashboardItem}
          className={`${dashboardCard} ${dashboardCardPadding} overflow-hidden relative`}
        >
          <div className="absolute top-0 left-0 right-0 h-1 bg-gradient-to-r from-primary-500 via-secondary-500 to-accent-500" />
          <div className="flex items-center gap-2 mb-4">
            <span className="inline-flex p-2 rounded-lg bg-primary-100 dark:bg-primary-950/50 text-primary-600 dark:text-primary-400">
              <Sparkles className="w-5 h-5" />
            </span>
            <h3 className="font-semibold text-primary-900 dark:text-primary-100">
              Coming Soon 🚀
            </h3>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            <motion.div 
              className="p-4 rounded-lg bg-primary-50/50 dark:bg-primary-950/20 border border-primary-200/50 dark:border-primary-800/50"
              whileHover={{ y: -2 }}
            >
              <div className="flex items-center gap-2 mb-2">
                <span className="flex h-6 w-6 shrink-0 items-center justify-center rounded-full bg-primary-200/80 dark:bg-primary-800/80 text-xs font-bold text-primary-700 dark:text-primary-300">
                  ✓
                </span>
                <span className="font-semibold text-primary-900 dark:text-primary-100">Advanced Analytics</span>
              </div>
              <p className="text-sm text-primary-700 dark:text-primary-300">Detailed insights and progress tracking</p>
            </motion.div>
            <motion.div 
              className="p-4 rounded-lg bg-secondary-50/50 dark:bg-secondary-950/20 border border-secondary-200/50 dark:border-secondary-800/50"
              whileHover={{ y: -2 }}
            >
              <div className="flex items-center gap-2 mb-2">
                <span className="flex h-6 w-6 shrink-0 items-center justify-center rounded-full bg-secondary-200/80 dark:bg-secondary-800/80 text-xs font-bold text-secondary-700 dark:text-secondary-300">
                  ✓
                </span>
                <span className="font-semibold text-secondary-900 dark:text-secondary-100">Nutrition Tracking</span>
              </div>
              <p className="text-sm text-secondary-700 dark:text-secondary-300">Meal planning and calorie counting</p>
            </motion.div>
            <motion.div 
              className="p-4 rounded-lg bg-accent-50/50 dark:bg-accent-950/20 border border-accent-200/50 dark:border-accent-800/50"
              whileHover={{ y: -2 }}
            >
              <div className="flex items-center gap-2 mb-2">
                <span className="flex h-6 w-6 shrink-0 items-center justify-center rounded-full bg-accent-200/80 dark:bg-accent-800/80 text-xs font-bold text-accent-700 dark:text-accent-300">
                  ✓
                </span>
                <span className="font-semibold text-accent-900 dark:text-accent-100">Social Features</span>
              </div>
              <p className="text-sm text-accent-700 dark:text-accent-300">Connect with friends and join challenges</p>
            </motion.div>
          </div>
        </motion.div>
      </motion.div>
    </DashboardLayout>
  )
}
