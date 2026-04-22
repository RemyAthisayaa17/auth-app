import { FiEye, FiEdit2, FiTrash2, FiChevronUp, FiChevronDown, FiChevronsLeft, FiChevronsRight, FiChevronLeft, FiChevronRight } from 'react-icons/fi'
import './UserTable.css'

const COLUMNS = [
  { key: 'username', label: 'Username' },
  { key: 'email',    label: 'Email' },
  { key: 'phone',    label: 'Phone' },
  { key: 'gender',   label: 'Gender' },
]

export default function UserTable({
  users,
  loading,
  total,
  page,
  limit,
  totalPages,
  search,
  sort,
  order,
  onSearch,
  onLimitChange,
  onSort,
  onPage,
  onView,
  onEdit,
  onDelete,
}) {
  function SortIcon({ col }) {
    if (sort !== col) return <span className="sort-icon sort-none"><FiChevronUp /><FiChevronDown /></span>
    return order === 'ASC'
      ? <span className="sort-icon sort-active"><FiChevronUp /></span>
      : <span className="sort-icon sort-active"><FiChevronDown /></span>
  }

  const start = total === 0 ? 0 : (page - 1) * limit + 1
  const end   = Math.min(page * limit, total)

  return (
    <div className="table-wrapper">
      {/* ── Controls ── */}
      <div className="table-controls">
        <div className="table-controls-left">
          <label className="records-label">Show</label>
          <select
            className="records-select"
            value={limit}
            onChange={(e) => onLimitChange(Number(e.target.value))}
          >
            {[5, 10, 15, 20].map((n) => (
              <option key={n} value={n}>{n}</option>
            ))}
          </select>
          <span className="records-label">records</span>
        </div>
        <div className="table-controls-right">
          <div className="search-box">
            <svg className="search-icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
              <circle cx="11" cy="11" r="8" />
              <line x1="21" y1="21" x2="16.65" y2="16.65" />
            </svg>
            <input
              type="text"
              className="search-input"
              placeholder="Search by name, email, phone..."
              value={search}
              onChange={(e) => onSearch(e.target.value)}
            />
          </div>
        </div>
      </div>

      {/* ── Table ── */}
      <div className="table-scroll">
        <table className="data-table">
          <thead>
            <tr>
              <th className="th-num">#</th>
              {COLUMNS.map(({ key, label }) => (
                <th
                  key={key}
                  className="th-sortable"
                  onClick={() => onSort(key)}
                >
                  <span className="th-inner">
                    {label}
                    <SortIcon col={key} />
                  </span>
                </th>
              ))}
              <th className="th-actions">Actions</th>
            </tr>
          </thead>
          <tbody>
            {loading ? (
              <tr>
                <td colSpan={6} className="td-empty">
                  <div className="table-loading">Loading...</div>
                </td>
              </tr>
            ) : users.length === 0 ? (
              <tr>
                <td colSpan={6} className="td-empty">No users found</td>
              </tr>
            ) : (
              users.map((user, idx) => (
                <tr key={user.id} className="tr-row">
                  <td className="td-num">{start + idx}</td>
                  <td>{user.username}</td>
                  <td>{user.email}</td>
                  <td>{user.phone}</td>
                  <td>
                    {/* Safe fallback: null/undefined gender never corrupts
                        the CSS class name or leaves an empty badge */}
                    <span className={`gender-badge gender-${user.gender || 'unknown'}`}>
                      {user.gender || 'N/A'}
                    </span>
                  </td>
                  <td className="td-actions">
                    <button className="action-btn view-btn" onClick={() => onView(user)} title="View">
                      <FiEye />
                    </button>
                    <button className="action-btn edit-btn" onClick={() => onEdit(user)} title="Edit">
                      <FiEdit2 />
                    </button>
                    <button className="action-btn delete-btn" onClick={() => onDelete(user)} title="Delete">
                      <FiTrash2 />
                    </button>
                  </td>
                </tr>
              ))
            )}
          </tbody>
        </table>
      </div>

      {/* ── Pagination ── */}
      <div className="table-footer">
        <span className="pagination-info">
          {total === 0 ? 'No records' : `Showing ${start}–${end} of ${total}`}
        </span>
        <div className="pagination-controls">
          <button className="page-btn" onClick={() => onPage(1)} disabled={page === 1} title="First">
            <FiChevronsLeft />
          </button>
          <button className="page-btn" onClick={() => onPage(page - 1)} disabled={page === 1} title="Prev">
            <FiChevronLeft />
          </button>
          <span className="page-indicator">{page} / {totalPages || 1}</span>
          <button className="page-btn" onClick={() => onPage(page + 1)} disabled={page >= totalPages} title="Next">
            <FiChevronRight />
          </button>
          <button className="page-btn" onClick={() => onPage(totalPages)} disabled={page >= totalPages} title="Last">
            <FiChevronsRight />
          </button>
        </div>
      </div>
    </div>
  )
}