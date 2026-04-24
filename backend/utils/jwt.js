import jwt from 'jsonwebtoken'

// 🔒 Fail fast (no fallback in production)
if (!process.env.JWT_SECRET) {
  throw new Error('JWT_SECRET is not defined')
}

if (!process.env.JWT_EXPIRES_IN) {
  throw new Error('JWT_EXPIRES_IN is not defined')
}

const JWT_SECRET = process.env.JWT_SECRET
const JWT_EXPIRES_IN = process.env.JWT_EXPIRES_IN

export function generateToken(payload) {
  return jwt.sign(payload, JWT_SECRET, {
    expiresIn: JWT_EXPIRES_IN,
  })
}