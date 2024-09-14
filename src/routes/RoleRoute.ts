import express from 'express';
import authMiddleware from '../Middlewares/AuthMiddleware';
import RoleController from '../controllers/RoleController';

const router = express.Router();

router.post('/role', authMiddleware, RoleController.createRole);
router.get('/find-all-roles', authMiddleware, RoleController.findAllRole);

export default router;