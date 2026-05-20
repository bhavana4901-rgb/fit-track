import { useState, useEffect } from 'react'
import { useNavigate, Link } from 'react-router-dom'
import { useAuth } from '../hooks/useAuth'
import { StepIndicator, RegisterStep1, RegisterStep2, RegisterStep3, RegisterStep4, RegisterStep5 } from '../components/auth'
import { motion } from 'framer-motion'
import confetti from 'canvas-confetti'

const STORAGE_KEY = 'fit-track-registration-data'

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

  // Load form data from localStorage on mount
  useEffect(() => {
    const savedData = localStorage.getItem(STORAGE_KEY)
    if (savedData) {
      try {
        setFormData(JSON.parse(savedData))
      } catch (error) {
        console.error('Failed to parse saved registration data:', error)
      }
    }
  }, [])

  // Save form data to localStorage whenever it changes
  useEffect(() => {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(formData))
  }, [formData])

  const handleNext = (stepData) => {
    // Merge step data with existing formData
    const updatedData = { ...formData, ...stepData }
    setFormData(updatedData)
    
    if (step < 5) {
      setStep(step + 1)
    } else {
      handleSubmit(updatedData)
    }
  }

  const handlePrevious = () => {
    if (step > 1) {
      setStep(step - 1)
    }
  }

  const triggerConfetti = () => {
    // Multiple confetti bursts for a celebration effect
    const duration = 3 * 1000
    const animationEnd = Date.now() + duration
    const defaults = { startVelocity: 30, spread: 360, ticks: 60, zIndex: 0 }

    const randomInRange = (min, max) => Math.random() * (max - min) + min

    const interval = setInterval(() => {
      const timeLeft = animationEnd - Date.now()

      if (timeLeft <= 0) {
        return clearInterval(interval)
      }

      const particleCount = 50 * (timeLeft / duration)
      confetti({
        ...defaults,
        particleCount,
        origin: { x: randomInRange(0.1, 0.3), y: Math.random() - 0.2 },
      })
      confetti({
        ...defaults,
        particleCount,
        origin: { x: randomInRange(0.7, 0.9), y: Math.random() - 0.2 },
      })
    }, 250)
  }

  const handleSubmit = (registrationData) => {
    if (registrationData.email && registrationData.fullName) {
      // Trigger confetti animation
      triggerConfetti()

      // Small delay to let confetti start before redirect
      setTimeout(() => {
        // Save complete registration data to localStorage
        localStorage.setItem('fit-track-user-profile', JSON.stringify({
          fullName: registrationData.fullName,
          email: registrationData.email,
          dateOfBirth: registrationData.dateOfBirth || '',
          gender: registrationData.gender || '',
          height: registrationData.height || 170,
          heightUnit: registrationData.heightUnit || 'cm',
          weight: registrationData.weight || 70,
          weightUnit: registrationData.weightUnit || 'kg',
          goals: registrationData.goals || [],
          activityLevel: registrationData.activityLevel || '',
          username: registrationData.username || '',
          bio: registrationData.bio || '',
          emailNotifications: registrationData.emailNotifications ?? true,
          pushNotifications: registrationData.pushNotifications ?? false,
          weeklyDigest: registrationData.weeklyDigest ?? true,
          avatar: registrationData.avatar || null,
          registeredAt: new Date().toISOString(),
        }))

        // Auto-login user
        login(registrationData.email, registrationData.fullName)

        // Clear registration form data from localStorage
        localStorage.removeItem(STORAGE_KEY)

        // Redirect to dashboard
        navigate('/dashboard', { replace: true })
      }, 300)
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
            onSkip={() => handleNext({})}
          />
        )}
      </motion.div>
    </div>
  )
}
