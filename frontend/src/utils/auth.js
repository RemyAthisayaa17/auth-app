import { ROLES } from '../constants/roles.js'
import { saveToken, removeToken } from './tokenStorage.js'

const USER_KEY = 'user'


function normalizeUser(rawUser) {
  return {
    ...rawUser,
    role: (rawUser?.role || '').toLowerCase() || ROLES.USER,
  }
}

export function saveSession(rawUser, token) {
  const user = normalizeUser(rawUser)
  localStorage.setItem(USER_KEY, JSON.stringify(user))
  saveToken(token)
}

export function getUser() {
  try {
    const stored = localStorage.getItem(USER_KEY)
    return stored ? JSON.parse(stored) : null
  } catch {
    return null
  }
}

export function clearSession() {
  localStorage.removeItem(USER_KEY)
  removeToken()
}

export function isAdmin(user) {
  return user?.role === ROLES.ADMIN
}

export function setUser(user) {
  saveSession(user, null)
}

export function logoutUser() {
  clearSession()
}