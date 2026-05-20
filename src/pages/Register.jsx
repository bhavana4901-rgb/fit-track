import { useState } from 'react'
import { useNavigate, Link } from 'react-router-dom'
import { useAuth } from '../hooks/useAuth'
import { StepIndicator, RegisterStep1, RegisterStep2, RegisterStep3 } from '../components/auth'
import { motion } from 'framer-motion'

export default function Register() {
  const [step, setStep] = useState(1)
  const [formData, setFormData] = useState({
    fullName: '',
    email: '',
    password: '',
    confirmPassword: '',
  })
  const navigate = useNavigate()
  const { login } = useAuth()

  const handleNext = (stepData) => {
    // Merge step data with existing formData
    setFormData((prev) => ({ ...prev, ...stepData }))
    if (step < 5) {
      setStep(step + 1)
    } else {
      handleSubmit()
    }
  }

  const handlePrevious = () => {
    if (step > 1) {
      setStep(step - 1)
    }
  }

  const handleSubmit = () => {
    if (formData.email && formData.fullName) {
      login(formData.email, formData.fullName)
      navigate('/dashboard')
    }
  }

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
          <div className="min-h-screen flex items-center justify-center px-4 py-12">
            <div className="max-w-2xl w-full text-center">
              <h1 className="text-3xl font-bold text-neutral-900 dark:text-white mb-4">
                Activity Level
              </h1>
              <p className="text-neutral-600 dark:text-neutral-400 mb-8">
                Step 4 content coming in next commit
              </p>
              <div className="flex gap-4">
                <button
                  onClick={handlePrevious}
                  className="flex-1 py-3 border-2 border-neutral-200 dark:border-neutral-700 text-neutral-700 dark:text-neutral-300 rounded-lg hover:bg-neutral-50 dark:hover:bg-neutral-900 font-medium transition"
                >
                  Back
                </button>
                <button
                  onClick={() => handleNext({})}
                  className="flex-1 py-3 bg-primary-600 text-white rounded-lg hover:bg-primary-700 font-medium transition"
                >
                  Continue
                </button>
              </div>
            </div>
          </div>
        )}

        {step === 5 && (
          <div className="min-h-screen flex items-center justify-center px-4 py-12">
            <div className="max-w-2xl w-full text-center">
              <h1 className="text-3xl font-bold text-neutral-900 dark:text-white mb-4">
                Profile Setup
              </h1>
              <p className="text-neutral-600 dark:text-neutral-400 mb-8">
                Step 5 content coming in next commit
              </p>
              <div className="flex gap-4">
                <button
                  onClick={handlePrevious}
                  className="flex-1 py-3 border-2 border-neutral-200 dark:border-neutral-700 text-neutral-700 dark:text-neutral-300 rounded-lg hover:bg-neutral-50 dark:hover:bg-neutral-900 font-medium transition"
                >
                  Back
                </button>
                <button
                  onClick={handleSubmit}
                  className="flex-1 py-3 bg-success-600 text-white rounded-lg hover:bg-success-700 font-medium transition"
                >
                  Complete Registration
                </button>
              </div>
            </div>
          </div>
        )}
      </motion.div>
    </div>
  )
}
