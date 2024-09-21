import express from 'express';
import UserPublicController from '../controllers/UserPublicController';

const router = express.Router();

router.post('/create-user', UserPublicController.createUser);
router.post('/login', UserPublicController.login);
router.get('/email-validation', UserPublicController.emailValidation);
router.get('/username-validation', UserPublicController.usernameValidation);

export default router;
