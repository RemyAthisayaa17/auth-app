import { z } from 'zod'

const updateUserSchema = z.object({
  username: z
    .string()
    .nonempty('Username is required')
    .max(10, 'Username must be max 10 characters')
    .regex(/^[A-Za-z ]+$/, 'Username should contain only letters'),

  email: z
    .string()
    .nonempty('Email is required')
    .email('Invalid email format'),

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

export default updateUserSchema