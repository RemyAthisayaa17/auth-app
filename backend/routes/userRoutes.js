import { Router } from 'express'
import { getUsers, getUserById, updateUser, deleteUser } from '../controllers/userController.js'
import { validate } from '../middleware/validate.js'
import updateUserSchema from '../validations/updateUserSchema.js'

const router = Router()

router.get('/',       getUsers)
router.get('/:id',    getUserById)
router.put('/:id',    validate(updateUserSchema), updateUser)
router.delete('/:id', deleteUser)

export default router