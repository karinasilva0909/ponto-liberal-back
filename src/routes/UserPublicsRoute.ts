import express from 'express';
import UserPublicController from '../controllers/UserPublicController';

const router = express.Router();

router.post('/user', UserPublicController.createUser);
router.post('/login', UserPublicController.login);

export default router;