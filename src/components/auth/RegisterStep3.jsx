import { useState } from 'react'
import { useForm, Controller } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { z } from 'zod'
import { motion, AnimatePresence } from 'framer-motion'
import {
  Flame,
  Zap,
  Activity,
  Smile,
  Leaf,
  Wind,
  Check,
  ArrowLeft,
  ArrowRight,
  Loader2,
} from 'lucide-react'
import Button from '../ui/Button'

// Zod validation schema
const registerStep3Schema = z.object({
  goals: z
    .array(z.string())
    .min(1, 'Select at least one goal')
    .max(3, 'Select up to 3 goals')
    .refine((goals) => new Set(goals).size === goals.length, {
      message: 'Cannot select the same goal twice',
    }),
})

// Goal options with icons and descriptions
const goalOptions = [
  {
    id: 'lose-weight',
    label: 'Lose Weight',
    description: 'Shed pounds and improve health',
    icon: Flame,
  },
  {
    id: 'build-muscle',
    label: 'Build Muscle',
    description: 'Get stronger and more defined',
    icon: Zap,
  },
  {
    id: 'stay-active',
    label: 'Stay Active',
    description: 'Maintain fitness and energy',
    icon: Activity,
  },
  {
    id: 'improve-flexibility',
    label: 'Improve Flexibility',
    description: 'Increase range of motion',
    icon: Smile,
  },
  {
    id: 'eat-healthier',
    label: 'Eat Healthier',
    description: 'Improve nutrition habits',
    icon: Leaf,
  },
  {
    id: 'reduce-stress',
    label: 'Reduce Stress',
    description: 'Find peace and balance',
    icon: Wind,
  },
]

