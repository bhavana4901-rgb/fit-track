import { cn } from '../../utils/cn'

/**
 * Premium reusable Button component with multiple variants and sizes
 * 
 * @param {string} variant - Button style variant: 'primary' | 'secondary' | 'outline' | 'ghost'
 * @param {string} size - Button size: 'sm' | 'md' | 'lg'
 * @param {React.ReactNode} children - Button content
 * @param {boolean} disabled - Disabled state
 * @param {function} onClick - Click handler
 * @param {string} className - Additional CSS classes
 * @param {object} props - Additional HTML attributes
 */
export default function Button({
  variant = 'primary',
  size = 'md',
  children,
  disabled = false,
  onClick,
  className,
  ...props
}) {
  const baseStyles = 'font-semibold font-poppins rounded-lg transition-all duration-200 cursor-pointer focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-offset-white dark:focus:ring-offset-neutral-950 disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-2 whitespace-nowrap'

  const variants = {
    primary: 'bg-primary-600 text-white hover:bg-primary-700 focus:ring-primary-500 shadow-lg hover:shadow-xl dark:bg-primary-600 dark:hover:bg-primary-700 active:scale-95',
    secondary: 'bg-secondary-600 text-white hover:bg-secondary-700 focus:ring-secondary-500 shadow-lg hover:shadow-xl dark:bg-secondary-600 dark:hover:bg-secondary-700 active:scale-95',
    outline: 'border-2 border-primary-600 text-primary-600 hover:bg-primary-50 dark:hover:bg-primary-950 focus:ring-primary-500 dark:border-primary-500 dark:text-primary-400 active:scale-95',
    ghost: 'text-primary-600 hover:bg-primary-100 dark:hover:bg-primary-950 focus:ring-primary-500 dark:text-primary-400 active:scale-95',
  }

  const sizes = {
    sm: 'px-3 py-1.5 text-sm',
    md: 'px-4 py-2.5 text-base',
    lg: 'px-6 py-3.5 text-lg',
  }

  const variantClass = variants[variant] || variants.primary
  const sizeClass = sizes[size] || sizes.md

  return (
    <button
      onClick={onClick}
      disabled={disabled}
      className={cn(baseStyles, variantClass, sizeClass, className)}
      {...props}
    >
      {children}
    </button>
  )
}
