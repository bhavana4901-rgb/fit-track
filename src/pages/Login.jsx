import { useState } from 'react'
import { useNavigate, Link } from 'react-router-dom'
import { motion } from 'framer-motion'
import { useForm } from 'react-hook-form'
import { z } from 'zod'
import { zodResolver } from '@hookform/resolvers/zod'
import { Eye, EyeOff, Mail, Lock, ArrowRight } from 'lucide-react'
import { useAuth } from '../hooks/useAuth'
import { Button } from '../components/ui'
import { Input, FormField, ErrorDisplay } from '../components/ui'

// Validation schema
const loginSchema = z.object({
  email: z
    .string()
    .email('Please enter a valid email address')
    .min(1, 'Email is required'),
  password: z
    .string()
    .min(1, 'Password is required')
    .min(6, 'Password must be at least 6 characters'),
  rememberMe: z.boolean().default(false),
})

/**
 * Login Page Component
 * - Premium split-screen layout (illustration left, form right)
 * - Email and password inputs with validation
 * - Password show/hide toggle
 * - Remember me checkbox
 * - Forgot password link
 * - Sign in with Google button
 * - Loading state with button feedback
 * - Animated transitions and decorative elements
 * - Fully responsive design
 */
export default function Login() {
  const navigate = useNavigate()
  const { login, isLoading } = useAuth()
  const [showPassword, setShowPassword] = useState(false)
  const [serverError, setServerError] = useState('')
  const [isGoogleLoading, setIsGoogleLoading] = useState(false)

  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
    watch,
  } = useForm({
    resolver: zodResolver(loginSchema),
    mode: 'onBlur',
  })

  const rememberMe = watch('rememberMe')

  /**
   * Handle form submission
   * @param {Object} data - Form data from react-hook-form
   */
  const onSubmit = async (data) => {
    setServerError('')
    try {
      // Simulate API call (replace with actual auth endpoint)
      await new Promise((resolve) => setTimeout(resolve, 1000))

      // Call login from AuthContext
      const result = await login(data.email, data.password)

      if (result.success) {
        // Save remember me preference
        if (data.rememberMe) {
          localStorage.setItem('rememberEmail', data.email)
        } else {
          localStorage.removeItem('rememberEmail')
        }

        // Redirect to dashboard
        navigate('/dashboard', { replace: true })
      } else {
        setServerError(result.error || 'Login failed. Please try again.')
      }
    } catch (error) {
      setServerError('An error occurred. Please try again.')
      console.error('Login error:', error)
    }
  }

  const handleGoogleSignIn = async () => {
    setIsGoogleLoading(true)
    try {
      // Simulate Google sign-in flow
      await new Promise((resolve) => setTimeout(resolve, 1500))
      // In production, this would handle actual OAuth flow
      navigate('/dashboard', { replace: true })
    } catch (error) {
      setServerError('Google sign-in failed. Please try again.')
      console.error('Google sign-in error:', error)
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
        staggerChildren: 0.1,
        delayChildren: 0.2,
      },
    },
  }

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.5, ease: 'easeOut' },
    },
  }

  const illustrationVariants = {
    hidden: { opacity: 0, x: -40 },
    visible: {
      opacity: 1,
      x: 0,
      transition: { duration: 0.7, ease: 'easeOut' },
    },
  }

  const formVariants = {
    hidden: { opacity: 0, x: 40 },
    visible: {
      opacity: 1,
      x: 0,
      transition: { duration: 0.7, ease: 'easeOut' },
    },
  }

  // Floating blob animation
  const blobVariants = {
    animate: {
      y: [0, -20, 0],
      x: [0, 10, 0],
      opacity: [0.3, 0.5, 0.3],
    },
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-white via-blue-50/30 to-purple-50/20 dark:from-neutral-950 dark:via-neutral-900 dark:to-purple-950/20 relative overflow-hidden">
      {/* Animated background blobs */}
      <motion.div
        className="absolute top-20 right-10 w-64 h-64 bg-gradient-to-br from-primary-400/20 to-secondary-400/20 dark:from-primary-600/10 dark:to-secondary-600/10 rounded-full blur-3xl pointer-events-none"
        variants={blobVariants}
        animate="animate"
        transition={{ duration: 8, repeat: Infinity, ease: 'easeInOut' }}
      />
      <motion.div
        className="absolute bottom-20 left-10 w-80 h-80 bg-gradient-to-br from-accent-400/20 to-primary-400/20 dark:from-accent-600/10 dark:to-primary-600/10 rounded-full blur-3xl pointer-events-none"
        variants={blobVariants}
        animate="animate"
        transition={{ duration: 10, repeat: Infinity, ease: 'easeInOut', delay: 0.5 }}
      />

      {/* Main container */}
      <div className="min-h-screen flex items-center justify-center px-4 sm:px-6 lg:px-8 py-12 relative z-10">
        <motion.div
          className="w-full max-w-6xl"
          initial="hidden"
          animate="visible"
          variants={containerVariants}
        >
          {/* Split screen layout */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-12 items-center">
            {/* Left side - Illustration */}
            <motion.div
              className="hidden lg:flex flex-col items-center justify-center"
              variants={illustrationVariants}
            >
              {/* Decorative illustration container */}
              <div className="relative w-full max-w-md h-96">
                {/* Large gradient circle background */}
                <div className="absolute inset-0 bg-gradient-to-br from-primary-500/20 to-secondary-500/20 dark:from-primary-600/10 dark:to-secondary-600/10 rounded-3xl blur-2xl" />

                {/* SVG Illustration */}
                <svg
                  viewBox="0 0 400 400"
                  className="w-full h-full relative z-10"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  {/* Person silhouette */}
                  <circle
                    cx="200"
                    cy="120"
                    r="40"
                    fill="url(#headGradient)"
                    className="dark:opacity-80"
                  />

                  {/* Body */}
                  <path
                    d="M 200 160 L 160 240 M 200 160 L 240 240"
                    stroke="url(#bodyGradient)"
                    strokeWidth="20"
                    strokeLinecap="round"
                    className="dark:opacity-80"
                  />

                  {/* Legs */}
                  <path
                    d="M 160 240 L 140 320 M 240 240 L 260 320"
                    stroke="url(#legGradient)"
                    strokeWidth="20"
                    strokeLinecap="round"
                    className="dark:opacity-80"
                  />

                  {/* Lock icon decoration */}
                  <g transform="translate(250, 150)">
                    <rect
                      x="0"
                      y="20"
                      width="40"
                      height="50"
                      rx="4"
                      fill="none"
                      stroke="url(#accentGradient)"
                      strokeWidth="2"
                    />
                    <path
                      d="M 10 20 Q 10 5 20 5 Q 30 5 30 20"
                      fill="none"
                      stroke="url(#accentGradient)"
                      strokeWidth="2"
                    />
                    <circle cx="20" cy="50" r="2" fill="url(#accentGradient)" />
                  </g>

                  {/* Gradients */}
                  <defs>
                    <linearGradient
                      id="headGradient"
                      x1="0%"
                      y1="0%"
                      x2="100%"
                      y2="100%"
                    >
                      <stop offset="0%" stopColor="#3b82f6" stopOpacity="0.8" />
                      <stop offset="100%" stopColor="#8b5cf6" stopOpacity="0.6" />
                    </linearGradient>
                    <linearGradient
                      id="bodyGradient"
                      x1="0%"
                      y1="0%"
                      x2="100%"
                      y2="100%"
                    >
                      <stop offset="0%" stopColor="#06b6d4" stopOpacity="0.8" />
                      <stop offset="100%" stopColor="#3b82f6" stopOpacity="0.6" />
                    </linearGradient>
                    <linearGradient
                      id="legGradient"
                      x1="0%"
                      y1="0%"
                      x2="100%"
                      y2="100%"
                    >
                      <stop offset="0%" stopColor="#10b981" stopOpacity="0.8" />
                      <stop offset="100%" stopColor="#06b6d4" stopOpacity="0.6" />
                    </linearGradient>
                    <linearGradient
                      id="accentGradient"
                      x1="0%"
                      y1="0%"
                      x2="100%"
                      y2="100%"
                    >
                      <stop offset="0%" stopColor="#f59e0b" stopOpacity="1" />
                      <stop offset="100%" stopColor="#ef4444" stopOpacity="0.8" />
                    </linearGradient>
                  </defs>
                </svg>
              </div>

              {/* Illustration caption */}
              <motion.p
                className="mt-8 text-center text-neutral-600 dark:text-neutral-300 text-sm max-w-xs"
                variants={itemVariants}
              >
                Secure access to your fitness journey
              </motion.p>
            </motion.div>

            {/* Right side - Login form */}
            <motion.div
              className="w-full"
              variants={formVariants}
            >
              <motion.div
                className="space-y-8"
                variants={containerVariants}
              >
                {/* Header */}
                <motion.div
                  className="space-y-2"
                  variants={itemVariants}
                >
                  <h1 className="text-3xl sm:text-4xl font-bold bg-gradient-to-r from-primary-600 via-secondary-600 to-accent-600 bg-clip-text text-transparent">
                    Welcome Back
                  </h1>
                  <p className="text-neutral-600 dark:text-neutral-400">
                    Sign in to your FitTrack account to continue
                  </p>
                </motion.div>

                {/* Server error */}
                {serverError && (
                  <motion.div
                    variants={itemVariants}
                    initial={{ opacity: 0, y: -10 }}
                    animate={{ opacity: 1, y: 0 }}
                  >
                    <ErrorDisplay
                      errors={serverError}
                      variant="block"
                      onDismiss={() => setServerError('')}
                    />
                  </motion.div>
                )}

                {/* Form */}
                <form onSubmit={handleSubmit(onSubmit)} className="space-y-5">
                  {/* Email field */}
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

                  {/* Password field */}
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
                  </motion.div>

                  {/* Remember me & Forgot password */}
                  <motion.div
                    className="flex items-center justify-between"
                    variants={itemVariants}
                  >
                    <label className="flex items-center gap-2 cursor-pointer">
                      <input
                        type="checkbox"
                        className="w-4 h-4 rounded border-neutral-300 dark:border-neutral-600 text-primary-600 dark:text-primary-500 focus:ring-primary-500 dark:focus:ring-primary-400 cursor-pointer"
                        {...register('rememberMe')}
                      />
                      <span className="text-sm text-neutral-700 dark:text-neutral-300 font-medium">
                        Remember me
                      </span>
                    </label>
                    <Link
                      to="#"
                      className="text-sm font-medium text-primary-600 dark:text-primary-400 hover:text-primary-700 dark:hover:text-primary-300 transition-colors"
                    >
                      Forgot password?
                    </Link>
                  </motion.div>

                  {/* Login button */}
                  <motion.div variants={itemVariants}>
                    <Button
                      type="submit"
                      className="w-full h-12 bg-gradient-to-r from-primary-600 to-secondary-600 hover:from-primary-700 hover:to-secondary-700 text-white font-semibold rounded-lg transition-all duration-200 disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-2"
                      disabled={isSubmitting || isLoading}
                    >
                      {isSubmitting || isLoading ? (
                        <>
                          <motion.div
                            className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full"
                            animate={{ rotate: 360 }}
                            transition={{ duration: 1, repeat: Infinity, ease: 'linear' }}
                          />
                          Signing in...
                        </>
                      ) : (
                        <>
                          Sign In
                          <ArrowRight className="w-4 h-4" />
                        </>
                      )}
                    </Button>
                  </motion.div>

                  {/* Divider */}
                  <motion.div
                    className="relative"
                    variants={itemVariants}
                  >
                    <div className="absolute inset-0 flex items-center">
                      <div className="w-full border-t border-neutral-200 dark:border-neutral-700" />
                    </div>
                    <div className="relative flex justify-center text-sm">
                      <span className="px-2 bg-white dark:bg-neutral-950 text-neutral-600 dark:text-neutral-400">
                        Or continue with
                      </span>
                    </div>
                  </motion.div>

                  {/* Google sign-in button */}
                  <motion.div variants={itemVariants}>
                    <button
                      type="button"
                      onClick={handleGoogleSignIn}
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
                          Signing in...
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
                          Google
                        </>
                      )}
                    </button>
                  </motion.div>
                </form>

                {/* Sign up link */}
                <motion.p
                  className="text-center text-sm text-neutral-600 dark:text-neutral-400"
                  variants={itemVariants}
                >
                  Don't have an account?{' '}
                  <Link
                    to="/register"
                    className="font-semibold text-primary-600 dark:text-primary-400 hover:text-primary-700 dark:hover:text-primary-300 transition-colors"
                  >
                    Create one
                  </Link>
                </motion.p>
              </motion.div>
            </motion.div>
          </div>
        </motion.div>
      </div>
    </div>
  )
}
