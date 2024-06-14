import express from 'express';
import CourseController from '../controllers/course.controller';
import authenticate from '../middlewares/authentication.middleware';
const router = express.Router();

const {
    getProductDesign,
    getFrontend,
    getBackend,
    getWeb3,
    enroll
} = new CourseController();

router.get('/product-design', authenticate, getProductDesign);
router.get('/frontend', authenticate, getFrontend);
router.get('/backend', authenticate, getBackend);
router.get('/web3', authenticate, getWeb3);
router.patch('/:path/enroll', authenticate, enroll);

export default router