export default function RegisterStep3({ onNext, onPrevious, initialData }) {
  const [isSubmitting, setIsSubmitting] = useState(false)

  const {
    control,
    handleSubmit,
    watch,
    formState: { errors, isValid },
  } = useForm({
    resolver: zodResolver(registerStep3Schema),
    mode: 'onChange',
    defaultValues: {
      goals: initialData?.goals || [],
    },
  })

  const selectedGoals = watch('goals')

  const onSubmit = async (data) => {
    setIsSubmitting(true)
    try {
      // Simulate API call
      await new Promise((resolve) => setTimeout(resolve, 500))
      onNext(data)
    } finally {
      setIsSubmitting(false)
    }
  }

  // Animation variants
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.08,
        delayChildren: 0.1,
      },
    },
  }

  const itemVariants = {
    hidden: { opacity: 0, y: 15 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.4, ease: 'easeOut' },
    },
  }

  const blobVariants = {
    animate: {
      y: [0, -15, 0],
      x: [0, 8, 0],
      opacity: [0.3, 0.5, 0.3],
    },
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-white via-orange-50/30 to-red-50/20 dark:from-neutral-950 dark:via-neutral-900 dark:to-red-950/20 relative overflow-hidden py-12 px-4 sm:px-6 lg:px-8">
      {/* Animated background blobs */}
      <motion.div
        className="absolute top-10 right-5 w-48 h-48 bg-gradient-to-br from-warning-400/20 to-error-400/20 dark:from-warning-600/10 dark:to-error-600/10 rounded-full blur-3xl pointer-events-none"
        variants={blobVariants}
        animate="animate"
        transition={{ duration: 8, repeat: Infinity, ease: 'easeInOut' }}
      />
      <motion.div
        className="absolute bottom-10 left-5 w-64 h-64 bg-gradient-to-br from-primary-400/20 to-warning-400/20 dark:from-primary-600/10 dark:to-warning-600/10 rounded-full blur-3xl pointer-events-none"
        variants={blobVariants}
        animate="animate"
        transition={{ duration: 10, repeat: Infinity, ease: 'easeInOut', delay: 0.5 }}
      />

      {/* Main container */}
      <div className="w-full max-w-4xl mx-auto relative z-10">
        <motion.div
          className="space-y-8"
          initial="hidden"
          animate="visible"
          variants={containerVariants}
        >
          {/* Header */}
          <motion.div className="space-y-2" variants={itemVariants}>
            <h1 className="text-4xl md:text-5xl font-bold bg-gradient-to-r from-warning-600 via-primary-600 to-accent-600 dark:from-warning-400 dark:via-primary-400 dark:to-accent-400 bg-clip-text text-transparent">
              What Are Your Goals?
            </h1>
            <p className="text-lg text-neutral-600 dark:text-neutral-400">
              Select 1 to 3 fitness goals to personalize your experience
            </p>
          </motion.div>

          {/* Goal selection counter */}
          <motion.div
            className="flex items-center justify-between px-4 py-3 rounded-lg bg-warning-50/50 dark:bg-warning-950/20 border border-warning-200 dark:border-warning-900/50"
            variants={itemVariants}
          >
            <span className="text-sm font-medium text-neutral-700 dark:text-neutral-300">
              Goals Selected
            </span>
            <span className="text-lg font-semibold text-warning-600 dark:text-warning-400">
              {selectedGoals.length} / 3
            </span>
          </motion.div>

          {/* Goal cards grid */}
          <motion.form onSubmit={handleSubmit(onSubmit)} className="space-y-6" variants={itemVariants}>
            <Controller
              name="goals"
              control={control}
              render={({ field }) => (
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                  {goalOptions.map((goal, index) => {
                    const isSelected = field.value.includes(goal.id)
                    const Icon = goal.icon

                    const handleToggle = () => {
                      if (isSelected) {
                        field.onChange(field.value.filter((id) => id !== goal.id))
                      } else {
                        if (field.value.length < 3) {
                          field.onChange([...field.value, goal.id])
                        }
                      }
                    }

                    return (
                      <motion.button
                        key={goal.id}
                        type="button"
                        onClick={handleToggle}
                        className={`relative p-6 rounded-xl border-2 transition-all duration-300 text-left ${
                          isSelected
                            ? 'border-warning-500 bg-warning-50 dark:bg-warning-950/30'
                            : 'border-neutral-200 dark:border-neutral-700 bg-white dark:bg-neutral-800 hover:border-warning-300 dark:hover:border-warning-700'
                        }`}
                        whileHover={{ scale: 1.02 }}
                        whileTap={{ scale: 0.98 }}
                        variants={{
                          hidden: { opacity: 0, y: 10 },
                          visible: {
                            opacity: 1,
                            y: 0,
                            transition: { duration: 0.3, delay: index * 0.05 },
                          },
                        }}
                        initial="hidden"
                        animate="visible"
                      >
                        {/* Background gradient for selected */}
                        {isSelected && (
                          <motion.div
                            className="absolute inset-0 rounded-xl bg-gradient-to-br from-warning-100/50 to-error-100/50 dark:from-warning-900/20 dark:to-error-900/20 pointer-events-none"
                            layoutId="selectedBg"
                            initial={{ opacity: 0 }}
                            animate={{ opacity: 1 }}
                            exit={{ opacity: 0 }}
                            transition={{ duration: 0.2 }}
                          />
                        )}

                        {/* Checkmark */}
                        <AnimatePresence>
                          {isSelected && (
                            <motion.div
                              className="absolute top-3 right-3 w-6 h-6 bg-warning-500 rounded-full flex items-center justify-center"
                              initial={{ scale: 0, rotate: -180 }}
                              animate={{ scale: 1, rotate: 0 }}
                              exit={{ scale: 0, rotate: 180 }}
                              transition={{ duration: 0.3, ease: 'easeOut' }}
                            >
                              <Check className="w-4 h-4 text-white" />
                            </motion.div>
                          )}
                        </AnimatePresence>

                        {/* Content */}
                        <div className="relative space-y-3">
                          <div className="flex items-start justify-between">
                            <div
                              className={`p-2.5 rounded-lg transition-colors ${
                                isSelected
                                  ? 'bg-warning-500 text-white'
                                  : 'bg-neutral-100 dark:bg-neutral-700 text-warning-600 dark:text-warning-400'
                              }`}
                            >
                              <Icon className="w-5 h-5" />
                            </div>
                          </div>
                          <div>
                            <h3
                              className={`font-semibold text-base ${
                                isSelected
                                  ? 'text-warning-700 dark:text-warning-300'
                                  : 'text-neutral-900 dark:text-white'
                              }`}
                            >
                              {goal.label}
                            </h3>
                            <p
                              className={`text-sm mt-1 ${
                                isSelected
                                  ? 'text-warning-600 dark:text-warning-400'
                                  : 'text-neutral-600 dark:text-neutral-400'
                              }`}
                            >
                              {goal.description}
                            </p>
                          </div>
                        </div>
                      </motion.button>
                    )
                  })}
                </div>
              )}
            />

            {/* Error message */}
            {errors.goals && (
              <motion.div
                className="p-4 rounded-lg bg-error-50 dark:bg-error-950/20 border border-error-200 dark:border-error-900/50"
                initial={{ opacity: 0, y: -10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.3 }}
              >
                <p className="text-sm font-medium text-error-700 dark:text-error-400">
                  {errors.goals.message}
                </p>
              </motion.div>
            )}

            {/* Selection summary */}
            {selectedGoals.length > 0 && (
              <motion.div
                className="p-4 rounded-lg bg-primary-50 dark:bg-primary-950/20 border border-primary-200 dark:border-primary-900/50"
                initial={{ opacity: 0, y: -10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.3 }}
              >
                <p className="text-sm font-medium text-primary-700 dark:text-primary-400">
                  <span className="font-semibold">Selected:</span>{' '}
                  {goalOptions
                    .filter((g) => selectedGoals.includes(g.id))
                    .map((g) => g.label)
                    .join(', ')}
                </p>
              </motion.div>
            )}

            {/* Navigation buttons */}
            <motion.div
              className="flex gap-3 pt-6"
              variants={itemVariants}
            >
              <Button
                type="button"
                onClick={onPrevious}
                variant="secondary"
                className="flex-1 flex items-center justify-center gap-2"
              >
                <ArrowLeft className="w-4 h-4" />
                Back
              </Button>
              <Button
                type="submit"
                disabled={!isValid || isSubmitting}
                className="flex-1 flex items-center justify-center gap-2 bg-gradient-to-r from-warning-600 to-error-600 hover:from-warning-700 hover:to-error-700 disabled:from-neutral-400 disabled:to-neutral-400"
              >
                {isSubmitting ? (
                  <>
                    <Loader2 className="w-4 h-4 animate-spin" />
                    Continue
                  </>
                ) : (
                  <>
                    Continue
                    <ArrowRight className="w-4 h-4" />
                  </>
                )}
              </Button>
            </motion.div>
          </motion.form>
        </motion.div>
      </div>
    </div>
  )
}
