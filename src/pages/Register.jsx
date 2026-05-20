import { useEffect } from 'react'
import { StepIndicator, RegisterStep1, RegisterStep2, RegisterStep3, RegisterStep4, RegisterStep5 } from '../components/auth'
import { motion } from 'framer-motion'
import { useRegisterForm } from '../hooks/useRegisterForm'

export default function Register() {
  const {
    step,
    formData,
    stepErrors,
    isSubmitting,
    handleNext,
    handlePrevious,
    handleSkip,
  } = useRegisterForm()

  // Scroll to top on step change
  useEffect(() => {
    window.scrollTo(0, 0)
  }, [step])

  return (
    <div className="min-h-screen bg-gradient-to-br from-white via-blue-50/30 to-purple-50/20 dark:from-neutral-950 dark:via-neutral-900 dark:to-purple-950/20 relative overflow-hidden">
      {/* Step Indicator Header */}
      <motion.div
        className="sticky top-0 z-40 bg-white/80 dark:bg-neutral-950/80 backdrop-blur-lg border-b border-neutral-200/50 dark:border-neutral-800/50 py-6 px-4 sm:px-6 lg:px-8"
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
      >
        <div className="max-w-7xl mx-auto">
          <StepIndicator
            currentStep={step}
            totalSteps={5}
            steps={[
              { label: 'Account', description: 'Create your account' },
              { label: 'Details', description: 'Personal information' },
              { label: 'Goals', description: 'Fitness goals' },
              { label: 'Activity', description: 'Activity level' },
              { label: 'Profile', description: 'Complete profile' },
            ]}
          />
        </div>
      </motion.div>

      {/* Step Content */}
      <motion.div
        key={step}
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        transition={{ duration: 0.3 }}
      >
        {step === 1 && (
          <RegisterStep1
            onNext={handleNext}
            onPrevious={handlePrevious}
            initialData={formData}
          />
        )}

        {step === 2 && (
          <RegisterStep2
            onNext={handleNext}
            onPrevious={handlePrevious}
            initialData={formData}
          />
        )}

        {step === 3 && (
          <RegisterStep3
            onNext={handleNext}
            onPrevious={handlePrevious}
            initialData={formData}
          />
        )}

        {step === 4 && (
          <RegisterStep4
            onNext={handleNext}
            onPrevious={handlePrevious}
            initialData={formData}
          />
        )}

        {step === 5 && (
          <RegisterStep5
            onNext={handleNext}
            onPrevious={handlePrevious}
            initialData={formData}
            onSkip={handleSkip}
          />
        )}
      </motion.div>
    </div>
  )
}
