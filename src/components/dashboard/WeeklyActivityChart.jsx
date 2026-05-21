import React, { useMemo } from 'react'
import { motion } from 'framer-motion'
import { BarChart3 } from 'lucide-react'
import { dashboardCard, dashboardCardPadding, dashboardSectionTitle, dashboardSectionSubtitle } from './dashboardStyles'
import { dashboardItem } from './dashboardMotion'
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer,
  Cell,
} from 'recharts'

const WeeklyActivityChart = () => {
  // Mock data for 7 days of workout data
  const chartData = useMemo(() => [
    { day: 'Mon', minutes: 45, intensity: 75 },
    { day: 'Tue', minutes: 60, intensity: 85 },
    { day: 'Wed', minutes: 30, intensity: 60 },
    { day: 'Thu', minutes: 75, intensity: 90 },
    { day: 'Fri', minutes: 50, intensity: 70 },
    { day: 'Sat', minutes: 85, intensity: 95 },
    { day: 'Sun', minutes: 40, intensity: 65 },
  ], [])

  // Custom tooltip component
  const CustomTooltip = ({ active, payload }) => {
    if (active && payload && payload.length) {
      return (
        <motion.div
          initial={{ opacity: 0, y: -10 }}
          animate={{ opacity: 1, y: 0 }}
          className="bg-white dark:bg-neutral-800 p-3 rounded-lg shadow-lg border border-neutral-200 dark:border-neutral-700"
        >
          <p className="text-sm font-medium text-neutral-900 dark:text-white">
            {payload[0].payload.day}
          </p>
          <p className="text-sm text-primary-600 dark:text-primary-400">
            {payload[0].value} min
          </p>
          <p className="text-xs text-neutral-500 dark:text-neutral-400 mt-1">
            Intensity: {payload[0].payload.intensity}%
          </p>
        </motion.div>
      )
    }
    return null
  }

  // Bar colors array with gradient effect
  const barColors = [
    '#3B82F6', // primary-500
    '#3B82F6',
    '#8B5CF6', // secondary-500
    '#8B5CF6',
    '#EC4899', // accent-500
    '#10B981', // success-500
    '#F59E0B', // warning-500
  ]

  // Calculate stats
  const totalMinutes = useMemo(() => 
    chartData.reduce((sum, day) => sum + day.minutes, 0), 
    [chartData]
  )
  const averageMinutes = useMemo(() => 
    Math.round(totalMinutes / chartData.length), 
    [totalMinutes, chartData]
  )

  return (
    <motion.div
      variants={dashboardItem}
      initial="hidden"
      animate="visible"
      className={`${dashboardCard} ${dashboardCardPadding} overflow-hidden relative`}
    >
      <div className="absolute top-0 left-0 right-0 h-1 bg-gradient-to-r from-primary-500 via-secondary-500 to-success-500 opacity-80" />

      <div className="mb-6">
        <div className="flex items-center justify-between gap-3 mb-2">
          <div className="flex items-center gap-2 min-w-0">
            <span className="inline-flex p-2 rounded-lg bg-primary-100 dark:bg-primary-950/40 shrink-0">
              <BarChart3 className="w-5 h-5 text-primary-600 dark:text-primary-400" />
            </span>
            <h3 id="weekly-activity-heading" className={dashboardSectionTitle}>
              Weekly Activity
            </h3>
          </div>
          <span className="text-xs font-medium px-3 py-1 bg-primary-100 dark:bg-primary-950/40 text-primary-700 dark:text-primary-400 rounded-full border border-primary-200/60 dark:border-primary-800/60 shrink-0">
            Last 7 days
          </span>
        </div>
        <p className={dashboardSectionSubtitle}>
          Workout minutes and intensity tracking
        </p>
      </div>

      {/* Stats row */}
      <div className="grid grid-cols-2 gap-4 mb-6">
        <motion.div
          initial={{ opacity: 0, x: -10 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ delay: 0.1 }}
          className="bg-primary-50/80 dark:bg-primary-950/25 p-3 rounded-xl border border-primary-100/80 dark:border-primary-900/40"
        >
          <p className="text-xs text-primary-600 dark:text-primary-400 font-medium">
            Total Minutes
          </p>
          <p className="text-2xl font-bold text-primary-700 dark:text-primary-300">
            {totalMinutes}
          </p>
        </motion.div>
        <motion.div
          initial={{ opacity: 0, x: 10 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ delay: 0.15 }}
          className="bg-secondary-50/80 dark:bg-secondary-950/25 p-3 rounded-xl border border-secondary-100/80 dark:border-secondary-900/40"
        >
          <p className="text-xs text-secondary-600 dark:text-secondary-400 font-medium">
            Daily Average
          </p>
          <p className="text-2xl font-bold text-secondary-700 dark:text-secondary-300">
            {averageMinutes}
          </p>
        </motion.div>
      </div>

      {/* Chart container */}
      <motion.div
        role="img"
        aria-labelledby="weekly-activity-heading"
        aria-label={`Bar chart showing workout minutes for the last 7 days. Total: ${totalMinutes} minutes, daily average: ${averageMinutes} minutes.`}
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.2 }}
        className="w-full h-64 -mx-2"
      >
        <ResponsiveContainer width="100%" height="100%">
          <BarChart
            data={chartData}
            margin={{ top: 20, right: 20, left: -10, bottom: 20 }}
          >
            <defs>
              <linearGradient id="colorGradient" x1="0" y1="0" x2="0" y2="1">
                <stop offset="5%" stopColor="#3B82F6" stopOpacity={0.8} />
                <stop offset="95%" stopColor="#8B5CF6" stopOpacity={0.6} />
              </linearGradient>
            </defs>
            <CartesianGrid
              strokeDasharray="3 3"
              stroke="#E5E7EB"
              className="dark:stroke-neutral-700"
            />
            <XAxis
              dataKey="day"
              tick={{ fill: '#6B7280', fontSize: 12 }}
              className="dark:fill-neutral-400"
              axisLine={{ stroke: '#E5E7EB' }}
              className="dark:stroke-neutral-700"
            />
            <YAxis
              label={{ value: 'Minutes', angle: -90, position: 'insideLeft' }}
              tick={{ fill: '#6B7280', fontSize: 12 }}
              className="dark:fill-neutral-400"
              axisLine={{ stroke: '#E5E7EB' }}
              className="dark:stroke-neutral-700"
            />
            <Tooltip content={<CustomTooltip />} />
            <Legend
              wrapperStyle={{ paddingTop: '20px' }}
              formatter={(value) => (
                <span className="text-xs text-neutral-600 dark:text-neutral-400">
                  {value === 'minutes' ? 'Workout Minutes' : value}
                </span>
              )}
            />
            <Bar
              dataKey="minutes"
              fill="url(#colorGradient)"
              radius={[8, 8, 0, 0]}
              isAnimationActive={true}
              animationDuration={1500}
              animationEasing="ease-out"
            >
              {chartData.map((entry, index) => (
                <Cell key={`cell-${index}`} fill={barColors[index]} opacity={0.85} />
              ))}
            </Bar>
          </BarChart>
        </ResponsiveContainer>
      </motion.div>

      {/* Footer info */}
      <motion.div
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.3 }}
        className="mt-6 pt-4 border-t border-neutral-200 dark:border-neutral-700"
      >
        <p className="text-xs text-neutral-600 dark:text-neutral-400">
          💡 <span className="font-medium">Tip:</span> Aim for consistent workout sessions throughout the week to build habit and improve fitness goals.
        </p>
      </motion.div>
    </motion.div>
  )
}

export default WeeklyActivityChart
