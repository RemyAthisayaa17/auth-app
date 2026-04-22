import * as userService from '../services/userService.js'
import { successResponse, errorResponse } from '../common/responseModel.js'

export async function getUsers(req, res) {
  try {
    const page    = Math.max(1, parseInt(req.query.page)  || 1)
    const limit   = Math.max(1, parseInt(req.query.limit) || 5)
    const search  = req.query.search?.trim() || ''
    const sort    = ['username','email','phone','gender'].includes(req.query.sort)
                    ? req.query.sort : 'username'
    const order   = req.query.order?.toUpperCase() === 'DESC' ? 'DESC' : 'ASC'

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
    const { username, email, phone, gender, address } = req.body
    const id = parseInt(req.params.id)
    const updated = await userService.updateUser(id, { username, email, phone, gender, address })
    if (!updated) return errorResponse(res, 404, 'User not found')
    return successResponse(res, 'User updated successfully', updated)
  } catch (err) {
    console.error(err)
    return errorResponse(res, 500, 'Server error')
  }
}

export async function deleteUser(req, res) {
  try {
    const id = parseInt(req.params.id)
    const deleted = await userService.deleteUser(id)
    if (!deleted) return errorResponse(res, 404, 'User not found')
    return successResponse(res, 'User deleted successfully')
  } catch (err) {
    console.error(err)
    return errorResponse(res, 500, 'Server error')
  }
}