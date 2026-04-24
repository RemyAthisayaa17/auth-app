/**
 * Centralizes all JWT token read/write operations.
 * Login.jsx writes via saveToken(); App.jsx reads via getTokenExpiry().
 * No other file touches localStorage for token data.
 */

const TOKEN_KEY = 'token'

export function saveToken(token) {
  localStorage.setItem(TOKEN_KEY, token)
}

export function getToken() {
  return localStorage.getItem(TOKEN_KEY)
}

export function removeToken() {
  localStorage.removeItem(TOKEN_KEY)
}

/**
 * Decodes the JWT payload and returns expiry in milliseconds from epoch.
 * Returns null if token is missing or malformed.
 */
export function getTokenExpiry() {
  const token = getToken()
  if (!token) return null

  try {
    const payload = JSON.parse(atob(token.split('.')[1]))
    return payload?.exp ? payload.exp * 1000 : null
  } catch {
    return null
  }
}