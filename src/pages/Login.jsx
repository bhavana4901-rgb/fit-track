import { useState } from 'react'
import { useNavigate, Link } from 'react-router-dom'
import { motion } from 'framer-motion'
import { useForm } from 'react-hook-form'
import { z } from 'zod'
import { zodResolver } from '@hookform/resolvers/zod'
import {
  Eye,
  EyeOff,
  Mail,
  Lock,
  ArrowRight,
  ArrowLeft,
  Shield,
  Users,
  Star,
  Moon,
  Sun,
} from 'lucide-react'
import { useAuth } from '../hooks/useAuth'
import { useTheme } from '../hooks/useTheme'
import { Button } from '../components/ui'
import { Input, ErrorDisplay } from '../components/ui'
import LoginAnimatedBackground from '../components/auth/LoginAnimatedBackground'
import LoginIllustration from '../components/auth/LoginIllustration'
import { viewTransitionFast } from '../components/landing/landingMotion'
const loginSchema = z.object({
  email: z.string().email('Please enter a valid email address').min(1, 'Email is required'),
  password: z
    .string()
    .min(1, 'Password is required')
    .min(6, 'Password must be at least 6 characters'),
  rememberMe: z.boolean().default(false),
})
const TRUST_ITEMS = [
  { icon: Shield, label: 'Secure login', color: 'text-success-600 dark:text-success-400', bg: 'bg-success-100 dark:bg-success-950' },
  { icon: Users, label: '50K+ members', color: 'text-primary-600 dark:text-primary-400', bg: 'bg-primary-100 dark:bg-primary-950' },
  { icon: Star, label: '4.9 rating', color: 'text-warning-600 dark:text-warning-500', bg: 'bg-warning-100 dark:bg-warning-950' },
]
const pageVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: { staggerChildren: 0.06, delayChildren: 0.08 },
  },
}
const itemVariants = {
  hidden: { opacity: 0, y: 14 },
  visible: {
    opacity: 1,
    y: 0,
    transition: viewTransitionFast,
  },
}
export default function Login() {
  const navigate = useNavigate()
  const { login, isLoading } = useAuth()
  const { isDark, toggleTheme } = useTheme()
  const [showPassword, setShowPassword] = useState(false)
  const [serverError, setServerError] = useState('')
  const [isGoogleLoading, setIsGoogleLoading] = useState(false)
  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm({
    resolver: zodResolver(loginSchema),
    mode: 'onChange', // Real-time validation on every change
    defaultValues: {
      email: typeof window !== 'undefined' ? localStorage.getItem('rememberEmail') || '' : '',
      rememberMe: false,
    },
  })
  const onSubmit = async (data) => {
    setServerError('')
    try {
      await new Promise((resolve) => setTimeout(resolve, 800))
      const result = await login(data.email, data.password)
      if (result.success) {
        if (data.rememberMe) {
          localStorage.setItem('rememberEmail', data.email)
        } else {
          localStorage.removeItem('rememberEmail')
        }
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
      await new Promise((resolve) => setTimeout(resolve, 1200))
      navigate('/dashboard', { replace: true })
    } catch (error) {
      setServerError('Google sign-in failed. Please try again.')
    } finally {
      setIsGoogleLoading(false)
    }
  }
  return (
    <div className="min-h-screen min-h-[100dvh] relative overflow-hidden bg-white dark:bg-neutral-950">
      <LoginAnimatedBackground />
      {}
      <motion.header
        initial={{ opacity: 0, y: -12 }}
        animate={{ opacity: 1, y: 0 }}
        transition={viewTransitionFast}
        className="relative z-10 flex items-center justify-between px-4 sm:px-6 lg:px-8 py-4 sm:py-5"
      >
        <Link to="/" className="flex items-center gap-2.5 group">
          <div className="w-9 h-9 sm:w-10 sm:h-10 bg-gradient-to-br from-primary-600 to-primary-700 rounded-lg flex items-center justify-center transition-opacity group-hover:opacity-90">
            <span className="text-white font-bold text-lg">F</span>
          </div>
          <span className="font-bold text-lg text-neutral-900 dark:text-white">FitTrack</span>
        </Link>
        <div className="flex items-center gap-2 sm:gap-3">
          <button
            type="button"
            onClick={toggleTheme}
            className="p-2 rounded-lg border border-neutral-200 dark:border-neutral-800 bg-white/70 dark:bg-neutral-900/70 backdrop-blur-sm hover:bg-neutral-50 dark:hover:bg-neutral-800 transition-colors"
            aria-label="Toggle dark mode"
          >
            {isDark ? <Sun className="w-5 h-5 text-warning-500" /> : <Moon className="w-5 h-5 text-neutral-600" />}
          </button>
          <Link
            to="/"
            className="hidden sm:inline-flex items-center gap-1.5 text-sm font-medium text-neutral-600 dark:text-neutral-400 hover:text-primary-600 dark:hover:text-primary-400 transition-colors"
          >
            <ArrowLeft className="w-4 h-4" />
            Back to home
          </Link>
        </div>
      </motion.header>
      {}
      <div className="relative z-10 px-4 sm:px-6 lg:px-8 pt-4 sm:pt-6 pb-10 sm:pb-12">
        <div className="w-full max-w-6xl mx-auto grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-12 xl:gap-16 items-start">
          <LoginIllustration />
          <motion.div
            className="w-full max-w-[440px] mx-auto lg:max-w-none lg:mx-0 lg:justify-self-end"
            variants={pageVariants}
            initial="hidden"
            animate="visible"
          >
          <motion.div
            variants={itemVariants}
            className="rounded-2xl border border-neutral-200/80 dark:border-neutral-800 bg-white/90 dark:bg-neutral-900/95 backdrop-blur-xl shadow-sm overflow-hidden"
          >
            <div className="h-1 bg-gradient-to-r from-primary-500 via-secondary-500 to-accent-500" />
            <div className="p-6 sm:p-8">
              <motion.div variants={itemVariants} className="mb-6 sm:mb-8">
                <span className="inline-block px-3 py-1 mb-3 text-xs font-semibold uppercase tracking-wider text-primary-700 dark:text-primary-300 bg-primary-50 dark:bg-primary-950/50 rounded-md border border-primary-100 dark:border-primary-900">
                  Sign in
                </span>
                <h1 className="text-2xl sm:text-3xl font-bold text-neutral-900 dark:text-white tracking-tight">
                  Welcome back
                </h1>
                <p className="text-sm sm:text-base text-neutral-600 dark:text-neutral-400 mt-2">
                  Continue your fitness journey with FitTrack
                </p>
              </motion.div>
              {serverError && (
                <motion.div variants={itemVariants} className="mb-5">
                  <ErrorDisplay
                    errors={serverError}
                    variant="block"
                    onDismiss={() => setServerError('')}
                  />
                </motion.div>
              )}
              <form onSubmit={handleSubmit(onSubmit)} className="space-y-4 sm:space-y-5">
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
                <motion.div variants={itemVariants} className="flex items-center justify-between gap-3 flex-wrap">
                  <label className="flex items-center gap-2 cursor-pointer">
                    <input
                      type="checkbox"
                      className="w-4 h-4 rounded border-neutral-300 dark:border-neutral-600 text-primary-600 focus:ring-primary-500 cursor-pointer"
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
                <motion.div variants={itemVariants}>
                  <Button
                    type="submit"
                    className="w-full h-12"
                    disabled={isSubmitting || isLoading}
                  >
                    {isSubmitting || isLoading ? (
                      <>
                        <motion.span
                          className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full inline-block"
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
                <motion.div variants={itemVariants} className="relative py-1">
                  <div className="absolute inset-0 flex items-center">
                    <div className="w-full border-t border-neutral-200 dark:border-neutral-700" />
                  </div>
                  <div className="relative flex justify-center text-xs sm:text-sm">
                    <span className="px-3 bg-white/90 dark:bg-neutral-900/95 text-neutral-500">
                      Or continue with
                    </span>
                  </div>
                </motion.div>
                <motion.div variants={itemVariants}>
                  <button
                    type="button"
                    onClick={handleGoogleSignIn}
                    disabled={isGoogleLoading}
                    className="w-full h-12 rounded-lg border border-neutral-200 dark:border-neutral-700 bg-white dark:bg-neutral-900 font-semibold text-neutral-700 dark:text-neutral-300 hover:bg-neutral-50 dark:hover:bg-neutral-800 transition-colors disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-3"
                  >
                    {isGoogleLoading ? (
                      <>
                        <motion.span
                          className="w-4 h-4 border-2 border-neutral-400/30 border-t-neutral-600 dark:border-t-neutral-300 rounded-full inline-block"
                          animate={{ rotate: 360 }}
                          transition={{ duration: 1, repeat: Infinity, ease: 'linear' }}
                        />
                        Signing in...
                      </>
                    ) : (
                      <>
                        <svg className="w-5 h-5 shrink-0" viewBox="0 0 24 24" aria-hidden="true">
                          <path
                            fill="#4285F4"
                            d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"
                          />
                          <path
                            fill="#34A853"
                            d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"
                          />
                          <path
                            fill="#FBBC05"
                            d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z"
                          />
                          <path
                            fill="#EA4335"
                            d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z"
                          />
                        </svg>
                        Continue with Google
                      </>
                    )}
                  </button>
                </motion.div>
              </form>
              <motion.p
                variants={itemVariants}
                className="text-center text-sm text-neutral-600 dark:text-neutral-400 mt-6"
              >
                Don&apos;t have an account?{' '}
                <Link
                  to="/register"
                  className="font-semibold text-primary-600 dark:text-primary-400 hover:text-primary-700 dark:hover:text-primary-300 transition-colors"
                >
                  Create one
                </Link>
              </motion.p>
            </div>
          </motion.div>
          {}
          <motion.div
            variants={itemVariants}
            className="mt-6 grid grid-cols-3 gap-2 sm:gap-3"
          >
            {TRUST_ITEMS.map(({ icon: Icon, label, color, bg }) => (
              <div
                key={label}
                className="flex flex-col items-center text-center p-3 sm:p-4 rounded-xl border border-neutral-200/60 dark:border-neutral-800 bg-white/60 dark:bg-neutral-900/60 backdrop-blur-sm"
              >
                <div className={`w-9 h-9 rounded-lg ${bg} flex items-center justify-center mb-2`}>
                  <Icon className={`w-4 h-4 ${color}`} />
                </div>
                <span className="text-[10px] sm:text-xs font-medium text-neutral-600 dark:text-neutral-400 leading-tight">
                  {label}
                </span>
              </div>
            ))}
          </motion.div>
          <motion.p
            variants={itemVariants}
            className="sm:hidden text-center mt-4"
          >
            <Link
              to="/"
              className="inline-flex items-center gap-1.5 text-sm font-medium text-neutral-500 hover:text-primary-600 dark:hover:text-primary-400 transition-colors"
            >
              <ArrowLeft className="w-4 h-4" />
              Back to home
            </Link>
          </motion.p>
          </motion.div>
        </div>
      </div>
    </div>
  )
}
