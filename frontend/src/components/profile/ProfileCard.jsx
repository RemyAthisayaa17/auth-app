import { useState } from 'react'
import { useForm } from 'react-hook-form'
import { yupResolver } from '@hookform/resolvers/yup'
import { editUserSchema } from '../../validation/validation.js'
import { updateUserById } from '../../services/api.js'
import { toast } from '../Toast.jsx'
import { setUser } from '../../utils/auth.js'
import './ProfileCard.css'

export default function ProfileCard({ user: initialUser, onUpdated }) {
  const [editing, setEditing] = useState(false)
  const [loading, setLoading] = useState(false)
  const [currentUser, setCurrentUser] = useState(initialUser)

  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm({
    resolver: yupResolver(editUserSchema),
    defaultValues: {
      username: initialUser.username,
      email:    initialUser.email,
      phone:    initialUser.phone    || '',
      gender:   initialUser.gender   || 'male',
      address:  initialUser.address  || '',
    },
    mode: 'onTouched',
  })

  function handleEditClick() {
    setEditing(true)
  }

  function handleClose() {
    reset({
      username: currentUser.username,
      email:    currentUser.email,
      phone:    currentUser.phone    || '',
      gender:   currentUser.gender   || 'male',
      address:  currentUser.address  || '',
    })
    setEditing(false)
  }

  async function onSubmit(data) {
    setLoading(true)
    try {
      await updateUserById(currentUser.id, data)
      const updated = { ...currentUser, ...data }
      setUser(updated)
      setCurrentUser(updated)
      onUpdated?.(updated)
      toast('Profile updated successfully', 'success')
      setEditing(false)
    } catch (err) {
      toast(err?.response?.data?.message || 'Failed to update profile', 'error')
    } finally {
      setLoading(false)
    }
  }

  const firstLetter = currentUser?.username?.charAt(0)?.toUpperCase() || '?'

  const fields = [
    { name: 'username', label: 'Username', type: 'text' },
    { name: 'email',    label: 'Email',    type: 'email' },
    { name: 'phone',    label: 'Phone',    type: 'text' },
  ]

  return (
    <div className="profile-card">
      {!editing && (
        <div className="profile-edit-btn-wrap">
          <button
            type="button"
            className="profile-edit-icon-btn"
            onClick={handleEditClick}
            aria-label="Edit Profile"
          >
            <EditIcon />
          </button>
          <span className="profile-edit-tooltip">Edit Profile</span>
        </div>
      )}

      <div className="profile-card-avatar">{firstLetter}</div>

      <h2 className="profile-card-name">{currentUser.username}</h2>
      <p className="profile-card-email">{currentUser.email}</p>

      <form onSubmit={handleSubmit(onSubmit)} noValidate className="profile-card-form">
        <div className="profile-card-fields">
          {fields.map(({ name, label, type }) => (
            <div className="profile-card-field" key={name}>
              <label className="profile-card-label">{label}</label>
              <input
                type={type}
                disabled={!editing}
                className={`profile-card-input ${errors[name] ? 'has-error' : ''} ${!editing ? 'disabled' : ''}`}
                {...register(name)}
              />
              {errors[name] && (
                <span className="profile-card-error">{errors[name].message}</span>
              )}
            </div>
          ))}

          <div className="profile-card-field">
            <label className="profile-card-label">Address</label>
            <input
              type="text"
              disabled={!editing}
              className={`profile-card-input ${errors.address ? 'has-error' : ''} ${!editing ? 'disabled' : ''}`}
              {...register('address')}
            />
            {errors.address && (
              <span className="profile-card-error">{errors.address.message}</span>
            )}
          </div>

          <div className="profile-card-field">
            <label className="profile-card-label">Gender</label>
            <select
              disabled={!editing}
              className={`profile-card-input profile-card-select ${errors.gender ? 'has-error' : ''} ${!editing ? 'disabled' : ''}`}
              {...register('gender')}
            >
              <option value="male">Male</option>
              <option value="female">Female</option>
            </select>
            {errors.gender && (
              <span className="profile-card-error">{errors.gender.message}</span>
            )}
          </div>
        </div>

        {editing && (
          <div className="profile-card-footer">
            <button
              type="button"
              className="profile-card-btn profile-card-btn-cancel"
              onClick={handleClose}
              disabled={loading}
            >
              Close
            </button>
            <button
              type="submit"
              className="profile-card-btn profile-card-btn-save"
              disabled={loading}
            >
              {loading ? 'Saving...' : 'Save'}
            </button>
          </div>
        )}
      </form>
    </div>
  )
}

function EditIcon() {
  return (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"
      strokeLinecap="round" strokeLinejoin="round" width="16" height="16">
      <path d="M11 4H4a2 2 0 00-2 2v14a2 2 0 002 2h14a2 2 0 002-2v-7" />
      <path d="M18.5 2.5a2.121 2.121 0 013 3L12 15l-4 1 1-4 9.5-9.5z" />
    </svg>
  )
}