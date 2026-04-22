import { useState } from 'react'
import { deleteUserById } from '../../services/api.js'
import { toast } from '../Toast.jsx'
import './Modal.css'

export default function DeleteModal({ user, onClose, onDeleted }) {
  const [loading, setLoading] = useState(false)

  async function handleDelete() {
    setLoading(true)
    try {
      await deleteUserById(user.id)
      onDeleted(user.id)
      toast('User deleted successfully', 'success')
      onClose()
    } catch (err) {
      toast(err?.response?.data?.message || 'Failed to delete user', 'error')
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="modal-overlay">
      <div className="modal-box modal-box-sm" onClick={(e) => e.stopPropagation()}>
        <div className="modal-header">
          <h2 className="modal-title">Delete User</h2>
          <button className="modal-close" onClick={onClose}>✕</button>
        </div>
        <div className="modal-confirm-body">
          <div className="modal-confirm-icon"></div>
          <p className="modal-confirm-text">
            Are you sure you want to delete <strong>{user?.username}</strong>?
            <br />This action cannot be undone.
          </p>
        </div>
        <div className="modal-footer">
          <button className="modal-btn modal-btn-danger" onClick={handleDelete} disabled={loading}>
            {loading ? 'Deleting...' : 'Yes, Delete'}
          </button>
        </div>
      </div>
    </div>
  )
}