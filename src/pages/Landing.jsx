import { Link } from 'react-router-dom'

export default function Landing() {
  return (
    <div className="min-h-screen bg-gradient-to-b from-white to-gray-50 dark:from-neutral-950 dark:to-neutral-900">
      <nav className="flex justify-between items-center p-6 max-w-7xl mx-auto">
        <h1 className="text-2xl font-bold text-primary-600">FitTrack</h1>
        <div className="flex gap-4">
          <Link to="/login" className="px-6 py-2 text-neutral-700 dark:text-neutral-300 hover:text-primary-600">
            Login
          </Link>
          <Link to="/register" className="px-6 py-2 bg-primary-600 text-white rounded-lg hover:bg-primary-700">
            Get Started
          </Link>
        </div>
      </nav>

      <main className="max-w-7xl mx-auto px-6 py-20 text-center">
        <h2 className="text-5xl font-bold mb-6 text-neutral-900 dark:text-white">
          Your Premium Fitness Companion
        </h2>
        <p className="text-xl text-neutral-600 dark:text-neutral-400 mb-12 max-w-2xl mx-auto">
          Track workouts, monitor progress, and achieve your fitness goals with FitTrack's powerful analytics and personalized guidance.
        </p>
        <div className="flex gap-4 justify-center">
          <Link to="/register" className="px-8 py-3 bg-primary-600 text-white rounded-lg hover:bg-primary-700 font-medium">
            Get Started Free
          </Link>
          <button className="px-8 py-3 border-2 border-primary-600 text-primary-600 rounded-lg hover:bg-primary-50 font-medium">
            Watch Demo
          </button>
        </div>
      </main>
    </div>
  )
}
