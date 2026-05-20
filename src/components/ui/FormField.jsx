import { forwardRef } from 'react'
import Input from './Input'

/**
 * FormField wrapper component
 * - Combines label, input, and error display
 * - Provides consistent spacing and styling
 * - All Input props passed through to Input component
 * - Useful for quick form field creation
 */
const FormField = forwardRef(({
  label,
  error,
  required = false,
  hint,
  hintClassName = '',
  containerClassName = '',
  ...inputProps
}, ref) => {
  return (
    <div className={`w-full ${containerClassName}`}>
      <Input
        ref={ref}
        label={label}
        error={error}
        required={required}
        {...inputProps}
      />

      {/* Hint/Helper Text */}
      {hint && !error && (
        <p className={`mt-1.5 text-sm text-neutral-500 dark:text-neutral-400 ${hintClassName}`}>
          {hint}
        </p>
      )}
    </div>
  )
})

FormField.displayName = 'FormField'

export default FormField
