import express from 'express';
import authMiddleware from '../Middlewares/AuthMiddleware';
import { Messages } from '../enums/MessagesEnum';
import GenderController from '../controllers/GenderController';

const router = express.Router();

// Rota para criar um perfil
router.post('/profile', authMiddleware, GenderController.createGender);

export default router;