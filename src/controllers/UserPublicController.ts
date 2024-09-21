import { Request, Response } from 'express';
import usersPublicService from '../services/UserPublicService';
import { Messages } from '../enums/MessagesEnum';

const createUser = async (req: Request, res: Response) => {
    try {
        const user = await usersPublicService.createUser(req.body);
        res.status(201).json({ message: Messages.SUCCESS, user });
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

        if (!user.userActive) {
            throw new Error(Messages.USER_NOT_ACTIVE);
        }

        res.status(200).json(user);
    } catch (error) {
        res.status(400).json({ error: (error as Error).message });
    }
};

const emailValidation = async (req: Request, res: Response) => {
    try {
        const { email } = req.body;

        if (!email) {
            throw new Error(Messages.EMAIL_NULL);
        }

        await usersPublicService.emailValidation({ email: String(email) });
        res.status(200).json({ message: Messages.EMAIL_VALID });
    } catch (error) {
        res.status(400).json({ error: (error as Error).message });
    }
};

const usernameValidation = async (req: Request, res: Response) => {
    try {
        const { username } = req.body;

        if (!username) {
            throw new Error(Messages.USER_NULL);
        }

        await usersPublicService.usernameValidation({ username: String(username) });
        res.status(200).json({ message: Messages.USERNAME_VALID });
    } catch (error) {
        res.status(400).json({ error: (error as Error).message });
    }
};

export default {
    createUser,
    login,
    emailValidation,
    usernameValidation,
};
