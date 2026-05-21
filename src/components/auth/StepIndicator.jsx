import { motion } from 'framer-motion'
import { Check } from 'lucide-react'
export default function StepIndicator({
  currentStep = 1,
  totalSteps = 5,
  steps = [],
  size = 'md', // 'sm', 'md', 'lg'
  showLabels = true,
  variant = 'default', // 'default', 'compact'
  className = '',
}) {
  const defaultSteps = [
    { label: 'Account', description: 'Create your account' },
    { label: 'Details', description: 'Personal information' },
    { label: 'Goals', description: 'Fitness goals' },
    { label: 'Activity', description: 'Activity level' },
    { label: 'Profile', description: 'Complete profile' },
  ]
  const stepList = steps.length > 0 ? steps : defaultSteps.slice(0, totalSteps)
  const progress = ((currentStep - 1) / (totalSteps - 1)) * 100
  const sizeClasses = {
    sm: {
      dot: 'w-8 h-8',
      dotText: 'text-xs',
      label: 'text-xs',
      description: 'text-xs',
      progressHeight: 'h-1',
    },
    md: {
      dot: 'w-10 h-10',
      dotText: 'text-sm',
      label: 'text-sm',
      description: 'text-xs',
      progressHeight: 'h-1.5',
    },
    lg: {
      dot: 'w-12 h-12',
      dotText: 'text-base',
      label: 'text-base',
      description: 'text-sm',
      progressHeight: 'h-2',
    },
  }
  const currentSizeClasses = sizeClasses[size]
  const isStepComplete = (step) => step < currentStep
  const isStepCurrent = (step) => step === currentStep
  const isStepFuture = (step) => step > currentStep
  return (
    <div className={`w-full ${className}`}>
      {}
      <div className="space-y-6">
        {}
        <div className="space-y-2">
          {}
          <div className="flex items-center justify-between">
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.3 }}
              className="text-sm font-semibold text-neutral-900 dark:text-white"
            >
              Step {currentStep} of {totalSteps}
            </motion.div>
            <motion.div
              key={`${currentStep}-progress`}
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.3 }}
              className="text-sm font-medium text-primary-600 dark:text-primary-400"
            >
              {Math.round(progress)}%
            </motion.div>
          </div>
          {}
          <div className={`w-full bg-neutral-200 dark:bg-neutral-700 rounded-full overflow-hidden ${currentSizeClasses.progressHeight}`}>
            <motion.div
              className="h-full bg-gradient-to-r from-primary-600 to-secondary-600 rounded-full"
              initial={{ width: '0%' }}
              animate={{ width: `${progress}%` }}
              transition={{ duration: 0.6, ease: 'easeInOut' }}
            />
          </div>
        </div>
        {}
        {variant === 'default' && (
          <div className="space-y-4 relative">
            {}
            <div className="flex items-center justify-between">
              {stepList.map((step, index) => {
                const stepNumber = index + 1
                const isComplete = isStepComplete(stepNumber)
                const isCurrent = isStepCurrent(stepNumber)
                const isFuture = isStepFuture(stepNumber)
                return (
                  <div key={stepNumber} className="flex flex-col items-center gap-2">
                    {}
                    <motion.div
                      initial={false}
                      animate={{
                        scale: isCurrent ? 1.15 : 1,
                        boxShadow: isCurrent
                          ? '0 0 0 6px rgba(59, 130, 246, 0.1)'
                          : '0 0 0 0px rgba(59, 130, 246, 0)',
                      }}
                      transition={{ duration: 0.3 }}
                      className={`
                        relative flex items-center justify-center rounded-full
                        font-semibold transition-all duration-300
                        ${currentSizeClasses.dot}
                        ${
                          isComplete
                            ? 'bg-success-600 dark:bg-success-500 text-white shadow-lg shadow-success-500/30'
                            : isCurrent
                            ? 'bg-primary-600 dark:bg-primary-500 text-white shadow-lg shadow-primary-500/50'
                            : 'bg-neutral-200 dark:bg-neutral-700 text-neutral-600 dark:text-neutral-300'
                        }
                      `}
                    >
                      {isComplete ? (
                        <motion.div
                          initial={{ scale: 0, rotate: -180 }}
                          animate={{ scale: 1, rotate: 0 }}
                          transition={{ duration: 0.4, ease: 'backOut' }}
                        >
                          <Check className="w-5 h-5" />
                        </motion.div>
                      ) : (
                        <motion.span
                          className={currentSizeClasses.dotText}
                          initial={{ opacity: 0 }}
                          animate={{ opacity: 1 }}
                          transition={{ duration: 0.2 }}
                        >
                          {stepNumber}
                        </motion.span>
                      )}
                    </motion.div>
                    {}
                    {showLabels && (
                      <motion.div
                        className="text-center"
                        initial={{ opacity: 0, y: -4 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.3, delay: 0.1 }}
                      >
                        <p
                          className={`
                            font-semibold text-neutral-900 dark:text-white
                            ${currentSizeClasses.label}
                          `}
                        >
                          {step.label}
                        </p>
                        {step.description && (
                          <p
                            className={`
                              text-neutral-600 dark:text-neutral-400
                              ${currentSizeClasses.description}
                            `}
                          >
                            {step.description}
                          </p>
                        )}
                      </motion.div>
                    )}
                  </div>
                )
              })}
            </div>
          </div>
        )}
        {}
        {variant === 'compact' && (
          <div className="space-y-2">
            {}
            <div className="flex items-center justify-between gap-1">
              {stepList.map((step, index) => {
                const stepNumber = index + 1
                const isComplete = isStepComplete(stepNumber)
                const isCurrent = isStepCurrent(stepNumber)
                return (
                  <motion.div
                    key={stepNumber}
                    animate={{
                      scale: isCurrent ? 1.2 : 1,
                      boxShadow: isCurrent
                        ? '0 0 0 3px rgba(59, 130, 246, 0.2)'
                        : '0 0 0 0px',
                    }}
                    transition={{ duration: 0.3 }}
                    className={`
                      flex-1 h-1 rounded-full transition-all duration-300
                      ${
                        isComplete
                          ? 'bg-success-600 dark:bg-success-500'
                          : isCurrent
                          ? 'bg-primary-600 dark:bg-primary-500'
                          : 'bg-neutral-200 dark:bg-neutral-700'
                      }
                    `}
                    title={`Step ${stepNumber}: ${step.label}`}
                  />
                )
              })}
            </div>
          </div>
        )}
      </div>
    </div>
  )
}
