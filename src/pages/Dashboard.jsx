import { useContext } from 'react'
import { useNavigate } from 'react-router-dom'
import { AuthContext } from '../contexts/AuthContext'

export default function Dashboard() {
  const { user, logout } = useContext(AuthContext)
  const navigate = useNavigate()

  const handleLogout = () => {
    logout()
    navigate('/')
  }

  return (
    <div className="min-h-screen bg-gradient-to-b from-white to-gray-50 dark:from-neutral-950 dark:to-neutral-900">
      <div className="flex justify-between items-center p-6 max-w-7xl mx-auto">
        <h1 className="text-2xl font-bold text-primary-600">FitTrack Dashboard</h1>
        <button
          onClick={handleLogout}
          className="px-6 py-2 bg-error-600 text-white rounded-lg hover:bg-error-700 font-medium transition"
        >
          Logout
        </button>
      </div>

      <main className="max-w-7xl mx-auto px-6 py-12">
        <div className="bg-white dark:bg-neutral-800 rounded-lg p-8 shadow-lg">
          <h2 className="text-3xl font-bold mb-4 text-neutral-900 dark:text-white">
            Welcome, {user?.name}! 🎉
          </h2>
          <p className="text-neutral-600 dark:text-neutral-400 mb-6">
            You're successfully logged in. This is your dashboard.
          </p>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mt-8">
            <div className="p-6 bg-primary-50 dark:bg-primary-950/20 rounded-lg border border-primary-200 dark:border-primary-800">
              <h3 className="font-semibold text-primary-900 dark:text-primary-100 mb-2">Workouts</h3>
              <p className="text-2xl font-bold text-primary-600">0</p>
              <p className="text-sm text-primary-600/70">This week</p>
            </div>

            <div className="p-6 bg-secondary-50 dark:bg-secondary-950/20 rounded-lg border border-secondary-200 dark:border-secondary-800">
              <h3 className="font-semibold text-secondary-900 dark:text-secondary-100 mb-2">Calories Burned</h3>
              <p className="text-2xl font-bold text-secondary-600">0</p>
              <p className="text-sm text-secondary-600/70">kcal</p>
            </div>

            <div className="p-6 bg-accent-50 dark:bg-accent-950/20 rounded-lg border border-accent-200 dark:border-accent-800">
              <h3 className="font-semibold text-accent-900 dark:text-accent-100 mb-2">Streak</h3>
              <p className="text-2xl font-bold text-accent-600">0</p>
              <p className="text-sm text-accent-600/70">days</p>
            </div>
          </div>

          <div className="mt-8 p-6 bg-neutral-100 dark:bg-neutral-700 rounded-lg">
            <h3 className="font-semibold text-neutral-900 dark:text-white mb-4">Coming Soon</h3>
            <ul className="space-y-2 text-neutral-700 dark:text-neutral-300">
              <li>✓ Complete dashboard with analytics</li>
              <li>✓ Workout tracking & progress charts</li>
              <li>✓ Nutrition planning</li>
              <li>✓ Achievement system</li>
            </ul>
          </div>
        </div>
      </main>
    </div>
  )
}
