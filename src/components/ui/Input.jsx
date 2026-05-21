import { forwardRef } from 'react'

/**
 * Reusable Input component with accessibility and styling
 * - Label support
 * - Error state display
 * - Disabled state
 * - Focus styles with ring
 * - Placeholder text
 * - Accessibility attributes (aria-*, id)
 * - Icon support (left/right icons)
 * - Type variants (text, email, password, number, date, etc.)
 */
const Input = forwardRef(({
  id,
  label,
  type = 'text',
  placeholder,
  value,
  onChange,
  onBlur,
  disabled = false,
  error,
  required = false,
  leftIcon: LeftIcon,
  rightIcon: RightIcon,
  onIconClick,
  className = '',
  inputClassName = '',
  labelClassName = '',
  errorClassName = '',
  autoComplete,
  min,
  max,
  step,
  pattern,
  ...rest
}, ref) => {
  const inputId = id || `input-${Math.random().toString(36).substr(2, 9)}`
  const errorId = `${inputId}-error`

  return (
    <div className={`w-full ${className}`}>
      {label && (
        <label
          htmlFor={inputId}
          className={`block text-sm font-medium text-neutral-900 dark:text-white mb-2 ${labelClassName}`}
        >
          {label}
          {required && <span className="text-error-500 ml-1">*</span>}
        </label>
      )}

      <div className="relative">
        {/* Left Icon */}
        {LeftIcon && (
          <div className="absolute left-3 top-1/2 -translate-y-1/2 pointer-events-none">
            <LeftIcon className="w-5 h-5 text-neutral-400 dark:text-neutral-500" />
          </div>
        )}

        {/* Input Field */}
        <input
          ref={ref}
          id={inputId}
          type={type}
          placeholder={placeholder}
          value={value}
          onChange={onChange}
          onBlur={onBlur}
          disabled={disabled}
          autoComplete={autoComplete}
          min={min}
          max={max}
          step={step}
          pattern={pattern}
          aria-invalid={!!error}
          aria-describedby={error ? errorId : undefined}
          aria-required={required}
          className={`
            w-full px-4 py-3 rounded-lg
            border border-neutral-200 dark:border-neutral-700
            bg-white dark:bg-neutral-900
            text-neutral-900 dark:text-white
            placeholder-neutral-400 dark:placeholder-neutral-600
            transition-all duration-200
            focus:outline-none focus:ring-2 focus:ring-offset-0
            focus:border-transparent
            ${LeftIcon ? 'pl-10' : ''}
            ${RightIcon ? 'pr-10' : ''}
            ${
              error
                ? 'focus:ring-error-500/50 border-error-500 dark:border-error-400'
                : 'focus:ring-primary-500/50 dark:focus:ring-primary-400/50'
            }
            ${
              disabled
                ? 'opacity-50 cursor-not-allowed bg-neutral-50 dark:bg-neutral-800'
                : 'hover:border-neutral-300 dark:hover:border-neutral-600'
            }
            ${inputClassName}
          `}
          {...rest}
        />

        {/* Right Icon */}
        {RightIcon && (
          <button
            type="button"
            onClick={onIconClick}
            disabled={disabled}
            className="absolute right-3 top-1/2 -translate-y-1/2 p-1 hover:bg-neutral-100 dark:hover:bg-neutral-800 rounded transition-colors disabled:cursor-not-allowed"
            aria-label="Toggle visibility"
            tabIndex={-1}
          >
            <RightIcon className="w-5 h-5 text-neutral-400 dark:text-neutral-500 hover:text-neutral-600 dark:hover:text-neutral-400" />
          </button>
        )}
      </div>

      {/* Error Message */}
      {error && (
        <p
          id={errorId}
          className={`mt-1.5 text-sm font-medium text-error-600 dark:text-error-400 ${errorClassName}`}
          role="alert"
        >
          {error}
        </p>
      )}
    </div>
  )
})

Input.displayName = 'Input'

export default Input
