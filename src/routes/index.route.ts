import express from 'express'
const router = express.Router();
import userRouter from './user.route'
import courseRouter from './course.route'

router.use("/users", userRouter)
router.use("/courses", courseRouter)

export default router