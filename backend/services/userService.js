import { Op } from 'sequelize'
import User from '../sequelize/models/User.js'

// Fields returned to the client — defined once, reused everywhere
const USER_ATTRIBUTES = ['id', 'username', 'email', 'phone', 'gender', 'address']

// Fields accepted when creating or updating a user
const WRITABLE_FIELDS = ['username', 'email', 'phone', 'gender', 'address']

function pickWritableFields(data) {
  return Object.fromEntries(
    WRITABLE_FIELDS.map((key) => [key, data[key]])
  )
}

export async function getUsers({ page, limit, search, sort, order }) {
  const offset = (page - 1) * limit

  const where = {
    [Op.and]: [
      {
        [Op.or]: [
          { username: { [Op.like]: `%${search}%` } },
          { email: { [Op.like]: `%${search}%` } },
          { phone: { [Op.like]: `%${search}%` } },
        ],
      },
      { email: { [Op.ne]: 'admin@gmail.com' } },
    ],
  }

  const { rows, count } = await User.findAndCountAll({
    where,
    order: [[sort, order]],
    offset,
    limit,
    attributes: USER_ATTRIBUTES,
  })

  return {
    users: rows,
    total: count,
    page,
    limit,
    totalPages: Math.ceil(count / limit),
  }
}

export async function getUserById(id) {
  const user = await User.findByPk(id, { attributes: USER_ATTRIBUTES })
  return user || null
}

export async function updateUser(id, data) {
  const user = await User.findByPk(id)
  if (!user) return null

  const fields = pickWritableFields(data)
  await user.update(fields)

  return { id, ...fields }
}

export async function deleteUser(id) {
  const user = await User.findByPk(id)
  if (!user) return false

  await user.destroy()
  return true
}