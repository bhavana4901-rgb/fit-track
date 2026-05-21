import { useState, useMemo } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { Check, Play, Flame } from 'lucide-react'
import { dashboardCard, dashboardCardPadding, dashboardSectionTitle } from './dashboardStyles'
import { dashboardItem } from './dashboardMotion'
export default function TodaysWorkout() {
  const initialExercises = [
    { id: 1, name: 'Push-ups', sets: 3, reps: 15, completed: false },
    { id: 2, name: 'Squats', sets: 4, reps: 20, completed: false },
    { id: 3, name: 'Planks', sets: 3, reps: '60s', completed: false },
    { id: 4, name: 'Pull-ups', sets: 3, reps: 10, completed: false },
    { id: 5, name: 'Dumbbell Rows', sets: 3, reps: 12, completed: false },
    { id: 6, name: 'Lunges', sets: 3, reps: 12, completed: false },
  ]
  const [exercises, setExercises] = useState(initialExercises)
  const [workoutStarted, setWorkoutStarted] = useState(false)
  const completedCount = useMemo(
    () => exercises.filter((ex) => ex.completed).length,
    [exercises]
  )
  const progressPercentage = useMemo(
    () => Math.round((completedCount / exercises.length) * 100),
    [completedCount, exercises.length]
  )
  const toggleExercise = (id) => {
    setExercises((prev) =>
      prev.map((ex) => (ex.id === id ? { ...ex, completed: !ex.completed } : ex))
    )
  }
  const handleStartWorkout = () => {
    setWorkoutStarted(true)
  }
  const itemVariants = {
    hidden: { opacity: 0, x: -10 },
    visible: {
      opacity: 1,
      x: 0,
      transition: { duration: 0.3, ease: 'easeOut' },
    },
  }
  const listVariants = {
    visible: {
      transition: {
        staggerChildren: 0.05,
        delayChildren: 0.1,
      },
    },
  }
  return (
    <motion.div
      variants={dashboardItem}
      initial="hidden"
      animate="visible"
      className={`${dashboardCard} ${dashboardCardPadding} overflow-hidden relative`}
    >
      <div className="absolute top-0 left-0 right-0 h-1 bg-gradient-to-r from-error-500 via-primary-500 to-secondary-500 opacity-80" />
      <motion.div variants={itemVariants} className="mb-6">
        <div className="flex items-center justify-between mb-3">
          <div className="flex items-center gap-2">
            <span className="inline-flex p-2 rounded-lg bg-error-100 dark:bg-error-950/40">
              <Flame className="w-5 h-5 text-error-600 dark:text-error-400" />
            </span>
            <h3 className={dashboardSectionTitle}>Today's Workout</h3>
          </div>
          <motion.span
            className="px-3 py-1 bg-primary-100 dark:bg-primary-950/40 text-primary-700 dark:text-primary-300 text-sm font-semibold rounded-full border border-primary-200/60 dark:border-primary-800/60"
            initial={{ scale: 0.9 }}
            animate={{ scale: 1 }}
            transition={{ type: 'spring', stiffness: 300 }}
          >
            {completedCount} / {exercises.length}
          </motion.span>
        </div>
        {}
        <div
          role="progressbar"
          aria-valuenow={progressPercentage}
          aria-valuemin={0}
          aria-valuemax={100}
          aria-label="Workout completion progress"
          className="w-full bg-neutral-200/80 dark:bg-neutral-700/80 rounded-full h-2.5 overflow-hidden"
        >
          <motion.div
            className="h-full bg-gradient-to-r from-primary-500 via-secondary-500 to-accent-500 rounded-full"
            initial={{ width: 0 }}
            animate={{ width: `${progressPercentage}%` }}
            transition={{ duration: 0.6, ease: 'easeOut' }}
          />
        </div>
        <motion.p
          className="text-xs text-neutral-600 dark:text-neutral-400 mt-2"
          variants={itemVariants}
        >
          {progressPercentage}% Complete
        </motion.p>
      </motion.div>
      {}
      <motion.div variants={listVariants} className="space-y-2 mb-6">
        <AnimatePresence>
          {exercises.map((exercise) => (
            <motion.button
              key={exercise.id}
              variants={itemVariants}
              initial="hidden"
              animate="visible"
              exit={{ opacity: 0, x: -10 }}
              onClick={() => toggleExercise(exercise.id)}
              aria-label={`${exercise.name}: ${exercise.sets}x${exercise.reps}${exercise.completed ? ' - Completed' : ''}`}
              aria-pressed={exercise.completed}
              className={`w-full flex items-center gap-3 p-3 rounded-xl border cursor-pointer transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-primary-500 focus:ring-offset-2 dark:focus:ring-offset-neutral-950 ${
                exercise.completed
                  ? 'bg-success-50/80 dark:bg-success-950/25 border-success-200/60 dark:border-success-900/40'
                  : 'bg-neutral-50/80 dark:bg-neutral-800/50 border-neutral-200/60 dark:border-neutral-700/60 hover:border-primary-200 dark:hover:border-primary-800 hover:bg-neutral-100/80 dark:hover:bg-neutral-800/80'
              }`}
              whileHover={{ x: 4 }}
              whileTap={{ scale: 0.98 }}
            >
              {}
              <motion.div
                className={`flex-shrink-0 w-6 h-6 rounded-md border-2 flex items-center justify-center ${
                  exercise.completed
                    ? 'bg-success-600 dark:bg-success-500 border-success-600 dark:border-success-500'
                    : 'border-neutral-300 dark:border-neutral-600'
                }`}
                initial={{ scale: 1 }}
                whileHover={{ scale: 1.1 }}
                whileTap={{ scale: 0.95 }}
              >
                <AnimatePresence>
                  {exercise.completed && (
                    <motion.div
                      initial={{ scale: 0, rotate: -180 }}
                      animate={{ scale: 1, rotate: 0 }}
                      exit={{ scale: 0, rotate: 180 }}
                      transition={{ type: 'spring', stiffness: 300, damping: 20 }}
                    >
                      <Check className="w-4 h-4 text-white" />
                    </motion.div>
                  )}
                </AnimatePresence>
              </motion.div>
              {}
              <div className="flex-1 min-w-0">
                <motion.p
                  className={`font-medium text-sm ${
                    exercise.completed
                      ? 'text-success-700 dark:text-success-400 line-through'
                      : 'text-neutral-900 dark:text-white'
                  }`}
                  animate={{ opacity: exercise.completed ? 0.7 : 1 }}
                >
                  {exercise.name}
                </motion.p>
              </div>
              {}
              <motion.div
                className={`text-xs font-semibold flex-shrink-0 ${
                  exercise.completed
                    ? 'text-success-600 dark:text-success-400'
                    : 'text-neutral-600 dark:text-neutral-400'
                }`}
                animate={{ scale: exercise.completed ? 1.05 : 1 }}
              >
                {exercise.sets}x{exercise.reps}
              </motion.div>
            </motion.button>
          ))}
        </AnimatePresence>
      </motion.div>
      {}
      <motion.button
        variants={itemVariants}
        onClick={handleStartWorkout}
        aria-label={progressPercentage === 100 ? 'Workout complete' : 'Start workout'}
        className={`w-full py-3.5 px-4 rounded-xl font-semibold flex items-center justify-center gap-2 transition-all duration-200 shadow-sm focus:outline-none focus:ring-2 focus:ring-offset-2 dark:focus:ring-offset-neutral-950 ${
          progressPercentage === 100
            ? 'bg-gradient-to-r from-success-600 to-success-500 hover:from-success-700 hover:to-success-600 text-white focus:ring-success-500'
            : 'bg-gradient-to-r from-primary-600 to-secondary-600 hover:from-primary-700 hover:to-secondary-700 text-white focus:ring-primary-500'
        }`}
        whileHover={{ scale: 1.02 }}
        whileTap={{ scale: 0.98 }}
      >
        <Play className="w-5 h-5" />
        {progressPercentage === 100 ? 'Workout Complete! 🎉' : 'Start Workout'}
      </motion.button>
      {}
      {workoutStarted && (
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -10 }}
          className="mt-4 p-3 bg-primary-50 dark:bg-primary-950/20 rounded-lg border border-primary-200 dark:border-primary-800"
        >
          <p className="text-sm text-primary-700 dark:text-primary-300">
            💪 Great job! Keep pushing! You're doing amazing!
          </p>
        </motion.div>
      )}
    </motion.div>
  )
}
