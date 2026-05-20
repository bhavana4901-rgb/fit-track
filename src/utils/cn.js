// Utility function for merging Tailwind CSS classes
// Uses clsx or tailwind-merge for conflict resolution
// Usage: cn('px-2 py-1', isActive && 'bg-blue-500', 'px-4')

// Simple implementation - can be enhanced with clsx + tailwind-merge
export function cn(...classes) {
  return classes.filter(Boolean).join(' ')
}
