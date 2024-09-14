import { Role } from '../models/Role';
import { Roles } from '../enums/RolesEnum';
import { Messages } from '../enums/MessagesEnum';
import { User } from '../models/User';

const createRole = async (profileData: { name?: string; username?: string; }) => {
    try {
        const { name, username } = profileData;
        const userResult = await User.findOne({ where: { username } });

        const role = await Role.findOne({ where: {name} });

        if (!userResult) {
            throw new Error(Messages.USER_NULL);
        }

        if (role) {
            throw new Error(Messages.USER_NULL);
        }

        await Role.create({
            name
        });

        return Messages.CREATE_PROFILE;

    } catch (error) {
        throw new Error((error as Error).message);
    }
};

const findAllRole = async (username: string) => {
    try {
        // Buscando o usuário pelo username
        const user = await User.findOne({ where: { username } });

        // Verifica se o usuário existe
        if (!user) {
            throw new Error('User not found');
        }

        // Verifica se o usuário tem permissão de admin
        if (user.roleId === Roles.ADMIN) {
            // Retorna todas as roles se o usuário for admin
            const roles = await Role.findAll();
            return roles;
        } else {
            throw new Error('Access denied. Admins only.');
        }
    } catch (error) {
        throw new Error((error as Error).message);
    }
};

export default {
    createRole,
    findAllRole,
};
