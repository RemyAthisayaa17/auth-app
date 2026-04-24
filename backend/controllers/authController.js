import jwt from 'jsonwebtoken'
import * as authService from '../services/authService.js'
import { AUTH_RESULT } from '../constants/authConstants.js'
import { successResponse, errorResponse } from '../common/responseModel.js'

const JWT_SECRET = process.env.JWT_SECRET || 'your_jwt_secret_key'
const JWT_EXPIRES_IN = '1m'

export async function register(req, res) {
  try {
    const { code } = await authService.registerUser(req.body)

    if (code === AUTH_RESULT.EMAIL_EXISTS) {
      return errorResponse(res, 409, 'Email already registered')
    }

    return successResponse(res, 'User registered successfully')
  } catch (err) {
    console.error(err)
    return errorResponse(res, 500, 'Server error')
  }
}

export async function login(req, res) {
  try {
    const { code, data: user } = await authService.loginUser(req.body)

    if (code === AUTH_RESULT.USER_NOT_FOUND) {
      return errorResponse(res, 401, 'No account found with this email')
    }
    if (code === AUTH_RESULT.WRONG_PASSWORD) {
      return errorResponse(res, 401, 'Incorrect password. Please try again.')
    }

    const token = jwt.sign(
      { username: user.username, email: user.email, role: user.role },
      JWT_SECRET,
      { expiresIn: JWT_EXPIRES_IN }
    )

    return successResponse(res, 'Login successful', { user, token })
  } catch (err) {
    console.error(err)
    return errorResponse(res, 500, 'Server error')
  }
}