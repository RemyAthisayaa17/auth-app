import User from '../sequelize/models/User.js'

// registerUser stays unchanged
export async function registerUser(data) {
  const { username, email, password, phone, gender, address } = data

  const existingUser = await User.findOne({
    where: { email }
  })

  if (existingUser) return 'EXISTS'

  await User.create({
    username,
    email,
    password,
    phone,
    gender,
    address
  })

  return 'CREATED'
}

// loginUser FIXED ONLY ROLE SAFETY
export async function loginUser(data) {
  const { email, password } = data

  const user = await User.findOne({
    where: { email }
  })

  if (!user) {
    return { user: null, reason: 'NOT_FOUND' }
  }

  if (user.password !== password) {
    return { user: null, reason: 'WRONG_PASSWORD' }
  }

  const cleanUser = user.toJSON()

  return {
    user: {
      id: cleanUser.id,
      username: cleanUser.username,
      email: cleanUser.email,
      phone: cleanUser.phone,
      gender: cleanUser.gender,
      address: cleanUser.address,
      role: cleanUser.role ? cleanUser.role.toLowerCase() : 'user'
    },
    reason: null
  }
}