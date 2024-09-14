import { Request, Response } from 'express';
import RoleService from '../services/RoleService';

const createRole = async (req: Request, res: Response) => {
    try {
        if (!req.user || !req.user.username) {
            return res.status(401).json({ message: 'User not authenticated' });
        }

        const roleData = {
            username: req.user.username,
            ...req.body
        };

        const result = await RoleService.createRole(roleData);
        res.status(201).json(result);
    } catch (error) {
        res.status(400).json({ error: (error as Error).message });
    }
};

const findAllRole = async(req: Request, res: Response) => {
    try {
        if (!req.user || !req.user.username) {
            return res.status(401).json({ message: 'User not authenticated' });
        }

        const username = req.user.username;

        const result = await RoleService.findAllRole(username);
        res.status(201).json(result);
    } catch (error) {
        res.status(400).json({ error: (error as Error).message });
    }
}

export default {
    createRole,
    findAllRole
};