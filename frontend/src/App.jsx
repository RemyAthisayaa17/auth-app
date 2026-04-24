import { useEffect } from 'react'
import { BrowserRouter, Routes, Route, Navigate, useNavigate } from 'react-router-dom'
import Login from './pages/Login'
import Register from './pages/Register'
import Dashboard from './pages/Dashboard'
import AdminDashboard from './pages/AdminDashboard'
import { getUser, clearSession, isAdmin } from './utils/auth'
import { getTokenExpiry } from './utils/tokenStorage'
import { ToastContainer } from './components/Toast'

// ── Route Guards ──────────────────────────────────────────────────────────────

function PublicRoute({ children }) {
  const user = getUser()
  if (!user) return children
  return <Navigate to={isAdmin(user) ? '/admin' : '/dashboard'} replace />
}

function UserRoute({ children }) {
  const user = getUser()
  if (!user) return <Navigate to="/" replace />
  if (isAdmin(user)) return <Navigate to="/admin" replace />
  return children
}

function AdminRoute({ children }) {
  const user = getUser()
  if (!user) return <Navigate to="/" replace />
  if (!isAdmin(user)) return <Navigate to="/dashboard" replace />
  return children
}

// ── Auto-logout ───────────────────────────────────────────────────────────────

function AutoLogout() {
  const navigate = useNavigate()

  useEffect(() => {
    const expiryMs = getTokenExpiry()
    if (!expiryMs) return

    const msUntilExpiry = expiryMs - Date.now()

    if (msUntilExpiry <= 0) {
      clearSession()
      navigate('/', { replace: true })
      return
    }

    const timeoutId = setTimeout(() => {
      clearSession()
      navigate('/', { replace: true })
    }, msUntilExpiry)

    return () => clearTimeout(timeoutId)
  }, [navigate])

  return null
}

// ── App ───────────────────────────────────────────────────────────────────────

export default function App() {
  return (
    <BrowserRouter>
      <ToastContainer />
      <AutoLogout />

      <Routes>
        <Route path="/" element={<PublicRoute><Login /></PublicRoute>} />
        <Route path="/register" element={<PublicRoute><Register /></PublicRoute>} />
        <Route path="/dashboard" element={<UserRoute><Dashboard /></UserRoute>} />
        <Route path="/admin" element={<AdminRoute><AdminDashboard /></AdminRoute>} />
        <Route path="*" element={<Navigate to="/" replace />} />
      </Routes>
    </BrowserRouter>
  )
}