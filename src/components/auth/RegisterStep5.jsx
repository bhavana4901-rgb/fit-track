import { useState } from 'react'
import { useForm, Controller } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { z } from 'zod'
import { motion, AnimatePresence } from 'framer-motion'
import { ArrowLeft, ArrowRight, Upload, Mail, Bell, Calendar, Loader2 } from 'lucide-react'
import Button from '../ui/Button'

const registerStep5Schema = z.object({
  avatar: z.string().optional().nullable(),
  username: z
    .string()
    .min(3, 'Username must be at least 3 characters')
    .max(20, 'Username must be at most 20 characters')
    .regex(/^[a-zA-Z0-9_]+$/, 'Username can only contain letters, numbers, and underscores'),
  bio: z.string().max(300, 'Bio must be at most 300 characters').optional().nullable(),
  emailNotifications: z.boolean().default(true),
  pushNotifications: z.boolean().default(false),
  weeklyDigest: z.boolean().default(true),
})

export default function RegisterStep5({ onNext, onPrevious, initialData = {}, onSkip }) {
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [dragActive, setDragActive] = useState(false)
  const [previewUrl, setPreviewUrl] = useState(initialData?.avatarUrl || null)

  const {
    control,
    handleSubmit,
    watch,
    setValue,
    formState: { errors },
  } = useForm({
    resolver: zodResolver(registerStep5Schema),
    mode: 'onChange',
    defaultValues: {
      avatar: initialData?.avatar || null,
      username: initialData?.username || '',
      bio: initialData?.bio || '',
      emailNotifications: initialData?.emailNotifications ?? true,
      pushNotifications: initialData?.pushNotifications ?? false,
      weeklyDigest: initialData?.weeklyDigest ?? true,
    },
  })

  const watchUsername = watch('username')
  const watchBio = watch('bio')
  const watchEmailNotifications = watch('emailNotifications')
  const watchPushNotifications = watch('pushNotifications')
  const watchWeeklyDigest = watch('weeklyDigest')

  const handleDrag = (e) => {
    e.preventDefault()
    e.stopPropagation()
    if (e.type === 'dragenter' || e.type === 'dragover') {
      setDragActive(true)
    } else if (e.type === 'dragleave') {
      setDragActive(false)
    }
  }

  const handleDrop = (e) => {
    e.preventDefault()
    e.stopPropagation()
    setDragActive(false)

    const files = e.dataTransfer.files
    if (files && files[0]) {
      handleFileSelect(files[0])
    }
  }

  const handleFileSelect = (file) => {
    // Validate file type
    if (!file.type.startsWith('image/')) {
      alert('Please select an image file')
      return
    }

    // Validate file size (max 5MB)
    if (file.size > 5 * 1024 * 1024) {
      alert('File size must be less than 5MB')
      return
    }

    // Create preview URL
    const reader = new FileReader()
    reader.onload = (e) => {
      setPreviewUrl(e.target.result)
      setValue('avatar', e.target.result)
    }
    reader.readAsDataURL(file)
  }

  const handleInputChange = (e) => {
    const files = e.target.files
    if (files && files[0]) {
      handleFileSelect(files[0])
    }
  }

  const onSubmit = async (data) => {
    setIsSubmitting(true)
    try {
      await new Promise((resolve) => setTimeout(resolve, 500))
      onNext(data)
    } finally {
      setIsSubmitting(false)
    }
  }

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
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.4, ease: 'easeOut' },
    },
  }

  return (
    <motion.form
      onSubmit={handleSubmit(onSubmit)}
      className="space-y-6"
      variants={containerVariants}
      initial="hidden"
      animate="visible"
    >
      <motion.div variants={itemVariants} className="space-y-2">
        <h1 className="text-2xl sm:text-3xl font-bold bg-gradient-to-r from-accent-600 via-secondary-600 to-primary-600 bg-clip-text text-transparent">
          Complete your profile
        </h1>
        <p className="text-sm text-neutral-600 dark:text-neutral-400">
          Add your avatar, username, and notification preferences
        </p>
      </motion.div>

          {/* Avatar Upload */}
          <motion.div variants={itemVariants} className="space-y-4">
            <label className="block text-sm font-semibold text-neutral-900 dark:text-white">
              Profile Avatar
            </label>

            <div
              onDragEnter={handleDrag}
              onDragLeave={handleDrag}
              onDragOver={handleDrag}
              onDrop={handleDrop}
              className={`relative flex items-center justify-center border-2 border-dashed rounded-2xl p-8 transition-all duration-300 cursor-pointer ${
                dragActive
                  ? 'border-primary-500 bg-primary-50 dark:bg-primary-950/20'
                  : 'border-neutral-200 dark:border-neutral-700 hover:border-primary-300 dark:hover:border-primary-700'
              }`}
            >
              <input
                type="file"
                accept="image/*"
                onChange={handleInputChange}
                className="absolute inset-0 opacity-0 cursor-pointer"
              />

              <div className="flex flex-col items-center space-y-4">
                {previewUrl ? (
                  <div className="relative">
                    <img
                      src={previewUrl}
                      alt="Avatar preview"
                      className="w-24 h-24 rounded-full object-cover border-4 border-primary-500"
                    />
                    <div className="absolute inset-0 flex items-center justify-center">
                      <div className="absolute inset-0 rounded-full border-4 border-primary-500 opacity-30" />
                    </div>
                  </div>
                ) : (
                  <div className="flex items-center justify-center w-24 h-24 rounded-full bg-neutral-100 dark:bg-neutral-800 border-2 border-neutral-200 dark:border-neutral-700">
                    <Upload className="w-8 h-8 text-neutral-400 dark:text-neutral-500" />
                  </div>
                )}

                <div className="text-center">
                  <p className="font-semibold text-neutral-900 dark:text-white">
                    {previewUrl ? 'Change avatar' : 'Upload avatar'}
                  </p>
                  <p className="text-sm text-neutral-500 dark:text-neutral-400">
                    Drag and drop or click to select
                  </p>
                </div>

                <p className="text-xs text-neutral-400 dark:text-neutral-500">
                  PNG, JPG, GIF up to 5MB
                </p>
              </div>
            </div>
          </motion.div>

          {/* Username Input */}
          <motion.div variants={itemVariants} className="space-y-4">
            <label className="block text-sm font-semibold text-neutral-900 dark:text-white">
              Username <span className="text-error-500">*</span>
            </label>

            <Controller
              name="username"
              control={control}
              render={({ field }) => (
                <input
                  {...field}
                  type="text"
                  placeholder="Enter your username"
                  className={`w-full px-4 py-3 rounded-lg border-2 transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-offset-0 dark:focus:ring-offset-neutral-900 ${
                    errors.username
                      ? 'border-error-500 focus:ring-error-500 dark:border-error-600 dark:focus:ring-error-600'
                      : 'border-neutral-200 dark:border-neutral-700 focus:border-primary-500 focus:ring-primary-500 dark:focus:border-primary-600 dark:focus:ring-primary-600'
                  } bg-white dark:bg-neutral-800 text-neutral-900 dark:text-white placeholder-neutral-400 dark:placeholder-neutral-500`}
                />
              )}
            />

            <div className="flex justify-between items-start">
              <div className="text-xs text-neutral-500 dark:text-neutral-400">
                3-20 characters, letters/numbers/underscores only
              </div>
              <div className="text-xs text-neutral-500 dark:text-neutral-400">
                {watchUsername?.length || 0}/20
              </div>
            </div>

            <AnimatePresence>
              {errors.username && (
                <motion.div
                  initial={{ opacity: 0, y: -10 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -10 }}
                  className="text-sm text-error-600 dark:text-error-400 flex items-center gap-2"
                >
                  <div className="w-5 h-5 rounded-full bg-error-100 dark:bg-error-950 flex items-center justify-center text-error-600 dark:text-error-400 flex-shrink-0">
                    !
                  </div>
                  {errors.username.message}
                </motion.div>
              )}
            </AnimatePresence>
          </motion.div>

          {/* Bio Textarea */}
          <motion.div variants={itemVariants} className="space-y-4">
            <label className="block text-sm font-semibold text-neutral-900 dark:text-white">
              Bio <span className="text-neutral-400 dark:text-neutral-500">(Optional)</span>
            </label>

            <Controller
              name="bio"
              control={control}
              render={({ field }) => (
                <textarea
                  {...field}
                  placeholder="Tell us about yourself... your fitness journey, goals, favorite workouts, etc."
                  rows="4"
                  className={`w-full px-4 py-3 rounded-lg border-2 transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-offset-0 dark:focus:ring-offset-neutral-900 resize-none ${
                    errors.bio
                      ? 'border-error-500 focus:ring-error-500 dark:border-error-600 dark:focus:ring-error-600'
                      : 'border-neutral-200 dark:border-neutral-700 focus:border-primary-500 focus:ring-primary-500 dark:focus:border-primary-600 dark:focus:ring-primary-600'
                  } bg-white dark:bg-neutral-800 text-neutral-900 dark:text-white placeholder-neutral-400 dark:placeholder-neutral-500`}
                />
              )}
            />

            <div className="flex justify-end">
              <div className="text-xs text-neutral-500 dark:text-neutral-400">
                {watchBio?.length || 0}/300
              </div>
            </div>

            <AnimatePresence>
              {errors.bio && (
                <motion.div
                  initial={{ opacity: 0, y: -10 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -10 }}
                  className="text-sm text-error-600 dark:text-error-400 flex items-center gap-2"
                >
                  <div className="w-5 h-5 rounded-full bg-error-100 dark:bg-error-950 flex items-center justify-center text-error-600 dark:text-error-400 flex-shrink-0">
                    !
                  </div>
                  {errors.bio.message}
                </motion.div>
              )}
            </AnimatePresence>
          </motion.div>

          {/* Notification Preferences */}
          <motion.div variants={itemVariants} className="space-y-4">
            <label className="block text-sm font-semibold text-neutral-900 dark:text-white">
              Notification Preferences <span className="text-neutral-400 dark:text-neutral-500">(Optional)</span>
            </label>

            <div className="space-y-3">
              {/* Email Notifications */}
              <Controller
                name="emailNotifications"
                control={control}
                render={({ field }) => (
                  <motion.label
                    whileHover={{ scale: 1.01 }}
                    whileTap={{ scale: 0.99 }}
                    className="flex items-center p-4 rounded-lg border-2 border-neutral-200 dark:border-neutral-700 bg-white dark:bg-neutral-800 cursor-pointer hover:border-primary-300 dark:hover:border-primary-700 transition-all duration-200"
                  >
                    <input
                      type="checkbox"
                      checked={field.value}
                      onChange={(e) => field.onChange(e.target.checked)}
                      className="w-5 h-5 rounded border-neutral-300 dark:border-neutral-600 cursor-pointer accent-primary-500"
                    />
                    <div className="ml-3 flex items-center gap-2">
                      <Mail className="w-5 h-5 text-primary-500" />
                      <div>
                        <div className="font-medium text-neutral-900 dark:text-white">Email Notifications</div>
                        <div className="text-sm text-neutral-500 dark:text-neutral-400">
                          Receive updates about your workouts and progress
                        </div>
                      </div>
                    </div>
                  </motion.label>
                )}
              />

              {/* Push Notifications */}
              <Controller
                name="pushNotifications"
                control={control}
                render={({ field }) => (
                  <motion.label
                    whileHover={{ scale: 1.01 }}
                    whileTap={{ scale: 0.99 }}
                    className="flex items-center p-4 rounded-lg border-2 border-neutral-200 dark:border-neutral-700 bg-white dark:bg-neutral-800 cursor-pointer hover:border-primary-300 dark:hover:border-primary-700 transition-all duration-200"
                  >
                    <input
                      type="checkbox"
                      checked={field.value}
                      onChange={(e) => field.onChange(e.target.checked)}
                      className="w-5 h-5 rounded border-neutral-300 dark:border-neutral-600 cursor-pointer accent-primary-500"
                    />
                    <div className="ml-3 flex items-center gap-2">
                      <Bell className="w-5 h-5 text-secondary-500" />
                      <div>
                        <div className="font-medium text-neutral-900 dark:text-white">Push Notifications</div>
                        <div className="text-sm text-neutral-500 dark:text-neutral-400">
                          Get reminders for your scheduled workouts
                        </div>
                      </div>
                    </div>
                  </motion.label>
                )}
              />

              {/* Weekly Digest */}
              <Controller
                name="weeklyDigest"
                control={control}
                render={({ field }) => (
                  <motion.label
                    whileHover={{ scale: 1.01 }}
                    whileTap={{ scale: 0.99 }}
                    className="flex items-center p-4 rounded-lg border-2 border-neutral-200 dark:border-neutral-700 bg-white dark:bg-neutral-800 cursor-pointer hover:border-primary-300 dark:hover:border-primary-700 transition-all duration-200"
                  >
                    <input
                      type="checkbox"
                      checked={field.value}
                      onChange={(e) => field.onChange(e.target.checked)}
                      className="w-5 h-5 rounded border-neutral-300 dark:border-neutral-600 cursor-pointer accent-primary-500"
                    />
                    <div className="ml-3 flex items-center gap-2">
                      <Calendar className="w-5 h-5 text-accent-500" />
                      <div>
                        <div className="font-medium text-neutral-900 dark:text-white">Weekly Digest</div>
                        <div className="text-sm text-neutral-500 dark:text-neutral-400">
                          Get a weekly summary of your fitness activity
                        </div>
                      </div>
                    </div>
                  </motion.label>
                )}
              />
            </div>
          </motion.div>

          {/* Selection Summary */}
          <motion.div
            variants={itemVariants}
            className="p-4 rounded-lg bg-primary-50 dark:bg-primary-950/30 border border-primary-200 dark:border-primary-900/50"
          >
            <div className="text-sm font-medium text-primary-900 dark:text-primary-100">
              <div className="font-semibold mb-2">Profile Summary</div>
              <div className="space-y-1 text-xs">
                <div>• Username: <span className="font-mono">{watchUsername || '(not set)'}</span></div>
                <div>• Bio: <span className="font-mono">{watchBio ? `${watchBio.substring(0, 30)}${watchBio.length > 30 ? '...' : ''}` : '(optional)'}</span></div>
                <div>• Notifications: <span className="font-mono">
                  {[
                    watchEmailNotifications && 'Email',
                    watchPushNotifications && 'Push',
                    watchWeeklyDigest && 'Weekly'
                  ].filter(Boolean).join(', ') || 'None'}
                </span></div>
              </div>
            </div>
          </motion.div>

          {/* Buttons */}
          <motion.div variants={itemVariants} className="flex gap-3 pt-4">
            <Button
              type="button"
              variant="secondary"
              onClick={onPrevious}
              disabled={isSubmitting}
              className="flex-1"
            >
              <ArrowLeft className="w-4 h-4" />
              Back
            </Button>

            <Button type="submit" variant="primary" disabled={isSubmitting} className="flex-1">
              {isSubmitting ? (
                <>
                  <Loader2 className="w-4 h-4 animate-spin" />
                  Completing...
                </>
              ) : (
                <>
                  Complete
                  <ArrowRight className="w-4 h-4" />
                </>
              )}
            </Button>
          </motion.div>

          {/* Skip Link */}
          <motion.div variants={itemVariants} className="text-center">
            <button
              type="button"
              onClick={() => onSkip?.()}
              className="text-sm text-neutral-500 dark:text-neutral-400 hover:text-primary-600 dark:hover:text-primary-400 transition-colors duration-200 underline"
            >
              Skip for now
            </button>
          </motion.div>
    </motion.form>
  )
}
