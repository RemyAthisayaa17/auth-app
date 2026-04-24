import User from '../sequelize/models/User.js'
import { AUTH_RESULT } from '../constants/authConstants.js'
import { serviceResult } from '../common/serviceResult.js'

export async function registerUser(data) {
  const { username, email, password, phone, gender, address } = data

  const existingUser = await User.findOne({ where: { email } })
  if (existingUser) return serviceResult(AUTH_RESULT.EMAIL_EXISTS)

  await User.create({ username, email, password, phone, gender, address })

  return serviceResult(AUTH_RESULT.CREATED)
}

export async function loginUser(data) {
  const { email, password } = data

  const user = await User.findOne({ where: { email } })
  if (!user) return serviceResult(AUTH_RESULT.USER_NOT_FOUND)

  if (user.password !== password) return serviceResult(AUTH_RESULT.WRONG_PASSWORD)

  const raw = user.toJSON()

  const safeUser = {
    id: raw.id,
    username: raw.username,
    email: raw.email,
    phone: raw.phone,
    gender: raw.gender,
    address: raw.address,
    role: raw.role ? raw.role.toLowerCase() : 'user',
  }

  return serviceResult(AUTH_RESULT.SUCCESS, safeUser)
}