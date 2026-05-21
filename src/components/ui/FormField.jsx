import { forwardRef } from 'react'
import Input from './Input'
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
