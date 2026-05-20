import { useState } from 'react'
import { useForm, Controller } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { z } from 'zod'
import { motion, AnimatePresence } from 'framer-motion'
import {
  Armchair,
  Wind,
  Dumbbell,
  Flame,
  Zap,
  ArrowLeft,
  ArrowRight,
  Loader2,
  SkipForward,
} from 'lucide-react'
import Button from '../ui/Button'

// Zod validation schema
const registerStep4Schema = z.object({
  activityLevel: z.enum(['sedentary', 'lightly-active', 'moderately-active', 'very-active', 'athlete'], {
    errorMap: () => ({ message: 'Please select your activity level' }),
  }),
})

// Activity level options with icons and descriptions
const activityLevelOptions = [
  {
    id: 'sedentary',
    label: 'Sedentary',
    description: 'Little or no exercise',
    details: 'Desk job, minimal physical activity',
    icon: Armchair,
    color: 'from-blue-400 to-cyan-400',
  },
  {
    id: 'lightly-active',
    label: 'Lightly Active',
    description: 'Exercise 1-2 days/week',
    details: 'Light exercise or sports',
    icon: Wind,
    color: 'from-cyan-400 to-teal-400',
  },
  {
    id: 'moderately-active',
    label: 'Moderately Active',
    description: 'Exercise 3-4 days/week',
    details: 'Moderate exercise or sports',
    icon: Dumbbell,
    color: 'from-teal-400 to-emerald-400',
  },
  {
    id: 'very-active',
    label: 'Very Active',
    description: 'Exercise 5-6 days/week',
    details: 'Intense exercise or sports',
    icon: Flame,
    color: 'from-emerald-400 to-orange-400',
  },
  {
    id: 'athlete',
    label: 'Athlete',
    description: 'Daily intense exercise',
    details: 'Professional or daily athlete',
    icon: Zap,
    color: 'from-orange-400 to-red-400',
  },
]

