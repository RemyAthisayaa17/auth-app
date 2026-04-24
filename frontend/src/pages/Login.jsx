import { useState } from 'react'
import { useForm } from 'react-hook-form'
import { yupResolver } from '@hookform/resolvers/yup'
import { Link, useNavigate } from 'react-router-dom'
import { loginSchema } from '../validation/validation.js'
import { loginUser } from '../services/api'
import { saveSession, isAdmin } from '../utils/auth'
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

export default function Login() {
  const navigate = useNavigate()
  const [serverError, setServerError] = useState('')
  const [loading, setLoading] = useState(false)
  const [showPassword, setShowPassword] = useState(false)

  const { register, handleSubmit, formState: { errors } } = useForm({
    resolver: yupResolver(loginSchema),
    mode: 'onTouched',
  })

  async function onSubmit(data) {
    setServerError('')
    setLoading(true)

    try {
      // api.js unwraps one level → res is { success, message, data: { user, token } }
      const res = await loginUser(data)
      const { user: rawUser, token } = res.data

      if (!rawUser?.email) throw new Error(res.message || 'Invalid login response')

      // saveSession normalizes role, persists user + token — no logic here
      saveSession(rawUser, token)

      if (isAdmin(rawUser)) {
        toast('Welcome Admin!', 'success')
        navigate('/admin', { replace: true })
      } else {
        toast('Login successful! Welcome back.', 'success')
        navigate('/dashboard', { replace: true })
      }
    } catch (err) {
      const msg =
        err?.response?.data?.message ||
        err?.message ||
        'Login failed. Please try again.'

      setServerError(msg)
      toast(msg, 'error')
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="auth-bg no-scroll">
      <div className="circle circle-1" />
      <div className="circle circle-2" />
      <div className="circle circle-3" />

      <div className="auth-card">
        <div className="auth-header">
          <div className="auth-logo">
            <svg viewBox="0 0 24 24">
              <path d="M12 2L2 7l10 5 10-5-10-5z" />
              <path d="M2 17l10 5 10-5" />
              <path d="M2 12l10 5 10-5" />
            </svg>
          </div>
          <h1 className="auth-title">Welcome</h1>
          <p className="auth-subtitle">Sign in to your account to continue</p>
        </div>

        <form className="auth-form" onSubmit={handleSubmit(onSubmit)} noValidate>
          {serverError && <div className="server-error">{serverError}</div>}

          <div className="field">
            <label>Email</label>
            <input
              type="email"
              {...register('email')}
              className={errors.email ? 'has-error' : ''}
            />
            <span className="error-msg">{errors.email?.message}</span>
          </div>

          <div className="field">
            <label>Password</label>
            <div className="input-wrapper">
              <input
                type={showPassword ? 'text' : 'password'}
                {...register('password')}
                className={errors.password ? 'has-error' : ''}
              />
              <button
                type="button"
                className="eye-btn"
                onClick={() => setShowPassword((v) => !v)}
              >
                {showPassword ? <EyeOff /> : <EyeOpen />}
              </button>
            </div>
            <span className="error-msg">{errors.password?.message}</span>
          </div>

          <button type="submit" className="btn-primary" disabled={loading}>
            {loading ? 'Signing in...' : 'Sign In'}
          </button>
        </form>

        <div className="auth-footer">
          Don&apos;t have an account?
          <Link to="/register">Create one</Link>
        </div>
      </div>
    </div>
  )
}