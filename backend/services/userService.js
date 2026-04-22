import User from '../sequelize/models/User.js'
import { Op } from 'sequelize'

// ─────────────────────────────────────────────────────────────────────────────
// getUsers — Sequelize
// ─────────────────────────────────────────────────────────────────────────────
export async function getUsers({ page, limit, search, sort, order }) {


  const offset = (page - 1) * limit

  const where = {
    [Op.and]: [
      {
        [Op.or]: [
          { username: { [Op.like]: `%${search}%` } },
          { email:    { [Op.like]: `%${search}%` } },
          { phone:    { [Op.like]: `%${search}%` } }
        ]
      },
      {
        email: { [Op.ne]: 'admin@gmail.com' }
      }
    ]
  }

  const validSort  = ['username', 'email', 'phone', 'gender'].includes(sort)
    ? sort : 'username'
  const validOrder = order === 'DESC' ? 'DESC' : 'ASC'

  const { rows, count } = await User.findAndCountAll({
    where,
    order: [[validSort, validOrder]],
    offset,
    limit,
    attributes: ['id', 'username', 'email', 'phone', 'gender', 'address'],
  })

  return {
    users: rows,
    total: count,
    page,
    limit,
    totalPages: Math.ceil(count / limit),
  }
}

// ─────────────────────────────────────────────────────────────────────────────
// getUserById — Sequelize
// ─────────────────────────────────────────────────────────────────────────────
export async function getUserById(id) {
  const user = await User.findByPk(id, {
    attributes: ['id', 'username', 'email', 'phone', 'gender', 'address']
  })

  return user || null
}

// ─────────────────────────────────────────────────────────────────────────────
// updateUser — Sequelize
// ─────────────────────────────────────────────────────────────────────────────
export async function updateUser(id, data) {
  const { username, email, phone, gender, address } = data

  const user = await User.findByPk(id)
  if (!user) return null

  await user.update({
    username,
    email,
    phone,
    gender,
    address
  })

  return {
    id,
    username,
    email,
    phone,
    gender,
    address
  }
}

// ─────────────────────────────────────────────────────────────────────────────
// deleteUser — Sequelize
// ─────────────────────────────────────────────────────────────────────────────
export async function deleteUser(id) {
  const user = await User.findByPk(id)
  if (!user) return false

  await user.destroy()
  return true
}