import { Messages } from '../enums/MessagesEnum';
import { Roles } from '../enums/RolesEnum';
import { User } from '../models/User';
import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';
import UserService from './UserService';

const createUser = async (userData: { username?: string; password?: string; email?: string; }) => {
    try {
        const { username, email, password } = userData;

        if (await usernameValidation(userData)) {
            throw new Error(Messages.USERNAME_ALREADY_EXISTS);
        }

        if (await emailValidation(userData)) {
            throw new Error(Messages.EMAIL_ALREADY_EXISTS);
        }

        const saltRounds = 10;
        const hashedPassword = await bcrypt.hash(password!, saltRounds);

        const newUser = await User.create({
            username,
            email,
            password: hashedPassword,
            roleId: Roles.BASIC,
            active: false,
            emailVerified: false
        });

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

        const userActive = userResult?.active;

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

        await UserService.updateUserTimestamp({ username: String(username) });

        return { message: Messages.LOGIN_SUCESS, token, userActive };

    } catch (error) {
        throw new Error((error as Error).message);
    }
};

const emailValidation = async (userData: { email?: string; }): Promise<boolean> => {
    try {
        const { email } = userData;

        const userResult = await User.findOne({ where: { email } });

        return !!userResult; // Converte para boolean de forma explícita
    } catch (error) {
        throw error;
    }
};

const usernameValidation = async (userData: { username?: string; }): Promise<boolean> => {
    try {
        const { username } = userData;

        const userResult = await User.findOne({ where: { username } });

        return !!userResult; // Converte para boolean de forma explícita
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
