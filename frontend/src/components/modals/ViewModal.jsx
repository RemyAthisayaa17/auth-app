import './Modal.css'

export default function ViewModal({ user, onClose }) {
  if (!user) return null

  const fields = [
    { label: 'Username', value: user.username },
    { label: 'Email',    value: user.email },
    { label: 'Phone',    value: user.phone },
    { label: 'Gender',   value: user.gender },
    { label: 'Address',  value: user.address },
  ]

  return (
    <div className="modal-overlay">
      <div className="modal-box modal-box-sm" onClick={(e) => e.stopPropagation()}>
        <div className="modal-header">
          <h2 className="modal-title">User Details</h2>
          <button className="modal-close" onClick={onClose}>✕</button>
        </div>
        <div className="modal-fields">
          {fields.map(({ label, value }) => (
            <div className="modal-field" key={label}>
              <span className="modal-label">{label}</span>
              <span className="modal-value">{value || '—'}</span>
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}