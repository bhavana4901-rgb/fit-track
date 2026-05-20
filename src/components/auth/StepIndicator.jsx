export default function StepIndicator({ currentStep = 1, totalSteps = 5 }) {
  const progress = (currentStep / totalSteps) * 100

  return (
    <div className="mb-8">
      <div className="flex justify-between items-center mb-4">
        <span className="text-sm font-medium text-neutral-600 dark:text-neutral-400">
          Step {currentStep} of {totalSteps}
        </span>
        <span className="text-sm font-medium text-neutral-600 dark:text-neutral-400">
          {progress.toFixed(0)}%
        </span>
      </div>
      <div className="h-2 bg-neutral-200 dark:bg-neutral-700 rounded-full overflow-hidden">
        <div
          className="h-full bg-primary-600 rounded-full transition-all duration-300"
          style={{ width: `${progress}%` }}
        ></div>
      </div>

      <div className="flex justify-between mt-4 gap-2">
        {Array.from({ length: totalSteps }).map((_, i) => (
          <div
            key={i}
            className={`h-2 flex-1 rounded-full transition-all duration-300 ${
              i + 1 <= currentStep ? 'bg-primary-600' : 'bg-neutral-200 dark:bg-neutral-700'
            }`}
          ></div>
        ))}
      </div>
    </div>
  )
}
