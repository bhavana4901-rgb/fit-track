import { useState, useMemo } from 'react'
import { motion } from 'framer-motion'
import { useForm, Controller } from 'react-hook-form'
import { z } from 'zod'
import { zodResolver } from '@hookform/resolvers/zod'
import { Calendar, Users, Ruler, Weight } from 'lucide-react'
import { Input, Button } from '../ui'
const registerStep2Schema = z.object({
  dateOfBirth: z.string().min(1, 'Date of birth is required'),
  gender: z.enum(['male', 'female', 'other'], 'Please select a gender'),
  height: z.number().min(100, 'Height must be at least 100cm').max(250, 'Height must be less than 250cm'),
  heightUnit: z.enum(['cm', 'inches']),
  weight: z.number().min(30, 'Weight must be at least 30kg').max(300, 'Weight must be less than 300kg'),
  weightUnit: z.enum(['kg', 'lbs']),
})
export default function RegisterStep2({ onNext, onPrevious, initialData = {} }) {
  const [heightUnit, setHeightUnit] = useState(initialData.heightUnit || 'cm')
  const [weightUnit, setWeightUnit] = useState(initialData.weightUnit || 'kg')
  const {
    register,
    control,
    handleSubmit,
    watch,
    formState: { errors, isSubmitting, isValid },
    setValue,
  } = useForm({
    resolver: zodResolver(registerStep2Schema),
    mode: 'onChange',
    defaultValues: {
      dateOfBirth: initialData.dateOfBirth || '',
      gender: initialData.gender || 'male',
      height: initialData.height || 170,
      heightUnit: initialData.heightUnit || 'cm',
      weight: initialData.weight || 70,
      weightUnit: initialData.weightUnit || 'kg',
    },
  })
  const height = watch('height')
  const weight = watch('weight')
  const displayHeight = useMemo(() => {
    if (heightUnit === 'inches') {
      return Math.round((height / 2.54) * 10) / 10
    }
    return height
  }, [height, heightUnit])
  const displayWeight = useMemo(() => {
    if (weightUnit === 'lbs') {
      return Math.round((weight * 2.20462) * 10) / 10
    }
    return weight
  }, [weight, weightUnit])
  const handleHeightUnitToggle = () => {
    const newUnit = heightUnit === 'cm' ? 'inches' : 'cm'
    setHeightUnit(newUnit)
    setValue('heightUnit', newUnit)
  }
  const handleWeightUnitToggle = () => {
    const newUnit = weightUnit === 'kg' ? 'lbs' : 'kg'
    setWeightUnit(newUnit)
    setValue('weightUnit', newUnit)
  }
  const onSubmit = async (data) => {
    try {
      if (onNext) {
        onNext(data)
      }
    } catch (error) {
      console.error('Step 2 error:', error)
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
    hidden: { opacity: 0, y: 15 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.4, ease: 'easeOut' },
    },
  }
  return (
    <motion.div
      className="space-y-6"
      initial="hidden"
      animate="visible"
      variants={containerVariants}
    >
      <motion.div className="space-y-2" variants={itemVariants}>
        <h1 className="text-2xl sm:text-3xl font-bold bg-gradient-to-r from-success-600 via-primary-600 to-accent-600 bg-clip-text text-transparent">
          Personal details
        </h1>
        <p className="text-neutral-600 dark:text-neutral-400 text-sm">
          Tell us about yourself
        </p>
      </motion.div>
          <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
            <motion.div variants={itemVariants}>
              <label className="block text-sm font-semibold text-neutral-700 dark:text-neutral-300 mb-2">
                Date of Birth *
              </label>
              <div className="relative">
                <Calendar className="absolute left-4 top-1/2 transform -translate-y-1/2 w-5 h-5 text-primary-600 dark:text-primary-400 pointer-events-none" />
                <input
                  type="date"
                  {...register('dateOfBirth')}
                  className="w-full pl-12 pr-4 py-3 border-2 border-neutral-200 dark:border-neutral-700 bg-white dark:bg-neutral-800 text-neutral-900 dark:text-white rounded-lg focus:border-primary-600 dark:focus:border-primary-400 focus:ring-2 focus:ring-primary-500/50 focus:outline-none transition-all duration-200"
                />
              </div>
              {errors.dateOfBirth && (
                <p className="text-xs text-error-600 dark:text-error-400 mt-1">{errors.dateOfBirth.message}</p>
              )}
            </motion.div>
            <motion.div variants={itemVariants}>
              <label className="block text-sm font-semibold text-neutral-700 dark:text-neutral-300 mb-3">
                Gender *
              </label>
              <div className="flex gap-3">
                {['male', 'female', 'other'].map((option) => (
                  <label
                    key={option}
                    className="flex-1 relative cursor-pointer"
                  >
                    <input
                      type="radio"
                      value={option}
                      {...register('gender')}
                      className="sr-only"
                    />
                    <motion.div
                      className={`w-full py-3 px-4 rounded-lg border-2 font-medium transition-all duration-200 text-center capitalize ${
                        watch('gender') === option
                          ? 'border-primary-600 bg-primary-50 dark:bg-primary-950 text-primary-600 dark:text-primary-400'
                          : 'border-neutral-200 dark:border-neutral-700 bg-white dark:bg-neutral-800 text-neutral-700 dark:text-neutral-300 hover:border-primary-300 dark:hover:border-primary-600'
                      }`}
                      whileTap={{ scale: 0.98 }}
                    >
                      {option}
                    </motion.div>
                  </label>
                ))}
              </div>
              {errors.gender && (
                <p className="text-xs text-error-600 dark:text-error-400 mt-1">{errors.gender.message}</p>
              )}
            </motion.div>
            <motion.div variants={itemVariants}>
              <div className="flex items-center justify-between mb-3">
                <label className="block text-sm font-semibold text-neutral-700 dark:text-neutral-300">
                  Height *
                </label>
                <button
                  type="button"
                  onClick={handleHeightUnitToggle}
                  className="text-xs font-medium px-3 py-1 rounded-full bg-primary-100 dark:bg-primary-900 text-primary-600 dark:text-primary-400 hover:bg-primary-200 dark:hover:bg-primary-800 transition-colors"
                >
                  {heightUnit === 'cm' ? 'Switch to Inches' : 'Switch to CM'}
                </button>
              </div>
              <div className="space-y-4">
                <div className="relative">
                  <Ruler className="absolute left-0 top-0 w-5 h-5 text-success-600 dark:text-success-400 pointer-events-none" />
                  <Controller
                    name="height"
                    control={control}
                    render={({ field }) => (
                      <input
                        type="range"
                        min={heightUnit === 'cm' ? 100 : 40}
                        max={heightUnit === 'cm' ? 250 : 98}
                        step="1"
                        value={field.value}
                        onChange={(e) => field.onChange(Number(e.target.value))}
                        className="w-full h-2 bg-neutral-200 dark:bg-neutral-700 rounded-lg appearance-none cursor-pointer accent-success-600 dark:accent-success-400"
                      />
                    )}
                  />
                </div>
                <div className="flex items-center gap-2">
                  <Controller
                    name="height"
                    control={control}
                    render={({ field }) => (
                      <input
                        type="number"
                        value={field.value}
                        onChange={(e) => field.onChange(Number(e.target.value))}
                        className="flex-1 px-4 py-3 border-2 border-neutral-200 dark:border-neutral-700 bg-white dark:bg-neutral-800 text-neutral-900 dark:text-white rounded-lg focus:border-success-600 dark:focus:border-success-400 focus:ring-2 focus:ring-success-500/50 focus:outline-none transition-all duration-200"
                        min={heightUnit === 'cm' ? 100 : 40}
                        max={heightUnit === 'cm' ? 250 : 98}
                      />
                    )}
                  />
                  <span className="text-sm font-semibold text-neutral-600 dark:text-neutral-400 whitespace-nowrap">
                    {heightUnit}
                  </span>
                  {heightUnit === 'cm' && (
                    <span className="text-xs text-neutral-500 dark:text-neutral-500 whitespace-nowrap">
                      ({Math.round((height / 2.54) * 10) / 10}″)
                    </span>
                  )}
                  {heightUnit === 'inches' && (
                    <span className="text-xs text-neutral-500 dark:text-neutral-500 whitespace-nowrap">
                      ({Math.round((height * 2.54) * 10) / 10}cm)
                    </span>
                  )}
                </div>
              </div>
              {errors.height && (
                <p className="text-xs text-error-600 dark:text-error-400 mt-1">{errors.height.message}</p>
              )}
            </motion.div>
            <motion.div variants={itemVariants}>
              <div className="flex items-center justify-between mb-3">
                <label className="block text-sm font-semibold text-neutral-700 dark:text-neutral-300">
                  Weight *
                </label>
                <button
                  type="button"
                  onClick={handleWeightUnitToggle}
                  className="text-xs font-medium px-3 py-1 rounded-full bg-primary-100 dark:bg-primary-900 text-primary-600 dark:text-primary-400 hover:bg-primary-200 dark:hover:bg-primary-800 transition-colors"
                >
                  {weightUnit === 'kg' ? 'Switch to LBS' : 'Switch to KG'}
                </button>
              </div>
              <div className="space-y-4">
                <div className="relative">
                  <Weight className="absolute left-0 top-0 w-5 h-5 text-accent-600 dark:text-accent-400 pointer-events-none" />
                  <Controller
                    name="weight"
                    control={control}
                    render={({ field }) => (
                      <input
                        type="range"
                        min={weightUnit === 'kg' ? 30 : 66}
                        max={weightUnit === 'kg' ? 300 : 660}
                        step="1"
                        value={field.value}
                        onChange={(e) => field.onChange(Number(e.target.value))}
                        className="w-full h-2 bg-neutral-200 dark:bg-neutral-700 rounded-lg appearance-none cursor-pointer accent-accent-600 dark:accent-accent-400"
                      />
                    )}
                  />
                </div>
                <div className="flex items-center gap-2">
                  <Controller
                    name="weight"
                    control={control}
                    render={({ field }) => (
                      <input
                        type="number"
                        value={field.value}
                        onChange={(e) => field.onChange(Number(e.target.value))}
                        className="flex-1 px-4 py-3 border-2 border-neutral-200 dark:border-neutral-700 bg-white dark:bg-neutral-800 text-neutral-900 dark:text-white rounded-lg focus:border-accent-600 dark:focus:border-accent-400 focus:ring-2 focus:ring-accent-500/50 focus:outline-none transition-all duration-200"
                        min={weightUnit === 'kg' ? 30 : 66}
                        max={weightUnit === 'kg' ? 300 : 660}
                      />
                    )}
                  />
                  <span className="text-sm font-semibold text-neutral-600 dark:text-neutral-400 whitespace-nowrap">
                    {weightUnit}
                  </span>
                  {weightUnit === 'kg' && (
                    <span className="text-xs text-neutral-500 dark:text-neutral-500 whitespace-nowrap">
                      ({Math.round((weight * 2.20462) * 10) / 10}lbs)
                    </span>
                  )}
                  {weightUnit === 'lbs' && (
                    <span className="text-xs text-neutral-500 dark:text-neutral-500 whitespace-nowrap">
                      ({Math.round((weight * 0.453592) * 10) / 10}kg)
                    </span>
                  )}
                </div>
              </div>
              {errors.weight && (
                <p className="text-xs text-error-600 dark:text-error-400 mt-1">{errors.weight.message}</p>
              )}
            </motion.div>
            <motion.div
              className="p-4 bg-success-50 dark:bg-success-950/20 border border-success-200 dark:border-success-900/30 rounded-lg space-y-2"
              variants={itemVariants}
            >
              <p className="text-xs font-semibold text-success-700 dark:text-success-300">Profile Summary:</p>
              <div className="text-sm text-success-600 dark:text-success-400 space-y-1">
                {watch('dateOfBirth') && (
                  <p>• DOB: {new Date(watch('dateOfBirth')).toLocaleDateString()}</p>
                )}
                <p>• Gender: {watch('gender')}</p>
                <p>• Height: {height}{heightUnit} {heightUnit === 'cm' && `(${Math.round((height / 2.54) * 10) / 10}″)`} {heightUnit === 'inches' && `(${Math.round((height * 2.54) * 10) / 10}cm)`}</p>
                <p>• Weight: {weight}{weightUnit} {weightUnit === 'kg' && `(${Math.round((weight * 2.20462) * 10) / 10}lbs)`} {weightUnit === 'lbs' && `(${Math.round((weight * 0.453592) * 10) / 10}kg)`}</p>
              </div>
            </motion.div>
            <motion.div
              className="flex gap-3 pt-4"
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
                className="flex-1 h-12 bg-gradient-to-r from-success-600 to-primary-600 hover:from-success-700 hover:to-primary-700 text-white font-semibold rounded-lg transition-all duration-200 disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-2"
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
    </motion.div>
  )
}
