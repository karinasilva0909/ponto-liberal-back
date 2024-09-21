import { Request, Response } from 'express';

import { Messages } from "../enums/MessagesEnum";
import UserService from "../services/UserService";

const usersOnline = async (req: Request, res: Response) => {
    try {
        const { username } = req.body;

        if (!username) {
            throw new Error(Messages.USER_NULL);
        }

        await UserService.usersOnline({ username: String(username) });
        res.status(200).json({ message: Messages.USERNAME_VALID });
    } catch (error) {
        res.status(400).json({ error: (error as Error).message });
    }
};

const updateUserTimestamp = async (req: Request, res: Response) => {
    try {
        const user = await UserService.updateUserTimestamp(req.body);
        
        res.status(201).json({ message: Messages.SUCCESS, user });
    } catch (error) {
        res.status(400).json({ error: (error as Error).message });
    }
};

export default {
    usersOnline,
    updateUserTimestamp,
};