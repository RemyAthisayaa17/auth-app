import { z } from 'zod'

const registerSchema = z.object({
  username: z
    .string()
    .nonempty('Username is required')
    .max(10, 'Username must be max 10 characters')
    .regex(/^[A-Za-z ]+$/, 'Username should contain only letters'),

  email: z
    .string()
    .nonempty('Email is required')
    .email('Invalid email format'),

  password: z
    .string()
    .nonempty('Password is required')
    .length(8, 'Password must be exactly 8 characters')
    .regex(/[A-Z]/, 'Must include one uppercase letter')
    .regex(/[0-9]/, 'Must include one number')
    .regex(/[^A-Za-z0-9]/, 'Must include one special character'),

  phone: z
    .string()
    .nonempty('Phone is required')
    .length(10, 'Phone must be exactly 10 digits')
    .regex(/^[0-9]+$/, 'Phone must contain only numbers'),

  gender: z.enum(['male', 'female']),

  address: z
    .string()
    .nonempty('Address is required')
    .max(200, 'Address exceeds the allowed character limit. Please shorten it.'),
})

export default registerSchema