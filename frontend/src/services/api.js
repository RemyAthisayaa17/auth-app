import axios from 'axios'

const BASE_URL = import.meta.env.VITE_API_BASE_URL || 'http://localhost:5000'

const api = axios.create({
  baseURL: BASE_URL,
  headers: { 'Content-Type': 'application/json' },
})

/**
 * All endpoints return { success, message, data } from the backend responseModel.
 * We unwrap one level here so callers always receive the `data` field directly.
 * For auth endpoints the `data` field contains { user, token }.
 * For user endpoints the `data` field contains the user or paginated result.
 */
function unwrap(response) {
  return response.data
}

// ── Auth ──────────────────────────────────────────────────────────────────────

export async function registerUser(data) {
  const response = await api.post('/register', data)
  return unwrap(response)
}

export async function loginUser(data) {
  const response = await api.post('/login', data)
  return unwrap(response)
}

// ── Users ─────────────────────────────────────────────────────────────────────

export async function fetchUsers(params = {}) {
  const response = await api.get('/users', { params })
  return unwrap(response).data   // { users, total, page, limit, totalPages }
}

export async function fetchUserById(id) {
  const response = await api.get(`/users/${id}`)
  return unwrap(response)
}

export async function updateUserById(id, data) {
  const response = await api.put(`/users/${id}`, data)
  return unwrap(response)
}

export async function deleteUserById(id) {
  const response = await api.delete(`/users/${id}`)
  return unwrap(response)
}