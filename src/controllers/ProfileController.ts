import { Request, Response } from 'express';
import ProfileService from '../services/ProfileService';
import { Messages } from '../enums/MessagesEnum';

const createProfile = async (req: Request, res: Response) => {
    try {
        if (!req.user || !req.user.username) {
            return res.status(401).json({ message: Messages.USER_NOT_AUTENTICATED });
        }

        const profileData = {
            username: req.user.username,
            ...req.body
        };

        const result = await ProfileService.createProfile(profileData); 
        res.status(201).json(result);
    } catch (error) {
        res.status(400).json({ error: (error as Error).message });
    }
};

export default {
    createProfile,
};
