import { Messages } from '../enums/MessagesEnum';
import { Roles } from '../enums/RolesEnum';
import { User } from '../models/User';
import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';

const createUser = async (userData: { username?: string; password?: string; email?: string; }) => {
    try {
        const { username, email, password } = userData;

        // Verifica se o username ou email já existem
        const userResult = await User.findOne({ where: { username } });
        const emailResult = await User.findOne({ where: { email } });

        if (userResult) {
            throw new Error(Messages.USERNAME_ALREADY_EXISTS);
        }

        if (emailResult) {
            throw new Error(Messages.EMAIL_ALREADY_EXISTS);
        }

        const saltRounds = 10;
        const hashedPassword = await bcrypt.hash(password!, saltRounds);

        const newUser = await User.create({
            username,
            email,
            password: hashedPassword,
            roleId: Roles.BASIC
        });

        return newUser;

    } catch (error) {
        throw new Error((error as Error).message);
    }
};

const login = async (userData: { username?: string; password?: string; }) => {
    try {
        const { username, password } = userData;

        if (!username || !password) {
            throw new Error(Messages.USER_NULL);
        }

        const userResult = await User.findOne({ where: { username } });

        if (!userResult) {
            throw new Error(Messages.INVALID_CREDENTIALS);
        }

        const passwordIsValid = await bcrypt.compare(password!, userResult.password!);

        if (!passwordIsValid) {
            throw new Error(Messages.INVALID_CREDENTIALS);
        }

        const token = jwt.sign(
            { userId: userResult.id, username: userResult.username, roleId: userResult.roleId },
            process.env.JWT_SECRET!,
            { expiresIn: '1h' }
        );

        return { message: Messages.LOGIN_SUCESS, token };

    } catch (error) {
        throw new Error((error as Error).message);
    }
};

const emailValidation = async (userData: { email?: string; }) => {
    try {
        const { email } = userData;

        const userResult = await User.findOne({ where: { email } });

        if (userResult) {
            const error = new Error(Messages.EMAIL_ALREADY_EXISTS);
            (error as any).statusCode = 409;
            throw error;
        }

        return { message: Messages.EMAIL_VALID };

    } catch (error) {
        throw error;
    }
};

const usernameValidation = async (userData: { username?: string; }) => {
    try {
        const { username } = userData;

        const userResult = await User.findOne({ where: { username } });

        if (userResult) {
            const error = new Error(Messages.USERNAME_ALREADY_EXISTS);
            (error as any).statusCode = 409;
            throw error;
        }

        return { message: Messages.EMAIL_VALID };
    } catch (error) {
        throw new Error((error as Error).message);
    }
};

export default {
    createUser,
    login,
    emailValidation,
    usernameValidation,
};
