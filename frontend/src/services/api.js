import axios from 'axios'

const BASE_URL = import.meta.env.VITE_API_BASE_URL || 'http://localhost:5000'

const api = axios.create({
  baseURL: BASE_URL,
  headers: { 'Content-Type': 'application/json' },
})

// Auth
export async function registerUser(data) {
  const response = await api.post('/register', data)
  return response.data
}

export async function loginUser(data) {
  const response = await api.post('/login', data)
  return response.data
}

// USERS (FIXED CLEAN RESPONSE HANDLING)
export async function fetchUsers(params = {}) {
  const response = await api.get('/users', { params })

  // backend: { success, message, data: {...} }
  return response.data.data
}

export async function fetchUserById(id) {
  const response = await api.get(`/users/${id}`)
  return response.data
}

export async function updateUserById(id, data) {
  const response = await api.put(`/users/${id}`, data)
  return response.data
}

export async function deleteUserById(id) {
  const response = await api.delete(`/users/${id}`)
  return response.data
}