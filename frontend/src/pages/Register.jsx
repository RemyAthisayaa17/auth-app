import { useState } from 'react'
import { useForm } from 'react-hook-form'
import { yupResolver } from '@hookform/resolvers/yup'
import { Link, useNavigate } from 'react-router-dom'
import { registerSchema } from '../validation/validation.js'
import { registerUser } from '../services/api'
import { toast } from '../components/Toast'
import './login.css'

function EyeOpen() {
  return (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"
      strokeLinecap="round" strokeLinejoin="round">
      <path d="M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8-11-8z" />
      <circle cx="12" cy="12" r="3" />
    </svg>
  )
}

function EyeOff() {
  return (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"
      strokeLinecap="round" strokeLinejoin="round">
      <path d="M17.94 17.94A10.07 10.07 0 0112 20c-7 0-11-8-11-8a18.45 18.45 0 015.06-5.94" />
      <path d="M9.9 4.24A9.12 9.12 0 0112 4c7 0 11 8 11 8a18.5 18.5 0 01-2.16 3.19" />
      <line x1="1" y1="1" x2="23" y2="23" />
    </svg>
  )
}

export default function Register() {
  const navigate = useNavigate()
  const [serverError, setServerError] = useState('')
  const [loading, setLoading] = useState(false)
  const [showPassword, setShowPassword] = useState(false)

  const { register, handleSubmit, formState: { errors } } = useForm({
    resolver: yupResolver(registerSchema),
    mode: 'onTouched',
  })

  async function onSubmit(data) {
    setServerError('')
    setLoading(true)
    try {
      await registerUser(data)
      toast('Account created successfully! Please sign in.', 'success')
      navigate('/')
    } catch (err) {
      const msg = err?.response?.data?.message
      if (msg) {
        setServerError(msg)
        toast(msg, 'error')
      } else if (err?.request) {
        const connErr = 'Cannot connect to server. Please try again later.'
        setServerError(connErr)
        toast(connErr, 'error')
      } else {
        const unexpErr = 'An unexpected error occurred. Please try again.'
        setServerError(unexpErr)
        toast(unexpErr, 'error')
      }
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="auth-bg scrollable">
      <div className="auth-card">
        <div className="auth-header">
          <div className="auth-logo">
            <svg viewBox="0 0 24 24">
              <path d="M12 2L2 7l10 5 10-5-10-5z" />
              <path d="M2 17l10 5 10-5" />
              <path d="M2 12l10 5 10-5" />
            </svg>
          </div>
          <h1 className="auth-title">Create account</h1>
          <p className="auth-subtitle">Fill in the details below to get started</p>
        </div>

        <form className="auth-form" onSubmit={handleSubmit(onSubmit)} noValidate>
          {serverError && <div className="server-error">{serverError}</div>}

          <div className="field">
            <label htmlFor="username">Username <span className="required">*</span></label>
            <input id="username" type="text" placeholder="Enter your name" autoComplete="off"
              className={errors.username ? 'has-error' : ''} {...register('username')} />
            <span className="error-msg">{errors.username?.message}</span>
          </div>

          <div className="field">
            <label htmlFor="email">Email <span className="required">*</span></label>
            <input id="email" type="email" placeholder="Enter your email" autoComplete="off"
              className={errors.email ? 'has-error' : ''} {...register('email')} />
            <span className="error-msg">{errors.email?.message}</span>
          </div>

          <div className="field">
            <label htmlFor="password">Password <span className="required">*</span></label>
            <div className="input-wrapper">
              <input id="password" type={showPassword ? 'text' : 'password'}
                placeholder="Enter your password" autoComplete="new-password"
                className={errors.password ? 'has-error' : ''} {...register('password')} />
              <button type="button" className="eye-btn"
                onClick={() => setShowPassword((v) => !v)} tabIndex={-1}
                aria-label={showPassword ? 'Hide password' : 'Show password'}>
                {showPassword ? <EyeOff /> : <EyeOpen />}
              </button>
            </div>
            <span className="error-msg">{errors.password?.message}</span>
            <ul className="password-rules">
              <li>Exactly 8 characters</li>
              <li>At least one uppercase letter</li>
              <li>At least one number</li>
              <li>At least one special character</li>
            </ul>
          </div>

          <div className="field">
            <label htmlFor="phone">Phone <span className="required">*</span></label>
            <input id="phone" type="text" placeholder="Enter your phone number" autoComplete="off"
              className={errors.phone ? 'has-error' : ''} {...register('phone')} />
            <span className="error-msg">{errors.phone?.message}</span>
          </div>

          <div className="field">
            <label htmlFor="gender">Gender <span className="required">*</span></label>
            <select id="gender" className={errors.gender ? 'has-error' : ''} defaultValue=""
              {...register('gender')}>
              <option value="" disabled>Select your gender</option>
              <option value="male">Male</option>
              <option value="female">Female</option>
            </select>
            <span className="error-msg">{errors.gender?.message}</span>
          </div>

          <div className="field">
            <label htmlFor="address">Address <span className="required">*</span></label>
            <input id="address" type="text" placeholder="Enter your address" autoComplete="off"
              className={errors.address ? 'has-error' : ''}
              {...register('address')} />
            <span className="error-msg">{errors.address?.message}</span>
          </div>

          <button type="submit" className="btn-primary" disabled={loading}>
            {loading ? 'Creating account...' : 'Create Account'}
          </button>
        </form>

        <div className="auth-footer">
          Already have an account?
          <Link to="/">Sign in</Link>
        </div>
      </div>
    </div>
  )
}