import './Sidebar.css'

export default function Sidebar({ title, items, activeSection, onSelect, isOpen, onClose }) {
  return (
    <>
      {isOpen && <div className="sidebar-overlay" onClick={onClose} />}

      <aside className={`sidebar ${isOpen ? 'sidebar-open' : ''}`}>
        <div className="sidebar-title">{title}</div>

        {items.map((item) => (
          <button
            key={item.key}
            className={`sidebar-item ${activeSection === item.key ? 'active' : ''}`}
            onClick={() => {
              onSelect(item.key)
              onClose?.()
            }}
          >
            <span className="sidebar-item-icon">{item.icon}</span>
            {item.label}
          </button>
        ))}
      </aside>
    </>
  )
}