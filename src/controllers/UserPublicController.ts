import { Request, Response } from 'express';
import usersPublicService from '../services/UserPublicService';

const createUser = async (req: Request, res: Response) => {
    try {
        console.log(req);
        const user = await usersPublicService.createUser(req.body);

        res.status(201).json(user);
    } catch (error) {
        res.status(400).json({ error: (error as Error).message });
    }
};

const login = async (req: Request, res: Response) => {
    try {
        const { username, password } = req.body;

        if (!username || !password) {
            throw new Error('Username and password are required');
        }

        const user = await usersPublicService.login({ username: String(username), password: String(password) });
        res.status(200).json(user);
    } catch (error) {
        res.status(400).json({ error: (error as Error).message });
    }
};

export default {
    createUser,
    login,
};