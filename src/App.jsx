import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom'
import { AuthContext } from './contexts/AuthContext'
import { useContext } from 'react'
import ProtectedRoute from './components/common/ProtectedRoute'
import Landing from './pages/Landing'
import Login from './pages/Login'
import Register from './pages/Register'
import Dashboard from './pages/Dashboard'
function App() {
  const { user } = useContext(AuthContext)
  return (
    <BrowserRouter>
      <Routes>
        {}
        <Route path="/" element={<Landing />} />
        <Route path="/login" element={!user ? <Login /> : <Navigate to="/dashboard" />} />
        <Route path="/register" element={!user ? <Register /> : <Navigate to="/dashboard" />} />
        {}
        <Route
          path="/dashboard"
          element={
            <ProtectedRoute>
              <Dashboard />
            </ProtectedRoute>
          }
        />
        {}
        <Route path="*" element={<Navigate to="/" />} />
      </Routes>
    </BrowserRouter>
  )
}
export default App
