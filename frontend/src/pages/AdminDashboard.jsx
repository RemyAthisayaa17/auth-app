
import { useState, useEffect, useCallback, useRef } from 'react'
import { useNavigate } from 'react-router-dom'
import { getUser, logoutUser } from '../utils/auth'
import { fetchUsers } from '../services/api'
import Sidebar from '../components/Sidebar'
import ProfileCard from '../components/profile/ProfileCard'
import UserTable from '../components/table/UserTable'
import ViewModal from '../components/modals/ViewModal'
import EditModal from '../components/modals/EditModal'
import DeleteModal from '../components/modals/DeleteModal'
import { toast } from '../components/Toast'
import './AdminDashboard.css'

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
  { key: 'userlist',     label: 'User List',    icon: '⊞' },
  { key: 'adminprofile', label: 'Admin Profile', icon: '◎' },
]

export default function AdminDashboard() {
  const navigate = useNavigate()
  const [user, setUser] = useState(getUser())

  const [users,      setUsers]      = useState([])
  const [loading,    setLoading]    = useState(false)
  const [total,      setTotal]      = useState(0)
  const [totalPages, setTotalPages] = useState(1)

  const [page,   setPage]   = useState(1)
  const [limit,  setLimit]  = useState(5)
  const [search, setSearch] = useState('')
  const [sort,   setSort]   = useState('username')
  const [order,  setOrder]  = useState('ASC')

  const [viewUser,   setViewUser]   = useState(null)
  const [editUser,   setEditUser]   = useState(null)
  const [deleteUser, setDeleteUser] = useState(null)

  const [activeSection, setActiveSection] = useState('userlist')
  const [sidebarOpen,   setSidebarOpen]   = useState(false)

  const searchTimer    = useRef(null)
  const usersLengthRef = useRef(0)

  useEffect(() => {
    usersLengthRef.current = users.length
  }, [users])

  const load = useCallback(async () => {
    setLoading(true)
    try {
      const payload = await fetchUsers({ page, limit, search, sort, order })
      const safeUsers = Array.isArray(payload?.users) ? payload.users : []
      const filteredUsers = safeUsers.filter(
        (u) => u.email !== 'admin@gmail.com'
      )
      setUsers(filteredUsers)
      setTotal(payload?.total      ?? 0)
      setTotalPages(payload?.totalPages ?? 1)
    } catch {
      toast('Failed to load users', 'error')
    } finally {
      setLoading(false)
    }
  }, [page, limit, search, sort, order])

  useEffect(() => { load() }, [load])

  function handleSearch(val) {
    clearTimeout(searchTimer.current)
    searchTimer.current = setTimeout(() => {
      setSearch(val)
      setPage(1)
    }, 400)
  }

  function handleSort(col) {
    if (sort === col) {
      setOrder((o) => (o === 'ASC' ? 'DESC' : 'ASC'))
    } else {
      setSort(col)
      setOrder('ASC')
    }
    setPage(1)
  }

  function handleLimitChange(val) {
    setLimit(val)
    setPage(1)
  }

  function handleUpdated(updated) {
    setUsers((prev) => prev.map((u) => (u.id === updated.id ? updated : u)))
  }

  function handleDeleted(id) {
    setUsers((prev) => prev.filter((u) => u.id !== id))
    setTotal((t) => t - 1)
    if (page === 1) {
      load()
    } else {
      setPage(1)
    }
  }

  function handleLogout() {
    logoutUser()
    navigate('/')
  }

  const firstLetter = user?.username?.charAt(0)?.toUpperCase() || '?'

  return (
    <div className="admin-wrapper">
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

      <div className="admin-main-area">
        <nav className="topbar">
          <div className="topbar-brand">
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
              <button className="logout-icon-btn" onClick={handleLogout}>
                <LogoutIcon />
              </button>
              <span className="logout-tooltip">Logout</span>
            </div>
          </div>
        </nav>

        <main className="admin-main">
          {activeSection === 'userlist' && (
            <>
              <div className="admin-header-row">
                <div>
                  <h1 className="admin-title">User Management</h1>
                  <p className="admin-subtitle">Manage all registered users</p>
                </div>
                <div className="admin-stat">
                  <span className="admin-stat-num">{total}</span>
                  <span className="admin-stat-label">Total Users</span>
                </div>
              </div>

              <UserTable
                users={users}
                loading={loading}
                total={total}
                page={page}
                limit={limit}
                totalPages={totalPages}
                search={search}
                sort={sort}
                order={order}
                onSearch={handleSearch}
                onLimitChange={handleLimitChange}
                onSort={handleSort}
                onPage={setPage}
                onView={setViewUser}
                onEdit={setEditUser}
                onDelete={setDeleteUser}
              />
            </>
          )}

          {activeSection === 'adminprofile' && (
            <div className="admin-profile-section">
              <div className="admin-header-row">
                <div>
                  <h1 className="admin-title">Admin Profile</h1>
                  <p className="admin-subtitle">Manage your account details</p>
                </div>
              </div>
              <ProfileCard
                user={user}
                onUpdated={(updated) => setUser(updated)}
              />
            </div>
          )}
        </main>
      </div>

      {viewUser   && <ViewModal   user={viewUser}   onClose={() => setViewUser(null)} />}
      {editUser   && <EditModal   user={editUser}   onClose={() => setEditUser(null)}   onUpdated={handleUpdated} />}
      {deleteUser && <DeleteModal user={deleteUser} onClose={() => setDeleteUser(null)} onDeleted={handleDeleted} />}
    </div>
  )
}