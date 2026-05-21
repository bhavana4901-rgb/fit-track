import { useState, useMemo } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { Check, Play, Flame } from 'lucide-react'

export default function TodaysWorkout() {
  // Sample exercises data
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

  // Calculate progress percentage
  const completedCount = useMemo(
    () => exercises.filter((ex) => ex.completed).length,
    [exercises]
  )

  const progressPercentage = useMemo(
    () => Math.round((completedCount / exercises.length) * 100),
    [completedCount, exercises.length]
  )

  // Toggle exercise completion
  const toggleExercise = (id) => {
    setExercises((prev) =>
      prev.map((ex) => (ex.id === id ? { ...ex, completed: !ex.completed } : ex))
    )
  }

  const handleStartWorkout = () => {
    setWorkoutStarted(true)
  }

  const containerVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.4, ease: 'easeOut' },
    },
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
      variants={containerVariants}
      initial="hidden"
      animate="visible"
      className="p-6 bg-white dark:bg-neutral-800 rounded-lg border border-neutral-200 dark:border-neutral-700 shadow-sm hover:shadow-md transition-shadow"
    >
      {/* Header */}
      <motion.div variants={itemVariants} className="mb-6">
        <div className="flex items-center justify-between mb-3">
          <div className="flex items-center gap-2">
            <Flame className="w-5 h-5 text-error-600 dark:text-error-400" />
            <h3 className="text-xl font-bold text-neutral-900 dark:text-white">
              Today's Workout
            </h3>
          </div>
          <motion.span
            className="px-3 py-1 bg-primary-100 dark:bg-primary-950/30 text-primary-700 dark:text-primary-300 text-sm font-semibold rounded-full"
            initial={{ scale: 0.9 }}
            animate={{ scale: 1 }}
            transition={{ type: 'spring', stiffness: 300 }}
          >
            {completedCount} / {exercises.length}
          </motion.span>
        </div>

        {/* Progress Bar */}
        <div
          role="progressbar"
          aria-valuenow={progressPercentage}
          aria-valuemin={0}
          aria-valuemax={100}
          aria-label="Workout completion progress"
          className="w-full bg-neutral-200 dark:bg-neutral-700 rounded-full h-2 overflow-hidden"
        >
          <motion.div
            className="h-full bg-gradient-to-r from-primary-500 to-secondary-500"
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

      {/* Exercise List */}
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
              className={`w-full flex items-center gap-3 p-3 rounded-lg cursor-pointer transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-primary-500 focus:ring-offset-2 dark:focus:ring-offset-neutral-950 ${
                exercise.completed
                  ? 'bg-success-50 dark:bg-success-950/20'
                  : 'bg-neutral-50 dark:bg-neutral-700/50 hover:bg-neutral-100 dark:hover:bg-neutral-700'
              }`}
              whileHover={{ x: 4 }}
              whileTap={{ scale: 0.98 }}
            >
              {/* Checkbox */}
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

              {/* Exercise Details */}
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

              {/* Sets & Reps */}
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

      {/* Start Workout Button */}
      <motion.button
        variants={itemVariants}
        onClick={handleStartWorkout}
        aria-label={progressPercentage === 100 ? 'Workout complete' : 'Start workout'}
        className={`w-full py-3 px-4 rounded-lg font-semibold flex items-center justify-center gap-2 transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-offset-2 dark:focus:ring-offset-neutral-950 ${
          progressPercentage === 100
            ? 'bg-success-600 hover:bg-success-700 dark:bg-success-600 dark:hover:bg-success-700 text-white focus:ring-success-500'
            : 'bg-primary-600 hover:bg-primary-700 dark:bg-primary-600 dark:hover:bg-primary-700 text-white focus:ring-primary-500'
        }`}
        whileHover={{ scale: 1.02 }}
        whileTap={{ scale: 0.98 }}
      >
        <Play className="w-5 h-5" />
        {progressPercentage === 100 ? 'Workout Complete! 🎉' : 'Start Workout'}
      </motion.button>

      {/* Motivation Message */}
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

