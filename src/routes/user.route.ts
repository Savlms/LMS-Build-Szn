import express from 'express'
import UserController from '../controllers/user.controller'
import validate from '../middlewares/validation.middleware'
import { signUpSchema, editUserSchema } from '../schemas/user.schema'
import authorize from '../middlewares/authorization.middleware';
import authenticate from '../middlewares/authentication.middleware';
import PaymentController from '../controllers/payment.controller';
const router = express.Router();

const {
    findAll,
    findOne,
    updateUser,
    deleteUser,
    login,
    signup,
    sendResetLink,
    resetPassword,
    logout,
    signupAdmin
} = new UserController()
const {
    generatePaymentOrder
} = new PaymentController()

//router.post('api/v1/users', validate(createUserSchema), createUser)
router.patch('/:id', validate(editUserSchema), authenticate, updateUser)
router.get('/',authenticate, authorize , findAll)
router.get('/:id',authenticate, findOne)
router.post('/login', login)
router.post('/logout', logout)
router.post('/', validate(signUpSchema), signup)
router.post('/admin', validate(signUpSchema), signupAdmin)
router.delete('/:id', authenticate, deleteUser)
router.put('/forgot-password', sendResetLink)
router.put('/reset-password/:token', resetPassword)
router.post('/payment',generatePaymentOrder)


export default router