import { useState, useEffect, useCallback } from 'react'
import { useNavigate } from 'react-router-dom'
import { useAuth } from './useAuth'
import confetti from 'canvas-confetti'
import { validateStep } from '../utils/validationSchemas'

const STORAGE_KEY = 'fit-track-registration-data'
const PROFILE_STORAGE_KEY = 'fit-track-user-profile'

/**
 * Custom hook for managing the multi-step registration form
 * Handles state management, localStorage persistence, navigation, and submission
 */
export const useRegisterForm = () => {
  const [step, setStep] = useState(1)
  const [formData, setFormData] = useState({
    fullName: '',
    email: '',
    password: '',
    confirmPassword: '',
  })
  const [stepErrors, setStepErrors] = useState({})
  const [isSubmitting, setIsSubmitting] = useState(false)
  const navigate = useNavigate()
  const { login } = useAuth()

  // Load form data from localStorage on mount
  useEffect(() => {
    const savedData = localStorage.getItem(STORAGE_KEY)
    if (savedData) {
      try {
        const parsedData = JSON.parse(savedData)
        setFormData(parsedData)
      } catch (error) {
        console.error('Failed to parse saved registration data:', error)
      }
    }
  }, [])

  // Save form data to localStorage whenever it changes
  useEffect(() => {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(formData))
  }, [formData])

  /**
   * Validate current step and advance if valid
   */
  const handleNext = useCallback(
    (stepData) => {
      // Merge new step data
      const updatedData = { ...formData, ...stepData }
      
      // Validate current step
      const { valid, errors } = validateStep(step, updatedData)
      
      if (!valid) {
        setStepErrors(errors)
        return false
      }

      // Clear errors on successful validation
      setStepErrors({})
      
      // Update form data
      setFormData(updatedData)

      // Advance to next step or submit
      if (step < 5) {
        setStep(step + 1)
      } else {
        handleSubmit(updatedData)
      }

      return true
    },
    [step, formData]
  )

  /**
   * Go to previous step
   */
  const handlePrevious = useCallback(() => {
    if (step > 1) {
      setStep(step - 1)
      setStepErrors({})
    }
  }, [step])

  /**
   * Skip current step (only for optional steps 4 & 5)
   */
  const handleSkip = useCallback(() => {
    if (step < 5) {
      setStep(step + 1)
      setStepErrors({})
    } else {
      // On step 5, skip means complete registration with minimal data
      handleSubmit(formData)
    }
  }, [step, formData])

  /**
   * Trigger confetti animation for celebration
   */
  const triggerConfetti = () => {
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

  /**
   * Handle final form submission
   */
  const handleSubmit = useCallback(
    (registrationData) => {
      setIsSubmitting(true)

      try {
        if (registrationData.email && registrationData.fullName) {
          // Trigger confetti animation
          triggerConfetti()

          // Small delay to let confetti start before redirect
          setTimeout(() => {
            // Save complete registration data to localStorage
            localStorage.setItem(
              PROFILE_STORAGE_KEY,
              JSON.stringify({
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
              })
            )

            // Auto-login user
            login(registrationData.email, registrationData.fullName)

            // Clear registration form data from localStorage
            localStorage.removeItem(STORAGE_KEY)

            // Reset state
            setIsSubmitting(false)

            // Redirect to dashboard
            navigate('/dashboard', { replace: true })
          }, 300)
        } else {
          setIsSubmitting(false)
          setStepErrors({ general: 'Missing required fields' })
        }
      } catch (error) {
        console.error('Registration submission error:', error)
        setIsSubmitting(false)
        setStepErrors({ general: 'An error occurred during registration' })
      }
    },
    [login, navigate]
  )

  /**
   * Clear all stored data (for development/debugging)
   */
  const clearStoredData = useCallback(() => {
    localStorage.removeItem(STORAGE_KEY)
    localStorage.removeItem(PROFILE_STORAGE_KEY)
    setFormData({
      fullName: '',
      email: '',
      password: '',
      confirmPassword: '',
    })
    setStep(1)
    setStepErrors({})
  }, [])

  /**
   * Get current step data
   */
  const getCurrentStepData = useCallback(() => {
    switch (step) {
      case 1:
        return {
          fullName: formData.fullName,
          email: formData.email,
          password: formData.password,
          confirmPassword: formData.confirmPassword,
        }
      case 2:
        return {
          dateOfBirth: formData.dateOfBirth,
          gender: formData.gender,
          height: formData.height,
          heightUnit: formData.heightUnit,
          weight: formData.weight,
          weightUnit: formData.weightUnit,
        }
      case 3:
        return {
          goals: formData.goals,
        }
      case 4:
        return {
          activityLevel: formData.activityLevel,
        }
      case 5:
        return {
          avatar: formData.avatar,
          username: formData.username,
          bio: formData.bio,
          emailNotifications: formData.emailNotifications,
          pushNotifications: formData.pushNotifications,
          weeklyDigest: formData.weeklyDigest,
        }
      default:
        return {}
    }
  }, [step, formData])

  return {
    // State
    step,
    formData,
    stepErrors,
    isSubmitting,
    currentStepData: getCurrentStepData(),

    // Navigation
    handleNext,
    handlePrevious,
    handleSkip,

    // Submission
    handleSubmit,

    // Utilities
    triggerConfetti,
    clearStoredData,
    validateStep: (data) => validateStep(step, data),
  }
}
