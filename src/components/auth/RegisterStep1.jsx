import { useState, useMemo } from 'react'
import { motion } from 'framer-motion'
import { useForm } from 'react-hook-form'
import { z } from 'zod'
import { zodResolver } from '@hookform/resolvers/zod'
import { Eye, EyeOff, Mail, Lock, User, CheckCircle, AlertCircle } from 'lucide-react'
import { Input, ErrorDisplay } from '../ui'
import { Button } from '../ui'

// Validation schema for step 1
const registerStep1Schema = z
  .object({
    fullName: z
      .string()
      .min(1, 'Full name is required')
      .min(2, 'Full name must be at least 2 characters')
      .max(50, 'Full name must be less than 50 characters')
      .regex(/^[a-zA-Z\s-']+$/, 'Full name can only contain letters, spaces, hyphens, and apostrophes'),
    email: z
      .string()
      .email('Please enter a valid email address')
      .min(1, 'Email is required'),
    password: z
      .string()
      .min(1, 'Password is required')
      .min(8, 'Password must be at least 8 characters'),
    confirmPassword: z
      .string()
      .min(1, 'Please confirm your password'),
  })
  .refine((data) => data.password === data.confirmPassword, {
    message: 'Passwords do not match',
    path: ['confirmPassword'],
  })

/**
 * Calculate password strength
 * @param {string} password - Password string
 * @returns {Object} Strength object with score (0-4) and label
 */
const calculatePasswordStrength = (password) => {
  let strength = 0
  const feedback = []

  if (!password) {
    return { score: 0, label: 'No password', color: 'bg-neutral-200', percentage: 0, feedback }
  }

  // Length check
  if (password.length >= 8) strength++
  if (password.length >= 12) strength++

  // Lowercase letters
  if (/[a-z]/.test(password)) {
    strength++
  } else {
    feedback.push('Add lowercase letters')
  }

  // Uppercase letters
  if (/[A-Z]/.test(password)) {
    strength++
  } else {
    feedback.push('Add uppercase letters')
  }

  // Numbers
  if (/\d/.test(password)) {
    strength++
  } else {
    feedback.push('Add numbers')
  }

  // Special characters
  if (/[!@#$%^&*()_+\-=[\]{};':"\\|,.<>/?]/.test(password)) {
    strength++
  } else {
    feedback.push('Add special characters')
  }

  // Determine strength level (0-4)
  let level = 0
  if (strength >= 4) level = 4 // Strong
  else if (strength >= 3) level = 3 // Good
  else if (strength >= 2) level = 2 // Fair
  else if (strength >= 1) level = 1 // Weak
  else level = 0 // Very weak

  const strengthLevels = {
    0: { label: 'Very Weak', color: 'bg-error-500', percentage: 10 },
    1: { label: 'Weak', color: 'bg-warning-500', percentage: 30 },
    2: { label: 'Fair', color: 'bg-accent-500', percentage: 50 },
    3: { label: 'Good', color: 'bg-primary-500', percentage: 75 },
    4: { label: 'Strong', color: 'bg-success-500', percentage: 100 },
  }

  return { score: level, ...strengthLevels[level], feedback }
}

/**
 * RegisterStep1 Component
 * First step of multi-step registration form
 * - Full name, email, password, confirm password fields
 * - Real-time password strength meter
 * - Form validation with Zod + React Hook Form
 * - Sign up with Google button
 * - Continue button disabled until valid
 * - Animated background and transitions
 */
export default function RegisterStep1({ onNext, onPrevious, initialData = {} }) {
  const [showPassword, setShowPassword] = useState(false)
  const [showConfirmPassword, setShowConfirmPassword] = useState(false)
  const [isGoogleLoading, setIsGoogleLoading] = useState(false)
  const [passwordStrength, setPasswordStrength] = useState({ score: 0, percentage: 0 })

  const {
    register,
    handleSubmit,
    watch,
    formState: { errors, isSubmitting, isValid },
  } = useForm({
    resolver: zodResolver(registerStep1Schema),
    mode: 'onChange',
    defaultValues: initialData,
  })

  const password = watch('password')

  // Update password strength on password change
  useMemo(() => {
    const strength = calculatePasswordStrength(password)
    setPasswordStrength(strength)
  }, [password])

  /**
   * Handle form submission
   * @param {Object} data - Form data
   */
  const onSubmit = async (data) => {
    try {
      // Call parent callback with step data
      if (onNext) {
        onNext(data)
      }
    } catch (error) {
      console.error('Step 1 error:', error)
    }
  }

  const handleGoogleSignUp = async () => {
    setIsGoogleLoading(true)
    try {
      // Simulate Google sign-up flow
      await new Promise((resolve) => setTimeout(resolve, 1500))
      // In production, this would handle actual OAuth flow
      if (onNext) {
        onNext({
          fullName: '',
          email: '',
          password: '',
          confirmPassword: '',
          socialAuth: 'google',
        })
      }
    } catch (error) {
      console.error('Google sign-up error:', error)
    } finally {
      setIsGoogleLoading(false)
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

  // Floating blob animation
  const blobVariants = {
    animate: {
      y: [0, -15, 0],
      x: [0, 8, 0],
      opacity: [0.3, 0.5, 0.3],
    },
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-white via-blue-50/30 to-purple-50/20 dark:from-neutral-950 dark:via-neutral-900 dark:to-purple-950/20 relative overflow-hidden py-12 px-4 sm:px-6 lg:px-8">
      {/* Animated background blobs */}
      <motion.div
        className="absolute top-10 right-5 w-48 h-48 bg-gradient-to-br from-primary-400/20 to-secondary-400/20 dark:from-primary-600/10 dark:to-secondary-600/10 rounded-full blur-3xl pointer-events-none"
        variants={blobVariants}
        animate="animate"
        transition={{ duration: 8, repeat: Infinity, ease: 'easeInOut' }}
      />
      <motion.div
        className="absolute bottom-10 left-5 w-64 h-64 bg-gradient-to-br from-accent-400/20 to-primary-400/20 dark:from-accent-600/10 dark:to-primary-600/10 rounded-full blur-3xl pointer-events-none"
        variants={blobVariants}
        animate="animate"
        transition={{ duration: 10, repeat: Infinity, ease: 'easeInOut', delay: 0.5 }}
      />

      {/* Main container */}
      <div className="w-full max-w-2xl mx-auto relative z-10">
        <motion.div
          className="space-y-8"
          initial="hidden"
          animate="visible"
          variants={containerVariants}
        >
          {/* Header */}
          <motion.div className="space-y-2 text-center" variants={itemVariants}>
            <h1 className="text-3xl sm:text-4xl font-bold bg-gradient-to-r from-primary-600 via-secondary-600 to-accent-600 bg-clip-text text-transparent">
              Create Your Account
            </h1>
            <p className="text-neutral-600 dark:text-neutral-400 text-sm sm:text-base">
              Start your fitness journey with FitTrack
            </p>
          </motion.div>

          {/* Form */}
          <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
            {/* Full Name */}
            <motion.div variants={itemVariants}>
              <Input
                label="Full Name"
                type="text"
                placeholder="John Doe"
                leftIcon={User}
                error={errors.fullName?.message}
                required
                {...register('fullName')}
              />
            </motion.div>

            {/* Email */}
            <motion.div variants={itemVariants}>
              <Input
                label="Email Address"
                type="email"
                placeholder="you@example.com"
                leftIcon={Mail}
                error={errors.email?.message}
                required
                {...register('email')}
              />
            </motion.div>

            {/* Password */}
            <motion.div variants={itemVariants}>
              <Input
                label="Password"
                type={showPassword ? 'text' : 'password'}
                placeholder="••••••••"
                leftIcon={Lock}
                rightIcon={showPassword ? EyeOff : Eye}
                onIconClick={() => setShowPassword(!showPassword)}
                error={errors.password?.message}
                required
                {...register('password')}
              />

              {/* Password Strength Meter */}
              {password && (
                <motion.div
                  className="mt-3 space-y-2"
                  initial={{ opacity: 0, y: -5 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.3 }}
                >
                  {/* Strength bar */}
                  <div className="space-y-1">
                    <div className="flex items-center justify-between">
                      <label className="text-xs font-medium text-neutral-700 dark:text-neutral-300">
                        Password Strength
                      </label>
                      <span
                        className={`text-xs font-semibold ${
                          passwordStrength.score === 4
                            ? 'text-success-600 dark:text-success-400'
                            : passwordStrength.score === 3
                            ? 'text-primary-600 dark:text-primary-400'
                            : passwordStrength.score === 2
                            ? 'text-accent-600 dark:text-accent-400'
                            : passwordStrength.score === 1
                            ? 'text-warning-600 dark:text-warning-400'
                            : 'text-error-600 dark:text-error-400'
                        }`}
                      >
                        {passwordStrength.label}
                      </span>
                    </div>

                    {/* Progress bar */}
                    <div className="w-full h-2 bg-neutral-200 dark:bg-neutral-700 rounded-full overflow-hidden">
                      <motion.div
                        className={`h-full rounded-full ${passwordStrength.color}`}
                        initial={{ width: 0 }}
                        animate={{ width: `${passwordStrength.percentage}%` }}
                        transition={{ duration: 0.4, ease: 'easeOut' }}
                      />
                    </div>
                  </div>

                  {/* Feedback suggestions */}
                  {passwordStrength.score < 4 && passwordStrength.feedback.length > 0 && (
                    <motion.div
                      className="space-y-1"
                      initial={{ opacity: 0, height: 0 }}
                      animate={{ opacity: 1, height: 'auto' }}
                      transition={{ duration: 0.3 }}
                    >
                      {passwordStrength.feedback.slice(0, 2).map((feedback, idx) => (
                        <div key={idx} className="flex items-start gap-2">
                          <AlertCircle className="w-3 h-3 text-warning-500 mt-0.5 flex-shrink-0" />
                          <span className="text-xs text-neutral-600 dark:text-neutral-400">
                            {feedback}
                          </span>
                        </div>
                      ))}
                    </motion.div>
                  )}

                  {/* Strength achieved */}
                  {passwordStrength.score >= 4 && (
                    <motion.div
                      className="flex items-center gap-2"
                      initial={{ opacity: 0, scale: 0.9 }}
                      animate={{ opacity: 1, scale: 1 }}
                      transition={{ duration: 0.3 }}
                    >
                      <CheckCircle className="w-4 h-4 text-success-600 dark:text-success-400" />
                      <span className="text-xs font-medium text-success-600 dark:text-success-400">
                        Strong password!
                      </span>
                    </motion.div>
                  )}
                </motion.div>
              )}
            </motion.div>

            {/* Confirm Password */}
            <motion.div variants={itemVariants}>
              <Input
                label="Confirm Password"
                type={showConfirmPassword ? 'text' : 'password'}
                placeholder="••••••••"
                leftIcon={Lock}
                rightIcon={showConfirmPassword ? EyeOff : Eye}
                onIconClick={() => setShowConfirmPassword(!showConfirmPassword)}
                error={errors.confirmPassword?.message}
                required
                {...register('confirmPassword')}
              />
            </motion.div>

            {/* Sign up with Google */}
            <motion.div variants={itemVariants}>
              <button
                type="button"
                onClick={handleGoogleSignUp}
                disabled={isGoogleLoading}
                className="w-full h-12 border-2 border-neutral-200 dark:border-neutral-700 rounded-lg font-semibold text-neutral-700 dark:text-neutral-300 hover:bg-neutral-50 dark:hover:bg-neutral-900 transition-all duration-200 disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-3"
              >
                {isGoogleLoading ? (
                  <>
                    <motion.div
                      className="w-4 h-4 border-2 border-neutral-700/30 dark:border-neutral-300/30 border-t-neutral-700 dark:border-t-neutral-300 rounded-full"
                      animate={{ rotate: 360 }}
                      transition={{ duration: 1, repeat: Infinity, ease: 'linear' }}
                    />
                    Signing up...
                  </>
                ) : (
                  <>
                    <svg className="w-5 h-5" viewBox="0 0 24 24">
                      <path
                        fill="currentColor"
                        d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"
                      />
                      <path
                        fill="currentColor"
                        d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"
                      />
                      <path
                        fill="currentColor"
                        d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z"
                      />
                      <path
                        fill="currentColor"
                        d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z"
                      />
                    </svg>
                    Sign up with Google
                  </>
                )}
              </button>
            </motion.div>

            {/* Divider */}
            <motion.div className="relative" variants={itemVariants}>
              <div className="absolute inset-0 flex items-center">
                <div className="w-full border-t border-neutral-200 dark:border-neutral-700" />
              </div>
              <div className="relative flex justify-center text-sm">
                <span className="px-2 bg-white dark:bg-neutral-950 text-neutral-600 dark:text-neutral-400">
                  or
                </span>
              </div>
            </motion.div>

            {/* Buttons */}
            <motion.div
              className="flex gap-3"
              variants={itemVariants}
            >
              <Button
                type="button"
                onClick={onPrevious}
                className="flex-1 h-12 border-2 border-neutral-200 dark:border-neutral-700 text-neutral-700 dark:text-neutral-300 hover:bg-neutral-50 dark:hover:bg-neutral-900 font-semibold rounded-lg transition-all duration-200"
              >
                Back
              </Button>
              <Button
                type="submit"
                disabled={!isValid || isSubmitting}
                className="flex-1 h-12 bg-gradient-to-r from-primary-600 to-secondary-600 hover:from-primary-700 hover:to-secondary-700 text-white font-semibold rounded-lg transition-all duration-200 disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-2"
              >
                {isSubmitting ? (
                  <>
                    <motion.div
                      className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full"
                      animate={{ rotate: 360 }}
                      transition={{ duration: 1, repeat: Infinity, ease: 'linear' }}
                    />
                    Processing...
                  </>
                ) : (
                  'Continue'
                )}
              </Button>
            </motion.div>
          </form>

          {/* Password requirements info */}
          <motion.div
            className="p-4 bg-neutral-100/50 dark:bg-neutral-900/50 rounded-lg border border-neutral-200 dark:border-neutral-800"
            variants={itemVariants}
          >
            <p className="text-xs font-semibold text-neutral-700 dark:text-neutral-300 mb-2">
              Password Requirements:
            </p>
            <ul className="text-xs text-neutral-600 dark:text-neutral-400 space-y-1">
              <li>• At least 8 characters</li>
              <li>• Include uppercase and lowercase letters</li>
              <li>• Include numbers and special characters for extra strength</li>
            </ul>
          </motion.div>
        </motion.div>
      </div>
    </div>
  )
}
