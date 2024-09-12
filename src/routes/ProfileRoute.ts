import express from 'express';
import authMiddleware from '../Middlewares/AuthMiddleware';
import ProfileController from '../controllers/ProfileController';

const router = express.Router();

// Rota para criar um perfil
router.post('/profile', authMiddleware, ProfileController.createProfile);

// Rota para obter o perfil (simplesmente retornando o usuário autenticado)
router.get('/profile', authMiddleware, (req, res) => {
    if (!req.user) {
        return res.status(401).json({ message: 'User not authenticated' });
    }

    res.json({ message: 'Access granted', user: req.user });
});

export default router;
