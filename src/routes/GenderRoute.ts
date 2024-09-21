import express from 'express';
import authMiddleware from '../Middlewares/AuthMiddleware';
import GenderController from '../controllers/GenderController';

const router = express.Router();

router.post('/gender', authMiddleware, GenderController.createGender);
router.get('/public/find-all-genders', GenderController.findAllGenders);

export default router;