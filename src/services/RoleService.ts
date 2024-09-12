import { Role } from '../models/Role';
import { Request, Response } from 'express';
import { Roles } from '../enums/RolesEnum';
import { Mesages } from '../enums/MessagesEnum';

const createRole = async (req: Request, res: Response) => {
    try {
        if (req.user?.roleId !== Roles.ADMIN) {
            return res.status(403).json({ message: 'Access denied. Admins only.' });
        }
        const { name } = req.body;

        if (!name) {
            return res.status(400).json({ message: 'Role name is required' });
        }

        const newRole = await Role.create({ name });
        return Mesages.CREATE_PROFILE;
    } catch (error) {
        throw new Error((error as Error).message);
    }
};

const findAllRole = async (req: Request, res: Response) => {
    try {
        if (req.user?.roleId !== Roles.ADMIN) {
            return res.status(403).json({ message: 'Access denied. Admins only.' });
        }
        const { name } = req.body;

        if (!name) {
            return res.status(400).json({ message: 'Role name is required' });
        }

        const roles = await Role.findAll();
        return res.status(200).json(roles);
    } catch (error) {
        throw new Error((error as Error).message);
    }
};

export default {
    createRole,
    findAllRole,
};
