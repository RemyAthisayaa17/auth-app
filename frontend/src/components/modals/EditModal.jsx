import { useState } from 'react'
import { useForm } from 'react-hook-form'
import { yupResolver } from '@hookform/resolvers/yup'
import { editUserSchema } from '../../validation/validation.js'
import { updateUserById } from '../../services/api.js'
import { toast } from '../Toast.jsx'
import './Modal.css'

export default function EditModal({ user, onClose, onUpdated }) {
  const [loading, setLoading] = useState(false)
  const [editing, setEditing] = useState(false)

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    resolver: yupResolver(editUserSchema),
    defaultValues: {
      username: user.username,
      email:    user.email,
      phone:    user.phone,
      gender:   user.gender,
      address:  user.address,
    },
    mode: 'onTouched',
  })

  async function onSubmit(data) {
    setLoading(true)
    try {
      await updateUserById(user.id, data)
      onUpdated({ ...user, ...data })
      toast('User updated successfully', 'success')
      onClose()
    } catch (err) {
      toast(err?.response?.data?.message || 'Failed to update user', 'error')
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="modal-overlay">
      <div className="modal-box" onClick={(e) => e.stopPropagation()}>
        <div className="modal-header">
          <h2 className="modal-title">Edit User</h2>
          <button className="modal-close" onClick={onClose}>✕</button>
        </div>

        <form onSubmit={handleSubmit(onSubmit)} noValidate>
          <div className="modal-fields">
            {[
              { name: 'username', label: 'Username', type: 'text' },
              { name: 'email',    label: 'Email',    type: 'email' },
              { name: 'phone',    label: 'Phone',    type: 'text' },
            ].map(({ name, label, type }) => (
              <div className="modal-field-row" key={name}>
                <label className="modal-label">{label}</label>
                <input
                  type={type}
                  disabled={!editing}
                  className={`modal-input ${errors[name] ? 'has-error' : ''} ${!editing ? 'disabled' : ''}`}
                  {...register(name)}
                />
                {errors[name] && (
                  <span className="modal-error">{errors[name].message}</span>
                )}
              </div>
            ))}

            <div className="modal-field-row">
              <label className="modal-label">Address</label>
              <input
                type="text"
                disabled={!editing}
                className={`modal-input ${errors.address ? 'has-error' : ''} ${!editing ? 'disabled' : ''}`}
                {...register('address')}
              />
              {errors.address && (
                <span className="modal-error">{errors.address.message}</span>
              )}
            </div>

            <div className="modal-field-row">
              <label className="modal-label">Gender</label>
              <select
                disabled={!editing}
                className={`modal-input ${errors.gender ? 'has-error' : ''} ${!editing ? 'disabled' : ''}`}
                {...register('gender')}
              >
                <option value="male">Male</option>
                <option value="female">Female</option>
              </select>
              {errors.gender && (
                <span className="modal-error">{errors.gender.message}</span>
              )}
            </div>
          </div>

          <div className="modal-footer center-buttons">
            <button
              type="button"
              className={`modal-btn modal-btn-primary ${editing ? 'modal-btn-inactive' : ''}`}
              onClick={() => setEditing(true)}
              disabled={editing}
            >
              Edit
            </button>
            <button
              type="submit"
              className="modal-btn modal-btn-primary"
              disabled={!editing || loading}
            >
              {loading ? 'Saving...' : 'Save'}
            </button>
          </div>
        </form>
      </div>
    </div>
  )
}