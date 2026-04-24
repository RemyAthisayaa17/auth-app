import * as userService from '../services/userService.js'
import { successResponse, errorResponse } from '../common/responseModel.js'

const VALID_SORT_FIELDS = ['username', 'email', 'phone', 'gender']

export async function getUsers(req, res) {
  try {
    const page   = Math.max(1, parseInt(req.query.page)  || 1)
    const limit  = Math.max(1, parseInt(req.query.limit) || 5)
    const search = req.query.search?.trim() || ''
    const sort   = VALID_SORT_FIELDS.includes(req.query.sort) ? req.query.sort : 'username'
    const order  = req.query.order?.toUpperCase() === 'DESC' ? 'DESC' : 'ASC'

    const result = await userService.getUsers({ page, limit, search, sort, order })
    return successResponse(res, 'Users fetched', result)
  } catch (err) {
    console.error(err)
    return errorResponse(res, 500, 'Server error')
  }
}

export async function getUserById(req, res) {
  try {
    const user = await userService.getUserById(parseInt(req.params.id))
    if (!user) return errorResponse(res, 404, 'User not found')
    return successResponse(res, 'User fetched', user)
  } catch (err) {
    console.error(err)
    return errorResponse(res, 500, 'Server error')
  }
}

export async function updateUser(req, res) {
  try {
    const updated = await userService.updateUser(parseInt(req.params.id), req.body)
    if (!updated) return errorResponse(res, 404, 'User not found')
    return successResponse(res, 'User updated successfully', updated)
  } catch (err) {
    console.error(err)
    return errorResponse(res, 500, 'Server error')
  }
}

export async function deleteUser(req, res) {
  try {
    const deleted = await userService.deleteUser(parseInt(req.params.id))
    if (!deleted) return errorResponse(res, 404, 'User not found')
    return successResponse(res, 'User deleted successfully')
  } catch (err) {
    console.error(err)
    return errorResponse(res, 500, 'Server error')
  }
}