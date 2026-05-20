import { cn } from '../../utils/cn'

/**
 * Premium reusable Card wrapper component
 * 
 * @param {React.ReactNode} children - Card content
 * @param {string} padding - Padding size: 'sm' | 'md' | 'lg'
 * @param {boolean} hover - Enable hover lift and shadow effects
 * @param {string} className - Additional CSS classes
 * @param {object} props - Additional HTML attributes
 */
export default function Card({
  children,
  padding = 'md',
  hover = true,
  className,
  ...props
}) {
  const baseStyles = 'rounded-xl bg-white dark:bg-neutral-900 border border-neutral-200 dark:border-neutral-800 transition-all duration-300 ease-out'

  const paddingSizes = {
    sm: 'p-3',
    md: 'p-6',
    lg: 'p-8',
  }

  const hoverEffects = hover
    ? 'hover:shadow-xl hover:shadow-primary-500/10 hover:-translate-y-1 dark:hover:shadow-primary-900/20'
    : ''

  const paddingClass = paddingSizes[padding] || paddingSizes.md

  return (
    <div
      className={cn(
        baseStyles,
        paddingClass,
        hoverEffects,
        className
      )}
      {...props}
    >
      {children}
    </div>
  )
}