export default function RegisterStep4({ onNext, onPrevious, initialData, onSkip }) {
  const [isSubmitting, setIsSubmitting] = useState(false)

  const {
    control,
    handleSubmit,
    watch,
    formState: { errors, isValid },
  } = useForm({
    resolver: zodResolver(registerStep4Schema),
    mode: 'onChange',
    defaultValues: {
      activityLevel: initialData?.activityLevel || '',
    },
  })

  const selectedActivityLevel = watch('activityLevel')
  const selectedOption = activityLevelOptions.find((opt) => opt.id === selectedActivityLevel)

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

  const handleSkip = () => {
    if (onSkip) {
      onSkip()
    } else {
      onNext({ activityLevel: null })
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
    <div className="min-h-screen bg-gradient-to-br from-white via-purple-50/30 to-pink-50/20 dark:from-neutral-950 dark:via-neutral-900 dark:to-pink-950/20 relative overflow-hidden py-12 px-4 sm:px-6 lg:px-8">
      {/* Animated background blobs */}
      <motion.div
        className="absolute top-10 right-5 w-48 h-48 bg-gradient-to-br from-primary-400/20 to-accent-400/20 dark:from-primary-600/10 dark:to-accent-600/10 rounded-full blur-3xl pointer-events-none"
        variants={blobVariants}
        animate="animate"
        transition={{ duration: 8, repeat: Infinity, ease: 'easeInOut' }}
      />
      <motion.div
        className="absolute bottom-10 left-5 w-64 h-64 bg-gradient-to-br from-secondary-400/20 to-primary-400/20 dark:from-secondary-600/10 dark:to-primary-600/10 rounded-full blur-3xl pointer-events-none"
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
            <h1 className="text-4xl md:text-5xl font-bold bg-gradient-to-r from-primary-600 via-secondary-600 to-accent-600 dark:from-primary-400 dark:via-secondary-400 dark:to-accent-400 bg-clip-text text-transparent">
              What's Your Activity Level?
            </h1>
            <p className="text-lg text-neutral-600 dark:text-neutral-400">
              Help us understand your current fitness habits to tailor your experience
            </p>
          </motion.div>

          {/* Activity level cards form */}
          <motion.form onSubmit={handleSubmit(onSubmit)} className="space-y-6" variants={itemVariants}>
            <Controller
              name="activityLevel"
              control={control}
              render={({ field }) => (
                <div className="space-y-4">
                  {activityLevelOptions.map((option, index) => {
                    const isSelected = field.value === option.id
                    const Icon = option.icon

                    return (
                      <motion.button
                        key={option.id}
                        type="button"
                        onClick={() => field.onChange(option.id)}
                        className={`relative w-full p-6 rounded-xl border-2 transition-all duration-300 text-left group ${
                          isSelected
                            ? 'border-primary-500 bg-gradient-to-r from-primary-50 to-secondary-50 dark:from-primary-950/30 dark:to-secondary-950/30'
                            : 'border-neutral-200 dark:border-neutral-700 bg-white dark:bg-neutral-800 hover:border-primary-300 dark:hover:border-primary-700'
                        }`}
                        whileHover={{ scale: 1.01 }}
                        whileTap={{ scale: 0.99 }}
                        variants={{
                          hidden: { opacity: 0, y: 10 },
                          visible: {
                            opacity: 1,
                            y: 0,
                            transition: { duration: 0.3, delay: index * 0.08 },
                          },
                        }}
                        initial="hidden"
                        animate="visible"
                      >
                        {/* Gradient background for selected */}
                        {isSelected && (
                          <motion.div
                            className={`absolute inset-0 rounded-xl bg-gradient-to-r ${option.color}/10 dark:${option.color}/5 pointer-events-none`}
                            layoutId="selectedActivityBg"
                            initial={{ opacity: 0 }}
                            animate={{ opacity: 1 }}
                            exit={{ opacity: 0 }}
                            transition={{ duration: 0.2 }}
                          />
                        )}

                        {/* Radio indicator */}
                        <div className="absolute top-6 right-6 w-6 h-6 rounded-full border-2 flex items-center justify-center transition-all duration-300">
                          <div
                            className={`w-4 h-4 rounded-full transition-all duration-300 ${
                              isSelected
                                ? 'bg-primary-500'
                                : 'bg-transparent group-hover:bg-neutral-300 dark:group-hover:bg-neutral-600'
                            }`}
                          />
                        </div>

                        {/* Content */}
                        <div className="relative space-y-3">
                          <div className="flex items-start gap-4">
                            <div
                              className={`p-3 rounded-lg transition-all duration-300 flex-shrink-0 ${
                                isSelected
                                  ? `bg-gradient-to-br ${option.color} text-white`
                                  : 'bg-neutral-100 dark:bg-neutral-700 text-neutral-600 dark:text-neutral-400'
                              }`}
                            >
                              <Icon className="w-6 h-6" />
                            </div>
                            <div className="flex-1">
                              <h3
                                className={`font-semibold text-lg ${
                                  isSelected
                                    ? 'text-primary-700 dark:text-primary-300'
                                    : 'text-neutral-900 dark:text-white'
                                }`}
                              >
                                {option.label}
                              </h3>
                              <p
                                className={`text-sm font-medium ${
                                  isSelected
                                    ? 'text-primary-600 dark:text-primary-400'
                                    : 'text-neutral-600 dark:text-neutral-400'
                                }`}
                              >
                                {option.description}
                              </p>
                            </div>
                          </div>
                          <p
                            className={`text-sm ${
                              isSelected
                                ? 'text-primary-600 dark:text-primary-400'
                                : 'text-neutral-500 dark:text-neutral-500'
                            }`}
                          >
                            {option.details}
                          </p>
                        </div>
                      </motion.button>
                    )
                  })}
                </div>
              )}
            />

            {/* Error message */}
            {errors.activityLevel && (
              <motion.div
                className="p-4 rounded-lg bg-error-50 dark:bg-error-950/20 border border-error-200 dark:border-error-900/50"
                initial={{ opacity: 0, y: -10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.3 }}
              >
                <p className="text-sm font-medium text-error-700 dark:text-error-400">
                  {errors.activityLevel.message}
                </p>
              </motion.div>
            )}

            {/* Selection summary */}
            {selectedOption && (
              <motion.div
                className="p-5 rounded-lg bg-primary-50 dark:bg-primary-950/20 border border-primary-200 dark:border-primary-900/50"
                initial={{ opacity: 0, y: -10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.3 }}
              >
                <div className="flex items-start gap-3">
                  <div className={`p-2 rounded-lg bg-gradient-to-br ${selectedOption.color}`}>
                    {selectedOption.icon && (
                      <selectedOption.icon className="w-5 h-5 text-white" />
                    )}
                  </div>
                  <div>
                    <p className="font-semibold text-primary-700 dark:text-primary-300">
                      {selectedOption.label}
                    </p>
                    <p className="text-sm text-primary-600 dark:text-primary-400">
                      {selectedOption.description}
                    </p>
                  </div>
                </div>
              </motion.div>
            )}

            {/* Navigation buttons and skip link */}
            <motion.div
              className="flex flex-col gap-4 pt-6"
              variants={itemVariants}
            >
              <div className="flex gap-3">
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
                  className="flex-1 flex items-center justify-center gap-2 bg-gradient-to-r from-primary-600 to-secondary-600 hover:from-primary-700 hover:to-secondary-700 disabled:from-neutral-400 disabled:to-neutral-400"
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
              </div>

              {/* Skip for now link */}
              <button
                type="button"
                onClick={handleSkip}
                className="py-2 px-4 text-center text-sm font-medium text-neutral-600 dark:text-neutral-400 hover:text-primary-600 dark:hover:text-primary-400 transition-colors rounded-lg hover:bg-neutral-100 dark:hover:bg-neutral-900"
              >
                <div className="flex items-center justify-center gap-2">
                  <SkipForward className="w-4 h-4" />
                  Skip for now
                </div>
              </button>
            </motion.div>
          </motion.form>
        </motion.div>
      </div>
    </div>
  )
}
