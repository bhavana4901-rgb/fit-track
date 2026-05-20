import { z } from 'zod'

// Step 1: Account Creation
export const registerStep1Schema = z.object({
  fullName: z
    .string()
    .min(2, 'Full name must be at least 2 characters')
    .max(50, 'Full name must be at most 50 characters')
    .regex(/^[a-zA-Z\s]+$/, 'Full name can only contain letters and spaces'),
  email: z.string().email('Please enter a valid email address'),
  password: z
    .string()
    .min(8, 'Password must be at least 8 characters')
    .regex(/[A-Z]/, 'Password must contain at least one uppercase letter')
    .regex(/[a-z]/, 'Password must contain at least one lowercase letter')
    .regex(/[0-9]/, 'Password must contain at least one number')
    .regex(/[!@#$%^&*(),.?":{}|<>]/, 'Password must contain at least one special character'),
  confirmPassword: z.string(),
}).refine((data) => data.password === data.confirmPassword, {
  message: 'Passwords do not match',
  path: ['confirmPassword'],
})

// Step 2: Personal Details
export const registerStep2Schema = z.object({
  dateOfBirth: z.string().min(1, 'Date of birth is required'),
  gender: z.enum(['male', 'female', 'other'], {
    errorMap: () => ({ message: 'Please select a gender' }),
  }),
  height: z
    .number()
    .min(100, 'Height must be at least 100 cm')
    .max(250, 'Height must be at most 250 cm'),
  heightUnit: z.enum(['cm', 'inches']).default('cm'),
  weight: z
    .number()
    .min(30, 'Weight must be at least 30 kg')
    .max(300, 'Weight must be at most 300 kg'),
  weightUnit: z.enum(['kg', 'lbs']).default('kg'),
})

// Step 3: Fitness Goals
export const registerStep3Schema = z.object({
  goals: z
    .array(z.string())
    .min(1, 'Select at least one goal')
    .max(3, 'Select up to 3 goals'),
})

// Step 4: Activity Level
export const registerStep4Schema = z.object({
  activityLevel: z.enum(
    ['sedentary', 'lightly-active', 'moderately-active', 'very-active', 'athlete'],
    {
      errorMap: () => ({ message: 'Please select your activity level' }),
    }
  ),
})

// Step 5: Profile Setup
export const registerStep5Schema = z.object({
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

// Complete Registration Schema (all steps combined)
export const completeRegistrationSchema = registerStep1Schema
  .merge(registerStep2Schema)
  .merge(registerStep3Schema)
  .merge(registerStep4Schema)
  .merge(registerStep5Schema)

// Schema validation utilities
export const validateStep = (step, data) => {
  const schemas = {
    1: registerStep1Schema,
    2: registerStep2Schema,
    3: registerStep3Schema,
    4: registerStep4Schema,
    5: registerStep5Schema,
  }

  const schema = schemas[step]
  if (!schema) return { valid: true, errors: {} }

  try {
    schema.parse(data)
    return { valid: true, errors: {} }
  } catch (error) {
    if (error instanceof z.ZodError) {
      const errors = {}
      error.errors.forEach((err) => {
        const path = err.path.join('.')
        errors[path] = err.message
      })
      return { valid: false, errors }
    }
    return { valid: false, errors: { general: 'Validation failed' } }
  }
}
