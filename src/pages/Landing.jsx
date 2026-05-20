import { Link } from 'react-router-dom'
import { Navbar, Hero } from '../components/landing'

export default function Landing() {
  return (
    <div className="min-h-screen bg-gradient-to-b from-white to-gray-50 dark:from-neutral-950 dark:to-neutral-900">
      <Navbar />
      <Hero />
    </div>
  )
}
