import express from 'express';
import authMiddleware from '../Middlewares/AuthMiddleware';

const router = express.Router();

router.get('/profile', authMiddleware, (req, res) => {
    if (!req.user) {
        return res.status(401).json({ message: 'User not authenticated' });
    }

    res.json({ message: 'Access granted', user: req.user });
});


export default router;
