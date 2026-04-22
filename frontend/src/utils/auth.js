export function setUser(user) {
  localStorage.setItem('user', JSON.stringify(user))
}

export function getUser() {
  try {
    const user = localStorage.getItem('user')
    return user ? JSON.parse(user) : null
  } catch (err) {
    return null
  }
}

export function logoutUser() {
  localStorage.removeItem('user')
}