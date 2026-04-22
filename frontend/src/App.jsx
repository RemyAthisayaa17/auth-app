import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom'
import Login from './pages/Login'
import Register from './pages/Register'
import Dashboard from './pages/Dashboard'
import AdminDashboard from './pages/AdminDashboard'
import { getUser } from './utils/auth'
import { ToastContainer } from './components/Toast'

// Normalize role safely
function getSafeUser() {
  const user = getUser()
  if (!user) return null

  return {
    ...user,
    role: (user.role || '').toLowerCase(),
  }
}

// Public routes
function PublicRoute({ children }) {
  const user = getSafeUser()

  if (!user) return children

  return <Navigate to={user.role === 'admin' ? '/admin' : '/dashboard'} replace />
}

// User routes (non-admin)
function UserRoute({ children }) {
  const user = getSafeUser()

  if (!user) return <Navigate to="/" replace />

  if (user.role === 'admin') {
    return <Navigate to="/admin" replace />
  }

  return children
}

// Admin routes
function AdminRoute({ children }) {
  const user = getSafeUser()

  if (!user) return <Navigate to="/" replace />

  if (user.role !== 'admin') {
    return <Navigate to="/dashboard" replace />
  }

  return children
}

export default function App() {
  return (
    <BrowserRouter>
      <ToastContainer />
      <Routes>

        <Route
          path="/"
          element={
            <PublicRoute>
              <Login />
            </PublicRoute>
          }
        />

        <Route
          path="/register"
          element={
            <PublicRoute>
              <Register />
            </PublicRoute>
          }
        />

        <Route
          path="/dashboard"
          element={
            <UserRoute>
              <Dashboard />
            </UserRoute>
          }
        />

        <Route
          path="/admin"
          element={
            <AdminRoute>
              <AdminDashboard />
            </AdminRoute>
          }
        />

        {/* IMPORTANT: do NOT force dashboard fallback */}
        <Route path="*" element={<Navigate to="/" replace />} />

      </Routes>
    </BrowserRouter>
  )
}