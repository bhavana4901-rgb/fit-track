import { motion } from 'framer-motion'
import { Check } from 'lucide-react'
import { viewTransitionFast } from '../landing/landingMotion'
export default function RegisterStepper({ currentStep = 1, steps = [] }) {
  const total = steps.length
  const active = steps[currentStep - 1]
  const progressPercentage = Math.round((currentStep / total) * 100)
  return (
    <nav aria-label="Registration progress" className="w-full">
      {}
      <div className="mb-6">
        <div className="flex items-center justify-between mb-2">
          <span className="text-sm font-semibold text-neutral-700 dark:text-neutral-300">
            Step {currentStep} of {total}
          </span>
          <span className="text-sm font-bold text-primary-600 dark:text-primary-400">
            {progressPercentage}%
          </span>
        </div>
        <div className="relative w-full h-2 bg-neutral-200 dark:bg-neutral-800 rounded-full overflow-hidden">
          <motion.div
            className="absolute top-0 left-0 h-full bg-gradient-to-r from-primary-500 via-secondary-500 to-accent-500 rounded-full"
            initial={{ width: 0 }}
            animate={{ width: `${progressPercentage}%` }}
            transition={{ duration: 0.6, ease: [0.4, 0, 0.2, 1] }}
          />
        </div>
      </div>
      {}
      <ol className="flex items-center w-full list-none m-0 p-0">
        {steps.map((step, index) => {
          const stepNumber = index + 1
          const isComplete = stepNumber < currentStep
          const isCurrent = stepNumber === currentStep
          const isLast = index === total - 1
          return (
            <li
              key={step.label}
              className={`flex items-center ${isLast ? 'flex-none' : 'flex-1 min-w-0'}`}
              aria-current={isCurrent ? 'step' : undefined}
            >
              <div className="flex flex-col items-center gap-1.5 flex-shrink-0">
                <motion.div
                  layout
                  transition={viewTransitionFast}
                  className={`
                    relative flex items-center justify-center rounded-full font-semibold text-xs
                    w-8 h-8 sm:w-9 sm:h-9
                    ${
                      isComplete
                        ? 'bg-success-600 text-white shadow-sm'
                        : isCurrent
                          ? 'bg-primary-600 text-white ring-4 ring-primary-500/20 dark:ring-primary-400/25 shadow-md shadow-primary-500/25'
                          : 'bg-neutral-100 dark:bg-neutral-800 text-neutral-500 dark:text-neutral-400 border border-neutral-200 dark:border-neutral-700'
                    }
                  `}
                >
                  {isComplete ? (
                    <Check className="w-4 h-4" strokeWidth={2.5} aria-hidden />
                  ) : (
                    <span>{stepNumber}</span>
                  )}
                </motion.div>
                <span
                  className={`
                    hidden md:block text-[10px] sm:text-xs font-medium text-center leading-tight max-w-[4.25rem] truncate
                    ${isCurrent ? 'text-primary-700 dark:text-primary-300' : isComplete ? 'text-success-700 dark:text-success-400' : 'text-neutral-500 dark:text-neutral-500'}
                  `}
                >
                  {step.label}
                </span>
              </div>
              {!isLast && (
                <div
                  className="flex-1 h-0.5 mx-1.5 sm:mx-2 rounded-full bg-neutral-200 dark:bg-neutral-700 overflow-hidden min-w-[0.5rem]"
                  aria-hidden
                >
                  <motion.div
                    className="h-full rounded-full bg-gradient-to-r from-success-500 to-primary-500"
                    initial={false}
                    animate={{ width: isComplete ? '100%' : '0%' }}
                    transition={{ duration: 0.35, ease: 'easeOut' }}
                  />
                </div>
              )}
            </li>
          )
        })}
      </ol>
      <motion.div
        key={currentStep}
        initial={{ opacity: 0, y: 4 }}
        animate={{ opacity: 1, y: 0 }}
        transition={viewTransitionFast}
        className="mt-4 flex flex-wrap items-baseline gap-x-2 gap-y-0.5"
      >
        <span className="text-xs font-medium uppercase tracking-wider text-primary-600 dark:text-primary-400">
          Step {currentStep} of {total}
        </span>
        <span className="text-sm sm:text-base font-semibold text-neutral-900 dark:text-white">
          {active?.label}
        </span>
        {active?.description && (
          <span className="w-full text-xs sm:text-sm text-neutral-500 dark:text-neutral-400">
            {active.description}
          </span>
        )}
      </motion.div>
    </nav>
  )
}
