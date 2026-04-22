import { Router } from 'express'
import { register, login } from '../controllers/authController.js'
import { validate } from '../middleware/validate.js'
import registerSchema from '../validations/registerSchema.js'
import loginSchema from '../validations/loginSchema.js'

const router = Router()

router.post('/register', validate(registerSchema), register)
router.post('/login',    validate(loginSchema),    login)

export default router