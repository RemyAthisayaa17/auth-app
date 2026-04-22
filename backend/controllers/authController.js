import * as authService from '../services/authService.js'
import { successResponse, errorResponse } from '../common/responseModel.js'

export async function register(req, res) {
  try {
    const result = await authService.registerUser(req.body)
    if (result === 'EXISTS') {
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
    const { user, reason } = await authService.loginUser(req.body)
    if (reason === 'NOT_FOUND') {
      return errorResponse(res, 401, 'No account found with this email')
    }
    if (reason === 'WRONG_PASSWORD') {
      return errorResponse(res, 401, 'Incorrect password. Please try again.')
    }
    return successResponse(res, 'Login successful', user)
  } catch (err) {
    console.error(err)
    return errorResponse(res, 500, 'Server error')
  }
}