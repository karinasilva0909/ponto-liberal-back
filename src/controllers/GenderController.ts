import { Request, Response } from 'express';
import { Messages } from '../enums/MessagesEnum';
import GenderService from '../services/GenderService';

const createGender = async (req: Request, res: Response) => {
    try {
        if (!req.user || !req.user.username) {
            return res.status(401).json({ message: Messages.USER_NOT_AUTENTICATED });
        }

        const genderData = {
            username: req.user.username,
            ...req.body
        };

        const result = await GenderService.createGender(genderData); 
        res.status(201).json(result);
    } catch (error) {
        res.status(400).json({ error: (error as Error).message });
    }
};

const findAllGenders = async (req: Request, res: Response) => {
    try {
        const result = await GenderService.findAllGenders(); 
        res.status(201).json(result);
    } catch (error) {
        res.status(400).json({ error: (error as Error).message });
    }
};

export default {
    createGender,
    findAllGenders,
};