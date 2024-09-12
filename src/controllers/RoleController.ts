import express from 'express';
import authMiddleware from '../Middlewares/AuthMiddleware';
import RoleService from '../services/RoleService';

const router = express.Router();

router.post('/role', authMiddleware, RoleService.createRole);
router.get('/find-all-role', authMiddleware, RoleService.findAllRole);

export default router;
