import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { getUser, logoutUser } from '../utils/auth'
import Sidebar from '../components/Sidebar'
import ProfileCard from '../components/profile/ProfileCard'
import './Dashboard.css'

function LogoutIcon() {
  return (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"
      strokeLinecap="round" strokeLinejoin="round">
      <path d="M9 21H5a2 2 0 01-2-2V5a2 2 0 012-2h4" />
      <polyline points="16 17 21 12 16 7" />
      <line x1="21" y1="12" x2="9" y2="12" />
    </svg>
  )
}

function HamburgerIcon() {
  return (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"
      strokeLinecap="round" strokeLinejoin="round" width="22" height="22">
      <line x1="3" y1="6" x2="21" y2="6" />
      <line x1="3" y1="12" x2="21" y2="12" />
      <line x1="3" y1="18" x2="21" y2="18" />
    </svg>
  )
}

const SIDEBAR_ITEMS = [
  { key: 'home', label: 'Dashboard', icon: '⊞' },
  { key: 'profile', label: 'Profile', icon: '◎' },
]

export default function Dashboard() {
  const navigate = useNavigate()
  const [user, setUser] = useState(getUser())
  const [activeSection, setActiveSection] = useState('home')
  const [sidebarOpen, setSidebarOpen] = useState(false)

  function handleLogout() {
    logoutUser()
    navigate('/')
  }

  function handleProfileUpdated(updatedUser) {
    setUser(updatedUser)
  }

  const firstLetter = user?.username?.charAt(0)?.toUpperCase() || '?'

  return (
    <div className="dashboard-wrapper">
      <div className="dashboard-bg">
        <div className="dash-circle dash-circle-1" />
        <div className="dash-circle dash-circle-2" />
      </div>

      <Sidebar
        title="MyApp"
        items={SIDEBAR_ITEMS}
        activeSection={activeSection}
        onSelect={setActiveSection}
        isOpen={sidebarOpen}
        onClose={() => setSidebarOpen(false)}
      />

      <div className="main-area">
        {/* Topbar */}
        <nav className="topbar">
          <div className="topbar-brand">
            {/* Hamburger — mobile only */}
            <button
              className="hamburger-btn"
              onClick={() => setSidebarOpen(true)}
              aria-label="Open menu"
            >
              <HamburgerIcon />
            </button>
          </div>

          <div className="topbar-right">
            <div className="nav-avatar">{firstLetter}</div>
            <span className="nav-username">{user?.username}</span>
            <div className="logout-wrap">
              <button className="logout-icon-btn" onClick={handleLogout} aria-label="Logout">
                <LogoutIcon />
              </button>
              <span className="logout-tooltip">Logout</span>
            </div>
          </div>
        </nav>

        {/* Main content */}
        <main className="dash-main">
          {activeSection === 'home' && (
            <div className="welcome-card">
              <div className="avatar">{firstLetter}</div>
              <p className="welcome-label">Logged in as</p>
              <h1 className="welcome-username">{user?.username}</h1>
              <p className="welcome-text">You have successfully signed in!</p>
              <button
                className="edit-profile-btn"
                onClick={() => setActiveSection('profile')}
              >
                View Profile
              </button>
            </div>
          )}

          {activeSection === 'profile' && (
            <ProfileCard user={user} onUpdated={handleProfileUpdated} />
          )}
        </main>
      </div>
    </div>
  )
}