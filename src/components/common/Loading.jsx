export default function Loading() {
  return (
    <div className="flex items-center justify-center min-h-screen bg-white dark:bg-neutral-950">
      <div className="animate-spin">
        <div className="h-12 w-12 border-4 border-primary-600 border-t-transparent rounded-full"></div>
      </div>
    </div>
  )
}
