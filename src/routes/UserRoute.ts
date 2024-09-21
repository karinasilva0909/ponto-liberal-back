import express from 'express';
import authMiddleware from '../Middlewares/AuthMiddleware';
import UserController from '../controllers/UserController';

const router = express.Router();


router.get('/update-user-timestamp', authMiddleware, UserController.updateUserTimestamp);


export default router;
